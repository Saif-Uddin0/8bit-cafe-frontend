export interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  // Details page
  service: string;
  shortDescription: string;
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
    service: "Fresh Seafood Special",
    shortDescription:
      "Golden crispy fried shrimp served with our signature seafood sauce. A crunchy and flavorful favorite for seafood lovers.",
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
    service: "Premium Refreshment",
    shortDescription:
      "Freshly squeezed lime juice blended with mint and ice to deliver a cool and refreshing experience.",
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
    service: "Crispy Snack Platter",
    shortDescription:
      "Bite-sized crispy chicken popcorn seasoned with herbs and spices, perfect for sharing or snacking.",
    rating: 4.7,
    reviewsCount: 112,
    deliveryTime: 25,
    deliveryFee: 30,
  },

  {
    id: 4,
    name: "Matcha Ice Cream",
    price: 15,
    image: "https://i.postimg.cc/pXk6FqTB/images-(1).jpg",
    category: "Dessert",
    service: "Sweet Dessert Collection",
    shortDescription:
      "Creamy premium matcha ice cream with a smooth texture and authentic Japanese green tea flavor.",
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
    service: "Fresh Seafood Special",
    shortDescription:
      "Tender calamari rings coated in crispy breadcrumbs and served with a delicious garlic dip.",
    rating: 4.5,
    reviewsCount: 72,
    deliveryTime: 20,
    deliveryFee: 30,
  },

  {
    id: 6,
    name: "Garlic Bread",
    price: 9,
    image: "https://i.postimg.cc/pdZyJTGy/classic-garlic-bread-84954-16x9.jpg",
    category: "Snack",
    service: "Crispy Snack Platter",
    shortDescription:
      "Freshly baked garlic bread topped with melted butter, herbs, and roasted garlic for rich flavor.",
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
    service: "Premium Refreshment",
    shortDescription:
      "Refreshing homemade mint lemonade prepared with fresh lemons, mint leaves, and chilled ice.",
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
    service: "Sweet Dessert Collection",
    shortDescription:
      "Rich chocolate brownie baked with premium cocoa and topped with a soft, fudgy center.",
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
    service: "Gourmet Burger Combo",
    shortDescription:
      "Juicy grilled beef burger layered with fresh lettuce, cheese, tomatoes, and our signature burger sauce.",
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
    service: "Italian Pasta Delight",
    shortDescription:
      "Classic creamy carbonara prepared with parmesan cheese, herbs, and perfectly cooked pasta.",
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
    service: "Fresh Seafood Special",
    shortDescription:
      "Fresh prawns cooked in a rich spicy curry with aromatic herbs and traditional homemade spices.",
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
    service: "Crispy Snack Platter",
    shortDescription:
      "Golden crispy fries loaded with creamy cheese sauce and topped with flavorful seasoning.",
    rating: 4.5,
    reviewsCount: 156,
    deliveryTime: 15,
    deliveryFee: 20,
  },
];
