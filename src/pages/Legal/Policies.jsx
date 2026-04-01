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
  <PolicyContainer title="Privacy Policy" lastUpdated="April 1, 2026">
    <section className="space-y-6">
       <h3>1. Data Fiduciary Identity</h3>
       <p>This Privacy Policy outlines how Clush ("Data Fiduciary", "we", "us") collects, processes, and protects your personal data under the Digital Personal Data Protection (DPDP) Act, 2023.</p>
    </section>
    
    <section className="space-y-6">
       <h3>2. Information We Collect</h3>
       <ul className="list-disc pl-5 space-y-2">
         <li><strong>Account Registration Data:</strong> Mobile phone number (via OTP), First Name, Date of Birth, and Gender.</li>
         <li><strong>Biometric Data (Explicit Consent Required):</strong> A localized facial scan derived from a short video selfie. This data is not stored permanently as an image file but is processed temporarily to verify identity.</li>
         <li><strong>Profile Data:</strong> Photographs and text prompts you upload.</li>
         <li><strong>Activity Data:</strong> Swipe history (Likes/Passes), match data, and chat logs.</li>
       </ul>
    </section>

    <section className="space-y-6">
       <h3>3. Purpose of Data Processing (Purpose Limitation)</h3>
       <p>We use your data exclusively to:</p>
       <ul className="list-disc pl-5 space-y-2">
         <li>Operate the Clush matchmaking algorithm.</li>
         <li>Authenticate your identity and secure your account.</li>
         <li>Verify that you are a real human being and match your profile photos.</li>
         <li>Moderate content and ban abusive users to maintain a safe platform.</li>
       </ul>
    </section>

    <section className="space-y-6">
       <h3>4. Data Sharing and Third Parties</h3>
       <p>We do not sell, rent, or trade your personal data to advertisers or data brokers. We only share necessary data with trusted cloud infrastructure partners required to run the app (e.g., Supabase for database hosting, Firebase for SMS OTPs).</p>
    </section>

    <section className="space-y-6">
       <h3>5. Your Rights under the DPDP Act 2023</h3>
       <p>As an Indian citizen, you possess the following rights regarding your data:</p>
       <ul className="list-disc pl-5 space-y-2">
         <li><strong>Right to Access:</strong> You may request a summary of the personal data we hold about you.</li>
         <li><strong>Right to Correction:</strong> You may update or correct inaccurate data in your profile.</li>
         <li><strong>Right to Erasure (Right to be Forgotten):</strong> You may delete your account at any time via the in-app "Settings &gt; Delete Account" button.</li>
         <li><strong>Right to Withdraw Consent:</strong> You may withdraw your consent for biometric processing by deleting your account.</li>
       </ul>
    </section>

    <section className="space-y-6">
       <h3>6. Grievance Redressal</h3>
       <p>If you have concerns about your data privacy, you may contact our designated Grievance Officer at: <a href="mailto:privacy@clushapp.com" className="text-[var(--color-rose)] underline">privacy@clushapp.com</a>.</p>
    </section>
  </PolicyContainer>
);

