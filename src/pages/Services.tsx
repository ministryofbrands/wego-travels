import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Ticket,
  CalendarCheck,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Globe,
  FileCheck,
  Plane
} from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Fade In Section Component (Matching About.tsx)
const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const services = [
  {
    id: 'travels',
    Icon: Globe,
    title: 'Travel',
    description: 'Travel Consultation: Expert guidance to plan your perfect journey. We help you choose destinations, create itineraries, and ensure every detail matches your travel dreams.',
    features: ['Personalized Itineraries', 'Destination Advice', 'Budget Planning']
  },
  {
    id: 'tickets',
    Icon: Ticket,
    title: 'Ticket',
    description: 'Ticket Booking: Seamless booking services for flights, trains, and attractions. We ensure you get the best connections and competitive rates globally.',
    features: ['Flight Reservations', 'Train & Rail', 'Attraction Passes']
  },
  {
    id: 'visa',
    Icon: FileCheck,
    title: 'Visa',
    description: 'Visa Consultation: Navigate complex visa requirements with ease. Our experts handle the paperwork and guidance to ensure successful visa applications for any country.',
    features: ['Application Assistance', 'Document Verification', 'Interview Prep']
  },
  {
    id: 'business',
    Icon: Briefcase,
    title: 'Business',
    description: 'Business Tours: Executive travel solutions designed for efficiency and comfort. From corporate retreats to conference logistics, we handle the details so you can focus on business.',
    features: ['Corporate Retreats', 'MICE Management', 'Executive Transport']
  }
];

const processSteps = [
  {
    Icon: MessageSquare,
    title: 'Consultation',
    description: 'Discuss your travel preferences, budget, and dreams with our experts.'
  },
  {
    Icon: CalendarCheck,
    title: 'Planning',
    description: 'We craft a personalized itinerary aimed at maximizing your experience.'
  },
  {
    Icon: CheckCircle2,
    title: 'Booking',
    description: 'Secure your schedule with instant confirmations and comprehensive support.'
  },
  {
    Icon: Plane,
    title: 'Traveling',
    description: 'Embark on your journey with confidence, knowing we are with you every step of the way.'
  }
];

const faqs = [
  {
    question: "What is your cancellation policy for Ticket Booking?",
    answer: "Our cancellation policy is designed to be as flexible as possible. While specific terms depend on the airline or service provider, Wego Travels provides full assistance in processing refunds or securing travel credits, ensuring minimal stress for our clients."
  },
  {
    question: "Can we customize Business Tour itineraries?",
    answer: "Absolutely. We understand that every corporate requirement is unique. Our Business Tours are fully customizable—from private meeting spaces and VIP transport to tailored networking dinners—all engineered to fit your schedule perfectly."
  },
  {
    question: "Do you offer flexible payment plans for Trip Packages?",
    answer: "Yes, we offer several payment options for our premium packages. You can secure your booking with a deposit and settle the balance through personalized installment plans, allowing you to plan your dream escape with financial peace of mind."
  },
  {
    question: "How do you handle last-minute changes during a journey?",
    answer: "Every traveler is assigned a dedicated concierge. Whether it's a sudden flight delay or a change in local plans, our 24/7 support team is just a message away to handle every logistical hurdle in real-time."
  }
];

