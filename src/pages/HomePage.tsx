import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  Clock,
  MapPin,
  Star,
  Users,
  Utensils,
  Smartphone,
  Check,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const { data: parkStatus } = useQuery({
    queryKey: ['parkStatus'],
    queryFn: async () => {
      const res = await fetch('/api/park/status');
      return res.json();
    },
  });

  const { data: zones } = useQuery({
    queryKey: ['zones'],
    queryFn: async () => {
      const res = await fetch('/api/park/zones');
      return res.json();
    },
  });

  const { data: attractions } = useQuery({
    queryKey: ['featuredAttractions'],
    queryFn: async () => {
      const res = await fetch('/api/attractions/featured?limit=6');
      return res.json();
    },
  });

  const status = parkStatus?.status;

  const stats = [
    { value: '20+', label: 'Attractions', icon: Star },
    { value: '5', label: 'Themed Zones', icon: MapPin },
    { value: '15+', label: 'Dining Options', icon: Utensils },
    { value: '1M+', label: 'Happy Visitors', icon: Users },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-accent blur-3xl" />
        </div>

        <div className="relative container py-20">
          <div className="max-w-3xl">
            <div className="mb-6">
              {status && (
                <Badge
                  variant={status.isOpen ? "success" : "secondary"}
                  className="text-sm px-3 py-1"
                >
                  <span className={cn(
                    "w-2 h-2 rounded-full mr-2 inline-block",
                    status.isOpen ? "bg-emerald-500" : "bg-gray-400"
                  )} />
                  {status.isOpen ? `Open until ${status.closeTime}` : 'Currently Closed'}
                </Badge>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 tracking-tight">
              Experience the Magic
            </h1>

            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 leading-relaxed max-w-2xl">
              Malaysia's premier family entertainment destination. Thrilling rides,
              magical experiences, and unforgettable memories await.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="accent" className="text-base px-8">
                <Link to="/tickets">
                  Buy Tickets
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-8 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/attractions">
                  Explore Attractions
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Zones</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Five uniquely themed worlds await. Each zone offers its own adventures,
              attractions, and dining experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {zones?.zones?.map((zone: any) => (
              <Card
                key={zone.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${zone.color}15` }}
                  >
                    <MapPin className="w-7 h-7" style={{ color: zone.color }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
                    {zone.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {zone.attractionCount} attractions
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Attractions */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Attractions</h2>
              <p className="text-muted-foreground text-lg">Don't miss these fan favorites!</p>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex">
              <Link to="/attractions">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions?.attractions?.slice(0, 6).map((attraction: any) => (
              <Card
                key={attraction.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                  {attraction.thumbnailUrl ? (
                    <img
                      src={attraction.thumbnailUrl}
                      alt={attraction.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10" />
                  )}
                  {attraction.waitTime !== undefined && attraction.waitTime > 0 && (
                    <Badge className="absolute top-3 right-3" variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      {attraction.waitTime} min
                    </Badge>
                  )}
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs font-medium">
                      {attraction.zoneName}
                    </Badge>
                    {attraction.rating && (
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-3.5 h-3.5 text-amber-500 mr-1 fill-amber-500" />
                        {attraction.rating}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                    {attraction.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {attraction.shortDescription || attraction.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Button asChild>
              <Link to="/attractions">
                View All Attractions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Virtual Queue Promo */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">New Feature</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Skip the Line with Virtual Queue
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Download our mobile app and book your spot in line from anywhere in the park.
                No more waiting – just fun!
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Book your return time from your phone',
                  'Get notified when it\'s your turn',
                  'Enjoy other attractions while you wait',
                  'Free with your park ticket',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Download iOS App
                </Button>
                <Button variant="outline" size="lg">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Download Android
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl flex items-center justify-center">
                <Smartphone className="w-32 h-32 text-accent/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Adventure?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Book your tickets today and create memories that last a lifetime.
          </p>
          <Button asChild size="lg" variant="accent" className="text-base px-10">
            <Link to="/tickets">
              Get Your Tickets Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
