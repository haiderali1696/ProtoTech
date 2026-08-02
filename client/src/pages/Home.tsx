import React from 'react';
import { Hero } from '../components/home/Hero';
import { SectionLines } from '../components/SectionLines';
import { ProductsGrid } from '../components/home/ProductsGrid';
import { ProductsSlider } from '../components/home/TechnologiesSlider';
import { InternshipBanner } from '../components/home/InternshipBanner';
import { TestimonialsGrid } from '../components/home/TestimonialsGrid';
import { HomeCTA } from '../components/home/HomeCTA';
import { EcosystemSection } from '../components/home/EcosystemSection';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <SEO
        title="ProtoTech | Enterprise Software & IT Academy"
        description="ProtoTech specializes in engineering, scaling, and managing resilient technology ecosystems for modern businesses."
      />
      <div>
        <Hero />
      </div>
      
      <SectionLines />
      <div>
        <InternshipBanner />
      </div>

      <SectionLines />
      <div>
        <EcosystemSection />
      </div>
      <SectionLines />
      <div>
        <ProductsGrid />
      </div>
      <SectionLines />
      <div>
        <ProductsSlider />
      </div>
      <SectionLines />
      <div>
        <TestimonialsGrid />
      </div>
      <SectionLines />
      <div>
        <HomeCTA />
      </div>
    </div>
  );
};

export default Home;