export const TermsOfService = () => (
  <PolicyContainer title="Terms of Service (ToS)" lastUpdated="April 1, 2026">
    <section className="space-y-6">
       <h3>1. Acceptance of Terms</h3>
       <p>By creating a Clush account, downloading the Clush application, or using our services, you agree to be bound by these Terms of Service ("Terms"), our Privacy Policy, and our Community Guidelines. If you do not accept and agree to be bound by all of the terms of this agreement, you must not use the application.</p>
    </section>
    
    <section className="space-y-6">
       <h3>2. Eligibility and Account Truthfulness</h3>
       <p>You must be at least eighteen (18) years of age to create an account on Clush and use the Service. By creating an account, you represent and warrant that:</p>
       <ul className="list-disc pl-5 space-y-2">
         <li>You are at least 18 years old.</li>
         <li>You are legally qualified to enter a binding contract with Clush.</li>
         <li>You are not prohibited from using the Service under the laws of India or any applicable jurisdiction.</li>
       </ul>
       <p><strong>Truthfulness of Information:</strong> You affirm that all information provided during account creation, including your date of birth, name, gender, and photographs, is strictly accurate, truthful, and represents your actual, current identity. Impersonation (catfishing) is a material breach of these Terms.</p>
    </section>

    <section className="space-y-6">
       <h3>3. User-Generated Content (UGC) and App Store Compliance</h3>
       <p>Clush allows users to upload photos, text, and communicate with others. You are solely responsible for the content that you publish or display.</p>
       <p><strong>Zero Tolerance Policy:</strong> Clush maintains a strict zero-tolerance policy for objectionable content and abusive users.</p>
       <ul className="list-disc pl-5 space-y-2">
         <li>You agree not to post content that is: illegal, defamatory, harassing, hateful, sexually explicit, pornographic, or threatening.</li>
         <li>Clush reserves the right to terminate your account immediately and without notice if you violate this policy.</li>
         <li>Users have the ability to Block and Report other users for inappropriate behavior directly within the app. Our moderation team reviews reports within 24 hours and removes offending users.</li>
       </ul>
    </section>

    <section className="space-y-6">
       <h3>4. Face Verification (The "Blue Tick" Feature)</h3>
       <p>To ensure authenticity, Clush requires a video selfie verification process. You acknowledge and agree that this feature utilizes artificial intelligence to map facial geometry solely to compare your live video to your uploaded profile pictures. By using this feature, you explicitly consent to this processing.</p>
    </section>

    <section className="space-y-6">
       <h3>5. Premium Subscriptions & Payments</h3>
       <p>If you choose to purchase a Clush Premium subscription (e.g., ₹165/month), payment will be charged to your Apple App Store or Google Play Store account. Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period. All purchases are final and non-refundable, except where required by local law.</p>
    </section>

    <section className="space-y-6">
       <h3>6. Disclaimers Regarding Offline Conduct</h3>
       <p>Clush does not conduct criminal background checks on its users. Clush is purely a software platform designed to facilitate digital introductions. You agree to use extreme caution in all interactions with other users, especially if you decide to communicate off the Service or meet in person.</p>
    </section>

    <section className="space-y-6">
       <h3>7. Limitation of Liability</h3>
       <p>To the fullest extent permitted by applicable law, in no event shall Clush, its founders, employees, or affiliates be liable for any indirect, consequential, exemplary, incidental, special, or punitive damages, including but not limited to physical injury, emotional distress, or property damage arising out of or relating to your use of the app or the conduct of other users.</p>
    </section>

    <section className="space-y-6">
       <h3>8. Indemnification</h3>
       <p>You agree to indemnify, defend, and hold harmless Clush from and against any and all complaints, demands, claims, damages, losses, costs, liabilities, and expenses (including attorney’s fees) due to, arising out of, or relating in any way to your access to or use of the Service, or your breach of these Terms.</p>
    </section>
  </PolicyContainer>
);

export const CommunityGuidelines = () => (
  <PolicyContainer title="Community Guidelines" lastUpdated="April 1, 2026">
    <section className="space-y-6">
       <p>Welcome to Clush. We built this app to create genuine, verified connections. To keep our community safe, you must abide by these rules:</p>
       <ul className="list-disc pl-5 space-y-4">
         <li><strong>Be Authentic:</strong> You must use your real name, real age, and real photos. Catfishing, uploading photos of celebrities, or using AI-generated avatars will result in an instant permanent ban.</li>
         <li><strong>Respect Boundaries:</strong> Clush is a place for respectful connections. Harassment, threats, bullying, racism, hate speech, or unsolicited sexually explicit content in chats will not be tolerated.</li>
         <li><strong>No Solicitation or Prostitution:</strong> Clush is not a marketplace. You may not use Clush to promote businesses, sell premium content, or engage in any transactional or compensated dating.</li>
         <li><strong>Keep it Safe Offline:</strong> Never share your financial information, passwords, or home address with a match.</li>
         <li><strong>Account Sharing:</strong> You may not share your account with anyone else or create multiple accounts.</li>
       </ul>
    </section>
  </PolicyContainer>
);

export const SafeDatingGuide = () => (
  <PolicyContainer title="Clush Safe Dating Guide" lastUpdated="April 1, 2026">
    <section className="space-y-6">
       <p>Meeting new people is exciting, but you should always prioritize your personal safety. Follow these essential guidelines:</p>
    </section>

    <section className="space-y-6">
       <h3>1. Financial Safety (Never Send Money)</h3>
       <p>Never send money, UPI transfers, crypto, or gift cards to anyone you meet on Clush, even if they claim to be in an emergency. Clush will never ask you to process payments outside of the official App Store systems.</p>
    </section>

    <section className="space-y-6">
       <h3>2. Protect Your Personal Information</h3>
       <p>Do not share sensitive personal details such as your home address, daily routine, workplace, Aadhaar/PAN details, or exact location with someone you just matched with.</p>
    </section>

    <section className="space-y-6">
       <h3>3. Meeting in Person</h3>
       <ul className="list-disc pl-5 space-y-2">
         <li><strong>Stay in Public:</strong> For your first few dates, always meet in a populated, public place. Never go to a stranger’s home or invite them to yours.</li>
         <li><strong>Tell a Friend:</strong> Always inform a trusted friend or family member about who you are meeting and where you are going.</li>
         <li><strong>Control Your Transportation:</strong> Drive yourself or use a ride-sharing app to get to and from the date.</li>
       </ul>
    </section>

    <section className="space-y-6">
       <h3>4. Trust Your Instincts</h3>
       <p>If someone makes you uncomfortable, trust your gut. Use the "Unmatch," "Block," and "Report" buttons located inside the app. We take reports seriously and will take action.</p>
    </section>
  </PolicyContainer>
);
