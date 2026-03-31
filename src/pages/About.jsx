import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Sparkles, MapPin, Coffee, Users, ExternalLink } from 'lucide-react';

import ElenaImg from '../assets/ai-images/elena.png';
import MarcusImg from '../assets/ai-images/marcus.png';
import DavidImg from '../assets/ai-images/david.png';

const TeamCard = ({ name, role, bio, img, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
    className="clush-card p-10 bg-white shadow-2xl flex flex-col items-center group relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mb-10 group-hover:scale-110 transition-transform duration-500 bg-slate-100">
       <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
    </div>
    <div className="text-center space-y-4">
       <h3 className="text-3xl font-[Gabarito] font-bold italic">{name}</h3>
       <p className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-rose)]">{role}</p>
       <p className="font-[Figtree] text-sm text-[var(--color-ink-muted)] leading-relaxed">{bio}</p>
    </div>
    <div className="mt-10 flex gap-6 text-[var(--color-bone)] group-hover:text-[var(--color-rose)] transition-colors">
       {/* Social links placeholder */}
    </div>
  </motion.div>
);

const ValueSection = ({ icon: Icon, title, desc, delay, reversed = false }) => (
  <motion.div 
    initial={{ opacity: 0, x: reversed ? 50 : -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 py-20 md:py-32 border-b border-[var(--color-bone)] relative z-10 ${reversed ? 'md:flex-row-reverse text-center md:text-left' : 'text-center md:text-left'}`}
  >
    <div className="flex-1 space-y-6 md:space-y-10">
       <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[var(--color-rose-pale)] flex items-center justify-center -rotate-6 shadow-xl shadow-rose/5 ${reversed ? 'md:ml-auto mx-auto' : 'mx-auto md:ml-0'}`}>
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-rose)]" />
       </div>
       <h3 className="text-4xl md:text-6xl font-[Gabarito] font-bold italic tracking-tight">{title}</h3>
       <p className="text-lg md:text-2xl font-[Figtree] text-[var(--color-ink-muted)] font-light leading-relaxed max-w-xl mx-auto md:mx-0">{desc}</p>
    </div>
    <div className="flex-1 w-full bg-[var(--color-tan)] rounded-[60px] aspect-square flex items-center justify-center p-16 relative overflow-hidden group">
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-white to-transparent opacity-40" />
        <div className="w-full h-full border-2 border-white rounded-[40px] shadow-2xl bg-white/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
           <Icon className="w-32 h-32 text-[var(--color-rose-pale)] group-hover:text-[var(--color-rose)] transition-colors duration-500 stroke-1" />
        </div>
        <div className="absolute top-20 right-20 w-4 h-4 rounded-full bg-[var(--color-gold)] animate-pulse" />
    </div>
  </motion.div>
);

const About = () => {
  return (
    <div className="px-6 pb-24 relative overflow-hidden bg-[var(--color-cream)]">
      {/* Background Decorative Element */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 select-none flex items-center justify-center">
         <span className="text-[40vw] md:text-[30vw] font-bold text-white uppercase italic tracking-[-0.05em] leading-none select-none">CLUSH</span>
      </div>

      <section className="relative pt-32 pb-40 text-center max-w-4xl mx-auto z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2 }}
        >
            <div className="inline-flex items-center gap-3 px-5 py-2 clush-glass rounded-full border border-[var(--color-bone)] mb-10 shadow-sm">
              <Sparkles className="w-4 h-4 text-[var(--color-rose)]" />
              <span className="font-[Figtree] text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-ink-black)]">Our Origin Story</span>
            </div>
            <h1 className="text-5xl md:text-[100px] font-[Gabarito] font-bold italic leading-[0.9] mb-12 tracking-tight">Crafting the <span className="text-[var(--color-rose)]">Human</span> connection.</h1>
            <p className="text-lg md:text-2xl text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed max-w-2xl mx-auto italic font-light mb-6">
              Founded in Mayfair, 2026. A small team of romantics and engineers building the world's most intentional dating experience.
            </p>
            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[var(--color-rose)] opacity-60">
               <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
               Initial Project Phase • Concept Still In Refinement
            </div>
        </motion.div>
      </section>

      {/* Values Section - Much better now */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center font-[Figtree] text-[11px] uppercase tracking-[0.3em] font-bold text-[var(--color-ink-muted)] mb-10">Our Core Pillars</h2>
        
        <ValueSection 
           icon={Heart} 
           title="Intentionality" 
           desc="We believe in the power of 'slower' dating. Clush is designed to prioritize depth over volume, encouraging members to engage authentically." 
           delay={0.2}
        />
        <ValueSection 
           icon={Target} 
           title="Aesthetic Precision" 
           desc="Beauty is not just surface level. Our platform's elegance reflects our respect for your time, your style, and your journey." 
           delay={0.4}
           reversed
        />
        <ValueSection 
           icon={Users} 
           title="Curated Trust" 
           desc="We're in the early stages, hand-selecting our community members to ensure a space filled with respectful, compatible human beings." 
           delay={0.6}
        />
      </div>

      {/* Team Section */}
      <section className="mt-40 md:mt-60 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-20 md:mb-40">
           <h2 className="text-4xl md:text-7xl font-[Gabarito] font-bold italic mb-10">The Minds Behind <span className="text-[var(--color-rose)]">Clush</span>.</h2>
           <p className="text-lg md:text-xl text-[var(--color-ink-muted)] font-[Figtree] max-w-2xl mx-auto leading-relaxed">
             We're a collective of believers, builders, and dreamers who still believe in the magic of a first meeting.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
           <TeamCard 
             name="Sebastian" 
             role="Founder & Vision" 
             bio="Former gallery curator with a passion for human-centric architecture and intentional lifestyle design."
             img={MarcusImg}
             delay={0.2}
           />
           <TeamCard 
             name="Aria" 
             role="Product Experience" 
             bio="Psychologist turned designer, Aria focuses on creating environments where vulnerability feels safe and rewarded."
             img={ElenaImg}
             delay={0.4}
           />
           <TeamCard 
             name="Julian" 
             role="Engineering Director" 
             bio="Building the invisible layers of trust and privacy that allow Clush to remain a sanctuary for its members."
             img={DavidImg}
             delay={0.6}
           />
        </div>
      </section>

      {/* Early Stage Invite */}
      <section className="mt-80 max-w-5xl mx-auto text-center bg-white p-20 md:p-32 rounded-[60px] border border-[var(--color-bone)] shadow-2xl relative overflow-hidden group">
         <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-gold)]/10 rounded-full blur-[100px] group-hover:bg-[var(--color-gold)]/20 transition-all duration-1000" />
         <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[var(--color-rose-pale)] rounded-full blur-[100px] opacity-60" />
         
         <div className="relative z-10">
            <Coffee className="w-16 h-16 text-[var(--color-rose)] mx-auto mb-10" />
            <h2 className="text-4xl md:text-6xl font-[Gabarito] font-bold italic mb-10">Want to join the team?</h2>
            <p className="text-xl text-[var(--color-ink-muted)] font-[Figtree] max-w-2xl mx-auto leading-relaxed mb-16">
              As we build Clush in these early, exciting stages, we're always looking for fellow romantics who happen to be world-class designers or engineers.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
               <button className="flex items-center gap-3 font-bold group border-b-2 border-transparent hover:border-[var(--color-rose)] transition-all py-2">
                  View open roles <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
