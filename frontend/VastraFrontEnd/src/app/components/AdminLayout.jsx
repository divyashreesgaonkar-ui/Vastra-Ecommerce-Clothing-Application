import { useNavigate } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Package, ShoppingCart as CartIcon, Grid, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { logout } = useApp();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: CartIcon, label: 'Orders', path: '/admin/orders' },
    { icon: Grid, label: 'Categories', path: '/admin/categories' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <ShoppingBag className="h-8 w-8 text-indigo-400" />
          <span className="text-xl">Vasthra Admin</span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="space-y-2 border-t border-gray-800 pt-4">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800 hover:text-white" onClick={() => navigate('/home')}>
            <ShoppingBag className="mr-3 h-5 w-5" />
            View Store
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800 hover:text-white" onClick={handleLogout}>
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
