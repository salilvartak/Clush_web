import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart, ShieldCheck, Apple, Smartphone } from 'lucide-react';

const Waitlist = () => {
  return (
    <div className="px-6 pb-24">
      <section className="pt-20 pb-16 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 clush-glass rounded-full border border-[var(--color-bone)] mb-8">
            <Star className="w-4 h-4 text-[var(--color-gold)]" />
            <span className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-black)]">Available Now</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-[Gabarito] font-bold italic leading-tight mb-8">
            Download Clush.<br />Start Something Real.
          </h1>
          <p className="text-xl text-[var(--color-ink-muted)] leading-relaxed max-w-2xl mx-auto font-[Figtree]">
            Available on iOS and Android. Join a curated community of intentional people who value depth, authenticity, and connection.
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* Download Buttons */}
        <div className="flex-1 w-full lg:max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="clush-card p-8 md:p-14 border border-[var(--color-bone)] bg-white shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-[Gabarito] font-bold italic mb-4">Get the App</h2>
            <p className="font-[Figtree] text-[var(--color-ink-muted)] mb-10">
              Download Clush for free. Upgrade to Clush+ anytime to unlock the full experience.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="flex items-center gap-4 bg-[var(--color-ink-black)] text-white px-6 py-4 rounded-2xl hover:bg-[var(--color-rose)] transition-colors duration-200 group"
              >
                <Apple className="w-8 h-8 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest opacity-70 font-[Figtree]">Download on the</p>
                  <p className="text-lg font-bold font-[Gabarito] italic leading-none">App Store</p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-4 bg-[var(--color-ink-black)] text-white px-6 py-4 rounded-2xl hover:bg-[var(--color-rose)] transition-colors duration-200 group"
              >
                <Smartphone className="w-8 h-8 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest opacity-70 font-[Figtree]">Get it on</p>
                  <p className="text-lg font-bold font-[Gabarito] italic leading-none">Google Play</p>
                </div>
              </a>
            </div>

            <p className="text-xs text-[var(--color-ink-muted)] text-center mt-8 font-[Figtree] opacity-60">
              Free to download · Available in select cities
            </p>
          </motion.div>
        </div>

        {/* Why Clush */}
        <div className="flex-1 flex flex-col gap-12 lg:pl-12">
          <div className="flex gap-8 items-start">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
              <Star className="w-6 h-6 text-[var(--color-rose)]" />
            </div>
            <div>
              <h3 className="font-[Gabarito] text-2xl font-bold mb-3 italic">Curated Community</h3>
              <p className="text-[var(--color-ink-muted)] text-lg leading-relaxed font-[Figtree]">Every profile is real and verified. We carefully manage growth so quality never drops.</p>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
              <Heart className="w-6 h-6 text-[var(--color-rose)]" />
            </div>
            <div>
              <h3 className="font-[Gabarito] text-2xl font-bold mb-3 italic">Intentional Matching</h3>
              <p className="text-[var(--color-ink-muted)] text-lg leading-relaxed font-[Figtree]">No slot-machine swiping. Clush is built for people who want fewer, better connections.</p>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[var(--color-rose)]" />
            </div>
            <div>
              <h3 className="font-[Gabarito] text-2xl font-bold mb-3 italic">Privacy First</h3>
              <p className="text-[var(--color-ink-muted)] text-lg leading-relaxed font-[Figtree]">Vanishing media, screenshot protection, and AI moderation keep your experience safe and private.</p>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[var(--color-rose)]" />
            </div>
            <div>
              <h3 className="font-[Gabarito] text-2xl font-bold mb-3 italic">Upgrade Anytime</h3>
              <p className="text-[var(--color-ink-muted)] text-lg leading-relaxed font-[Figtree]">Start for free and unlock advanced features with Clush+ — starting at just ₹165/month.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
