import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle2, MessageSquare, X, Send, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestion) setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-[var(--color-tan)] rounded-[32px] p-8 shadow-2xl border border-[var(--color-bone)] relative"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-[var(--color-rose-pale)] rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[var(--color-rose)]" />
                  </div>
                  <h3 className="font-[Gabarito] text-2xl font-bold italic">Share Your Feedback</h3>
                </div>
                <p className="font-[Figtree] text-[var(--color-ink-muted)] mb-8">
                  Have a suggestion or idea? We'd love to hear it — your input shapes where Clush goes next.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <textarea
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    className="w-full bg-white border border-[var(--color-bone)] rounded-2xl p-4 min-h-[150px] outline-none focus:border-[var(--color-rose)] transition-all resize-none font-[Figtree]"
                    placeholder="Share your thoughts..."
                    required
                  />
                  <button type="submit" className="clush-btn-primary px-8 py-3 w-full font-bold flex items-center justify-center gap-2 group">
                    Send Feedback <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[var(--color-rose-pale)] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[var(--color-rose)]" />
                </div>
                <h3 className="font-[Gabarito] text-2xl font-bold italic mb-4">Thank You!</h3>
                <p className="font-[Figtree] text-[var(--color-ink-muted)] mb-8">
                  We've received your feedback. Our team reviews every submission and we appreciate you helping make Clush better.
                </p>
                <button onClick={onClose} className="clush-btn-secondary px-8 py-3 font-bold">Close</button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Layout = ({ children }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen text-[var(--color-ink-black)] overflow-x-hidden selection:bg-[var(--color-rose-pale)] selection:text-[var(--color-ink-black)]">
      {/* Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl clush-pill-header px-4 md:px-8 py-3">
        <div className="flex items-center justify-between w-full">
          <NavLink to="/" onClick={scrollToTop} className="flex flex-col">
            <span className="text-xl md:text-2xl font-[Gabarito] font-bold italic text-[var(--color-ink-black)] tracking-[-0.03em] flex items-center gap-1">
              Clush
            </span>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-10 font-semibold text-[var(--color-ink-muted)] font-[Figtree] uppercase tracking-[0.1em] text-[11px]">
            <NavLink
              to="/"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "text-[var(--color-ink-black)] relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-gold)]" : "hover:text-[var(--color-ink-black)] transition"
              }
            >Home</NavLink>
            <NavLink
              to="/features"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "text-[var(--color-ink-black)] relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-gold)]" : "hover:text-[var(--color-ink-black)] transition"
              }
            >Features</NavLink>
            <NavLink
              to="/safety"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "text-[var(--color-ink-black)] relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-gold)]" : "hover:text-[var(--color-ink-black)] transition"
              }
            >Safety</NavLink>
            <NavLink
              to="/about"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "text-[var(--color-ink-black)] relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-gold)]" : "hover:text-[var(--color-ink-black)] transition"
              }
            >About Us</NavLink>
            <NavLink
              to="/clush-plus"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "text-[var(--color-ink-black)] relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-gold)]" : "hover:text-[var(--color-ink-black)] transition text-[var(--color-gold)]"
              }
            >Clush Plus</NavLink>
            <NavLink
              to="/contact"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "text-[var(--color-ink-black)] relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-gold)]" : "hover:text-[var(--color-ink-black)] transition"
              }
            >Contact</NavLink>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <NavLink
              to="/join"
              onClick={scrollToTop}
              className="clush-btn-primary px-4 md:px-6 py-2 md:py-2.5 italic text-xs md:text-sm font-bold tracking-tight rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              Early Access
            </NavLink>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-[var(--color-rose-pale)] rounded-full transition-colors order-first"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 p-4 lg:hidden"
            >
              <div className="bg-white/95 backdrop-blur-xl border border-[var(--color-bone)] rounded-[32px] p-6 shadow-2xl flex flex-col gap-6">
                <nav className="flex flex-col gap-4 font-semibold text-[var(--color-ink-muted)] font-[Figtree] uppercase tracking-[0.1em] text-xs">
                  <NavLink to="/" onClick={() => { setIsMenuOpen(false); scrollToTop(); }} className={({ isActive }) => isActive ? "text-[var(--color-ink-black)] bg-[var(--color-rose-pale)] p-3 rounded-2xl" : "p-3 hover:bg-[var(--color-tan)] rounded-2xl transition"}>Home</NavLink>
                  <NavLink to="/features" onClick={() => { setIsMenuOpen(false); scrollToTop(); }} className={({ isActive }) => isActive ? "text-[var(--color-ink-black)] bg-[var(--color-rose-pale)] p-3 rounded-2xl" : "p-3 hover:bg-[var(--color-tan)] rounded-2xl transition"}>Features</NavLink>
                  <NavLink to="/safety" onClick={() => { setIsMenuOpen(false); scrollToTop(); }} className={({ isActive }) => isActive ? "text-[var(--color-ink-black)] bg-[var(--color-rose-pale)] p-3 rounded-2xl" : "p-3 hover:bg-[var(--color-tan)] rounded-2xl transition"}>Safety</NavLink>
                  <NavLink to="/about" onClick={() => { setIsMenuOpen(false); scrollToTop(); }} className={({ isActive }) => isActive ? "text-[var(--color-ink-black)] bg-[var(--color-rose-pale)] p-3 rounded-2xl" : "p-3 hover:bg-[var(--color-tan)] rounded-2xl transition"}>About Us</NavLink>
                  <NavLink to="/contact" onClick={() => { setIsMenuOpen(false); scrollToTop(); }} className={({ isActive }) => isActive ? "text-[var(--color-ink-black)] bg-[var(--color-rose-pale)] p-3 rounded-2xl" : "p-3 hover:bg-[var(--color-tan)] rounded-2xl transition"}>Contact</NavLink>
                  <NavLink to="/clush-plus" onClick={() => { setIsMenuOpen(false); scrollToTop(); }} className={({ isActive }) => isActive ? "text-[var(--color-gold)] bg-[var(--color-gold)]/10 p-3 rounded-2xl" : "p-3 hover:bg-[var(--color-tan)] text-[var(--color-gold)] font-bold rounded-2xl transition"}>Clush Plus</NavLink>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-24 min-h-screen">
        {children}
      </main>

      {/* Feedback Button */}
     

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

      {/* Footer */}
      <footer className="border-t border-[var(--color-bone)] bg-[var(--color-tan)] py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-2">
            <span className="font-[Gabarito] font-bold italic text-2xl">Clush</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left w-full">
            <div className="flex flex-col gap-4">
              <h4 className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">Navigate</h4>
              <NavLink to="/" onClick={scrollToTop} className="text-sm hover:text-[var(--color-rose)] transition">Home</NavLink>
              <NavLink to="/features" onClick={scrollToTop} className="text-sm hover:text-[var(--color-rose)] transition">Features</NavLink>
              <NavLink to="/safety" onClick={scrollToTop} className="text-sm hover:text-[var(--color-rose)] transition">Safety & Trust</NavLink>
              <NavLink to="/clush-plus" onClick={scrollToTop} className="text-sm font-bold text-[var(--color-gold)] hover:text-[var(--color-rose)] transition">Clush Plus</NavLink>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">Connect</h4>
              <NavLink to="/about" onClick={scrollToTop} className="text-sm hover:text-[var(--color-rose)] transition">About Us</NavLink>
              <NavLink to="/contact" onClick={scrollToTop} className="text-sm hover:text-[var(--color-rose)] transition">Contact & Support</NavLink>
              <NavLink to="/join" onClick={scrollToTop} className="text-sm hover:text-[var(--color-rose)] transition">Join Waitlist</NavLink>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">Legal</h4>
              <NavLink to="/legal/privacy" onClick={scrollToTop} className="text-sm hover:text-[var(--color-rose)] transition">Privacy Policy</NavLink>
              <NavLink to="/legal/terms" onClick={scrollToTop} className="text-sm hover:text-[var(--color-rose)] transition">Terms of Service</NavLink>
              <NavLink to="/legal/guidelines" onClick={scrollToTop} className="text-sm hover:text-[var(--color-rose)] transition">Community Guidelines</NavLink>
              <NavLink to="/legal/safe-dating" onClick={scrollToTop} className="text-sm hover:text-[var(--color-rose)] transition">Safe Dating Guide</NavLink>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">Early Access</h4>
              <p className="text-sm text-[var(--color-ink-muted)]">Launching in Pune, Maharashtra. Be the first to know when we go live.</p>
              <NavLink
                to="/join"
                onClick={scrollToTop}
                className="clush-btn-primary px-4 py-2.5 text-sm font-bold text-center rounded-xl"
              >
                Join Waitlist
              </NavLink>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--color-bone)] w-full flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-[Figtree] text-sm text-[var(--color-ink-muted)]">
              &copy; {new Date().getFullYear()} Clush. Crafted by romantics.
            </div>
            <div className="flex items-center gap-5 text-[var(--color-ink-muted)]">
              <a href="#" aria-label="Instagram" className="hover:text-[var(--color-ink-black)] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" aria-label="X / Twitter" className="hover:text-[var(--color-ink-black)] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
