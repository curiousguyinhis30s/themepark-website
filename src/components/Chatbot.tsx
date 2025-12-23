import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Clock, Ticket, MapPin, HelpCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Knowledge base for the chatbot
const knowledgeBase = {
  // Operating hours
  hours: {
    keywords: ['hours', 'open', 'close', 'time', 'when', 'operating'],
    response: "We're open daily from 10:00 AM to 10:00 PM. Some zones may have extended hours on weekends and holidays. Aqua Zone opens at 11:00 AM due to water preparation.",
  },
  // Tickets
  tickets: {
    keywords: ['ticket', 'price', 'cost', 'admission', 'entry', 'buy', 'purchase'],
    response: "We offer several ticket options:\n\n• Day Pass: RM 150 (Adult) / RM 100 (Child)\n• Express Pass: RM 250 (includes priority queue)\n• Season Pass: RM 799 (unlimited visits)\n• Family Pack: RM 450 (2 adults + 2 children)\n\nYou can purchase tickets online or at the park entrance. Online tickets get 10% off!",
  },
  // Attractions
  attractions: {
    keywords: ['ride', 'attraction', 'coaster', 'best', 'popular', 'thrill'],
    response: "Our most popular attractions include:\n\n🎢 Dragon Coaster - Our flagship thrill ride (Height: 120cm+)\n🚀 Space Launch - Launch coaster experience (Height: 140cm+)\n🏰 Enchanted Castle - Family dark ride (All ages)\n🌊 River Rapids - Refreshing water adventure (Height: 100cm+)\n\nWould you like to know wait times or height requirements for any specific ride?",
  },
  // Zones
  zones: {
    keywords: ['zone', 'area', 'land', 'section', 'themed'],
    response: "We have 5 amazing themed zones:\n\n✨ Fantasy Kingdom - Magical experiences for all ages\n🚀 Future World - Futuristic tech & space adventures\n💧 Aqua Zone - Water rides & splash areas\n🎠 Kids Paradise - Perfect for little ones\n🏔️ Adventure Valley - Extreme thrills for brave hearts\n\nEach zone has unique attractions, dining, and shopping!",
  },
  // Wait times
  waitTimes: {
    keywords: ['wait', 'queue', 'line', 'busy', 'crowded'],
    response: "Current approximate wait times:\n\n• Dragon Coaster: ~25 mins\n• Space Launch: ~30 mins\n• River Rapids: ~20 mins\n• Enchanted Castle: ~15 mins\n\nTip: Visit popular rides before 11 AM or after 6 PM for shorter waits. Consider our Express Pass for priority access!",
  },
  // Food & Dining
  food: {
    keywords: ['food', 'eat', 'restaurant', 'dining', 'hungry', 'lunch', 'dinner', 'snack'],
    response: "We have 12 dining locations across the park:\n\n🍔 Quick Bites - Burgers & sandwiches (Fantasy Kingdom)\n🍜 Noodle House - Asian cuisine (Future World)\n🍕 Pizza Planet - Family favorite (Kids Paradise)\n🥗 Fresh Garden - Healthy options (Aqua Zone)\n\nLook for the dining symbol on your park map. Most restaurants accept our Theme Park Card for cashless payment!",
  },
  // Parking
  parking: {
    keywords: ['park', 'parking', 'car', 'drive'],
    response: "Parking information:\n\n🅿️ Standard Parking: RM 20/day\n⭐ Premium Parking: RM 50/day (closer to entrance)\n♿ Accessible Parking: Free with valid permit\n\nParking opens 30 minutes before park opening. Keep your parking ticket - you'll need it to exit!",
  },
  // Weather & What to bring
  weather: {
    keywords: ['rain', 'weather', 'umbrella', 'bring', 'wear', 'prepare'],
    response: "Tips for your visit:\n\n☀️ Sunny days: Bring sunscreen, hat, and sunglasses\n🌧️ Rainy days: Most rides operate (bring a poncho!)\n👟 Wear comfortable walking shoes\n👙 Bring swimwear for Aqua Zone\n📱 Download our app for live updates\n\nLockers are available throughout the park (RM 15-25/day).",
  },
  // Height requirements
  height: {
    keywords: ['height', 'tall', 'cm', 'requirement', 'child', 'kid'],
    response: "Height requirements for popular rides:\n\n• Dragon Coaster: 120cm minimum\n• Space Launch: 140cm minimum\n• Thunder Mountain: 110cm minimum\n• River Rapids: 100cm minimum\n• Kiddie rides: No minimum\n• Enchanted Castle: No minimum\n\nHeight measurement stations are at each ride entrance. Children under requirements can enjoy Kids Paradise!",
  },
  // Express Pass
  express: {
    keywords: ['express', 'skip', 'fast', 'priority', 'vip'],
    response: "Express Pass Benefits:\n\n⚡ Skip the regular queue on 10+ major attractions\n⚡ Priority seating at shows\n⚡ 1 re-ride per attraction\n⚡ Special viewing areas for parades\n\nPrice: RM 100/person (add to any ticket)\n\nLimited daily passes available - book online to guarantee availability!",
  },
  // Safety
  safety: {
    keywords: ['safe', 'security', 'lost', 'child', 'emergency', 'first aid'],
    response: "Safety & Services:\n\n🏥 First Aid stations in each zone\n👮 Security available 24/7\n📍 Lost Child Center at Main Entrance\n📞 Emergency: Dial 123 from any park phone\n♿ Wheelchair & stroller rental available\n\nAll rides are inspected daily. Our staff are trained to assist with any emergency.",
  },
  // Birthday & Events
  birthday: {
    keywords: ['birthday', 'party', 'celebration', 'event', 'special'],
    response: "Make birthdays magical! 🎂\n\n🎈 Birthday Package: RM 299/child\n• Dedicated party host\n• Character meet & greet\n• Special cake & decorations\n• Party favor bags\n• Priority ride access\n\nBook 2 weeks in advance. Groups of 10+ get 15% off admission!",
  },
  // Contact
  contact: {
    keywords: ['contact', 'call', 'email', 'phone', 'help', 'support'],
    response: "Contact Us:\n\n📞 Phone: +60 3-1234 5678\n📧 Email: help@themepark.my\n💬 Live Chat: Available 9 AM - 9 PM\n📍 Address: Theme Park Drive, Kuala Lumpur\n\nFor fastest response, try our live chat!",
  },
  // Default response
  default: {
    keywords: [],
    response: "I'm here to help! You can ask me about:\n\n• Operating hours & tickets\n• Attractions & wait times\n• Zones & experiences\n• Food & dining options\n• Parking & directions\n• Height requirements\n• Express Pass benefits\n\nWhat would you like to know?",
  },
};

