import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Quote,
  ArrowRight,
  Award,
  Users,
  X
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

// Fade In Section Component
const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

// --- DATA ---
const EXPERIENCES = [
  // Outbound
  {
    id: 1,
    title: "Serenity in the Backwaters",
    destination: "Kerala, India",
    year: 2023,
    type: "Family",
    travelType: "Outbound",
    story: "Waking up to the gentle lapping of water against our houseboat was a dream. Wego made sure every sunrise was as perfect as the last.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1000",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-floating-on-a-boat-in-the-river-1100-large.mp4",
    highlights: ["Private Houseboat", "Organic Farm Lunch", "Kathakali Performance"]
  },
  {
    id: 2,
    title: "Alpine Adventure",
    destination: "Swiss Alps",
    year: 2023,
    type: "Adventure",
    travelType: "Outbound",
    story: "Scaling the peaks of the Jungfrau region was a life-changing challenge. The expert guides and seamless logistics made it possible.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-snowy-mountain-range-15822-large.mp4",
    highlights: ["Summit Trek", "Luxury Basecamp", "Helicopter Transfer"]
  },
  {
    id: 3,
    title: "Tokyo Neon Dreams",
    destination: "Tokyo, Japan",
    year: 2022,
    type: "Cultural",
    travelType: "Outbound",
    story: "From Tsukiji's morning rush to the quiet shrines of Kyoto, this journey captured the beautiful contrast of Japan.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-tokyo-street-at-night-with-neon-lights-and-people-4436-large.mp4",
    highlights: ["Tea Ceremony", "Private Chef Tour", "Bullet Train Suite"]
  },
  // Inbound (Sri Lanka)
  {
    id: 10,
    title: "Misty Mornings in Ella",
    destination: "Ella, Sri Lanka",
    year: 2024,
    type: "Adventure",
    travelType: "Inbound",
    story: "Walking across the Nine Arch Bridge as the mist rolled in was mystical. Wego's local insights made this more than just a trip—it was a discovery.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1000",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-train-crossing-a-bridge-in-the-mountains-4434-large.mp4",
    highlights: ["Nine Arch Bridge", "Little Adam's Peak", "Tea Factory Tour"]
  },
  {
    id: 11,
    title: "Ancient Echoes",
    destination: "Sigiriya, Sri Lanka",
    year: 2023,
    type: "Cultural",
    travelType: "Inbound",
    story: "The climb to the top of Sigiriya Rock was challenging but the reward was a view that felt like it belonged to another world. Truly a royal experience.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1581347692120-f56f34f64d2d?auto=format&fit=crop&q=80&w=1000",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-large-rock-fortress-15823-large.mp4",
    highlights: ["Lion Rock Ascent", "Mirror Wall", "Royal Gardens"]
  },
  {
    id: 12,
    title: "Coastal Bliss in Galle",
    destination: "Galle, Sri Lanka",
    year: 2023,
    type: "Romantic",
    travelType: "Inbound",
    story: "The colonial charm of Galle Fort mixed with the Indian Ocean breeze created the perfect setting for our anniversary. Unparalleled elegance.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1627664819818-e147d6221422?auto=format&fit=crop&q=80&w=1000",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-waves-crashing-against-a-rocky-shore-1102-large.mp4",
    highlights: ["Fort Sunset Walk", "Luxury Boutique Stay", "Whale Watching"]
  },
  // Rest of Outbound
  {
    id: 4,
    title: "Safari Magic",
    destination: "Maasai Mara, Kenya",
    year: 2023,
    type: "Adventure",
    travelType: "Outbound",
    story: "Witnessing the Great Migration was a powerful reminder of nature’s raw beauty. The camp stay was luxury defined.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1000",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-giraffes-walking-in-the-savanna-at-sunset-24534-large.mp4",
    highlights: ["The Big Five", "Balloon Safari", "Maasai Village Visit"]
  },
  {
    id: 5,
    title: "Mediterranean Bliss",
    destination: "Santorini, Greece",
    year: 2022,
    type: "Romantic",
    travelType: "Outbound",
    story: "Sunsets that linger in your soul. Wego curated a romantic escape that surpassed all our expectations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1000",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-island-of-santorini-in-greece-as-seen-from-the-sea-1200-large.mp4",
    highlights: ["Sunset Yacht Tour", "Cliffside Dining", "Private Infinity Pool"]
  },
  {
    id: 6,
    title: "The Ultimate Nordic Flight",
    destination: "Iceland",
    year: 2023,
    type: "Adventure",
    travelType: "Outbound",
    story: "Chasing the Northern Lights across icy landscapes was surreal. Wego's planning ensured we were always at the right spot.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=1000",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-stunning-northern-lights-over-the-mountains-in-iceland-44585-large.mp4",
    highlights: ["Ice Cave Exploration", "Blue Lagoon VIP", "Glacier Hike"]
  },
  {
    id: 7,
    title: "Vibrant Marrakech",
    destination: "Marrakech, Morocco",
    year: 2023,
    type: "Cultural",
    travelType: "Outbound",
    story: "Lost in the labyrinth of the Medina, we found magic in every corner. The spices, the colors, and the hospitality were unforgettable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1597212618440-806262de4fa6?auto=format&fit=crop&q=80&w=1000",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-narrow-street-of-a-typical-mediterranean-village-4432-large.mp4",
    highlights: ["Medina Tour", "Riad Stay", "Atlas Mountains"]
  },
  {
    id: 8,
    title: "Golden Outback",
    destination: "Uluru, Australia",
    year: 2023,
    type: "Adventure",
    travelType: "Outbound",
    story: "Watching the stars over Uluru was a spiritual experience. The vastness of the outback is something you have to feel to believe.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=1000",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-desert-landscape-at-sunset-24536-large.mp4",
    highlights: ["Star Gazing", "Indigenous Walk", "Helicopter Ride"]
  },
  {
    id: 9,
    title: "Parisian Elegance",
    destination: "Paris, France",
    year: 2022,
    type: "Romantic",
    travelType: "Outbound",
    story: "Midnight strolls along the Seine and private museum tours. Wego turned our anniversary into a masterpiece.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-the-eiffel-tower-in-paris-4438-large.mp4",
    highlights: ["Louvre Private Tour", "River Seine Cruise", "Michelin Dining"]
  }
];

