import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";

let supabaseUrl = (process.env.SUPABASE_URL || "https://ksewmzuchawakpgcgsqx.supabase.co").trim();
if (supabaseUrl.endsWith('/rest/v1/')) {
  supabaseUrl = supabaseUrl.replace('/rest/v1/', '');
} else if (supabaseUrl.endsWith('/rest/v1')) {
  supabaseUrl = supabaseUrl.replace('/rest/v1', '');
}
const supabaseKey = (process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZXdtenVjaGF3YWtwZ2Nnc3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1ODQ0NDEsImV4cCI6MjEwMTE2MDQ0MX0.33vBVcq5r1gS0cv9Shezp4sNhpSUtDQZAIiC27PLPHE").trim();
const supabase = createClient(supabaseUrl, supabaseKey);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/products", async (req, res) => {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      res.json(data || []);
    } catch (err: any) {
      console.error('Error fetching products:', err.message);
      // Fallback data if table doesn't exist yet
      res.json([
        {
          id: "1",
          name: "Classic White T-Shirt",
          description: "A comfortable, everyday classic made from 100% organic cotton.",
          price: 29.99,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
          category: "T-Shirts"
        },
        {
          id: "2",
          name: "Leather Weekend Bag",
          description: "Premium full-grain leather weekend travel bag with brass hardware.",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
          category: "Accessories"
        }
      ]);
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const newProduct = { ...req.body };
      // Omit id if it's a generic one so Supabase can auto-generate or use the provided UUID
      const { data, error } = await supabase.from('products').insert([newProduct]).select().single();
      if (error) throw error;
      res.status(201).json(data);
    } catch (err: any) {
      console.error('Error creating product:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const { id, ...updateData } = req.body;
      const { data, error } = await supabase.from('products').update(updateData).eq('id', req.params.id).select().single();
      if (error) throw error;
      res.json(data);
    } catch (err: any) {
      console.error('Error updating product:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', req.params.id);
      if (error) throw error;
      res.json({ success: true });
    } catch (err: any) {
      console.error('Error deleting product:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  let fallbackOrders: any[] = [];

  app.get("/api/orders", async (req, res) => {
    try {
      const email = req.query.email;
      const { data, error } = await supabase.from('orders').select('*');
      if (error) throw error;
      let orders = data || [];
      if (email) {
        orders = orders.filter((o: any) => o.customerEmail === email);
      }
      res.json(orders);
    } catch (err: any) {
      console.error('Error fetching orders, using fallback:', err.message);
      let orders = fallbackOrders;
      if (req.query.email) {
        orders = orders.filter((o: any) => o.customerEmail === req.query.email);
      }
      res.json(orders);
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const newOrder = {
        ...req.body,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        status: 'pending' // pending, approved, rejected
      };
      
      const { data, error } = await supabase.from('orders').insert([newOrder]).select().single();
      if (error) throw error;
      res.status(201).json(data);
    } catch (err: any) {
      console.error('Error creating order, using fallback:', err.message);
      const newOrder = {
        ...req.body,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      fallbackOrders.push(newOrder);
      res.status(201).json(newOrder);
    }
  });

  app.put("/api/orders/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const { data, error } = await supabase.from('orders').update({ status }).eq('id', req.params.id).select().single();
      if (error) throw error;
      res.json(data);
    } catch (err: any) {
      console.error('Error updating order status:', err.message);
      const order = fallbackOrders.find(o => o.id === req.params.id);
      if (order) {
        order.status = req.body.status;
      }
      res.json(order || {});
    }
  });

  app.post("/api/cms/home", async (req, res) => {
    try {
      if (process.env.NODE_ENV !== "production") {
        const fs = await import("fs");
        const filePath = path.join(process.cwd(), "src", "cms_home.json");
        await fs.promises.writeFile(filePath, JSON.stringify(req.body, null, 2));
      }
      res.json({ success: true });
    } catch (err: any) {
      console.error("Error saving CMS home data:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Support React Router HTML5 History
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
