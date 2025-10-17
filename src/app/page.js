import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import About from '@/components/About';
import WhatWeDo from '@/components/WhatWeDo';
import Committee from '@/components/Committee';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Banner />
        <About />
        <WhatWeDo />
        <Committee />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
