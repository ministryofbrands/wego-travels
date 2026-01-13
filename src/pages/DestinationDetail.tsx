import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { HeroSlider, SlideData } from '../components/HeroSlider';
import { Star, Clock, Calendar, ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

// Fade In Section Component
const FadeInSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

interface Activity {
  title: string;
  description: string;
  image: string;
  duration: string;
}

interface Package {
  name: string;
  price: string;
  duration: string;
  description: string;
  includes: string[];
}

interface CountryData {
  heroSlides: SlideData[];
  activities: Activity[];
  packages: Package[];
  backgroundWord: string;
  type: 'Inbound' | 'Outbound';
}

const destinationData: Record<string, CountryData> = {
  bali: {
    type: 'Outbound',
    backgroundWord: 'BALI',
    heroSlides: [
      {
        id: 'bali-1',
        title: 'Bali',
        subtitle: 'Island of Gods',
        description: 'Experience the magic of the Island of the Gods. From ancient temples to pristine beaches, Bali offers a spiritual and visual feast for every traveler.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      },
      {
        id: 'bali-2',
        title: 'Ubud',
        subtitle: 'Cultural Heart',
        description: 'Discover the lush rice terraces, sacred monkey forest, and traditional crafts in the heart of Bali.',
        image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      }
    ],
    activities: [
      {
        title: 'Temple Pilgrimage',
        description: 'Visit iconic temples like Tanah Lot and Uluwatu at sunset for a spiritual experience.',
        image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&q=80&w=1000',
        duration: '7 Hours'
      },
      {
        title: 'Surf the Waves',
        description: 'Catch world-class waves at Canggu or Kuta beaches with professional instructors.',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1000',
        duration: '4 Hours'
      },
      {
        title: 'Yoga Retreat',
        description: 'Find inner peace with a wellness session amidst the tranquil jungles of Ubud.',
        image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=1000',
        duration: '3 Hours'
      }
    ],
    packages: [
      {
        name: 'Essential Bali',
        price: 'From $899',
        duration: '5 Days / 4 Nights',
        description: 'A perfect introduction to Bali\'s highlights, covering beaches, temples, and Ubud.',
        includes: ['4-Star Accommodation', 'Daily Breakfast', 'Airport Transfers', 'Guided Temple Tours']
      },
      {
        name: 'Adventure & Surf',
        price: 'From $1,299',
        duration: '7 Days / 6 Nights',
        description: 'For thrill-seekers looking to master the waves and hike the volcanoes.',
        includes: ['Boutique Surf Camps', 'Surf Equipment', 'Mount Batur Sunrise Hike', 'Water Rafting']
      }
    ]
  },
  thailand: {
    type: 'Outbound',
    backgroundWord: 'THAILAND',
    heroSlides: [
      {
        id: 'thai-1',
        title: 'Thailand',
        subtitle: 'Land of Smiles',
        description: 'Immerse yourself in bustling markets, ornate shrines, and the crystal-clear waters of the Andaman Sea.',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      },
      {
        id: 'thai-2',
        title: 'Phuket',
        subtitle: 'Island Paradise',
        description: 'White sandy beaches, vibrant nightlife, and emerald waters await in Thailand\'s largest island.',
        image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      }
    ],
    activities: [
      {
        title: 'Grand Palace Tour',
        description: 'Marvel at the intricate architecture and sacred spirits of Bangkok\'s most famous landmark.',
        image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&q=80&w=1000',
        duration: '4 Hours'
      },
      {
        title: 'Island Hopping',
        description: 'Sail through Phang Nga Bay and visit the famous Phi Phi Islands by speedboat.',
        image: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&q=80&w=1000',
        duration: '8 Hours'
      },
      {
        title: 'Thai Cooking Class',
        description: 'Learn the secrets of authentic Thai cuisine from local master chefs.',
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=1000',
        duration: '3 Hours'
      }
    ],
    packages: [
      {
        name: 'Thai Highlights',
        price: 'From $749',
        duration: '6 Days / 5 Nights',
        description: 'Best of Bangkok and Phuket, combining city culture with island relaxation.',
        includes: ['Flights (BKK-HKT)', 'Luxury Hotels', 'Street Food Tour', 'Phi Phi Island Trip']
      },
      {
        name: 'Northern Explorer',
        price: 'From $999',
        duration: '8 Days / 7 Nights',
        description: 'Explore the mountains of Chiang Mai and the golden triangle.',
        includes: ['Elephant Sanctuary Visit', 'Jungle Trekking', 'Temple Passes', 'Traditional Dinners']
      }
    ]
  },
  kerala: {
    type: 'Outbound',
    backgroundWord: 'KERALA',
    heroSlides: [
      {
        id: 'kerala-1',
        title: 'Kerala',
        subtitle: 'God\'s Own Country',
        description: "Glide through the tranquil backwaters, explore lush tea plantations, and rejuvenate your soul with Ayurveda.",
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      }
    ],
    activities: [
      {
        title: 'Backwater Cruise',
        description: 'Spend a night on a traditional houseboat cruising through Alleppey\'s palm-fringed canals.',
        image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=1000',
        duration: '24 Hours'
      },
      {
        title: 'Tea Garden Trek',
        description: 'Walk through the rolling hills of Munnar and learn about traditional tea processing.',
        image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9ab3?auto=format&fit=crop&q=80&w=1000',
        duration: '4 Hours'
      }
    ],
    packages: [
      {
        name: 'Mist & Backwaters',
        price: 'From $599',
        duration: '4 Days / 3 Nights',
        description: 'A serene journey through Munnar and Alleppey.',
        includes: ['Hill Station Hotel', 'Deluxe Houseboat', 'All Meals on Boat', 'Sightseeing Transfers']
      }
    ]
  },
  japan: {
    type: 'Outbound',
    backgroundWord: 'JAPAN',
    heroSlides: [
      {
        id: 'japan-1',
        title: 'Kyoto',
        subtitle: 'Timeless Beauty',
        description: 'Where tradition meets modernity. Walk through thousands of vermilion torii gates and witness the timeless beauty of cherry blossoms.',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      }
    ],
    activities: [
      {
        title: 'Tea Ceremony',
        description: 'Experience the mindful art of Japanese tea in a traditional Kyoto machiya.',
        image: 'https://images.unsplash.com/photo-1543097692-fa13c6cd8595?auto=format&fit=crop&q=80&w=1000',
        duration: '2 Hours'
      }
    ],
    packages: [
      {
        name: 'Kyoto Cultural',
        price: 'From $1,299',
        duration: '5 Days / 4 Nights',
        description: 'Immerse yourself in Zen gardens and imperial palaces.',
        includes: ['Ryokan Stay', 'Kaiseki Dinner', 'Private Guide', 'Bullet Train Pass']
      }
    ]
  },
  ella: {
    type: 'Inbound',
    backgroundWord: 'ELLA',
    heroSlides: [
      {
        id: 'ella-1',
        title: 'Ella',
        subtitle: 'The Misty Mountains',
        description: "Experience the breathtaking beauty of Sri Lanka's hill country. A paradise for nature lovers and adventurers alike, where every morning begins with a view of the clouds dancing over the peaks.",
        image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      },
      {
        id: 'ella-2',
        title: 'Nine Arch Bridge',
        subtitle: 'Engineering Marvel',
        description: 'Marvel at the iconic colonial-era railway bridge, an architectural masterpiece tucked away in the lush green jungles of Ella.',
        image: 'https://images.unsplash.com/photo-1581347692120-f56f34f64d2d?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      }
    ],
    activities: [
      {
        title: "Little Adam's Peak Hike",
        description: 'A manageable hike offering panoramic views of the Ella Gap and surrounding tea plantations.',
        image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&q=80&w=1000',
        duration: '2-3 Hours'
      },
      {
        title: 'Nine Arch Bridge Walk',
        description: 'Walk along the historic railway track and witness the train passing over the famous arches.',
        image: 'https://images.unsplash.com/photo-1540206395-6880f94903af?auto=format&fit=crop&q=80&w=1000',
        duration: '2 Hours'
      },
      {
        title: 'Tea Factory Tour',
        description: 'Learn the secrets of Ceylon Tea, from plucking the leaves to the final brewing process.',
        image: 'https://images.unsplash.com/photo-1597484662317-9bd773efdf58?auto=format&fit=crop&q=80&w=1000',
        duration: '2 Hours'
      }
    ],
    packages: [
      {
        name: 'Misty Ella Escape',
        price: 'From RS 45,000',
        duration: '3 Days / 2 Nights',
        description: 'A perfect short getaway to soak in the mountain air and visit the major landmarks.',
        includes: ['Boutique Villa Stay', 'Daily Breakfast', 'Guided Bridge Walk', 'Tuk-Tuk Transfers']
      },
      {
        name: 'Ella Adventure Quest',
        price: 'From RS 75,000',
        duration: '5 Days / 4 Nights',
        description: 'For those who want to explore deeper: including Ella Rock hike and Rawana Falls abseiling.',
        includes: ['Luxury Resorts', 'Mountain Guide', 'Waterfall Tours', 'Village Cooking Experience']
      }
    ]
  },
  sigiriya: {
    type: 'Inbound',
    backgroundWord: 'SIGIRIYA',
    heroSlides: [
      {
        id: 'sigiriya-1',
        title: 'Sigiriya',
        subtitle: 'The Lion Rock',
        description: 'Ascend the ancient rock fortress, a UNESCO World Heritage site and an architectural marvel of the ancient world. Witness the fusion of nature and royalty.',
        image: 'https://images.unsplash.com/photo-1588598116719-c8ad9846a14b?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      },
      {
        id: 'sigiriya-2',
        title: 'Pidurangala',
        subtitle: 'The Best Viewpoint',
        description: 'Climb Pidurangala Rock for the most iconic panoramic view of the Sigiriya fortress at sunrise.',
        image: 'https://images.unsplash.com/photo-1552423714-272fbdc06ff1?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      }
    ],
    activities: [
      {
        title: 'Forthress Climb',
        description: 'Ascend 1200 steps through the Lion Gate to reach the summit of the rock fortress.',
        image: 'https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&q=80&w=1000',
        duration: '3-4 Hours'
      },
      {
        title: 'Minneriya Safari',
        description: 'Witness the great elephant gathering in the nearby Minneriya National Park.',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1000',
        duration: '4 Hours'
      },
      {
        title: 'Village Safari',
        description: 'Experience authentic Sri Lankan rural life with a bullock cart ride and traditional lunch.',
        image: 'https://images.unsplash.com/photo-1580136608079-72029d0de130?auto=format&fit=crop&q=80&w=1000',
        duration: '3 Hours'
      }
    ],
    packages: [
      {
        name: 'Ancient Kingdom Tour',
        price: 'From RS 55,000',
        duration: '2 Days / 1 Night',
        description: 'Explore the majesty of the rock and the surrounding cultural triangle.',
        includes: ['Eco-Resort Stay', 'Rock Entry Fees', 'Traditional Lunch', 'Private Guide']
      },
      {
        name: 'Sigiriya & Wildlife',
        price: 'From RS 85,000',
        duration: '3 Days / 2 Nights',
        description: 'A perfect blend of ancient history and majestic wildlife encounters.',
        includes: ['Luxury Glamping', 'Jeep Safari', 'Rock Climb', 'Airport Transfers']
      }
    ]
  },
  galle: {
    type: 'Inbound',
    backgroundWord: 'GALLE',
    heroSlides: [
      {
        id: 'galle-1',
        title: 'Galle Fort',
        subtitle: 'Colonial Heritage',
        description: 'Step back in time at the Galle Fort, where Dutch colonial architecture meets the vibrant culture of the southern coast. A UNESCO World Heritage site known for its charming streets and sunset vistas.',
        image: 'https://images.unsplash.com/photo-1627664819818-e147d6221422?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      }
    ],
    activities: [
      {
        title: 'Rampart Walk',
        description: 'Walk along the ancient walls of the fort and watch the sunset over the Indian Ocean.',
        image: 'https://images.unsplash.com/photo-1544211152-ed299eaba386?auto=format&fit=crop&q=80&w=1000',
        duration: '2 Hours'
      },
      {
        title: 'Whale Watching',
        description: 'Embark on a boat trip from nearby Mirissa to witness the majestic Blue Whales.',
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1000',
        duration: '5 Hours'
      }
    ],
    packages: [
      {
        name: 'Southern Charm',
        price: 'From RS 40,000',
        duration: '2 Days / 1 Night',
        description: 'Experience the romantic and historic atmosphere of the Fort and nearby beaches.',
        includes: ['Heritage Hotel Stay', 'Fort Walking Tour', 'Seafood Dinner', 'Breakfast']
      }
    ]
  },
  kandy: {
    type: 'Inbound',
    backgroundWord: 'KANDY',
    heroSlides: [
      {
        id: 'kandy-1',
        title: 'Kandy',
        subtitle: 'The Sacred City',
        description: "The spiritual heart of Sri Lanka, home to the sacred Temple of the Tooth. Explore the lush gardens and rich traditions of the island's last royal capital.",
        image: 'https://images.unsplash.com/photo-1555541624-954f9a7732d2?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      }
    ],
    activities: [
      {
        title: 'Temple Visit',
        description: 'Explore the Temple of the Sacred Tooth Relic and witness the traditional evening rituals.',
        image: 'https://images.unsplash.com/photo-1588613401502-c9497e289899?auto=format&fit=crop&q=80&w=1000',
        duration: '2 Hours'
      },
      {
        title: 'Botanical Gardens',
        description: 'Walk through the Royal Botanical Gardens of Peradeniya, home to thousands of plant species.',
        image: 'https://images.unsplash.com/photo-1560242374-f239088fd463?auto=format&fit=crop&q=80&w=1000',
        duration: '3 Hours'
      }
    ],
    packages: [
      {
        name: 'Cultural Capital Escape',
        price: 'From RS 35,000',
        duration: '2 Days / 1 Night',
        description: 'A deep dive into the heritage and spirituality of Kandy.',
        includes: ['Boutique Resort', 'Temple Tickets', 'Cultural Dance Show', 'City Tour']
      }
    ]
  },
  mirissa: {
    type: 'Inbound',
    backgroundWord: 'MIRISSA',
    heroSlides: [
      {
        id: 'mirissa-1',
        title: 'Mirissa',
        subtitle: 'The Golden Coast',
        description: 'Bask in the sun at Mirissa, one of the most beautiful beaches in Sri Lanka. Famous for its crescent-shaped bay, vibrant surf culture, and the chance to see the majestic giants of the ocean.',
        image: 'https://images.unsplash.com/photo-1579294246064-f63ec25ba5c4?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      }
    ],
    activities: [
      {
        title: 'Whale Watching',
        description: 'Set sail in the early morning to spot Blue Whales and playful dolphins in their natural habitat.',
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1000',
        duration: '4-5 Hours'
      },
      {
        title: 'Coconut Tree Hill',
        description: 'Visit the most photographed spot in Mirissa for stunning views of the ocean and sunset.',
        image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&q=80&w=1000',
        duration: '1 Hour'
      }
    ],
    packages: [
      {
        name: 'Tropical Bliss',
        price: 'From RS 30,000',
        duration: '2 Days / 1 Night',
        description: 'Perfect for beach lovers and ocean enthusiasts.',
        includes: ['Beachfront Resort', 'Whale Watching Tour', 'Surf Lesson', 'Seafood BBQ']
      }
    ]
  },
  'nuwara-eliya': {
    type: 'Inbound',
    backgroundWord: 'NUWARA ELIYA',
    heroSlides: [
      {
        id: 'ne-1',
        title: 'Nuwara Eliya',
        subtitle: 'Little England',
        description: 'Tucked away in the cool highlands, Nuwara Eliya is a colonial-era retreat surrounded by emerald green tea estates and cascading waterfalls.',
        image: 'https://images.unsplash.com/photo-1560242374-f239088fd463?auto=format&fit=crop&q=80&w=2000',
        ctaText: 'View Packages',
        ctaLink: '#packages-section'
      }
    ],
    activities: [
      {
        title: 'Gregory Lake',
        description: 'Enjoy a peaceful boat ride or a pony ride along the shores of the beautiful Gregory Lake.',
        image: 'https://images.unsplash.com/photo-1549643276-fdf2fab574f5?auto=format&fit=crop&q=80&w=1000',
        duration: '2 Hours'
      },
      {
        title: 'Horton Plains',
        description: "Hike through the Horton Plains National Park to witness the dramatic 880m drop at World's End.",
        image: 'https://images.unsplash.com/photo-1517203649514-6014ca925b6a?auto=format&fit=crop&q=80&w=1000',
        duration: '5-6 Hours'
      }
    ],
    packages: [
      {
        name: 'Highland Retreat',
        price: 'From RS 38,000',
        duration: '2 Days / 1 Night',
        description: 'Experience the cool climate and colonial charm of the hills.',
        includes: ['Colonial Hotel Stay', 'Tea Estate Tour', 'Lake Boat Ride', 'Breakfast']
      }
    ]
  }
};

const defaultData: CountryData = {
  type: 'Outbound',
  backgroundWord: 'EXPLORE',
  heroSlides: [
    {
      id: 'explore-1',
      title: 'Discover More',
      subtitle: 'Global Destinations',
      description: 'Uncover the hidden gems and local secrets of this amazing location.',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000',
      ctaText: 'Contact Us'
    }
  ],
  activities: [],
  packages: []
};

export function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const { travelType } = useTravel();
  const navigate = useNavigate();

  const data = id && destinationData[id] ? destinationData[id] : defaultData;
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (id && destinationData[id] && destinationData[id].type !== travelType) {
      navigate('/destinations');
    }
  }, [id, travelType, navigate]);

  // Triple activities for seamless loop
  const loopActivities = [...data.activities, ...data.activities, ...data.activities];

  return (
    <div className="bg-white">
      {/* 1. Immersive Hero Slider */}
      <div className="h-screen w-full relative">
        <HeroSlider
          slides={data.heroSlides}
          topContent={
            <Link
              to="/destinations"
              className="inline-flex items-center space-x-3 text-white/70 hover:text-white transition-all group mb-2"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all">
                <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Explore All</span>
            </Link>
          }
        />
      </div>

      {/* 2. Activities Section */}
      {data.activities.length > 0 && (
        <section className="py-32 bg-white relative overflow-hidden">


          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <FadeInSection>
              <div className="relative mb-24 text-center">
                <span
                  className="text-8xl md:text-9xl font-black text-white absolute -top-16 left-1/2 -translate-x-1/2 z-0 select-none hidden lg:block uppercase tracking-[0.2em]"
                  style={{ WebkitTextStroke: '2px #e2e8f0', color: 'rgba(241, 245, 249, 0.5)' }}
                >
                  ACTIVITIES
                </span>
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <div className="h-[2px] w-12 bg-orange-500"></div>
                    <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">Top Experiences</span>
                    <div className="h-[2px] w-12 bg-orange-500"></div>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-blue-900 mb-8 leading-tight">
                    Things to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                      Do.
                    </span>
                  </h2>
                  <p className="text-xl text-gray-500 font-light max-w-3xl mx-auto">
                    From adventurous treks to tranquil moments, discover the best activities this country has to offer.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>

          <div
            className="w-full relative overflow-hidden pb-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex gap-8 px-6"
              animate={!isPaused ? {
                x: ["0%", "-33.333%"],
              } : {}}
              transition={{
                duration: data.activities.length * 10,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{ width: "max-content" }}
            >
              {loopActivities.map((activity, idx) => (
                <div key={idx} className="w-[300px] md:w-[400px] flex-shrink-0">
                  <div className="group">
                    <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100/50">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="flex items-center space-x-2 text-orange-400 mb-4">
                          <Clock size={18} />
                          <span className="text-sm font-bold uppercase tracking-widest">{activity.duration}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{activity.title}</h3>
                        <p className="text-gray-200 text-base font-light leading-relaxed opacity-90">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. Packages Section */}
      {data.packages.length > 0 && (
        <section id="packages-section" className="py-32 bg-gray-50 relative overflow-hidden">

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <FadeInSection>
              <div className="relative mb-24 text-center">
                <span
                  className="text-8xl md:text-9xl font-black text-white absolute -top-16 left-1/2 -translate-x-1/2 z-0 select-none hidden lg:block uppercase tracking-[0.2em]"
                  style={{ WebkitTextStroke: '2px #e2e8f0', color: 'rgba(241, 245, 249, 0.5)' }}
                >
                  PACKAGES
                </span>
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <div className="h-[2px] w-12 bg-blue-900"></div>
                    <span className="text-blue-900 font-bold tracking-widest uppercase text-sm">Featured Offers</span>
                    <div className="h-[2px] w-12 bg-blue-900"></div>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-blue-900 mb-8 leading-tight">
                    Travel <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                      Packages.
                    </span>
                  </h2>
                  <p className="text-xl text-gray-500 font-light max-w-3xl mx-auto">
                    Curated itineraries designed to give you the most unforgettable experience.
                  </p>
                </div>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {data.packages.map((pkg, idx) => (
                <FadeInSection key={idx} className="h-full">
                  <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
                    <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-orange-50 -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 rounded-full group-hover:scale-[10] transition-transform duration-700 pointer-events-none opacity-50" />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex flex-col lg:flex-row justify-between items-start mb-6 md:mb-8 gap-4 sm:gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 text-orange-500 mb-2">
                            <Calendar size={16} className="md:w-[18px] md:h-[18px]" />
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{pkg.duration}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl font-bold text-blue-900 leading-tight">{pkg.name}</h3>
                        </div>
                        <div className="text-left lg:text-right shrink-0">
                          <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 leading-none mb-1">
                            {pkg.price}
                          </p>
                          <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">Fixed Price</p>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base md:text-base lg:text-xl text-gray-500 font-light mb-6 md:mb-8 leading-relaxed line-clamp-3 lg:line-clamp-none">
                        {pkg.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
                        {pkg.includes.map((include, i) => (
                          <div key={i} className="flex items-center space-x-2 sm:space-x-3">
                            <CheckCircle2 className="text-orange-500 w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 font-medium">{include}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <Link to="/contact">
                          <button className="w-full bg-[#0167B2] text-white font-bold py-4 md:py-5 rounded-xl sm:rounded-2xl md:rounded-3xl hover:bg-orange-600 transition-all flex items-center justify-center gap-3 text-sm sm:text-base md:text-lg">
                            Book This Package
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Bottom CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <FadeInSection>
            <div className="mb-12 inline-block">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Star className="text-orange-500 w-12 h-12" />
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-blue-900 mb-8 leading-tight">
                Ready for your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  {data.backgroundWord}
                </span> Adventure?
              </h2>
              <p className="text-lg md:text-2xl text-gray-500 font-light max-w-2xl mx-auto mb-12">
                Our travel consultants are ready to customize this journey exactly how you imagined it.
              </p>
              <Link to="/contact">
                <button className="px-10 py-4 sm:px-12 sm:py-5 md:px-16 md:py-6 bg-[#F48A34] text-white font-black rounded-full hover:bg-blue-900 transition-all transform hover:scale-110 shadow-2xl text-base sm:text-lg md:text-xl uppercase tracking-widest">
                  Let's Get Started
                </button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}