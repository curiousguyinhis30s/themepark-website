import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ArrowLeft, CreditCard, Mail, User, Calendar, ChevronDown, AlertCircle, PartyPopper, Info, Ticket, Crown, Users, Sparkles, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Mock ticket data with enhanced features
const mockTicketTypes = [
  {
    id: 'day-pass',
    name: 'Day Pass',
    description: 'Full day access to all attractions',
    price: 99,
    availability: 'available',
    color: 'from-blue-500 to-cyan-500',
    icon: Ticket,
    features: ['All attractions', 'Live shows', 'Parade viewing'],
    popular: false,
  },
  {
    id: 'weekend-pass',
    name: 'Weekend Pass',
    description: '2-day access (Sat & Sun)',
    price: 179,
    availability: 'available',
    color: 'from-purple-500 to-pink-500',
    icon: Star,
    features: ['2 consecutive days', 'All attractions', 'Live shows', 'Priority seating'],
    popular: true,
  },
  {
    id: 'family-pack',
    name: 'Family Pack',
    description: '2 adults + 2 kids day pass',
    price: 299,
    availability: 'available',
    color: 'from-emerald-500 to-teal-500',
    icon: Users,
    features: ['4 tickets included', 'All attractions', 'Family photo package', 'Reserved dining'],
    popular: false,
  },
  {
    id: 'vip-pass',
    name: 'VIP Experience',
    description: 'Skip-the-line + premium perks',
    price: 199,
    availability: 'limited',
    color: 'from-amber-500 to-orange-500',
    icon: Crown,
    features: ['Express queue', 'Premium parking', 'VIP lounge', 'Exclusive gifts'],
    popular: false,
  },
];

interface PaymentForm {
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardHolder: string;
  email: string;
}

type PurchaseStep = 'select' | 'details' | 'payment' | 'success';

