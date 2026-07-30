'use client';

import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <SplashScreen />

      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
