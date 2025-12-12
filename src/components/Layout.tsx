import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Ticket, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/attractions', label: 'Attractions' },
  { path: '/zones', label: 'Zones' },
  { path: '/tickets', label: 'Tickets' },
  { path: '/plan-visit', label: 'Plan Your Visit' },
  { path: '/contact', label: 'Contact' },
];

export default function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Ticket className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight">Theme Park</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === link.path
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button asChild variant="default">
                <Link to="/tickets">Buy Tickets</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 rounded-md text-sm font-medium",
                    location.pathname === link.path
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button asChild className="w-full">
                  <Link to="/tickets" onClick={() => setMobileMenuOpen(false)}>
                    Buy Tickets
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-md flex items-center justify-center">
                  <Ticket className="w-5 h-5" />
                </div>
                <span className="text-xl font-semibold">Theme Park</span>
              </div>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                Malaysia's premier family entertainment destination. Creating magical memories since 2024.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Visit Us</h4>
              <ul className="space-y-2.5 text-primary-foreground/70 text-sm">
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">Park Hours</li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">Getting Here</li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">Parking</li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">Accessibility</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Experience</h4>
              <ul className="space-y-2.5 text-primary-foreground/70 text-sm">
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">Attractions</li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">Dining</li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">Events</li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer">Virtual Queue</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2.5 text-primary-foreground/70 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +60 3-1234 5678
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  help@themepark.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Kuala Lumpur, Malaysia
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Theme Park Sdn Bhd. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-primary-foreground/60">
              <Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-primary-foreground transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
