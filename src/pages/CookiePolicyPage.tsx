import { Card, CardContent } from '@/components/ui/card';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Cookie Policy</h1>
          <p className="text-primary-foreground/70">Last updated: December 2024</p>
        </div>
      </section>

      <div className="container max-w-4xl py-12">
        <Card>
          <CardContent className="p-6 md:p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">What Are Cookies?</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are stored on your device when you visit a website. They help the website remember your preferences and understand how you interact with the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">How We Use Cookies</h2>
              <p className="text-muted-foreground mb-4">Theme Park uses cookies for the following purposes:</p>

              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-1">Essential Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    These cookies are necessary for the website to function properly. They enable core functionality such as security, account authentication, and ticket booking. You cannot opt out of these cookies.
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-1">Performance Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    These cookies help us understand how visitors interact with our website by collecting anonymous information. This helps us improve our services and user experience.
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-1">Functionality Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    These cookies remember your preferences, such as language selection and display settings, to provide a more personalized experience.
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-1">Marketing Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    These cookies track your online activity to help us deliver relevant advertisements. You can opt out of these cookies through your browser settings.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We may use third-party services that set their own cookies, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Google Analytics:</strong> To analyze website traffic and usage patterns</li>
                <li><strong className="text-foreground">Payment Processors:</strong> To securely process ticket purchases</li>
                <li><strong className="text-foreground">Social Media:</strong> If you use social sharing features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through their settings menu.</li>
                <li><strong className="text-foreground">Opt-Out Tools:</strong> Many advertising networks offer opt-out tools on their websites.</li>
                <li><strong className="text-foreground">Our Cookie Banner:</strong> Use our cookie consent banner to manage your preferences.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Note: Disabling certain cookies may affect the functionality of our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Cookie Retention</h2>
              <p className="text-muted-foreground">
                The duration cookies remain on your device varies:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li><strong className="text-foreground">Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong className="text-foreground">Persistent Cookies:</strong> Remain until they expire or you delete them (typically 1-2 years)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about our use of cookies, please contact us:
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
