import { safeJSONParse } from "../lib/json_safe";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PRODUCTS, CATEGORIES, Product } from '../data';
import { api } from '../lib/api';
import defaultHomeSettings from '../cms_home.json';

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
      setCategories(safeJSONParse(storedCategories, CATEGORIES));
    } else {
      setCategories(CATEGORIES);
    }

    const storedHome = localStorage.getItem('cms_home');
    if (storedHome) {
      const parsed: any = safeJSONParse(storedHome, {});
      const mergedSettings = {
        ...defaultHomeSettings,
        ...parsed,
        hero: {
          ...(defaultHomeSettings.hero || {}),
          ...(parsed.hero || {}),
          slides: Array.isArray(parsed.hero?.slides) ? parsed.hero.slides : (Array.isArray(defaultHomeSettings.hero?.slides) ? defaultHomeSettings.hero.slides : [])
        },
        banners: Array.isArray(parsed.banners) ? parsed.banners : (Array.isArray(defaultHomeSettings.banners) ? defaultHomeSettings.banners : []),
        instagram: parsed.instagram || defaultHomeSettings.instagram || {}
      };
      setHomeSettings(mergedSettings);
    } else {
      setHomeSettings(defaultHomeSettings);
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
    
    // Also save to backend file so it can be committed
    fetch('/api/cms/home', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings)
    }).catch(err => console.error('Failed to save CMS home to file:', err));
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
