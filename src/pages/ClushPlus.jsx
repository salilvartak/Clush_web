import React from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Zap, 
  Heart, 
  MessageCircle, 
  Filter, 
  RefreshCcw, 
  Eye, 
  Check,
  Star,
  X
} from 'lucide-react';

const ClushPlus = () => {
  const plans = [
    {
      duration: '1 Month',
      price: '₹165',
      tag: null,
      savings: null,
      isPopular: false
    },
    {
      duration: '3 Months',
      price: '₹449',
      tag: 'Best Value',
      savings: '~9% OFF',
      isPopular: true
    },
    {
      duration: '6 Months',
      price: '₹699',
      tag: 'Recommended',
      savings: '~30% OFF',
      isPopular: false
    },
    {
      duration: '12 Months',
      price: '₹1,199',
      tag: 'Super Saver',
      savings: '~40% OFF',
      isPopular: false
    }
  ];

  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Unlimited Daily Likes",
      description: "Express your interest without boundaries. Never run out of likes again."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Priority Placement",
      description: "Your profile shines brighter. Get prioritized visibility to local singles."
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: "Advanced Filters",
      description: "Fine-tune your search. Filter by education, lifestyle, and more specific traits."
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Direct Connect",
      description: "Skip the wait. Send one direct message per week to someone special before matching."
    },
    {
      icon: <RefreshCcw className="w-6 h-6" />,
      title: "Unlimited Rewinds",
      description: "Regret passing? Instantly bring back your last swipe with one tap."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Incognito Mode",
      description: "Control your presence. Only be seen by people you've already liked."
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-gradient-to-b from-[var(--color-rose-pale)]/50 to-transparent -z-10 rounded-[100%] blur-3xl opacity-50" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] font-bold text-xs uppercase tracking-widest mb-8 border border-[var(--color-gold)]/20 shadow-sm"
          >
            <Crown className="w-4 h-4" />
            Clush Plus Membership
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-[Gabarito] font-bold italic mb-6 tracking-tight"
          >
            Elevate Your <span className="clush-text-gradient">Experience</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[var(--color-ink-muted)] font-[Figtree] max-w-2xl mx-auto mb-16"
          >
            Go beyond standard. Unlock premium tools designed to help you find more meaningful connections faster.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative bg-white border ${plan.isPopular ? 'border-[var(--color-gold)] shadow-2xl scale-105 z-10' : 'border-[var(--color-bone)] shadow-xl'} rounded-[40px] p-8 flex flex-col items-center text-center transition-all duration-300`}
            >
              {plan.tag && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${plan.isPopular ? 'bg-[var(--color-gold)] text-white' : 'bg-[var(--color-tan)] text-[var(--color-ink-muted)] border border-[var(--color-bone)]'}`}>
                  {plan.tag}
                </div>
              )}
              
              <h3 className="font-[Figtree] font-bold text-[var(--color-ink-muted)] uppercase tracking-widest text-xs mb-4">{plan.duration}</h3>
              <div className="flex flex-col items-center mb-8">
                <span className="text-4xl font-[Gabarito] font-bold text-[var(--color-ink-black)] italic">{plan.price}</span>
                {plan.savings && (
                  <span className="text-[var(--color-rose)] font-bold text-sm mt-1">{plan.savings}</span>
                )}
                <span className="text-[10px] text-[var(--color-ink-muted)] mt-2 uppercase opacity-60">Incl. all taxes</span>
              </div>
              
              <ul className="space-y-4 mb-10 text-left w-full">
                <li className="flex items-center gap-3 text-sm font-[Figtree] text-[var(--color-ink-muted)]">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  Premium Status
                </li>
                <li className="flex items-center gap-3 text-sm font-[Figtree] text-[var(--color-ink-muted)]">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  All Plus Features
                </li>
              </ul>
              
              <button 
                className={`w-full py-4 rounded-2xl font-bold font-[Figtree] transition-all ${
                  plan.isPopular 
                    ? 'bg-[var(--color-gold)] text-white hover:bg-[var(--color-ink-black)]' 
                    : 'bg-[var(--color-tan)] text-[var(--color-ink-black)] hover:bg-[var(--color-rose-pale)] border border-[var(--color-bone)]'
                }`}
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-[var(--color-tan)] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-[Gabarito] font-bold italic mb-6">Master Your Dating Life</h2>
            <p className="text-[var(--color-ink-muted)] font-[Figtree] max-w-xl mx-auto">
              We've crafted these features to give you more control, more visibility, and a better chance at finding "The One".
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[32px] p-8 border border-[var(--color-bone)] hover:shadow-xl transition-shadow group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-rose-pale)] flex items-center justify-center text-[var(--color-rose)] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-[Gabarito] font-bold italic mb-4">{feature.title}</h3>
                <p className="text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-6 overflow-x-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-[Gabarito] font-bold italic text-center mb-16">Compare Benefits</h2>
          
          <div className="min-w-[500px]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--color-bone)]">
                  <th className="text-left font-[Figtree] font-bold py-6 px-4 uppercase text-xs tracking-widest text-[var(--color-ink-muted)]">Feature</th>
                  <th className="text-center font-[Figtree] font-bold py-6 px-4 uppercase text-xs tracking-widest text-[var(--color-ink-muted)]">Free</th>
                  <th className="text-center font-[Figtree] font-bold py-6 px-4 uppercase text-xs tracking-widest text-[var(--color-rose)]">Clush Plus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-bone)]">
                <tr>
                  <td className="py-6 px-4 font-bold font-[Gabarito] italic">Daily Likes</td>
                  <td className="py-6 px-4 text-center font-[Figtree] text-[var(--color-ink-muted)]">Limited</td>
                  <td className="py-6 px-4 text-center text-[var(--color-rose)] font-bold">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-6 px-4 font-bold font-[Gabarito] italic">Discovery Distance</td>
                  <td className="py-6 px-4 text-center font-[Figtree] text-[var(--color-ink-muted)]">Up to 50km</td>
                  <td className="py-6 px-4 text-center text-[var(--color-rose)] font-bold">Worldwide</td>
                </tr>
                <tr>
                  <td className="py-6 px-4 font-bold font-[Gabarito] italic">Rewind Swipes</td>
                  <td className="py-6 px-4 text-center"><X className="w-5 h-5 mx-auto text-[var(--color-bone)]" /></td>
                  <td className="py-6 px-4 text-center text-[var(--color-rose)] font-bold">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-6 px-4 font-bold font-[Gabarito] italic">Who Likes You</td>
                  <td className="py-6 px-4 text-center font-[Figtree] text-[var(--color-ink-muted)] text-sm">Blurred</td>
                  <td className="py-6 px-4 text-center text-[var(--color-rose)] font-bold">Reveal All</td>
                </tr>
                <tr>
                  <td className="py-6 px-4 font-bold font-[Gabarito] italic">Direct Messaging</td>
                  <td className="py-6 px-4 text-center"><X className="w-5 h-5 mx-auto text-[var(--color-bone)]" /></td>
                  <td className="py-6 px-4 text-center text-[var(--color-rose)] font-bold">1 Weekly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Callout */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="bg-[var(--color-ink-black)] text-white rounded-[40px] p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-rose)]/20 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-[Gabarito] font-bold italic mb-4 tracking-tight">Still have questions?</h3>
              <p className="font-[Figtree] opacity-70">Check our help center to learn more about our premium memberships.</p>
            </div>
            <button className="whitespace-nowrap bg-white text-[var(--color-ink-black)] px-8 py-4 rounded-2xl font-bold font-[Figtree] hover:bg-[var(--color-gold)] hover:text-white transition-colors">
              Read FAQ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClushPlus;
