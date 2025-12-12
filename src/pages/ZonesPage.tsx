import { Link } from 'react-router-dom';
import { MapPin, Utensils, ShoppingBag, ArrowRight, Castle, ParkingCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const zones = [
  {
    id: 'fantasy-kingdom',
    name: 'Fantasy Kingdom',
    description: 'Enter a magical realm of enchanted castles, mythical creatures, and fairy-tale adventures perfect for all ages.',
    image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&q=80',
    color: '#9333EA',
    attractions: 4,
    dining: 3,
    shops: 2,
    features: ['Castle Tours', 'Dragon Shows', 'Magic Performances'],
  },
  {
    id: 'future-world',
    name: 'Future World',
    description: 'Experience tomorrow today with cutting-edge technology, space exploration, and futuristic thrills.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    color: '#0891B2',
    attractions: 3,
    dining: 2,
    shops: 2,
    features: ['VR Experiences', 'Robot Encounters', 'Space Simulator'],
  },
  {
    id: 'aqua-zone',
    name: 'Aqua Zone',
    description: 'Dive into aquatic adventures with water rides, splash zones, and marine-themed attractions.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80',
    color: '#0284C7',
    attractions: 3,
    dining: 2,
    shops: 1,
    features: ['Wave Pool', 'Lazy River', 'Water Slides'],
  },
  {
    id: 'kids-paradise',
    name: "Kids Paradise",
    description: 'A wonderland designed just for little ones with gentle rides, play areas, and character meet-ups.',
    image: 'https://images.unsplash.com/photo-1513807016779-d51c0c026263?w=800&q=80',
    color: '#F59E0B',
    attractions: 3,
    dining: 2,
    shops: 3,
    features: ['Playground', 'Mini Coasters', 'Character Meet & Greet'],
  },
  {
    id: 'adventure-valley',
    name: 'Adventure Valley',
    description: 'For thrill-seekers only! Experience heart-pounding roller coasters and extreme adventures.',
    image: 'https://images.unsplash.com/photo-1567416661576-659fa79c2c84?w=800&q=80',
    color: '#DC2626',
    attractions: 4,
    dining: 3,
    shops: 2,
    features: ['Extreme Coasters', 'Free Fall Tower', 'Volcano Blast'],
  },
];

export default function ZonesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Explore Our Zones
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Five uniquely themed worlds await you. Each zone offers its own adventures,
            attractions, dining experiences, and magical memories.
          </p>
        </div>
      </section>

      {/* Zone Cards */}
      <section className="container py-16">
        <div className="space-y-16">
          {zones.map((zone, index) => (
            <div
              key={zone.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-lg group">
                  <img
                    src={zone.image}
                    alt={zone.name}
                    className="w-full h-72 lg:h-80 object-cover"
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ backgroundColor: zone.color }}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {zone.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="bg-white/90 text-foreground backdrop-blur-sm"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h2
                  className="text-3xl lg:text-4xl font-bold"
                  style={{ color: zone.color }}
                >
                  {zone.name}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {zone.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold">{zone.attractions}</div>
                      <div className="text-xs text-muted-foreground">Attractions</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Utensils className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold">{zone.dining}</div>
                      <div className="text-xs text-muted-foreground">Dining</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold">{zone.shops}</div>
                      <div className="text-xs text-muted-foreground">Shops</div>
                    </CardContent>
                  </Card>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                  <Button asChild style={{ backgroundColor: zone.color }}>
                    <Link to={`/attractions?zone=${zone.id}`}>
                      View Attractions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/tickets">Get Tickets</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Park Map Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Park Map</h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              Navigate through our five themed zones with our interactive park map
            </p>
          </div>

          {/* Visual Map */}
          <div className="bg-primary-foreground/5 rounded-xl p-6 md:p-8 max-w-4xl mx-auto border border-primary-foreground/10">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="col-span-1 row-span-2">
                <div
                  className="h-full rounded-lg p-3 md:p-4 border transition-colors cursor-pointer hover:border-purple-400"
                  style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', borderColor: 'rgba(147, 51, 234, 0.4)' }}
                >
                  <h3 className="font-semibold text-sm md:text-base" style={{ color: '#C084FC' }}>Fantasy Kingdom</h3>
                  <p className="text-xs text-primary-foreground/50 mt-1">North West</p>
                </div>
              </div>
              <div className="col-span-1">
                <div
                  className="h-20 md:h-24 rounded-lg p-3 md:p-4 border transition-colors cursor-pointer hover:border-cyan-400"
                  style={{ backgroundColor: 'rgba(8, 145, 178, 0.15)', borderColor: 'rgba(8, 145, 178, 0.4)' }}
                >
                  <h3 className="font-semibold text-sm md:text-base" style={{ color: '#22D3EE' }}>Future World</h3>
                  <p className="text-xs text-primary-foreground/50 mt-1">North</p>
                </div>
              </div>
              <div className="col-span-1 row-span-2">
                <div
                  className="h-full rounded-lg p-3 md:p-4 border transition-colors cursor-pointer hover:border-red-400"
                  style={{ backgroundColor: 'rgba(220, 38, 38, 0.15)', borderColor: 'rgba(220, 38, 38, 0.4)' }}
                >
                  <h3 className="font-semibold text-sm md:text-base" style={{ color: '#F87171' }}>Adventure Valley</h3>
                  <p className="text-xs text-primary-foreground/50 mt-1">North East</p>
                </div>
              </div>
              <div className="col-span-1">
                <div className="h-20 md:h-24 rounded-lg p-3 md:p-4 flex flex-col items-center justify-center border border-primary-foreground/20 bg-primary-foreground/5">
                  <Castle className="w-6 h-6 text-primary-foreground/40 mb-1" />
                  <p className="text-xs text-primary-foreground/50">Main Entrance</p>
                </div>
              </div>
              <div className="col-span-1">
                <div
                  className="h-20 md:h-24 rounded-lg p-3 md:p-4 border transition-colors cursor-pointer hover:border-blue-400"
                  style={{ backgroundColor: 'rgba(2, 132, 199, 0.15)', borderColor: 'rgba(2, 132, 199, 0.4)' }}
                >
                  <h3 className="font-semibold text-sm md:text-base" style={{ color: '#38BDF8' }}>Aqua Zone</h3>
                  <p className="text-xs text-primary-foreground/50 mt-1">South</p>
                </div>
              </div>
              <div className="col-span-1">
                <div
                  className="h-20 md:h-24 rounded-lg p-3 md:p-4 border transition-colors cursor-pointer hover:border-amber-400"
                  style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: 'rgba(245, 158, 11, 0.4)' }}
                >
                  <h3 className="font-semibold text-sm md:text-base" style={{ color: '#FBBF24' }}>Kids Paradise</h3>
                  <p className="text-xs text-primary-foreground/50 mt-1">South West</p>
                </div>
              </div>
              <div className="col-span-1">
                <div className="h-20 md:h-24 rounded-lg p-3 md:p-4 flex flex-col items-center justify-center border border-primary-foreground/20 bg-primary-foreground/5">
                  <ParkingCircle className="w-6 h-6 text-primary-foreground/40 mb-1" />
                  <p className="text-xs text-primary-foreground/50">Parking</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-primary-foreground/70">Open Now</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                <span className="text-primary-foreground/70">Limited Capacity</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                <span className="text-primary-foreground/70">Closed</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent text-accent-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-accent-foreground/80 mb-8 max-w-xl mx-auto">
            Get your tickets now and experience all five amazing zones!
          </p>
          <Button asChild size="lg" variant="outline" className="bg-white text-accent hover:bg-white/90">
            <Link to="/tickets">
              Buy Tickets Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
