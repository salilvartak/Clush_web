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

import imgViewOnce      from '../assets/Features/View once.jpeg';
import imgAntiScreenshot from '../assets/Features/Anti Screenshot.jpeg';
import imgGem           from '../assets/Features/Gem.jpeg';
import imgFaceVerify    from '../assets/Features/Face verification.jpeg';
import imgRichChat      from '../assets/Features/Rich Chat.jpeg';
import imgSave          from '../assets/Features/Save.jpeg';

gsap.registerPlugin(ScrollTrigger);

// ─── ANIMATED ICON COMPONENT ──────────────────────────────────────────────────
const AnimatedIcon = ({ type, color, size = 32 }) => {
  const iconVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] } }
  };

  const renderPath = (d) => (
    <motion.path
      d={d}
      variants={iconVariants}
    />
  );

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="initial"
      animate="animate"
    >
      {type === 'face' && (
        <>
          {renderPath("M8 10h.01M16 10h.01M9 16c.55.67 1.5 1 3 1s2.45-.33 3-1")}
          {renderPath("M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2")}
        </>
      )}
      {type === 'image' && (
        <>
          {renderPath("M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21")}
          {renderPath("M3 21l18-18")}
        </>
      )}
      {type === 'shield' && (
        <>
          {renderPath("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z")}
          {renderPath("M9 12l2 2 4-4")}
        </>
      )}
      {type === 'shield-face' && (
        <>
          {renderPath("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z")}
          {renderPath("M8 11h.01M16 11h.01M9 15c.55.67 1.5 1 3 1s2.45-.33 3-1")}
        </>
      )}
      {type === 'timer' && renderPath("M12 2v4M12 12l3 3M19.07 4.93l-1.41 1.41M4.93 19.07l-1.41 1.41M2 12h4M18 12h4M4.93 4.93l1.41 1.41M19.07 19.07l1.41 1.41M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z")}
      {type === 'zap' && renderPath("M13 2L3 14h9l-1 8 10-12h-9l1-8z")}
      {type === 'lock' && renderPath("M12 11v4M7 10V7a5 5 0 0 1 10 0v3M5 10h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z")}
      {type === 'ban' && renderPath("M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM4.93 4.93l14.14 14.14")}
      {type === 'eye-off' && renderPath("M9.88 9.88L9 9a3 3 0 1 0 4.24 4.24l-1 1M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M1 1l22 22")}
      {type === 'message' && renderPath("M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z")}
      {type === 'trending-up' && renderPath("M23 6l-9.5 9.5-5-5L1 18M17 6h6v6")}
      {type === 'mic' && renderPath("M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8")}
      {type === 'reply' && renderPath("M9 10l-5 5 5 5M4 15h11a5 5 0 0 0 5-5 5 5 0 0 0-5-5")}
      {type === 'history' && renderPath("M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5M12 7v5l4 2")}
    </motion.svg>
  );
};


