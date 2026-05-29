import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollEffect } from '../../hooks/useScrollEffect';
import { useTheme } from '../../themes/ThemeContext';
import { NAV_LINKS, SOCIAL_LINKS } from '../../constants';

// ── Color Palette ─────────────────────────────────────────────
const C = {
  red:       '#FF2D55',
  yellow:    '#FFE600',
  cyan:      '#00FFFF',
  white:     '#FFFFFF',
  redGlow:   'rgba(255,45,85,0.55)',
  yellowGlow:'rgba(255,230,0,0.4)',
  cyanGlow:  'rgba(0,255,255,0.3)',
  border:    'rgba(255,45,85,0.22)',
  borderDim: 'rgba(255,255,255,0.08)',
  bg:        'rgba(0,0,0,0.82)',
  bgDraw:    'rgba(5,0,0,0.97)',
};
// ─────────────────────────────────────────────────────────────

// Inline SVG icons — no MUI dependency needed
const IconMenu  = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const IconSun  = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>
);
const IconMoon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);
const IconGitHub = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
);
const IconLinkedIn = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const IconInstagram = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
);
const IconChat = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

const SOCIAL_ICON_MAP = {
  GitHub: IconGitHub,
  LinkedIn: IconLinkedIn,
  Instagram: IconInstagram,
  Chat: IconChat,
};

const DARK_PAGES = ['/about', '/account', '/chatbotui'];