export function Services() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  return (
    <div className="bg-white overflow-x-hidden">
      {/* Immersive Hero Section - Matching About Us Aesthetic */}
      <div className="relative h-[85vh] w-full bg-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=2000"
            alt="Wego Services"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-[2px] w-12 bg-[#F48A34]"></div>
              <span className="text-orange-400 font-bold tracking-widest uppercase text-sm md:text-base">Travel With Confidence</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-8">
              Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                Premium
              </span> Services.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed">
              We provide world-class travel management solutions tailored to the unique needs of every traveler.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Grid (Light Themed Redesign) */}
      <div className="py-32 relative overflow-hidden bg-white antialiased">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="relative mb-24 text-center">
              <span
                className="text-8xl md:text-9xl font-black text-white absolute -top-16 left-1/2 -translate-x-1/2 z-0 select-none hidden lg:block uppercase tracking-[0.2em]"
                style={{ WebkitTextStroke: '2px #e2e8f0', color: 'rgba(241, 245, 249, 0.5)' }}
              >
                SERVICES
              </span>
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                  <span className="text-[#F48A34] font-bold tracking-widest uppercase text-sm">Our Expertise</span>
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-blue-900 leading-tight mx-auto max-w-4xl">
                  Travel With <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                    Confidence.
                  </span>
                </h2>
                <p className="text-xl text-gray-500 mt-8 font-light max-w-2xl mx-auto leading-relaxed">
                  We don't just book trips; we architect experiences. From executive logistics to soulful escapes, discover how we're redefining the journey.
                </p>
              </div>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <FadeInSection key={idx}>
                <div className="h-full bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#F48A34]/50 hover:shadow-lg transition-all duration-500 group flex flex-col items-center text-center">
                  <div className="mb-8 p-5 bg-blue-50 rounded-2xl group-hover:bg-[#F48A34] transition-colors duration-500">
                    <service.Icon className="w-8 h-8 text-[#0167B2] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-4 tracking-tight uppercase">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-light mb-8">
                    {service.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section (Immersive Background) */}
      <div className="bg-blue-900 py-32 relative overflow-hidden antialiased">
        {/* Modern Background with Image & Multi-layer Overlay Pattern */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-60"
            alt="Process BG"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="text-center mb-20 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Service Process</h2>
              <p className="text-xl text-blue-100 font-light max-w-2xl mx-auto">
                We've refined our workflow to ensure every detail of your journey is handled with precision.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Lines (Desktop & Tablet) - Adjusted for 4 columns */}
            {/* Line 1: Between 1st and 2nd */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[62.5%] h-[2px] bg-white/30 -z-0" />
            {/* Line 2: Between 2nd and 3rd */}
            <div className="hidden lg:block absolute top-10 left-[37.5%] right-[37.5%] h-[2px] bg-white/30 -z-0" />
            {/* Line 3: Between 3rd and 4th */}
            <div className="hidden lg:block absolute top-10 left-[62.5%] right-[12.5%] h-[2px] bg-white/30 -z-0" />

            {processSteps.map((step) => (
              <FadeInSection key={step.title}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-[#F48A34] rounded-full flex items-center justify-center shadow-2xl mb-6 relative z-10 border-4 border-blue-900 group-hover:scale-110 transition-transform duration-300">
                    <step.Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">{step.title}</h3>
                  <div className="h-[2px] w-12 bg-orange-400 mb-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <p className="text-blue-100 text-base font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-20">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                <span className="text-blue-900 font-bold tracking-widest uppercase text-sm">Common Queries</span>
                <div className="h-[2px] w-12 bg-[#F48A34]"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-500 font-light">
                Everything you need to know before embarking on your next journey.
              </p>
            </div>
          </FadeInSection>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FadeInSection key={index}>
                <div
                  className={`border border-gray-100 rounded-3xl transition-all duration-300 overflow-hidden ${activeFaq === index ? 'bg-white shadow-xl border-orange-100' : 'bg-white hover:border-orange-200'
                    }`}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                  >
                    <div className="flex items-center space-x-4">
                      <HelpCircle className={`w-6 h-6 transition-colors ${activeFaq === index ? 'text-[#F48A34]' : 'text-blue-900'}`} />
                      <span className={`text-lg font-bold transition-colors ${activeFaq === index ? 'text-blue-900' : 'text-gray-700'}`}>
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: activeFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className={`w-5 h-5 ${activeFaq === index ? 'text-[#F48A34]' : 'text-gray-400'}`} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-8 pb-8 pt-2">
                          <div className="h-[1px] w-full bg-gray-100 mb-6 font-light"></div>
                          <p className="text-gray-600 leading-relaxed text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Interactive Parallax (Matching About.tsx) */}
      <div
        className="relative h-[65vh] flex items-center justify-center overflow-hidden"
        onMouseMove={(e) => {
          const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
          const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
          const img = document.getElementById('cta-bg-image-services');
          if (img) {
            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.15)`;
          }
        }}
      >
        <div className="absolute inset-0 z-0">
          <img
            id="cta-bg-image-services"
            src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=2000"
            alt="Connect With Us"
            className="w-full h-full object-cover transition-transform duration-200 ease-out"
            style={{ transform: 'scale(1.15)' }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Let's Design Your <br />
              <span className="text-orange-400">Next Adventure.</span>
            </h2>
            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-light">
              Connect with our experts today to start planning your personalized travel experience.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#F48A34] text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-2xl group"
            >
              Connect with Us <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}