import { useState } from 'react';
import { Clock, Ruler, Zap, Filter, MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock data for static deployment
const mockZones = [
  { id: 'adventure', name: 'Adventure Zone' },
  { id: 'fantasy', name: 'Fantasy Kingdom' },
  { id: 'water', name: 'Water World' },
  { id: 'kids', name: 'Kids Paradise' },
  { id: 'safari', name: 'Safari Land' },
];

const mockAttractions = [
  { id: '1', name: 'Dragon Coaster', zoneId: 'adventure', type: 'roller_coaster', waitTime: 25, heightReq: 120, thrillLevel: 5, status: 'open', rating: 4.8 },
  { id: '2', name: 'Space Launch', zoneId: 'adventure', type: 'roller_coaster', waitTime: 30, heightReq: 140, thrillLevel: 5, status: 'open', rating: 4.9 },
  { id: '3', name: 'Thunder Mountain', zoneId: 'adventure', type: 'roller_coaster', waitTime: 20, heightReq: 110, thrillLevel: 4, status: 'open', rating: 4.7 },
  { id: '4', name: 'Enchanted Castle', zoneId: 'fantasy', type: 'dark_ride', waitTime: 15, heightReq: 0, thrillLevel: 2, status: 'open', rating: 4.5 },
  { id: '5', name: 'Magic Carousel', zoneId: 'fantasy', type: 'family', waitTime: 10, heightReq: 0, thrillLevel: 1, status: 'open', rating: 4.3 },
  { id: '6', name: 'River Rapids', zoneId: 'water', type: 'water_ride', waitTime: 20, heightReq: 100, thrillLevel: 3, status: 'open', rating: 4.6 },
  { id: '7', name: 'Wave Pool', zoneId: 'water', type: 'water_ride', waitTime: 0, heightReq: 0, thrillLevel: 2, status: 'open', rating: 4.4 },
  { id: '8', name: 'Kiddie Cars', zoneId: 'kids', type: 'family', waitTime: 5, heightReq: 0, thrillLevel: 1, status: 'open', rating: 4.2 },
  { id: '9', name: 'Mini Train', zoneId: 'kids', type: 'family', waitTime: 10, heightReq: 0, thrillLevel: 1, status: 'open', rating: 4.4 },
  { id: '10', name: 'Safari Express', zoneId: 'safari', type: 'family', waitTime: 15, heightReq: 0, thrillLevel: 2, status: 'open', rating: 4.7 },
];

export default function AttractionsPage() {
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Use mock data - no API calls
  const zones = mockZones;
  const attractions = mockAttractions;
  const isLoading = false;

  const filteredAttractions = attractions.filter((a: any) => {
    if (selectedZone !== 'all' && a.zoneId !== selectedZone) return false;
    if (selectedType !== 'all' && a.type !== selectedType) return false;
    return true;
  });

  const types = [...new Set(attractions.map((a: any) => a.type))];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Our Attractions
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            From heart-pounding thrill rides to magical family adventures,
            discover your next favorite experience.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="container -mt-6">
        <Card className="shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </div>

              <div className="flex flex-wrap gap-3 flex-1">
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="px-4 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Zones</option>
                  {zones.map((zone: any) => (
                    <option key={zone.id} value={zone.id}>{zone.name}</option>
                  ))}
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Types</option>
                  {types.map((type: any) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <span className="text-sm text-muted-foreground">
                {filteredAttractions.length} attractions
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attractions Grid */}
      <div className="container py-12">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-muted-foreground border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction: any) => (
              <Card
                key={attraction.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div
                  className="aspect-[16/10] bg-muted relative overflow-hidden"
                  style={{
                    backgroundImage: attraction.thumbnailUrl ? `url(${attraction.thumbnailUrl})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {!attraction.thumbnailUrl && (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10" />
                  )}

                  {attraction.status === 'open' && attraction.waitTime > 0 && (
                    <Badge className="absolute top-3 right-3" variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      {attraction.waitTime} min
                    </Badge>
                  )}

                  {attraction.status !== 'open' && (
                    <Badge
                      className="absolute top-3 right-3"
                      variant={attraction.status === 'maintenance' ? 'warning' : 'destructive'}
                    >
                      {attraction.status === 'maintenance' ? 'Maintenance' : 'Closed'}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: attraction.zoneColor,
                        color: attraction.zoneColor,
                      }}
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      {attraction.zoneName}
                    </Badge>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {attraction.type}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                    {attraction.name}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {attraction.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {attraction.heightRequirement && (
                      <span className="flex items-center gap-1">
                        <Ruler className="w-4 h-4" />
                        {attraction.heightRequirement}cm+
                      </span>
                    )}
                    {attraction.thrillLevel && (
                      <span className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {attraction.thrillLevel}/5
                      </span>
                    )}
                    {attraction.rating && (
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        {attraction.rating}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredAttractions.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No attractions found matching your filters.</p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => {
                setSelectedZone('all');
                setSelectedType('all');
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
