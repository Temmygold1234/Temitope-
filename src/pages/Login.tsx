import { useState, FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useCustomer } from '../context/CustomerContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { loginCustomer, fetchOrders } = useCustomer();
  const redirect = searchParams.get('redirect');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string || email.split('@')[0];

    loginCustomer(name, email);

    if (redirect === 'checkout') {
      try {
        const orderData = {
          customerName: name,
          customerEmail: email,
          items: cartItems.map(item => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
          })),
          total: cartTotal
        };

        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });

        const newOrder = await res.json();
        clearCart();
        fetchOrders();
        navigate(`/account?orderSuccess=${newOrder.id}`);
      } catch (err) {
        console.error("Order failed", err);
        alert("Failed to place order. Please try again.");
      }
    } else {
      navigate('/account');
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
                <input type="text" name="name" required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-pink transition-colors" />
              </div>
            )}
            <div>
              <label className="block text-xs font-ui uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
              <input type="email" name="email" required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-pink transition-colors" />
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
              type="button"
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
