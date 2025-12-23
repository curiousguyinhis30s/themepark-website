import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Utensils, ShoppingBag, Clock, Star, Ruler, Zap, ArrowRight, Ticket, Calendar, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Zone data
const zones = [
  {
    id: 'fantasy-kingdom',
    name: 'Fantasy Kingdom',
    description: 'Enter a magical realm of enchanted castles, mythical creatures, and fairy-tale adventures perfect for all ages. Discover hidden passages, watch spectacular magic shows, and meet beloved fairy tale characters.',
    longDescription: 'Fantasy Kingdom transports you to a world where magic is real and dreams come true. From the moment you pass through the enchanted gates, you\'ll be surrounded by towering spires, mystical forests, and wondrous attractions that bring your favorite fairy tales to life. Perfect for families with children of all ages.',
    image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1200&h=800&fit=crop',
    color: '#9333EA',
    attractions: 4,
    dining: 3,
    shops: 2,
    features: ['Castle Tours', 'Dragon Shows', 'Magic Performances', 'Character Meet & Greet'],
    operatingHours: '10:00 AM - 9:00 PM',
    bestTimeToVisit: 'Weekday mornings',
  },
  {
    id: 'future-world',
    name: 'Future World',
    description: 'Experience tomorrow today with cutting-edge technology, space exploration, and futuristic thrills.',
    longDescription: 'Step into the world of tomorrow at Future World, where science fiction becomes reality. Explore interactive exhibits, experience virtual reality adventures, and blast off on our state-of-the-art space simulator. This zone features the latest in immersive technology and showcases innovations that will shape our future.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=800&fit=crop',
    color: '#0891B2',
    attractions: 3,
    dining: 2,
    shops: 2,
    features: ['VR Experiences', 'Robot Encounters', 'Space Simulator', 'Tech Labs'],
    operatingHours: '10:00 AM - 10:00 PM',
    bestTimeToVisit: 'Afternoon',
  },
  {
    id: 'aqua-zone',
    name: 'Aqua Zone',
    description: 'Dive into aquatic adventures with water rides, splash zones, and marine-themed attractions.',
    longDescription: 'Cool off and make a splash at Aqua Zone, our refreshing water-themed area. From thrilling water slides to relaxing lazy rivers, there\'s something for everyone. Don\'t miss our wave pool with waves up to 6 feet high, or our underwater viewing areas where you can see marine life up close.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&h=800&fit=crop',
    color: '#0284C7',
    attractions: 3,
    dining: 2,
    shops: 1,
    features: ['Wave Pool', 'Lazy River', 'Water Slides', 'Splash Pad'],
    operatingHours: '11:00 AM - 7:00 PM',
    bestTimeToVisit: 'Hot afternoons',
  },
  {
    id: 'kids-paradise',
    name: "Kids Paradise",
    description: 'A wonderland designed just for little ones with gentle rides, play areas, and character meet-ups.',
    longDescription: 'Kids Paradise is specially designed for our youngest guests. With rides sized just right for little adventurers, interactive play areas, and daily character appearances, children will find endless entertainment. Parents can relax knowing all attractions meet the highest safety standards.',
    image: 'https://images.unsplash.com/photo-1513807016779-d51c0c026263?w=1200&h=800&fit=crop',
    color: '#F59E0B',
    attractions: 3,
    dining: 2,
    shops: 3,
    features: ['Playground', 'Mini Coasters', 'Character Meet & Greet', 'Toddler Zone'],
    operatingHours: '9:00 AM - 8:00 PM',
    bestTimeToVisit: 'Morning',
  },
  {
    id: 'adventure-valley',
    name: 'Adventure Valley',
    description: 'For thrill-seekers only! Experience heart-pounding roller coasters and extreme adventures.',
    longDescription: 'Adventure Valley is home to our most thrilling experiences. Test your courage on towering roller coasters, experience the rush of free-fall drops, and challenge yourself on extreme attractions. This zone features our most intense rides - not for the faint of heart!',
    image: 'https://images.unsplash.com/photo-1567416661576-659fa79c2c84?w=1200&h=800&fit=crop',
    color: '#DC2626',
    attractions: 4,
    dining: 3,
    shops: 2,
    features: ['Extreme Coasters', 'Free Fall Tower', 'Volcano Blast', 'Storm Chaser'],
    operatingHours: '10:00 AM - 10:00 PM',
    bestTimeToVisit: 'Early morning for shortest lines',
  },
];

