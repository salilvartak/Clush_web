import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Crown,
  Check,
  X,
  Sparkles,
  Zap,
  Eye,
  Star,
  RefreshCcw,
  Filter,
  MessageCircle
} from 'lucide-react';

const ClushPlus = () => {
  /* PRICING — commented out until launch
  const plans = [
    {
      duration: '1 Month',
      price: '₹165',
      perMonth: null,
      tag: null,
      savings: null,
      isPopular: false
    },
    {
      duration: '3 Months',
      price: '₹449',
      perMonth: '₹150 / mo',
      tag: 'Best Value',
      savings: '~9% OFF',
      isPopular: true
    },
    {
      duration: '6 Months',
      price: '₹699',
      perMonth: '₹117 / mo',
      tag: 'Recommended',
      savings: '~30% OFF',
      isPopular: false
    },
    {
      duration: '12 Months',
      price: '₹1,199',
      perMonth: '₹100 / mo',
      tag: 'Super Saver',
      savings: '~40% OFF',
      isPopular: false
    }
  ];
  */

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "20 Right Swipes / Day",
      description: "You'll get 3x more daily swipes—expanding your chances while keeping your intent high."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "See Who Likes You",
      description: "You'll unlock a fully visible grid for instant matching—no more guessing games."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "3 Gems / Week",
      description: "Catch their eye before you even match. You'll trigger an exclusive alert."
    },
    {
      icon: <RefreshCcw className="w-6 h-6" />,
      title: "Unlimited Rewinds",
      description: "Accidentally passed on someone? You'll be able to bring their profile back instantly."
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: "Advanced Filters",
      description: "You'll be able to finely curate your feed by height, lifestyle, education, and more."
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Read Receipts On",
      description: "You'll know exactly when your messages have been read—total chat transparency."
    }
  ];

  const comparisonRows = [
    { label: "Right Swipes per day",    free: "6",              plus: "20" },
    { label: "Left Swipes",             free: "Unlimited",      plus: "Unlimited" },
    { label: "See who likes you",       free: "Blurred",        plus: "Fully visible" },
    { label: "Gems per week",           free: "1",              plus: "3" },
    { label: "Rewinds",                 free: "2 / week",       plus: "Unlimited" },
    { label: "Profile saves",           free: "2 / week",       plus: "Unlimited" },
    { label: "Ads",                     free: "Always on",      plus: "Optional" },
    { label: "Filters",                 free: "Basic",          plus: "Advanced +" },
    { label: "Read receipts",           free: false,            plus: true },
    { label: "Visibility control",      free: false,            plus: true },
  ];

  return (
    <div className="min-h-screen pb-20">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-24 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[580px] bg-gradient-to-b from-[var(--color-gold)]/12 via-[var(--color-rose-pale)]/40 to-transparent -z-10 rounded-[100%] blur-3xl" />
        <div className="absolute top-24 left-[15%] w-72 h-72 bg-[var(--color-rose-pale)]/70 -z-10 rounded-full blur-3xl" />
        <div className="absolute top-8 right-[12%] w-56 h-56 bg-[var(--color-gold)]/8 -z-10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] font-bold text-xs uppercase tracking-widest mb-8 border border-[var(--color-gold)]/25 shadow-sm"
          >
            <Crown className="w-4 h-4" />
            Clush Plus Membership
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-[Gabarito] font-bold italic mb-6 tracking-tight leading-[1.05]"
          >
            Elevate Your{' '}
            <span className="clush-text-gradient">Experience</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[var(--color-ink-muted)] font-[Figtree] max-w-2xl mx-auto mb-10"
          >
            We are crafting these features to give you absolute control, priority visibility, and a refined path to your next connection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-ink-black)]/6 text-[var(--color-ink-muted)] font-bold text-xs uppercase tracking-widest border border-[var(--color-bone)]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
            Pricing plans coming soon — join the waitlist to be notified
          </motion.div>
        </div>

        {/* Pricing Cards — hidden until launch */}
        {/* TODO: uncomment plans array and this section when ready to launch
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4">
          pricing cards go here
        </div>
        */}
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="bg-[var(--color-tan)] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-rose-pale)] text-[var(--color-rose)] text-xs font-bold uppercase tracking-widest mb-5 border border-[var(--color-rose)]/15"
            >
              <Sparkles className="w-3.5 h-3.5" />
              What You Unlock
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-5xl font-[Gabarito] font-bold italic mb-5"
            >
              Master Your Dating Life
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="text-[var(--color-ink-muted)] font-[Figtree] max-w-xl mx-auto"
            >
              We've crafted these features to give you more control, more visibility, and a better chance at finding "The One".
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group bg-white rounded-[28px] p-8 border border-[var(--color-bone)] hover:shadow-2xl hover:border-[var(--color-rose)]/25 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-rose-pale)] to-[var(--color-cream)] flex items-center justify-center text-[var(--color-rose)] mb-6 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:from-[var(--color-rose)] group-hover:to-[var(--color-rose-light)] group-hover:text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-[Gabarito] font-bold italic mb-3 text-[var(--color-ink-black)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-[Gabarito] font-bold italic mb-4">Compare Benefits</h2>
            <p className="text-[var(--color-ink-muted)] font-[Figtree]">
              Everything side by side, so you know exactly what you're getting.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[32px] border border-[var(--color-bone)] overflow-hidden shadow-xl"
          >
            {/* Header row */}
            <div className="grid grid-cols-3 border-b-2 border-[var(--color-bone)]">
              <div className="py-5 px-6 font-[Figtree] font-bold text-[var(--color-ink-muted)] text-xs uppercase tracking-widest text-center">
                Feature
              </div>
              <div className="py-5 px-4 text-center border-l border-[var(--color-bone)]">
                <span className="font-[Figtree] font-bold text-sm text-[var(--color-ink-muted)]">Free</span>
              </div>
              <div className="py-5 px-4 text-center border-l border-[var(--color-gold)]/20 bg-gradient-to-b from-[var(--color-gold)]/8 to-transparent">
                <div className="inline-flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                  <span className="font-[Figtree] font-bold text-sm text-[var(--color-gold)]">Clush+</span>
                </div>
              </div>
            </div>

            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-b border-[var(--color-bone)] last:border-b-0 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-[var(--color-tan)]/50'
                }`}
              >
                <div className="py-4 px-6 font-[Figtree] text-sm text-[var(--color-ink-black)] font-medium flex items-center justify-center text-center">
                  {row.label}
                </div>
                <div className="py-4 px-4 border-l border-[var(--color-bone)] flex items-center justify-center">
                  {typeof row.free === 'boolean' ? (
                    row.free
                      ? <Check className="w-5 h-5 text-green-500" />
                      : <X className="w-4 h-4 text-[var(--color-bone)]" />
                  ) : (
                    <span className="font-[Figtree] text-sm text-[var(--color-ink-muted)] text-center">{row.free}</span>
                  )}
                </div>
                <div className="py-4 px-4 border-l border-[var(--color-gold)]/15 bg-[var(--color-gold)]/[0.035] flex items-center justify-center">
                  {typeof row.plus === 'boolean' ? (
                    row.plus
                      ? <Check className="w-5 h-5 text-[var(--color-gold)]" />
                      : <X className="w-4 h-4 text-[var(--color-bone)]" />
                  ) : (
                    <span className="font-[Figtree] text-sm font-semibold text-[var(--color-ink-black)] text-center">{row.plus}</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ Callout ───────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--color-ink-black)] text-white rounded-[40px] p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-gold)]/15 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-rose)]/10 rounded-full blur-3xl -ml-24 -mb-24" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-[Gabarito] font-bold italic mb-3 tracking-tight">
                Still have questions?
              </h3>
              <p className="font-[Figtree] opacity-70 text-sm">
                Check our help center to learn more about our premium memberships.
              </p>
            </div>
            <Link 
              to="/contact#faq"
              className="whitespace-nowrap flex-shrink-0 bg-white text-[var(--color-ink-black)] px-8 py-4 rounded-2xl font-bold font-[Figtree] text-sm hover:bg-[var(--color-gold)] hover:text-white transition-all duration-200"
            >
              Read FAQ
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default ClushPlus;
