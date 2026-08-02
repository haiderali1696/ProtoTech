import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Gamepad2, 
  GraduationCap, 
  Compass, 
  HeartHandshake, 
  ArrowRight, 
  Trophy, 
  Check, 
  Sparkles, 
  BookOpen, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'esports' | 'academy' | 'career' | 'wellness'>('esports');

  return (
    <section className="py-16 md:py-24 bg-background border-b border-outline-variant/60">
      <div className="mx-auto px-5 sm:px-10 lg:px-26">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="font-label text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3 block">
              Community & Youth Initiatives
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary">
              ProtoTech <span className="text-accent">Ecosystem</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-base leading-relaxed">
              Empowering Pakistani youth, competitive gamers, and emerging developers through STEM education, career guidance, and mental wellness.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/arena"
              className="inline-flex items-center gap-3 bg-primary hover:bg-foreground border border-primary hover:border-foreground transition-all duration-200 text-primary-foreground font-semibold px-8 py-3.5 rounded-sm text-sm shadow-sm hover:scale-105"
            >
              <span>Explore All Initiatives</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Asymmetric Bento Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Hero Card: ProtoArena Esports (7 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-deep-navy text-white rounded-2xl p-8 sm:p-10 border border-outline-variant/60 shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-bright-cyan/15 text-bright-cyan border border-bright-cyan/30 text-xs font-bold uppercase tracking-wider">
                  <Gamepad2 size={16} /> Flagship Platform
                </div>
                <Trophy className="text-bright-cyan" size={24} />
              </div>

              <span className="text-xs font-bold text-bright-cyan uppercase tracking-widest block mb-1">
                Board & Casual Esports
              </span>
              <h3 className="font-headline text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                ProtoArena Esports
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-xl">
                Hybrid tournament & slot booking platform where players compete in popular casual games for real rankings, sponsored prize pools, and local championships.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-xs font-bold text-white">
                {['Speed Chess', 'Ludo Masters', 'Carrom Cup', '8-Ball Pool'].map((game, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/10 border border-white/15 text-center">
                    {game}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-white/70">
                Slots System • Free & VIP Brackets • Live Streamed Finals
              </div>
              <Link
                to="/arena#esports"
                className="inline-flex items-center gap-2 bg-bright-cyan text-deep-navy font-bold px-6 py-3 rounded-sm text-xs hover:bg-white transition-all shadow-md"
              >
                <span>Book Slot / View Arena</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Youth & Kids Academy (5 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 bg-surface-container rounded-2xl p-8 border border-outline-variant/70 shadow-sm flex flex-col justify-between hover:border-primary transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
                <GraduationCap size={24} />
              </div>

              <span className="font-label text-accent text-xs font-bold tracking-[0.2em] uppercase mb-1 block">
                Primary, Matric & FSc STEM
              </span>
              <h3 className="font-headline text-2xl font-bold text-deep-navy mb-3">
                Youth & Kids Academy
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-6">
                Practical 3-tier tech literacy path from Scratch block coding to Python, Arduino robotics, and AI mobile app development.
              </p>

              <div className="space-y-2 mb-6 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-background border border-outline-variant/50">
                  <span className="font-bold text-deep-navy">Class 1–5</span>
                  <span className="text-muted-foreground">Little Bytes (Scratch & Logic)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-background border border-outline-variant/50">
                  <span className="font-bold text-deep-navy">Class 6–10</span>
                  <span className="text-muted-foreground">Code Builders (Python & Web)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-background border border-outline-variant/50">
                  <span className="font-bold text-deep-navy">FSc / Inter</span>
                  <span className="text-muted-foreground">Future Innovators (AI & App Dev)</span>
                </div>
              </div>
            </div>

            <Link
              to="/arena#academy"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-foreground transition-colors"
            >
              <span>Explore STEM Tracks</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Card 3: ProtoPath Career Advisory (6 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-6 bg-surface-container rounded-2xl p-8 border border-outline-variant/70 shadow-sm flex flex-col justify-between hover:border-primary transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
                <Compass size={24} />
              </div>

              <span className="font-label text-accent text-xs font-bold tracking-[0.2em] uppercase mb-1 block">
                Skill & Degree Roadmaps
              </span>
              <h3 className="font-headline text-2xl font-bold text-deep-navy mb-3">
                ProtoPath Career Advisory
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-6">
                Specialized advisory mapping CS, Data Science, AI, and non-traditional tech career transitions for school and college students.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-background border border-outline-variant/50">
                  <h4 className="font-bold text-deep-navy text-xs mb-1">Tech Trajectory</h4>
                  <p className="text-[11px] text-muted-foreground">CS, Data Science, AI, Cyber Security</p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-outline-variant/50">
                  <h4 className="font-bold text-deep-navy text-xs mb-1">Non-Tech Entry</h4>
                  <p className="text-[11px] text-muted-foreground">UI/UX, Product & Digital Marketing</p>
                </div>
              </div>
            </div>

            <Link
              to="/arena#career"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-foreground transition-colors"
            >
              <span>Explore Career Guidance</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Card 4: ProtoMind Mental Wellness (6 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="lg:col-span-6 bg-surface-container rounded-2xl p-8 border border-outline-variant/70 shadow-sm flex flex-col justify-between hover:border-primary transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
                <HeartHandshake size={24} />
              </div>

              <span className="font-label text-accent text-xs font-bold tracking-[0.2em] uppercase mb-1 block">
                Psychological & Mental Health
              </span>
              <h3 className="font-headline text-2xl font-bold text-deep-navy mb-3">
                ProtoMind Wellness Wing
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-6">
                Structured mental wellness wing for students and young developers offering confidential tele-sessions and stress management.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-background border border-outline-variant/50">
                  <h4 className="font-bold text-deep-navy text-xs mb-1">Stress Management</h4>
                  <p className="text-[11px] text-muted-foreground">Exam anxiety & career burnout</p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-outline-variant/50">
                  <h4 className="font-bold text-deep-navy text-xs mb-1">Tele-Sessions</h4>
                  <p className="text-[11px] text-muted-foreground">Confidential 1-on-1 clinical psychologists</p>
                </div>
              </div>
            </div>

            <Link
              to="/arena#wellness"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-foreground transition-colors"
            >
              <span>Discover ProtoMind Support</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