// Mock attractions for each zone
const zoneAttractions: Record<string, Array<{
  id: string;
  name: string;
  type: string;
  waitTime: number;
  heightReq: number;
  thrillLevel: number;
  rating: number;
  image: string;
}>> = {
  'fantasy-kingdom': [
    { id: '4', name: 'Enchanted Castle', type: 'Dark Ride', waitTime: 15, heightReq: 0, thrillLevel: 2, rating: 4.5, image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=400&h=300&fit=crop' },
    { id: '5', name: 'Magic Carousel', type: 'Family', waitTime: 10, heightReq: 0, thrillLevel: 1, rating: 4.3, image: 'https://images.unsplash.com/photo-1578353022142-09264fd64295?w=400&h=300&fit=crop' },
  ],
  'future-world': [
    { id: '2', name: 'Space Launch', type: 'Roller Coaster', waitTime: 30, heightReq: 140, thrillLevel: 5, rating: 4.9, image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400&h=300&fit=crop' },
  ],
  'aqua-zone': [
    { id: '6', name: 'River Rapids', type: 'Water Ride', waitTime: 20, heightReq: 100, thrillLevel: 3, rating: 4.6, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
    { id: '7', name: 'Wave Pool', type: 'Water Ride', waitTime: 0, heightReq: 0, thrillLevel: 2, rating: 4.4, image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=300&fit=crop' },
  ],
  'kids-paradise': [
    { id: '8', name: 'Kiddie Cars', type: 'Family', waitTime: 5, heightReq: 0, thrillLevel: 1, rating: 4.2, image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop' },
    { id: '9', name: 'Mini Train', type: 'Family', waitTime: 10, heightReq: 0, thrillLevel: 1, rating: 4.4, image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=300&fit=crop' },
  ],
  'adventure-valley': [
    { id: '1', name: 'Dragon Coaster', type: 'Roller Coaster', waitTime: 25, heightReq: 120, thrillLevel: 5, rating: 4.8, image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=400&h=300&fit=crop' },
    { id: '3', name: 'Thunder Mountain', type: 'Roller Coaster', waitTime: 20, heightReq: 110, thrillLevel: 4, rating: 4.7, image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=300&fit=crop' },
  ],
};

const getThrillLabel = (level: number) => {
  if (level >= 5) return { label: 'Extreme', color: 'bg-red-500' };
  if (level >= 4) return { label: 'High', color: 'bg-orange-500' };
  if (level >= 3) return { label: 'Medium', color: 'bg-amber-500' };
  if (level >= 2) return { label: 'Mild', color: 'bg-emerald-500' };
  return { label: 'Family', color: 'bg-blue-500' };
};

export default function ZoneDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();

  const zone = zones.find(z => z.id === id);
  const attractions = zone ? zoneAttractions[zone.id] || [] : [];

  if (!zone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Zone not found</h1>
          <Button asChild className="rounded-full">
            <Link to="/zones">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Zones
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <section className="relative h-[50vh] lg:h-[60vh]">
        <img
          src={zone.image}
          alt={zone.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${zone.color}cc, ${zone.color}40, transparent)`
          }}
        />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Button asChild variant="ghost" className="glass-dark text-white hover:bg-white/20 rounded-full">
            <Link to="/zones">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="container">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {zone.features.slice(0, 3).map((feature) => (
                <Badge
                  key={feature}
                  className="bg-white/20 text-white backdrop-blur-sm border-white/30"
                >
                  {feature}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-2">{zone.name}</h1>
            <p className="text-white/80 text-lg max-w-2xl">{zone.description}</p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="relative -mt-8 z-10">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: zone.color }} />
              <p className="text-2xl font-bold text-gray-900">{zone.attractions}</p>
              <p className="text-sm text-gray-500">Attractions</p>
            </div>
            <div className="glass-card p-5 text-center">
              <Utensils className="w-8 h-8 mx-auto mb-2" style={{ color: zone.color }} />
              <p className="text-2xl font-bold text-gray-900">{zone.dining}</p>
              <p className="text-sm text-gray-500">Dining Options</p>
            </div>
            <div className="glass-card p-5 text-center">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2" style={{ color: zone.color }} />
              <p className="text-2xl font-bold text-gray-900">{zone.shops}</p>
              <p className="text-sm text-gray-500">Gift Shops</p>
            </div>
            <div className="glass-card p-5 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" style={{ color: zone.color }} />
              <p className="text-2xl font-bold text-gray-900">{zone.operatingHours.split(' - ')[0]}</p>
              <p className="text-sm text-gray-500">Opens Daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {zone.name}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {zone.longDescription}
              </p>

              {/* Features Grid */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">Zone Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {zone.features.map((feature, index) => (
                  <div key={feature} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${zone.color}20` }}
                    >
                      <Sparkles className="w-6 h-6" style={{ color: zone.color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{feature}</p>
                      <p className="text-sm text-gray-500">Available daily</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="glass-card p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Plan your visit</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Operating Hours</span>
                    <span className="font-semibold text-gray-900">{zone.operatingHours}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Best Time</span>
                    <span className="font-semibold text-gray-900">{zone.bestTimeToVisit}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-600">Attractions</span>
                    <span className="font-semibold text-emerald-600">{zone.attractions} Open</span>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full rounded-xl text-white border-0 h-12 press-effect"
                  style={{ backgroundColor: zone.color }}
                >
                  <Link to="/tickets">
                    <Ticket className="w-4 h-4 mr-2" />
                    Get Tickets
                  </Link>
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Access to all zones with any ticket
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions in this Zone */}
      {attractions.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Attractions in {zone.name}
              </h2>
              <Button asChild variant="outline" className="rounded-full">
                <Link to={`/attractions?zone=${zone.id}`}>
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction) => {
                const thrill = getThrillLabel(attraction.thrillLevel);
                return (
                  <Link
                    key={attraction.id}
                    to={`/attractions/${attraction.id}`}
                    className="group"
                  >
                    <Card className="overflow-hidden hover-lift transition-all duration-300">
                      <div className="relative h-48">
                        <img
                          src={attraction.image}
                          alt={attraction.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className={`${thrill.color} text-white`}>
                            {thrill.label}
                          </Badge>
                        </div>
                        {attraction.waitTime > 0 && (
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-white/90">
                              <Clock className="w-3 h-3 mr-1" />
                              {attraction.waitTime} min
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1">{attraction.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">{attraction.type}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-medium">{attraction.rating}</span>
                          </div>
                          {attraction.heightReq > 0 && (
                            <div className="flex items-center gap-1 text-gray-500">
                              <Ruler className="w-4 h-4" />
                              <span>{attraction.heightReq}cm+</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section
        className="py-16 text-white"
        style={{ backgroundColor: zone.color }}
      >
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore {zone.name}?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Get your tickets today and experience all the magic this zone has to offer!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="rounded-full press-effect">
              <Link to="/tickets">
                <Ticket className="w-4 h-4 mr-2" />
                Buy Tickets
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/plan-visit">
                <Calendar className="w-4 h-4 mr-2" />
                Plan Your Visit
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
