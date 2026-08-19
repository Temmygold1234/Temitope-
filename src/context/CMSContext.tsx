import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PRODUCTS, CATEGORIES, Product } from '../data';
import { api } from '../lib/api';

interface CMSContextType {
  products: Product[];
  categories: any[];
  homeSettings: any;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateHomeSettings: (settings: any) => void;
  addCategory: (category: any) => void;
  updateCategory: (oldName: string, newCategory: any) => void;
  deleteCategory: (name: string) => void;
}

const defaultHomeSettings = {
  hero: {
    transitionEffect: "fade",
    displayDuration: 6000,
    slides: [
      {
        id: "slide-1",
        image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?w=1600&q=80",
        title: "Luxury That Speaks Before You Do",
        subtitle: "Discover timeless fashion pieces carefully selected to elevate your everyday style.",
        description: "",
        button1Text: "Shop Collection",
        button1Link: "/shop",
        button2Text: "New Arrivals",
        button2Link: "/shop?new=true",
        overlayOpacity: 40,
        textAlign: "left",
        enabled: true
      },
      {
        id: "slide-2",
        image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=1600&q=80",
        title: "Crafted for Elegance",
        subtitle: "Exclusive handbags designed to make a statement wherever you go.",
        description: "",
        button1Text: "Shop Handbags",
        button1Link: "/shop?category=handbags",
        button2Text: "",
        button2Link: "",
        overlayOpacity: 30,
        textAlign: "center",
        enabled: true
      },
      {
        id: "slide-3",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1600&q=80",
        title: "Timeless Precision",
        subtitle: "Premium watches that blend sophisticated engineering with bold design.",
        description: "",
        button1Text: "Shop Watches",
        button1Link: "/shop?category=watches",
        button2Text: "",
        button2Link: "",
        overlayOpacity: 50,
        textAlign: "right",
        enabled: true
      }
    ]
  },
  banners: [
    {
      id: "banner-1",
      type: "Flash Sale Banner",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
      heading: "Weekend Flash Sale",
      description: "Up to 50% off selected items.",
      buttonText: "Shop Sale",
      buttonLink: "/shop?sale=true",
      position: "middle",
      enabled: false
    }
  ],
  instagram: [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
    "https://images.unsplash.com/photo-1599643478524-fb66f70a0066?w=500&q=80",
    "https://images.unsplash.com/photo-1618218168350-6e7c81151b64?w=500&q=80",
    "https://images.unsplash.com/photo-1582588677317-046649f8546b?w=500&q=80",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80"
  ]
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [homeSettings, setHomeSettings] = useState<any>(defaultHomeSettings);

  useEffect(() => {
    // Load from backend
    api.getProducts().then(data => setProducts(data));

    const storedCategories = localStorage.getItem('cms_categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(CATEGORIES);
    }

    const storedHome = localStorage.getItem('cms_home');
    if (storedHome) {
      const parsed = JSON.parse(storedHome);
      // Merge with default to ensure instagram exists if it was saved before instagram was added
      setHomeSettings({ ...defaultHomeSettings, ...parsed, instagram: parsed.instagram || defaultHomeSettings.instagram });
    }
  }, []);

  const updateProduct = (updatedProduct: Product) => {
    api.updateProduct(updatedProduct.id, updatedProduct)
      .then(data => {
        setProducts(products.map(p => p.id === data.id ? data : p));
      }).catch(err => console.error("Failed to update product", err));
  };

  const addProduct = (product: Product) => {
    api.createProduct(product)
      .then(newProduct => setProducts([...products, newProduct]))
      .catch(err => console.error("Failed to add product", err));
  };

  const deleteProduct = (id: string) => {
    api.deleteProduct(id)
      .then(() => setProducts(products.filter(p => p.id !== id)))
      .catch(err => console.error("Failed to delete product", err));
  };

  const updateHomeSettings = (settings: any) => {
    setHomeSettings(settings);
    localStorage.setItem('cms_home', JSON.stringify(settings));
  };

  const addCategory = (category: any) => {
    const newCategories = [...categories, category];
    setCategories(newCategories);
    localStorage.setItem('cms_categories', JSON.stringify(newCategories));
  };

  const updateCategory = (oldName: string, newCategory: any) => {
    const newCategories = categories.map(c => c.name === oldName ? newCategory : c);
    setCategories(newCategories);
    localStorage.setItem('cms_categories', JSON.stringify(newCategories));
  };

  const deleteCategory = (name: string) => {
    const newCategories = categories.filter(c => c.name !== name);
    setCategories(newCategories);
    localStorage.setItem('cms_categories', JSON.stringify(newCategories));
  };

  return (
    <CMSContext.Provider value={{
      products,
      categories,
      homeSettings,
      updateProduct,
      addProduct,
      deleteProduct,
      updateHomeSettings,
      addCategory,
      updateCategory,
      deleteCategory
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