// Quick action suggestions
const quickActions = [
  { icon: Clock, label: 'Park Hours', query: 'What are the operating hours?' },
  { icon: Ticket, label: 'Ticket Prices', query: 'How much are tickets?' },
  { icon: MapPin, label: 'Attractions', query: 'What are the best attractions?' },
  { icon: HelpCircle, label: 'Help', query: 'What can you help me with?' },
];

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

function findBestResponse(query: string): string {
  const lowercaseQuery = query.toLowerCase();

  // Check each category in knowledge base
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (key === 'default') continue;

    const matchedKeyword = value.keywords.some(keyword =>
      lowercaseQuery.includes(keyword)
    );

    if (matchedKeyword) {
      return value.response;
    }
  }

  // Return default response if no match found
  return knowledgeBase.default.response;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! 👋 I'm your Theme Park assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate typing delay
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
    setIsTyping(false);

    // Get bot response
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: findBestResponse(message),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botResponse]);
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-accent text-white shadow-lg shadow-orange-500/30 flex items-center justify-center hover:scale-110 transition-all duration-300 press-effect",
          isOpen && "hidden"
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 transform",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
        style={{ height: 'min(600px, calc(100vh - 6rem))' }}
      >
        {/* Header */}
        <div className="gradient-accent px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Park Assistant</h3>
              <p className="text-xs text-white/70">Online • Instant replies</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.type === 'user' && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  message.type === 'bot'
                    ? "bg-blue-100 text-blue-600"
                    : "bg-orange-100 text-orange-600"
                )}
              >
                {message.type === 'bot' ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-3 text-sm",
                  message.type === 'bot'
                    ? "bg-white text-gray-800 rounded-tl-md shadow-sm"
                    : "bg-blue-600 text-white rounded-tr-md"
                )}
              >
                <p className="whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions (show only at start) */}
        {messages.length <= 2 && (
          <div className="px-4 py-3 border-t border-gray-100 bg-white">
            <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.query)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors"
                >
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 h-11 rounded-xl bg-gray-100 border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim()}
              className="h-11 w-11 rounded-xl gradient-accent text-white border-0 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-[10px] text-gray-400 text-center mt-2">
            Powered by Theme Park AI • Responses are informational only
          </p>
        </div>
      </div>
    </>
  );
}
