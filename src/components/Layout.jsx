import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle2, Lightbulb, X, Send, Menu } from 'lucide-react';
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
                  <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-[var(--color-gold)]" />
                  </div>
                  <h3 className="font-[Gabarito] text-2xl font-bold italic">Building Clush Together</h3>
                </div>
                <p className="font-[Figtree] text-[var(--color-ink-muted)] mb-8">
                  We're in the early stages of our journey. What features or ideas would you like to see in a premium dating experience?
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
                    Send Idea <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                  Your voice helps us shape the future of Clush. We appreciate your contribution to our early community.
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

const DevStatusBar = () => (
  <div className="fixed top-0 left-0 right-0 bg-[var(--color-ink-black)] text-white py-2 px-6 text-[9px] uppercase tracking-[0.3em] font-bold text-center flex items-center justify-center gap-6 z-[60] border-b border-white/5">
     <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose)] animate-pulse" />
        <span className="opacity-80">Development Build v0.1.2</span>
     </div>
     <div className="hidden md:flex items-center gap-6 opacity-40">
        <span>•</span>
        <span>Internal Private Alpha</span>
        <span>•</span>
        <span>Public Testing Pending</span>
     </div>
  </div>
);

const Layout = ({ children }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-[var(--color-ink-black)] overflow-x-hidden selection:bg-[var(--color-rose-pale)] selection:text-[var(--color-ink-black)]">
      <DevStatusBar />
      {/* Header */}
      <header className="fixed top-12 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl clush-pill-header px-4 md:px-8 py-3">
        <div className="flex items-center justify-between w-full">
          <NavLink to="/" className="flex flex-col">
            <span className="text-xl md:text-2xl font-[Gabarito] font-bold italic text-[var(--color-ink-black)] tracking-[-0.03em] flex items-center gap-1">
              Clush
            </span>
          </NavLink>
          
          <nav className="hidden lg:flex items-center gap-10 font-semibold text-[var(--color-ink-muted)] font-[Figtree] uppercase tracking-[0.1em] text-[11px]">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "text-[var(--color-ink-black)] relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-gold)]" : "hover:text-[var(--color-ink-black)] transition"
              }
            >Home <span className="text-[var(--color-rose)] text-[8px] ml-1">v0.1</span></NavLink>
            <NavLink 
              to="/features" 
              className={({ isActive }) => 
                isActive ? "text-[var(--color-ink-black)] relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-gold)]" : "hover:text-[var(--color-ink-black)] transition"
              }
            >Features</NavLink>
            <NavLink 
              to="/safety" 
              className={({ isActive }) => 
                isActive ? "text-[var(--color-ink-black)] relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-gold)]" : "hover:text-[var(--color-ink-black)] transition"
              }
            >Safety</NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? "text-[var(--color-ink-black)] relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-gold)]" : "hover:text-[var(--color-ink-black)] transition"
              }
            >About Us</NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? "text-[var(--color-ink-black)] relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-gold)]" : "hover:text-[var(--color-ink-black)] transition"
              }
            >Contact</NavLink>
          </nav>
 
          <div className="flex items-center gap-2 md:gap-4">
            <NavLink 
              to="/join"
              className="clush-btn-primary px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-bold tracking-tight rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              Waitlist
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
                  <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-[var(--color-ink-black)] bg-[var(--color-rose-pale)] p-3 rounded-2xl" : "p-3 hover:bg-[var(--color-tan)] rounded-2xl transition"}>Home</NavLink>
                  <NavLink to="/features" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-[var(--color-ink-black)] bg-[var(--color-rose-pale)] p-3 rounded-2xl" : "p-3 hover:bg-[var(--color-tan)] rounded-2xl transition"}>Features</NavLink>
                  <NavLink to="/safety" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-[var(--color-ink-black)] bg-[var(--color-rose-pale)] p-3 rounded-2xl" : "p-3 hover:bg-[var(--color-tan)] rounded-2xl transition"}>Safety</NavLink>
                  <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-[var(--color-ink-black)] bg-[var(--color-rose-pale)] p-3 rounded-2xl" : "p-3 hover:bg-[var(--color-tan)] rounded-2xl transition"}>About Us</NavLink>
                  <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-[var(--color-ink-black)] bg-[var(--color-rose-pale)] p-3 rounded-2xl" : "p-3 hover:bg-[var(--color-tan)] rounded-2xl transition"}>Contact</NavLink>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-32 min-h-screen">
        {children}
      </main>

      {/* Early Stage Ideas Toggle */}
      <motion.button 
        onClick={() => setIsFeedbackOpen(true)}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-[60] bg-[var(--color-gold)] text-white p-4 rounded-full shadow-2xl shadow-gold/40 flex items-center gap-3 pr-6"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="font-bold text-[10px] tracking-tight uppercase opacity-60">Early Stage</span>
          <span className="font-bold text-sm tracking-tight uppercase">Share Idea</span>
        </div>
      </motion.button>

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
              <NavLink to="/" className="text-sm hover:text-[var(--color-rose)] transition">Home</NavLink>
              <NavLink to="/features" className="text-sm hover:text-[var(--color-rose)] transition">Features</NavLink>
              <NavLink to="/safety" className="text-sm hover:text-[var(--color-rose)] transition">Safety & Trust</NavLink>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">Connect</h4>
              <NavLink to="/about" className="text-sm hover:text-[var(--color-rose)] transition">About Us</NavLink>
              <NavLink to="/contact" className="text-sm hover:text-[var(--color-rose)] transition">Contact & Support</NavLink>
              <NavLink to="/join" className="text-sm hover:text-[var(--color-rose)] transition">Join Waitlist</NavLink>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">Legal</h4>
              <NavLink to="/legal/privacy" className="text-sm hover:text-[var(--color-rose)] transition">Privacy Policy</NavLink>
              <NavLink to="/legal/terms" className="text-sm hover:text-[var(--color-rose)] transition">Terms of Service</NavLink>
              <NavLink to="/legal/guidelines" className="text-sm hover:text-[var(--color-rose)] transition">Community Guidelines</NavLink>
              <NavLink to="/legal/safe-dating" className="text-sm hover:text-[var(--color-rose)] transition">Safe Dating Guide</NavLink>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">Early Access</h4>
              <p className="text-sm text-[var(--color-ink-muted)]">We're in private alpha. Join our close-knit community.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-white border border-[var(--color-bone)] rounded-lg px-4 py-2 text-sm w-full outline-none focus:border-[var(--color-rose)]"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--color-bone)] w-full flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-[Figtree] text-sm text-[var(--color-ink-muted)]">
              &copy; {new Date().getFullYear()} Clush. Crafted by romantics.
            </div>
            <div className="flex items-center gap-6 text-[var(--color-ink-muted)]">
              <span className="text-xs uppercase tracking-widest cursor-pointer hover:text-[var(--color-ink-black)]">Instagram</span>
              <span className="text-xs uppercase tracking-widest cursor-pointer hover:text-[var(--color-ink-black)]">Twitter</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
