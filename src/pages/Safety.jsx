import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, Lock, UserCheck, Heart, AlertCircle, PhoneCall, FileBox, Hexagon, Fingerprint, Activity, Smartphone } from 'lucide-react';

const SafetyNode = ({ icon: Icon, title, desc, delay, x, y }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8, x: x - 20, y: y - 20 }}
    whileInView={{ opacity: 1, scale: 1, x, y }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    whileHover={{ y: y - 10, scale: 1.02, transition: { duration: 0.3 } }}
    className="absolute w-72 h-72 clush-card p-10 flex flex-col items-center justify-center text-center gap-6 bg-white/40 backdrop-blur-lg border border-white/60 shadow-2xl group"
  >
    <div className="w-16 h-16 rounded-2xl bg-[var(--color-rose)] flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-xl shadow-rose/20">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="font-[Gabarito] text-xl font-bold italic tracking-tight">{title}</h3>
    <p className="font-[Figtree] text-sm text-[var(--color-ink-muted)] leading-relaxed">{desc}</p>
    <div className="absolute top-4 right-4 text-[var(--color-bone)] group-hover:text-[var(--color-rose)] transition-colors">
       <Hexagon className="w-6 h-6 rotate-45" />
    </div>
  </motion.div>
);

const SecurityMetric = ({ icon: Icon, value, label, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="flex flex-col items-center text-center gap-2"
  >
    <div className="w-12 h-12 rounded-full bg-white border border-[var(--color-bone)] flex items-center justify-center mb-2 mx-auto">
       <Icon className="w-5 h-5 text-[var(--color-gold)]" />
    </div>
    <div className="text-2xl md:text-3xl font-[Gabarito] font-bold italic w-full">{value}</div>
    <div className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-[var(--color-ink-muted)] w-full">{label}</div>
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

const Safety = () => {
  return (
    <div className="min-h-screen relative bg-[var(--color-cream)]">
      {/* Background Decorative Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 bg-[radial-gradient(circle,var(--color-ink-black)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <section className="relative pt-32 pb-40 px-6 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 clush-glass rounded-full border border-[var(--color-bone)] mb-10 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-[var(--color-rose)]" />
              <span className="font-[Figtree] text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-ink-black)]">Protocol 1.0</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-[Gabarito] font-bold italic leading-[0.9] mb-12"
            >
              Secure<br />By <span className="text-[var(--color-rose)]">Essence</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-[Figtree] text-xl md:text-2xl text-[var(--color-ink-muted)] mb-4 leading-relaxed font-light"
            >
              We believe true connection requires a sanctuary. Our multi-layered security stack ensures that what happens on Clush, stays on Clush.
            </motion.p>
            <div className="mb-16 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[var(--color-rose)] opacity-60">
               <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
               Security Concept Build • No External Pen-Testing Started
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-[var(--color-bone)] place-items-center">
               <SecurityMetric icon={Lock} value="256" label="Bit Encryption" delay={0.6} />
               <SecurityMetric icon={Fingerprint} value="100%" label="Verified Members" delay={0.7} />
               <SecurityMetric icon={Activity} value="24/7" label="Active Monitoring" delay={0.8} />
               <SecurityMetric icon={Smartphone} value="App" label="Isolated Sandbox" delay={0.9} />
            </div>
          </div>

          <div className="flex-1 relative h-[700px] w-full lg:block hidden">
             {/* Center visual link */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[var(--color-gold)] rounded-full blur-[100px] opacity-20" />
             
             <SafetyNode icon={UserCheck} title="Verified Only" desc="Manual review of every application to ensure our community is 100% real human." delay={0.2} x={-40} y={40} />
             <SafetyNode icon={EyeOff} title="Invisible Mode" desc="Browse silently. You control when, where, and to whom you become visible." delay={0.4} x={260} y={120} />
             <SafetyNode icon={Lock} title="Encrypted" desc="Messages and media are protected by industry-leading end-to-end encryption." delay={0.6} x={60} y={380} />
             <SafetyNode icon={AlertCircle} title="Zero Harassment" desc="Proactive AI intervention and a strictly enforced zero-tolerance policy." delay={0.8} x={360} y={440} />
          </div>

          {/* Mobile visible grid */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="clush-card p-10 bg-white shadow-xl">
                 <UserCheck className="w-10 h-10 text-[var(--color-rose)] mb-6" />
                 <h3 className="text-2xl font-bold mb-4 font-[Gabarito] italic">Verified Only</h3>
                 <p className="text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed italic">Manual human review of every single profile application.</p>
              </div>
              <div className="clush-card p-10 bg-white shadow-xl">
                 <EyeOff className="w-10 h-10 text-[var(--color-rose)] mb-6" />
                 <h3 className="text-2xl font-bold mb-4 font-[Gabarito] italic">Invisible Mode</h3>
                 <p className="text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed italic">You are in total command of your visibility and privacy settings.</p>
              </div>
          </div>
        </div>
      </section>

      {/* Trust Manifesto */}
      <section className="py-40 px-6 bg-white border-t border-[var(--color-bone)] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <SectionHeading>The Transparency Report</SectionHeading>
           <h2 className="text-4xl md:text-7xl font-[Gabarito] font-bold italic mb-16 px-4">Our promise is written in <span className="text-[var(--color-rose)]">code.</span></h2>
           
           <div className="clush-card p-12 md:p-24 bg-[var(--color-tan)] border border-[var(--color-bone)] text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-rose-pale)] blur-[120px] opacity-40 -z-10" />
              
              <div className="space-y-16">
                 <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex-1 flex flex-col gap-6">
                       <h3 className="text-3xl font-[Gabarito] font-bold italic">Human-to-Human</h3>
                       <p className="text-xl text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed font-light">
                          Unlike other platforms, we don't use bots or fake engagement. Every notification you receive comes from a real person who is intentionally reaching out.
                       </p>
                    </div>
                    <div className="flex-1 flex flex-col gap-6">
                       <h3 className="text-3xl font-[Gabarito] font-bold italic">No Data Resale</h3>
                       <p className="text-xl text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed font-light">
                          Your data is never for sale. Our business model is based on premium membership, not selling our users' personal lives.
                       </p>
                    </div>
                 </div>

                 <div className="pt-16 border-t border-[var(--color-bone)] flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-6">
                       <ShieldCheck className="w-16 h-16 text-[var(--color-rose)]" fill="currentColor" fillOpacity={0.1} />
                       <div>
                          <p className="font-bold text-lg font-[Gabarito] italic">Certified Secure</p>
                          <p className="text-sm text-[var(--color-ink-muted)] font-[Figtree]">Audited by leading cybersecurity firms quarterly.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <button className="clush-btn-primary px-10 py-4 font-bold rounded-2xl">Read Security Whitepaper</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Safety Support Callout */}
      <section className="py-24 px-6 bg-[var(--color-rose-pale)]/30 border-t border-[var(--color-bone)]">
         <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10">
            <PhoneCall className="w-12 h-12 md:w-16 md:h-16 text-[var(--color-rose)] animate-bounce" />
            <h2 className="text-3xl md:text-5xl font-[Gabarito] font-bold italic">We've got your back.</h2>
            <p className="text-xl md:text-2xl text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed font-light italic">
              A dedicated safety concierge is available 24/7 to address any concerns. If you ever feel uncomfortable, we are just a pulse away.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
               <span className="px-6 py-2 border border-[var(--color-rose)] rounded-full text-[var(--color-rose)] font-bold text-xs uppercase tracking-widest bg-white">Reporting Response {'<'} 10m</span>
               <span className="px-6 py-2 border border-[var(--color-rose)] rounded-full text-[var(--color-rose)] font-bold text-xs uppercase tracking-widest bg-white">Live Voice Support</span>
               <span className="px-6 py-2 border border-[var(--color-rose)] rounded-full text-[var(--color-rose)] font-bold text-xs uppercase tracking-widest bg-white">Local Liaisons</span>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Safety;
