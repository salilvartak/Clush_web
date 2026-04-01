import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FileText, Shield, Scale, ScrollText, HeartHandshake } from 'lucide-react';

const LegalLayout = () => {
  return (
    <div className="px-6 pb-24">
      <section className="pt-20 pb-32 text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-[Gabarito] font-bold italic leading-tight mb-8">Legal Library.</h1>
        <p className="text-xl text-[var(--color-ink-muted)] leading-relaxed">
           Essential documents that define our relationship with you and our commitment to our community.
        </p>
      </section>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
         <aside className="w-full md:w-80 shrink-0 space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-ink-muted)] px-4 mb-4">Policies & Guidelines</h3>
            <NavLink 
              to="/legal/privacy" 
              className={({ isActive }) => 
                `flex items-center gap-4 p-4 rounded-xl font-bold transition-all border ${isActive ? 'bg-white border-[var(--color-bone)] text-[var(--color-rose)] shadow-sm' : 'border-transparent text-[var(--color-ink-muted)] hover:bg-[var(--color-tan)] hover:translate-x-2'}`
              }
            >
              <Shield className="w-5 h-5" /> Privacy Policy
            </NavLink>
            <NavLink 
              to="/legal/terms" 
              className={({ isActive }) => 
                `flex items-center gap-4 p-4 rounded-xl font-bold transition-all border ${isActive ? 'bg-white border-[var(--color-bone)] text-[var(--color-rose)] shadow-sm' : 'border-transparent text-[var(--color-ink-muted)] hover:bg-[var(--color-tan)] hover:translate-x-2'}`
              }
            >
              <FileText className="w-5 h-5" /> Terms of Service
            </NavLink>
            <NavLink 
              to="/legal/guidelines" 
              className={({ isActive }) => 
                `flex items-center gap-4 p-4 rounded-xl font-bold transition-all border ${isActive ? 'bg-white border-[var(--color-bone)] text-[var(--color-rose)] shadow-sm' : 'border-transparent text-[var(--color-ink-muted)] hover:bg-[var(--color-tan)] hover:translate-x-2'}`
              }
            >
              <ScrollText className="w-5 h-5" /> Community Guidelines
            </NavLink>
            <NavLink 
              to="/legal/safe-dating" 
              className={({ isActive }) => 
                `flex items-center gap-4 p-4 rounded-xl font-bold transition-all border ${isActive ? 'bg-white border-[var(--color-bone)] text-[var(--color-rose)] shadow-sm' : 'border-transparent text-[var(--color-ink-muted)] hover:bg-[var(--color-tan)] hover:translate-x-2'}`
              }
            >
              <HeartHandshake className="w-5 h-5" /> Safe Dating Guide
            </NavLink>
            
            <div className="mt-12 p-8 bg-[var(--color-tan)] rounded-2xl border border-[var(--color-bone)] flex flex-col items-center text-center gap-4">
               <Scale className="w-8 h-8 text-[var(--color-ink-muted)] opacity-50" />
               <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">Questions about our policies? We're happy to clarify.</p>
               <NavLink to="/contact" className="text-sm font-bold text-[var(--color-rose)] underline">Contact Support</NavLink>
            </div>
         </aside>

         <main className="flex-1 min-w-0">
            <Outlet />
         </main>
      </div>
    </div>
  );
};

export default LegalLayout;
