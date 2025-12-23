import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Ticket, Phone, Mail, MapPin, ChevronRight, Sparkles, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import Chatbot from '@/components/Chatbot';
import { cn } from '@/lib/utils';

const navLinks = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/attractions', labelKey: 'nav.attractions' },
  { path: '/zones', labelKey: 'nav.zones' },
  { path: '/tickets', labelKey: 'nav.tickets' },
  { path: '/plan-visit', labelKey: 'nav.planVisit' },
  { path: '/demo', labelKey: 'nav.demo' },
  { path: '/contact', labelKey: 'nav.contact' },
];

const socialLinks = [
  { icon: Facebook, href: '#facebook', label: 'Facebook' },
  { icon: Instagram, href: '#instagram', label: 'Instagram' },
  { icon: Twitter, href: '#twitter', label: 'Twitter' },
  { icon: Youtube, href: '#youtube', label: 'YouTube' },
];

export default function Layout() {
  const location = useLocation();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="orb orb-blue w-[500px] h-[500px] -top-48 -right-48 animate-float-slow" />
        <div className="orb orb-purple w-[400px] h-[400px] top-1/2 -left-48 animate-float" />
        <div className="orb orb-cyan w-[300px] h-[300px] bottom-1/4 right-1/4 animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header - Glassmorphic with scroll effect */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav shadow-lg" : "bg-transparent"
      )}>
        <div className="container">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-lg group-hover:shadow-orange-500/40 group-hover:scale-105 transition-all duration-300">
                  <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                </div>
                <div className="absolute inset-0 rounded-xl gradient-accent opacity-40 blur-lg group-hover:opacity-60 transition-opacity" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-gradient transition-all">Theme Park</span>
                <span className="hidden sm:block text-[10px] uppercase tracking-widest text-gray-500 font-medium">Experience Magic</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                    location.pathname === link.path
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  )}
                >
                  {location.pathname === link.path && (
                    <span className="absolute inset-0 rounded-full gradient-blue shadow-lg shadow-blue-500/25" />
                  )}
                  <span className="relative">{t(link.labelKey)}</span>
                </Link>
              ))}
            </nav>

            {/* Right side - Language + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <Button asChild className="rounded-full gradient-accent text-white shadow-lg shadow-orange-500/25 border-0 px-6 hover-shine press-effect group">
                <Link to="/tickets">
                  <Ticket className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  {t('common.buyTickets')}
                </Link>
              </Button>
            </div>

            {/* Mobile - Language + Menu button */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button
                className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  mobileMenuOpen ? "bg-gray-100 rotate-90" : "hover:bg-white/50"
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav - Glassmorphic dropdown with animation */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="glass border-t border-white/20">
            <nav className="container py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    location.pathname === link.path
                      ? "gradient-blue text-white shadow-lg"
                      : "text-gray-700 hover:bg-white/50"
                  )}
                >
                  {t(link.labelKey)}
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-all",
                    location.pathname === link.path ? "text-white/70 translate-x-0" : "text-gray-400 -translate-x-1 group-hover:translate-x-0"
                  )} />
                </Link>
              ))}
              <div className="pt-3">
                <Button asChild className="w-full rounded-xl gradient-accent text-white shadow-lg border-0 h-12 press-effect">
                  <Link to="/tickets" className="flex items-center justify-center gap-2">
                    <Ticket className="w-4 h-4" />
                    {t('common.buyTickets')}
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer - Modern glassmorphic */}
      <footer className="relative mt-20">
        {/* Wave decoration */}
        <div className="absolute top-0 left-0 right-0 -translate-y-full h-24 overflow-hidden">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full h-full">
            <path
              d="M0,50 C360,100 720,0 1080,50 C1260,75 1350,75 1440,50 L1440,100 L0,100 Z"
              className="fill-gray-900"
            />
          </svg>
        </div>

        <div className="bg-gray-900 text-white relative overflow-hidden">
          {/* Background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl" />
          </div>

          <div className="container py-16 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
              {/* Brand column */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-xl">Theme Park</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {t('footer.tagline')}
                </p>
                {/* Social icons */}
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Visit column */}
              <div>
                <h4 className="font-semibold text-sm mb-5 text-white/90">{t('footer.visit')}</h4>
                <ul className="space-y-3">
                  {[
                    { to: '/plan-visit', label: t('footer.parkHours') },
                    { to: '/plan-visit', label: t('footer.gettingHere') },
                    { to: '/plan-visit', label: t('footer.parking') },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link to={item.to} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                        <ChevronRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experience column */}
              <div>
                <h4 className="font-semibold text-sm mb-5 text-white/90">{t('footer.experience')}</h4>
                <ul className="space-y-3">
                  {[
                    { to: '/attractions', label: t('nav.attractions') },
                    { to: '/zones', label: t('nav.zones') },
                    { to: '/tickets', label: t('nav.tickets') },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link to={item.to} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                        <ChevronRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact column */}
              <div>
                <h4 className="font-semibold text-sm mb-5 text-white/90">{t('footer.contact')}</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-400 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    +60 3-1234 5678
                  </li>
                  <li className="flex items-center gap-3 text-gray-400 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    help@themepark.my
                  </li>
                  <li className="flex items-center gap-3 text-gray-400 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    Kuala Lumpur, Malaysia
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-xs">
                {t('footer.copyright')}
              </p>
              <div className="flex gap-6 text-xs">
                <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">{t('footer.privacy')}</Link>
                <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">{t('footer.terms')}</Link>
                <Link to="/cookies" className="text-gray-500 hover:text-white transition-colors">{t('footer.cookies')}</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