// ─────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [isDark, setIsDark]   = useState(true);
  const [glitch, setGlitch]   = useState(false);

  const scrolled        = useScrollEffect(50);
  const { toggleTheme } = useTheme();
  const location        = useLocation();

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Logo glitch burst
  useEffect(() => {
    const fire = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 240);
    };
    const t = setInterval(fire, 6000 + Math.random() * 4000);
    return () => clearInterval(t);
  }, []);

  const toggleMenu = () => setIsOpen(p => !p);
  const closeMenu  = () => setIsOpen(false);

  const handleTheme = () => {
    setIsDark(p => !p);
    toggleTheme?.();
  };

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.toLowerCase().startsWith(path.toLowerCase());

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Barlow+Condensed:wght@700;900&family=Permanent+Marker&display=swap');

        /* ── Animations ── */
        @keyframes nbFlicker {
          0%,100%{ opacity:1; }
          91%{ opacity:1; } 92%{ opacity:0.2; } 93%{ opacity:1; }
          95%{ opacity:0.45; } 96%{ opacity:1; }
        }
        @keyframes nbGlitch {
          0%  { clip-path:inset(0 0 100% 0); transform:translate(0); }
          20% { clip-path:inset(25% 0 45% 0); transform:translate(-4px,2px); }
          40% { clip-path:inset(60% 0 10% 0); transform:translate(4px,-2px); }
          60% { clip-path:inset(10% 0 75% 0); transform:translate(-2px,3px); }
          80% { clip-path:inset(78% 0 5% 0);  transform:translate(3px,-1px); }
          100%{ clip-path:inset(0 0 0 0);     transform:translate(0); }
        }
        @keyframes nbSlideDown {
          from{ opacity:0; transform:translateY(-100%); }
          to  { opacity:1; transform:translateY(0); }
        }
        @keyframes nbDrawer {
          from{ transform:translateX(100%); opacity:0; }
          to  { transform:translateX(0);   opacity:1; }
        }
        @keyframes nbUnderline {
          from{ width:0; left:50%; }
          to  { width:calc(100% - 20px); left:10px; }
        }
        @keyframes blinkDot {
          0%,100%{ opacity:1; box-shadow:0 0 5px ${C.red}; }
          50%    { opacity:0.2; box-shadow:none; }
        }
        @keyframes nbPulse {
          0%,100%{ box-shadow: 0 0 0 0 rgba(255,45,85,0.5); }
          50%    { box-shadow: 0 0 0 5px rgba(255,45,85,0); }
        }
        @keyframes marqueeTicker {
          from{ transform:translateX(0); }
          to  { transform:translateX(-50%); }
        }

        /* ── Root ── */
        .nb-root { font-family:'Space Mono',monospace; }

        /* ── Logo ── */
        .nb-logo {
          font-family:'Bebas Neue',sans-serif;
          font-size:22px;
          letter-spacing:0.1em;
          color:${C.white};
          text-decoration:none;
          position:relative;
          transition:color 0.2s;
        }
        .nb-logo-accent { color:${C.red}; }
        .nb-logo-glitch {
          position:absolute; top:0; left:2px;
          color:${C.cyan}; opacity:0.65;
          mix-blend-mode:screen; pointer-events:none;
          font-family:'Bebas Neue',sans-serif;
          font-size:22px; letter-spacing:0.1em;
        }
        .nb-logo.glitch-on .nb-logo-glitch {
          animation: nbGlitch 0.24s steps(1) forwards;
        }
        .nb-logo:hover .nb-logo-accent {
          color:${C.yellow};
          text-shadow:0 0 14px ${C.yellowGlow};
        }

        /* ── Nav Link ── */
        .nb-link {
          position:relative;
          font-family:'Barlow Condensed',sans-serif;
          font-size:15px; font-weight:700;
          letter-spacing:0.12em; text-transform:uppercase;
          color:rgba(255,255,255,0.45);
          text-decoration:none;
          padding:6px 12px;
          transition:color 0.2s;
        }
        .nb-link::after {
          content:'';
          position:absolute; bottom:0; left:50%;
          width:0; height:2px;
          background:${C.red};
          box-shadow:0 0 8px ${C.redGlow};
          border-radius:0;
          transition:width 0.25s ease, left 0.25s ease;
        }
        .nb-link:hover,
        .nb-link.active {
          color:${C.white};
        }
        .nb-link:hover::after,
        .nb-link.active::after {
          width:calc(100% - 20px);
          left:10px;
        }
        .nb-link.active { color:${C.yellow}; }
        .nb-link.active::after { background:${C.yellow}; box-shadow:0 0 8px ${C.yellowGlow}; }

        /* ── Social btn ── */
        .nb-social {
          color:rgba(255,255,255,0.4);
          text-decoration:none;
          display:flex; align-items:center; justify-content:center;
          width:30px; height:30px;
          border:1px solid ${C.border};
          border-radius:2px;
          transition:color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s;
          background:rgba(255,45,85,0.04);
        }
        .nb-social:hover {
          color:${C.yellow};
          border-color:${C.red};
          box-shadow:0 0 10px ${C.redGlow};
          transform:translateY(-2px);
        }

        /* ── Theme btn ── */
        .nb-theme-btn {
          display:inline-flex; align-items:center; gap:6px;
          padding:6px 14px;
          font-family:'Space Mono',monospace;
          font-size:9px; font-weight:700;
          letter-spacing:0.14em; text-transform:uppercase;
          color:${C.white};
          background:rgba(255,45,85,0.1);
          border:1px solid ${C.border};
          border-radius:2px;
          clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px));
          cursor:pointer;
          transition:background 0.2s, box-shadow 0.2s, transform 0.15s;
          white-space:nowrap;
        }
        .nb-theme-btn:hover {
          background:rgba(255,45,85,0.2);
          box-shadow:0 0 12px ${C.redGlow};
          transform:translateY(-1px);
        }

        /* ── Divider ── */
        .nb-divider {
          width:1px; height:18px;
          background:linear-gradient(to bottom, transparent, ${C.border}, transparent);
          flex-shrink:0;
        }

        /* ── Hamburger btn ── */
        .nb-ham {
          display:flex; align-items:center; justify-content:center;
          width:36px; height:36px;
          border:1.5px solid ${C.border};
          border-radius:2px;
          background:rgba(255,45,85,0.08);
          color:${C.white};
          cursor:pointer;
          transition:border-color 0.2s, box-shadow 0.2s;
          clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px));
        }
        .nb-ham:hover {
          border-color:${C.red};
          box-shadow:0 0 10px ${C.redGlow};
        }

        /* ── Mobile Overlay ── */
        .nb-overlay {
          position:fixed; inset:0; z-index:40;
          background:rgba(0,0,0,0.7);
          backdrop-filter:blur(4px);
          transition:opacity 0.3s, visibility 0.3s;
        }

        /* ── Drawer ── */
        .nb-drawer {
          position:fixed; top:0; right:0; height:100%; z-index:50;
          width:min(100%,300px);
          background:${C.bgDraw};
          border-left:1px solid ${C.border};
          overflow-y:auto;
          transition:transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease;
        }
        .nb-drawer.open  { transform:translateX(0);    opacity:1; }
        .nb-drawer.close { transform:translateX(100%); opacity:0; pointer-events:none; }

        .nb-drawer::-webkit-scrollbar       { width:3px; }
        .nb-drawer::-webkit-scrollbar-thumb { background:${C.red}; border-radius:0; }

        /* ── Drawer stripe ── */
        .nb-draw-stripe {
          height:3px;
          background:linear-gradient(90deg, ${C.red}, ${C.yellow}, transparent);
          animation:nbFlicker 5s infinite;
        }

        /* ── Drawer nav link ── */
        .nb-mob-link {
          display:flex; align-items:center;
          padding:13px 20px;
          font-family:'Barlow Condensed',sans-serif;
          font-size:18px; font-weight:700;
          letter-spacing:0.12em; text-transform:uppercase;
          color:rgba(255,255,255,0.4);
          text-decoration:none;
          border-left:3px solid transparent;
          transition:color 0.2s, border-color 0.2s, background 0.2s, padding-left 0.2s;
          border-bottom:1px solid rgba(255,255,255,0.04);
        }
        .nb-mob-link:hover {
          color:${C.white};
          border-left-color:${C.red};
          background:rgba(255,45,85,0.06);
          padding-left:26px;
        }
        .nb-mob-link.active {
          color:${C.yellow};
          border-left-color:${C.red};
          background:rgba(255,45,85,0.1);
          padding-left:26px;
        }
        .nb-mob-link.active .nb-mob-dot { display:block; }

        .nb-mob-dot {
          display:none;
          width:6px; height:6px;
          background:${C.red};
          border-radius:50%;
          margin-left:auto; flex-shrink:0;
          animation:blinkDot 1.4s infinite;
        }

        /* ── Section label in drawer ── */
        .nb-draw-label {
          font-family:'Space Mono',monospace;
          font-size:9px; font-weight:700;
          letter-spacing:0.22em; text-transform:uppercase;
          color:${C.red};
          padding:14px 20px 8px;
        }

        /* ── Drawer social ── */
        .nb-draw-social {
          color:rgba(255,255,255,0.4);
          text-decoration:none;
          display:flex; align-items:center; justify-content:center;
          width:40px; height:40px;
          border:1px solid ${C.border};
          border-radius:2px;
          background:rgba(255,45,85,0.05);
          transition:color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
        }
        .nb-draw-social:hover {
          color:${C.yellow};
          border-color:${C.red};
          box-shadow:0 0 10px ${C.redGlow};
          transform:translateY(-2px);
        }

        /* ── Drawer theme btn ── */
        .nb-draw-theme {
          width:100%;
          display:flex; align-items:center; justify-content:center; gap:8px;
          padding:11px 0;
          font-family:'Space Mono',monospace;
          font-size:10px; font-weight:700;
          letter-spacing:0.14em; text-transform:uppercase;
          color:${C.white};
          background:rgba(255,45,85,0.08);
          border:1px solid ${C.border};
          border-radius:2px;
          cursor:pointer;
          transition:background 0.2s, box-shadow 0.2s;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
        }
        .nb-draw-theme:hover {
          background:rgba(255,45,85,0.18);
          box-shadow:0 0 14px ${C.redGlow};
        }
      `}</style>

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <nav
        className="nb-root"
        style={{
          position:'fixed', top:0, left:0, right:0, zIndex:50,
          backdropFilter:'blur(16px)',
          WebkitBackdropFilter:'blur(16px)',
          background: scrolled ? C.bg : 'rgba(0,0,0,0.45)',
          borderBottom:`1px solid ${scrolled ? C.border : 'transparent'}`,
          boxShadow: scrolled ? `0 2px 24px rgba(255,45,85,0.08)` : 'none',
          transition:'all 0.3s ease',
          padding: scrolled ? '0' : '0',
          animation:'nbSlideDown 0.5s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Top stripe — red line */}
        <div style={{
          height:2, background:`linear-gradient(90deg, ${C.red}, ${C.yellow}, transparent)`,
          animation:'nbFlicker 5s infinite',
        }} />

        <div style={{
          maxWidth:1280, margin:'0 auto',
          padding:'0 20px 0 28px',
          display:'flex', alignItems:'center', justifyContent:'space-between', gap:16,
          height:52,
        }}>

          {/* ── Logo ── */}
          <Link to="/" className={`nb-logo ${glitch ? 'glitch-on' : ''}`} style={{ flexShrink:0 }}>
            <span aria-hidden="true" className="nb-logo-glitch">ADITYA.DEV</span>
            ADITYA<span className="nb-logo-accent">.</span>DEV
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex" style={{ display:'flex', alignItems:'center', gap:4 }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className={`nb-link ${isActive(link.href) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ── Right cluster ── */}
          <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>

            {/* Socials */}
            <div className="hidden md:flex" style={{ display:'flex', alignItems:'center', gap:6 }}>
              {SOCIAL_LINKS.map(link => {
                const Icon = SOCIAL_ICON_MAP[link.name] || IconChat;
                return link.name === 'Chat'
                  ? (
                    <Link key={link.name} to={link.href} className="nb-social" title="Chat">
                      <Icon />
                    </Link>
                  ) : (
                    <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="nb-social" title={link.name}>
                      <Icon />
                    </a>
                  );
              })}
            </div>

            <div className="nb-divider hidden md:block" />

            {/* Theme toggle */}
            <button className="nb-theme-btn hidden md:inline-flex" onClick={handleTheme}>
              {isDark ? <><IconSun /> Light</> : <><IconMoon /> Dark</>}
            </button>

            {/* ── Mobile ham ── */}
            <button
              className="nb-ham md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          OVERLAY
      ══════════════════════════════════════ */}
      <div
        className="nb-overlay md:hidden"
        onClick={closeMenu}
        style={{
          opacity:    isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* ══════════════════════════════════════
          MOBILE DRAWER
      ══════════════════════════════════════ */}
      <div className={`nb-drawer md:hidden ${isOpen ? 'open' : 'close'}`}>

        {/* Top stripe */}
        <div className="nb-draw-stripe" />

        {/* Drawer header */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'14px 20px',
          borderBottom:`1px solid ${C.border}`,
        }}>
          <span style={{
            fontFamily:"'Permanent Marker', cursive",
            fontSize:13, color:C.red, letterSpacing:'0.06em',
          }}>
            // Navigate
          </span>
          <button
            onClick={closeMenu}
            style={{
              display:'flex', alignItems:'center', justifyContent:'center',
              width:32, height:32,
              background:'rgba(255,45,85,0.08)',
              border:`1px solid ${C.border}`,
              borderRadius:2, color:C.white, cursor:'pointer',
              clipPath:'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
            }}
          >
            <IconClose />
          </button>
        </div>

        {/* Nav links */}
        <div>
          {NAV_LINKS.map(link => (
            <Link
              key={link.name}
              to={link.href}
              onClick={closeMenu}
              className={`nb-mob-link ${isActive(link.href) ? 'active' : ''}`}
            >
              <span style={{ marginRight:8, fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, color:C.red, letterSpacing:'0.1em' }}>
                {String(NAV_LINKS.indexOf(link) + 1).padStart(2,'0')}
              </span>
              {link.name}
              <span className="nb-mob-dot" />
            </Link>
          ))}
        </div>

        {/* Social */}
        <p className="nb-draw-label">★ Connect</p>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'0 20px 16px' }}>
          {SOCIAL_LINKS.map(link => {
            const Icon = SOCIAL_ICON_MAP[link.name] || IconChat;
            return link.name === 'Chat'
              ? (
                <Link key={link.name} to={link.href} onClick={closeMenu} className="nb-draw-social" title="Chat">
                  <Icon />
                </Link>
              ) : (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="nb-draw-social" title={link.name}>
                  <Icon />
                </a>
              );
          })}
        </div>

        {/* Appearance */}
        <p className="nb-draw-label" style={{ borderTop:`1px solid ${C.border}`, paddingTop:14 }}>★ Appearance</p>
        <div style={{ padding:'0 20px 16px' }}>
          <button className="nb-draw-theme" onClick={handleTheme}>
            {isDark ? <><IconSun /> Switch to Light</> : <><IconMoon /> Switch to Dark</>}
          </button>
        </div>

        {/* Divider row */}
        <div style={{ height:1, background:`linear-gradient(90deg, ${C.red}, transparent)`, margin:'4px 20px' }} />

        {/* Footer */}
        <div style={{ padding:'14px 20px 24px', textAlign:'center' }}>
          <p style={{
            fontFamily:"'Space Mono',monospace",
            fontSize:9, color:'rgba(255,255,255,0.18)',
            letterSpacing:'0.14em', textTransform:'uppercase',
          }}>
            © {new Date().getFullYear()} Aditya Vilas Pawar
          </p>
          <p style={{
            fontFamily:"'Permanent Marker',cursive",
            fontSize:10, color:'rgba(0,255,255,0.2)',
            marginTop:6, transform:'rotate(-2deg)',
          }}>
            ERP · Techno-Functional
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;


// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import ForumIcon from '@mui/icons-material/Forum';
// import LightModeIcon from '@mui/icons-material/LightMode';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import { useScrollEffect } from '../../hooks/useScrollEffect';
// import { useTheme } from '../../themes/ThemeContext';
// import { NAV_LINKS, SOCIAL_LINKS } from '../../constants';

// // ── Color Variables ──────────────────────────────────────────
// const COLORS = {
//   neonBlue:    '#1477d2',
//   neonGlow:    'rgba(20,119,210,0.45)',
//   neonCyan:    '#38bdf8',
//   borderGlass: 'rgba(255,255,255,0.12)',
//   borderDark:  'rgba(20,119,210,0.25)',
//   white:       '#ffffff',
//   dark:        '#0f172a',
// };
// // ─────────────────────────────────────────────────────────────

// const SOCIAL_ICONS = {
//   GitHub:    GitHubIcon,
//   LinkedIn:  LinkedInIcon,
//   Instagram: InstagramIcon,
//   Chat:      ForumIcon,
// };

// const DARK_PAGES = ['/about', '/account', '/chatbotui'];

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDark, setIsDark] = useState(true);

//   const scrolled          = useScrollEffect(50);
//   const { toggleTheme }   = useTheme();
//   const location          = useLocation();

