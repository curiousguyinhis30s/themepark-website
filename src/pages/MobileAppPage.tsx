import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  MapPin,
  Ticket,
  User,
  Clock,
  Star,
  ChevronRight,
  Bell,
  QrCode,
  Navigation,
  Zap,
  Heart,
  Search,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function MobileAppPage() {
  const [activeTab, setActiveTab] = useState('home');

  // Mock data
  const featuredAttractions = [
    { name: 'Dragon Coaster', zone: 'Adventure Land', waitTime: 25, rating: 4.8, image: '🎢' },
    { name: 'River Rapids', zone: 'Water World', waitTime: 15, rating: 4.6, image: '🌊' },
    { name: 'Haunted Mansion', zone: 'Mystery Lane', waitTime: 30, rating: 4.9, image: '👻' },
  ];

  const myTickets = [
    { type: 'Day Pass', date: 'Today', status: 'active', code: 'TP-2024-1234' },
    { type: 'Express Queue', date: 'Today', status: 'active', code: 'EQ-2024-5678' },
  ];

  const queueReservations = [
    { attraction: 'Dragon Coaster', time: '2:30 PM', status: 'upcoming' },
    { attraction: 'Sky Tower', time: '4:00 PM', status: 'upcoming' },
  ];

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      {/* Phone Frame */}
      <div className="relative">
        {/* Back to Demo Button - Outside phone */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <Button asChild variant="outline" size="sm" className="bg-white">
            <Link to="/demo">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Demo
            </Link>
          </Button>
        </div>

        {/* Phone Outer Frame */}
        <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
          {/* Phone Screen */}
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden w-[375px] h-[812px]">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-50 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-800" />
              <div className="w-16 h-4 rounded-full bg-gray-800" />
            </div>

            {/* Status Bar */}
            <div className="bg-white pt-10 pb-2 px-6 flex items-center justify-between text-xs text-gray-900">
              <span className="font-medium">9:41</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  <div className="w-1 h-2 bg-gray-900 rounded-sm" />
                  <div className="w-1 h-3 bg-gray-900 rounded-sm" />
                  <div className="w-1 h-4 bg-gray-900 rounded-sm" />
                  <div className="w-1 h-3 bg-gray-300 rounded-sm" />
                </div>
                <span className="ml-1">5G</span>
                <div className="ml-1 w-6 h-3 border border-gray-900 rounded-sm relative">
                  <div className="absolute inset-0.5 bg-green-500 rounded-sm" style={{ width: '75%' }} />
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="h-[calc(100%-140px)] overflow-y-auto">
              {activeTab === 'home' && (
                <div className="px-4 pb-4">
                  {/* Header */}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm text-gray-500">Welcome back!</p>
                      <h1 className="text-xl font-bold text-gray-900">Theme Park Malaysia</h1>
                    </div>
                    <button className="relative p-2 bg-gray-100 rounded-full">
                      <Bell className="w-5 h-5 text-gray-700" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                      { icon: QrCode, label: 'Scan', color: 'bg-blue-500' },
                      { icon: Navigation, label: 'Navigate', color: 'bg-green-500' },
                      { icon: Clock, label: 'Queue', color: 'bg-orange-500' },
                      { icon: Star, label: 'Favorites', color: 'bg-purple-500' },
                    ].map((action, i) => (
                      <button key={i} className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white", action.color)}>
                          <action.icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{action.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* My Reservations */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-semibold text-gray-900">My Queue Reservations</h2>
                      <button className="text-sm text-blue-600 font-medium">See All</button>
                    </div>
                    <div className="space-y-3">
                      {queueReservations.map((res, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-white">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                              <Clock className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{res.attraction}</h3>
                              <p className="text-blue-100 text-sm">{res.time}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-blue-200" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Attractions */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-semibold text-gray-900">Popular Now</h2>
                      <button className="text-sm text-blue-600 font-medium">See All</button>
                    </div>
                    <div className="space-y-3">
                      {featuredAttractions.map((attraction, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                          <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                            {attraction.image}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{attraction.name}</h3>
                            <p className="text-sm text-gray-500">{attraction.zone}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 text-xs text-orange-600">
                                <Clock className="w-3 h-3" />
                                {attraction.waitTime} min
                              </span>
                              <span className="flex items-center gap-1 text-xs text-yellow-600">
                                <Star className="w-3 h-3 fill-current" />
                                {attraction.rating}
                              </span>
                            </div>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-red-500">
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Park Status Banner */}
                  <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Park is Open</p>
                        <p className="text-sm text-green-600">Until 10:00 PM • Low Crowd</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tickets' && (
                <div className="px-4 pb-4">
                  <div className="py-4">
                    <h1 className="text-xl font-bold text-gray-900">My Tickets</h1>
                    <p className="text-sm text-gray-500">Your active passes and reservations</p>
                  </div>

                  <div className="space-y-4">
                    {myTickets.map((ticket, i) => (
                      <div key={i} className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{ticket.type}</h3>
                            <p className="text-orange-100">{ticket.date}</p>
                          </div>
                          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                            {ticket.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/20">
                          <span className="text-sm text-orange-100">{ticket.code}</span>
                          <button className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                            <QrCode className="w-4 h-4" />
                            Show QR
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 p-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-medium">
                    + Add New Ticket
                  </button>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="h-full relative">
                  {/* Search Bar */}
                  <div className="absolute top-4 left-4 right-4 z-10">
                    <div className="relative">
                      <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search attractions..."
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl shadow-lg text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Interactive Park Map</p>
                      <p className="text-sm text-gray-400">Coming soon in full app</p>
                    </div>
                  </div>

                  {/* Bottom Sheet Preview */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 shadow-lg">
                    <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Navigation className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Navigate to Attraction</h3>
                        <p className="text-sm text-gray-500">Tap any attraction on the map</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="px-4 pb-4">
                  <div className="py-4 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">JD</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">John Doe</h1>
                    <p className="text-sm text-gray-500">Premium Member</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Visits', value: '12' },
                      { label: 'Points', value: '2,450' },
                      { label: 'Reviews', value: '8' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-4 bg-gray-50 rounded-2xl">
                        <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {[
                      'My Bookings',
                      'Payment Methods',
                      'Notifications',
                      'Help & Support',
                      'Settings',
                    ].map((item, i) => (
                      <button key={i} className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <span className="font-medium text-gray-700">{item}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Tab Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 pb-8">
              <div className="flex items-center justify-around">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 p-2",
                      activeTab === tab.id ? "text-blue-600" : "text-gray-400"
                    )}
                  >
                    <tab.icon className="w-6 h-6" />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full" />
          </div>
        </div>

        {/* Demo Notice - Outside phone */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">This is a demo of the Mobile App</p>
          <p className="text-gray-400 text-xs mt-1">All data shown is simulated</p>
        </div>
      </div>
    </div>
  );
}
