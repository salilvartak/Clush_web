import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  memo,
} from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Timer, ShieldCheck, Zap, Bot, MessageCircle, Bookmark, Check, ChevronDown,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── FEATURE DATA ─────────────────────────────────────────────────────────────
// Edit headlines, descriptions, and screenshots here.
// phone.xPct / yPct: where the phone center lands (0–100% of viewport).
// phone.textSide: 'left' | 'right' — which half holds the text block.
// phone.rotate: degrees of tilt on arrival. phone.scale: arrival scale.
const FEATURES = [
  {
    id: 1,
    eyebrow: 'PRIVACY',
    headline: 'Vanishing\nMedia',
    description:
      'Send images that automatically self-destruct after being viewed. Spontaneous, private sharing — without the fear of photos lingering in chat history.',
    highlights: ['Single or double-view expiry', 'No re-opens, no replays', 'Protects your intimate moments'],
    screenshot: '/features/feature-1.png',
    screenshotAlt: 'Clush vanishing media interface with timed photo and expiry indicator',
    icon: Timer,
    accentColor: '#CD9D8F',
    phone: { xPct: 68, yPct: 52, rotate: 0, scale: 1, textSide: 'left' },
  },
  {
    id: 2,
    eyebrow: 'SECURITY',
    headline: 'Anti-Screenshot\nShield',
    description:
      'Our chat interface is built with active screenshot protection, preventing users from capturing logs or vanishing media — a true safe space.',
    highlights: ['Screenshot detection & blocking', 'Vanishing media protection', 'Chat history stays private'],
    screenshot: '/features/feature-2.png',
    screenshotAlt: 'Clush chat interface with anti-screenshot protection overlay',
    icon: ShieldCheck,
    accentColor: '#B5A89A',
    phone: { xPct: 24, yPct: 58, rotate: -4, scale: 1, textSide: 'right' },
  },
  {
    id: 3,
    eyebrow: 'DISCOVERY',
    headline: 'Gem: Priority\nIcebreaker',
    description:
      "A Gem isn't just a like — it's a message before you even match. Gemmed profiles rise to the top of their list, letting you start the conversation on your terms.",
    highlights: ['Message before matching', 'Rise to the top of their feed', 'Stand out from the crowd'],
    screenshot: '/features/feature-3.png',
    screenshotAlt: 'Clush discovery interface showing Gem priority icebreaker feature',
    icon: Zap,
    accentColor: '#D4AF37',
    phone: { xPct: 66, yPct: 34, rotate: 3, scale: 1, textSide: 'left' },
  },
  {
    id: 4,
    eyebrow: 'TRUST',
    headline: 'AI-Guardian\nSecurity',
    description:
      'Every user is screened at the door. Our AI instantly detects fake profiles and blocks explicit content during signup — keeping your feed pristine.',
    highlights: ['AI-powered fake profile detection', 'Explicit content filtering', 'Social handle blocking'],
    screenshot: '/features/feature-4.png',
    screenshotAlt: 'Clush AI security scan showing profile verification interface',
    icon: Bot,
    accentColor: '#9EAFCD',
    phone: { xPct: 34, yPct: 52, rotate: -2, scale: 1.05, textSide: 'right' },
  },
  {
    id: 5,
    eyebrow: 'CONVERSATION',
    headline: 'Rich Chat\nExperience',
    description:
      'Voice messages with preview mode, swipe-to-reply threading, real-time typing indicators, and read receipts — everything for deeper conversations.',
    highlights: ['Voice messages with preview', 'Swipe-to-reply threading', 'Typing indicators & read receipts'],
    screenshot: '/features/feature-5.png',
    screenshotAlt: 'Clush rich chat interface with voice message and threading',
    icon: MessageCircle,
    accentColor: '#A8CDBA',
    phone: { xPct: 70, yPct: 64, rotate: -3, scale: 1, textSide: 'left' },
  },
  {
    id: 6,
    eyebrow: 'FLEXIBILITY',
    headline: 'Save for\nLater Vault',
    description:
      "Not ready to decide? Save profiles from your Discovery feed to a private vault and revisit whenever you're ready. No permanent left-swipes.",
    highlights: ['Save profiles privately', 'Revisit on your timeline', 'No permanent left-swipes'],
    screenshot: '/features/feature-6.png',
    screenshotAlt: 'Clush vault interface showing saved profiles collection',
    icon: Bookmark,
    accentColor: '#CD9D8F',
    phone: { xPct: 52, yPct: 50, rotate: 0, scale: 1.08, textSide: 'left' },
  },
];