//   // Lock body scroll when drawer is open
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? 'hidden' : 'unset';
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [isOpen]);

//   // Close drawer on route change
//   useEffect(() => { setIsOpen(false); }, [location.pathname]);

//   const toggleMenu = () => setIsOpen(prev => !prev);
//   const closeMenu  = () => setIsOpen(false);

//   const handleThemeToggle = () => {
//     setIsDark(prev => !prev);
//     toggleTheme?.();
//   };

//   const isDarkBg =
//     DARK_PAGES.includes(location.pathname.toLowerCase()) ||
//     location.pathname.toLowerCase().startsWith('/blog') ||
//     !scrolled;

//   const isActive = (path) =>
//     path === '/'
//       ? location.pathname === '/'
//       : location.pathname.toLowerCase().startsWith(path.toLowerCase());

//   const navText   = isDarkBg ? 'text-white/75' : 'text-gray-700';
//   const navHover  = isDarkBg ? 'hover:text-white' : 'hover:text-blue-600';
//   const logoText  = isDarkBg ? 'text-white' : 'text-blue-600';
//   const btnText   = isDarkBg ? 'text-white' : 'text-gray-800';

//   return (
//     <>
//       {/* ── Global styles (neon effects that Tailwind can't do) ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

//         .nb { font-family: 'DM Sans', sans-serif; }

