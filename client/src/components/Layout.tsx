import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Globe, Linkedin, Mail, Twitter, Github, Menu, X, Moon, Sun, ChevronDown, ArrowRight, Phone } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Logo } from './Logo';
import { courseCategories } from '../data/courses';
import { categories as productCategories } from '../data/product';

export const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [coursesMegaOpen, setCoursesMegaOpen] = useState(false);
  const coursesMegaRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMenuOpen(false);
    setCoursesMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!coursesMegaOpen) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const el = coursesMegaRef.current;
      if (el && !el.contains(e.target as Node)) setCoursesMegaOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCoursesMegaOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [coursesMegaOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses', isMegaMenu: true },
    { name: 'Products', path: '/products' },
    { name: 'Internship', path: '/internship' },
    { name: 'Arena', path: '/arena' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="relative w-full z-50 bg-background border-b border-outline-variant/50">
      <div className="mx-auto px-5 sm:px-10 lg:px-10 py-3 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Logo className="w-16 h-16 object-contain" />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex gap-6 items-center">
            {navLinks.map((link) => (
              link.isMegaMenu ? (
                <div key={link.name} ref={coursesMegaRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={coursesMegaOpen}
                    aria-haspopup="true"
                    aria-controls="courses-mega-menu"
                    id="courses-mega-trigger"
                    onClick={() => setCoursesMegaOpen((o) => !o)}
                    className={cn(
                      "flex items-center gap-1 text-[15px] font-semibold transition-colors duration-200 rounded-sm px-1 -mx-1 py-1 cursor-pointer",
                      location.pathname.startsWith(link.path)
                        ? "text-primary"
                        : "text-on-surface-variant hover:text-on-surface",
                      coursesMegaOpen && "text-on-surface"
                    )}
                  >
                    {link.name}
                    <ChevronDown
                      size={16}
                      className={cn(
                        'transition-transform duration-300 text-on-surface-variant',
                        coursesMegaOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* Mega Menu Dropdown (click to open) */}
                  <div
                    id="courses-mega-menu"
                    role="region"
                    aria-labelledby="courses-mega-trigger"
                    className={cn(
                      'absolute top-full -left-[10vw] xl:-left-24 pt-4 w-[900px] max-w-[95vw] z-[60] transition-opacity duration-200 ease-out',
                      coursesMegaOpen
                        ? 'visible opacity-100 pointer-events-auto'
                        : 'invisible opacity-0 pointer-events-none'
                    )}
                  >
                    <div className="bg-background rounded-sm border border-outline-variant shadow-2xl p-8 isolate overflow-hidden">
                      <div className="absolute inset-0 bg-surface-container/30 -z-10" />
                      <div className="grid grid-cols-4 gap-x-8 gap-y-8">
                        {courseCategories.map((category) => {
                          const shortTitle = category.title.replace(/ Courses| Development/g, '');
                          return (
                            <div key={category.id} className="flex flex-col">
                              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant/30">
                                <span className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center text-primary">
                                  <div className="w-2 h-2 rounded-sm bg-primary" />
                                </span>
                                <h4 className="font-semibold text-on-surface text-sm">{shortTitle}</h4>
                              </div>
                              <ul className="space-y-2 flex-grow">
                                {category.courses.slice(0, 3).map(course => (
                                  <li key={course.id}>
                                    <Link 
                                      to={`/courses/${course.id}`} 
                                      onClick={() => setCoursesMegaOpen(false)}
                                      className="group/item flex items-center py-1.5 px-3 -mx-3 rounded-sm hover:bg-surface-container transition-colors"
                                    >
                                      <span className="text-sm font-medium text-on-surface-variant group-hover/item:text-primary transition-colors line-clamp-1">{course.name}</span>
                                    </Link>
                                  </li>
                                ))}
                                {category.courses.length > 3 && (
                                  <li className="pt-2 mt-2">
                                    <Link 
                                      to="/courses" 
                                      onClick={() => setCoursesMegaOpen(false)}
                                      className="w-full inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                                    >
                                      View all {shortTitle} <ArrowRight size={14} />
                                    </Link>
                                  </li>
                                )}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-[15px] font-semibold transition-colors duration-200",
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="hidden lg:flex gap-4 items-center">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-sm flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            to="/contact"
            className="bg-primary text-primary-foreground font-semibold text-[15px] px-8 py-2.5 rounded-sm transition-all duration-200 hover:scale-105 hover:bg-foreground ml-2"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-sm flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            className="w-10 h-10 rounded-sm flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors border border-outline-variant/40 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer & Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] lg:hidden"
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-xs sm:max-w-sm bg-background border-l border-outline-variant/60 shadow-2xl z-[100] flex flex-col justify-between overflow-hidden lg:hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex items-center justify-between bg-surface-container/30">
                <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                  <Logo className="w-10 h-10 object-contain" />
                  <span className="font-headline font-bold text-lg text-primary">ProtoTech</span>
                </Link>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-sm flex items-center justify-center text-on-surface-variant hover:bg-surface-container border border-outline-variant/40 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Navigation Links Scroll Area */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3">
                {navLinks.map((link) => (
                  link.isMegaMenu ? (
                    <div key={link.name} className="flex flex-col border-b border-outline-variant/20 pb-3">
                      <button
                        onClick={() => setActiveSubmenu(activeSubmenu === link.name ? null : link.name)}
                        className={cn(
                          "flex items-center justify-between w-full py-2 text-base font-semibold transition-colors font-headline cursor-pointer",
                          location.pathname.startsWith(link.path)
                            ? "text-primary"
                            : "text-on-surface hover:text-primary"
                        )}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          size={18}
                          className={cn(
                            "transition-transform duration-300 text-on-surface-variant",
                            activeSubmenu === link.name && "rotate-180 text-primary"
                          )}
                        />
                      </button>

                      {/* Courses Accordion / Dropdown */}
                      <AnimatePresence>
                        {activeSubmenu === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pl-3 pt-3 pb-2 space-y-4 border-l-2 border-primary/30 ml-2 mt-1">
                              <Link
                                to="/courses"
                                onClick={() => setMenuOpen(false)}
                                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline mb-1"
                              >
                                Explore All Programs <ArrowRight size={13} />
                              </Link>

                              {courseCategories.map((category) => (
                                <div key={category.id} className="space-y-1.5">
                                  <h4 className="font-headline font-bold text-xs uppercase tracking-wider text-primary/80">
                                    {category.title}
                                  </h4>
                                  <ul className="space-y-1 pl-2">
                                    {category.courses.map((course) => (
                                      <li key={course.id}>
                                        <Link
                                          to={`/courses/${course.id}`}
                                          onClick={() => setMenuOpen(false)}
                                          className="text-xs font-medium text-muted-foreground hover:text-primary block py-1 transition-colors line-clamp-1"
                                        >
                                          {course.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div key={link.name} className="border-b border-outline-variant/20 pb-3">
                      <Link
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "block py-2 text-base font-semibold transition-colors font-headline",
                          location.pathname === link.path
                            ? "text-primary font-bold"
                            : "text-on-surface hover:text-primary"
                        )}
                      >
                        {link.name}
                      </Link>
                    </div>
                  )
                ))}
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-5 border-t border-outline-variant/40 bg-surface-container/30 space-y-3">
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm py-3 rounded-sm transition-all duration-200 shadow-sm hover:scale-105"
                >
                  Contact Us
                  <ArrowRight size={16} />
                </Link>
                <div className="text-center text-[11px] text-muted-foreground font-label">
                  © ProtoTech IT Solutions & Academy
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  const topProducts = productCategories.flatMap(c => c.products).slice(0, 4);
  const topCourses = courseCategories.flatMap(c => c.courses).slice(0, 4);

  const footerLinks = {
    Company: [
      { name: 'Home', to: '/' },
      { name: 'About Us', to: '/about' },
      { name: 'Services', to: '/products' },
      { name: 'Internship Program', to: '/internship' },
      { name: 'ProtoArena & Ecosystem', to: '/arena' },
      { name: 'Contact Us', to: '/contact' },
    ],
    Products: topProducts.map(p => ({
      name: p.name,
      to: `/products/${p.id}`
    })),
    Courses: topCourses.map(c => ({
      name: c.name,
      to: `/courses/${c.id}`
    })),
    Legal: [
      { name: 'Privacy Policy', to: '/legal#privacy' },
      { name: 'Terms of Service', to: '/legal#terms' },
      { name: 'Cookie Policy', to: '/legal#cookies' },
    ],
  };

  return (
    <footer className="w-full py-16 border-t border-outline-variant bg-surface-container-low">
      <div className="mx-auto px-4 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="text-xl font-bold text-primary mb-4 font-headline tracking-tighter"><Logo className='h-20 w-20 object-contain' /></div>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              Architecting digital futures through premium IT services and elite engineering education.
            </p>
            <div className="flex flex-col gap-3 mb-6 text-sm text-on-surface-variant">
              <a href="mailto:prototechsolution.pk@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={16} /> prototechsolution.pk@gmail.com
              </a>
              <a href="tel:+923120516684" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={16} /> +92 312 0516684
              </a>
            </div>
            <div className="flex gap-3">
              <a href="#" aria-label="Website" className="w-9 h-9 rounded-sm bg-white/5 flex items-center justify-center hover:text-primary hover:bg-white/10 transition-all">
                <Globe size={16} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-sm bg-white/5 flex items-center justify-center hover:text-primary hover:bg-white/10 transition-all">
                <Linkedin size={16} />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-sm bg-white/5 flex items-center justify-center hover:text-primary hover:bg-white/10 transition-all">
                <Twitter size={16} />
              </a>
              <a href="mailto:prototechsolution.pk@gmail.com" aria-label="Email" className="w-9 h-9 rounded-sm bg-white/5 flex items-center justify-center hover:text-primary hover:bg-white/10 transition-all">
                <Mail size={16} />
              </a>
              <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-sm bg-white/5 flex items-center justify-center hover:text-primary hover:bg-white/10 transition-all">
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h5 className="text-deep-navy font-bold mb-5 font-headline text-sm uppercase tracking-widest">{heading}</h5>
              <ul className="space-y-3 text-sm">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-on-surface-variant hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 text-on-surface-variant text-sm">
          <p>© {new Date().getFullYear()} ProtoTech IT Solutions & Academy. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-green-400 animate-pulse"></span>
              System Status: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};



