import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Ticket,
  MapPin,
  Clock,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Zap,
  Calendar,
  DollarSign,
  UserCheck,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AdminPortalPage() {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock data for dashboard
  const stats = [
    { label: 'Total Visitors Today', value: '2,847', change: '+12%', trend: 'up', icon: Users },
    { label: 'Tickets Sold', value: '1,234', change: '+8%', trend: 'up', icon: Ticket },
    { label: 'Revenue Today', value: 'RM 145,230', change: '+15%', trend: 'up', icon: DollarSign },
    { label: 'Avg Wait Time', value: '18 min', change: '-5%', trend: 'down', icon: Clock },
  ];

  const attractions = [
    { name: 'Dragon Coaster', zone: 'Adventure Land', status: 'operational', waitTime: 25, capacity: 85 },
    { name: 'River Rapids', zone: 'Water World', status: 'operational', waitTime: 15, capacity: 72 },
    { name: 'Sky Tower', zone: 'Future Zone', status: 'maintenance', waitTime: 0, capacity: 0 },
    { name: 'Jungle Safari', zone: 'Wildlife Kingdom', status: 'operational', waitTime: 20, capacity: 65 },
    { name: 'Haunted Mansion', zone: 'Mystery Lane', status: 'operational', waitTime: 30, capacity: 90 },
  ];

  const alerts = [
    { type: 'warning', message: 'Sky Tower scheduled maintenance until 2:00 PM', time: '10 min ago' },
    { type: 'info', message: 'Virtual Queue slots for Dragon Coaster 80% filled', time: '25 min ago' },
    { type: 'success', message: 'River Rapids maintenance completed', time: '1 hour ago' },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attractions', label: 'Attractions', icon: MapPin },
    { id: 'tickets', label: 'Tickets & Sales', icon: Ticket },
    { id: 'visitors', label: 'Visitors', icon: Users },
    { id: 'queue', label: 'Queue Management', icon: Clock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'staff', label: 'Staff', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Theme Park</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  activeSection === item.id
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Back to main site */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Button asChild variant="outline" className="w-full">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-sm font-medium text-orange-600">AD</span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Admin User</p>
                <p className="text-gray-500 text-xs">Park Manager</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-500">Welcome back! Here's what's happening at the park today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    stat.trend === 'up' ? "text-green-600" : "text-red-600"
                  )}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Attractions Status */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Attractions Status</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>

              <div className="space-y-4">
                {attractions.map((attraction, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        attraction.status === 'operational' ? "bg-green-500" : "bg-yellow-500"
                      )} />
                      <div>
                        <h4 className="font-medium text-gray-900">{attraction.name}</h4>
                        <p className="text-sm text-gray-500">{attraction.zone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{attraction.waitTime} min</p>
                        <p className="text-xs text-gray-500">Wait Time</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{attraction.capacity}%</p>
                        <p className="text-xs text-gray-500">Capacity</p>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        attraction.status === 'operational'
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}>
                        {attraction.status === 'operational' ? 'Operational' : 'Maintenance'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
                <Button variant="ghost" size="sm">Clear All</Button>
              </div>

              <div className="space-y-4">
                {alerts.map((alert, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                    {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />}
                    {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />}
                    {alert.type === 'info' && <Bell className="w-5 h-5 text-blue-500 shrink-0" />}
                    <div>
                      <p className="text-sm text-gray-700">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
                <p className="text-orange-100">Common tasks for park management</p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-white text-orange-600 hover:bg-orange-50">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Event
                </Button>
                <Button className="bg-white/20 text-white hover:bg-white/30 border-white/30" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Staff
                </Button>
              </div>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="mt-8 text-center p-6 bg-orange-50 rounded-2xl border border-orange-200">
            <p className="text-orange-800 font-medium">This is a demo of the Admin Portal</p>
            <p className="text-orange-600 text-sm mt-1">All data shown is simulated for demonstration purposes</p>
            <Button asChild className="mt-4 gradient-accent text-white">
              <Link to="/demo">Back to Demo Page</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
