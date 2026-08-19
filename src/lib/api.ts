import { safeJSONParse } from "./json_safe";
import { supabase } from './supabase';
import { PRODUCTS } from '../data';

export const api = {
  getProducts: async () => {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      return data && data.length > 0 ? data : PRODUCTS;
    } catch (err) {
      // Supabase not available, use static data without throwing unhandled error to console
      return PRODUCTS;
    }
  },
  
  createProduct: async (product: any) => {
    try {
      const { data, error } = await supabase.from('products').insert([product]).select().single();
      if (error) throw error;
      return data;
    } catch (err) {
      // Fallback
      return { ...product, id: Math.random().toString(36).substr(2, 9) };
    }
  },
  
  updateProduct: async (id: string, product: any) => {
    try {
      const { data, error } = await supabase.from('products').update(product).eq('id', id).select().single();
      if (error) throw error;
      return data;
    } catch (err) {
      // Fallback
      return { ...product, id };
    }
  },
  
  deleteProduct: async (id: string) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      // Fallback
      return true;
    }
  },
  
  getOrders: async (email?: string) => {
    try {
      let query = supabase.from('orders').select('*');
      if (email) {
        query = query.eq('customerEmail', email);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (err) {
      // Fallback to local storage if Supabase fails
      const stored = localStorage.getItem('fallback_orders');
      let orders = stored ? safeJSONParse(stored, []) : [];
      if (email) {
        orders = orders.filter((o: any) => o.customerEmail === email);
      }
      return orders;
    }
  },
  
  createOrder: async (order: any) => {
    try {
      const newOrder = {
        ...order,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      const { data, error } = await supabase.from('orders').insert([newOrder]).select().single();
      if (error) throw error;
      return data;
    } catch (err) {
      const newOrder = {
        ...order,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      const stored = localStorage.getItem('fallback_orders');
      let orders = stored ? safeJSONParse(stored, []) : [];
      orders.push(newOrder);
      localStorage.setItem('fallback_orders', JSON.stringify(orders));
      return newOrder;
    }
  },
  
  updateOrderStatus: async (id: string, status: string) => {
    try {
      const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single();
      if (error) throw error;
      return data;
    } catch (err) {
      const stored = localStorage.getItem('fallback_orders');
      if (stored) {
        let orders = safeJSONParse(stored, []);
        const index = orders.findIndex((o: any) => o.id === id);
        if (index > -1) {
          orders[index].status = status;
          localStorage.setItem('fallback_orders', JSON.stringify(orders));
          return orders[index];
        }
      }
      return { id, status };
    }
  }
};