//         .logo-neon:hover {
//           text-shadow: 0 0 12px ${COLORS.neonGlow}, 0 0 28px ${COLORS.neonGlow};
//         }

//         .nav-underline { position: relative; }
//         .nav-underline::after {
//           content: '';
//           position: absolute;
//           bottom: -3px;
//           left: 50%;
//           width: 0;
//           height: 2px;
//           background: ${COLORS.neonBlue};
//           box-shadow: 0 0 8px ${COLORS.neonGlow}, 0 0 16px ${COLORS.neonGlow};
//           border-radius: 2px;
//           transition: width 0.3s ease, left 0.3s ease;
//         }
//         .nav-underline.is-active::after,
//         .nav-underline:hover::after {
//           width: calc(100% - 24px);
//           left: 12px;
//         }

//         .social-btn:hover svg {
//           filter: drop-shadow(0 0 5px ${COLORS.neonGlow});
//         }

//         .theme-btn:hover {
//           box-shadow: 0 0 10px ${COLORS.neonGlow}, 0 0 22px ${COLORS.neonGlow};
//         }

//         .mob-link:hover {
//           box-shadow: inset 3px 0 0 ${COLORS.neonBlue};
//         }
//         .mob-social:hover svg {
//           filter: drop-shadow(0 0 5px ${COLORS.neonGlow});
//         }

