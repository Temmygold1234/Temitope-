import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import LiveSalesNotifications from './LiveSalesNotifications';
import { MessageCircle } from 'lucide-react';
import { CartProvider } from '../context/CartContext';
import Cart from './Cart';

export default function Layout() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col selection:bg-brand-pink selection:text-white relative">
        <Navigation />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <LiveSalesNotifications />
        <ScrollRestoration />
        <Cart />
        
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/2347077758928?text=Hello%20TemmyLuxury%20Ltd,%20I'm%20interested%20in%20your%20luxury%20products."
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-110 transition-transform duration-300 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      </div>
    </CartProvider>
  );
}
