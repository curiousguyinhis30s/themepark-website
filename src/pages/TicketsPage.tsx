import { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Check, ArrowLeft, CreditCard, Mail, User, Calendar, ChevronDown, AlertCircle, PartyPopper, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PaymentForm {
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardHolder: string;
  email: string;
}

type PurchaseStep = 'select' | 'details' | 'payment' | 'success';

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [step, setStep] = useState<PurchaseStep>('select');
  const [quantity, setQuantity] = useState(1);
  const [visitDate, setVisitDate] = useState('');
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardHolder: '',
    email: '',
  });
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [purchaseResult, setPurchaseResult] = useState<any>(null);

  const { data: ticketTypesData } = useQuery({
    queryKey: ['ticketTypes'],
    queryFn: async () => {
      const res = await fetch('/api/tickets/types');
      return res.json();
    },
  });

  const ticketTypes = ticketTypesData?.ticketTypes || [];

  const selectedTicketData = useMemo(() => {
    return ticketTypes.find((t: any) => t.id === selectedTicket);
  }, [selectedTicket, ticketTypes]);

  const subtotal = selectedTicketData ? selectedTicketData.price * quantity : 0;
  const serviceFee = 5;
  const total = subtotal + serviceFee;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.substring(0, 19);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const purchaseMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/tickets/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketTypeId: selectedTicket,
          quantity,
          visitDate,
          guestEmail: paymentForm.email,
          payment: {
            method: 'card',
            cardNumber: paymentForm.cardNumber.replace(/\s/g, ''),
            cardExpiry: paymentForm.cardExpiry,
            cardCvv: paymentForm.cardCvv,
            cardHolder: paymentForm.cardHolder,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Purchase failed');
      return data;
    },
    onSuccess: (data) => {
      setPurchaseResult(data);
      setStep('success');
    },
    onError: (error: Error) => {
      setPaymentError(error.message);
    },
  });

  const handleProceedToDetails = () => {
    if (selectedTicket) {
      setStep('details');
    }
  };

  const handleProceedToPayment = () => {
    if (visitDate) {
      setPaymentError(null);
      setStep('payment');
    }
  };

  const handleCompletePurchase = () => {
    setPaymentError(null);
    purchaseMutation.mutate();
  };

  const resetPurchase = () => {
    setSelectedTicket(null);
    setStep('select');
    setQuantity(1);
    setVisitDate('');
    setPaymentForm({ cardNumber: '', cardExpiry: '', cardCvv: '', cardHolder: '', email: '' });
    setPurchaseResult(null);
    setPaymentError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Buy Tickets
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Choose the perfect pass for your adventure. All tickets include unlimited access to attractions.
          </p>
        </div>
      </section>

      {/* Ticket Types */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ticketTypes.map((ticket: any) => (
            <Card
              key={ticket.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-lg",
                selectedTicket === ticket.id && "ring-2 ring-accent ring-offset-2"
              )}
              onClick={() => setSelectedTicket(ticket.id)}
            >
              <div
                className="h-1"
                style={{ backgroundColor: ticket.color }}
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{ticket.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{ticket.description}</p>

                <div className="mb-6">
                  <span className="text-3xl font-bold">RM{ticket.price}</span>
                  <span className="text-muted-foreground">/person</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {ticket.features?.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={selectedTicket === ticket.id ? "default" : "outline"}
                  className="w-full"
                >
                  {selectedTicket === ticket.id ? 'Selected' : 'Select'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Flow */}
      {step === 'select' && selectedTicket && (
        <div className="border-t bg-muted/30">
          <div className="container max-w-xl py-12">
            <h2 className="text-xl font-semibold mb-6 text-center">
              You selected: {selectedTicketData?.name}
            </h2>
            <Button onClick={handleProceedToDetails} className="w-full" size="lg">
              Continue to Booking Details
            </Button>
          </div>
        </div>
      )}

      {step === 'details' && (
        <div className="border-t bg-muted/30">
          <div className="container max-w-xl py-12">
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" size="sm" onClick={() => setStep('select')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h2 className="text-xl font-semibold">Booking Details</h2>
              <div className="w-16" />
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Visit Date
                  </label>
                  <Input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Tickets
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full h-10 px-3 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n} ticket{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">{selectedTicketData?.name} × {quantity}</span>
                    <span>RM {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span>RM {serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>RM {total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleProceedToPayment}
                disabled={!visitDate}
                className="w-full"
                size="lg"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div className="border-t bg-muted/30">
          <div className="container max-w-xl py-12">
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" size="sm" onClick={() => setStep('details')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h2 className="text-xl font-semibold">Payment Details</h2>
              <div className="w-16" />
            </div>

            {/* Test Card Info */}
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800 mb-1">Test Card Numbers</p>
                    <div className="grid grid-cols-2 gap-1 text-blue-700 text-xs">
                      <span>Success: 4111 1111 1111 1111</span>
                      <span>Declined: 4000 0000 0000 0002</span>
                    </div>
                    <p className="text-blue-600 text-xs mt-1">Use any future expiry and any 3-digit CVV</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {paymentError && (
              <Card className="mb-6 border-destructive bg-destructive/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {paymentError}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                <Input
                  type="email"
                  value={paymentForm.email}
                  onChange={(e) => setPaymentForm({ ...paymentForm, email: e.target.value })}
                  placeholder="your@email.com"
                />
                <p className="text-xs text-muted-foreground mt-1">Tickets will be sent to this email</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Cardholder Name
                </label>
                <Input
                  type="text"
                  value={paymentForm.cardHolder}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cardHolder: e.target.value })}
                  placeholder="JOHN DOE"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <CreditCard className="w-4 h-4 inline mr-1" />
                  Card Number
                </label>
                <Input
                  type="text"
                  value={paymentForm.cardNumber}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: formatCardNumber(e.target.value) })}
                  placeholder="4111 1111 1111 1111"
                  maxLength={19}
                  className="font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <Input
                    type="text"
                    value={paymentForm.cardExpiry}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cardExpiry: formatExpiry(e.target.value) })}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <Input
                    type="text"
                    value={paymentForm.cardCvv}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cardCvv: e.target.value.replace(/\D/g, '').substring(0, 4) })}
                    placeholder="123"
                    maxLength={4}
                    className="font-mono"
                  />
                </div>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">{selectedTicketData?.name} × {quantity}</span>
                    <span>RM {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span>RM {serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>RM {total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleCompletePurchase}
                disabled={purchaseMutation.isPending || !paymentForm.email || !paymentForm.cardHolder || !paymentForm.cardNumber || !paymentForm.cardExpiry || !paymentForm.cardCvv}
                className="w-full"
                size="lg"
                variant="accent"
              >
                {purchaseMutation.isPending ? 'Processing...' : `Pay RM ${total.toFixed(2)}`}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Your payment is secure. By completing this purchase, you agree to our Terms of Service.
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 'success' && purchaseResult && (
        <div className="border-t bg-muted/30">
          <div className="container max-w-xl py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
              <PartyPopper className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-emerald-600">Purchase Complete!</h2>
            <p className="text-muted-foreground mb-8">
              Your tickets have been sent to <strong>{paymentForm.email}</strong>
            </p>

            <Card className="text-left mb-8">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono">{purchaseResult.order?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="font-mono">{purchaseResult.payment?.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ticket Type</span>
                  <span>{selectedTicketData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity</span>
                  <span>{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Visit Date</span>
                  <span>{visitDate}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                  <span>Total Paid</span>
                  <span>RM {total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-2 text-left">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800">What's Next?</p>
                    <p className="text-blue-700">Download our mobile app to view your tickets with QR codes for park entry.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={resetPurchase}>
              Buy More Tickets
            </Button>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <section className="container max-w-3xl py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

        <div className="space-y-3">
          {[
            {
              q: 'Can I cancel my tickets?',
              a: 'Tickets can be cancelled up to 24 hours before the visit date for a full refund. After that, tickets are non-refundable but can be rescheduled.',
            },
            {
              q: 'Are tickets valid for specific dates?',
              a: 'Yes, all tickets are valid only for the date selected during purchase. Multi-day passes allow consecutive day visits.',
            },
            {
              q: "What's included with Express Queue?",
              a: 'Express Queue passes allow you to skip the regular queue at participating attractions. The number of uses depends on your ticket type.',
            },
            {
              q: 'Are children under 3 free?',
              a: 'Yes! Children under 3 years old enter free. Children aged 3-12 require a Child Pass.',
            },
          ].map((faq, index) => (
            <details key={index} className="group">
              <summary className="flex items-center justify-between cursor-pointer bg-card rounded-lg p-4 border hover:bg-muted/50 transition-colors">
                <span className="font-medium">{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-4 pb-4 pt-2 text-muted-foreground text-sm">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
