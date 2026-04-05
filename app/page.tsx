import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import WhyChooseUs from '../components/WhyChooseUs';
import Gallery from '../components/Gallery';
import Materials from '../components/Materials';
import Transformation from '../components/Transformation';
import FloatingCTA from '../components/FloatingCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Materials />
      <Transformation />
      <Gallery />
      <WhyChooseUs />
      <Testimonials />
      <FloatingCTA />
    </>
  );
}