//         .drawer { transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }
//         .drawer-open  { transform: translateX(0); }
//         .drawer-close { transform: translateX(100%); }

//         .drawer::-webkit-scrollbar       { width: 3px; }
//         .drawer::-webkit-scrollbar-thumb { background: ${COLORS.neonBlue}; border-radius: 2px; }
//       `}</style>

//       {/* ════════════════════════════════════════
//           NAVBAR BAR
//       ════════════════════════════════════════ */}
//       <nav
//         className="nb fixed top-0 left-0 right-0 z-50 transition-all duration-300"
//         style={{
//           backdropFilter: 'blur(14px)',
//           WebkitBackdropFilter: 'blur(14px)',
//           background: isDarkBg
//             ? 'rgba(10,15,30,0.78)'
//             : scrolled ? 'rgba(255,255,255,0.93)' : 'transparent',
//           borderBottom: (isDarkBg || scrolled)
//             ? `1px solid ${isDarkBg ? COLORS.borderDark : 'rgba(229,231,235,0.9)'}`
//             : '1px solid transparent',
//           boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.10)' : 'none',
//           padding: scrolled ? '6px 0' : '10px 0',
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">

//           {/* ── Logo ── */}
//           <Link
//             to="/"
//             className={`logo-neon flex-shrink-0 font-bold text-lg transition-all duration-200 ${logoText}`}
//             style={{ textDecoration: 'none', letterSpacing: '-0.3px' }}
//           >
//             Aditya<span style={{ color: COLORS.neonBlue }}>.</span>Dev
//           </Link>

//           {/* ── Desktop Menu ── */}
//           <div className="hidden md:flex items-center gap-5">

//             {/* Nav links */}
//             <div className="flex items-center gap-0.5">
//               {NAV_LINKS.map((link) => (
//                 <Link
//                   key={link.name}
//                   to={link.href}
//                   className={`
//                     nav-underline px-3 py-1.5 text-sm font-medium rounded
//                     transition-colors duration-200
//                     ${isActive(link.href)
//                       ? `is-active ${isDarkBg ? 'text-white' : 'text-blue-600'}`
//                       : `${navText} ${navHover}`}
//                   `}
//                   style={{ textDecoration: 'none' }}
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>

//             {/* Divider */}
//             <div className="h-5 w-px flex-shrink-0"
//               style={{ background: isDarkBg ? COLORS.borderGlass : 'rgba(209,213,219,0.9)' }} />

