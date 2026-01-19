import React from 'react';
import { MapPin, Award, Globe, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView, useSpring, useMotionValue, motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated Counter Component
const StatCounter = ({ value, label }: { value: string, label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const numericPart = parseInt(value.replace(/[^0-9]/g, ''));
      motionValue.set(numericPart);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2 font-mono tracking-tighter">
        {displayValue}{value.replace(/[0-9]/g, '')}
      </div>
      <div className="text-blue-200 font-medium tracking-widest uppercase text-sm">{label}</div>
    </div>
  );
};

// Fade In Section Component
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

export function About() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* Immersive Hero Section - Matching Home Slider Aesthetic */}
      <div className="relative h-[85vh] w-full bg-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000"
            alt="Travel Hero"
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
              <span className="text-orange-400 font-bold tracking-widest uppercase text-sm md:text-base">Since 2012</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-8">
              We Craft <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                Memories.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed">
              More than just a travel agency. We are your architects of adventure, designing journeys that linger in your heart forever.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Modern Split Story Section */}
      <div className="py-32 max-w-7xl mx-auto px-6">
        <FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200"
                  alt="Our Journey"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Element */}
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-2xl shadow-xl z-20 hidden md:block max-w-xs border border-gray-100">
                <p className="text-4xl font-serif text-blue-900 mb-2">"To Travel is to Live"</p>
                <div className="h-1 w-20 bg-[#F48A34] rounded-full"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
                From a Compass <br /> to a <span className="text-orange-500">Community.</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 font-light">
                <p>
                  Wego Travels started with a backpack and a dream. We believe that travel is the only thing you buy that makes you richer. Over the last decade, we've evolved from a small passion project into a global connector of cultures.
                </p>
                <p>
                  We don't just book flights; we curate feelings. The feeling of the sun on your face in Santorini, the smell of street food in Bangkok, the silence of the Alps. That is what we deliver.
                </p>
              </div>
              <div className="pt-4">
                <button className="text-blue-900 font-bold uppercase tracking-widest border-b-2 border-[#F48A34] pb-1">
                  Our Story
                </button>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>

      {/* Dark Stats Banner - Immersive Modern Redesign */}
      <div className="relative py-24 overflow-hidden bg-blue-900">
        {/* Modern Background with Image & Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-60"
            alt="Stats BG"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-x-0 lg:divide-x divide-blue-800/30">
            {[
              { number: "50+", label: "Global Destinations" },
              { number: "10k+", label: "Happy Travelers" },
              { number: "150+", label: "Partner Hotels" },
              { number: "4", label: "Years of Excellence" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-6 rounded-xl lg:rounded-none">
                <StatCounter value={stat.number} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial Mission & Vision */}
      <div className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900">Our Core Philosophy</h2>
              <p className="text-xl text-gray-500 mt-4 font-light">Guiding principles that steer every journey we design.</p>
            </div>
          </FadeInSection>

          <div className="space-y-32">
            {/* Mission Section */}
            <FadeInSection>
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2">
                  <span className="text-9xl font-black text-white drop-shadow-md stroke-text-orange opacity-100 absolute -mt-20 -ml-10 z-0 select-none hidden lg:block" style={{ WebkitTextStroke: '2px #f9bb85', color: 'transparent' }}>01</span>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                      <Award className="text-orange-500" /> Our Mission
                    </h3>
                    <p className="text-2xl text-gray-700 leading-relaxed font-light">
                      To democratize <span className="font-semibold text-blue-900">luxury experiences</span>. We believe premium travel should be personal, accessible, and deeply transformative.
                    </p>
                    <ul className="mt-8 space-y-4">
                      {['Personalized curation', '24/7 Global support', 'Sustainable practices'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-orange-500" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200"
                    alt="Mission"
                    className="rounded-2xl shadow-2xl w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </FadeInSection>

            {/* Vision Section */}
            <FadeInSection>
              <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                <div className="w-full md:w-1/2">
                  <span className="text-9xl font-black text-white drop-shadow-md stroke-text-blue opacity-100 absolute -mt-20 -ml-10 z-0 select-none hidden lg:block" style={{ WebkitTextStroke: '2px #99c5e3', color: 'transparent' }}>02</span>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                      <Globe className="text-blue-500" /> Our Vision
                    </h3>
                    <p className="text-2xl text-gray-700 leading-relaxed font-light">
                      A world connected by <span className="font-semibold text-blue-900">empathy and exploration</span>. We see a future where every journey contributes to a global understanding.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200"
                    alt="Vision"
                    className="rounded-2xl shadow-2xl w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>

      {/* Why Choose Us (Dark Themed Redesign) */}
      <div className="py-32 relative overflow-hidden bg-blue-900 antialiased">
        {/* Modern Background with Image & Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-40"
            alt="Why Choose Us BG"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="relative mb-24 text-center">
              <span
                className="text-8xl md:text-9xl font-black text-white absolute -top-16 left-1/2 -translate-x-1/2 z-0 select-none hidden lg:block uppercase tracking-[0.2em] opacity-20"
                style={{ WebkitTextStroke: '1px #ffffffff', color: 'transparent' }}
              >
                CHOOSE
              </span>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                  <span className="text-orange-400 font-bold tracking-widest uppercase text-sm">Key Benefits</span>
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Redefining the Way You See the World</h2>
                <p className="text-xl text-blue-100/70 font-light max-w-2xl mx-auto leading-relaxed">
                  We go beyond booking to craft experiences that resonate. Here is what sets us apart.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: MapPin, title: 'Local Expertise', desc: 'We have boots on the ground in 50+ countries.' },
                { icon: Clock, title: 'Time Savers', desc: 'We handle the logistics, so you handle the fun.' },
                { icon: Award, title: 'Best Value', desc: 'Premium experiences without the premium price tag.' }
              ].map((item, idx) => (
                <div key={idx} className="p-10 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-[#F48A34]/50 hover:bg-white/10 transition-all duration-500 group">
                  <div className="mb-8 p-4 bg-white/10 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:bg-[#F48A34] transition-colors duration-500">
                    <item.icon className="w-8 h-8 text-orange-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-blue-100/60 leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Strategic Business Units Section */}
      <div className="py-32 relative overflow-hidden bg-gray-50/50 antialiased">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="relative mb-24 text-center">
              <span
                className="text-8xl md:text-9xl font-black text-white absolute -top-16 left-1/2 -translate-x-1/2 z-0 select-none hidden lg:block uppercase tracking-[0.2em]"
                style={{ WebkitTextStroke: '2px #e2e8f0', color: 'rgba(241, 245, 249, 0.5)' }}
              >
                STRATEGIC
              </span>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                  <span className="text-[#F48A34] font-bold tracking-widest uppercase text-sm">Strategic Business Units</span>
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">Our Subsidiaries</h2>
                <p className="text-xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed">
                  Our subsidiaries represent the expanding footprint of our organization, each established to address specific market needs and deliver specialized solutions.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-10">
              {[
                {
                  logo: '/business_logo/unit-2.jpg',
                  title: 'Wego Travels',
                  category: 'Travel Agency',
                  desc: 'A full-service travel agency offering personalized travel experiences, curated tours, and seamless booking solutions that make every journey memorable.'
                },
                {
                  logo: '/business_logo/unit-1.jpg',
                  title: 'Digital Point',
                  category: 'Printing & Marketing',
                  desc: 'Our flagship printing and marketing communications division, delivering premium quality prints and integrated marcom solutions to businesses worldwide.'
                },
                {
                  logo: '/business_logo/unit-3.jpg',
                  title: 'Sithuki Foreign Employment Agency',
                  category: 'Employment Agency',
                  desc: 'Connecting skilled professionals with global employers through seamless recruitment, visa support, and compliance services.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-8 border border-gray-100 rounded-2xl bg-white hover:border-[#F48A34]/50 hover:shadow-xl transition-all duration-500 group flex flex-col h-full w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-27px)] max-w-[400px]">
                  <div className="mb-6 p-2 rounded-2xl w-20 h-20 flex items-center justify-center transition-colors duration-500 overflow-hidden">
                    <img src={item.logo} alt={item.title} className="w-16 h-16 object-contain rounded-xl transition-all duration-500" />
                  </div>
                  <div className="mb-2">
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1 block">{item.category}</span>
                    <h3 className="text-xl font-bold text-blue-900 leading-tight group-hover:text-blue-700 transition-colors uppercase tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed font-light text-sm mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* CTA Section - Interactive Parallax */}
      <div
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        onMouseMove={(e) => {
          const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
          const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
          const img = document.getElementById('cta-bg-image');
          if (img) {
            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
          }
        }}
      >
        <div className="absolute inset-0 z-0">
          <img
            id="cta-bg-image"
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=2000"
            alt="CTA"
            className="w-full h-full object-cover transition-transform duration-200 ease-out"
            style={{ transform: 'scale(1.1)' }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Ready for your next Escape?</h2>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-3 bg-[#F48A34] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-2xl"
          >
            Start Planning <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}