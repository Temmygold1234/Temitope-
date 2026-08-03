import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `fixed w-full z-50 transition-all duration-300 font-ui ${
    isScrolled || !isHomePage ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 text-brand-black' : 'bg-transparent text-white border-b border-transparent'
  }`;

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[70px] px-4 md:px-8">
            {/* Logo */}
            <Link to="/" className="font-heading text-3xl font-bold tracking-tighter uppercase">
              TEMMYLUXURY
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[12px] font-semibold uppercase tracking-widest hover:text-brand-pink transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <Link to="/admin" className="opacity-30 hover:opacity-100 transition-opacity" title="Admin">
                <Settings size={14} strokeWidth={2} />
              </Link>
              <button className="hover:text-brand-pink transition-colors">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button className="hover:text-brand-pink transition-colors">
                <Heart size={20} strokeWidth={1.5} />
              </button>
              <button 
                className="hover:text-brand-pink transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-pink text-brand-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="md:hidden hover:text-brand-pink transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-black">
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 space-y-8 font-ui">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl text-brand-black uppercase tracking-widest hover:text-brand-pink transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
