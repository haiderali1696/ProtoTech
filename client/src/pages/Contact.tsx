import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ContactHero } from '../components/contact/ContactHero';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactVisual } from '../components/contact/ContactVisual';
import SEO from '../components/SEO';

const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact-form') {
      setTimeout(() => {
        const element = document.getElementById('contact-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="relative overflow-hidden">
      <SEO 
        title="Get in Touch | ProtoTech"
        description="Have a question or looking for a custom IT solution? Contact ProtoTech today and let's engineer your digital future."
      />
      {/* ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[140px] rounded-sm pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-sm pointer-events-none" />

      <ContactHero />
      <ContactInfo />

      {/* —— Form + Visual —— */}
      <section id="contact-form" className="mx-auto px-10 xl:px-26 mb-32 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-label text-primary uppercase tracking-[0.3em] font-bold text-xs mb-3 block">
            Inquiry Portal
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-15 text-primary">
            Tell us about your <span className="text-accent">visionary project.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <ContactForm />
          <ContactVisual />
        </div>
      </section>
    </div>
  );
};

export default Contact;



