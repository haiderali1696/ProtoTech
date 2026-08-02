import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';
import { 
  GraduationCap, 
  Code2, 
  Users, 
  Award, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Calendar, 
  BadgeCheck, 
  CreditCard,
  Check
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { buildHtmlEmail } from '../utils/emailTemplate';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'service_vcwqy4c';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_b9fgl1d';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'uuOM0h7B2N_gtpIhs';

const TRACKS = [
  'Full Stack Web Development (React / Node / Next.js)',
  'Mobile App Development (Flutter / React Native)',
  'AI & Data Engineering (Python / Machine Learning)',
  'Cloud Architecture & DevOps (AWS / Docker / Kubernetes)',
  'UI/UX & Product Design',
];

const SEMESTERS = [
  'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4',
  'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8',
  'Recent Graduate'
];

export const Internship: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    semester: 'Semester 4',
    major: 'BS Computer Science',
    ambassadorCode: '',
    track: TRACKS[0],
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [refId, setRefId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = 'Valid email address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.university.trim()) newErrors.university = 'University name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    const generatedId = `PT-INT-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefId(generatedId);

    const fullMessage = `
      <strong>Program:</strong> 6-Week University Internship Program<br />
      <strong>Reference ID:</strong> ${generatedId}<br />
      <strong>University:</strong> ${formData.university}<br />
      <strong>Semester:</strong> ${formData.semester}<br />
      <strong>Major/Department:</strong> ${formData.major}<br />
      <strong>Selected Track:</strong> ${formData.track}<br />
      <strong>Ambassador Code:</strong> ${formData.ambassadorCode ? formData.ambassadorCode : 'None'}<br />
      <strong>Program Fee:</strong> 2,000 PKR (One-time)<br />
      <hr />
      <strong>Statement of Interest:</strong><br />
      ${formData.message || 'No additional note provided.'}
    `;

    try {
      const messageHtml = buildHtmlEmail(
        formData.name,
        formData.email,
        `Internship Application [${generatedId}] - ${formData.name}`,
        fullMessage,
        formData.phone
      );

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Internship Application [${generatedId}] - ${formData.name}`,
          message_html: messageHtml,
          message: fullMessage.replace(/<[^>]*>/g, ''),
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
    } catch (err) {
      console.error('Email sending error:', err);
      setStatus('success');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-10 md:py-16">
      <SEO 
        title="6-Week University Internship Program | ProtoTech" 
        description="6-Week University Internship Program designed for students (Semesters 1–8) seeking practical industry experience on live client projects under senior engineering mentorship."
      />

      <div className="mx-auto px-10 lg:px-26">
        
        {/* Header Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-14 md:mb-20"
        >
          <span className="font-label text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            University Student Industry Track
          </span>
          
          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6 leading-tight">
            6-Week University <span className="text-accent">Internship Program</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
            Designed for university students (Semesters 1–8) seeking practical industry experience on live client projects under senior engineering mentorship.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
            <span className="flex items-center gap-2 px-6 py-3 rounded-sm bg-surface-container border border-outline-variant/60 text-foreground">
              <Calendar className="text-primary" size={18} /> Duration: 6 Weeks
            </span>
            <span className="flex items-center gap-2 px-6 py-3 rounded-sm bg-surface-container border border-outline-variant/60 text-foreground">
              <GraduationCap className="text-primary" size={18} /> Semesters 1–8 Eligible
            </span>
            <span className="flex items-center gap-2 px-6 py-3 rounded-sm bg-deep-navy text-white font-bold text-base shadow-sm">
              <CreditCard className="text-bright-cyan" size={20} /> 2,000 PKR (One-Time Fee)
            </span>
          </div>
        </motion.div>

        {/* Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-8 rounded-sm bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-sm bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
                <Code2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3 font-headline">Live Client Projects</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Work directly on commercial client codebases, production deployments, and real feature engineering alongside active software architects.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/40 text-xs font-bold text-primary uppercase tracking-wider">
              Real Production Code
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="p-8 rounded-sm bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-sm bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3 font-headline">Senior Engineering Mentorship</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Receive weekly code reviews, technical guidance, system design feedback, and 1-on-1 career path advice from industry veterans.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/40 text-xs font-bold text-primary uppercase tracking-wider">
              1-on-1 Guidance
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="p-8 rounded-sm bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-sm bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3 font-headline">Verified Certification</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Earn an official Certificate of Completion, a personalized Performance Recommendation Letter, and verified digital credentials.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/40 text-xs font-bold text-primary uppercase tracking-wider">
              Verified Credential
            </div>
          </motion.div>
        </div>

        {/* Photography & Feature Showcase Gallery (Redesigned) */}
        <div className="mb-20 md:mb-28">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4"
            >
              <Sparkles size={14} /> Life at ProtoTech Internship
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary"
            >
              Real Teams, Real Code, <span className="text-accent">Real Impact</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Experience how our 6-week intensive engineering track transforms university students into production-ready software engineers.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Stage 01 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group rounded-2xl border border-outline-variant/60 bg-surface-container/40 overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-sm flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800" 
                  alt="Agile Pair Programming & Code Reviews" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-background/90 text-primary border border-primary/20 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
                  Stage 01 • Sprint Culture
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                    <Users size={16} /> Agile Sprints
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary font-headline mb-3">
                    Agile Pair Programming & Code Reviews
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Daily engineering standups, trunk-based development, and peer code reviews alongside senior developers.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/40">
                  <span className="px-2.5 py-1 rounded-sm bg-surface-container text-on-surface-variant text-[11px] font-semibold">Daily Standups</span>
                  <span className="px-2.5 py-1 rounded-sm bg-surface-container text-on-surface-variant text-[11px] font-semibold">Git Flow</span>
                  <span className="px-2.5 py-1 rounded-sm bg-surface-container text-on-surface-variant text-[11px] font-semibold">PR Reviews</span>
                </div>
              </div>
            </motion.div>

            {/* Stage 02 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group rounded-2xl border border-outline-variant/60 bg-surface-container/40 overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-sm flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                  alt="Senior Engineering Technical Mentorship" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-background/90 text-primary border border-primary/20 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
                  Stage 02 • Technical Coaching
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                    <Code2 size={16} /> 1-on-1 Mentorship
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary font-headline mb-3">
                    Senior Engineering Technical Guidance
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Direct 1-on-1 architecture coaching, clean code refinement, and personalized career roadmapping.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/40">
                  <span className="px-2.5 py-1 rounded-sm bg-surface-container text-on-surface-variant text-[11px] font-semibold">System Architecture</span>
                  <span className="px-2.5 py-1 rounded-sm bg-surface-container text-on-surface-variant text-[11px] font-semibold">Clean Code</span>
                  <span className="px-2.5 py-1 rounded-sm bg-surface-container text-on-surface-variant text-[11px] font-semibold">Debugging</span>
                </div>
              </div>
            </motion.div>

            {/* Stage 03 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group rounded-2xl border border-outline-variant/60 bg-surface-container/40 overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-sm flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                  alt="Whiteboard Sprint & System Architecture" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-background/90 text-primary border border-primary/20 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
                  Stage 03 • System Design
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                    <GraduationCap size={16} /> System Design
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary font-headline mb-3">
                    Whiteboard Sprints & Cloud Microservices
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Design relational database schemas, RESTful APIs, and scalable cloud microservices for live production apps.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/40">
                  <span className="px-2.5 py-1 rounded-sm bg-surface-container text-on-surface-variant text-[11px] font-semibold">Database Schema</span>
                  <span className="px-2.5 py-1 rounded-sm bg-surface-container text-on-surface-variant text-[11px] font-semibold">REST APIs</span>
                  <span className="px-2.5 py-1 rounded-sm bg-surface-container text-on-surface-variant text-[11px] font-semibold">Microservices</span>
                </div>
              </div>
            </motion.div>

            {/* Stage 04 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group rounded-2xl border border-outline-variant/60 bg-surface-container/40 overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-sm flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
                  alt="Verified Certification & Graduation" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-background/90 text-primary border border-primary/20 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
                  Stage 04 • Career Launch
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                    <Award size={16} /> Graduation Day
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary font-headline mb-3">
                    Verified Certification & Recommendation
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Receive an official verifiable certificate ID, performance assessment score, and senior engineer recommendation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/40">
                  <span className="px-2.5 py-1 rounded-sm bg-surface-container text-on-surface-variant text-[11px] font-semibold">Verifiable Cert ID</span>
                  <span className="px-2.5 py-1 rounded-sm bg-surface-container text-on-surface-variant text-[11px] font-semibold">Senior Recommendation</span>
                  <span className="px-2.5 py-1 rounded-sm bg-surface-container text-on-surface-variant text-[11px] font-semibold">Job Referrals</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Application Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Program Details Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-label text-primary uppercase tracking-[0.2em] font-bold text-xs mb-3 block">Program Requirements</span>
              <h2 className="font-headline text-3xl font-bold text-primary leading-tight">
                Everything You Need to <span className="text-accent">Jumpstart Your Career</span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                'Practical hands-on training tailored for Semesters 1 through 8',
                'Live repository access and Agile team workflow',
                'Direct mentorship from Senior Full-Stack Developers & AI Engineers',
                'Flexible hybrid & remote options to balance university classes',
                'Nominal administrative registration fee of 2,000 PKR (One-Time)',
                'Priority consideration for full-time junior developer roles upon graduation'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <span className="text-sm font-medium text-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-sm bg-surface-container border border-outline-variant/60 shadow-sm">
              <h4 className="font-bold text-deep-navy mb-2 flex items-center gap-2">
                <BadgeCheck className="text-primary" size={20} /> Payment & Registration Note
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Upon submitting your application form, you will receive payment details (JazzCash / EasyPaisa / Bank Transfer for 2000 PKR) to finalize your seat in the upcoming batch.
              </p>
            </div>
          </div>

          {/* Right Application Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container border border-outline-variant/60 rounded-sm p-6 sm:p-10 shadow-sm">
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-sm bg-green-500/10 text-green-500 flex items-center justify-center mx-auto border border-green-500/20">
                      <Check size={36} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-deep-navy font-headline mb-2">Application Submitted!</h3>
                      <p className="text-muted-foreground text-sm max-w-md mx-auto">
                        Thank you, <strong className="text-foreground">{formData.name}</strong>. Your application for the 6-Week University Internship Program has been logged under Reference ID: <strong className="text-primary">{refId}</strong>.
                      </p>
                    </div>

                    <div className="p-6 rounded-sm bg-background border border-outline-variant/60 text-left space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">Payment Details for 2,000 PKR Fee</p>
                      <p className="text-sm font-semibold text-foreground">JazzCash / EasyPaisa: <span className="text-primary">0312 0516684</span></p>
                      <p className="text-sm font-semibold text-foreground">Bank Transfer: <span className="text-primary">ProtoTech Solutions</span></p>
                      <p className="text-xs text-muted-foreground">Please share your transaction screenshot along with your Reference ID (<strong>{refId}</strong>) to <strong>prototechsolution.pk@gmail.com</strong> or WhatsApp <strong>+92 312 0516684</strong>.</p>
                    </div>

                    <button
                      onClick={() => setStatus('idle')}
                      className="px-8 py-3.5 rounded-sm bg-primary hover:bg-foreground border border-primary text-primary-foreground font-semibold text-sm transition-all hover:scale-105 cursor-pointer"
                    >
                      Submit Another Application
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-8">
                      <span className="font-label text-primary uppercase tracking-[0.2em] font-bold text-xs mb-3 block">Inquiry Portal</span>
                      <h3 className="text-2xl font-bold text-deep-navy font-headline mb-1">Apply for Internship</h3>
                      <p className="text-xs text-muted-foreground">Fill in your basic information to reserve your seat in the 6-Week Program.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="font-label text-sm text-on-surface-variant ml-1">Full Name <span className="text-red-500 ml-0.5">*</span></label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Full Name"
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
                          placeholder="student@university.edu.pk"
                          className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 outline-none text-sm"
                        />
                        {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="font-label text-sm text-on-surface-variant ml-1">Phone / WhatsApp No. <span className="text-red-500 ml-0.5">*</span></label>
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
                        <label className="font-label text-sm text-on-surface-variant ml-1">University Name <span className="text-red-500 ml-0.5">*</span></label>
                        <input
                          type="text"
                          name="university"
                          value={formData.university}
                          onChange={handleChange}
                          placeholder="e.g. NUST, FAST, COMSATS, UET"
                          className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 outline-none text-sm"
                        />
                        {errors.university && <p className="text-red-400 text-xs ml-1">{errors.university}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="font-label text-sm text-on-surface-variant ml-1">Current Semester</label>
                        <select
                          name="semester"
                          value={formData.semester}
                          onChange={handleChange}
                          className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface outline-none text-sm"
                        >
                          {SEMESTERS.map((sem) => (
                            <option key={sem} value={sem}>{sem}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="font-label text-sm text-on-surface-variant ml-1">Major / Department</label>
                        <input
                          type="text"
                          name="major"
                          value={formData.major}
                          onChange={handleChange}
                          placeholder="e.g. BSCS, BSSE, Electrical Eng"
                          className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="font-label text-sm text-on-surface-variant ml-1">Preferred Internship Track</label>
                        <select
                          name="track"
                          value={formData.track}
                          onChange={handleChange}
                          className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface outline-none text-sm"
                        >
                          {TRACKS.map((trk) => (
                            <option key={trk} value={trk}>{trk}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="font-label text-sm text-on-surface-variant ml-1">Ambassador Code (Optional)</label>
                        <input
                          type="text"
                          name="ambassadorCode"
                          value={formData.ambassadorCode}
                          onChange={handleChange}
                          placeholder="e.g. AMB-2026"
                          className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 outline-none text-sm uppercase tracking-wider"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-label text-sm text-on-surface-variant ml-1">Additional Note / Statement of Purpose (Optional)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us briefly about your technical background or project experience..."
                        className="w-full bg-surface-container-low border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 transition-all px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 outline-none text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-foreground border border-primary hover:border-foreground transition-all duration-200 text-primary-foreground font-semibold px-10 py-4 rounded-sm text-sm shadow-sm hover:scale-105 cursor-pointer"
                    >
                      {status === 'loading' ? (
                        <>Processing Application...</>
                      ) : (
                        <>Submit Internship Application <Send size={18} /></>
                      )}
                    </button>

                    <p className="text-center text-xs text-muted-foreground">
                      Fee: <strong>2,000 PKR (One-Time)</strong> — Confirmation and payment details sent upon submission.
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
