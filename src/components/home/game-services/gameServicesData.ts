// Shared types and data for the Game Services feature.
// Import from this file in cards, modals, and sections.

export interface GameService {
  id: number;
  name: string;
  category: string;
  duration: string;
  price: number;
  image: string;
}

export const SERVICES: GameService[] = [
  {
    id: 1,
    name: "Street Fighter 6",
    category: "Arcade Fighting",
    duration: "30 Minutes",
    price: 99,
    image: "/street_fighter.png",
  },
  {
    id: 2,
    name: "Premium Pool Lounge",
    category: "Lounge Billiards",
    duration: "60 Minutes",
    price: 150,
    image: "/pool_table.png",
  },
  {
    id: 3,
    name: "PlayStation 5 Pro Lounge",
    category: "Console Gaming",
    duration: "60 Minutes",
    price: 180,
    image: "/ps5_lounge.png",
  },
  {
    id: 4,
    name: "FIFA 26 Tournament",
    category: "Sports Console",
    duration: "30 Minutes",
    price: 99,
    image: "/fifa_play.png",
  },
  {
    id: 5,
    name: "VR Racing Simulator",
    category: "Virtual Reality",
    duration: "30 Minutes",
    price: 120,
    image: "/vr_racing.png",
  },
  {
    id: 6,
    name: "Esports PC Station",
    category: "Competitive PC",
    duration: "60 Minutes",
    price: 180,
    image: "/esports_pc.png",
  },
  {
    id: 7,
    name: "Retro Arcade Lounge",
    category: "Classic Gaming",
    duration: "60 Minutes",
    price: 80,
    image: "/banner-2.png",
  },
];

export const TIME_SLOTS: string[] = [
  "10:00 Am", "10:30 Am", "11:00 Am", "11:30 Am",
  "12:00 Pm", "12:30 Pm", "01:00 Pm", "01:30 Pm",
  "02:00 Pm", "02:30 Pm", "03:00 Pm", "03:30 Pm",
  "04:00 Pm", "04:30 Pm", "05:00 Pm", "05:30 Pm",
];

export const SERVICE_FEE = 15; // Tk
