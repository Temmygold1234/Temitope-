import { useState, FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const redirect = searchParams.get('redirect');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (redirect === 'checkout') {
      const itemsText = cartItems.map(item => `${item.quantity}x ${item.product.name} ($${item.product.price})`).join('%0A');
      const totalText = `Total: $${cartTotal.toFixed(2)}`;
      const message = `Hello TemmyLuxury Ltd, I would like to place an order:%0A%0A${itemsText}%0A%0A${totalText}`;
      window.open(`https://wa.me/2347077758928?text=${message}`, '_blank');
      clearCart();
      navigate('/');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-10 rounded-sm shadow-sm border border-gray-100"
        >
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl text-brand-black mb-3">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="font-body text-gray-500 text-sm leading-relaxed">
              {redirect === 'checkout' 
                ? 'Please log in to place your order and track delivery.'
                : 'Enter your details to access your account.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs font-ui uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-pink transition-colors" />
              </div>
            )}
            <div>
              <label className="block text-xs font-ui uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
              <input type="email" required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-pink transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-ui uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <input type="password" required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-pink transition-colors" />
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full bg-brand-black text-white font-ui text-sm uppercase tracking-widest py-4 hover:bg-brand-pink transition-colors">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-gray-100">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-ui uppercase tracking-widest text-gray-500 hover:text-brand-pink transition-colors"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
