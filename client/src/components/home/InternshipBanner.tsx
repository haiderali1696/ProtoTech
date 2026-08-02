import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Calendar, CreditCard, Award, ArrowRight, Code2, Users, CheckCircle2, Sparkles } from 'lucide-react';

export const InternshipBanner: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-surface-container border-b border-outline-variant/60">
      <div className="mx-auto px-5 sm:px-10 lg:px-26">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text & Details Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> University Student Industry Track
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-deep-navy leading-tight">
              6-Week University <span className="text-accent">Internship Program</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Designed for university students (Semesters 1–8) seeking practical industry experience on live commercial client projects under senior engineering mentorship.
            </p>

            {/* Program Highlights Pill Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-sm bg-background border border-outline-variant/60 flex items-center gap-3">
                <Calendar className="text-primary shrink-0" size={20} />
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Duration</span>
                  <span className="text-xs font-bold text-deep-navy">6 Weeks Hybrid</span>
                </div>
              </div>

              <div className="p-3.5 rounded-sm bg-background border border-outline-variant/60 flex items-center gap-3">
                <GraduationCap className="text-primary shrink-0" size={20} />
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Eligibility</span>
                  <span className="text-xs font-bold text-deep-navy">Semesters 1–8</span>
                </div>
              </div>

              <div className="p-3.5 rounded-sm bg-background border border-outline-variant/60 flex items-center gap-3">
                <CreditCard className="text-primary shrink-0" size={20} />
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Program Fee</span>
                  <span className="text-xs font-bold text-primary">2,000 PKR (One-Time)</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5 pt-2 text-xs sm:text-sm font-medium text-foreground">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-primary shrink-0" />
                <span>Work directly on commercial client codebases & production deployments</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-primary shrink-0" />
                <span>1-on-1 code reviews & system architecture guidance from senior architects</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-primary shrink-0" />
                <span>Earn verified Certificate of Completion & Performance Recommendation Letter</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/internship"
                className="inline-flex items-center gap-3 bg-primary hover:bg-foreground border border-primary hover:border-foreground transition-all duration-200 text-primary-foreground font-semibold px-8 py-3.5 rounded-sm text-sm shadow-sm hover:scale-105"
              >
                <span>Apply for Internship</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/internship"
                className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 transition-all duration-200 text-primary font-semibold px-6 py-3.5 rounded-sm text-sm hover:scale-105"
              >
                <span>View Internship Tracks</span>
              </Link>
            </div>
          </motion.div>

          {/* Right High Quality Image Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="rounded-2xl overflow-hidden border border-outline-variant/70 bg-deep-navy shadow-xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
                alt="University Engineering Interns Pair Programming" 
                className="w-full h-150 sm:h-150 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent flex flex-col justify-end p-6 text-white w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-bright-cyan uppercase tracking-wider block mb-1">Live Engineering Sprints</span>
                    <p className="text-sm font-semibold">Senior Architects Coaching University Interns</p>
                  </div>
                  <Award className="text-bright-cyan shrink-0" size={28} />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
