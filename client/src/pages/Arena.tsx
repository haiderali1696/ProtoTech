import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';
import { 
  Gamepad2, 
  Trophy, 
  GraduationCap, 
  Compass, 
  HeartHandshake, 
  CheckCircle2, 
  Send, 
  Check, 
  ArrowRight,
  ChevronRight,
  Mail,
  Phone,
  Clock,
  Sparkles
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { buildHtmlEmail } from '../utils/emailTemplate';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'service_vcwqy4c';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_b9fgl1d';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'uuOM0h7B2N_gtpIhs';

export const Arena: React.FC = () => {
  const [academyTier, setAcademyTier] = useState<'primary' | 'matric' | 'fsc'>('matric');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'ProtoArena Esports',
    institution: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');
    const messageHtml = buildHtmlEmail(
      formData.name,
      formData.email,
      `Arena Program Inquiry: ${formData.program} - ${formData.name}`,
      `
        <strong>Selected Initiative:</strong> ${formData.program}<br/>
        <strong>Institution / School:</strong> ${formData.institution || 'Individual / Parent'}<br/>
        <hr/>
        <strong>Inquiry Details:</strong><br/>
        ${formData.message || 'No additional message.'}
      `,
      formData.phone
    );

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Arena Inquiry: ${formData.program} - ${formData.name}`,
          message_html: messageHtml,
          message: formData.message || 'Arena Program Inquiry',
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );
    } catch (err) {
      console.error('Email sending error:', err);
    }
    setStatus('success');
  };

  const scrollToForm = (programName: string) => {
    setFormData(prev => ({ ...prev, program: programName }));
    document.getElementById('arena-inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-10 md:py-16">
      <SEO 
        title="ProtoArena & Youth Ecosystem | ProtoTech" 
        description="Competitive board esports, youth STEM academy, career trajectory guidance, and psychological student wellness."
      />

      <div className="mx-auto px-10 lg:px-26">

        {/* SECTION 1: HERO & STATS STRIP */}
        <section className="mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="font-label text-accent/50 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              Community & Youth Ecosystem
            </span>

            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6 leading-tight">
              ProtoArena & <span className="text-accent">Youth Innovation</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
              A high-impact platform uniting competitive casual esports, school-level STEM education, tech career advisory, and student psychological wellness.
            </p>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/60">
                <p className="text-2xl font-bold text-deep-navy">4 Wings</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Integrated Initiatives</p>
              </div>
              <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/60">
                <p className="text-2xl font-bold text-primary">100+</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Partner Networks</p>
              </div>
              <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/60">
                <p className="text-2xl font-bold text-deep-navy">4 Games</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Esports Lineup</p>
              </div>
              <div className="p-4 rounded-sm bg-surface-container border border-outline-variant/60">
                <p className="text-2xl font-bold text-primary">3 Tiers</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Youth STEM Path</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: 3-CARD ECOSYSTEM SHOWCASE MATRIX */}
        <section className="mb-20 md:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Card 1: ProtoArena Esports (With Image Frame) */}
            <div className="lg:col-span-7 bg-deep-navy text-white rounded-2xl p-8 sm:p-10 border border-outline-variant/60 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-bright-cyan/15 text-bright-cyan border border-bright-cyan/30 text-xs font-bold uppercase tracking-wider">
                    <Gamepad2 size={16} /> Board & Casual Esports
                  </span>
                  <Trophy className="text-bright-cyan" size={28} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                  <div className="md:col-span-7 space-y-4">
                    <h2 className="font-headline text-3xl font-bold leading-tight">
                      ProtoArena Esports Platform
                    </h2>

                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                      A hybrid mobile app & tournament framework where players book slots to compete in popular casual games for real rewards, rankings, and local championships.
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      {['Speed Chess', 'Ludo Masters', 'Carrom Cup', '8-Ball Pool'].map((g, i) => (
                        <div key={i} className="p-2.5 rounded-sm bg-white/10 border border-white/15 text-center text-white text-[11px]">
                          {g}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Esports High-Res Image Frame */}
                  <div className="md:col-span-5 rounded-xl overflow-hidden border border-white/20 shadow-lg relative h-48 sm:h-52">
                    <img 
                      src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" 
                      alt="Esports Arena Championship" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-transparent to-transparent flex items-end p-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-bright-cyan">Live Tournament Matches</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-8 text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-bright-cyan shrink-0" />
                    <span>Slot reservation system with automated tournament matchings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-bright-cyan shrink-0" />
                    <span>Free tiers & VIP competitive brackets with brand-sponsored prize pools</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/15 flex items-center justify-between gap-4">
                <span className="text-xs text-white/60 font-medium">Seasonal Championships</span>
                <button
                  onClick={() => scrollToForm('ProtoArena Esports')}
                  className="inline-flex items-center gap-2 bg-bright-cyan hover:bg-white text-deep-navy font-bold px-6 py-3 rounded-sm text-xs transition-all shadow-md cursor-pointer"
                >
                  <span>Reserve Slot / Register</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 2: Youth & Kids Academy */}
            <div className="lg:col-span-5 bg-surface-container rounded-2xl p-8 border border-outline-variant/70 shadow-sm flex flex-col justify-between hover:border-primary transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                    <GraduationCap size={24} />
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">3-Tier Curriculum</span>
                </div>

                <span className="font-label text-primary text-xs font-bold tracking-[0.2em] uppercase mb-1 block">
                  School Level STEM Literacy
                </span>
                <h3 className="font-headline text-2xl font-bold text-deep-navy mb-3">
                  Youth & Kids Tech Academy
                </h3>

                {/* Tier Switcher Pills */}
                <div className="flex gap-2 mb-4 p-1 rounded-sm bg-background border border-outline-variant/60 text-xs font-bold">
                  {(['primary', 'matric', 'fsc'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setAcademyTier(t)}
                      className={`flex-1 py-1.5 rounded-sm uppercase tracking-wider transition-all cursor-pointer ${
                        academyTier === t 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Tier Dynamic Details */}
                <div className="p-4 rounded-sm bg-background border border-outline-variant/50 mb-6 text-xs space-y-2">
                  {academyTier === 'primary' && (
                    <>
                      <p className="font-bold text-deep-navy">Class 1–5: ProtoKids Little Bytes</p>
                      <p className="text-muted-foreground">Scratch block coding, computational thinking puzzles, web safety & visual logic.</p>
                    </>
                  )}
                  {academyTier === 'matric' && (
                    <>
                      <p className="font-bold text-deep-navy">Class 6–10: Code Builders</p>
                      <p className="text-muted-foreground">Python fundamentals, HTML/CSS website creation, 3D CAD modeling & Arduino robotics.</p>
                    </>
                  )}
                  {academyTier === 'fsc' && (
                    <>
                      <p className="font-bold text-deep-navy">FSc / Inter: Future Innovators</p>
                      <p className="text-muted-foreground">Flutter mobile app development, AI fundamentals, UI/UX in Figma & freelancing 101.</p>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => scrollToForm('Youth & Kids Academy')}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-foreground border border-primary text-primary-foreground font-semibold px-6 py-3 rounded-sm text-xs transition-all cursor-pointer"
              >
                <span>Enroll Student</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 3: Combined ProtoPath & ProtoMind Advisory (12 Columns) */}
            <div className="lg:col-span-12 bg-surface-container rounded-2xl p-8 sm:p-10 border border-outline-variant/70 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* ProtoPath Side */}
                <div className="space-y-4 pr-0 md:pr-6 border-b md:border-b-0 md:border-r border-outline-variant/60 pb-6 md:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                      <Compass size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider block">Career Guidance</span>
                      <h4 className="font-headline text-xl font-bold text-deep-navy">ProtoPath Skill Advisory</h4>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Helps FSc & college students navigate modern career routes, mapping CS, Data Science, AI, and non-traditional tech entry (UI/UX, Product Management).
                  </p>
                  <button
                    onClick={() => scrollToForm('ProtoPath Career Counselling')}
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-foreground transition-colors cursor-pointer"
                  >
                    <span>Book Career Advisory Session</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* ProtoMind Side */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                      <HeartHandshake size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider block">Student Well-being</span>
                      <h4 className="font-headline text-xl font-bold text-deep-navy">ProtoMind Wellness Wing</h4>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Confidential 1-on-1 consultations with clinical psychologists & campus stress management workshops for students handling academic burnout.
                  </p>
                  <button
                    onClick={() => scrollToForm('ProtoMind Wellness')}
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-foreground transition-colors cursor-pointer"
                  >
                    <span>Request Tele-Session / Workshop</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: VISUAL GALLERY & 2-COLUMN CONTACT / INQUIRY SECTION */}
        <section id="arena-inquiry-form" className="scroll-mt-28 mb-20">
          
          {/* Visual Gallery Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            <div className="rounded-sm overflow-hidden border border-outline-variant/60 shadow-sm h-48 group">
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" 
                alt="Esports Tournament" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="rounded-sm overflow-hidden border border-outline-variant/60 shadow-sm h-48 group">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800" 
                alt="Youth STEM Lab" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="rounded-sm overflow-hidden border border-outline-variant/60 shadow-sm h-48 group">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Career Advisory Session" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="rounded-sm overflow-hidden border border-outline-variant/60 shadow-sm h-48 group">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                alt="Student Wellness Seminar" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>

          {/* 2-Column Split: Image & Contact Info (Left) + Inquiry Form (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Image & Contact Info Card */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-outline-variant/60 bg-deep-navy text-white p-8 flex flex-col justify-between relative shadow-lg min-h-[420px]">
              <div className="absolute inset-0 pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800" 
                  alt="Esports Arena Community" 
                  className="w-full h-full object-cover opacity-25"
                />
              </div>

              <div className="relative z-10 space-y-4">
                <span className="font-label text-bright-cyan uppercase tracking-[0.2em] font-bold text-xs block">
                  Direct Ecosystem Support
                </span>
                <h3 className="font-headline text-3xl font-bold text-white leading-tight">
                  Get In Touch with ProtoTech Team
                </h3>
                <p className="text-white/80 text-xs leading-relaxed">
                  Whether reserving a tournament slot, enrolling a school batch, or requesting career & wellness counseling, our representatives are ready to assist.
                </p>
              </div>

              <div className="relative z-10 space-y-4 pt-8 border-t border-white/15">
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-9 h-9 rounded-sm bg-bright-cyan/15 text-bright-cyan flex items-center justify-center border border-bright-cyan/30">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-white/60 block text-[10px] uppercase font-bold">Email Inquiries</span>
                    <a href="mailto:prototechsolution.pk@gmail.com" className="font-semibold text-white hover:text-bright-cyan transition-colors">
                      prototechsolution.pk@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="w-9 h-9 rounded-sm bg-bright-cyan/15 text-bright-cyan flex items-center justify-center border border-bright-cyan/30">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-white/60 block text-[10px] uppercase font-bold">WhatsApp / Direct Line</span>
                    <a href="tel:+923120516684" className="font-semibold text-white hover:text-bright-cyan transition-colors">
                      +92 312 0516684
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="w-9 h-9 rounded-sm bg-bright-cyan/15 text-bright-cyan flex items-center justify-center border border-bright-cyan/30">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="text-white/60 block text-[10px] uppercase font-bold">Response Guarantee</span>
                    <span className="font-semibold text-white">Within 24 Business Hours</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Inquiry Form Card */}
            <div className="lg:col-span-7 bg-surface-container border border-outline-variant/60 rounded-2xl p-8 sm:p-10 shadow-sm">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-sm bg-green-500/10 text-green-500 flex items-center justify-center mx-auto border border-green-500/20">
                      <Check size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-deep-navy font-headline">Inquiry Received!</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Thank you, <strong>{formData.name}</strong>. Our team will contact you shortly regarding <strong>{formData.program}</strong>.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-8 py-3.5 rounded-sm bg-primary hover:bg-foreground border border-primary text-primary-foreground font-semibold text-xs transition-all hover:scale-105 cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <span className="font-label text-primary uppercase tracking-[0.2em] font-bold text-xs mb-2 block">Program Registration</span>
                      <h3 className="font-headline text-2xl font-bold text-deep-navy">Submit Ecosystem Inquiry</h3>
                      <p className="text-xs text-muted-foreground mt-1">Fill out your details to reserve a slot or join an initiative.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="font-label text-sm text-on-surface-variant ml-1">Full Name <span className="text-red-500 ml-0.5">*</span></label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 outline-none text-sm"
                        />
                        {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="font-label text-sm text-on-surface-variant ml-1">Email Address <span className="text-red-500 ml-0.5">*</span></label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@example.com"
                          className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 outline-none text-sm"
                        />
                        {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="font-label text-sm text-on-surface-variant ml-1">Phone Number <span className="text-red-500 ml-0.5">*</span></label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+92 312 0516684"
                          className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 outline-none text-sm"
                        />
                        {errors.phone && <p className="text-red-400 text-xs ml-1">{errors.phone}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="font-label text-sm text-on-surface-variant ml-1">Select Initiative Wing</label>
                        <select
                          name="program"
                          value={formData.program}
                          onChange={handleChange}
                          className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface outline-none text-sm"
                        >
                          <option value="ProtoArena Esports">ProtoArena Esports (Board & Casual Gaming)</option>
                          <option value="Youth & Kids Academy">Youth & Kids Tech Academy (Primary, Matric, FSc)</option>
                          <option value="ProtoPath Career Counselling">ProtoPath Career & Skill Advisory</option>
                          <option value="ProtoMind Wellness">ProtoMind Psychological & Well-being</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-label text-sm text-on-surface-variant ml-1">School / Organization / University (Optional)</label>
                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        placeholder="e.g. APSACS, NUST, Beaconhouse, Individual"
                        className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 outline-none text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-label text-sm text-on-surface-variant ml-1">Message / Specific Inquiry</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us more about your interest or team participation..."
                        className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 outline-none text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-foreground border border-primary hover:border-foreground transition-all duration-200 text-primary-foreground font-semibold px-10 py-4 rounded-sm text-sm shadow-sm hover:scale-105 cursor-pointer"
                    >
                      {status === 'loading' ? 'Submitting Inquiry...' : <>Submit Program Inquiry <Send size={16} /></>}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};
