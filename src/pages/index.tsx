import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import AnnouncementBar from '../../components/AnnouncementBar';

// Dynamic imports for below-the-fold components to reduce initial JS payload
const Testimonials = dynamic(() => import('../../components/Testimonials'), { ssr: true });
const Materials = dynamic(() => import('../../components/Materials'), { ssr: true });
const WhyChooseUs = dynamic(() => import('../../components/WhyChooseUs'), { ssr: true });
const Gallery = dynamic(() => import('../../components/Gallery'), { ssr: true });
const ContactSection = dynamic(() => import('../../components/ContactSection'), { ssr: true });
const Footer = dynamic(() => import('../../components/Footer'), { ssr: true });
const FloatingCTA = dynamic(() => import('../../components/FloatingCTA'), { ssr: false });
const Transformation = dynamic(() => import('../../components/Transformation'), { ssr: true });
const ExitPopup = dynamic(() => import('../../components/ExitPopup'), { ssr: false });
const MobileNav = dynamic(() => import('../../components/MobileNav'), { ssr: false });
const Reveal = dynamic(() => import('../../components/Reveal').then(mod => mod.Reveal), { ssr: true });

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
