import React from 'react';
import { motion } from 'framer-motion';

const PolicyContainer = ({ title, lastUpdated, children }) => (
  <motion.div 
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    className="clush-card p-12 md:p-20 bg-white border border-[var(--color-bone)] shadow-xl relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-rose)]" />
    <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 border-b border-[var(--color-bone)] pb-8">
       <h2 className="text-4xl md:text-5xl font-[Gabarito] font-bold italic">{title}</h2>
       <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-muted)]">Last Updated: {lastUpdated}</div>
    </div>
    
    <div className="prose prose-stone prose-lg max-w-none font-[Figtree] text-[var(--color-ink-muted)] leading-loose space-y-12 marker:text-[var(--color-rose)] prose-headings:font-[Gabarito] prose-headings:italic prose-headings:text-[var(--color-ink-black)]">
       {children}
    </div>
  </motion.div>
);

export const PrivacyPolicy = () => (
  <PolicyContainer title="Privacy Policy" lastUpdated="March 30, 2026">
    <section className="space-y-6">
       <h3>1. Information We Collect</h3>
       <p>We are dedicated to safeguarding your personal data. We collect information you provide directly to us when creating a profile, such as your name, email, interests, and photos.</p>
       <p>We also utilize modern tracking technologies to improve your experience, but we prioritize anonymity and user control in all our processes.</p>
    </section>
    
    <section className="space-y-6">
       <h3>2. How We Use Your Data</h3>
       <p>Your information is primarily used to facilitate compatible matches and provide you with a curated dating experience. We do not sell your personal data to third parties.</p>
       <p>We analyze behavior within the app to enhance our algorithm's accuracy and to identify potential safety concerns.</p>
    </section>

    <section className="space-y-6">
       <h3>3. Data Security</h3>
       <p>We implement the highest industry standards for data encryption and security. Your photos and private messages are protected with end-to-end security measures.</p>
    </section>

    <section className="space-y-6">
       <h3>4. Your Rights</h3>
       <p>You have the right to access, modify, or delete your personal information at any time. We believe in total transparency regarding how your data is handled.</p>
    </section>
  </PolicyContainer>
);

export const TermsOfService = () => (
  <PolicyContainer title="Terms of Service" lastUpdated="March 30, 2026">
    <section className="space-y-6">
       <h3>1. Acceptance of Terms</h3>
       <p>By using Clush, you agree to abide by these terms. Our platform is designed for individuals seeking genuine, intentional connections.</p>
    </section>
    
    <section className="space-y-6">
       <h3>2. User Responsibilities</h3>
       <p>You are responsible for maintaining the confidentiality of your account and for all activities that occur under your profile. Authenticity is a core requirement of our community.</p>
    </section>

    <section className="space-y-6">
       <h3>3. Prohibited Conduct</h3>
       <p>We strictly prohibit any form of harassment, spam, or misleading behavior. Any violation of our community standards may lead to immediate account suspension.</p>
    </section>

    <section className="space-y-6">
       <h3>4. Limitation of Liability</h3>
       <p>Clush provides a platform for connection, but we are not responsible for the outcomes of individual interactions. We encourage all members to practice safety and caution.</p>
    </section>
  </PolicyContainer>
);

export const CommunityGuidelines = () => (
  <PolicyContainer title="Community Guidelines" lastUpdated="March 30, 2026">
    <section className="space-y-6">
       <h3>1. Be Authentic</h3>
       <p>Always represent yourself accurately. Use recent photos and honest descriptions to foster trust within the community.</p>
    </section>
    
    <section className="space-y-6">
       <h3>2. Be Respectful</h3>
       <p>Treat every member with kindness and consideration. We have a zero-tolerance policy for hate speech or derogatory language.</p>
    </section>

    <section className="space-y-6">
       <h3>3. Be Intentional</h3>
       <p>Clush is designed for those seeking substance. Engage meaningfully and respect others' time and efforts.</p>
    </section>

    <section className="space-y-6">
       <h3>4. Safety First</h3>
       <p>Always prioritize your safety and the safety of others. Report any behavior that feels uncomfortable or suspicious.</p>
    </section>
  </PolicyContainer>
);
