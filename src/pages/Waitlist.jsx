import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart, CheckCircle2, Send, Mail } from 'lucide-react';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="px-6 pb-24">
      <section className="pt-20 pb-32 text-center max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 clush-glass rounded-full border border-[var(--color-bone)] mb-8">
              <Star className="w-4 h-4 text-[var(--color-gold)]" />
              <span className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-black)]">Limited Access</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-[Gabarito] font-bold italic leading-tight mb-8">Join the Vanguard of<br />True Romance.</h1>
            <p className="text-xl text-[var(--color-ink-muted)] leading-relaxed">
               We're opening spaces in waves to ensure every member experiences the highest level of care and curated connection.
            </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
         <div className="flex-1 w-full lg:max-w-lg">
            {!submitted ? (
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="clush-card p-8 md:p-16 border border-[var(--color-bone)] bg-white shadow-2xl relative"
              >
                 <div className="absolute top-0 right-0 p-8">
                    <Sparkles className="w-12 h-12 text-[var(--color-gold)]/20" />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-[Gabarito] font-bold italic mb-8">Reserve Your Spot.</h2>
                 <form onSubmit={handleSubmit} className="space-y-8 font-[Figtree]">
                    <div className="space-y-2">
                       <label className="text-xs uppercase tracking-widest font-bold text-[var(--color-ink-muted)] block ml-1">Email Address</label>
                       <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-ink-muted)]" />
                          <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[var(--color-tan)] border border-[var(--color-bone)] rounded-2xl p-4 pl-12 outline-none focus:border-[var(--color-rose)] focus:bg-white transition-all text-lg" 
                            placeholder="you@example.com" 
                          />
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div className="flex items-center gap-3">
                          <input type="checkbox" className="w-5 h-5 rounded accent-[var(--color-rose)]" id="agree" required />
                          <label htmlFor="agree" className="text-sm text-[var(--color-ink-muted)] cursor-pointer">I agree to the privacy policy and terms of service.</label>
                       </div>
                       <button type="submit" className="clush-btn-primary px-12 py-5 w-full text-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transform transition-all group">
                          Request Invite <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                       </button>
                    </div>
                 </form>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="clush-card p-12 md:p-16 border border-[var(--color-bone)] bg-white shadow-2xl text-center"
              >
                  <div className="w-24 h-24 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center mx-auto mb-8">
                     <CheckCircle2 className="w-12 h-12 text-[var(--color-rose)]" />
                  </div>
                  <h2 className="text-4xl font-[Gabarito] font-bold italic mb-6">You're on the list.</h2>
                  <p className="text-lg text-[var(--color-ink-muted)] mb-10 leading-relaxed font-[Figtree]">
                     Thank you for your interest. We'll reach out to <strong>{email}</strong> when a space becomes available in your region.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="text-[var(--color-rose)] font-bold underline hover:text-[var(--color-rose-light)]">Edit Email</button>
              </motion.div>
            )}
         </div>

         <div className="flex-1 flex flex-col gap-12 lg:pl-12">
            <div className="flex gap-8 items-start">
               <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
                  <Star className="w-6 h-6 text-[var(--color-rose)]" />
               </div>
               <div>
                  <h3 className="font-[Gabarito] text-2xl font-bold mb-4 italic">Exclusive Global Community</h3>
                  <p className="text-[var(--color-ink-muted)] text-lg leading-relaxed">Join a carefully curated network of like-minded individuals who value intentionality and depth.</p>
               </div>
            </div>
            <div className="flex gap-8 items-start">
               <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[var(--color-rose)]" />
               </div>
               <div>
                  <h3 className="font-[Gabarito] text-2xl font-bold mb-4 italic">Early Access Privileges</h3>
                  <p className="text-[var(--color-ink-muted)] text-lg leading-relaxed">Be among the first to experience our unique features and participate in our inaugural dating events.</p>
               </div>
            </div>
            <div className="flex gap-8 items-start">
               <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[var(--color-rose)]" />
               </div>
               <div>
                  <h3 className="font-[Gabarito] text-2xl font-bold mb-4 italic">Tailored Roadmap</h3>
                  <p className="text-[var(--color-ink-muted)] text-lg leading-relaxed">Receive updates on our journey and have a say in the features we build as we grow.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Waitlist;
