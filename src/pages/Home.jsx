import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Sparkles, Coffee, MessageCircle, ShieldCheck, MapPin, Target, ArrowRight, Quote } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import ElenaImg from '../assets/ai-images/elena.png';
import MarcusImg from '../assets/ai-images/marcus.png';
import ChloeImg from '../assets/ai-images/chloe.png';
import DavidImg from '../assets/ai-images/david.png';
import CoupleImg from '../assets/ai-images/couple.png';

const IMAGES = {
  hero1: ChloeImg,
  profile1: ElenaImg,
  profile2: MarcusImg,
  profile3: DavidImg,
  coupleDate: CoupleImg
};

const HeroCard = ({ img, name, age, delay, rotate, x, y, size = 'large' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: y + 80, x: x - 20, rotate: rotate - 10 }}
    animate={{ opacity: 1, scale: 1, y, x, rotate }}
    transition={{ 
      delay, 
      duration: 1.8, 
      ease: [0.22, 1, 0.36, 1] 
    }}
    whileHover={{ 
      scale: 1.02, 
      rotate: 0, 
      zIndex: 50,
      y: y - 10,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }}
    className={`absolute clush-hero-card overflow-hidden ${size === 'large' ? 'w-64 h-80 md:w-80 md:h-96' : 'w-52 h-64'} origin-center shadow-2xl cursor-pointer`}
  >
    <img src={img} alt={name} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500" />
    <div className="absolute inset-0 clush-image-overlay flex flex-col justify-end p-6">
      <div className="flex items-center gap-2">
        <h3 className="font-[Gabarito] font-bold text-white text-2xl">{name}, {age}</h3>
        {size === 'large' && <Star className="w-5 h-5 fill-[var(--color-gold)] text-[var(--color-gold)]" />}
      </div>
      {size === 'large' && <p className="font-[Figtree] text-white/80 text-sm mt-1">Recently active in Mayfair</p>}
    </div>
  </motion.div>
);

const SectionHeading = ({ children, color = "muted" }) => (
  <div className="flex items-center mb-6">
    <div className="clush-accent-line"></div>
    <h2 className={`font-[Figtree] text-[11px] uppercase tracking-[0.2em] font-bold ${color === "muted" ? "text-[var(--color-ink-muted)]" : "text-[var(--color-ink-black)]"}`}>
      {children}
    </h2>
  </div>
);