// ─── ARC OFFSETS ──────────────────────────────────────────────────────────────
// Bezier apex offset (px) from the midpoint between consecutive phone positions.
// Controls the "shape" of each travel path — adjust to change the choreography.
const ARC_OFFSETS = [
  null,                      // index 0: initial position, no travel
  { x: -130, y: -160 },     // 0→1: sweep left and upward
  { x:  170, y: -100 },     // 1→2: arc rightward and up
  { x:  -90, y:  100 },     // 2→3: curve left, dip down
  { x:  130, y:   70 },     // 3→4: sweep right and lower
  { x:  -70, y: -120 },     // 4→5: gentle upward arc to center
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const PHONE_W = 256;
const PHONE_H = 530;
const TRAVEL_DURATION = 0.82;       // total phone travel time (seconds)
const APEX_RATIO = 0.42;            // fraction of travel spent reaching arc apex
const CROSSFADE_MS = TRAVEL_DURATION * APEX_RATIO * 1000; // screen crossfade delay

// ─── PIXEL HELPERS ────────────────────────────────────────────────────────────
// Convert a viewport-percentage position to the px translate needed so the
// phone center lands at that point (element starts at top:0 left:0).
const phoneX = (pct) => (pct / 100) * window.innerWidth  - PHONE_W / 2;
const phoneY = (pct) => (pct / 100) * window.innerHeight - PHONE_H / 2;

// ─── useMediaQuery ────────────────────────────────────────────────────────────
function useMediaQuery(maxWidth) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < maxWidth,
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${maxWidth - 1}px)`);
    setMatches(mql.matches);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [maxWidth]);
  return matches;
}

// ─── PhoneWrapper ─────────────────────────────────────────────────────────────
const PhoneWrapper = memo(
  React.forwardRef(function PhoneWrapper({ activeFeature, isTransitioning }, ref) {
    const [displayFeature, setDisplayFeature] = useState(activeFeature);
    const timerRef = useRef(null);
    const Icon = displayFeature.icon;

    // Crossfade the screen image when the phone reaches the arc apex (~midpoint)
    useEffect(() => {
      clearTimeout(timerRef.current);
      if (isTransitioning) {
        timerRef.current = setTimeout(() => setDisplayFeature(activeFeature), CROSSFADE_MS);
      } else {
        setDisplayFeature(activeFeature);
      }
      return () => clearTimeout(timerRef.current);
    }, [activeFeature, isTransitioning]);

    return (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: PHONE_W,
          height: PHONE_H,
          willChange: 'transform',
          zIndex: 30,
          pointerEvents: 'none',
        }}
      >
        {/* Ambient glow — color crossfades with accentColor */}
        <div
          style={{
            position: 'absolute',
            inset: '-50px',
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${activeFeature.accentColor}52 0%, transparent 65%)`,
            filter: 'blur(30px)',
            transition: 'background 0.9s ease',
            zIndex: -1,
          }}
        />

        {/* iPhone chassis */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(155deg, #2e2e2e 0%, #191919 100%)',
            borderRadius: 44,
            padding: 9,
            boxShadow: `
              0 0 0 1.5px rgba(255,255,255,0.12),
              0 0 0 3px rgba(0,0,0,0.6),
              0 50px 100px rgba(0,0,0,0.42),
              0 24px 48px rgba(0,0,0,0.22),
              inset 0 1px 0 rgba(255,255,255,0.08)
            `,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Side buttons (decorative) */}
          <div style={{ position:'absolute', left:-2.5, top:96,  width:2.5, height:30, background:'#3c3c3c', borderRadius:'2px 0 0 2px' }} />
          <div style={{ position:'absolute', left:-2.5, top:136, width:2.5, height:30, background:'#3c3c3c', borderRadius:'2px 0 0 2px' }} />
          <div style={{ position:'absolute', right:-2.5, top:116, width:2.5, height:52, background:'#3c3c3c', borderRadius:'0 2px 2px 0' }} />

          {/* Screen */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 36,
              overflow: 'hidden',
              background: `linear-gradient(150deg, ${displayFeature.accentColor}20 0%, ${displayFeature.accentColor}38 100%)`,
              position: 'relative',
              transition: 'background 0.5s ease',
            }}
          >
            {/* Dynamic island */}
            <div style={{ position:'absolute', top:11, left:'50%', transform:'translateX(-50%)', width:88, height:26, background:'#000', borderRadius:13, zIndex:10 }} />

            {/* Feature screenshot */}
            <img
              src={displayFeature.screenshot}
              alt={displayFeature.screenshotAlt}
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />

            {/* Placeholder UI — visible when screenshot is missing */}
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, padding:'52px 20px 20px' }}>
              <div style={{ width:52, height:52, borderRadius:16, background:`${displayFeature.accentColor}28`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon size={24} color={displayFeature.accentColor} strokeWidth={1.5} />
              </div>
              <span style={{ fontFamily:'Gabarito, sans-serif', fontSize:13, fontWeight:700, color:'#45413E', textAlign:'center', lineHeight:1.35 }}>
                {displayFeature.headline.replace('\n', ' ')}
              </span>
              <div style={{ width:'82%', display:'flex', flexDirection:'column', gap:8 }}>
                {[100, 76, 88].map((w, i) => (
                  <div key={i} style={{ height:7, borderRadius:3.5, background:`${displayFeature.accentColor}30`, width:`${w}%` }} />
                ))}
              </div>
            </div>

            {/* Home bar */}
            <div style={{ position:'absolute', bottom:7, left:'50%', transform:'translateX(-50%)', width:96, height:4, background:'rgba(69,65,62,0.28)', borderRadius:2, zIndex:10 }} />
          </div>
        </div>
      </div>
    );
  }),
);

