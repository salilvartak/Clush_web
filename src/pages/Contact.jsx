import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, HelpCircle, MapPin, Send } from 'lucide-react';

const ContactItem = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="clush-card p-10 flex flex-col items-center text-center gap-6 bg-white hover:bg-[var(--color-tan)] transition-colors duration-500"
  >
    <div className="w-16 h-16 rounded-full bg-[var(--color-rose-pale)]/30 flex items-center justify-center">
      <Icon className="w-8 h-8 text-[var(--color-rose)]" />
    </div>
    <h3 className="font-[Gabarito] text-2xl font-bold tracking-tight italic">{title}</h3>
    <p className="font-[Figtree] text-[var(--color-ink-muted)] leading-relaxed">{desc}</p>
  </motion.div>
);

const Contact = () => {
  return (
    <div className="px-6 pb-24">
      <section className="pt-20 pb-32 text-center max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 clush-glass rounded-full border border-[var(--color-bone)] mb-8">
              <Mail className="w-4 h-4 text-[var(--color-rose)]" />
              <span className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-black)]">Get in Touch</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-[Gabarito] font-bold italic leading-tight mb-8">We're Here to Help.</h1>
            <p className="text-xl text-[var(--color-ink-muted)] leading-relaxed">
              For any questions, concerns, or simply to share your Clush story, we are always ready to hear from you.
            </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        <ContactItem 
          icon={Mail} 
          title="Email Us" 
          desc="General inquiries and support: support@clush.app"
          delay={0}
        />
        <ContactItem 
          icon={MessageCircle} 
          title="Chat Support" 
          desc="Live chat available inside the app for all members."
          delay={0.1}
        />
        <ContactItem 
          icon={HelpCircle} 
          title="Help Center" 
          desc="Detailed FAQs and guides for common questions."
          delay={0.2}
        />
        <ContactItem 
          icon={MapPin} 
          title="Visit Us" 
          desc="Mayfair, London, United Kingdom. By appointment only."
          delay={0.3}
        />
      </div>

      <section className="max-w-4xl mx-auto clush-card p-12 md:p-24 bg-[var(--color-tan)] border border-[var(--color-bone)]">
         <h2 className="text-4xl md:text-5xl font-[Gabarito] font-bold italic text-center mb-12">Send a Message</h2>
         <form className="grid grid-cols-1 md:grid-cols-2 gap-8 font-[Figtree] text-[var(--color-ink-black)]">
            <div className="flex flex-col gap-2">
               <label className="text-xs uppercase tracking-widest font-bold text-[var(--color-ink-muted)] px-1">Name</label>
               <input type="text" className="bg-white border border-[var(--color-bone)] rounded-2xl p-4 outline-none focus:border-[var(--color-rose)] transition-colors" placeholder="Your Name" />
            </div>
            <div className="flex flex-col gap-2">
               <label className="text-xs uppercase tracking-widest font-bold text-[var(--color-ink-muted)] px-1">Email</label>
               <input type="email" className="bg-white border border-[var(--color-bone)] rounded-2xl p-4 outline-none focus:border-[var(--color-rose)] transition-colors" placeholder="Email Address" />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
               <label className="text-xs uppercase tracking-widest font-bold text-[var(--color-ink-muted)] px-1">Message</label>
               <textarea rows={6} className="bg-white border border-[var(--color-bone)] rounded-2xl p-4 outline-none focus:border-[var(--color-rose)] transition-colors resize-none" placeholder="How can we assist you today?"></textarea>
            </div>
            <div className="md:col-span-2 pt-6">
               <button type="submit" className="clush-btn-primary px-12 py-4 w-full md:w-auto text-lg font-bold flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all">
                  <Send className="w-5 h-5 rotate-45" /> Send Message
               </button>
            </div>
         </form>
      </section>
    </div>
  );
};

export default Contact;
