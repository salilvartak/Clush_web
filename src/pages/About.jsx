import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Sparkles } from 'lucide-react';

import SrujanImg from '../assets/ai-images/srujan.jpg';
import SalilImg from '../assets/ai-images/salil.jpg';
import VisionImg from '../assets/vision.png';
import MissionImg from '../assets/mission.png';

const TeamCard = ({ name, role, bio, img, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
    className="clush-card p-10 bg-[var(--color-tan)] shadow-2xl flex flex-col items-center group relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mb-8 group-hover:scale-110 transition-transform duration-500 bg-slate-100">
       <img src={img} className="w-full h-full object-cover transition-all duration-500" />
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

const ValueSection = ({ icon: Icon, title, desc, delay, reversed = false, img = null }) => (
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
       <p className="text-lg md:text-2xl font-[Figtree] text-[var(--color-ink-muted)] font-light leading-relaxed max-w-xl mx-auto md:mx-0 text-justify">{desc}</p>
    </div>
    {img ? (
      <div className="w-full md:w-[38%] rounded-[40px] overflow-hidden shadow-2xl group flex-shrink-0" style={{ aspectRatio: '4/5' }}>
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
      </div>
    ) : (
      <div className="flex-1 w-full bg-[var(--color-tan)] rounded-[60px] aspect-square flex items-center justify-center p-16 relative overflow-hidden group">
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-white to-transparent opacity-40" />
        <div className="w-full h-full border-2 border-white rounded-[40px] shadow-2xl bg-white/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
           <Icon className="w-32 h-32 text-[var(--color-rose-pale)] group-hover:text-[var(--color-rose)] transition-colors duration-500 stroke-1" />
        </div>
        <div className="absolute top-20 right-20 w-4 h-4 rounded-full bg-[var(--color-gold)] animate-pulse" />
      </div>
    )}
  </motion.div>
);

const About = () => {
  return (
    <div className="px-6 pb-24 relative overflow-hidden bg-[var(--color-cream)]">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 select-none flex items-center justify-center">
         <span className="text-[40vw] md:text-[30vw] font-bold uppercase italic tracking-[-0.05em] leading-none select-none" style={{ color: '#FFFFFF' }}>CLUSH</span>
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
            <h1 className="text-5xl md:text-[100px] font-[Gabarito] font-bold italic leading-[0.9] mb-12 tracking-tight">Crafting the <span className="text-[var(--color-emerald)]">Human</span> connection.</h1>
            <p className="text-lg md:text-2xl text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed max-w-2xl mx-auto italic font-light mb-6">
              A small team of romantics and engineers building the world's most intentional dating experience — launching first in Pune, Maharashtra.
            </p>
        </motion.div>
      </section>

      {/* Values Section - Much better now */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center font-[Figtree] text-[11px] uppercase tracking-[0.3em] font-bold text-[var(--color-ink-muted)] mb-10">Our Core Pillars</h2>
        
        <ValueSection
           icon={Heart}
           title="Our Vision"
           desc="To redefine the standard of modern romance by fostering an environment where deep, deliberate connections thrive. We envision a culture where the search for a partner is treated with the utmost respect, prioritizing quality over volume to build relationships that truly last."
           delay={0.2}
           img={VisionImg}
        />
        <ValueSection
           icon={Target}
           title="Our Mission"
           desc="To provide an exclusive, thoughtfully designed platform that unites individuals through careful curation, shared standards, and absolute privacy. We actively protect our members' time by maintaining a highly vetted community, ensuring that every introduction feels purposeful, dignified, and aligned with what they actually want."
           delay={0.4}
           reversed
           img={MissionImg}
        />
      </div>

      {/* Team Section */}
      <section className="mt-40 md:mt-60 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-20 md:mb-40">
           <h2 className="text-4xl md:text-7xl font-[Gabarito] font-bold italic mb-10">The Minds Behind <span className="text-[var(--color-emerald)]">Clush</span>.</h2>
           <p className="text-lg md:text-xl text-[var(--color-ink-muted)] font-[Figtree] max-w-2xl mx-auto leading-relaxed">
             We're a collective of believers, builders, and dreamers who still believe in the magic of a first meeting.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl mx-auto">
           <TeamCard
             name="Srujan M"
             role="Founder & CEO"
             bio="Passionate about the architecture of trust, Srujan builds the stable, intuitive environment that makes Clush a true sanctuary for its members."
             img={SrujanImg}
             delay={0.2}
           />
           <TeamCard
             name="Salil V"
             role="Founder & CTO"
             bio="Bridging robust code with human-centric design, Salil engineers the invisible, cross-platform layers where authentic connections can safely thrive."
             img={SalilImg}
             delay={0.4}
           />
        </div>
      </section>

      {/* Early Stage Invite */}
      {/*<section className="mt-80 max-w-5xl mx-auto text-center bg-white p-20 md:p-32 rounded-[60px] border border-[var(--color-bone)] shadow-2xl relative overflow-hidden group">
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
      </section>*/}
    </div>
  );
};

export default About;
