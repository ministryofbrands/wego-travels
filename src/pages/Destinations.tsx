import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Globe, Plane } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useTravel } from '../context/TravelContext';

const categories = ['All', 'Business tour', 'Group tour', 'Family tour', 'Honeymoon tour', 'Solo tour'];

const destinations = [
  // Inbound (Sri Lanka)
  {
    id: 'ella',
    name: 'Ella',
    country: 'Sri Lanka',
    category: 'Solo tour',
    type: 'Inbound',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    country: 'Sri Lanka',
    category: 'Family tour',
    type: 'Inbound',
    image: 'https://images.unsplash.com/photo-1588598116719-c8ad9846a14b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'galle',
    name: 'Galle Fort',
    country: 'Sri Lanka',
    category: 'Honeymoon tour',
    type: 'Inbound',
    image: 'https://images.unsplash.com/photo-1627664819818-e147d6221422?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'kandy',
    name: 'Kandy',
    country: 'Sri Lanka',
    category: 'Group tour',
    type: 'Inbound',
    image: 'https://images.unsplash.com/photo-1555541624-954f9a7732d2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    country: 'Sri Lanka',
    category: 'Honeymoon tour',
    type: 'Inbound',
    image: 'https://images.unsplash.com/photo-1579294246064-f63ec25ba5c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    country: 'Sri Lanka',
    category: 'Family tour',
    type: 'Inbound',
    image: 'https://images.unsplash.com/photo-1560242374-f239088fd463?auto=format&fit=crop&q=80&w=800'
  },

  // Outbound (International)
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    category: 'Honeymoon tour',
    type: 'Outbound',
    image: '/destination_video/video_01.mp4'
  }, {
    id: 'thailand',
    name: 'Phuket',
    country: 'Thailand',
    category: 'Family tour',
    type: 'Outbound',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800'
  }, {
    id: 'kerala',
    name: 'Alleppey',
    country: 'India',
    category: 'Group tour',
    type: 'Outbound',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800'
  }, {
    id: 'japan',
    name: 'Kyoto',
    country: 'Japan',
    category: 'Solo tour',
    type: 'Outbound',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800'
  }, {
    id: 'italy',
    name: 'Amalfi Coast',
    country: 'Italy',
    category: 'Honeymoon tour',
    type: 'Outbound',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800'
  }, {
    id: 'maldives',
    name: 'Malé Atoll',
    country: 'Maldives',
    category: 'Honeymoon tour',
    type: 'Outbound',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800'
  }, {
    id: 'switzerland',
    name: 'Interlaken',
    country: 'Switzerland',
    category: 'Business tour',
    type: 'Outbound',
    image: 'https://images.unsplash.com/photo-1517203649514-6014ca925b6a?auto=format&fit=crop&q=80&w=800'
  }, {
    id: 'france',
    name: 'Paris',
    country: 'France',
    category: 'Solo tour',
    type: 'Outbound',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800'
  }, {
    id: 'egypt',
    name: 'Cairo',
    country: 'Egypt',
    category: 'Group tour',
    type: 'Outbound',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=800'
  }
];

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

