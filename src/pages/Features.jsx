import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Star, Heart, Fingerprint, Camera, LayoutGrid, CalendarCheck } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, desc, delay, reversed = false }) => (
  <motion.div 
    initial={{ opacity: 0, x: reversed ? 50 : -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`flex flex-col md:flex-row items-center gap-12 py-24 border-b border-[var(--color-bone)] ${reversed ? 'md:flex-row-reverse' : ''}`}
  >
    <div className="flex-1 w-full">
      <div className="aspect-[16/10] clush-card overflow-hidden bg-[var(--color-tan)] flex items-center justify-center p-12">
        <div className="w-full h-full border border-[var(--color-bone)] rounded-xl flex items-center justify-center bg-white shadow-inner relative group">
           <Icon className="w-24 h-24 text-[var(--color-rose-pale)] group-hover:text-[var(--color-rose)] transition-colors duration-500" strokeWidth={1} />
           <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-rose-pale)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </div>
    <div className="flex-1 flex flex-col items-center md:items-start gap-6 text-center md:text-left text-balance">
      <div className="w-12 h-12 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
        <Icon className="w-6 h-6 text-[var(--color-rose)]" />
      </div>
      <h3 className="font-[Gabarito] text-3xl md:text-4xl font-bold tracking-tight italic">{title}</h3>
      <p className="font-[Figtree] text-lg md:text-xl text-[var(--color-ink-muted)] leading-relaxed">{desc}</p>
      <button className="clush-btn-secondary px-6 py-2 hover:bg-[var(--color-rose-pale)] transition-colors text-sm uppercase tracking-widest font-bold">Details</button>
    </div>
  </motion.div>
);

const Features = () => {
  return (
    <div className="px-6 pb-24">
      <section className="pt-20 pb-32 text-center max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 clush-glass rounded-full border border-[var(--color-bone)] mb-8">
              <Star className="w-4 h-4 text-[var(--color-gold)]" />
              <span className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-black)]">Exclusive Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-[Gabarito] font-bold italic leading-tight mb-8">Crafted for Quality Conversations.</h1>
            <p className="text-lg md:text-xl text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed mb-6">
              We've reimagined dating from the ground up, focusing on intentionality, authenticity, and visual elegance.
            </p>
            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[var(--color-rose)] opacity-60">
               <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
               Early Feature Preview • Conceptual Build Only
            </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto">
        <FeatureItem 
          icon={LayoutGrid} 
          title="Curated Feed" 
          desc="Our algorithm focuses on depth of compatibility, presenting you with a handful of high-quality potential matches rather than an endless stream of profiles."
          delay={0}
        />
        <FeatureItem 
          icon={MessageCircle} 
          title="Conversation First" 
          desc="Beautiful icebreakers and editorialized profile fields take the pressure off. No more generic 'Hey'—start with something real."
          delay={0.2}
          reversed
        />
        <FeatureItem 
          icon={Camera} 
          title="The Gallery" 
          desc="Upload and organize your photos in a stunning, editorial-style layout. Share snapshots of your favorite moments, not just selfies."
          delay={0.4}
        />
        <FeatureItem 
          icon={Fingerprint} 
          title="Verified Community" 
          desc="Strict verification processes ensure every person you meet is genuine. Security is built into the fabric of our experience."
          delay={0.6}
          reversed
        />
        <FeatureItem 
          icon={CalendarCheck} 
          title="Integrated Date Planning" 
          desc="Choose from our handpicked list of intimate venues and unique activities to suggest when you're ready to take it offline."
          delay={0.8}
        />
      </div>

      <section className="mt-20 md:mt-32 max-w-7xl mx-auto bg-[var(--color-tan)] rounded-[32px] md:rounded-[40px] p-8 md:p-24 border border-[var(--color-bone)] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-rose-pale)] blur-[100px] opacity-40 -z-10" />
        <h2 className="text-3xl md:text-6xl font-[Gabarito] font-bold italic mb-16 md:mb-20 relative z-10 leading-tight">Modern elegance,<br className="hidden md:block" /> ancient chemistry.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 relative z-10">
          <div className="flex flex-col items-center gap-4 group p-4 border-b border-[var(--color-bone)] md:border-none pb-12 md:pb-0 last:border-none">
             <div className="text-4xl md:text-5xl font-bold text-[var(--color-rose)] italic transition-transform group-hover:scale-110 duration-500">No</div>
             <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">Ads & Tracking</p>
          </div>
          <div className="flex flex-col items-center gap-4 group p-4 border-b border-[var(--color-bone)] md:border-none pb-12 md:pb-0 last:border-none">
             <div className="text-4xl md:text-5xl font-bold text-[var(--color-gold)] italic transition-transform group-hover:scale-110 duration-500">Invite Only</div>
             <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">Vetted Community</p>
          </div>
          <div className="flex flex-col items-center gap-4 group p-4 border-b border-[var(--color-bone)] md:border-none pb-12 md:pb-0 last:border-none">
             <div className="text-4xl md:text-5xl font-bold text-[var(--color-rose)] italic transition-transform group-hover:scale-110 duration-500">AI</div>
             <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">Moderation Policy</p>
          </div>
          <div className="flex flex-col items-center gap-4 group p-4 last:border-none">
             <div className="text-4xl md:text-5xl font-bold text-[var(--color-ink-black)] italic transition-transform group-hover:scale-110 duration-500">Global Reach</div>
             <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">Local Privacy First</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
