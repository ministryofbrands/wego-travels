import { HeroSlider, SlideData } from '../components/HeroSlider';
import { useTravel } from '../context/TravelContext';
import { Globe, Plane } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const homeSlides: (SlideData & { type: 'Inbound' | 'Outbound' })[] = [
  // Outbound
  {
    id: 'yiwu',
    title: 'Yiwu Market',
    subtitle: 'China',
    type: 'Outbound',
    description: 'Discover the world’s largest wholesale market in Yiwu, China. With thousands of suppliers and endless product varieties, Yiwu International Trade Market is a global hub for sourcing, trading, and business opportunities.',
    image: '/home_images/home_image_01.jpg',
    ctaLink: '/destinations',
    ctaText: 'Explore More'
  }, {
    id: 'thailand',
    title: 'Thailand',
    subtitle: 'Southeast Asia',
    type: 'Outbound',
    description: 'Thailand, the Land of Smiles, is a treasure of culture, cuisine, and natural beauty. From the bustling streets and vibrant night markets of Bangkok to the ornate temples of Chiang Mai, and the stunning beaches and limestone cliffs of Phuket and Krabi, Thailand offers unforgettable experiences for every traveler.',
    image: '/home_images/home_image_02.jpg',
    ctaLink: '/destinations',
    ctaText: 'Explore More'
  }, {
    id: 'dubai',
    title: 'Dubai',
    subtitle: 'United Arab Emirates',
    type: 'Outbound',
    description: 'The city of luxury and innovation. Marvel at the towering Burj Khalifa, explore futuristic architecture, enjoy vibrant nightlife, and experience world-class shopping and entertainment.',
    image: '/home_images/home_image_03.jpg',
    ctaLink: '/destinations',
    ctaText: 'Explore More'
  },
  {
    id: 'maldives',
    title: 'Maldives',
    subtitle: 'Indian Ocean',
    type: 'Outbound',
    description: 'A tropical paradise of white sandy beaches and crystal-clear waters. Relax in overwater bungalows, snorkel among vibrant coral reefs, and soak in the serene island vibes.',
    image: '/home_images/home_image_04.jpg',
    ctaLink: '/destinations',
    ctaText: 'Explore More'
  },
  // Inbound
  {
    id: 'downsouth-home',
    title: 'Downsouth',
    subtitle: 'Sun-Kissed Shores',
    type: 'Inbound',
    description: 'Explore the historic Galle Fort, relax on the pristine beaches of Mirissa, and experience the vibrant coastal life along Sri Lanka\'s legendary southern belt.',
    image: '/home_images/home_image_07.jpg',
    ctaLink: '/destinations',
    ctaText: 'Explore More'
  },
  {
    id: 'ella-home',
    title: 'Ella',
    subtitle: 'The Misty Highlands',
    type: 'Inbound',
    description: 'Experience the misty hills and lush tea plantations of Ella. From the iconic Nine Arch Bridge to the breathtaking views from Little Adam\'s Peak, Ella is a sanctuary for nature lovers.',
    image: '/home_images/home_image_06.jpg',
    ctaLink: '/destinations',
    ctaText: 'Explore More'
  },
  {
    id: 'kandy-home',
    title: 'Kandy',
    subtitle: 'The Sacred City',
    type: 'Inbound',
    description: 'Visit the Temple of the Tooth Relic and experience the rich cultural heritage and serene beauty of Sri Lanka\'s last royal capital nestled among the hills.',
    image: '/home_images/home_image_08.jpg',
    ctaLink: '/destinations',
    ctaText: 'Explore More'
  },
  {
    id: 'colombo-home',
    title: 'Colombo',
    subtitle: 'The Ocean City',
    type: 'Inbound',
    description: 'Discover the blend of modern skylines and colonial charm. From Galle Face Green sunsets to vibrant markets, Colombo is the pulsing heart of the island.',
    image: '/home_images/home_image_05.jpg',
    ctaLink: '/destinations',
    ctaText: 'Explore More'
  }
];

export function Home() {
  const { travelType, setTravelType } = useTravel();

  if (!travelType) return null;
  const [isHovered, setIsHovered] = useState(false);
  const filteredSlides = homeSlides.filter(slide => slide.type === travelType);

  return (
    <div
      className="h-screen w-full relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={() => !isHovered && setIsHovered(true)}
    >
      <HeroSlider key={travelType} slides={filteredSlides} />

      {/* Contextual Travel Switcher - Desktop Only */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hidden lg:block absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
          >
            <div className="bg-black/30 backdrop-blur-xl p-1 rounded-full border border-white/20 shadow-2xl flex items-center">
              <button
                onClick={() => setTravelType('Inbound')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${travelType === 'Inbound'
                  ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] scale-105'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
              >
                <Globe size={12} />
                Sri Lanka
              </button>
              <div className="w-[1px] h-3 bg-white/10 mx-1.5" />
              <button
                onClick={() => setTravelType('Outbound')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${travelType === 'Outbound'
                  ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-105'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
              >
                <Plane size={12} />
                Global
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}