// ─── FEATURE DATA ─────────────────────────────────────────────────────────────
// Edit headlines, descriptions, and screenshots here.
// phone.xPct / yPct: where the phone center lands (0–100% of viewport).
// phone.textSide: 'left' | 'right' — which half holds the text block.
// phone.rotate: degrees of tilt on arrival. phone.scale: arrival scale.
const FEATURES = [
  {
    id: 1,
    eyebrow: 'PRIVACY ARCHITECTURE',
    headline: 'Vanishing\nMedia',
    description:
      'Send images that automatically self-destruct after being viewed. Spontaneous, private sharing — without the fear of photos lingering in chat history.',
    verifiedBox: {
      title: 'Zero Persistence',
      text: 'Images self-destruct after viewing. No traces left behind in the cloud or device.',
    },
    footerHighlights: [
      { title: 'Self-Destruct', sub: 'Timed media expiry', icon: 'timer' },
      { title: 'One-Time View', sub: 'No replays allowed', icon: 'zap' },
      { title: 'End-to-End', sub: 'Encrypted ephemeral data', icon: 'lock' },
    ],
    screenshot: imgViewOnce,
    screenshotAlt: 'Clush vanishing media interface with timed photo and expiry indicator',
    icon: Timer,
    accentColor: '#CD9D8F',
    phone: { xPct: 68, yPct: 52, rotate: 0, scale: 1, textSide: 'left' },
  },
  {
    id: 2,
    eyebrow: 'PROTECTION PROTOCOL',
    headline: 'Anti-Screenshot\nShield',
    description:
      'Our chat interface is built with active screenshot protection, preventing users from capturing logs or vanishing media — a true safe space.',
    verifiedBox: {
      title: 'Total Privacy',
      text: 'Active blocking prevents any screenshot attempts. Your moments stay yours.',
    },
    footerHighlights: [
      { title: 'Detection', sub: 'Instant alert on attempts', icon: 'shield' },
      { title: 'Blocking', sub: 'Blacked out captures', icon: 'ban' },
      { title: 'Safety First', sub: 'No leaks, no exposure', icon: 'eye-off' },
    ],
    screenshot: imgAntiScreenshot,
    screenshotAlt: 'Clush chat interface with anti-screenshot protection overlay',
    icon: ShieldCheck,
    accentColor: '#B5A89A',
    phone: { xPct: 24, yPct: 58, rotate: -4, scale: 1, textSide: 'right' },
  },
  {
    id: 3,
    eyebrow: 'DISCOVERY ENGINE',
    headline: 'Gem: Priority\nIcebreaker',
    description:
      "A Gem isn't just a like — it's a message before you even match. Gemmed profiles rise to the top of their list, letting you start the conversation on your terms.",
    verifiedBox: {
      title: 'High Intent',
      text: 'Gems signal genuine interest, ensuring you stand out in a crowded feed.',
    },
    footerHighlights: [
      { title: 'Priority Entry', sub: 'Rise to the top of the feed', icon: 'zap' },
      { title: 'Pre-Match Message', sub: 'Talk before you connect', icon: 'message' },
      { title: 'Better Odds', sub: '3x higher response rate', icon: 'trending-up' },
    ],
    screenshot: imgGem,
    screenshotAlt: 'Clush discovery interface showing Gem priority icebreaker feature',
    icon: Zap,
    accentColor: '#D4AF37',
    phone: { xPct: 66, yPct: 54, rotate: 3, scale: 1, textSide: 'left' },
  },
  {
    id: 4,
    eyebrow: 'FACE VERIFICATION LOGIC',
    headline: 'Every user\nwill be screened\nat the door.',
    description:
      'During signup, our system instantly verifies your face to block fake profiles and any images containing explicit content or social handles, ensuring your discovery feed is pristine and authentic from day one.',
    verifiedBox: {
      title: 'Verified & Safe',
      text: 'Real people only. No fakes, no inappropriate content.',
    },
    footerHighlights: [
      { title: 'Face Verification', sub: 'Verifies you at signup', icon: 'face' },
      { title: 'Image Screening', sub: 'Blocks explicit content', icon: 'image' },
      { title: 'Authentic Experience', sub: 'Pristine feeds. Real connections.', icon: 'shield' },
    ],
    screenshot: imgFaceVerify,
    screenshotAlt: 'Clush AI security scan showing profile verification interface',
    icon: Bot,
    accentColor: '#9EAFCD',
    phone: { xPct: 34, yPct: 52, rotate: -2, scale: 1.05, textSide: 'right' },
  },
  {
    id: 5,
    eyebrow: 'CONVERSATION FLOW',
    headline: 'Rich Chat\nExperience',
    description:
      'Voice messages with preview mode, swipe-to-reply threading, real-time typing indicators, and read receipts — everything for deeper conversations.',
    verifiedBox: {
      title: 'Deeper Bonding',
      text: 'Our chat tools are designed for expression beyond simple text messages.',
    },
    footerHighlights: [
      { title: 'Voice Messages', sub: 'Hear the emotion', icon: 'mic' },
      { title: 'Threaded Reply', sub: 'Never lose the context', icon: 'reply' },
      { title: 'Real-time', sub: 'Typing and read status', icon: 'zap' },
    ],
    screenshot: imgRichChat,
    screenshotAlt: 'Clush rich chat interface with voice message and threading',
    icon: MessageCircle,
    accentColor: '#A8CDBA',
    phone: { xPct: 70, yPct: 54, rotate: -3, scale: 1, textSide: 'left' },
  },
  {
    id: 6,
    eyebrow: 'FLEXIBILITY TOOLS',
    headline: 'Save for\nLater Vault',
    description:
      "Not ready to decide? Save profiles from your Discovery feed to a private vault and revisit whenever you're ready. No permanent left-swipes.",
    verifiedBox: {
      title: 'Zero Pressure',
      text: 'Take your time to decide. Your potential matches wait in your private vault.',
    },
    footerHighlights: [
      { title: 'Private Vault', sub: 'Store profiles securely', icon: 'lock' },
      { title: 'Unlimited Time', sub: 'No expiry on saved profiles', icon: 'timer' },
      { title: 'Revisit Anytime', sub: 'Pick up where you left off', icon: 'history' },
    ],
    screenshot: imgSave,
    screenshotAlt: 'Clush vault interface showing saved profiles collection',
    icon: Bookmark,
    accentColor: '#CD9D8F',
    phone: { xPct: 62, yPct: 55, rotate: 0, scale: 1.08, textSide: 'left' },
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

            {/* Feature screenshot */}
            <img
              src={displayFeature.screenshot}
              alt=""
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />

            {/* Placeholder UI — visible when screenshot is missing */}
            

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
            style={{ fontFamily:'Gabarito, sans-serif', fontSize:'clamp(2.2rem, 3.6vw, 3.8rem)', fontWeight:800, letterSpacing:'-0.04em', color:'#45413E', lineHeight:1.06, marginBottom:20, fontStyle:'italic', whiteSpace:'pre-line', position: 'relative' }}
          >
            {feature.headline}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ height: 3, background: '#D4AF37', marginTop: 12, borderRadius: 2 }}
            />
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.52 }}
            style={{ fontFamily:'Figtree, sans-serif', fontSize:'clamp(0.9rem, 1.15vw, 1.1rem)', color:'#756F68', lineHeight:1.72, maxWidth:480, marginBottom:28 }}
          >
            {feature.description}
          </motion.p>

          {/* Verified Box */}
          {feature.verifiedBox && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ 
                background: `${feature.accentColor}15`, 
                borderRadius: 24, 
                padding: '20px 24px', 
                marginBottom: 40,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                border: `1px solid ${feature.accentColor}25`,
                maxWidth: 480
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${feature.accentColor}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AnimatedIcon type="shield-face" color={feature.accentColor} size={28} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'Gabarito, sans-serif', fontSize: 16, fontWeight: 700, color: feature.accentColor, marginBottom: 4 }}>
                  {feature.verifiedBox.title}
                </h4>
                <p style={{ fontFamily: 'Figtree, sans-serif', fontSize: 13, color: '#756F68', lineHeight: 1.4 }}>
                  {feature.verifiedBox.text}
                </p>
              </div>
            </motion.div>
          )}

          {/* Footer Highlights (Columns) */}
          {feature.footerHighlights && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 600 }}>
              {feature.footerHighlights.map((hl, i) => (
                <motion.div
                  key={hl.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.1, duration: 0.5 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${feature.accentColor}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${feature.accentColor}20` }}>
                    <AnimatedIcon type={hl.icon} color={feature.accentColor} size={24} />
                  </div>
                  <div>
                    <h5 style={{ fontFamily: 'Gabarito, sans-serif', fontSize: 13, fontWeight: 700, color: '#45413E', marginBottom: 4 }}>
                      {hl.title}
                    </h5>
                    <p style={{ fontFamily: 'Figtree, sans-serif', fontSize: 11, color: '#756F68', lineHeight: 1.4 }}>
                      {hl.sub}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
            <span className="clush-text-gradient p-6">Quality</span><br />
            Conversations.
          </h1>

          <p className="text-lg text-[var(--color-ink-muted)] font-[Figtree] leading-relaxed max-w-md mx-auto mb-12">
            We've reimagined dating from the ground up intentionality,
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
// Each feature occupies its own full-screen section. IntersectionObserver
// triggers reveal animations as sections scroll into view.
function FeaturesMobile() {
  const [activeIndex, setActiveIndex]   = useState(0);
  const [visibleSet,  setVisibleSet]    = useState(() => new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    const ios = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setActiveIndex(i);
            setVisibleSet(prev => { const s = new Set(prev); s.add(i); return s; });
          }
        },
        { threshold: 0.35 },
      );
      io.observe(el);
      return io;
    });
    return () => ios.forEach(o => o?.disconnect());
  }, []);

  return (
    <div className="-mt-24" style={{ background: '#EBE7E1', position: 'relative' }}>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '88px 28px 52px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(205,157,143,0.20)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -50, left: -50, width: 240, height: 240, borderRadius: '50%', background: 'rgba(212,175,55,0.11)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 360 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', background: 'rgba(235,231,225,0.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: 999, border: '1px solid #E6DFD5', marginBottom: 32 }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose)] animate-pulse" />
            <span style={{ fontFamily: 'Figtree, sans-serif', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#45413E' }}>
              Planned Features · Coming Soon
            </span>
          </div>

          <h1 style={{ fontFamily: 'Gabarito, sans-serif', fontSize: 'clamp(3rem, 13vw, 4rem)', fontWeight: 800, fontStyle: 'italic', letterSpacing: '-0.04em', color: '#45413E', lineHeight: 1.02, marginBottom: 20 }}>
            Crafted for<br />
            <span className="clush-text-gradient">Quality</span><br />
            Conversations.
          </h1>

          <p style={{ fontFamily: 'Figtree, sans-serif', fontSize: 15, color: '#756F68', lineHeight: 1.68, marginBottom: 44 }}>
            We've reimagined dating from the ground up — intentionality, authenticity, and visual elegance.
          </p>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: '#B5ADA5' }}
          >
            <span style={{ fontFamily: 'Figtree, sans-serif', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>scroll to explore</span>
            <ChevronDown size={13} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Fixed side nav dots ─────────────────────────────── */}
      <nav
        aria-label="Feature navigation"
        style={{ position: 'fixed', right: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: 9, alignItems: 'center' }}
      >
        {FEATURES.map((f, i) => (
          <button
            key={f.id}
            onClick={() => sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth' })}
            aria-label={`Go to feature: ${f.headline.replace('\n', ' ')}`}
            style={{ width: i === activeIndex ? 5 : 4, height: i === activeIndex ? 18 : 4, borderRadius: 999, background: i === activeIndex ? f.accentColor : '#D4C9BF', border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)', padding: 0 }}
          />
        ))}
      </nav>

      {/* ── Feature sections ────────────────────────────────── */}
      {FEATURES.map((feature, i) => {
        const isVisible = visibleSet.has(i);
        return (
          <section
            key={feature.id}
            ref={el => { sectionRefs.current[i] = el; }}
            style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: `linear-gradient(170deg, ${feature.accentColor}1C 0%, #EBE7E1 55%)` }}
          >
            {/* Oversized faded background number */}
            <div aria-hidden="true" style={{ position: 'absolute', top: -16, right: -16, fontFamily: 'Gabarito, sans-serif', fontSize: '58vw', fontWeight: 900, fontStyle: 'italic', color: `${feature.accentColor}11`, lineHeight: 0.86, userSelect: 'none', pointerEvents: 'none', zIndex: 0 }}>
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '36px 24px 0' }}
            >
              <span style={{ width: 18, height: 2, background: feature.accentColor, borderRadius: 1, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Figtree, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: feature.accentColor, textTransform: 'uppercase' }}>
                {feature.eyebrow}
              </span>
            </motion.div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.92 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', padding: '18px 24px 0' }}
            >
              {/* Ambient glow behind phone */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 260, height: 260, borderRadius: '50%', background: `radial-gradient(ellipse at center, ${feature.accentColor}42 0%, transparent 65%)`, filter: 'blur(30px)', zIndex: 0, pointerEvents: 'none' }} />

              {/* Chassis */}
              <div style={{ width: 200, height: 408, background: 'linear-gradient(155deg, #2e2e2e 0%, #191919 100%)', borderRadius: 42, padding: 8, boxShadow: `0 0 0 1.5px rgba(255,255,255,0.13), 0 0 0 3px rgba(0,0,0,0.55), 0 50px 80px rgba(0,0,0,0.35), 0 20px 40px ${feature.accentColor}32`, position: 'relative', zIndex: 1 }}>
                <div style={{ position: 'absolute', left: -2.5, top: 84,  width: 2.5, height: 26, background: '#3c3c3c', borderRadius: '2px 0 0 2px' }} />
                <div style={{ position: 'absolute', left: -2.5, top: 120, width: 2.5, height: 26, background: '#3c3c3c', borderRadius: '2px 0 0 2px' }} />
                <div style={{ position: 'absolute', right: -2.5, top: 100, width: 2.5, height: 48, background: '#3c3c3c', borderRadius: '0 2px 2px 0' }} />
                <div style={{ width: '100%', height: '100%', borderRadius: 34, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={feature.screenshot}
                    alt={feature.screenshotAlt}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', width: 80, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, zIndex: 10 }} />
                </div>
              </div>
            </motion.div>

            {/* Frosted-glass text card */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ position: 'relative', zIndex: 2, margin: '18px 16px 36px', background: 'rgba(250,248,245,0.82)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', borderRadius: 24, overflow: 'hidden', border: `1px solid ${feature.accentColor}2A`, boxShadow: `0 12px 44px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.65)` }}
            >
              {/* Accent top bar */}
              <div style={{ height: 3, background: `linear-gradient(90deg, ${feature.accentColor} 0%, ${feature.accentColor}28 100%)` }} />

              <div style={{ padding: '18px 18px 20px' }}>
                <h2 style={{ fontFamily: 'Gabarito, sans-serif', fontSize: 'clamp(1.5rem, 6.5vw, 1.85rem)', fontWeight: 800, fontStyle: 'italic', letterSpacing: '-0.03em', color: '#45413E', lineHeight: 1.1, marginBottom: 6, whiteSpace: 'pre-line' }}>
                  {feature.headline}
                </h2>
                <div style={{ width: 24, height: 2.5, background: '#D4AF37', borderRadius: 2, marginBottom: 12 }} />

                <p style={{ fontFamily: 'Figtree, sans-serif', fontSize: 13, color: '#756F68', lineHeight: 1.65, marginBottom: 14 }}>
                  {feature.description}
                </p>

                {/* Verified box */}
                {feature.verifiedBox && (
                  <div style={{ background: `${feature.accentColor}0E`, borderRadius: 13, padding: '10px 13px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 11, border: `1px solid ${feature.accentColor}1C` }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${feature.accentColor}1E`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <AnimatedIcon type="shield-face" color={feature.accentColor} size={17} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'Gabarito, sans-serif', fontSize: 12, fontWeight: 700, color: feature.accentColor, marginBottom: 1 }}>
                        {feature.verifiedBox.title}
                      </h4>
                      <p style={{ fontFamily: 'Figtree, sans-serif', fontSize: 11, color: '#756F68', lineHeight: 1.4 }}>
                        {feature.verifiedBox.text}
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer highlights — 3-column */}
                {feature.footerHighlights && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                    {feature.footerHighlights.map((hl) => (
                      <div key={hl.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 6 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: `${feature.accentColor}0C`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${feature.accentColor}14` }}>
                          <AnimatedIcon type={hl.icon} color={feature.accentColor} size={16} />
                        </div>
                        <h5 style={{ fontFamily: 'Gabarito, sans-serif', fontSize: 10.5, fontWeight: 700, color: '#45413E', lineHeight: 1.3 }}>
                          {hl.title}
                        </h5>
                        <p style={{ fontFamily: 'Figtree, sans-serif', fontSize: 9.5, color: '#756F68', lineHeight: 1.3 }}>
                          {hl.sub}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </section>
        );
      })}

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ padding: '40px 16px 88px' }}>
        <div style={{ background: 'rgba(250,248,245,0.92)', borderRadius: 28, padding: '36px 24px', border: '1px solid #E6DFD5', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
          <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(205,157,143,0.20)', filter: 'blur(60px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(212,175,55,0.09)', filter: 'blur(55px)', pointerEvents: 'none' }} />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: 'Gabarito, sans-serif', fontSize: 'clamp(1.7rem, 7.5vw, 2.4rem)', fontWeight: 800, fontStyle: 'italic', letterSpacing: '-0.03em', color: '#45413E', lineHeight: 1.1, marginBottom: 32, position: 'relative', zIndex: 1 }}
          >
            Modern elegance,<br />ancient chemistry.
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, position: 'relative', zIndex: 1 }}>
            {[
              { word: 'Only',   sub: 'VERIFIED USERS',    color: '#CD9D8F' },
              { word: 'Real',   sub: 'NO CATFISHING',      color: '#D4AF37' },
              { word: 'Always', sub: 'PROTECTED BY AI',    color: '#CD9D8F' },
              { word: 'Fair',   sub: 'ACCESSIBLE PRICING', color: '#45413E' },
            ].map(({ word, sub, color }, ci) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.08, duration: 0.52 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
              >
                <div style={{ color, fontFamily: 'Gabarito, sans-serif', fontSize: '2rem', fontWeight: 800, fontStyle: 'italic' }}>{word}</div>
                <p style={{ fontFamily: 'Figtree, sans-serif', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#756F68' }}>{sub}</p>
              </motion.div>
            ))}
          </div>
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
