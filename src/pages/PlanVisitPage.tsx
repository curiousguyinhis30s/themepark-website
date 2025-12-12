import { Link } from 'react-router-dom';
import {
  Clock,
  Car,
  Train,
  Check,
  X,
  Sunrise,
  Smartphone,
  Utensils,
  CloudRain,
  Baby,
  User,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PlanVisitPage() {
  const parkHours = [
    { day: 'Weekdays', hours: '10:00 AM - 8:00 PM', note: 'Monday - Friday' },
    { day: 'Weekends', hours: '9:00 AM - 10:00 PM', note: 'Saturday & Sunday' },
    { day: 'Holidays', hours: '9:00 AM - 11:00 PM', note: 'Public Holidays' },
  ];

  const tips = [
    {
      icon: Sunrise,
      title: 'Arrive Early',
      tip: 'Gates open 15 minutes before official opening. Beat the crowds to popular rides!',
    },
    {
      icon: Smartphone,
      title: 'Use Virtual Queue',
      tip: 'Download our app and book your spot in line from anywhere in the park.',
    },
    {
      icon: Utensils,
      title: 'Eat Off-Peak',
      tip: 'Visit restaurants before 11:30 AM or after 2 PM to avoid long queues.',
    },
    {
      icon: CloudRain,
      title: 'Rainy Days Rock',
      tip: 'Fewer crowds and many indoor attractions. Bring a poncho and enjoy!',
    },
    {
      icon: Baby,
      title: 'Child Swap',
      tip: 'Parents can take turns on thrill rides without waiting twice.',
    },
    {
      icon: User,
      title: 'Single Rider',
      tip: 'Going solo? Use single rider lines for faster access to popular rides.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Plan Your Visit
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Everything you need to know for the perfect day at Theme Park.
          </p>
        </div>
      </section>

      <div className="container py-16 space-y-16">
        {/* Park Hours */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-accent" />
            Park Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {parkHours.map((schedule) => (
              <Card key={schedule.day}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{schedule.day}</h3>
                  <p className="text-2xl font-bold text-accent mb-1">{schedule.hours}</p>
                  <p className="text-sm text-muted-foreground">{schedule.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Getting Here */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Getting Here</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Car className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">By Car</h3>
                    <p className="text-muted-foreground mb-4">
                      Located just off Highway 1, Theme Park is easily accessible by car.
                      Follow signs for "Theme Park" from the highway exit.
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="font-medium mb-2 text-sm">Parking Rates</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Standard: RM20/day</p>
                        <p>Premium: RM50/day (closest to entrance)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Train className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">By Public Transport</h3>
                    <p className="text-muted-foreground mb-4">
                      Take the MRT to Theme Park Station. Free shuttle buses run every 10 minutes
                      from the station to the park entrance.
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="font-medium mb-2 text-sm">Shuttle Hours</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>First bus: 9:00 AM</p>
                        <p>Last bus: 11:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What to Bring */}
        <section>
          <h2 className="text-2xl font-bold mb-6">What to Bring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-emerald-200 bg-emerald-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-emerald-700">
                  <Check className="w-5 h-5" />
                  Recommended
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 text-emerald-800">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    Comfortable walking shoes
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    Sunscreen and hat
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    Mobile phone (for Virtual Queue)
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    Refillable water bottle
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    Change of clothes (for water rides)
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    Umbrella or rain poncho
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-red-700">
                  <X className="w-5 h-5" />
                  Not Allowed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 text-red-800">
                  <li className="flex items-center gap-2 text-sm">
                    <X className="w-4 h-4 flex-shrink-0" />
                    Outside food and beverages
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <X className="w-4 h-4 flex-shrink-0" />
                    Professional camera equipment
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <X className="w-4 h-4 flex-shrink-0" />
                    Selfie sticks on rides
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <X className="w-4 h-4 flex-shrink-0" />
                    Drones
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <X className="w-4 h-4 flex-shrink-0" />
                    Pets (except service animals)
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <X className="w-4 h-4 flex-shrink-0" />
                    Smoking/vaping inside park
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pro Tips */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Pro Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <Card key={tip.title}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <tip.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.tip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Ready for Your Adventure?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Now that you know everything, it's time to book your tickets and start making memories!
          </p>
          <Button asChild size="lg">
            <Link to="/tickets">
              Buy Tickets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
