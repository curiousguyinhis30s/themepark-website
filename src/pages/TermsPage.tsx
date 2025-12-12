import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Terms of Service</h1>
          <p className="text-primary-foreground/70">Last updated: December 2024</p>
        </div>
      </section>

      <div className="container max-w-4xl py-12">
        <Card>
          <CardContent className="p-6 md:p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using Theme Park's services, including our website, mobile application, and park facilities, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Ticket Purchases</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All ticket sales are final. Refunds may be issued at our discretion in case of park closure.</li>
                <li>Tickets are non-transferable unless explicitly stated otherwise.</li>
                <li>We reserve the right to verify ticket authenticity at park entry.</li>
                <li>Lost or stolen tickets will not be replaced without proof of purchase.</li>
                <li>Season passes are valid for the specified period and cannot be extended.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Park Rules and Safety</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All guests must comply with posted height, age, and health requirements for attractions.</li>
                <li>Theme Park reserves the right to refuse admission or remove any guest who violates park policies.</li>
                <li>Professional cameras, drones, and recording equipment are prohibited without prior authorization.</li>
                <li>Guests assume all risks associated with rides and attractions.</li>
                <li>Outside food and beverages may be restricted. Please check current policies before your visit.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Virtual Queue System</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Virtual queue bookings are subject to availability and may be limited.</li>
                <li>Guests must arrive within the designated time window or forfeit their reservation.</li>
                <li>Virtual queue reservations cannot be transferred or sold.</li>
                <li>We reserve the right to modify or cancel virtual queue services without notice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Theme Park and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount paid for your ticket or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content, trademarks, and intellectual property displayed at Theme Park and on our digital platforms are owned by Theme Park Sdn Bhd. Unauthorized use, reproduction, or distribution is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We may update these Terms of Service from time to time. Continued use of our services after changes constitutes acceptance of the modified terms. We encourage you to review these terms periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms of Service shall be governed by and construed in accordance with the laws of Malaysia. Any disputes shall be subject to the exclusive jurisdiction of the Malaysian courts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Contact Information</h2>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">Theme Park Sdn Bhd</p>
                <p className="text-muted-foreground text-sm">Email: legal@themepark.com</p>
                <p className="text-muted-foreground text-sm">Phone: +60 3-1234 5678</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
