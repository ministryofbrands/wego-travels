import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Destinations } from './pages/Destinations';
import { DestinationDetail } from './pages/DestinationDetail';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Experiences } from './pages/Experiences';
import { Blogs } from './pages/Blogs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { ScrollToTopOnNav } from './components/ScrollToTopOnNav';
import { TravelProvider, useTravel } from './context/TravelContext';
import { WelcomeSplash } from './components/WelcomeSplash';
import { AnimatePresence } from 'framer-motion';

import { useState } from 'react';

function AppContent() {
  const { travelType } = useTravel();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  return (
    <Router>
      <ScrollToTopOnNav />
      <AnimatePresence mode="wait">
        {(isInitialLoading || !travelType) && (
          <WelcomeSplash
            key="splash"
            showSelection={!travelType}
            onComplete={() => setIsInitialLoading(false)}
          />
        )}
      </AnimatePresence>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export function App() {
  return (
    <TravelProvider>
      <AppContent />
    </TravelProvider>
  );
}