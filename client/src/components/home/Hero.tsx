import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDE_DATA = [
  {
    title: 'Welcome to \nProtoTech',
    highlight: 'Your Trusted IT Partner',
    desc: 'We engineer manage resilient technology ecosystems that empower modern businesses to operate securely and efficiently.',
    img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1200',
    device: 'monitor'
  },
  {
    title: 'Hospital Management System',
    highlight: 'All-in-One Solution',
    desc: 'Seamlessly migrate, optimize, and secure your enterprise operations with our state-of-the-art cloud management solutions.',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    device: 'mobile'
  },
  {
    title: 'Start Learning with Us Today',
    highlight: 'Build Your IT Future',
    desc: 'Harness the power of AI-driven analytics, automation, and intelligent pipelines to unlock new business dimensions today.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    device: 'laptop'
  }
];

const Typewriter = ({ text }: { text: string }) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    setTypedText('');
    let len = 0;
    const t = setInterval(() => {
      if (len < text.length) {
        len++;
        setTypedText(text.substring(0, len));
      } else {
        clearInterval(t);
      }
    }, 45);
    return () => clearInterval(t);
  }, [text]);

  return <>{typedText}</>;
};

const slideVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
};

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDE_DATA.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDE_DATA.length) % SLIDE_DATA.length);
  }, []);

  useEffect(() => {
    const t = setInterval(handleNext, 4500);
    return () => clearInterval(t);
  }, [handleNext]);

  return (
    <section className="relative flex items-center justify-center overflow-hidden w-full bg-background border-b border-border/50 py-3 md:py-4">

      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-sm flex items-center justify-center border border-border bg-card/50 text-primary shadow-sm active:scale-[0.98] hidden md:flex cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-sm flex items-center justify-center border border-border bg-card/50 text-primary shadow-sm active:scale-[0.98] hidden md:flex cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="flex flex-col items-start justify-start w-full">

        <div className="mx-auto px-5 sm:px-10 lg:px-20 relative z-10 w-full py-16 md:py-20">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center justify-center h-full">

            {/* Left: Text Content */}
            <div className="flex flex-col gap-4 lg:gap-6 order-2 lg:order-1 text-center lg:text-start items-center lg:items-start justify-center w-full z-20">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex mx-auto lg:mx-0"
              >
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-semibold tracking-widest uppercase text-primary border border-primary/20 bg-primary/5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-sm bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-sm bg-primary" />
                  </span>
                  Trusted by 100+ enterprises
                </span>
              </motion.div>

              <div className="w-full flex flex-col items-center lg:items-start justify-center lg:justify-start text-center lg:text-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center lg:items-start w-full text-center lg:text-start"
                  >
                    <h1 className="font-sans font-bold leading-[1.1] tracking-tight text-deep-navy text-3xl sm:text-4xl md:text-4xl lg:text-[2.3rem] xl:text-[3rem] 2xl:text-[3.7rem] text-center lg:text-start">
                      <span className="block text-deep-navy whitespace-pre-line text-center lg:text-start">
                        {SLIDE_DATA[currentIndex].title}
                      </span>
                      <span className="block text-bright-cyan pt-2 min-h-[1.2em] drop-shadow-sm text-center lg:text-start">
                        <Typewriter text={SLIDE_DATA[currentIndex].highlight} />
                      </span>
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light max-w-lg mt-3 text-center lg:text-start mx-auto lg:mx-0">
                      {SLIDE_DATA[currentIndex].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full mt-2">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm text-sm font-semibold bg-primary hover:bg-foreground border border-primary hover:border-foreground text-primary-foreground transition-all duration-200 shadow-sm hover:scale-105 group cursor-pointer"
                >
                  Free Consultation
                  <ArrowRight size={16} className="rotate-[-45deg] group-hover:rotate-0 transition-all duration-200" />
                </Link>

                <Link
                  to="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm text-sm font-semibold bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary transition-all duration-200 shadow-sm hover:scale-105 group cursor-pointer"
                >
                  Our Services
                  <ArrowRight size={16} className="rotate-[-45deg] group-hover:rotate-0 transition-all duration-200" />
                </Link>
              </div>
            </div>

            {/* Right: Rounded Image Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative order-1 lg:order-2 flex items-center justify-center w-full mx-auto"
            >
              <div className="relative w-full max-w-xl aspect-[14/10] overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface-container shadow-2xl hover:shadow-glow transition-all duration-500 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={SLIDE_DATA[currentIndex].img}
                    alt={SLIDE_DATA[currentIndex].title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/40 via-transparent to-transparent pointer-events-none rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile dot indicators */}
        <div className="flex justify-center items-center gap-2 pb-6 w-full">
          {SLIDE_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-outline-variant/60 hover:bg-outline-variant'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
