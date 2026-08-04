import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';
import { LogOut, Package, User, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function Account() {
  const { customer, orders, logoutCustomer, fetchOrders } = useCustomer();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderSuccessId = searchParams.get('orderSuccess');

  useEffect(() => {
    if (!customer) {
      navigate('/login');
    }
  }, [customer, navigate]);

  if (!customer) return null;

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {orderSuccessId && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-sm flex items-start gap-3">
            <CheckCircle className="text-green-500 mt-0.5 shrink-0" size={20} />
            <div>
              <h3 className="font-heading text-green-800 text-lg">Order Successfully Placed!</h3>
              <p className="font-body text-green-700 text-sm mt-1">
                Your order #{orderSuccessId} has been received. We will review it shortly.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={24} className="text-gray-400" />
                </div>
                <div>
                  <h2 className="font-heading text-lg leading-tight">{customer.name}</h2>
                  <p className="font-body text-xs text-gray-500">{customer.email}</p>
                </div>
              </div>
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-2 bg-gray-50 text-brand-black rounded-sm font-ui text-sm transition-colors">
                  <Package size={18} />
                  My Orders
                </button>
                <button 
                  onClick={() => {
                    logoutCustomer();
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-50 hover:text-brand-black rounded-sm font-ui text-sm transition-colors"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-heading text-2xl text-brand-black">Order History</h2>
                <button onClick={fetchOrders} className="text-sm font-ui text-gray-500 hover:text-brand-black flex items-center gap-2">
                  <Clock size={16} /> Refresh
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="font-body text-gray-500 mb-6">You haven't placed any orders yet.</p>
                  <button 
                    onClick={() => navigate('/shop')}
                    className="bg-brand-black text-white px-8 py-3 font-ui text-sm uppercase tracking-widest hover:bg-brand-pink transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order, i) => (
                    <motion.div 
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="border border-gray-100 rounded-sm overflow-hidden"
                    >
                      <div className="bg-gray-50 p-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                        <div>
                          <p className="font-ui text-xs text-gray-500 uppercase tracking-widest mb-1">Order Placed</p>
                          <p className="font-body text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="font-ui text-xs text-gray-500 uppercase tracking-widest mb-1">Total</p>
                          <p className="font-body text-sm font-medium">${order.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="font-ui text-xs text-gray-500 uppercase tracking-widest mb-1">Status</p>
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                            ${order.status === 'approved' ? 'bg-green-100 text-green-800' : 
                              order.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-ui text-xs text-gray-500 uppercase tracking-widest mb-1">Order #</p>
                          <p className="font-body text-sm">{order.id}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <ul className="divide-y divide-gray-100">
                          {order.items.map((item: any, idx: number) => (
                            <li key={idx} className="py-3 flex justify-between items-center">
                              <span className="font-body text-sm">
                                {item.quantity}x {item.name}
                              </span>
                              <span className="font-body text-sm text-gray-500">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                           <a 
                            href={`https://wa.me/2347077758928?text=${encodeURIComponent(`Hello TemmyLuxury Ltd, I'm following up on my order #${order.id}.\n\nOrder Details:\n${order.items.map((i: any) => `${i.quantity}x ${i.name}`).join('\n')}\n\nTotal: $${order.total.toFixed(2)}`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-ui text-[#25D366] hover:text-[#1EBE5D] transition-colors"
                          >
                            <ExternalLink size={16} /> Contact Support on WhatsApp
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
