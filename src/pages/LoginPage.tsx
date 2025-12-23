import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, ArrowRight, MapPin, Clock, Star, Shield, CheckCircle2, Mail, Lock, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { DemoLoginCard, type DemoCredential } from '@themepark/ui';
import { DEMO_USERS, DEMO_PORTALS, DEMO_MODE_TEXT } from '@themepark/shared';

// Get visitor demo users
const visitorDemoCredentials: DemoCredential[] = [
  {
    email: DEMO_USERS['visitor@demo.com'].email,
    name: DEMO_USERS['visitor@demo.com'].name,
    role: 'Gold Member',
    avatar: DEMO_USERS['visitor@demo.com'].avatar,
    description: DEMO_USERS['visitor@demo.com'].description,
  },
  {
    email: DEMO_USERS['family@demo.com'].email,
    name: DEMO_USERS['family@demo.com'].name,
    role: 'Platinum Member',
    avatar: DEMO_USERS['family@demo.com'].avatar,
    description: DEMO_USERS['family@demo.com'].description,
  },
];

// Animated sales pitch phrases
const salesPhrases = [
  {
    title: 'Unlimited Magic',
    description: 'Access all 5 themed zones with a single pass',
    icon: Sparkles,
  },
  {
    title: 'Skip the Lines',
    description: 'Virtual queue system for popular attractions',
    icon: Clock,
  },
  {
    title: 'Family Memories',
    description: 'Create unforgettable moments together',
    icon: Star,
  },
  {
    title: 'World-Class Rides',
    description: '10 thrilling attractions for all ages',
    icon: MapPin,
  },
];

const features = [
  'Exclusive member discounts up to 30%',
  'Priority access to new attractions',
  'Birthday special offers',
  'Earn points on every visit',
  'Family account management',
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoPanel, setShowDemoPanel] = useState(true);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Rotate sales phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % salesPhrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle demo quick login
  const handleDemoLogin = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
    setIsLoading(false);
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Registration specific validation
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      // Password strength for registration
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasLowerCase = /[a-z]/.test(formData.password);
      const hasNumber = /[0-9]/.test(formData.password);
      if (formData.password && (!hasUpperCase || !hasLowerCase || !hasNumber)) {
        newErrors.password = 'Password must include uppercase, lowercase, and number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);

    // Navigate to home on success
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const CurrentIcon = salesPhrases[currentPhrase].icon;

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Animated Gradient with Sales Pitch */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animated-gradient" />

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full bg-white/10 blur-3xl -top-20 -left-20 animate-float" />
          <div className="absolute w-80 h-80 rounded-full bg-white/10 blur-3xl bottom-20 right-10 animate-float-slow" />
          <div className="absolute w-64 h-64 rounded-full bg-white/5 blur-2xl top-1/2 left-1/3 animate-float" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold">Theme Park</span>
              <span className="block text-xs uppercase tracking-widest text-white/70">Experience Magic</span>
            </div>
          </Link>

          {/* Animated Sales Pitch */}
          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <div className="mb-8">
              <div
                key={currentPhrase}
                className="transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                  <CurrentIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-4">
                  {salesPhrases[currentPhrase].title}
                </h2>
                <p className="text-xl text-white/80">
                  {salesPhrases[currentPhrase].description}
                </p>
              </div>
            </div>

            {/* Phrase indicators */}
            <div className="flex gap-2 mb-12">
              {salesPhrases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhrase(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    currentPhrase === index
                      ? "w-8 bg-white"
                      : "w-1.5 bg-white/40 hover:bg-white/60"
                  )}
                />
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-white/90"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold">10</p>
              <p className="text-white/70 text-sm">Attractions</p>
            </div>
            <div>
              <p className="text-3xl font-bold">5</p>
              <p className="text-white/70 text-sm">Themed Zones</p>
            </div>
            <div>
              <p className="text-3xl font-bold">500K+</p>
              <p className="text-white/70 text-sm">Happy Visitors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login/Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Theme Park</span>
          </div>

          {/* Demo Mode Panel */}
          <div className="mb-6">
            <button
              onClick={() => setShowDemoPanel(!showDemoPanel)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium text-sm">{DEMO_MODE_TEXT.banner}</span>
              </div>
              {showDemoPanel ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showDemoPanel && (
              <div className="mt-3 space-y-4">
                <DemoLoginCard
                  credentials={visitorDemoCredentials}
                  password={DEMO_MODE_TEXT.password}
                  onQuickLogin={handleDemoLogin}
                  title={DEMO_MODE_TEXT.credentials}
                  portalName={DEMO_PORTALS.visitor.name}
                  portalColor="blue"
                  className={isLoading ? 'opacity-50 pointer-events-none' : ''}
                />

                {/* Other Portals */}
                <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Explore Other Portals:</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={DEMO_PORTALS.admin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors"
                    >
                      {DEMO_PORTALS.admin.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href={DEMO_PORTALS.merchant.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors"
                    >
                      {DEMO_PORTALS.merchant.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600 text-sm">
              {isLogin
                ? 'Sign in to access your account and exclusive benefits'
                : 'Join us and start your magical adventure today'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field (registration only) */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={cn(
                    "h-12 rounded-xl",
                    errors.name && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={cn(
                    "h-12 pl-12 rounded-xl",
                    errors.email && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={cn(
                    "h-12 pl-12 pr-12 rounded-xl",
                    errors.password && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password (registration only) */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={cn(
                    "h-12 rounded-xl",
                    errors.confirmPassword && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Forgot password (login only) */}
            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl gradient-accent text-white border-0 press-effect"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            {/* Security note */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Secured with 256-bit encryption</span>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-500">or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 rounded-xl">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-12 rounded-xl">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
              Apple
            </Button>
          </div>

          {/* Toggle Login/Register */}
          <p className="text-center mt-8 text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setFormData({ email: '', password: '', name: '', confirmPassword: '' });
              }}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          {/* Continue as Guest */}
          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2"
            >
              Continue as guest
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
