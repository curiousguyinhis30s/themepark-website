import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Smartphone, Monitor, ExternalLink, Play, Ticket, ArrowRight, Star, Clock, MapPin, Zap, Users, BarChart3, QrCode, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DemoPage() {
  const { t } = useTranslation();

  // Demo URLs - deployed instances
  const demoUrls = {
    mobile: 'https://tp-mobile.sami.now',
    portal: 'https://tp-admin.sami.now',
  };

  // Mobile app features
  const mobileFeatures = [
    { icon: Ticket, title: 'Digital Tickets', desc: 'Store and scan tickets from your phone' },
    { icon: Clock, title: 'Virtual Queue', desc: 'Skip the line with timed reservations' },
    { icon: MapPin, title: 'Park Navigation', desc: 'Interactive map with live wait times' },
    { icon: Star, title: 'Reviews & Ratings', desc: 'Share your experience' },
    { icon: Bell, title: 'Notifications', desc: 'Real-time alerts and updates' },
    { icon: QrCode, title: 'QR Check-in', desc: 'Quick entry at attractions' },
  ];

  // Portal features
  const portalFeatures = [
    { icon: BarChart3, title: 'Real-time Dashboard', desc: 'Monitor park capacity and operations' },
    { icon: Clock, title: 'Queue Management', desc: 'Control virtual queue slots' },
    { icon: Star, title: 'Analytics', desc: 'Track revenue and visitor trends' },
    { icon: MapPin, title: 'Zone Control', desc: 'Manage attractions by zone' },
    { icon: Users, title: 'Staff Management', desc: 'Assign roles and schedules' },
    { icon: Zap, title: 'Incident Response', desc: 'Quick action on park issues' },
  ];

  const handleOpenDemo = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container relative">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
              <Play className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600">{t('demo.badge', 'Interactive Demo')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              {t('demo.title', 'Try Before You Visit')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('demo.subtitle', 'Experience our digital platform firsthand. Explore the mobile app for visitors or the admin portal for park management.')}
            </p>
          </div>

          {/* Demo Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mobile App Card */}
            <div
              onClick={() => handleOpenDemo(demoUrls.mobile)}
              className="group glass rounded-3xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl gradient-blue flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {t('demo.mobileApp', 'Mobile App')}
                      </h2>
                      <p className="text-sm text-gray-500">For Park Visitors</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                  {t('demo.mobileDesc', 'Experience the visitor app - book tickets, join virtual queues, and navigate the park')}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {mobileFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 group-hover:bg-white/80 transition-colors">
                      <feature.icon className="w-5 h-5 text-blue-500 shrink-0" />
                      <span className="text-sm font-medium text-gray-700">{feature.title}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full rounded-full gradient-blue text-white py-6 text-lg group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDemo(demoUrls.mobile);
                  }}
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Launch Mobile App
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Admin Portal Card */}
            <div
              onClick={() => handleOpenDemo(demoUrls.portal)}
              className="group glass rounded-3xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-110 transition-transform duration-300">
                      <Monitor className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {t('demo.adminPortal', 'Admin Portal')}
                      </h2>
                      <p className="text-sm text-gray-500">For Park Management</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                  {t('demo.portalDesc', 'Explore the management dashboard - control attractions, view analytics, and more')}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {portalFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 group-hover:bg-white/80 transition-colors">
                      <feature.icon className="w-5 h-5 text-orange-500 shrink-0" />
                      <span className="text-sm font-medium text-gray-700">{feature.title}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full rounded-full gradient-accent text-white py-6 text-lg group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDemo(demoUrls.portal);
                  }}
                >
                  <Monitor className="w-5 h-5 mr-2" />
                  Launch Admin Portal
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: t('demo.feature1Title', 'Fully Interactive'),
                desc: t('demo.feature1Desc', 'Navigate, click, and explore just like the real thing'),
                icon: '🎮',
              },
              {
                title: t('demo.feature2Title', 'Real Data'),
                desc: t('demo.feature2Desc', 'Pre-loaded with sample attractions, tickets, and bookings'),
                icon: '📊',
              },
              {
                title: t('demo.feature3Title', 'No Login Required'),
                desc: t('demo.feature3Desc', 'Jump right in - demo accounts are already set up'),
                icon: '🚀',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <p className="text-gray-500 mb-6">Ready to experience the park in person?</p>
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="rounded-full gradient-blue text-white shadow-lg shadow-blue-500/25 border-0 px-8 py-6 text-lg hover-shine press-effect"
              >
                <Link to="/tickets">
                  <Ticket className="w-5 h-5 mr-2" />
                  {t('demo.buyTickets', 'Ready to Visit? Buy Tickets')}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 py-6 text-lg border-2"
              >
                <Link to="/contact">
                  {t('demo.contact', 'Contact Sales')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