const ExperiencePill = ({ text, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md border border-[var(--color-bone)] rounded-full text-sm font-bold text-[var(--color-ink-black)] shadow-sm hover:shadow-md transition-shadow cursor-default"
  >
    <Sparkles className="w-4 h-4 text-[var(--color-rose)]" />
    {text}
  </motion.div>
);

const Home = () => {
  return (
    <div className="relative">
        {/* Background Grain Effect Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/p6-dark.png')]" />

        {/* Hero Section */}
        <section className="relative min-h-screen pb-20 px-6 flex flex-col items-center justify-center overflow-hidden">
          {/* Animated Background blobs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-[var(--color-rose-pale)] rounded-full blur-[120px] opacity-40 mix-blend-multiply" 
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 1, 1.1],
              x: [0, -40, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-[var(--color-tan)] rounded-full blur-[100px] opacity-50 mix-blend-multiply border border-[var(--color-bone)]" 
          />

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center justify-between pt-12">
            
            <div className="flex-1 text-left lg:pr-12 max-w-2xl z-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 px-5 py-2 clush-glass rounded-full border border-[var(--color-bone)] mb-8 shadow-sm"
              >
                <div className="flex -space-x-2">
                   <div className="w-6 h-6 rounded-full border-2 border-[var(--color-cream)] overflow-hidden bg-slate-200">
                     <img src={IMAGES.profile1} className="w-full h-full object-cover" />
                   </div>
                   <div className="w-6 h-6 rounded-full border-2 border-[var(--color-cream)] overflow-hidden bg-slate-200">
                     <img src={IMAGES.profile3} className="w-full h-full object-cover" />
                   </div>
                </div>
                <span className="font-[Figtree] text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-ink-black)]">
                  Private Concept Preview
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-5xl md:text-8xl lg:text-[100px] font-[Gabarito] font-bold italic leading-[0.95] tracking-[-0.04em] mb-10 text-[var(--color-ink-black)]"
              >
                Connection,<br />
                <span className="text-[var(--color-rose)] relative whitespace-nowrap">
                  Elevated
                  <svg className="absolute w-full h-4 -bottom-2 left-0 text-[var(--color-rose-light)] opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 L 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round" />
                  </svg>
                </span>.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="font-[Figtree] text-xl md:text-2xl text-[var(--color-ink-muted)] mb-4 max-w-lg leading-relaxed font-light"
              >
                Clush is a private, curated community for intentional single people who value substance and style.
              </motion.p>
              <div className="mb-12 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[var(--color-rose)] opacity-60">
                 <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                 Initial Concept Phase • External Testing Not Started
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center gap-6"
              >
                <NavLink to="/join" className="clush-btn-primary px-12 py-5 w-full sm:w-auto text-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl">
                  Request Access
                </NavLink>
                <NavLink to="/about" className="flex items-center gap-3 font-bold group">
                  <span className="border-b-2 border-transparent group-hover:border-[var(--color-gold)] transition-all">Who are we?</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </motion.div>

              <div className="mt-16 flex flex-wrap gap-4">
                <ExperiencePill text="No Swiping" delay={1} />
                <ExperiencePill text="Verified Profiles" delay={1.1} />
                <ExperiencePill text="Curated Venues" delay={1.2} />
              </div>
            </div>

            {/* Hero Gallery */}
            <div className="flex-1 relative w-full h-[650px] mt-16 lg:mt-0 lg:ml-12 lg:block hidden">
              <HeroCard img={IMAGES.profile1} name="Elena" age="26" delay={0.4} x={0} y={60} rotate={-8} size="large" />
              <HeroCard img={IMAGES.profile2} name="Marcus" age="30" delay={0.6} x={240} y={180} rotate={6} size="small" />
              <HeroCard img={IMAGES.hero1} name="Chloe" age="28" delay={0.8} x={100} y={-80} rotate={2} size="small" />
              <HeroCard img={IMAGES.profile3} name="David" age="31" delay={1.0} x={360} y={0} rotate={12} size="large" />
            </div>

            {/* Mobile simplified gallery */}
            <div className="lg:hidden w-full relative h-[450px] mt-16 flex justify-center -mb-20">
              <img src={IMAGES.profile1} className="w-72 h-96 object-cover clush-hero-card absolute top-0 -rotate-3 z-10 shadow-2xl" />
              <img src={IMAGES.profile3} className="w-72 h-96 object-cover clush-hero-card absolute top-12 rotate-6 translate-x-12 opacity-90 shadow-xl" />
            </div>

          </div>
        </section>

        {/* Manifesto Section */}
        <section className="py-32 px-6 bg-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-20">
             <div className="flex-1 relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl relative z-10"
                >
                   <img src={IMAGES.coupleDate} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-black)]/60 to-transparent" />
                   <div className="absolute bottom-10 left-10 right-10 text-white">
                      <Quote className="w-12 h-12 text-[var(--color-gold)] mb-4" fill="currentColor" />
                      <p className="text-2xl font-[Ledger] italic leading-snug">"It feels like meeting a friend's friend at a private dinner."</p>
                   </div>
                </motion.div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--color-rose-pale)] rounded-full blur-3xl opacity-60" />
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[var(--color-tan)] rounded-full blur-3xl" />
             </div>
             
             <div className="flex-1 space-y-10">
                <SectionHeading>Our Philosophy</SectionHeading>
                <h2 className="text-4xl md:text-6xl font-[Gabarito] font-bold italic leading-tight">Substance is the new luxury.</h2>
                <div className="space-y-6 font-[Figtree] text-xl text-[var(--color-ink-muted)] leading-relaxed font-light">
                   <p>We're building Clush for people who are tired of the 'dating app' format. We've removed the slot-machine mechanics and replaced them with human-centric design.</p>
                   <p>In our private beta, we've found that slower, more intentional matching leads to significantly higher quality first dates and lasting connections.</p>
                </div>
                <div className="pt-6">
                   <button className="flex items-center gap-4 px-8 py-4 rounded-2xl border-2 border-[var(--color-bone)] hover:border-[var(--color-rose)] transition-all font-bold">
                      Read The Manifesto
                   </button>
                </div>
             </div>
          </div>
        </section>

        {/* Early Community Section */}
        <section className="py-32 px-6 bg-[var(--color-tan)] border-y border-[var(--color-bone)]">
          <div className="max-w-7xl mx-auto text-center">
             <SectionHeading>Beta Community</SectionHeading>
             <h2 className="text-4xl md:text-7xl font-[Gabarito] font-bold italic mb-20">Shaping the future, together.</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="p-10 bg-white rounded-[32px] border border-[var(--color-bone)] shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
                   <div className="w-14 h-14 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center mb-8 group-hover:bg-[var(--color-rose)] transition-colors">
                      <Heart className="w-7 h-7 text-[var(--color-rose)] group-hover:text-white" />
                   </div>
                   <h3 className="text-2xl font-bold mb-4 font-[Gabarito]">Private Invitations</h3>
                   <p className="text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed">We control growth to maintain a balanced, respectful ecosystem where every profile is real.</p>
                </div>
                <div className="p-10 bg-white rounded-[32px] border border-[var(--color-bone)] shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
                   <div className="w-14 h-14 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center mb-8 group-hover:bg-[var(--color-gold)] transition-colors">
                      <Sparkles className="w-7 h-7 text-[var(--color-gold)] group-hover:text-white" />
                   </div>
                   <h3 className="text-2xl font-bold mb-4 font-[Gabarito]">Member Input</h3>
                   <p className="text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed">Our early members directly influence the features we build. Your feedback is our roadmap.</p>
                </div>
                <div className="p-10 bg-white rounded-[32px] border border-[var(--color-bone)] shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
                   <div className="w-14 h-14 rounded-full bg-[var(--color-ink-black)]/10 flex items-center justify-center mb-8 group-hover:bg-[var(--color-ink-black)] transition-colors">
                      <Star className="w-7 h-7 text-[var(--color-ink-black)] group-hover:text-white" />
                   </div>
                   <h3 className="text-2xl font-bold mb-4 font-[Gabarito]">Elite Standards</h3>
                   <p className="text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed">We maintain a high bar for behavior and authenticity, creating a safe space for true vulnerability.</p>
                </div>
             </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-40 px-6 relative overflow-hidden text-center bg-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[var(--color-rose-pale)] rounded-full blur-[150px] opacity-30" />
          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-8xl font-[Gabarito] font-bold italic mb-10 leading-none">Ready for something <span className="text-[var(--color-rose)]">different?</span></h2>
              <p className="text-xl text-[var(--color-ink-muted)] mb-12 font-[Figtree] max-w-lg mx-auto leading-relaxed">
                 Join our waiting list today. We're launching in selective cities throughout the year.
              </p>
              <NavLink to="/join" className="clush-btn-primary px-16 py-6 text-2xl font-bold rounded-[24px] shadow-2xl inline-block hover:scale-110 transition-transform">
                  Reserve Your Spot
              </NavLink>
            </motion.div>
          </div>
        </section>
    </div>
  );
};

export default Home;
