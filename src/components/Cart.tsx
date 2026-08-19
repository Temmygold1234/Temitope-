import { useCart } from '../context/CartContext';
import { useCustomer } from '../context/CustomerContext';
import { api } from '../lib/api';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { customer, fetchOrders } = useCustomer();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (customer) {
      try {
        const orderData = {
          customerName: customer.name,
          customerEmail: customer.email,
          items: cartItems.map(item => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
          })),
          total: cartTotal
        };

        const newOrder = await api.createOrder(orderData);
        clearCart();
        fetchOrders();
        setIsCartOpen(false);
        navigate(`/account?orderSuccess=${newOrder.id}`);
      } catch (err) {
        console.error("Order failed", err);
        alert("Failed to place order. Please try again.");
      }
    } else {
      setIsCartOpen(false);
      navigate('/login?redirect=checkout');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-heading text-2xl text-brand-black flex items-center gap-2">
                <ShoppingBag size={24} />
                Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <ShoppingBag size={48} className="mb-4 opacity-20" />
                  <p className="font-heading text-xl mb-2">Your cart is empty</p>
                  <p className="font-body text-sm mb-6">Discover our latest collections</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-brand-black text-white px-8 py-3 font-ui text-sm uppercase tracking-widest hover:bg-brand-pink transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-sm overflow-hidden shrink-0">
                      <img
                        src={item.product.image || undefined}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-heading text-lg leading-tight">{item.product.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-brand-pink transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="font-ui text-sm text-gray-500 mb-auto">${item.product.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border border-gray-200 rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-ui text-sm w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-ui uppercase tracking-widest text-sm text-gray-500">Subtotal</span>
                  <span className="font-heading text-2xl">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-black text-white py-4 font-ui text-sm uppercase tracking-widest hover:bg-brand-pink transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
