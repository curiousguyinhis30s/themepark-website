import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, Ruler, Zap, Star, MapPin, Users, Calendar, Camera, Shield, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data - same as AttractionsPage
const mockAttractions = [
  { id: '1', name: 'Dragon Coaster', zoneId: 'adventure', zoneName: 'Adventure Zone', type: 'Roller Coaster', waitTime: 25, heightReq: 120, thrillLevel: 5, status: 'open', rating: 4.8, image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=1200&h=800&fit=crop', description: 'Experience the ultimate thrill on our flagship roller coaster! Dragon Coaster features heart-pounding drops, intense loops, and speeds up to 100 km/h. Not for the faint-hearted!', duration: '3 min', capacity: 24 },
  { id: '2', name: 'Space Launch', zoneId: 'adventure', zoneName: 'Adventure Zone', type: 'Roller Coaster', waitTime: 30, heightReq: 140, thrillLevel: 5, status: 'open', rating: 4.9, image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200&h=800&fit=crop', description: 'Blast off into zero gravity on this incredible launch coaster. Experience weightlessness as you rocket through space-themed tunnels and inversions.', duration: '2.5 min', capacity: 20 },
  { id: '3', name: 'Thunder Mountain', zoneId: 'adventure', zoneName: 'Adventure Zone', type: 'Roller Coaster', waitTime: 20, heightReq: 110, thrillLevel: 4, status: 'open', rating: 4.7, image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=1200&h=800&fit=crop', description: 'Journey through mysterious caves and abandoned mines on this thrilling mine train adventure. Perfect for families seeking excitement!', duration: '4 min', capacity: 30 },
  { id: '4', name: 'Enchanted Castle', zoneId: 'fantasy', zoneName: 'Fantasy Kingdom', type: 'Dark Ride', waitTime: 15, heightReq: 0, thrillLevel: 2, status: 'open', rating: 4.5, image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1200&h=800&fit=crop', description: 'Enter a world of magic and wonder! This enchanting dark ride takes you through fairy tale scenes with stunning animatronics and special effects.', duration: '8 min', capacity: 40 },
  { id: '5', name: 'Magic Carousel', zoneId: 'fantasy', zoneName: 'Fantasy Kingdom', type: 'Family', waitTime: 10, heightReq: 0, thrillLevel: 1, status: 'open', rating: 4.3, image: 'https://images.unsplash.com/photo-1578353022142-09264fd64295?w=1200&h=800&fit=crop', description: 'A timeless classic! Our beautifully restored carousel features hand-painted horses and magical creatures for all ages to enjoy.', duration: '3 min', capacity: 48 },
  { id: '6', name: 'River Rapids', zoneId: 'water', zoneName: 'Water World', type: 'Water Ride', waitTime: 20, heightReq: 100, thrillLevel: 3, status: 'open', rating: 4.6, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop', description: 'Get ready to get soaked! Navigate through wild rapids, waterfalls, and geysers on this refreshing water adventure.', duration: '5 min', capacity: 12 },
  { id: '7', name: 'Wave Pool', zoneId: 'water', zoneName: 'Water World', type: 'Water Ride', waitTime: 0, heightReq: 0, thrillLevel: 2, status: 'open', rating: 4.4, image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200&h=800&fit=crop', description: 'Ride the waves in our massive wave pool! Perfect for swimming, floating, or just cooling off on a hot day.', duration: 'Unlimited', capacity: 500 },
  { id: '8', name: 'Kiddie Cars', zoneId: 'kids', zoneName: 'Kids Paradise', type: 'Family', waitTime: 5, heightReq: 0, thrillLevel: 1, status: 'open', rating: 4.2, image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1200&h=800&fit=crop', description: 'Little ones can take the wheel and drive their own mini car around our safe, fun track. A perfect first driving experience!', duration: '3 min', capacity: 10 },
  { id: '9', name: 'Mini Train', zoneId: 'kids', zoneName: 'Kids Paradise', type: 'Family', waitTime: 10, heightReq: 0, thrillLevel: 1, status: 'open', rating: 4.4, image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&h=800&fit=crop', description: 'All aboard! Take a scenic journey around the park on our charming mini train. Great views and fun for the whole family.', duration: '10 min', capacity: 36 },
  { id: '10', name: 'Safari Express', zoneId: 'safari', zoneName: 'Safari Land', type: 'Family', waitTime: 15, heightReq: 0, thrillLevel: 2, status: 'open', rating: 4.7, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop', description: 'Get up close with amazing animals from around the world! Our safari tour takes you through realistic habitats to see lions, elephants, and more.', duration: '15 min', capacity: 50 },
];

const getThrillLabel = (level: number) => {
  if (level >= 5) return { label: 'Extreme', color: 'bg-red-500' };
  if (level >= 4) return { label: 'High', color: 'bg-orange-500' };
  if (level >= 3) return { label: 'Medium', color: 'bg-amber-500' };
  if (level >= 2) return { label: 'Mild', color: 'bg-emerald-500' };
  return { label: 'Family', color: 'bg-blue-500' };
};

// Generate available time slots
const generateTimeSlots = () => {
  const slots = [];
  const now = new Date();
  const currentHour = now.getHours();

  for (let hour = Math.max(currentHour + 1, 10); hour <= 21; hour++) {
    const time = `${hour}:00`;
    const available = Math.floor(Math.random() * 15) + 5;
    slots.push({ time, available });
  }
  return slots;
};

export default function AttractionDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [timeSlots] = useState(generateTimeSlots);

  const attraction = mockAttractions.find(a => a.id === id);

  if (!attraction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Attraction not found</h1>
          <Button asChild className="rounded-full">
            <Link to="/attractions">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Attractions
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const thrill = getThrillLabel(attraction.thrillLevel);

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <section className="relative h-[50vh] lg:h-[60vh]">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Button asChild variant="ghost" className="glass-dark text-white hover:bg-white/20 rounded-full">
            <Link to="/attractions">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="container">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-4 py-2 rounded-full ${thrill.color} text-white text-sm font-semibold`}>
                {thrill.label}
              </span>
              <span className="px-4 py-2 rounded-full glass-dark text-white text-sm font-medium">
                {attraction.type}
              </span>
              {attraction.status === 'open' && (
                <span className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Open Now
                </span>
              )}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-2">{attraction.name}</h1>
            <p className="text-white/70 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {attraction.zoneName}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="relative -mt-8 z-10">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 text-center">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{attraction.waitTime} min</p>
              <p className="text-sm text-gray-500">Wait Time</p>
            </div>
            <div className="glass-card p-5 text-center">
              <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{attraction.rating}</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
            <div className="glass-card p-5 text-center">
              <Ruler className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{attraction.heightReq > 0 ? `${attraction.heightReq}cm` : 'Any'}</p>
              <p className="text-sm text-gray-500">Min Height</p>
            </div>
            <div className="glass-card p-5 text-center">
              <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{attraction.thrillLevel}/5</p>
              <p className="text-sm text-gray-500">Thrill Level</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this ride</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {attraction.description}
              </p>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Duration</p>
                    <p className="text-gray-500">{attraction.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Capacity</p>
                    <p className="text-gray-500">{attraction.capacity} guests per ride</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Safety</p>
                    <p className="text-gray-500">Certified & inspected daily</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Photo Pass</p>
                    <p className="text-gray-500">Available at exit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="glass-card p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Plan your visit</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Current wait</span>
                    <span className="font-semibold text-gray-900">{attraction.waitTime} min</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Best time</span>
                    <span className="font-semibold text-gray-900">Before 11am</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-600">Express Pass</span>
                    <span className="font-semibold text-emerald-600">Available</span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowQueueModal(true)}
                  className="w-full rounded-xl gradient-accent text-white border-0 h-12 press-effect"
                >
                  Join Virtual Queue
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Skip the line with Virtual Queue
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Queue Modal */}
      {showQueueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !bookingConfirmed && setShowQueueModal(false)} />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {!bookingConfirmed ? (
              <>
                {/* Header */}
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Virtual Queue</h3>
                    <button
                      onClick={() => setShowQueueModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-gray-500 mt-1">Select your return time for {attraction.name}</p>
                </div>

                {/* Time Slots */}
                <div className="p-6 max-h-80 overflow-y-auto">
                  <p className="text-sm text-gray-500 mb-4">Available return times today:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedSlot(slot.time)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedSlot === slot.time
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-semibold text-gray-900">{slot.time}</p>
                        <p className="text-xs text-gray-500">{slot.available} spots</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-gray-50">
                  <Button
                    onClick={() => setBookingConfirmed(true)}
                    disabled={!selectedSlot}
                    className="w-full h-12 rounded-xl gradient-accent text-white border-0"
                  >
                    {selectedSlot ? `Book ${selectedSlot} Slot` : 'Select a Time Slot'}
                  </Button>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You're in the Queue!</h3>
                <p className="text-gray-500 mb-6">
                  Return to {attraction.name} at <strong>{selectedSlot}</strong> for priority boarding.
                </p>

                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Attraction</span>
                    <span className="font-medium">{attraction.name}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Return Time</span>
                    <span className="font-medium">{selectedSlot}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Booking ID</span>
                    <span className="font-mono font-medium">VQ{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setShowQueueModal(false);
                    setBookingConfirmed(false);
                    setSelectedSlot(null);
                  }}
                  className="w-full h-12 rounded-xl gradient-blue text-white border-0"
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