const TESTIMONIALS = [
  {
    name: "Benjamin Graham",
    role: "CEO, TechSphere",
    text: "The business retreat organized by Wego was flawless. Their ability to balance work logistics with premium relaxation is unmatched.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Elena Rodriguez",
    role: "Travel Photographer",
    text: "They don't just find destinations; they find viewpoints. As a photographer, the access they provided was a game-changer.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "The Miller Family",
    role: "Global Explorers",
    text: "Our family holidays used to be stressful. With Wego, they are purely about connection and discovery. Simply the best.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  }
];

export function Experiences() {
  const { travelType } = useTravel();
  const [filter, setFilter] = useState({ destination: 'All', type: 'All', year: 'All' });
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isPaused, setIsPaused] = useState(false);

  // Triple testimonials for seamless loop
  const loopTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  // Background Lock for Modal
  useEffect(() => {
    if (selectedExperience) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedExperience]);

  const containerRef = useRef(null);

  const filteredExperiences = EXPERIENCES.filter(exp => {
    const matchTravelType = exp.travelType === travelType;
    const matchDest = filter.destination === 'All' || exp.destination.includes(filter.destination);
    const matchType = filter.type === 'All' || exp.type === filter.type;
    const matchYear = filter.year === 'All' || exp.year.toString() === filter.year;
    return matchTravelType && matchDest && matchType && matchYear;
  });

  const displayedExperiences = filteredExperiences.slice(0, visibleCount);
  const hasMore = visibleCount < filteredExperiences.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const filteredForOptions = EXPERIENCES.filter(e => e.travelType === travelType);
  const uniqueDestinations = ['All', ...new Set(filteredForOptions.map(e => e.destination.split(', ')[1] || e.destination))];
  const uniqueTypes = ['All', ...new Set(filteredForOptions.map(e => e.type))];
  const uniqueYears = ['All', ...new Set(filteredForOptions.map(e => e.year.toString()))];

  return (
    <div className="bg-white overflow-x-hidden" ref={containerRef}>
      {/* 1. Standardized Hero - Matching About/Services Hero Exactly */}
      <section className="relative h-[85vh] w-full bg-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000"
            alt="Travel Experiences"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-[2px] w-12 bg-orange-500"></div>
              <span className="text-orange-400 font-bold tracking-widest uppercase text-sm md:text-base">Moments That Matter</span>
            </div>
            <h1 className="text-4xl md:text-8xl font-bold text-white leading-tight mb-8">
              Epic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                Experiences.
              </span>
            </h1>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
              Step into the journeys of our global community. Discover raw, authentic stories that define the Wego way of life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Search & Filter Bar - Stable Layout */}
      <section className="bg-white border-b border-gray-100 py-10 relative z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              {/* Destination Filter */}
              <select
                value={filter.destination}
                onChange={(e) => setFilter({ ...filter, destination: e.target.value })}
                className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm font-bold text-blue-900 outline-none hover:bg-white hover:border-[#F48A34] transition-all cursor-pointer"
              >
                <option value="All">All Regions</option>
                {uniqueDestinations.filter(d => d !== 'All').map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={filter.type}
                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm font-bold text-blue-900 outline-none hover:bg-white hover:border-[#F48A34] transition-all cursor-pointer"
              >
                <option value="All">Trip Types</option>
                {uniqueTypes.filter(t => t !== 'All').map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              {/* Year Filter */}
              <select
                value={filter.year}
                onChange={(e) => setFilter({ ...filter, year: e.target.value })}
                className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm font-bold text-blue-900 outline-none hover:bg-white hover:border-[#F48A34] transition-all cursor-pointer"
              >
                <option value="All">Year</option>
                {uniqueYears.filter(y => y !== 'All').map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Travel Diaries Grid - Light Theme Redesign */}
      <section className="relative py-32 overflow-hidden bg-gray-50 antialiased">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="relative mb-24 text-center">
              <span
                className="text-8xl md:text-9xl font-black text-white absolute -top-16 left-1/2 -translate-x-1/2 z-0 select-none hidden lg:block uppercase tracking-[0.2em]"
                style={{ WebkitTextStroke: '2px #e2e8f0', color: 'rgba(241, 245, 249, 0.5)' }}
              >
                EXPERIENCES
              </span>
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                  <span className="text-[#F48A34] font-bold tracking-widest uppercase text-sm">Our Journeys</span>
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-blue-900 leading-tight mx-auto max-w-4xl">
                  Real Stories, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                    Real People.
                  </span>
                </h2>
                <p className="text-xl text-gray-500 mt-8 font-light max-w-2xl mx-auto leading-relaxed">
                  Every passport stamp has a story. Browse our curated collection of adventures told by the people who lived them.
                </p>
              </div>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayedExperiences.map((exp) => (
              <FadeInSection key={exp.id}>
                <div
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100 cursor-pointer"
                  onClick={() => setSelectedExperience(exp)}
                >
                  {/* Card Image Area */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-blue-900 text-xs font-bold rounded-full shadow-lg">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center space-x-4 text-gray-400 text-xs mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#F48A34]" />
                        <span className="font-semibold text-gray-600">{exp.destination}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {exp.title}
                    </h3>

                    <p className="text-gray-500 font-light leading-relaxed mb-8 line-clamp-3">
                      {exp.story}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-900">
                          <Award size={14} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{exp.year} Legacy</span>
                      </div>
                      <span className="text-[#0167B2] group-hover:translate-x-1 transition-transform">
                        <ArrowRight size={20} />
                      </span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          {hasMore && (
            <div className="mt-20 text-center">
              <button
                onClick={handleLoadMore}
                className="px-10 py-4 bg-white border-2 border-blue-900 text-blue-900 rounded-full font-bold hover:bg-blue-900 hover:text-white transition-all transform hover:scale-105 shadow-xl flex items-center gap-3 mx-auto group"
              >
                View More Experiences
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {filteredExperiences.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Users className="w-16 h-16 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-blue-900 mb-2">No experiences found</h3>
              <p className="text-gray-500">Try adjusting your filters to discover more stories.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* 4. Wall of Love (Testimonials) - Light Themed with Blurred Overlays */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=2000"
            alt="Happy Travelers"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 uppercase tracking-tighter">Wall of Love</h2>
            <div className="h-[2px] w-24 bg-[#F48A34] mx-auto opacity-80" />
            <p className="text-gray-500 mt-8 text-xl font-light">The voices that keep our gears turning and spirits high.</p>
          </div>
        </div>

        <div
          className="w-full relative overflow-hidden cursor-grab active:cursor-grabbing pb-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-12"
            animate={!isPaused ? {
              x: ["0%", "-33.333%"],
            } : {}}
            transition={{
              duration: TESTIMONIALS.length * 8,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ display: "flex", width: "max-content" }}
          >
            {loopTestimonials.map((t, i) => (
              <div key={i} className="w-[320px] md:w-[400px] flex-shrink-0">
                <div className="bg-white/70 backdrop-blur-xl border border-gray-100 p-10 rounded-[2.5rem] relative hover:shadow-2xl transition-all group shadow-xl h-full flex flex-col">
                  <Quote className="absolute top-10 right-10 text-blue-900/5 w-20 h-20" />
                  <div className="flex items-center space-x-4 mb-8">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-16 h-16 rounded-full border-2 border-[#F48A34] object-cover flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-blue-900 font-bold text-lg">{t.name}</h4>
                      <p className="text-[#0167B2] text-xs font-semibold tracking-wider uppercase">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed italic font-light flex-grow">
                    "{t.text}"
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mt-24 flex flex-wrap justify-center gap-12 opacity-80 transition-all duration-500">
            <div className="flex items-center space-x-2 text-blue-900 font-bold tracking-tighter text-2xl">
              <Award className="w-8 h-8 text-[#F48A34]" />
              <span>TripAdvisor Excellence</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-900 font-bold tracking-tighter text-2xl">
              <Users className="w-8 h-8 text-[#F48A34]" />
              <span>10k+ Happy Travelers</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Share Your Story CTA - Interactive Parallax */}
      <section
        className="relative h-[65vh] flex items-center justify-center overflow-hidden"
        onMouseMove={(e) => {
          const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
          const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
          const img = document.getElementById('cta-bg-image-experiences');
          if (img) {
            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.15)`;
          }
        }}
      >
        <div className="absolute inset-0 z-0">
          <img
            id="cta-bg-image-experiences"
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000"
            alt="Travel Adventure"
            className="w-full h-full object-cover transition-transform duration-200 ease-out"
            style={{ transform: 'scale(1.15)' }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center px-6">
          <FadeInSection>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Every trip is a <br />
              <span className="text-[#F48A34]">Masterpiece.</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Have an unforgettable journey to share? Join our Wall of Love and inspire the next generation of Wego explorers.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-3 bg-[#F48A34] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-2xl mx-auto group"
            >
              <span>Connect with Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* 6. Experience Detail Modal - Matching Blog Modal Logic */}
      <AnimatePresence>
        {selectedExperience && (
          <div className="fixed inset-0 z-[100] bg-blue-950/60 backdrop-blur-xl flex justify-center">
            <div className="w-full h-full overflow-y-auto no-scrollbar py-6 md:py-12 px-4 text-center">
              <div className="min-h-full flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedExperience(null)}
                  className="absolute inset-0 cursor-pointer"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl transition-all text-left"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedExperience(null)}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white md:text-gray-500 md:bg-gray-100 md:hover:bg-gray-200 transition-all z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="flex flex-col">
                    {/* Modal Header/Image */}
                    <div className="h-[300px] md:h-[450px] relative">
                      <img
                        src={selectedExperience.image}
                        alt={selectedExperience.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <span className="px-4 py-2 bg-[#F48A34] text-white text-xs font-bold rounded-full shadow-lg inline-block mb-4">
                          {selectedExperience.type} Experience
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight">
                          {selectedExperience.title}
                        </h2>
                      </div>
                    </div>

                    {/* Modal Content */}
                    <div className="p-8 md:p-16 bg-white">
                      <div className="flex flex-wrap items-center gap-8 mb-10 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-900">
                            <MapPin size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Destination</p>
                            <p className="text-blue-900 font-bold">{selectedExperience.destination}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-900">
                            <Award size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Legacy</p>
                            <p className="text-blue-900 font-bold">{selectedExperience.year} Edition</p>
                          </div>
                        </div>
                      </div>

                      <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed mb-12 italic text-xl">
                        "{selectedExperience.story}"
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-blue-900 font-black uppercase tracking-[0.1em] text-xs">Unforgettable Highlights</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedExperience.highlights.map((h: string, i: number) => (
                            <div key={i} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group/item hover:border-[#0167B2]/30 transition-colors">
                              <div className="w-2 h-2 rounded-full bg-[#F48A34]" />
                              <span className="text-gray-600 font-medium text-sm">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}