import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart, CheckCircle2, Mail, MapPin, User, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

const isValidEmail = (email) => {
  const trimmed = email.trim();
  if (!EMAIL_REGEX.test(trimmed)) return false;
  const [local, domain] = trimmed.split('@');
  if (local.length < 1 || local.length > 64) return false;
  if (domain.length < 3 || domain.length > 255) return false;
  const domainParts = domain.split('.');
  if (domainParts.some(part => part.length === 0)) return false;
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) return false;
  return true;
};

const GENDER_OPTIONS = ['Man', 'Woman', 'Non-binary', 'Prefer not to say'];

const emptyForm = { name: '', email: '', age: '', gender: '', area: '' };

const Waitlist = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | duplicate | error | invalid

  const set = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      setStatus('invalid');
      return;
    }

    setStatus('sending');

    const { error } = await supabase
      .from('waitlist')
      .insert([{
        full_name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        age: form.age ? parseInt(form.age, 10) : null,
        gender: form.gender || null,
        location: form.area.trim() || null,
      }]);

    if (!error) {
      setStatus('success');
    } else if (error.code === '23505') {
      setStatus('duplicate');
    } else {
      setStatus('error');
    }
  };

  const inputClass = "w-full bg-[var(--color-tan)] border border-[var(--color-bone)] rounded-2xl p-4 outline-none focus:border-[var(--color-rose)] focus:bg-white transition-all text-lg";
  const inputWithIconClass = `${inputClass} pl-12`;
  const labelClass = "text-xs uppercase tracking-widest font-bold text-[var(--color-ink-muted)] block ml-1";

  return (
    <div className="px-6 pb-24">
      <section className="pt-20 pb-32 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 clush-glass rounded-full border border-[var(--color-bone)] mb-8">
            <MapPin className="w-4 h-4 text-[var(--color-rose)]" />
            <span className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-black)]">Launching in Pune, Maharashtra</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-[Gabarito] font-bold italic leading-tight mb-8">
            Join the Vanguard of<br />True Romance.
          </h1>
          <p className="text-xl text-[var(--color-ink-muted)] leading-relaxed font-[Figtree]">
            We're opening spaces in waves to ensure every member experiences the highest level of care and curated connection.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 w-full lg:max-w-lg">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="clush-card p-12 md:p-16 border border-[var(--color-bone)] bg-[var(--color-tan)] shadow-2xl text-center"
            >
              <div className="w-24 h-24 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-[var(--color-rose)]" />
              </div>
              <h2 className="text-4xl font-[Gabarito] font-bold italic mb-6">You're on the list.</h2>
              <p className="text-lg text-[var(--color-ink-muted)] mb-10 leading-relaxed font-[Figtree]">
                Thank you, <strong>{form.name}</strong>. We'll reach out to <strong>{form.email}</strong> when a space becomes available in Pune.
              </p>
              <button
                onClick={() => { setStatus('idle'); setForm(emptyForm); }}
                className="text-[var(--color-rose)] font-bold underline hover:opacity-70 transition-opacity font-[Figtree]"
              >
                Use a different email
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="clush-card p-8 md:p-16 border border-[var(--color-bone)] bg-[var(--color-tan)] shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 p-8">
                <Sparkles className="w-12 h-12 text-[var(--color-gold)]/20" />
              </div>
              <h2 className="text-3xl md:text-5xl font-[Gabarito] font-bold italic mb-8">Reserve Your Spot.</h2>
              <form onSubmit={handleSubmit} className="space-y-6 font-[Figtree]">

                {/* Name */}
                <div className="space-y-2">
                  <label className={labelClass}>Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-ink-muted)]" />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={set('name')}
                      className={inputWithIconClass}
                      placeholder="Your name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className={labelClass}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-ink-muted)]" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      className={inputWithIconClass}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Age & Gender side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Age</label>
                    <input
                      type="number"
                      required
                      min="18"
                      max="99"
                      value={form.age}
                      onChange={set('age')}
                      className={inputClass}
                      placeholder="e.g. 27"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Gender</label>
                    <select
                      required
                      value={form.gender}
                      onChange={set('gender')}
                      className={`${inputClass} text-[var(--color-ink-muted)] appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Select</option>
                      {GENDER_OPTIONS.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Area */}
                <div className="space-y-2">
                  <label className={labelClass}>Area / Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-ink-muted)]" />
                    <input
                      type="text"
                      required
                      value={form.area}
                      onChange={set('area')}
                      className={inputWithIconClass}
                      placeholder="Your city or neighborhood"
                    />
                  </div>
                </div>

                {status === 'invalid' && (
                  <div className="flex items-center gap-3 text-red-500 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    Please enter a valid email address.
                  </div>
                )}

                {status === 'duplicate' && (
                  <div className="flex items-center gap-3 text-amber-600 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    This email is already on the waitlist.
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-3 text-red-500 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    Something went wrong. Please try again.
                  </div>
                )}

                <div className="space-y-6 pt-2">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 rounded accent-[var(--color-rose)]" id="agree" required />
                    <label htmlFor="agree" className="text-sm text-[var(--color-ink-muted)] cursor-pointer">
                      I agree to the <Link to="/legal/privacy" className="text-[var(--color-rose)] hover:underline">privacy policy</Link> and <Link to="/legal/terms" className="text-[var(--color-rose)] hover:underline">terms of service</Link>.
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="clush-btn-primary px-12 py-5 w-full text-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transform transition-all group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Reserving…
                      </>
                    ) : (
                      <>
                        Request Invite
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-12 lg:pl-12">
          <div className="flex gap-8 items-start">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
              <Star className="w-6 h-6 text-[var(--color-rose)]" />
            </div>
            <div>
              <h3 className="font-[Gabarito] text-2xl font-bold mb-4 italic">Exclusive Community</h3>
              <p className="text-[var(--color-ink-muted)] text-lg leading-relaxed font-[Figtree]">Join a carefully curated network of like-minded individuals in Pune who value intentionality and depth.</p>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
              <Heart className="w-6 h-6 text-[var(--color-rose)]" />
            </div>
            <div>
              <h3 className="font-[Gabarito] text-2xl font-bold mb-4 italic">Founding Member Perks</h3>
              <p className="text-[var(--color-ink-muted)] text-lg leading-relaxed font-[Figtree]">Be among the first to experience our features and directly shape the Clush experience as it grows.</p>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[var(--color-rose)]" />
            </div>
            <div>
              <h3 className="font-[Gabarito] text-2xl font-bold mb-4 italic">Your Input Matters</h3>
              <p className="text-[var(--color-ink-muted)] text-lg leading-relaxed font-[Figtree]">Early members directly influence the features we build. Your feedback is our roadmap.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
