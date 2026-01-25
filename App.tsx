import React from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Materials from './components/Materials'; // New component
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import { Reveal } from './components/Reveal';

function App() {
  return (
    // Increased pb-20 to pb-32 to account for floating nav + margin
    <div className="min-h-screen bg-slate-50 font-sans pb-32 md:pb-0">
      <Navbar />
      <main>
        {/* Hero Section */}
        <Reveal width="100%">
          <Hero />
        </Reveal>

        {/* Features/Services Section */}
        <Reveal width="100%">
          <Features />
        </Reveal>

        {/* Testimonials - Moved Up for Trust Flow */}
        <Reveal width="100%">
          <Testimonials />
        </Reveal>

        {/* New "App-like" Materials Section */}
        <Reveal width="100%">
          <Materials />
        </Reveal>

        {/* Why Choose Us */}
        <Reveal width="100%">
          <WhyChooseUs />
        </Reveal>

        {/* Gallery */}
        <Reveal width="100%">
          <Gallery />
        </Reveal>
      </main>
      <Footer />
      <MobileNav />
      <FloatingCTA />
    </div>
  );
}

export default App;