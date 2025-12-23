import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Clock,
  Star,
  Ticket,
  MapPin,
  Calendar,
  ChevronRight,
  Apple,
  Smartphone,
  Zap,
  Users,
  Sparkles,
  Play,
  TrendingUp,
  Shield,
  Compass,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock data with placeholder images
const featuredAttractions = [
  { id: '1', name: 'Dragon Coaster', zone: 'Adventure Zone', waitTime: 25, rating: 4.8, image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&h=600&fit=crop', thrill: 'Extreme' },
  { id: '2', name: 'Space Launch', zone: 'Future World', waitTime: 30, rating: 4.9, image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&h=600&fit=crop', thrill: 'High' },
  { id: '3', name: 'River Rapids', zone: 'Water World', waitTime: 20, rating: 4.6, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', thrill: 'Medium' },
  { id: '4', name: 'Enchanted Castle', zone: 'Fantasy Kingdom', waitTime: 15, rating: 4.5, image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&h=600&fit=crop', thrill: 'Family' },
];

const zones = [
  { id: '1', name: 'Adventure Zone', count: 3, color: 'from-red-500 to-orange-500', icon: Compass, shadowColor: 'shadow-red-500/30' },
  { id: '2', name: 'Fantasy Kingdom', count: 2, color: 'from-purple-500 to-pink-500', icon: Sparkles, shadowColor: 'shadow-purple-500/30' },
  { id: '3', name: 'Water World', count: 2, color: 'from-cyan-500 to-blue-500', icon: Zap, shadowColor: 'shadow-cyan-500/30' },
  { id: '4', name: 'Kids Paradise', count: 2, color: 'from-emerald-500 to-teal-500', icon: TrendingUp, shadowColor: 'shadow-emerald-500/30' },
  { id: '5', name: 'Safari Land', count: 1, color: 'from-amber-500 to-yellow-500', icon: Heart, shadowColor: 'shadow-amber-500/30' },
];

const stats = [
  { value: '10', label: 'Attractions', icon: Zap },
  { value: '5', label: 'Themed Zones', icon: MapPin },
  { value: '500K+', label: 'Annual Visitors', icon: Users },
  { value: '4.8', label: 'Guest Rating', icon: Star },
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Immersive glassmorphic */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="orb orb-blue w-[500px] h-[500px] top-[10%] left-[15%] animate-float" />
          <div className="orb orb-purple w-[400px] h-[400px] bottom-[20%] right-[10%] animate-float-slow" />
          <div className="orb orb-orange w-[350px] h-[350px] top-[40%] right-[25%] animate-float-reverse delay-500" />
          <div className="orb orb-cyan w-[300px] h-[300px] bottom-[10%] left-[30%] animate-pulse-soft delay-300" />
          <div className="orb orb-pink w-[250px] h-[250px] top-[15%] right-[5%] animate-float delay-700" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-white">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-sm font-medium text-emerald-400">{t('hero.openToday')}</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-[1.1]">
                {t('hero.title')}<br />
                <span className="text-gradient-orange">{t('hero.titleHighlight')}</span>
              </h1>

              <p className="text-lg lg:text-xl text-white/70 mb-10 max-w-lg leading-relaxed">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-14 px-8 rounded-full gradient-accent text-white shadow-xl shadow-orange-500/30 border-0 text-base hover-shine press-effect group">
                  <Link to="/tickets">
                    <Ticket className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    {t('common.buyTickets')}
                  </Link>
                </Button>
                <Button asChild size="lg" className="h-14 px-8 rounded-full glass-button text-white border-white/20 text-base hover-shine press-effect group">
                  <Link to="/plan-visit">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {t('hero.planVisit')}
                  </Link>
                </Button>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="text-center group cursor-default">
                    <p className="text-3xl font-bold text-white group-hover:text-gradient-orange transition-all">{stat.value}</p>
                    <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Featured attraction card */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Main card */}
                <div className="glass-card p-2 hover-tilt group">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                    <img
                      src={featuredAttractions[0].image}
                      alt={featuredAttractions[0].name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Shine overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    {/* Card content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold shadow-lg shadow-orange-500/30">
                          {featuredAttractions[0].thrill}
                        </span>
                        <span className="px-3 py-1.5 rounded-full glass-dark text-white text-xs font-medium flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {featuredAttractions[0].waitTime} min
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1 text-shadow-lg">{featuredAttractions[0].name}</h3>
                      <p className="text-white/70 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {featuredAttractions[0].zone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating rating card */}
                <div className="absolute -bottom-6 -left-6 glass-card p-4 animate-float-slow hover-lift cursor-pointer group/card">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover/card:scale-110 transition-transform">
                      <Star className="w-6 h-6 text-white fill-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{featuredAttractions[0].rating}</p>
                      <p className="text-sm text-gray-500">Guest Rating</p>
                    </div>
                  </div>
                </div>

                {/* Floating visitors card */}
                <div className="absolute -top-6 -right-6 glass-card p-4 animate-float delay-500 hover-lift cursor-pointer group/card">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-blue flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover/card:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">450K+</p>
                      <p className="text-sm text-gray-500">Happy Guests</p>
                    </div>
                  </div>
                </div>

                {/* New: Safety badge */}
                <div className="absolute top-1/2 -left-4 glass-card p-3 animate-bounce-soft delay-700 hover-lift cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg gradient-emerald flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-gray-700">Safe &<br />Certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Quick Info Bar - Glassmorphic cards */}
      <section className="relative -mt-16 z-20">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Clock, labelKey: 'info.parkHours', valueKey: 'info.parkHoursValue', color: 'from-blue-500 to-cyan-500', shadowColor: 'shadow-blue-500/20' },
              { icon: MapPin, labelKey: 'info.location', valueKey: 'info.locationValue', color: 'from-purple-500 to-pink-500', shadowColor: 'shadow-purple-500/20' },
              { icon: Ticket, labelKey: 'info.from', valueKey: 'info.fromValue', color: 'from-orange-500 to-red-500', shadowColor: 'shadow-orange-500/20' },
              { icon: Calendar, labelKey: 'info.nextEvent', valueKey: 'info.nextEventValue', color: 'from-emerald-500 to-teal-500', shadowColor: 'shadow-emerald-500/20' },
            ].map((item) => (
              <div
                key={item.labelKey}
                className="glass-card p-5 hover-lift cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300",
                    item.color,
                    item.shadowColor
                  )}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">{t(item.labelKey)}</p>
                    <p className="text-base font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{t(item.valueKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Attractions - Modern cards */}
      <section className="py-24 relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 dot-pattern opacity-50" />

        <div className="container relative">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                <TrendingUp className="w-4 h-4" />
                Popular Now
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">{t('attractions.featured')}</h2>
              <p className="text-gray-500 mt-3 text-lg max-w-md">{t('attractions.featuredSubtitle')}</p>
            </div>
            <Link to="/attractions" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors group link-underline">
              {t('common.viewAll')}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAttractions.map((attraction) => (
              <Link
                key={attraction.id}
                to={`/attractions/${attraction.id}`}
                className="group block glass-card overflow-hidden hover-lift"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
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
                      attraction.thrill === 'Extreme' && "bg-gradient-to-r from-red-500 to-orange-500 shadow-red-500/30",
                      attraction.thrill === 'High' && "bg-gradient-to-r from-orange-500 to-amber-500 shadow-orange-500/30",
                      attraction.thrill === 'Medium' && "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-blue-500/30",
                      attraction.thrill === 'Family' && "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30"
                    )}>
                      {attraction.thrill}
                    </span>
                    {attraction.waitTime > 0 && (
                      <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-medium flex items-center gap-1.5 shadow-lg">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />{attraction.waitTime} min
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1 text-shadow-lg group-hover:text-gradient-orange transition-all">{attraction.name}</h3>
                    <p className="text-white/70 text-sm flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {attraction.zone}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 flex items-center justify-between bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 group/rating">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500 group-hover/rating:scale-110 transition-transform" />
                    <span className="font-bold text-gray-900">{attraction.rating}</span>
                    <span className="text-xs text-gray-400">/5</span>
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-orange-500 transition-colors flex items-center gap-1">
                    {t('common.learnMore')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Button asChild variant="outline" className="w-full rounded-xl h-12 border-2 press-effect hover-shine">
              <Link to="/attractions" className="flex items-center justify-center gap-2">
                {t('common.viewAll')} {t('nav.attractions')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Zones Grid - Glassmorphic */}
      <section className="py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 gradient-mesh opacity-60" />

        {/* Floating orbs */}
        <div className="absolute inset-0">
          <div className="orb orb-purple w-[300px] h-[300px] top-[10%] right-[5%] animate-float-slow" />
          <div className="orb orb-blue w-[200px] h-[200px] bottom-[20%] left-[10%] animate-float delay-500" />
        </div>

        <div className="container relative">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              <Compass className="w-4 h-4" />
              Explore Worlds
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">{t('zones.title')}</h2>
            <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">{t('zones.subtitle')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {zones.map((zone) => (
              <Link
                key={zone.id}
                to={`/zones/${zone.id}`}
                className="group glass-card p-6 text-center hover-lift hover-glow"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-br mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
                  zone.color,
                  zone.shadowColor
                )}>
                  <zone.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gradient transition-all">
                  {zone.name}
                </h3>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  <span className="font-bold text-gray-900">{zone.count}</span> {t('zones.attractions')}
                </p>

                {/* Hover indicator */}
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App CTA - Premium glass design */}
      <section className="py-24">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden gradient-hero p-12 lg:p-16">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="orb orb-blue w-[400px] h-[400px] top-0 right-0 animate-float" />
              <div className="orb orb-purple w-[350px] h-[350px] bottom-0 left-0 animate-float-slow" />
              <div className="orb orb-pink w-[200px] h-[200px] top-1/2 right-1/4 animate-pulse-soft" />
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 grid-pattern opacity-20" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-white text-sm font-medium mb-6">
                  <Smartphone className="w-4 h-4" />
                  Mobile App
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                  {t('app.title')}
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-md">
                  {t('app.subtitle')}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://apps.apple.com/app/theme-park"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-4 bg-white text-gray-900 rounded-2xl font-medium hover-lift hover-shine press-effect group"
                  >
                    <Apple className="w-7 h-7 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase tracking-wide text-gray-500">Download on</p>
                      <p className="font-semibold">App Store</p>
                    </div>
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.themepark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-4 glass-button text-white rounded-2xl font-medium hover-lift hover-shine press-effect group"
                  >
                    <Smartphone className="w-7 h-7 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase tracking-wide text-white/60">Get it on</p>
                      <p className="font-semibold">Google Play</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* App features */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                {[
                  { title: 'Real-time Wait Times', desc: 'Know before you go', icon: Clock },
                  { title: 'Interactive Maps', desc: 'Never get lost', icon: MapPin },
                  { title: 'Virtual Queue', desc: 'Skip the line', icon: Zap },
                  { title: 'Mobile Tickets', desc: 'Contactless entry', icon: Ticket },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="glass-dark rounded-2xl p-5 hover-lift group cursor-default"
                  >
                    <feature.icon className="w-8 h-8 text-white/80 mb-3 group-hover:text-white group-hover:scale-110 transition-all" />
                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-white/60">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 relative">
        <div className="container">
          <div className="glass-card p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 hover-glow group">
            {/* Background gradient on hover */}
            <div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="text-center lg:text-left relative">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-gradient transition-all">{t('cta.title')}</h3>
              <p className="text-gray-500 mt-2 text-lg">{t('cta.subtitle')}</p>
            </div>
            <Button asChild size="lg" className="h-14 px-8 rounded-full gradient-accent text-white shadow-xl shadow-orange-500/30 border-0 whitespace-nowrap hover-shine press-effect group/btn relative">
              <Link to="/tickets" className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                {t('cta.button')}
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
