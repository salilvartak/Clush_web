import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Features from './pages/Features';
import Safety from './pages/Safety';
import About from './pages/About';
import Contact from './pages/Contact';
import Waitlist from './pages/Waitlist';
import LegalLayout from './pages/Legal/LegalLayout';
import { PrivacyPolicy, TermsOfService, CommunityGuidelines } from './pages/Legal/Policies';

import ScrollToTop from './components/ScrollToTop';

import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join" element={<Waitlist />} />

          {/* Legal Pages */}
          <Route path="/legal" element={<LegalLayout />}>
            <Route index element={<Navigate to="/legal/privacy" replace />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="guidelines" element={<CommunityGuidelines />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
