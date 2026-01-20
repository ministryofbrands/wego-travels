import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  X,
  Tag,
  BookOpen
} from 'lucide-react';

// Fade In Section Component (Matching About/Services)
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
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Ultimate Guide to Island Hopping in Greece",
    category: "Travel Tips",
    date: "Dec 15, 2023",
    readTime: "8 min read",
    author: "Sarah Jenkins",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Discover the hidden gems of the Cyclades, from the blue-domed churches of Santorini to the pristine beaches of Milos.",
    content: "Greece is a dream for island hoppers. The Aegean Sea is home to thousands of islands, each with its own unique character. In this guide, we'll take you through the perfect itinerary for a 2-week trip through the Cyclades. We'll cover everything from the best ferry routes to the secret tavernas that the locals keep to themselves.\n\nStart your journey in Athens to soak up the history before heading to Mykonos for its vibrant energy. But don't stop there. The real magic happens on islands like Naxos and Amorgos, where life moves at a slower pace and the hospitality is as warm as the Mediterranean sun.",
    tags: ["Greece", "Island Hopping", "Summer 2024"]
  },
  {
    id: 2,
    title: "Sustainable Travel: How to Reduce Your Footprint",
    category: "Eco-Tourism",
    date: "Dec 10, 2023",
    readTime: "6 min read",
    author: "David Chen",
    image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Traveling the world doesn't have to cost the earth. Learn practical steps to become a more conscious explorer.",
    content: "As travel becomes more accessible, the impact on our planet grows. But it's possible to see the world while also protecting it. Sustainable travel is about making small, intentional choices that collective make a big difference.\n\nChoose eco-friendly accommodations that use renewable energy. Support local economies by eating at family-run restaurants and buying handmade crafts. Most importantly, respect the nature and wildlife you encounter. Take only photos, leave only footprints.",
    tags: ["Sustainability", "Eco-Friendly", "Nature"]
  },
  {
    id: 3,
    title: "Exploring the Ancient Wonders of Kyoto",
    category: "Cultural",
    date: "Dec 05, 2023",
    readTime: "10 min read",
    author: "Maki Tanaka",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Kyoto is the heart of traditional Japan. Join us as we explore its zen gardens, golden temples, and geisha districts.",
    content: "To visit Kyoto is to step back in time. With over 1,600 Buddhist temples and 400 Shinto shrines, the city is a living museum of Japanese history. We recommend starting early at Fushimi Inari-taisha to beat the crowds and enjoy the peace of the thousand torii gates.\n\nDon't miss the Gion district in the evening, where you might catch a glimpse of a Geiko or Maiko going to an appointment. Kyoto's cuisine, or Kaiseki, is an art form in itself—every dish is a celebration of the season's finest ingredients.",
    tags: ["Japan", "Kyoto", "Culture"]
  },
  {
    id: 4,
    title: "Luxury Safaris: What to Pack for the Wild",
    category: "Luxury",
    date: "Nov 28, 2023",
    readTime: "5 min read",
    author: "James Wilson",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Going on safari is a once-in-a-lifetime experience. Here's our expert packing list for a comfortable and stylish adventure.",
    content: "When packing for a safari, the key is versatility. You'll need layers for chilly sunrise drives and lightweight, breathable fabrics for the midday sun. Neutral colors like khaki, olive, and tan are best for blending into the environment.\n\nA high-quality pair of binoculars is essential for spotting the Big Five from a distance. And don't forget a wide-brimmed hat and plenty of sunscreen. Your Wego Travels advisor will provide a detailed packing list tailored to your specific destination and season.",
    tags: ["Safari", "Africa", "Packing Tips"]
  },
  {
    id: 5,
    title: "Top 5 Hidden Gems in the Swiss Alps",
    category: "Adventure",
    date: "Nov 20, 2023",
    readTime: "7 min read",
    author: "Elena Schmidt",
    image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Escape the crowds and discover the secret valleys and peaks that most tourists overlook in beautiful Switzerland.",
    content: "While everyone flocks to Zermatt and St. Moritz, there are valleys in Switzerland that remain untouched by mass tourism. The Lauterbrunnen Valley is famous, but have you heard of the Val d'Hérens? Here, the cows have their own festivals and the mountains seem to touch the sky.\n\nFor hikers, the region of Alpstein offers some of the most dramatic views in the country without the long queues for cable cars. Staying in a traditional mountain hut is the best way to experience the true Swiss spirit—fresh milk, local cheese, and a sky full of stars.",
    tags: ["Switzerland", "Hiking", "Alps"]
  },
  {
    id: 6,
    title: "Solo Travel: Finding Yourself on the Road",
    category: "Adventure",
    date: "Nov 12, 2023",
    readTime: "9 min read",
    author: "Anita Ray",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=1000",
    excerpt: "The ultimate guide to solo travel, from safety tips to the best destinations for finding your own rhythm.",
    content: "Solo travel is the ultimate gift you can give yourself. It's a chance to follow your own whims, meet new people, and prove to yourself what you're capable of. The first step is the hardest, but once you're out there, the world opens up in ways you never expected.\n\nCities like Lisbon and Chiang Mai are incredibly welcoming for solo travelers, with thriving community hostels and safe public transport. We'll show you how to navigate the challenges, from dining alone with confidence to staying safe in unfamiliar cities.",
    tags: ["Solo Travel", "Motivation", "Personal Growth"]
  },
  {
    id: 7,
    title: "The Magic of Nordic Winters",
    category: "Travel Tips",
    date: "Nov 05, 2023",
    readTime: "12 min read",
    author: "Erik Jansson",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1000",
    excerpt: "From the aurora borealis to cozy 'hygge' moments, discover why winter is the best time to visit the North.",
    content: "The Nordic countries transform into a winter wonderland during the colder months. While the days are short, the atmosphere is magical. We explore the best spots in Norway and Sweden for catching the Northern Lights, as well as the urban charms of Oslo and Stockholm.\n\nDon't let the cold stop you. With the right gear and a spirit of adventure, Nordic winters offer some of the most serene and beautiful experiences on the planet.",
    tags: ["Norway", "Winter", "Northern Lights"]
  },
  {
    id: 8,
    title: "Street Food Adventures in Bangkok",
    category: "Cultural",
    date: "Oct 28, 2023",
    readTime: "7 min read",
    author: "Somchai S.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1000",
    excerpt: "A culinary journey through the vibrant streets of Bangkok. Where to find the best Pad Thai and Mango Sticky Rice.",
    content: "Bangkok is a city that never stops eating. From the bustling lanes of Chinatown to the modern stalls of Ari, the street food scene is legendary. We've rounded up the must-visit stalls that have stood the test of time.\n\nWhether you're looking for the spiciest Tom Yum or the sweetest mango sticky rice, Bangkok's vendors have you covered. It's not just about the food; it's about the energy of the city that brings these flavors to life.",
    tags: ["Thailand", "Food", "Culture"]
  }
];