export function Destinations() {
  const { travelType, setTravelType } = useTravel();
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSeeMore = () => {
    setVisibleCount(destinations.length);
  };

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    return dest.type === travelType && matchesCategory;
  });

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Immersive Hero Section - Matching Home Slider Aesthetic */}
      <div className="relative h-[85vh] w-full bg-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=2000"
            alt="Destinations Hero"
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
              <span className="text-orange-400 font-bold tracking-widest uppercase text-sm md:text-base">Explore the World</span>
            </div>
            <h1 className="text-4xl md:text-8xl font-bold text-white leading-tight mb-8">
              Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                Destinations.
              </span>
            </h1>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
              From tropical paradises to historic cities, discover the perfect getaway for your next adventure.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. Destinations Grid */}
      <section className="py-24 bg-gray-50 min-h-[60vh] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="relative mb-8 text-center">
              <span
                className="text-8xl md:text-9xl font-black text-white absolute -top-16 left-1/2 -translate-x-1/2 z-0 select-none hidden lg:block uppercase tracking-[0.2em]"
                style={{ WebkitTextStroke: '2px #e2e8f0', color: 'rgba(241, 245, 249, 0.5)' }}
              >
                EXPLORE
              </span>
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                  <span className="text-[#F48A34] font-bold tracking-widest uppercase text-sm">Curated Collection</span>
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                </div>
                <h2 className="text-3xl md:text-6xl font-bold text-blue-900 leading-tight mx-auto max-w-4xl">
                  Discover Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                    Next Journey.
                  </span>
                </h2>

                {/* Travel Type Switcher - Desktop Only */}
                <div className="hidden lg:flex justify-center mt-10 mb-10">
                  <div className="inline-flex bg-white p-1 rounded-full border border-gray-100 shadow-xl">
                    <button
                      onClick={() => setTravelType('Inbound')}
                      className={`flex items-center gap-2.5 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${travelType === 'Inbound'
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50'
                        }`}
                    >
                      <Globe size={14} />
                      Sri Lanka
                    </button>
                    <button
                      onClick={() => setTravelType('Outbound')}
                      className={`flex items-center gap-2.5 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${travelType === 'Outbound'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                    >
                      <Plane size={14} />
                      Global
                    </button>
                  </div>
                </div>

                <p className="text-lg md:text-xl text-gray-500 lg:mt-0 font-light max-w-2xl mx-auto leading-relaxed mb-12">
                  From tropical paradises to historic cities, discover the perfect getaway for your next adventure.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Modern Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${selectedCategory === cat
                  ? 'bg-blue-900 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-500 hover:text-blue-900 hover:shadow-md border border-gray-100'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredDestinations.slice(0, visibleCount).map((dest) => (
              <FadeInSection key={dest.id}>
                <Link to={`/destination/${dest.id}`} className="group block">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full transform hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      {dest.image.endsWith('.mp4') ? (
                        <video
                          src={dest.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                    </div>

                    <div className="p-7 flex flex-col flex-grow">
                      <div className="flex items-center text-orange-500 text-sm font-bold uppercase tracking-widest mb-2">
                        <MapPin size={16} className="mr-2" />
                        {dest.country}
                      </div>

                      <h3 className="text-3xl font-bold text-blue-900 mb-4 group-hover:text-orange-500 transition-colors">
                        {dest.name}
                      </h3>

                      <div className="mt-auto pt-4 border-t border-gray-200 flex items-center text-[#0167B2] font-bold group-hover:translate-x-1 transition-transform">
                        Explore Destination <ArrowRight size={20} className="ml-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>

          {visibleCount < filteredDestinations.length && (
            <div className="mt-20 text-center">
              <button
                onClick={handleSeeMore}
                className="inline-flex items-center gap-3 bg-white text-blue-900 border-2 border-blue-900 px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-blue-900 hover:text-white transition-all transform hover:scale-105 shadow-lg group"
              >
                See More Destinations <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Interactive Parallax (Matching About.tsx) */}
      <div
        className="relative h-[65vh] flex items-center justify-center overflow-hidden"
        onMouseMove={(e) => {
          const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
          const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
          const img = document.getElementById('cta-bg-image-destinations');
          if (img) {
            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.15)`;
          }
        }}
      >
        <div className="absolute inset-0 z-0">
          <img
            id="cta-bg-image-destinations"
            src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=2000"
            alt="CTA"
            className="w-full h-full object-cover transition-transform duration-200 ease-out"
            style={{ transform: 'scale(1.15)' }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Ready for your next Escape?</h2>
            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-light">
              Found your dream destination? Let our luxury travel specialists handle the details and craft a bespoke itinerary tailored uniquely to you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#F48A34] text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-2xl group"
            >
              Plan My Destination <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}