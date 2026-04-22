import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, HelpCircle, ChevronDown, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-[var(--color-bone)] last:border-0">
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
    >
      <span className="font-[Gabarito] text-xl font-bold italic group-hover:text-[var(--color-rose)] transition-colors pr-8">
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-6 h-6 flex-shrink-0"
      >
        <ChevronDown className={`w-6 h-6 ${isOpen ? 'text-[var(--color-rose)]' : 'text-[var(--color-ink-muted)]'}`} />
      </motion.div>
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <div className="pb-8 font-[Figtree] text-[var(--color-ink-muted)] leading-relaxed">
        {answer}
      </div>
    </motion.div>
  </div>
);

const Contact = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const formRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus('success');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  };

  const faqs = [
    {
      question: "What is Clush Plus?",
      answer: "Clush Plus is our premium membership that gives you enhanced control over your dating experience. It includes 20 Right Swipes per day, the ability to See Who Likes You, 3 Gems per week, and much more."
    },
    {
      question: "How do I get more Gems?",
      answer: "Gems are exclusive items used to grab someone's attention instantly. As a Clush Plus member, you get 3 Gems per week. You can also purchase additional Gems directly in the app."
    },
    {
      question: "Can I see who liked me for free?",
      answer: "Free users will see blurred profiles in their 'Likes' grid. To unblur and see exactly who has liked you for instant matching, you'll need a Clush Plus membership."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can manage or cancel your Clush Plus subscription at any time through your phone's App Store or Google Play Store settings under the 'Subscriptions' section."
    },
    {
      question: "Is my data safe on Clush?",
      answer: "Absolutely. We prioritize your security with AI-driven profile verification and encrypted messaging. We never share your personal information with third parties for marketing purposes."
    }
  ];

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

      {/*<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
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
        
      </div>*/}

      <section className="max-w-4xl mx-auto clush-card p-12 md:p-24 bg-[var(--color-tan)] border border-[var(--color-bone)] mb-32">
        <h2 className="text-4xl md:text-5xl font-[Gabarito] font-bold italic text-center mb-12">Send a Message</h2>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[var(--color-rose)]" />
            </div>
            <h3 className="font-[Gabarito] text-3xl font-bold italic">Message Sent!</h3>
            <p className="font-[Figtree] text-[var(--color-ink-muted)] max-w-sm leading-relaxed">
              Thank you for reaching out. We'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="text-[var(--color-rose)] font-bold underline hover:opacity-70 transition-opacity font-[Figtree]"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form ref={formRef} onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 font-[Figtree] text-[var(--color-ink-black)]">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-[var(--color-ink-muted)] px-1">Name</label>
              <input
                type="text"
                name="name"
                required
                className="bg-white border border-[var(--color-bone)] rounded-2xl p-4 outline-none focus:border-[var(--color-rose)] transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-[var(--color-ink-muted)] px-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="bg-white border border-[var(--color-bone)] rounded-2xl p-4 outline-none focus:border-[var(--color-rose)] transition-colors"
                placeholder="Email Address"
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest font-bold text-[var(--color-ink-muted)] px-1">Message</label>
              <textarea
                rows={6}
                name="message"
                required
                className="bg-white border border-[var(--color-bone)] rounded-2xl p-4 outline-none focus:border-[var(--color-rose)] transition-colors resize-none"
                placeholder="How can we assist you today?"
              />
            </div>

            {status === 'error' && (
              <div className="md:col-span-2 flex items-center gap-3 text-red-500 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 font-[Figtree] text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                Something went wrong. Please try again or email us directly at support@clush.app.
              </div>
            )}

            <div className="md:col-span-2 pt-6 flex justify-center">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="clush-btn-primary px-12 py-4 w-full md:w-auto text-lg font-bold flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                     Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>

      <section id="faq" className="max-w-4xl mx-auto mb-12 pt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-[Gabarito] font-bold italic mb-6">Frequently Asked Questions</h2>
          <p className="font-[Figtree] text-[var(--color-ink-muted)] max-w-xl mx-auto">
            Find quick answers to your most common questions about Clush, memberships, and safety.
          </p>
        </div>
        <div className="bg-white rounded-[40px] border border-[var(--color-bone)] px-8 md:px-12 py-4 shadow-sm">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
