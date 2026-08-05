import { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuth } from "@/contexts/AuthContext";
import type { ApiCartResponse, ApiCartItem } from "@/types/api";

export const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  // Use authenticated user state from AuthContext instead of reading cookie directly.
  // This ensures the query reacts correctly on login/logout events.
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosSecure.get<ApiCartResponse>("/api/cart/mycart");
      return res.data;
    },
    // Enable only when authenticated user is present.
    enabled: !!user,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Extract cart items from response.
  // The API returns the cart inside an array in `data`.
  const cart = data?.data?.[0];
  const cartItems: ApiCartItem[] = cart?.CartItems || [];

  // Add/Update Item Mutation
  const addItemMutation = useMutation({
    mutationFn: async ({ foodId, quantity }: { foodId: string; quantity: number }) => {
      const res = await axiosSecure.post("/api/cart/itemAdd", { foodId, quantity });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Remove Item Mutation (DELETE by CartItem.id)
  const removeItemMutation = useMutation({
    mutationFn: async (cartItemId: string) => {
      const res = await axiosSecure.delete(`/api/cart/removeItem/${cartItemId}`);
      return res.data;
    },
    onMutate: async (cartItemId: string) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCartResponse = queryClient.getQueryData<ApiCartResponse>(["cart"]);

      if (previousCartResponse?.data?.[0]) {
        queryClient.setQueryData<ApiCartResponse>(["cart"], (old) => {
          if (!old?.data?.[0]) return old;
          const oldCart = old.data[0];
          const updatedItems = oldCart.CartItems.filter((item) => item.id !== cartItemId);
          return {
            ...old,
            data: [
              {
                ...oldCart,
                CartItems: updatedItems,
              },
            ],
          };
        });
      }

      return { previousCartResponse };
    },
    onError: (err, variables, context) => {
      if (context?.previousCartResponse) {
        queryClient.setQueryData(["cart"], context.previousCartResponse);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const intendedQuantitiesRef = useRef<Record<string, number>>({});
  const inFlightQuantitiesRef = useRef<Record<string, number>>({});
  const isRequestInProgressRef = useRef<Record<string, boolean>>({});
  const previousCartStatesRef = useRef<Record<string, ApiCartResponse | undefined>>({});

  const updateQuantityOptimistically = async (itemId: string, direction: "increment" | "decrement") => {
    // 1. Get the current cache quantity or the latest intended quantity
    const currentCache = queryClient.getQueryData<ApiCartResponse>(["cart"]);
    const currentItem = currentCache?.data?.[0]?.CartItems?.find(
      (item) => item.id === itemId
    );
    const baselineQty = currentItem ? currentItem.quantity : 1;

    // Use the latest intended quantity if there is one, otherwise the baseline
    const currentIntended = intendedQuantitiesRef.current[itemId] ?? baselineQty;
    
    // Compute next quantity
    const nextQty = direction === "increment" ? currentIntended + 1 : Math.max(1, currentIntended - 1);

    // Save previous state for rollback if not already in progress
    if (!isRequestInProgressRef.current[itemId]) {
      previousCartStatesRef.current[itemId] = currentCache;
    }

    // Update latest user intent
    intendedQuantitiesRef.current[itemId] = nextQty;

    // Optimistic cache update
    await queryClient.cancelQueries({ queryKey: ["cart"] });
    queryClient.setQueryData<ApiCartResponse>(["cart"], (old) => {
      if (!old?.data?.[0]) return old;
      const oldCart = old.data[0];
      const updatedItems = oldCart.CartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: nextQty } : item
      );
      return {
        ...old,
        data: [{ ...oldCart, CartItems: updatedItems }],
      };
    });

    // If request is already in progress, the queue will handle the rest.
    if (isRequestInProgressRef.current[itemId]) {
      return;
    }

    // Start request loop
    isRequestInProgressRef.current[itemId] = true;
    
    const processQueue = async (): Promise<void> => {
      const targetQty = intendedQuantitiesRef.current[itemId];
      inFlightQuantitiesRef.current[itemId] = targetQty;

      try {
        const res = await axiosSecure.patch(`/api/cart/update-cart-item/${itemId}`, { quantity: targetQty });
        
        // Cache direct synchronization
        if (res.data?.success) {
          if (Array.isArray(res.data.data) && res.data.data[0]?.CartItems) {
            queryClient.setQueryData(["cart"], res.data);
          } else if (res.data.data && res.data.data.CartItems) {
            queryClient.setQueryData(["cart"], (old: ApiCartResponse | undefined) => {
              if (!old) return old;
              return { ...old, data: [res.data.data] };
            });
          } else if (res.data.data && typeof res.data.data === "object" && "id" in res.data.data && "quantity" in res.data.data) {
            queryClient.setQueryData(["cart"], (old: ApiCartResponse | undefined) => {
              if (!old?.data?.[0]) return old;
              const oldCart = old.data[0];
              const updatedItems = oldCart.CartItems.map((item) =>
                item.id === res.data.data.id ? { ...item, quantity: res.data.data.quantity } : item
              );
              return {
                ...old,
                data: [{ ...oldCart, CartItems: updatedItems }],
              };
            });
          } else {
            await queryClient.invalidateQueries({ queryKey: ["cart"] });
          }
        } else {
          await queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
      } catch (error) {
        if (previousCartStatesRef.current[itemId]) {
          queryClient.setQueryData(["cart"], previousCartStatesRef.current[itemId]);
        }
        
        delete isRequestInProgressRef.current[itemId];
        delete intendedQuantitiesRef.current[itemId];
        delete inFlightQuantitiesRef.current[itemId];
        delete previousCartStatesRef.current[itemId];
        
        throw error;
      }

      if (intendedQuantitiesRef.current[itemId] !== inFlightQuantitiesRef.current[itemId]) {
        await processQueue();
      } else {
        delete isRequestInProgressRef.current[itemId];
        delete intendedQuantitiesRef.current[itemId];
        delete inFlightQuantitiesRef.current[itemId];
        delete previousCartStatesRef.current[itemId];
      }
    };

    await processQueue();
  };

  // Update Cart Item Quantity Mutation (legacy helper, no longer used directly but kept for safety)
  const updateCartItemMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const res = await axiosSecure.patch(`/api/cart/update-cart-item/${itemId}`, { quantity });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Decrement Item Mutation (legacy helper fallback)
  const decrementItemMutation = useMutation({
    mutationFn: async ({ foodId, cartItemId, currentQty }: { foodId: string; cartItemId: string; currentQty: number }) => {
      if (currentQty <= 1) {
        const res = await axiosSecure.delete(`/api/cart/removeItem/${cartItemId}`);
        return res.data;
      }
      const res = await axiosSecure.patch(`/api/cart/update-cart-item/${cartItemId}`, { quantity: currentQty - 1 });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Clear cart helper
  const clearCart = () => {
    queryClient.setQueryData<ApiCartResponse>(["cart"], (old) => {
      if (!old) return old;
      return {
        ...old,
        data: old.data ? [{ ...old.data[0], CartItems: [] }] : [],
      };
    });
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  // Dynamic calculations based on cart items
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.food.isDisCount && item.food.discountPrice > 0
      ? item.food.discountPrice
      : item.food.price;
    return sum + price * item.quantity;
  }, 0);

  const totalQuantity = cartItems.reduce((qty, item) => qty + item.quantity, 0);

  const deliveryCharge = 0;
  const serviceFee = 0;
  const totalPrice = subtotal + deliveryCharge;

  return {
    cartItems,
    subtotal,
    totalQuantity,
    deliveryCharge,
    serviceFee,
    totalPrice,
    isLoading,
    isError,
    error,
    addItem: (foodId: string, quantity: number) => addItemMutation.mutate({ foodId, quantity }),
    addItemAsync: (foodId: string, quantity: number) => addItemMutation.mutateAsync({ foodId, quantity }),
    removeItem: (cartItemId: string) => removeItemMutation.mutate(cartItemId),
    removeItemAsync: (cartItemId: string) => removeItemMutation.mutateAsync(cartItemId),
    updateQuantity: (itemId: string, direction: "increment" | "decrement") => updateQuantityOptimistically(itemId, direction),
    updateQuantityAsync: (itemId: string, direction: "increment" | "decrement") => updateQuantityOptimistically(itemId, direction),
    clearCart,
    decrementItem: (foodId: string, cartItemId: string, currentQty: number) =>
      decrementItemMutation.mutate({ foodId, cartItemId, currentQty }),
    decrementItemAsync: (foodId: string, cartItemId: string, currentQty: number) =>
      decrementItemMutation.mutateAsync({ foodId, cartItemId, currentQty }),
    isAdding: addItemMutation.isPending,
    isRemoving: removeItemMutation.isPending,
    isUpdating: updateCartItemMutation.isPending,
    isDecrementing: decrementItemMutation.isPending,
  };
};

export default useCart;
