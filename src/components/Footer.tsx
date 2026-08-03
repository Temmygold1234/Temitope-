import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <h2 className="font-heading text-3xl font-bold mb-6 tracking-tighter uppercase">TEMMYLUXURY</h2>
            <p className="text-gray-400 font-body text-[13px] leading-relaxed mb-6">
              Carefully selected fashion products for modern men and women who appreciate quality, elegance, and style.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white hover:text-brand-pink transition-colors">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white hover:text-brand-pink transition-colors">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white hover:text-brand-pink transition-colors">
                <Twitter size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading italic text-xl mb-6">Explore</h3>
            <ul className="space-y-4 font-ui text-[11px] uppercase tracking-widest text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/collections" className="hover:text-white transition-colors">Collections</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-heading italic text-xl mb-6">Support</h3>
            <ul className="space-y-4 font-ui text-[11px] uppercase tracking-widest text-gray-400">
              <li><Link to="/faq" className="hover:text-white transition-colors">Customer Support</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Delivery Information</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Returns Policy</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading italic text-xl mb-6">Join Our Luxury Circle</h3>
            <p className="text-gray-400 font-body text-[13px] mb-6">
              Subscribe for exclusive offers and new arrivals.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent border-b border-gray-600 px-0 py-2 w-full text-[11px] tracking-widest focus:outline-none focus:border-brand-pink transition-colors text-white font-ui uppercase"
              />
              <button
                type="submit"
                className="font-ui text-[11px] uppercase tracking-[0.2em] hover:text-brand-pink transition-colors ml-4 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-ui uppercase tracking-[0.2em]">
          <p>© 2026 TemmyLuxury Ltd. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="mailto:ridwanatolubodun02@gmail.com" className="hover:text-white transition-colors">Email Us</a>
            <a href="https://wa.me/2347077758928" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
          <p className="mt-4 md:mt-0">Designed by Temmy Gold Creative Services</p>
        </div>
      </div>
    </footer>
  );
}