// ─── BackgroundLayer ──────────────────────────────────────────────────────────
const BackgroundLayer = memo(function BackgroundLayer({ activeIndex }) {
  return (
    <div aria-hidden="true" style={{ position:'absolute', inset:0, background:'#EBE7E1', zIndex:0 }}>
      {FEATURES.map((f, i) => (
        <div
          key={f.id}
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 52% 52% at ${f.phone.textSide === 'right' ? '28%' : '72%'} 50%, ${f.accentColor}1E 0%, transparent 72%)`,
            opacity: i === activeIndex ? 1 : 0,
            transition: 'opacity 0.85s ease',
          }}
        />
      ))}
    </div>
  );
});

// ─── ProgressIndicator ────────────────────────────────────────────────────────
const ProgressIndicator = memo(function ProgressIndicator({ activeIndex, onDotClick }) {
  return (
    <nav
      aria-label="Feature navigation"
      style={{ position:'absolute', right:28, top:'50%', transform:'translateY(-50%)', zIndex:40, display:'flex', flexDirection:'column', gap:12, alignItems:'center' }}
    >
      {FEATURES.map((f, i) => (
        <button
          key={f.id}
          onClick={() => onDotClick(i)}
          aria-label={`Go to feature ${i + 1}: ${f.headline.replace('\n', ' ')}`}
          aria-current={i === activeIndex ? 'step' : undefined}
          style={{
            width: i === activeIndex ? 6 : 5,
            height: i === activeIndex ? 22 : 5,
            borderRadius: 999,
            background: i === activeIndex ? '#CD9D8F' : '#E6DFD5',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            padding: 0,
          }}
          onFocus={(e) => { e.currentTarget.style.outline = '2px solid #CD9D8F'; e.currentTarget.style.outlineOffset = '3px'; }}
          onBlur={(e) => { e.currentTarget.style.outline = 'none'; }}
        />
      ))}
    </nav>
  );
});

// ─── FeatureTextBlock ─────────────────────────────────────────────────────────
const FeatureTextBlock = memo(function FeatureTextBlock({ feature, isActive }) {
  const isRight = feature.phone.textSide === 'right';

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, x: isRight ? 52 : -52 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRight ? 20 : -20, transition: { duration: 0.22 } }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            ...(isRight
              ? { left: '50%', right: 0, paddingLeft: '6%', paddingRight: '5%' }
              : { left: 0, right: '50%', paddingLeft: '7%', paddingRight: '5%' }),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            zIndex: 20,
          }}
        >
          {/* Eyebrow label */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.45 }}
            style={{ display:'inline-flex', alignItems:'center', gap:8, fontFamily:'Figtree, sans-serif', fontSize:10.5, fontWeight:700, letterSpacing:'0.16em', color:feature.accentColor, textTransform:'uppercase', marginBottom:16 }}
          >
            <span style={{ width:20, height:2, background:feature.accentColor, borderRadius:1, display:'inline-block' }} />
            {feature.eyebrow}
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily:'Gabarito, sans-serif', fontSize:'clamp(2.2rem, 3.6vw, 3.8rem)', fontWeight:800, letterSpacing:'-0.04em', color:'#45413E', lineHeight:1.06, marginBottom:20, fontStyle:'italic', whiteSpace:'pre-line' }}
          >
            {feature.headline}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.52 }}
            style={{ fontFamily:'Figtree, sans-serif', fontSize:'clamp(0.9rem, 1.15vw, 1.1rem)', color:'#756F68', lineHeight:1.72, maxWidth:400, marginBottom:28 }}
          >
            {feature.description}
          </motion.p>

          {/* Highlights with staggered entry */}
          <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
            {feature.highlights.map((hl, i) => (
              <motion.div
                key={hl}
                initial={{ opacity: 0, x: isRight ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.42 + i * 0.1, duration: 0.42 }}
                style={{ display:'flex', alignItems:'center', gap:10 }}
              >
                <div style={{ width:20, height:20, borderRadius:6, background:`${feature.accentColor}20`, border:`1.5px solid ${feature.accentColor}50`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Check size={10} color={feature.accentColor} strokeWidth={2.5} />
                </div>
                <span style={{ fontFamily:'Figtree, sans-serif', fontSize:'0.86rem', color:'#756F68', fontWeight:500 }}>{hl}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// ─── FeaturesDesktop ──────────────────────────────────────────────────────────
function FeaturesDesktop() {
  const sectionRef        = useRef(null);
  const stickyRef         = useRef(null);
  const phoneRef          = useRef(null);
  const activeIndexRef    = useRef(0);
  const activeTimelineRef = useRef(null);
  const [activeIndex, setActiveIndex]       = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Place phone at Feature 0 before first paint (useLayoutEffect = before browser paint)
  useLayoutEffect(() => {
    if (!phoneRef.current) return;
    const { xPct, yPct, rotate, scale } = FEATURES[0].phone;
    gsap.set(phoneRef.current, { x: phoneX(xPct), y: phoneY(yPct), rotation: rotate, scale });
  }, []);

  // Animate phone along a two-phase arc to the target feature position
  const animatePhone = useCallback((toIdx, fromIdx) => {
    if (!phoneRef.current) return;

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
      activeTimelineRef.current = null;
    }

    // Skip arc animation for large jumps (fast scroll / dot click)
    if (Math.abs(toIdx - fromIdx) > 1) {
      const { xPct, yPct, rotate, scale } = FEATURES[toIdx].phone;
      gsap.to(phoneRef.current, { x: phoneX(xPct), y: phoneY(yPct), rotation: rotate, scale, duration: 0.45, ease: 'power2.out' });
      return;
    }

    const from = FEATURES[fromIdx].phone;
    const to   = FEATURES[toIdx].phone;
    const arc  = ARC_OFFSETS[toIdx] ?? { x: 0, y: -80 };

    const fX = phoneX(from.xPct), fY = phoneY(from.yPct);
    const tX = phoneX(to.xPct),   tY = phoneY(to.yPct);

    // Arc apex = midpoint between positions + offset that defines curve shape
    const apexX   = (fX + tX) / 2 + arc.x;
    const apexY   = (fY + tY) / 2 + arc.y;
    const apexRot = (from.rotate + to.rotate) / 2 + (arc.x > 0 ? 7 : -7);

    const t1 = TRAVEL_DURATION * APEX_RATIO;        // time to reach apex
    const t2 = TRAVEL_DURATION * (1 - APEX_RATIO);  // time from apex to landing

    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => { setIsTransitioning(false); activeTimelineRef.current = null; },
    });

    // Phase 1 — lift toward arc apex (scale down slightly for depth)
    tl.to(phoneRef.current, {
      x: apexX, y: apexY, rotation: apexRot, scale: 0.83,
      duration: t1, ease: 'power2.in',
    });

    // Phase 2 — descend to landing position (scale back up, settle to target rotation)
    tl.to(phoneRef.current, {
      x: tX, y: tY, rotation: to.rotate, scale: to.scale,
      duration: t2, ease: 'power3.out',
    });

    activeTimelineRef.current = tl;
  }, []);

  // ScrollTrigger: pins the inner container for the section's full scroll distance.
  // Using GSAP pin (position:fixed) instead of CSS sticky because the Layout's
  // overflow-x:hidden ancestor would break CSS sticky in all browsers.
  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      // GSAP pins the inner div (sets position:fixed), escaping overflow containers
      pin: stickyRef.current,
      pinSpacing: false, // section already has explicit 600vh height
      // Snap to each feature at equal progress intervals
      snap: {
        snapTo: 1 / (FEATURES.length - 1),
        duration: { min: 0.3, max: 0.7 },
        delay: 0.05,
        ease: 'power2.inOut',
      },
      onUpdate(self) {
        const newIdx = Math.round(self.progress * (FEATURES.length - 1));
        if (newIdx !== activeIndexRef.current) {
          animatePhone(newIdx, activeIndexRef.current);
          activeIndexRef.current = newIdx;
          setActiveIndex(newIdx);
        }
      },
    });

    return () => trigger.kill();
  }, [animatePhone]);

  // Snap phone to correct position after viewport resize
  useEffect(() => {
    const onResize = () => {
      if (!phoneRef.current) return;
      const { xPct, yPct, rotate, scale } = FEATURES[activeIndexRef.current].phone;
      gsap.set(phoneRef.current, { x: phoneX(xPct), y: phoneY(yPct), rotation: rotate, scale });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Dot click → smooth scroll to that feature's position within the section
  const handleDotClick = useCallback((idx) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    // Each feature occupies 1 × viewport height of scroll distance
    window.scrollTo({ top: sectionTop + idx * window.innerHeight, behavior: 'smooth' });
  }, []);

  const activeFeature = FEATURES[activeIndex];

  return (
    // -mt-24 cancels Layout's <main pt-24> so the hero panel fills the viewport on load
    <div className="-mt-24">

      {/* ── Hero panel ─────────────────────────────────────────────────────── */}
      <section
        style={{ height: '100vh' }}
        className="relative flex flex-col items-center justify-center text-center"
      >
        <div
          aria-hidden="true"
          style={{ position:'absolute', inset:0, zIndex:0, background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(205,157,143,0.13) 0%, transparent 70%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl px-8 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 clush-glass rounded-full border border-[var(--color-bone)] mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose)] animate-pulse" />
            <span className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-ink-black)]">
              Planned Features · Coming Soon
            </span>
          </div>

          <h1 className="text-6xl xl:text-8xl font-[Gabarito] font-bold italic leading-[0.94] mb-8 text-[var(--color-ink-black)]">
            Crafted for<br />
            <span className="clush-text-gradient">Quality</span><br />
            Conversations.
          </h1>

          <p className="text-lg text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed max-w-md mx-auto mb-12">
            We've reimagined dating from the ground up — intentionality,
            authenticity, and visual elegance.
          </p>

          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-[var(--color-ink-muted)]"
          >
            <span className="font-[Figtree] text-[10px] uppercase tracking-[0.18em]">scroll to explore</span>
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Feature showcase ────────────────────────────────────────────────── */}
      {/*
        This section is FEATURES.length × 100vh tall.
        The inner div is position:sticky so it pins to the top while the
        section scrolls. ScrollTrigger maps scroll progress → active feature.
        Phone (position:absolute inside sticky) is animated by GSAP.
      */}
      <section
        ref={sectionRef}
        style={{ height: `${FEATURES.length * 100}vh`, position: 'relative' }}
      >
        <div ref={stickyRef} style={{ position:'relative', height:'100vh', overflow:'hidden' }}>

          {/* Ambient background — crossfades between feature accent colors */}
          <BackgroundLayer activeIndex={activeIndex} />

          {/* Large feature number in background */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '6%',
              ...(activeFeature.phone.textSide === 'right' ? { left:'5%' } : { right:'5%' }),
              fontFamily: 'Gabarito, sans-serif',
              fontSize: 'clamp(8rem, 14vw, 15rem)',
              fontWeight: 900,
              fontStyle: 'italic',
              color: `${activeFeature.accentColor}0F`,
              lineHeight: 1,
              userSelect: 'none',
              zIndex: 1,
              transition: 'color 0.7s ease',
            }}
          >
            {String(activeIndex + 1).padStart(2, '0')}
          </div>

          {/* Text panels — stacked, AnimatePresence shows only the active one */}
          {FEATURES.map((f, i) => (
            <FeatureTextBlock key={f.id} feature={f} isActive={activeIndex === i} />
          ))}

          {/* Traveling phone mockup */}
          <PhoneWrapper
            ref={phoneRef}
            activeFeature={activeFeature}
            isTransitioning={isTransitioning}
          />

          {/* Side progress dots */}
          <ProgressIndicator activeIndex={activeIndex} onDotClick={handleDotClick} />
        </div>
      </section>

      {/* ── CTA section ─────────────────────────────────────────────────────── */}
      <section className="flex items-center justify-center min-h-screen py-24 px-8">
        <div className="max-w-5xl w-full bg-[var(--color-tan)] rounded-[40px] p-12 lg:p-20 border border-[var(--color-bone)] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-rose-pale)] blur-[100px] opacity-40 -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-gold)] blur-[120px] opacity-5 -z-10" />

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl lg:text-6xl font-[Gabarito] font-bold italic mb-16 leading-tight"
          >
            Modern elegance,<br className="hidden md:block" /> ancient chemistry.
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { word: 'Only',   sub: 'VERIFIED USERS',             color: 'var(--color-rose)' },
              { word: 'Real',   sub: 'CONNECTIONS, NO CATFISHING', color: 'var(--color-gold)' },
              { word: 'Always', sub: 'PROTECTED BY AI',            color: 'var(--color-rose)' },
              { word: 'Fair',   sub: 'ACCESSIBLE PRICING',         color: 'var(--color-ink-black)' },
            ].map(({ word, sub, color }, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i, duration: 0.6 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div
                  style={{ color, fontFamily:'Gabarito, sans-serif', fontWeight:800, fontStyle:'italic' }}
                  className="text-4xl lg:text-5xl transition-transform duration-500 group-hover:scale-110"
                >
                  {word}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">{sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FeaturesMobile ───────────────────────────────────────────────────────────
// Shown on viewports < 1024px and when prefers-reduced-motion is set.
// Simple vertical stack — no pinning, no traveling phone, no GSAP.
function FeaturesMobile() {
  return (
    <div className="px-5 pb-24">
      {/* Hero */}
      <section className="pt-6 pb-14 text-center">
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 clush-glass rounded-full border border-[var(--color-bone)] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose)] animate-pulse" />
            <span className="font-[Figtree] text-[11px] font-bold uppercase tracking-[0.12em]">Planned Features · Coming Soon</span>
          </div>
          <h1 className="text-4xl font-[Gabarito] font-bold italic leading-tight mb-4">
            Crafted for Quality Conversations.
          </h1>
          <p className="text-base text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed">
            We've reimagined dating from the ground up.
          </p>
        </motion.div>
      </section>

      {/* Feature cards */}
      <div className="max-w-lg mx-auto space-y-16">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity:0, y:36 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-50px' }}
              transition={{ duration:0.65, ease:[0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-7 text-center"
            >
              {/* Mini phone mockup */}
              <div style={{ width:180, height:360, background:'linear-gradient(145deg, #2e2e2e, #191919)', borderRadius:34, padding:7, boxShadow:'0 0 0 1px rgba(255,255,255,0.1), 0 28px 56px rgba(0,0,0,0.22)', flexShrink:0 }}>
                <div style={{ width:'100%', height:'100%', borderRadius:28, overflow:'hidden', background:`linear-gradient(145deg, ${feature.accentColor}20, ${feature.accentColor}38)`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, position:'relative', padding:'44px 16px 16px' }}>
                  <div style={{ position:'absolute', top:9, left:'50%', transform:'translateX(-50%)', width:66, height:19, background:'#000', borderRadius:9.5 }} />
                  <img
                    src={feature.screenshot}
                    alt={feature.screenshotAlt}
                    style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div style={{ width:40, height:40, borderRadius:12, background:`${feature.accentColor}25`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={18} color={feature.accentColor} strokeWidth={1.5} />
                  </div>
                  <span style={{ fontFamily:'Gabarito, sans-serif', fontSize:11, fontWeight:700, color:'#45413E', textAlign:'center', lineHeight:1.3 }}>
                    {feature.headline.replace('\n', ' ')}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div>
                <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:'Figtree, sans-serif', fontSize:10, fontWeight:700, letterSpacing:'0.16em', color:feature.accentColor, textTransform:'uppercase', marginBottom:12 }}>
                  <span style={{ width:16, height:1.5, background:feature.accentColor, display:'inline-block' }} />
                  {feature.eyebrow}
                </span>
                <h2 className="text-3xl font-[Gabarito] font-bold italic leading-tight mb-4" style={{ whiteSpace:'pre-line' }}>
                  {feature.headline}
                </h2>
                <p className="text-sm text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed mb-5">
                  {feature.description}
                </p>
                <div className="flex flex-col gap-3 items-start text-left">
                  {feature.highlights.map((hl) => (
                    <div key={hl} className="flex items-center gap-3">
                      <div style={{ width:18, height:18, borderRadius:5, background:`${feature.accentColor}20`, border:`1.5px solid ${feature.accentColor}50`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <Check size={10} color={feature.accentColor} strokeWidth={2.5} />
                      </div>
                      <span className="text-xs text-[var(--color-ink-muted)] font-[Figtree] font-medium">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <section className="mt-20 bg-[var(--color-tan)] rounded-[32px] p-8 border border-[var(--color-bone)] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-rose-pale)] blur-[80px] opacity-40" />
        <h2 className="text-3xl font-[Gabarito] font-bold italic mb-10 relative z-10 leading-tight">
          Modern elegance,<br />ancient chemistry.
        </h2>
        <div className="grid grid-cols-2 gap-6 relative z-10">
          {[
            { word:'Only',   sub:'VERIFIED USERS',     color:'var(--color-rose)' },
            { word:'Real',   sub:'NO CATFISHING',       color:'var(--color-gold)' },
            { word:'Always', sub:'PROTECTED BY AI',     color:'var(--color-rose)' },
            { word:'Fair',   sub:'ACCESSIBLE PRICING',  color:'var(--color-ink-black)' },
          ].map(({ word, sub, color }) => (
            <div key={word} className="flex flex-col items-center gap-2">
              <div style={{ color, fontFamily:'Gabarito, sans-serif', fontSize:'2rem', fontWeight:800, fontStyle:'italic' }}>{word}</div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Features (route component) ───────────────────────────────────────────────
const Features = () => {
  const isMobile = useMediaQuery(1024);
  const prefersReducedMotion = useReducedMotion();
  if (isMobile || prefersReducedMotion) return <FeaturesMobile />;
  return <FeaturesDesktop />;
};

export default Features;
