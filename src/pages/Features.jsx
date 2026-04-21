import React from 'react';
import { motion } from 'framer-motion';
import { Star, Timer, ShieldCheck, Zap, Bot, MessageCircle, Bookmark } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, desc, delay, reversed = false }) => (
  <motion.div 
    initial={{ opacity: 0, x: reversed ? 50 : -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`flex flex-col md:flex-row items-center gap-12 py-24 border-b border-[var(--color-bone)] ${reversed ? 'md:flex-row-reverse' : ''}`}
  >
    <div className="flex-1 w-full">
      <div className="aspect-[16/10] clush-card overflow-hidden">
        <img
          src={`https://placehold.co/800x500/EBE7E1/C4A99A?text=${encodeURIComponent(title)}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    <div className="flex-1 flex flex-col items-center md:items-start gap-6 text-center md:text-left text-balance">
      <div className="w-12 h-12 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
        <Icon className="w-6 h-6 text-[var(--color-rose)]" />
      </div>
      <h3 className="font-[Gabarito] text-3xl md:text-4xl font-bold tracking-tight italic">{title}</h3>
      <p className="font-[Figtree] text-lg md:text-xl text-[var(--color-ink-muted)] leading-relaxed">{desc}</p>
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
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose)] animate-pulse" />
              <span className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-black)]">Planned Features · Coming Soon</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-[Gabarito] font-bold italic leading-tight mb-8">Crafted for Quality Conversations.</h1>
            <p className="text-lg md:text-xl text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed mb-6">
              We've reimagined dating from the ground up, focusing on intentionality, authenticity, and visual elegance.
            </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto">
        <FeatureItem
          icon={Timer}
          title="Vanishing Media"
          desc="You'll be able to send images that automatically self-destruct after being viewed once or twice. Spontaneous, private sharing without the fear of photos lingering in your chat history forever."
          delay={0}
        />
        <FeatureItem
          icon={ShieldCheck}
          title="Anti-Screenshot Shield"
          desc="Our chat interface is being built with active screenshot protection that will prevent users from capturing logs or vanishing media — a major trust-builder designed to create a true safe space."
          delay={0.2}
          reversed
        />
        <FeatureItem
          icon={Zap}
          title="Gem: Priority Icebreaker"
          desc="A Gem won't just be a like. A message will be sent before you even match. Gemmed profiles will rise to the very top of the recipient's Connections list, allowing you to stand out and start the conversation on your terms."
          delay={0.4}
        />
        <FeatureItem
          icon={Bot}
          title="AI-Guardian Security"
          desc="Every user will be screened at the door. During signup, our backend AI will instantly detect fake profiles and block any uploaded images containing explicit content or social handles, ensuring your discovery feed is pristine and authentic from day one."
          delay={0.6}
          reversed
        />
        <FeatureItem
          icon={MessageCircle}
          title="Rich Chat Experience"
          desc="Expect voice messages with a preview-before-sending mode, swipe-to-reply threading, real-time typing indicators, and read receipts — everything you will need for deeper, more natural conversations."
          delay={0.8}
        />
        <FeatureItem
          icon={Bookmark}
          title="Save for Later Vault"
          desc="Not ready to decide? You'll be able to save profiles from your Discovery feed to a private vault and revisit them whenever you are ready. No more punishing permanent left-swipes — take your time."
          delay={1.0}
          reversed
        />
      </div>

      <section className="mt-20 md:mt-32 max-w-7xl mx-auto bg-[var(--color-tan)] rounded-[32px] md:rounded-[40px] p-8 md:p-24 border border-[var(--color-bone)] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-rose-pale)] blur-[100px] opacity-40 -z-10" />
        <h2 className="text-3xl md:text-6xl font-[Gabarito] font-bold italic mb-16 md:mb-20 relative z-10 leading-tight">Modern elegance,<br className="hidden md:block" /> ancient chemistry.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 relative z-10">
          <div className="flex flex-col items-center gap-4 group p-4 border-b border-[var(--color-bone)] md:border-none pb-12 md:pb-0 last:border-none">
             <div className="text-4xl md:text-5xl font-bold text-[var(--color-rose)] italic transition-transform group-hover:scale-110 duration-500">Only</div>
             <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">VERIFIED USERS</p>
          </div>
          <div className="flex flex-col items-center gap-4 group p-4 border-b border-[var(--color-bone)] md:border-none pb-12 md:pb-0 last:border-none">
             <div className="text-4xl md:text-5xl font-bold text-[var(--color-gold)] italic transition-transform group-hover:scale-110 duration-500">Real</div>
             <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">CONNECTIONS, NO CATFISHING</p>
          </div>
          <div className="flex flex-col items-center gap-4 group p-4 border-b border-[var(--color-bone)] md:border-none pb-12 md:pb-0 last:border-none">
             <div className="text-4xl md:text-5xl font-bold text-[var(--color-rose)] italic transition-transform group-hover:scale-110 duration-500">Always</div>
             <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">PROTECTED BY AI</p>
          </div>
          <div className="flex flex-col items-center gap-4 group p-4 last:border-none">
             <div className="text-4xl md:text-5xl font-bold text-[var(--color-ink-black)] italic transition-transform group-hover:scale-110 duration-500">Fair
</div>
             <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">ACCESSIBLE PRICING</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
