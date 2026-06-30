export interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewsCount: number;
  deliveryTime: number; // in minutes
  deliveryFee: number; // in Tk
}

export interface FoodCategory {
  id: string;
  name: string;
  image: string;
}

export const FOOD_CATEGORIES: FoodCategory[] = [
  {
    id: "Beverages",
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "Snack",
    name: "Snack",
    image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "Seafood",
    name: "Seafood",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "Dessert",
    name: "Dessert",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "Burger",
    name: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "Pasta",
    name: "Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&auto=format&fit=crop&q=80",
  },
];

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 1,
    name: "Fried Shrimp",
    price: 29,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=80",
    category: "Seafood",
    rating: 4.8,
    reviewsCount: 163,
    deliveryTime: 20,
    deliveryFee: 30,
  },
  {
    id: 2,
    name: "Fresh Lime Juice",
    price: 12,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80",
    category: "Beverages",
    rating: 4.6,
    reviewsCount: 84,
    deliveryTime: 15,
    deliveryFee: 20,
  },
  {
    id: 3,
    name: "Chicken Popcorn",
    price: 18,
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500&auto=format&fit=crop&q=80",
    category: "Snack",
    rating: 4.7,
    reviewsCount: 112,
    deliveryTime: 25,
    deliveryFee: 30,
  },
  {
    id: 4,
    name: "Matcha Ice Cream",
    price: 15,
    image: "https://images.unsplash.com/photo-1505394033221-400e62143763?w=500&auto=format&fit=crop&q=80",
    category: "Dessert",
    rating: 4.9,
    reviewsCount: 145,
    deliveryTime: 10,
    deliveryFee: 20,
  },
  {
    id: 5,
    name: "Calamari Rings",
    price: 24,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=80",
    category: "Seafood",
    rating: 4.5,
    reviewsCount: 72,
    deliveryTime: 20,
    deliveryFee: 30,
  },
  {
    id: 6,
    name: "Garlic Bread",
    price: 9,
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&auto=format&fit=crop&q=80",
    category: "Snack",
    rating: 4.4,
    reviewsCount: 95,
    deliveryTime: 15,
    deliveryFee: 20,
  },
  {
    id: 7,
    name: "Mint Lemonade",
    price: 11,
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&auto=format&fit=crop&q=80",
    category: "Beverages",
    rating: 4.8,
    reviewsCount: 129,
    deliveryTime: 12,
    deliveryFee: 20,
  },
  {
    id: 8,
    name: "Chocolate Brownie",
    price: 16,
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&auto=format&fit=crop&q=80",
    category: "Dessert",
    rating: 4.9,
    reviewsCount: 204,
    deliveryTime: 15,
    deliveryFee: 25,
  },
  {
    id: 9,
    name: "Classic Burger",
    price: 22,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
    category: "Burger",
    rating: 4.7,
    reviewsCount: 198,
    deliveryTime: 20,
    deliveryFee: 25,
  },
  {
    id: 10,
    name: "Pasta Carbonara",
    price: 19,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&auto=format&fit=crop&q=80",
    category: "Pasta",
    rating: 4.6,
    reviewsCount: 87,
    deliveryTime: 22,
    deliveryFee: 25,
  },
  {
    id: 11,
    name: "Prawn Curry",
    price: 26,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=80",
    category: "Seafood",
    rating: 4.8,
    reviewsCount: 143,
    deliveryTime: 25,
    deliveryFee: 30,
  },
  {
    id: 12,
    name: "Cheese Fries",
    price: 13,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80",
    category: "Snack",
    rating: 4.5,
    reviewsCount: 156,
    deliveryTime: 15,
    deliveryFee: 20,
  },
];