export default function TicketsPage() {
  const { t } = useTranslation();
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
  const [isPurchasing, setIsPurchasing] = useState(false);

  const ticketTypes = mockTicketTypes;

  const selectedTicketData = useMemo(() => {
    return ticketTypes.find((t) => t.id === selectedTicket);
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

  const handlePurchase = () => {
    setIsPurchasing(true);
    setPaymentError(null);

    setTimeout(() => {
      const mockResult = {
        success: true,
        confirmationCode: 'TK' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        ticketType: selectedTicketData?.name,
        quantity,
        visitDate,
        total,
        email: paymentForm.email,
      };
      setPurchaseResult(mockResult);
      setStep('success');
      setIsPurchasing(false);
    }, 1500);
  };

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
    handlePurchase();
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl" />
        </div>

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-white">Best Value Passes</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              {t('tickets.title', 'Get Your')}<br />
              <span className="text-gradient-orange">{t('tickets.titleHighlight', 'Adventure Pass')}</span>
            </h1>

            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {t('tickets.subtitle', 'Choose the perfect pass for your adventure. All tickets include unlimited access to attractions.')}
            </p>
          </div>
        </div>
      </section>

      {/* Ticket Types - Glassmorphic cards */}
      <section className="relative -mt-12 z-20 pb-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ticketTypes.map((ticket) => {
              const Icon = ticket.icon;
              const isSelected = selectedTicket === ticket.id;

              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket.id)}
                  className={cn(
                    "relative glass-card p-6 cursor-pointer transition-all hover-lift group",
                    isSelected && "ring-2 ring-blue-500 ring-offset-4"
                  )}
                >
                  {/* Popular badge */}
                  {ticket.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-medium shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Limited badge */}
                  {ticket.availability === 'limited' && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                        Limited
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ticket.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{ticket.name}</h3>
                  <p className="text-sm text-gray-500 mb-5">{ticket.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">RM{ticket.price}</span>
                    <span className="text-gray-500 text-sm">{ticket.id === 'family-pack' ? '/pack' : '/person'}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {ticket.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${ticket.color} flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Select button */}
                  <Button
                    className={cn(
                      "w-full rounded-xl transition-all",
                      isSelected
                        ? "gradient-accent text-white border-0"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-0"
                    )}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      'Select Pass'
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Flow */}
      {step === 'select' && selectedTicket && (
        <section className="py-12 border-t">
          <div className="container max-w-xl">
            <div className="glass-card p-8 text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedTicketData?.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                {selectedTicketData?.icon && <selectedTicketData.icon className="w-8 h-8 text-white" />}
              </div>
              <h2 className="text-xl font-semibold mb-2">
                You selected: {selectedTicketData?.name}
              </h2>
              <p className="text-gray-500 mb-6">RM{selectedTicketData?.price} {selectedTicket === 'family-pack' ? 'per pack (4 tickets)' : 'per person'}</p>
              <Button onClick={handleProceedToDetails} className="w-full h-12 rounded-xl gradient-accent text-white border-0">
                Continue to Booking Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {step === 'details' && (
        <section className="py-12 border-t">
          <div className="container max-w-xl">
            <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" size="sm" onClick={() => setStep('select')} className="rounded-xl">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <h2 className="text-xl font-semibold">Booking Details</h2>
                <div className="w-16" />
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Visit Date
                    </label>
                    <Input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="rounded-xl h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Number of Tickets
                    </label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full h-12 px-4 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n} ticket{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Order summary */}
                <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{selectedTicketData?.name} × {quantity}</span>
                    <span className="font-medium">RM {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service Fee</span>
                    <span className="font-medium">RM {serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">RM {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleProceedToPayment}
                  disabled={!visitDate}
                  className="w-full h-12 rounded-xl gradient-accent text-white border-0"
                >
                  Continue to Payment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {step === 'payment' && (
        <section className="py-12 border-t">
          <div className="container max-w-xl">
            <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" size="sm" onClick={() => setStep('details')} className="rounded-xl">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <h2 className="text-xl font-semibold">Payment Details</h2>
                <div className="w-16" />
              </div>

              {/* Test Card Info */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800 mb-1">Test Card Numbers</p>
                    <div className="text-blue-700 text-xs space-y-1">
                      <p>Success: 4111 1111 1111 1111</p>
                      <p>Use any future expiry and any 3-digit CVV</p>
                    </div>
                  </div>
                </div>
              </div>

              {paymentError && (
                <div className="bg-red-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {paymentError}
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={paymentForm.email}
                    onChange={(e) => setPaymentForm({ ...paymentForm, email: e.target.value })}
                    placeholder="your@email.com"
                    className="rounded-xl h-12"
                  />
                  <p className="text-xs text-gray-500 mt-1">Tickets will be sent to this email</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <User className="w-4 h-4 inline mr-2" />
                    Cardholder Name
                  </label>
                  <Input
                    type="text"
                    value={paymentForm.cardHolder}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cardHolder: e.target.value })}
                    placeholder="JOHN DOE"
                    className="rounded-xl h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Card Number
                  </label>
                  <Input
                    type="text"
                    value={paymentForm.cardNumber}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: formatCardNumber(e.target.value) })}
                    placeholder="4111 1111 1111 1111"
                    maxLength={19}
                    className="rounded-xl h-12 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Expiry Date</label>
                    <Input
                      type="text"
                      value={paymentForm.cardExpiry}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cardExpiry: formatExpiry(e.target.value) })}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="rounded-xl h-12 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">CVV</label>
                    <Input
                      type="text"
                      value={paymentForm.cardCvv}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cardCvv: e.target.value.replace(/\D/g, '').substring(0, 4) })}
                      placeholder="123"
                      maxLength={4}
                      className="rounded-xl h-12 font-mono"
                    />
                  </div>
                </div>

                {/* Order summary */}
                <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{selectedTicketData?.name} × {quantity}</span>
                    <span className="font-medium">RM {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service Fee</span>
                    <span className="font-medium">RM {serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">RM {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCompletePurchase}
                  disabled={isPurchasing || !paymentForm.email || !paymentForm.cardHolder || !paymentForm.cardNumber || !paymentForm.cardExpiry || !paymentForm.cardCvv}
                  className="w-full h-14 rounded-xl gradient-accent text-white border-0 text-base"
                >
                  {isPurchasing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    `Pay RM ${total.toFixed(2)}`
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Your payment is secure. By completing this purchase, you agree to our Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {step === 'success' && purchaseResult && (
        <section className="py-12 border-t">
          <div className="container max-w-xl">
            <div className="glass-card p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <PartyPopper className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-emerald-600">Purchase Complete!</h2>
              <p className="text-gray-500 mb-8">
                Your tickets have been sent to <strong>{paymentForm.email}</strong>
              </p>

              <div className="bg-gray-50 rounded-xl p-5 text-left mb-8 space-y-3">
                <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Confirmation</span>
                  <span className="font-mono font-medium">{purchaseResult.confirmationCode}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ticket Type</span>
                  <span className="font-medium">{selectedTicketData?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Quantity</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Visit Date</span>
                  <span className="font-medium">{visitDate}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total Paid</span>
                  <span className="text-blue-600">RM {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-8 text-left">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800">What's Next?</p>
                    <p className="text-blue-700">Download our mobile app to view your tickets with QR codes for park entry.</p>
                  </div>
                </div>
              </div>

              <Button onClick={resetPurchase} className="rounded-xl gradient-blue text-white border-0">
                Buy More Tickets
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              Help Center
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

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
                q: "What's included with VIP Experience?",
                a: 'VIP passes include express queue access at all attractions, premium parking, access to the VIP lounge, and exclusive merchandise gifts.',
              },
              {
                q: 'Are children under 3 free?',
                a: 'Yes! Children under 3 years old enter free. Children aged 3-12 require a Child Pass.',
              },
            ].map((faq, index) => (
              <details key={index} className="group glass-card overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-white/50 transition-colors">
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
