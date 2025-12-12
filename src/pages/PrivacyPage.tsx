import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Privacy Policy</h1>
          <p className="text-primary-foreground/70">Last updated: December 2024</p>
        </div>
      </section>

      <div className="container max-w-4xl py-12">
        <Card>
          <CardContent className="p-6 md:p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                When you visit Theme Park or use our services, we may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Personal Information:</strong> Name, email address, phone number, and payment details when you create an account or purchase tickets.</li>
                <li><strong className="text-foreground">Usage Data:</strong> Information about how you interact with our website, mobile app, and park services.</li>
                <li><strong className="text-foreground">Device Information:</strong> Browser type, operating system, and device identifiers.</li>
                <li><strong className="text-foreground">Location Data:</strong> With your consent, we may collect location data to provide navigation services within the park.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Process ticket purchases and manage your bookings</li>
                <li>Provide virtual queue services and wait time notifications</li>
                <li>Send you updates about park hours, events, and promotions</li>
                <li>Improve our services and personalize your experience</li>
                <li>Ensure safety and security within the park</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Service Providers:</strong> Third parties who help us operate our services (payment processors, email providers).</li>
                <li><strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights.</li>
                <li><strong className="text-foreground">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">Theme Park Sdn Bhd</p>
                <p className="text-muted-foreground text-sm">Email: privacy@themepark.com</p>
                <p className="text-muted-foreground text-sm">Phone: +60 3-1234 5678</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
