import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MODULE_ROUTES } from '../../constants';

// ── Color Variables ──────────────────────────────────────────
const C = {
  red:       "#FF2D55",
  yellow:    "#FFE600",
  cyan:      "#00FFFF",
  white:     "#FFFFFF",
  dark:      "#000000",
  overlay:   "rgba(0,0,0,0.62)",
  dimWhite:  "rgba(255,255,255,0.55)",
  dimWhite2: "rgba(255,255,255,0.25)",
  dimWhite3: "rgba(255,255,255,0.08)",
  redGlow:   "rgba(255,45,85,0.7)",
};

const TAGS = ["ERP Implementation", "Techno-Functional", "Process Automation", "ERP Consulting"];

const GIF_URL = "https://i.pinimg.com/originals/ad/67/09/ad67090ff30d09ce9a4496b2a85a3e84.gif";

// ─────────────────────────────────────────────────────────────

export default function Home() {
  const [tagIndex, setTagIndex]         = useState(0);
  const [showModules, setShowModules]   = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [mousePos, setMousePos]         = useState({ x: 0, y: 0 });
  const [stampVisible, setStampVisible] = useState(false);
  const heroRef = useRef(null);

  // Show modules after delay
  useEffect(() => {
    const t = setTimeout(() => setShowModules(true), 900);
    return () => clearTimeout(t);
  }, []);

  // Cycle tags
  useEffect(() => {
    const t = setInterval(() => setTagIndex(i => (i + 1) % TAGS.length), 2400);
    return () => clearInterval(t);
  }, []);

  // Random glitch burst
  useEffect(() => {
    const trigger = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    };
    const t = setInterval(trigger, 4500 + Math.random() * 3000);
    return () => clearInterval(t);
  }, []);

  // Stamp on mount
  useEffect(() => {
    const t = setTimeout(() => setStampVisible(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // Mouse parallax
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - left) / width - 0.5) * 16,
      y: ((e.clientY - top) / height - 0.5) * 10,
    });
  };

  return (
    <header
      ref={heroRef}
      onMouseMove={handleMouseMove}
      style={{ position: "relative", minHeight: "100vh", width: "100%", overflow: "hidden", background: "#000", cursor: "crosshair" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Permanent+Marker&family=Barlow+Condensed:wght@700;900&display=swap');

        /* ── Reset ── */
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes tagSwap {
          from { opacity: 0; transform: translateY(7px) skewX(-4deg); }
          to   { opacity: 1; transform: translateY(0) skewX(0deg); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes neonFlicker {
          0%,100% { opacity: 1; }
          92%  { opacity: 1; }
          93%  { opacity: 0.2; }
          94%  { opacity: 1; }
          96%  { opacity: 0.4; }
          97%  { opacity: 1; }
        }
        @keyframes glitchShift {
          0%   { clip-path: inset(0 0 100% 0); transform: translate(0); }
          20%  { clip-path: inset(30% 0 40% 0); transform: translate(-4px, 2px); }
          40%  { clip-path: inset(60% 0 10% 0); transform: translate(4px, -2px); }
          60%  { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 3px); }
          80%  { clip-path: inset(80% 0 5% 0); transform: translate(3px, -1px); }
          100% { clip-path: inset(0 0 0 0);   transform: translate(0); }
        }
        @keyframes stampIn {
          0%   { opacity: 0; transform: rotate(-18deg) scale(2.2); }
          60%  { opacity: 1; transform: rotate(-18deg) scale(0.92); }
          80%  { transform: rotate(-18deg) scale(1.05); }
          100% { transform: rotate(-18deg) scale(1); opacity: 1; }
        }
        @keyframes blinkDot {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.15; }
        }
        @keyframes stripePulse {
          0%,100% { box-shadow: 4px 0 18px ${C.redGlow}; }
          50%      { box-shadow: 4px 0 36px rgba(255,45,85,0.95); }
        }
        @keyframes bounceY {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(8px); }
        }
        @keyframes rotateSlowCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes marqueeTicker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── BG ── */
        .bg-gif {
          position: absolute; inset: 0;
          background-image: url('${GIF_URL}');
          background-size: cover;
          background-position: center;
          filter: brightness(0.3) saturate(1.5) contrast(1.1);
          transition: transform 0.12s ease-out;
        }

        /* ── Overlays ── */
        .overlay-dark {
          position: absolute; inset: 0;
          background: ${C.overlay};
        }
        .overlay-scanlines {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.16) 2px,
            rgba(0,0,0,0.16) 4px
          );
          pointer-events: none;
          z-index: 2;
        }
        .overlay-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.72) 100%);
          pointer-events: none;
          z-index: 3;
        }
        .scanline-sweep {
          position: absolute; left: 0; right: 0;
          height: 3px;
          background: rgba(255,255,255,0.04);
          pointer-events: none;
          z-index: 4;
          animation: scanline 6s linear infinite;
        }

        /* ── Diagonal Stripe ── */
        .stripe-red {
          position: absolute;
          top: -24px; left: -16px;
          width: 320px; height: 7px;
          background: ${C.red};
          transform: rotate(-8deg);
          transform-origin: left center;
          z-index: 5;
          animation: neonFlicker 5s infinite, stripePulse 2s ease-in-out infinite;
        }
        .stripe-yellow {
          position: absolute;
          top: -10px; left: -16px;
          width: 220px; height: 2.5px;
          background: ${C.yellow};
          transform: rotate(-8deg);
          transform-origin: left center;
          z-index: 5;
          animation: neonFlicker 5s 0.5s infinite;
        }

        /* ── Corner side text ── */
        .side-text-left {
          position: absolute;
          top: 50%; left: 18px;
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.15);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          z-index: 5;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center center;
          pointer-events: none;
          white-space: nowrap;
        }
        .corner-graffiti {
          position: absolute;
          bottom: 22px; left: 22px;
          font-family: 'Permanent Marker', cursive;
          font-size: 12px;
          color: rgba(0,255,255,0.3);
          z-index: 5;
          transform: rotate(-5deg);
          pointer-events: none;
        }

        /* ── TICKER at bottom ── */
        .ticker-wrap {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 28px;
          background: ${C.red};
          overflow: hidden;
          z-index: 6;
          display: flex;
          align-items: center;
        }
        .ticker-inner {
          display: flex;
          white-space: nowrap;
          animation: marqueeTicker 18s linear infinite;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          color: ${C.white};
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .ticker-sep {
          color: ${C.yellow};
          margin: 0 18px;
        }

        /* ── MAIN CONTENT ── */
        .hero-grid {
          position: relative; z-index: 10;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          min-height: calc(100vh - 28px);
          padding: 40px 28px 40px 56px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; padding: 32px 20px 40px; }
          .sw-h1-outline { font-size: 64px !important; }
          .sw-h1-fill { font-size: 52px !important; }
          .sw-right { align-items: flex-start !important; margin-top: 28px; }
        }

        /* ── BADGE ── */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: ${C.red};
          color: ${C.white};
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 2px;
          margin-bottom: 18px;
          animation: fadeUp 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s both;
        }
        .badge-dot {
          width: 6px; height: 6px;
          background: ${C.yellow};
          border-radius: 50%;
          flex-shrink: 0;
          animation: blinkDot 1.2s infinite;
        }

        /* ── HEADING ── */
        .h1-outline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 96px;
          line-height: 0.82;
          color: transparent;
          -webkit-text-stroke: 2.5px ${C.white};
          letter-spacing: 0.05em;
          display: block;
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        .h1-fill {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 76px;
          line-height: 1;
          color: ${C.white};
          letter-spacing: 0.04em;
          display: block;
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both;
        }
        .h1-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 76px;
          color: ${C.yellow};
          text-shadow: 4px 4px 0 ${C.red}, -1px -1px 0 ${C.red};
          display: inline;
        }

        /* ── GLITCH LAYER ── */
        .glitch-layer {
          position: absolute;
          top: 0; left: 0;
          pointer-events: none;
          color: ${C.cyan};
          opacity: 0.7;
          mix-blend-mode: screen;
        }
        .glitch-active .glitch-layer {
          animation: glitchShift 0.28s steps(1) forwards;
        }

        /* ── MARKER TAG ── */
        .marker-sub {
          font-family: 'Permanent Marker', cursive;
          font-size: 14px;
          color: ${C.cyan};
          margin: 10px 0 14px;
          letter-spacing: 0.04em;
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.38s both;
        }

        /* ── DIVIDER ── */
        .divider {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 12px 0 16px;
          animation: fadeUp 0.7s 0.42s both;
        }
        .div-red { height: 2.5px; width: 40px; background: ${C.red}; }
        .div-sq  { width: 7px; height: 7px; background: ${C.yellow}; transform: rotate(45deg); flex-shrink: 0; }
        .div-dim { height: 1px; flex: 1; background: rgba(255,255,255,0.1); }

        /* ── SUB TEXT ── */
        .sub-text {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          line-height: 1.85;
          max-width: 300px;
          letter-spacing: 0.03em;
          margin-bottom: 24px;
          animation: fadeUp 0.7s 0.48s both;
        }

        /* ── CTA BUTTON ── */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 26px;
          background: ${C.red};
          color: ${C.white};
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          box-shadow: 5px 5px 0 ${C.yellow};
          transition: box-shadow 0.15s, transform 0.12s, background 0.15s;
          animation: fadeUp 0.7s 0.56s both;
        }
        .cta-btn:hover {
          background: #d41e47;
          box-shadow: 8px 8px 0 ${C.yellow};
          transform: translate(-2px,-2px);
        }
        .cta-btn:active {
          box-shadow: 2px 2px 0 ${C.yellow};
          transform: translate(2px, 2px);
        }

        /* ── STAMP ── */
        .stamp-wrap {
          position: absolute;
          top: 38px; right: 36px;
          z-index: 10;
          pointer-events: none;
        }
        .stamp {
          width: 88px; height: 88px;
          border: 3.5px solid ${C.red};
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: rotate(-18deg);
          opacity: 0;
          box-shadow: 0 0 0 2px ${C.red}, inset 0 0 0 3px rgba(255,45,85,0.15);
          background: rgba(255,45,85,0.06);
        }
        .stamp.stamp-show {
          animation: stampIn 0.55s cubic-bezier(0.34,1.2,0.64,1) 1.3s both;
          opacity: 1;
        }
        .stamp-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          color: ${C.red};
          letter-spacing: 0.18em;
          text-align: center;
          line-height: 1.3;
          animation: neonFlicker 5s 2s infinite;
        }

        /* ── DIAL / DECORATIVE CIRCLE ── */
        .dial {
          position: absolute;
          bottom: 60px; left: 32px;
          width: 48px; height: 48px;
          border: 1px solid rgba(255,230,0,0.2);
          border-top-color: ${C.yellow};
          border-radius: 50%;
          z-index: 6;
          animation: rotateSlowCW 8s linear infinite;
        }
        .dial-inner {
          position: absolute;
          bottom: 74px; left: 46px;
          width: 20px; height: 20px;
          border: 1px solid rgba(255,230,0,0.15);
          border-right-color: ${C.yellow};
          border-radius: 50%;
          z-index: 6;
          animation: rotateSlowCW 4s linear infinite reverse;
        }

        /* ── RIGHT COLUMN ── */
        .sw-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .nav-label {
          font-family: 'Permanent Marker', cursive;
          font-size: 12px;
          color: ${C.red};
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 4px;
          animation: fadeUp 0.5s 0.65s both;
        }
        .nav-vline {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, ${C.red}, transparent);
          margin-bottom: 14px;
          align-self: flex-end;
          animation: fadeUp 0.5s 0.7s both;
        }

        /* ── MODULE LIST ── */
        .mod-list {
          list-style: none;
          width: 100%;
          text-align: right;
        }
        .mod-item {
          margin-bottom: 16px;
          animation: fadeLeft 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .mod-link {
          display: inline-flex;
          align-items: center;
          flex-direction: row-reverse;
          gap: 0px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: color 0.22s, gap 0.22s, letter-spacing 0.22s;
          position: relative;
        }
        .mod-link:hover {
          color: ${C.yellow};
          gap: 12px;
          letter-spacing: 0.14em;
        }
        .mod-link:hover .mod-num  { color: ${C.red}; opacity: 1; }
        .mod-link:hover .mod-bar  { width: 36px; }
        .mod-link:hover .mod-arr  { opacity: 1; transform: translateX(0); }

        .mod-num {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          margin-left: 10px;
          transition: color 0.22s, opacity 0.22s;
          flex-shrink: 0;
        }
        .mod-bar {
          display: inline-block;
          height: 2px; width: 0;
          background: ${C.red};
          margin-left: 10px;
          vertical-align: middle;
          transition: width 0.22s;
          flex-shrink: 0;
        }
        .mod-arr {
          opacity: 0;
          transform: translateX(-10px);
          transition: opacity 0.2s, transform 0.2s;
          color: ${C.red};
          font-size: 18px;
          margin-left: 8px;
          flex-shrink: 0;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0;
        }

        /* ── FOOTER NOTE ── */
        .footer-note {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-top: 22px;
          text-align: right;
        }

        /* ── SCROLL HINT ── */
        .scroll-hint {
          position: absolute;
          bottom: 44px; right: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          z-index: 6;
          animation: fadeUp 0.6s 1.6s both;
        }
        .scroll-hint-text {
          font-family: 'Space Mono', monospace;
          font-size: 8px;
          color: rgba(255,255,255,0.22);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transform: rotate(90deg);
          transform-origin: center;
          white-space: nowrap;
        }
        .scroll-dot {
          width: 4px; height: 4px;
          background: ${C.red};
          border-radius: 50%;
          animation: bounceY 1.8s ease-in-out infinite;
        }

        /* ── TAG CYCLE ── */
        .tag-cycle { animation: tagSwap 0.35s ease both; }
      `}</style>

      {/* ── Background GIF ── */}
      <div
        className="bg-gif"
        style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px) scale(1.06)` }}
      />

      {/* ── Overlays ── */}
      <div className="overlay-dark" />
      <div className="overlay-scanlines" />
      <div className="overlay-vignette" />
      <div className="scanline-sweep" />

      {/* ── Diagonal Stripes ── */}
      <div className="stripe-red" />
      <div className="stripe-yellow" />

      {/* ── Side label ── */}
      <span className="side-text-left">ERP · Techno-Functional · Consulting · Supply Chain</span>

      {/* ── Corner Graffiti ── */}
      <span className="corner-graffiti">ADITYA © MMXXVI</span>

      {/* ── Rotating Dials ── */}
      <div className="dial" />
      <div className="dial-inner" />

      {/* ── Stamp ── */}
      <div className="stamp-wrap">
        <div className={`stamp ${stampVisible ? "stamp-show" : ""}`}>
          <span className="stamp-text">TECHNO<br/>FUNC<br/>★ ERP ★</span>
        </div>
      </div>

      {/* ── Scroll Hint ── */}
      <div className="scroll-hint">
        <span className="scroll-hint-text">Scroll</span>
        <span className="scroll-dot" />
      </div>

      {/* ── Main Grid ── */}
      <div className="hero-grid">

        {/* ── LEFT ── */}
        <div>
          {/* Badge */}
          <div className="badge">
            <span className="badge-dot" />
            <span key={tagIndex} className="tag-cycle">{TAGS[tagIndex]}</span>
          </div>

          {/* Heading with glitch */}
          <div style={{ position: "relative" }} className={glitchActive ? "glitch-active" : ""}>
            <span className="h1-outline">H!!!...</span>
            <span className="h1-fill">
              I'M <span className="h1-name">ADITYA</span>
            </span>
            {/* Glitch ghost */}
            <span
              className="glitch-layer h1-outline"
              style={{ position: "absolute", top: 0, left: 2, display: "block" }}
              aria-hidden
            >
              H!!!...
            </span>
          </div>

          {/* Marker sub */}
          <p className="marker-sub">// techno-functional consultant</p>

          {/* Divider */}
          <div className="divider">
            <span className="div-red" />
            <span className="div-sq" />
            <span className="div-dim" />
          </div>

          {/* Sub text */}
          <p className="sub-text">
            Bridging business processes with technology —<br />
            delivering scalable ERP solutions across<br />
            finance, inventory, and supply chain.
          </p>

          {/* CTA */}
          <Link to="/ChatbotUI" className="cta-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Chat with AdiBot
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* ── RIGHT ── */}
        <div
          className="sw-right"
          style={{
            opacity: showModules ? 1 : 0,
            transform: showModules ? "translateX(0)" : "translateX(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {showModules && (
            <>
              <p className="nav-label">Navigate</p>
              <div className="nav-vline" />

              <ul className="mod-list">
                {MODULE_ROUTES.map((module, index) => (
                  <li
                    key={index}
                    className="mod-item"
                    style={{ animationDelay: `${800 + index * 75}ms` }}
                  >
                    <Link to={module.path} className="mod-link">
                      <span className="mod-num">{String(index + 1).padStart(2, "0")}</span>
                      {module.name}
                      <span className="mod-bar" />
                      <span className="mod-arr">›</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="footer-note">
                © {new Date().getFullYear()} Aditya Vilas Pawar
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Bottom Ticker ── */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span>ERP Implementation</span>
              <span className="ticker-sep">✦</span>
              <span>Techno-Functional</span>
              <span className="ticker-sep">✦</span>
              <span>Process Automation</span>
              <span className="ticker-sep">✦</span>
              <span>Supply Chain Solutions</span>
              <span className="ticker-sep">✦</span>
              <span>Finance Module</span>
              <span className="ticker-sep">✦</span>
              <span>Inventory Optimization</span>
              <span className="ticker-sep">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

    </header>
  );
}




// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { MODULE_ROUTES } from '../../constants';
// import ChatIcon from '@mui/icons-material/Chat';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// // ── Color Variables ──────────────────────────────────────────
// const COLORS = {
//   primary:       "#1477d2",
//   primaryLight:  "#dbeafe",
//   textWhite:     "#ffffff",
//   textMuted:     "#94a3b8",
//   textSubtle:    "#cbd5e1",
//   overlayDark:   "rgba(0,0,0,0.62)",
//   borderWhite:   "rgba(255,255,255,0.25)",
//   chipBg:        "rgba(255,255,255,0.08)",
//   chipHover:     "rgba(255,255,255,0.16)",
//   accentBlue:    "#38bdf8",
// };
// // ─────────────────────────────────────────────────────────────

// const TAGS = ["ERP Implementation", "Techno-Functional", "Process Automation", "ERP Consulting"];

// export default function Home() {
//   const [showModules, setShowModules] = useState(false);
//   const [hoveredModule, setHoveredModule] = useState(null);
//   const [tagIndex, setTagIndex] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowModules(true), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   // Cycle through tags
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTagIndex((prev) => (prev + 1) % TAGS.length);
//     }, 2200);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <header className="relative min-h-screen w-full overflow-hidden">

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@900&display=swap');

//         .home-wrap { font-family: 'DM Sans', sans-serif; }

//         /* Heading fade-in */
//         .hero-heading {
//           animation: fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) both;
//         }
//         .hero-sub {
//           animation: fadeSlideUp 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) both;
//         }
//         .hero-btn {
//           animation: fadeSlideUp 0.8s 0.4s cubic-bezier(0.16,1,0.3,1) both;
//         }
//         .hero-tags {
//           animation: fadeSlideUp 0.8s 0.55s cubic-bezier(0.16,1,0.3,1) both;
//         }
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(22px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }

//         /* Cycling tag */
//         .tag-cycle {
//           animation: tagFade 0.4s ease;
//         }
//         @keyframes tagFade {
//           from { opacity: 0; transform: translateY(6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }

//         /* Module list items stagger */
//         .module-item {
//           animation: fadeSlideRight 0.5s cubic-bezier(0.16,1,0.3,1) both;
//         }
//         @keyframes fadeSlideRight {
//           from { opacity: 0; transform: translateX(24px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }

//         /* Hover on module: text grows + arrow appears */
//         .module-link {
//           position: relative;
//           display: inline-flex;
//           align-items: center;
//           gap: 0px;
//           font-size: 15px;
//           font-weight: 500;
//           color: ${COLORS.textSubtle};
//           letter-spacing: 0.03em;
//           transition: color 0.25s, gap 0.25s, font-size 0.25s;
//           text-decoration: none;
//         }
//         .module-link:hover {
//           color: ${COLORS.textWhite};
//           gap: 8px;
//           font-size: 17px;
//         }
//         .module-arrow {
//           opacity: 0;
//           transform: translateX(-6px);
//           transition: opacity 0.2s, transform 0.2s;
//           font-size: 14px !important;
//         }
//         .module-link:hover .module-arrow {
//           opacity: 1;
//           transform: translateX(0);
//         }

//         /* Number badge */
//         .module-num {
//           font-size: 10px;
//           color: ${COLORS.accentBlue};
//           font-weight: 700;
//           margin-right: 8px;
//           opacity: 0.7;
//           font-variant-numeric: tabular-nums;
//           transition: opacity 0.2s;
//         }
//         .module-link:hover .module-num { opacity: 1; }

//         /* CTA button */
//         .cta-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 11px 24px;
//           font-size: 13px;
//           font-weight: 600;
//           font-family: 'DM Sans', sans-serif;
//           color: ${COLORS.textWhite};
//           border: 1px solid ${COLORS.borderWhite};
//           background: ${COLORS.chipBg};
//           border-radius: 8px;
//           backdrop-filter: blur(8px);
//           text-decoration: none;
//           transition: background 0.2s, border-color 0.2s, transform 0.15s;
//           letter-spacing: 0.02em;
//         }
//         .cta-btn:hover {
//           background: ${COLORS.chipHover};
//           border-color: rgba(255,255,255,0.5);
//           transform: translateY(-2px);
//         }
//         .cta-btn:active { transform: scale(0.98); }

//         /* Divider line left column */
//         .accent-line {
//           width: 40px; height: 2px;
//           background: ${COLORS.accentBlue};
//           border-radius: 2px;
//           margin: 16px 0;
//         }

//         /* Scroll indicator */
//         .scroll-hint {
//           animation: bounce 2s infinite;
//         }
//         @keyframes bounce {
//           0%,100% { transform: translateY(0); }
//           50%      { transform: translateY(6px); }
//         }

//         /* Right column label */
//         .nav-label {
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.18em;
//           text-transform: uppercase;
//           color: ${COLORS.accentBlue};
//           margin-bottom: 20px;
//         }
//       `}</style>

//       {/* ── Background GIF ── */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: "url('https://i.pinimg.com/originals/ad/67/09/ad67090ff30d09ce9a4496b2a85a3e84.gif')" }}
//       />

//       {/* ── Dark overlay ── */}
//       <div
//         className="absolute inset-0 backdrop-blur-sm"
//         style={{ background: COLORS.overlayDark }}
//       />

//       {/* ── Content ── */}
//       <div className="home-wrap relative z-10 min-h-screen px-8 sm:px-12 lg:px-20 flex items-center">
//         <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

//           {/* ── Left Column ── */}
//           <div>
//             {/* Top badge */}
//             <div
//               className="hero-tags inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
//               style={{ background: COLORS.chipBg, border: `1px solid ${COLORS.borderWhite}`, backdropFilter: "blur(8px)" }}
//             >
//               <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accentBlue, display: "inline-block", flexShrink: 0 }} />
//               <span
//                 key={tagIndex}
//                 className="tag-cycle"
//                 style={{ fontSize: 11, fontWeight: 600, color: COLORS.textSubtle, letterSpacing: "0.05em" }}
//               >
//                 {TAGS[tagIndex]}
//               </span>
//             </div>

//             {/* Heading */}
//             <h1 className="hero-heading font-extrabold leading-none tracking-tight mb-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//               <span
//                 className="block text-transparent text-6xl sm:text-7xl lg:text-8xl"
//                 style={{ WebkitTextStroke: "2px white", letterSpacing: "0.06em" }}
//               >
//                 H!!!...
//               </span>
//               <span
//                 className="block text-white text-5xl sm:text-6xl lg:text-7xl"
//                 style={{ letterSpacing: "0.04em" }}
//               >
//                 I'm <span style={{ color: COLORS.accentBlue }}>ADITYA</span>
//               </span>
//             </h1>

//             {/* Accent line */}
//             <div className="accent-line" />

//             {/* Sub heading */}
//             <p className="hero-sub text-sm sm:text-base mb-8 max-w-sm leading-relaxed" style={{ color: COLORS.textMuted }}>
//               Bridging business processes with technology — delivering scalable ERP solutions across finance, inventory, and supply chain.
//             </p>

//             {/* CTA Button */}
//             <div className="hero-btn">
//               <Link to="/ChatbotUI" className="cta-btn">
//                 <ChatIcon style={{ fontSize: 16 }} />
//                 Chat with AdiBot
//                 <ArrowForwardIcon style={{ fontSize: 14 }} />
//               </Link>
//             </div>
//           </div>

//           {/* ── Right Column: Modules ── */}
//           <div
//             className={`flex flex-col items-start lg:items-end transition-all duration-700 ${
//               showModules ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
//             }`}
//           >
//             {showModules && (
//               <div className="lg:text-right">
//                 <p className="nav-label">Navigate</p>

//                 {/* Subtle divider */}
//                 <div
//                   className="mb-6 ml-auto"
//                   style={{ width: 32, height: 1, background: COLORS.borderWhite }}
//                 />

//                 <ul className="space-y-5">
//                   {MODULE_ROUTES.map((module, index) => (
//                     <li
//                       key={index}
//                       className="module-item flex items-center lg:justify-end hover-cursor-pointer "
//                       style={{ animationDelay: `${index * 80}ms` }}
//                       onMouseEnter={() => setHoveredModule(index)}
//                       onMouseLeave={() => setHoveredModule(null)}
//                     >
//                       <Link to={module.path} className="module-link">
//                         <span className="module-num">{String(index + 1).padStart(2, "0")}</span>
//                         {module.name}
//                         <ArrowForwardIcon className="module-arrow" />
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>

//                 {/* Footer note */}
//                 <p
//                   className="mt-10 text-xs"
//                   style={{ color: COLORS.textMuted, letterSpacing: "0.04em" }}
//                 >
//                   © {new Date().getFullYear()} Aditya Vilas Pawar
//                 </p>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </header>
//   );
// }