const CATEGORIES = ["All", "Travel Tips", "Eco-Tourism", "Cultural", "Luxury", "Adventure"];

export function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Background Lock for Modal
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedBlog]);

  const filteredPosts = BLOG_POSTS.filter(post => {
    return activeCategory === "All" || post.category === activeCategory;
  });

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. Immersive Hero Section - Matching About/Services */}
      <section className="relative h-[85vh] w-full bg-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=2000"
            alt="Travel Blog"
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
              <span className="text-orange-400 font-bold tracking-widest uppercase text-sm md:text-base">Travel Insights</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-8">
              Wego <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                Journals.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed">
              Stories from the road, expert travel advice, and inspiration for your next great adventure.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 min-h-screen relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="text-center mb-24 relative">
              <span
                className="text-8xl md:text-9xl font-black text-white absolute -top-16 left-1/2 -translate-x-1/2 z-0 select-none hidden lg:block uppercase tracking-[0.2em]"
                style={{ WebkitTextStroke: '2px #e2e8f0', color: 'rgba(241, 245, 249, 0.5)' }}
              >
                JOURNALS
              </span>
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                  <span className="text-[#F48A34] font-bold tracking-widest uppercase text-sm">Latest Insights</span>
                  <div className="h-[2px] w-12 bg-[#F48A34]"></div>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-blue-900 leading-tight mx-auto max-w-4xl">
                  From Our <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                    Travel Experts.
                  </span>
                </h2>
                <p className="text-xl text-gray-500 mt-8 font-light max-w-2xl mx-auto leading-relaxed mb-12">
                  Stories from the road, expert travel advice, and inspiration for your next great adventure.
                </p>

                {/* Modern Category Tabs - Matching Destinations Styling */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === cat
                        ? 'bg-blue-900 text-white shadow-xl scale-105'
                        : 'bg-white text-gray-500 hover:text-blue-900 hover:shadow-md border border-gray-100'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayedPosts.map((post) => (
              <FadeInSection key={post.id}>
                <div
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100 cursor-pointer"
                  onClick={() => setSelectedBlog(post)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-blue-900 text-xs font-bold rounded-full shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center space-x-4 text-gray-400 text-xs mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-500 font-light leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-900">
                          <User size={14} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{post.author}</span>
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
                View More Blogs
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-gray-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your filters to discover more stories.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Blog Detail Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] bg-blue-950/60 backdrop-blur-xl flex justify-center">
            <div className="w-full h-full overflow-y-auto no-scrollbar py-6 md:py-12 px-4 text-center">
              <div className="min-h-full flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedBlog(null)}
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
                    onClick={() => setSelectedBlog(null)}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white md:text-gray-500 md:bg-gray-100 md:hover:bg-gray-200 transition-all z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="flex flex-col">
                    {/* Modal Header/Image */}
                    <div className="h-[300px] md:h-[450px] relative">
                      <img
                        src={selectedBlog.image}
                        alt={selectedBlog.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <span className="px-4 py-2 bg-[#F48A34] text-white text-xs font-bold rounded-full shadow-lg inline-block mb-4">
                          {selectedBlog.category}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight">
                          {selectedBlog.title}
                        </h2>
                      </div>
                    </div>

                    {/* Modal Content */}
                    <div className="p-8 md:p-16 bg-white">
                      <div className="flex flex-wrap items-center gap-8 mb-10 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-900">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Author</p>
                            <p className="text-blue-900 font-bold">{selectedBlog.author}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-900">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Published</p>
                            <p className="text-blue-900 font-bold">{selectedBlog.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-900">
                            <Clock size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Reading Time</p>
                            <p className="text-blue-900 font-bold">{selectedBlog.readTime}</p>
                          </div>
                        </div>
                      </div>

                      <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed mb-12">
                        {selectedBlog.content.split('\n\n').map((paragraph: string, i: number) => (
                          <p key={i} className="mb-6">{paragraph}</p>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedBlog.tags.map((tag: string) => (
                          <span key={tag} className="px-4 py-2 bg-gray-50 text-gray-500 rounded-full text-sm flex items-center gap-2">
                            <Tag size={14} /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. CTA Section - Interactive Parallax */}
      <section
        className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden"
        onMouseMove={(e) => {
          const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
          const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
          const img = document.getElementById('blog-cta-bg');
          if (img) {
            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
          }
        }}
      >
        <div className="absolute inset-0 z-0">
          <img
            id="blog-cta-bg"
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000"
            alt="Travel Adventure"
            className="w-full h-full object-cover transition-transform duration-200 ease-out"
            style={{ transform: 'scale(1.1)' }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight">
              Ready to Write Your <br />
              <span className="text-orange-400">Own Story?</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Our travel specialists are ready to turn your inspiration into a customized itinerary. Let's start planning today.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#F48A34] text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-bold text-sm md:text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-2xl group"
            >
              Start Your Journey <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}