import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import MobileNav from '../../components/MobileNav';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Testimonials from '../../components/Testimonials';
import Materials from '../../components/Materials'; 
import WhyChooseUs from '../../components/WhyChooseUs';
import Gallery from '../../components/Gallery';
import ContactSection from '../../components/ContactSection';
import Footer from '../../components/Footer';
import FloatingCTA from '../../components/FloatingCTA';
import Transformation from '../../components/Transformation';
import ExitPopup from '../../components/ExitPopup';
import { Reveal } from '../../components/Reveal';
import AnnouncementBar from '../../components/AnnouncementBar';

// Main landing page for Priority Renovations
function Home() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  return (
    <div className="relative w-full">
        <div className="min-h-screen bg-slate-50 font-sans pb-32 md:pb-0">
          <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
            {isBannerVisible && <AnnouncementBar onClose={() => setIsBannerVisible(false)} />}
            <Navbar isBannerVisible={isBannerVisible} />
          </div>
          <main className="w-full">
            <Hero />
            <Reveal width="100%">
              <Features />
            </Reveal>
            <Transformation />
            <Reveal width="100%">
              <Testimonials />
            </Reveal>
            <Reveal width="100%">
              <Materials />
            </Reveal>
            <Reveal width="100%">
              <WhyChooseUs />
            </Reveal>
            <Gallery />
            <Reveal width="100%">
              <ContactSection />
            </Reveal>
          </main>
          
          <Footer />
          <MobileNav />
          <FloatingCTA />
          <ExitPopup />
        </div>
    </div>
  );
}

export default Home;
