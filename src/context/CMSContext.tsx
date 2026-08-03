import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PRODUCTS, CATEGORIES, Product } from '../data';

interface CMSContextType {
  products: Product[];
  categories: any[];
  homeSettings: any;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateHomeSettings: (settings: any) => void;
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
  ]
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [homeSettings, setHomeSettings] = useState<any>(defaultHomeSettings);

  useEffect(() => {
    // Load from backend
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(PRODUCTS);
        }
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setProducts(PRODUCTS);
      });

    const storedCategories = localStorage.getItem('cms_categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(CATEGORIES);
    }

    const storedHome = localStorage.getItem('cms_home');
    if (storedHome) {
      setHomeSettings(JSON.parse(storedHome));
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const updateProduct = (updatedProduct: Product) => {
    fetch(`/api/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    }).then(res => res.json())
      .then(data => {
        setProducts(products.map(p => p.id === data.id ? data : p));
      }).catch(err => console.error("Failed to update product", err));
  };

  const addProduct = (product: Product) => {
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(res => res.json())
      .then(newProduct => setProducts([...products, newProduct]));
  };

  const deleteProduct = (id: string) => {
    fetch(`/api/products/${id}`, { method: 'DELETE' })
      .then(() => setProducts(products.filter(p => p.id !== id)));
  };

  const updateHomeSettings = (settings: any) => {
    setHomeSettings(settings);
    localStorage.setItem('cms_home', JSON.stringify(settings));
  };

  return (
    <CMSContext.Provider value={{
      products,
      categories,
      homeSettings,
      updateProduct,
      addProduct,
      deleteProduct,
      updateHomeSettings
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