//             {/* Social icons */}
//             <div className="flex items-center gap-3">
//               {SOCIAL_LINKS.map((link) => {
//                 const Icon = SOCIAL_ICONS[link.name];
//                 const cls  = `social-btn flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 ${navText} ${navHover}`;
//                 const sty  = { textDecoration: 'none' };

//                 return link.name === 'Chat'
//                   ? <Link key={link.name} to={link.href} className={cls} style={sty} title="Chat"><Icon style={{ fontSize: 18 }} /></Link>
//                   : <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={cls} style={sty} title={link.name}><Icon style={{ fontSize: 18 }} /></a>;
//               })}
//             </div>

//             {/* Divider */}
//             <div className="h-5 w-px flex-shrink-0"
//               style={{ background: isDarkBg ? COLORS.borderGlass : 'rgba(209,213,219,0.9)' }} />

//             {/* Theme toggle — single button */}
//             <button
//               onClick={handleThemeToggle}
//               className="theme-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
//               style={{
//                 background: 'rgba(20,119,210,0.13)',
//                 border: `1px solid ${COLORS.borderDark}`,
//                 color: isDarkBg ? COLORS.white : COLORS.neonBlue,
//                 letterSpacing: '0.03em',
//                 cursor: 'pointer',
//               }}
//             >
//               {isDark
//                 ? <><LightModeIcon style={{ fontSize: 13 }} />&nbsp;Light</>
//                 : <><DarkModeIcon  style={{ fontSize: 13 }} />&nbsp;Dark</>
//               }
//             </button>
//           </div>

//           {/* ── Mobile: theme icon + hamburger ── */}
//           <div className="flex md:hidden items-center gap-2">
//             <button
//               onClick={handleThemeToggle}
//               className="theme-btn flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
//               style={{
//                 background: 'rgba(20,119,210,0.13)',
//                 border: `1px solid ${COLORS.borderDark}`,
//                 color: isDarkBg ? COLORS.white : COLORS.neonBlue,
//                 cursor: 'pointer',
//               }}
//             >
//               {isDark
//                 ? <LightModeIcon style={{ fontSize: 16 }} />
//                 : <DarkModeIcon  style={{ fontSize: 16 }} />
//               }
//             </button>

//             <button
//               onClick={toggleMenu}
//               className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 ${btnText}`}
//               style={{
//                 background: 'rgba(20,119,210,0.10)',
//                 border: `1px solid ${COLORS.borderDark}`,
//                 cursor: 'pointer',
//               }}
//               aria-label="Toggle menu"
//             >
//               {isOpen
//                 ? <CloseIcon style={{ fontSize: 20 }} />
//                 : <MenuIcon  style={{ fontSize: 20 }} />
//               }
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* ════════════════════════════════════════
//           MOBILE OVERLAY
//       ════════════════════════════════════════ */}
//       <div
//         onClick={closeMenu}
//         className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm transition-all duration-300"
//         style={{
//           opacity:    isOpen ? 1 : 0,
//           visibility: isOpen ? 'visible' : 'hidden',
//           pointerEvents: isOpen ? 'auto' : 'none',
//         }}
//       />

//       {/* ════════════════════════════════════════
//           MOBILE DRAWER
//       ════════════════════════════════════════ */}
//       <div
//         className={`drawer nb fixed top-0 right-0 h-full z-50 md:hidden overflow-y-auto ${isOpen ? 'drawer-open' : 'drawer-close'}`}
//         style={{
//           width: 'min(100%, 280px)',
//           background: 'rgba(10,15,30,0.97)',
//           backdropFilter: 'blur(20px)',
//           WebkitBackdropFilter: 'blur(20px)',
//           borderLeft: `1px solid ${COLORS.borderDark}`,
//           boxShadow: `-4px 0 32px rgba(20,119,210,0.15)`,
//         }}
//       >
//         {/* Header */}
//         <div
//           className="flex items-center justify-between px-5 py-4"
//           style={{ borderBottom: `1px solid ${COLORS.borderDark}` }}
//         >
//           <span className="text-white font-bold text-sm uppercase" style={{ letterSpacing: '0.12em' }}>
//             Menu
//           </span>
//           <button
//             onClick={closeMenu}
//             className="flex items-center justify-center w-8 h-8 rounded-lg text-white/60 hover:text-white transition-colors duration-200"
//             style={{ background: 'rgba(255,255,255,0.07)', cursor: 'pointer' }}
//           >
//             <CloseIcon style={{ fontSize: 18 }} />
//           </button>
//         </div>

