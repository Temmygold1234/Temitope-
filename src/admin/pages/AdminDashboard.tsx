import { useCMS } from '../../context/CMSContext';
import { Package, Users, DollarSign, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { products } = useCMS();

  const stats = [
    { name: 'Total Products', value: products.length.toString(), icon: Package, color: 'bg-blue-500' },
    { name: 'Featured Products', value: products.filter(p => p.isTrending).length.toString(), icon: Star, color: 'bg-yellow-500' },
    { name: 'New Arrivals', value: products.filter(p => p.isNewArrival).length.toString(), icon: ShoppingCart, color: 'bg-green-500' },
    { name: 'Newsletter Subscribers', value: '1,240', icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`rounded-md p-3 ${item.color} text-white`}>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/products" className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              <span className="font-medium text-gray-900">Add New Product</span>
              <ArrowRight size={16} className="text-gray-400" />
            </Link>
            <Link to="/admin/home" className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              <span className="font-medium text-gray-900">Edit Home Page</span>
              <ArrowRight size={16} className="text-gray-400" />
            </Link>
            <Link to="/admin/live-sales" className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              <span className="font-medium text-gray-900">Manage Notifications</span>
              <ArrowRight size={16} className="text-gray-400" />
            </Link>
            <Link to="/admin/settings" className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              <span className="font-medium text-gray-900">Store Settings</span>
              <ArrowRight size={16} className="text-gray-400" />
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-500 italic">Activity log will appear here...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Star(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
