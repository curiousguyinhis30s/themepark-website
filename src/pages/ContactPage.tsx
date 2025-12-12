import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      setError(null);
      setFormData({ name: '', email: '', subject: 'general', message: '' });
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    contactMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      primary: '+60 3-1234 5678',
      secondary: 'Mon-Sun: 9AM - 6PM',
    },
    {
      icon: Mail,
      title: 'Email Us',
      primary: 'help@themepark.com',
      secondary: 'We respond within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      primary: 'Theme Park Sdn Bhd',
      secondary: 'Kuala Lumpur, Malaysia',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      primary: '24/7 Virtual Assistant',
      secondary: 'Available in our mobile app',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Have questions? We're here to help make your visit magical.
          </p>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((item) => (
              <Card key={item.title}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-foreground">{item.primary}</p>
                      <p className="text-sm text-muted-foreground">{item.secondary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 md:p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Message Sent!</h2>
                    <p className="text-muted-foreground mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <Button
                      variant="ghost"
                      onClick={() => setSubmitted(false)}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Your Name
                          </label>
                          <Input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email Address
                          </label>
                          <Input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Subject
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full h-10 px-3 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="tickets">Tickets & Bookings</option>
                          <option value="feedback">Feedback</option>
                          <option value="corporate">Corporate Events</option>
                          <option value="lost">Lost & Found</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Message
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      {error && (
                        <Card className="border-destructive bg-destructive/10">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2 text-destructive text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {error}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <Button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className="w-full"
                        size="lg"
                      >
                        {contactMutation.isPending ? (
                          'Sending...'
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
