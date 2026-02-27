import AdminLayout from '../../components/AdminLayout';
import { Card } from '../../components/ui/card';
import { adminStats } from '/src/app/data/mockData';

import { Users, ShoppingCart, DollarSign, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';


export default function AdminDashboard() {
  const stats = [
    { title: 'Total Users', value: adminStats.totalUsers.toLocaleString(), icon: Users, color: 'bg-blue-500' },
    { title: 'Total Orders', value: adminStats.totalOrders.toLocaleString(), icon: ShoppingCart, color: 'bg-green-500' },
    { title: 'Revenue', value: `$${adminStats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Products', value: adminStats.totalProducts.toLocaleString(), icon: Package, color: 'bg-orange-500' },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl mb-6">Sales Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={adminStats.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl mb-6">Orders Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={adminStats.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
