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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Decrement Item Mutation:
  // Sends quantity=-1 to the addItem endpoint. Many additive cart APIs support this.
  // If the backend rejects negative quantities, the mutation will throw and callers
  // can catch the error and show an error toast.
  const decrementItemMutation = useMutation({
    mutationFn: async ({ foodId, cartItemId, currentQty }: { foodId: string; cartItemId: string; currentQty: number }) => {
      if (currentQty <= 1) {
        // Remove the item entirely when at qty 1
        const res = await axiosSecure.delete(`/api/cart/removeItem/${cartItemId}`);
        return res.data;
      }
      // Otherwise attempt to decrement via the add endpoint with quantity -1
      const res = await axiosSecure.post("/api/cart/itemAdd", { foodId, quantity: -1 });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Dynamic calculations based on cart items (Option A for Service Fee, Option A for Delivery Charge)
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.food.isDisCount && item.food.discountPrice > 0
      ? item.food.discountPrice
      : item.food.price;
    return sum + price * item.quantity;
  }, 0);

  const totalQuantity = cartItems.reduce((qty, item) => qty + item.quantity, 0);

// Highest delivery fee among all cart items
// const deliveryCharge =
//   cartItems.length > 0
//     ? Math.max(...cartItems.map((item) => item.food.delivery_fee))
//     : 0;
// cuurently delivery chatge 0
const deliveryCharge = 0;

// No service fee
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
    decrementItem: (foodId: string, cartItemId: string, currentQty: number) =>
      decrementItemMutation.mutate({ foodId, cartItemId, currentQty }),
    decrementItemAsync: (foodId: string, cartItemId: string, currentQty: number) =>
      decrementItemMutation.mutateAsync({ foodId, cartItemId, currentQty }),
    isAdding: addItemMutation.isPending,
    isRemoving: removeItemMutation.isPending,
    isDecrementing: decrementItemMutation.isPending,
  };
};

export default useCart;
