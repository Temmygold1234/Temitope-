import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, ShoppingBag, Grid, FileText, Settings, 
  LogOut, Menu, X, Users, MessageSquare, Image, Star,
  Bell, Globe, User, LayoutTemplate
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Hero & Banners', icon: LayoutTemplate, path: '/admin/hero-banners' },
  { name: 'Home Page', icon: Globe, path: '/admin/home' },
  { name: 'Product Manager', icon: ShoppingBag, path: '/admin/products' },
  { name: 'Categories', icon: Grid, path: '/admin/categories' },
  { name: 'Collections', icon: Star, path: '/admin/collections' },
  { name: 'About Page', icon: FileText, path: '/admin/about' },
  { name: 'Contact Page', icon: MessageSquare, path: '/admin/contact' },
  { name: 'Media Library', icon: Image, path: '/admin/media' },
  { name: 'Live Sales', icon: Bell, path: '/admin/live-sales' },
  { name: 'Newsletter', icon: Users, path: '/admin/newsletter' },
  { name: 'Website Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200 justify-between lg:justify-center">
          <Link to="/admin" className="font-heading font-bold text-xl uppercase tracking-widest text-black">
            Temmy Admin
          </Link>
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'}
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon size={18} className={`mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
              <User size={16} />
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <button 
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center space-x-4 ml-auto">
            <Link 
              to="/" 
              target="_blank"
              className="text-sm font-medium text-gray-600 hover:text-black hidden sm:flex items-center gap-2"
            >
              <Globe size={16} />
              View Live Site
            </Link>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
