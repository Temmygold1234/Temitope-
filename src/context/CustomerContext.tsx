import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { api } from '../lib/api';

interface Customer {
  name: string;
  email: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: any[];
  total: number;
  status: string;
  createdAt: string;
}

interface CustomerContextType {
  customer: Customer | null;
  orders: Order[];
  loginCustomer: (name: string, email: string) => void;
  logoutCustomer: () => void;
  fetchOrders: () => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedCustomer = localStorage.getItem('customer_auth');
    if (savedCustomer) {
      const parsed = JSON.parse(savedCustomer);
      setCustomer(parsed);
    }
  }, []);

  const fetchOrders = () => {
    if (customer?.email) {
      api.getOrders(customer.email)
        .then(data => setOrders(data))
        .catch(err => console.error("Failed to fetch orders", err));
    }
  };

  useEffect(() => {
    if (customer) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [customer]);

  const loginCustomer = (name: string, email: string) => {
    const newCustomer = { name, email };
    setCustomer(newCustomer);
    localStorage.setItem('customer_auth', JSON.stringify(newCustomer));
  };

  const logoutCustomer = () => {
    setCustomer(null);
    localStorage.removeItem('customer_auth');
  };

  return (
    <CustomerContext.Provider value={{ customer, orders, loginCustomer, logoutCustomer, fetchOrders }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
}
