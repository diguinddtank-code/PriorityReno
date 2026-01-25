import React from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Materials from './components/Materials'; 
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import Transformation from './components/Transformation'; // New Interactive Component
import { Reveal } from './components/Reveal';

function App() {
  return (
    // Increased pb-20 to pb-32 to account for floating nav + margin
    <div className="min-h-screen bg-slate-50 font-sans pb-32 md:pb-0">
      <Navbar />
      <main>
        {/* Hero Section - Removed Reveal for better LCP/SEO performance */}
        <Hero />

        {/* Features/Services Section */}
        <Reveal width="100%">
          <Features />
        </Reveal>

        {/* NEW: Interactive Before/After Section - High Conversion Factor */}
        <Transformation />

        {/* Materials Section */}
        <Reveal width="100%">
          <Materials />
        </Reveal>

        {/* Why Choose Us */}
        <Reveal width="100%">
          <WhyChooseUs />
        </Reveal>

        {/* Testimonials - Moved down slightly to flow after "Why Choose Us" logic */}
        <Reveal width="100%">
          <Testimonials />
        </Reveal>

        {/* Gallery - Removed Reveal wrapper to ensure visibility */}
        <Gallery />
      </main>
      <Footer />
      <MobileNav />
      <FloatingCTA />
    </div>
  );
}

export default App;