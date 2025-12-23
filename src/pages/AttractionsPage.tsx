import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, Ruler, Zap, Filter, MapPin, Star, Search, ArrowRight, Sparkles, X, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock data with images
const mockZones = [
  { id: 'adventure', name: 'Adventure Zone', color: 'from-red-500 to-orange-500' },
  { id: 'fantasy', name: 'Fantasy Kingdom', color: 'from-purple-500 to-pink-500' },
  { id: 'water', name: 'Water World', color: 'from-cyan-500 to-blue-500' },
  { id: 'kids', name: 'Kids Paradise', color: 'from-amber-400 to-yellow-400' },
  { id: 'safari', name: 'Safari Land', color: 'from-emerald-500 to-teal-500' },
];

const mockAttractions = [
  { id: '1', name: 'Dragon Coaster', zoneId: 'adventure', type: 'Roller Coaster', waitTime: 25, heightReq: 120, thrillLevel: 5, status: 'open', rating: 4.8, image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=600&h=400&fit=crop', description: 'Heart-pounding drops and loops' },
  { id: '2', name: 'Space Launch', zoneId: 'adventure', type: 'Roller Coaster', waitTime: 30, heightReq: 140, thrillLevel: 5, status: 'open', rating: 4.9, image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600&h=400&fit=crop', description: 'Launch into zero gravity' },
  { id: '3', name: 'Thunder Mountain', zoneId: 'adventure', type: 'Roller Coaster', waitTime: 20, heightReq: 110, thrillLevel: 4, status: 'open', rating: 4.7, image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=600&h=400&fit=crop', description: 'Mine train adventure through caves' },
  { id: '4', name: 'Enchanted Castle', zoneId: 'fantasy', type: 'Dark Ride', waitTime: 15, heightReq: 0, thrillLevel: 2, status: 'open', rating: 4.5, image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=600&h=400&fit=crop', description: 'Journey through magical realms' },
  { id: '5', name: 'Magic Carousel', zoneId: 'fantasy', type: 'Family', waitTime: 10, heightReq: 0, thrillLevel: 1, status: 'open', rating: 4.3, image: 'https://images.unsplash.com/photo-1578353022142-09264fd64295?w=600&h=400&fit=crop', description: 'Classic enchanted carousel ride' },
  { id: '6', name: 'River Rapids', zoneId: 'water', type: 'Water Ride', waitTime: 20, heightReq: 100, thrillLevel: 3, status: 'open', rating: 4.6, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', description: 'Splash through wild rapids' },
  { id: '7', name: 'Wave Pool', zoneId: 'water', type: 'Water Ride', waitTime: 0, heightReq: 0, thrillLevel: 2, status: 'open', rating: 4.4, image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&h=400&fit=crop', description: 'Ride the ocean waves' },
  { id: '8', name: 'Kiddie Cars', zoneId: 'kids', type: 'Family', waitTime: 5, heightReq: 0, thrillLevel: 1, status: 'open', rating: 4.2, image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=400&fit=crop', description: 'Drive your own mini car' },
  { id: '9', name: 'Mini Train', zoneId: 'kids', type: 'Family', waitTime: 10, heightReq: 0, thrillLevel: 1, status: 'open', rating: 4.4, image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&h=400&fit=crop', description: 'Scenic park train tour' },
  { id: '10', name: 'Safari Express', zoneId: 'safari', type: 'Family', waitTime: 15, heightReq: 0, thrillLevel: 2, status: 'open', rating: 4.7, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop', description: 'Meet exotic animals up close' },
];

const getThrillLabel = (level: number) => {
  if (level >= 5) return { label: 'Extreme', color: 'bg-red-500' };
  if (level >= 4) return { label: 'High', color: 'bg-orange-500' };
  if (level >= 3) return { label: 'Medium', color: 'bg-amber-500' };
  if (level >= 2) return { label: 'Mild', color: 'bg-emerald-500' };
  return { label: 'Family', color: 'bg-blue-500' };
};

export default function AttractionsPage() {
  const { t } = useTranslation();
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttractions = mockAttractions.filter((a) => {
    if (selectedZone !== 'all' && a.zoneId !== selectedZone) return false;
    if (selectedType !== 'all' && a.type !== selectedType) return false;
    if (searchTerm && !a.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const types = [...new Set(mockAttractions.map((a) => a.type))];
  const hasFilters = selectedZone !== 'all' || selectedType !== 'all' || searchTerm;

  const clearFilters = () => {
    setSelectedZone('all');
    setSelectedType('all');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero py-20 lg:py-28 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="orb orb-blue w-[450px] h-[450px] top-0 right-0 animate-float" />
          <div className="orb orb-purple w-[350px] h-[350px] bottom-0 left-0 animate-float-slow" />
          <div className="orb orb-orange w-[250px] h-[250px] top-1/2 left-1/4 animate-pulse-soft" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-white">{mockAttractions.length} Amazing Rides</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              {t('attractions.title', 'Discover Our')}<br />
              <span className="text-gradient-orange">{t('attractions.titleHighlight', 'Attractions')}</span>
            </h1>

            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {t('attractions.subtitle', 'From heart-pounding thrill rides to magical family adventures, discover your next favorite experience.')}
            </p>

            {/* Quick stats */}
            <div className="flex justify-center gap-8 mt-10">
              <div className="text-center group cursor-default">
                <div className="flex items-center justify-center gap-2 text-white/60 mb-1">
                  <TrendingUp className="w-4 h-4 group-hover:text-orange-400 transition-colors" />
                  <span className="text-2xl font-bold text-white group-hover:text-gradient-orange transition-all">5</span>
                </div>
                <span className="text-xs text-white/50">Themed Zones</span>
              </div>
              <div className="text-center group cursor-default">
                <div className="flex items-center justify-center gap-2 text-white/60 mb-1">
                  <Users className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                  <span className="text-2xl font-bold text-white group-hover:text-gradient-blue transition-all">2M+</span>
                </div>
                <span className="text-xs text-white/50">Happy Visitors</span>
              </div>
              <div className="text-center group cursor-default">
                <div className="flex items-center justify-center gap-2 text-white/60 mb-1">
                  <Star className="w-4 h-4 group-hover:text-amber-400 transition-colors" />
                  <span className="text-2xl font-bold text-white">4.8</span>
                </div>
                <span className="text-xs text-white/50">Avg Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="relative -mt-8 z-20">
        <div className="container">
          <div className="glass-card p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 w-full lg:max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search attractions..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>

              {/* Filter dropdowns */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-gray-500">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">Filters:</span>
                </div>

                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="px-4 py-2.5 rounded-xl glass-input text-sm font-medium cursor-pointer hover:bg-white/70 transition-all"
                >
                  <option value="all">All Zones</option>
                  {mockZones.map((zone) => (
                    <option key={zone.id} value={zone.id}>{zone.name}</option>
                  ))}
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2.5 rounded-xl glass-input text-sm font-medium cursor-pointer hover:bg-white/70 transition-all"
                >
                  <option value="all">All Types</option>
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                {hasFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-red-500 hover:bg-red-50 press-effect"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              {/* Results count */}
              <div className="text-sm text-gray-500 whitespace-nowrap flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold">{filteredAttractions.length}</span>
                <span>attractions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-16 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 dot-pattern opacity-40" />

        <div className="container relative">
          {filteredAttractions.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAttractions.map((attraction) => {
                const zone = mockZones.find(z => z.id === attraction.zoneId);
                const thrill = getThrillLabel(attraction.thrillLevel);

                return (
                  <Link
                    key={attraction.id}
                    to={`/attractions/${attraction.id}`}
                    className="group glass-card overflow-hidden hover-lift"
                  >
                    {/* Image */}
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

  
                      {/* Badges */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <span className={cn(
                          "px-3 py-1.5 rounded-full text-white text-xs font-semibold shadow-lg",
                          thrill.color
                        )}>
                          {thrill.label}
                        </span>
                        {attraction.status === 'open' && attraction.waitTime > 0 && (
                          <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-medium flex items-center gap-1.5 shadow-lg">
                            <Clock className="w-3.5 h-3.5 text-blue-500" />{attraction.waitTime} min
                          </span>
                        )}
                      </div>

                      {/* Content overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={cn(
                            "px-2.5 py-1 rounded-lg bg-gradient-to-r text-white text-[10px] font-semibold uppercase tracking-wide flex items-center gap-1 shadow-lg",
                            zone?.color
                          )}>
                            <MapPin className="w-3 h-3" />
                            {zone?.name}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white text-shadow-lg">{attraction.name}</h3>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="p-5 bg-white/50 backdrop-blur-sm">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{attraction.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {attraction.heightReq > 0 && (
                            <span className="flex items-center gap-1 group/stat">
                              <Ruler className="w-4 h-4 group-hover/stat:text-blue-500 transition-colors" />
                              {attraction.heightReq}cm+
                            </span>
                          )}
                          <span className="flex items-center gap-1 group/stat">
                            <Zap className="w-4 h-4 group-hover/stat:text-orange-500 transition-colors" />
                            {attraction.thrillLevel}/5
                          </span>
                          <span className="flex items-center gap-1 group/stat">
                            <Star className="w-4 h-4 fill-amber-500 text-amber-500 group-hover/stat:scale-110 transition-transform" />
                            <span className="font-semibold text-gray-900">{attraction.rating}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-gray-400 group-hover:text-orange-500 transition-colors">
                          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">View</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No attractions found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search term</p>
              <Button onClick={clearFilters} className="rounded-full gradient-blue text-white border-0 press-effect">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