//         {/* Nav links */}
//         <div className="px-3 py-4 flex flex-col gap-1">
//           {NAV_LINKS.map((link) => (
//             <Link
//               key={link.name}
//               to={link.href}
//               onClick={closeMenu}
//               className={`
//                 mob-link flex items-center px-4 py-3 rounded-lg text-sm font-medium
//                 transition-all duration-200
//                 ${isActive(link.href)
//                   ? 'text-white'
//                   : 'text-white/55 hover:text-white hover:bg-white/5'
//                 }
//               `}
//               style={{
//                 textDecoration: 'none',
//                 background: isActive(link.href)
//                   ? 'linear-gradient(90deg, rgba(20,119,210,0.28) 0%, rgba(20,119,210,0.06) 100%)'
//                   : 'transparent',
//                 borderLeft: `3px solid ${isActive(link.href) ? COLORS.neonBlue : 'transparent'}`,
//                 boxShadow: isActive(link.href) ? 'inset 0 0 20px rgba(20,119,210,0.08)' : 'none',
//               }}
//             >
//               {link.name}
//               {isActive(link.href) && (
//                 <span
//                   className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
//                   style={{ background: COLORS.neonBlue, boxShadow: `0 0 6px ${COLORS.neonBlue}` }}
//                 />
//               )}
//             </Link>
//           ))}
//         </div>

//         {/* Social */}
//         <div className="px-5 py-4" style={{ borderTop: `1px solid ${COLORS.borderDark}` }}>
//           <p className="text-xs font-bold uppercase mb-3" style={{ color: COLORS.neonBlue, letterSpacing: '0.15em' }}>
//             Connect
//           </p>
//           <div className="flex items-center gap-3">
//             {SOCIAL_LINKS.map((link) => {
//               const Icon = SOCIAL_ICONS[link.name];
//               const cls  = 'mob-social flex items-center justify-center w-10 h-10 rounded-lg text-white/55 hover:text-white transition-all duration-200 hover:-translate-y-0.5';
//               const sty  = { background: 'rgba(20,119,210,0.12)', border: `1px solid ${COLORS.borderDark}`, textDecoration: 'none' };

//               return link.name === 'Chat'
//                 ? <Link key={link.name} to={link.href} onClick={closeMenu} className={cls} style={sty}><Icon style={{ fontSize: 18 }} /></Link>
//                 : <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={cls} style={sty}><Icon style={{ fontSize: 18 }} /></a>;
//             })}
//           </div>
//         </div>

//         {/* Appearance */}
//         <div className="px-5 py-4" style={{ borderTop: `1px solid ${COLORS.borderDark}` }}>
//           <p className="text-xs font-bold uppercase mb-3" style={{ color: COLORS.neonBlue, letterSpacing: '0.15em' }}>
//             Appearance
//           </p>
//           <button
//             onClick={handleThemeToggle}
//             className="theme-btn w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
//             style={{
//               background: 'rgba(20,119,210,0.12)',
//               border: `1px solid ${COLORS.borderDark}`,
//               color: COLORS.white,
//               cursor: 'pointer',
//             }}
//           >
//             {isDark
//               ? <><LightModeIcon style={{ fontSize: 15 }} /> Switch to Light</>
//               : <><DarkModeIcon  style={{ fontSize: 15 }} /> Switch to Dark</>
//             }
//           </button>
//         </div>

//         {/* Footer */}
//         <div className="px-5 pb-6 pt-2">
//           <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
//             © {new Date().getFullYear()} Aditya Vilas Pawar
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
