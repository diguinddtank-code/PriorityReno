import React from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Materials from './components/Materials'; 
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import Transformation from './components/Transformation';
import { Reveal } from './components/Reveal';

function App() {
  return (
    // Simplified wrapper to allow native scroll behavior
    <div className="relative w-full">
        {/* Increased pb-20 to pb-32 to account for floating nav + margin */}
        <div className="min-h-screen bg-slate-50 font-sans pb-32 md:pb-0">
          <Navbar />
          <main className="w-full">
            {/* Hero Section */}
            <Hero />

            {/* Features/Services Section */}
            <Reveal width="100%">
              <Features />
            </Reveal>

            {/* 1. Interactive Before/After Section (Visual Proof) */}
            <Transformation />

            {/* 2. Testimonials (Social Proof) */}
            <Reveal width="100%">
              <Testimonials />
            </Reveal>

            {/* Materials Section */}
            <Reveal width="100%">
              <Materials />
            </Reveal>

            {/* Why Choose Us */}
            <Reveal width="100%">
              <WhyChooseUs />
            </Reveal>

            {/* Gallery */}
            <Gallery />

            {/* Contact Form & Map (Moved here for high contrast) */}
            <Reveal width="100%">
              <ContactSection />
            </Reveal>
          </main>
          
          <Footer />
          <MobileNav />
          <FloatingCTA />
        </div>
    </div>
  );
}

export default App;