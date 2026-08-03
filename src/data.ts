export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  isTrending?: boolean;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  description?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Classic Leather Handbag",
    price: 1250,
    category: "Handbags",
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
    ],
    isTrending: true,
    isNewArrival: true,
    description: "A timeless leather handbag crafted with precision and elegance."
  },
  {
    id: "p2",
    name: "Oud & Wood Perfume",
    price: 350,
    category: "Perfumes",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    isTrending: true,
    description: "An exotic blend of rich woods and subtle floral notes."
  },
  {
    id: "p3",
    name: "Diamond Stud Earrings",
    price: 2800,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    isTrending: true,
    description: "Elegant diamond studs perfect for evening luxury."
  },
  {
    id: "p4",
    name: "Chronograph Gold Watch",
    price: 4500,
    category: "Watches",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
    isOnSale: true,
    description: "Precision meets luxury in this stunning gold chronograph."
  },
  {
    id: "p5",
    name: "Suede Pointed Heels",
    price: 850,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
    isNewArrival: true,
    description: "Classic suede pointed heels for any occasion."
  },
  {
    id: "p6",
    name: "Designer Silk Scarf",
    price: 220,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800&q=80",
    description: "A beautifully printed silk scarf."
  },
  {
    id: "p7",
    name: "Oversized Sunglasses",
    price: 420,
    category: "Sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    isTrending: true,
    description: "Protect your eyes in style."
  },
  {
    id: "p8",
    name: "Premium Suede Belt",
    price: 180,
    category: "Belts",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    description: "Genuine leather and suede belt."
  }
];

export const CATEGORIES = [
  { name: "Clothing", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" },
  { name: "Shoes", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80" },
  { name: "Perfumes", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80" },
  { name: "Handbags", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80" },
  { name: "Watches", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80" },
  { name: "Jewelry", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80" },
  { name: "Caps", image: "https://images.unsplash.com/photo-1521369909029-2afed882ba54?w=800&q=80" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800&q=80" }
];
