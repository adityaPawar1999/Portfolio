import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MODULE_ROUTES } from '../../constants';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// ── Color Variables ──────────────────────────────────────────
const COLORS = {
  primary:       "#1477d2",
  primaryLight:  "#dbeafe",
  textWhite:     "#ffffff",
  textMuted:     "#94a3b8",
  textSubtle:    "#cbd5e1",
  overlayDark:   "rgba(0,0,0,0.62)",
  borderWhite:   "rgba(255,255,255,0.25)",
  chipBg:        "rgba(255,255,255,0.08)",
  chipHover:     "rgba(255,255,255,0.16)",
  accentBlue:    "#38bdf8",
};
// ─────────────────────────────────────────────────────────────

const TAGS = ["ERP Implementation", "Techno-Functional", "Process Automation", "ERP Consulting"];

export default function Home() {
  const [showModules, setShowModules] = useState(false);
  const [hoveredModule, setHoveredModule] = useState(null);
  const [tagIndex, setTagIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowModules(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through tags
  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % TAGS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative min-h-screen w-full overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@900&display=swap');

        .home-wrap { font-family: 'DM Sans', sans-serif; }

        /* Heading fade-in */
        .hero-heading {
          animation: fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-sub {
          animation: fadeSlideUp 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-btn {
          animation: fadeSlideUp 0.8s 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-tags {
          animation: fadeSlideUp 0.8s 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Cycling tag */
        .tag-cycle {
          animation: tagFade 0.4s ease;
        }
        @keyframes tagFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Module list items stagger */
        .module-item {
          animation: fadeSlideRight 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Hover on module: text grows + arrow appears */
        .module-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0px;
          font-size: 15px;
          font-weight: 500;
          color: ${COLORS.textSubtle};
          letter-spacing: 0.03em;
          transition: color 0.25s, gap 0.25s, font-size 0.25s;
          text-decoration: none;
        }
        .module-link:hover {
          color: ${COLORS.textWhite};
          gap: 8px;
          font-size: 17px;
        }
        .module-arrow {
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s, transform 0.2s;
          font-size: 14px !important;
        }
        .module-link:hover .module-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Number badge */
        .module-num {
          font-size: 10px;
          color: ${COLORS.accentBlue};
          font-weight: 700;
          margin-right: 8px;
          opacity: 0.7;
          font-variant-numeric: tabular-nums;
          transition: opacity 0.2s;
        }
        .module-link:hover .module-num { opacity: 1; }

        /* CTA button */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 24px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          color: ${COLORS.textWhite};
          border: 1px solid ${COLORS.borderWhite};
          background: ${COLORS.chipBg};
          border-radius: 8px;
          backdrop-filter: blur(8px);
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }
        .cta-btn:hover {
          background: ${COLORS.chipHover};
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-2px);
        }
        .cta-btn:active { transform: scale(0.98); }

        /* Divider line left column */
        .accent-line {
          width: 40px; height: 2px;
          background: ${COLORS.accentBlue};
          border-radius: 2px;
          margin: 16px 0;
        }

        /* Scroll indicator */
        .scroll-hint {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }

        /* Right column label */
        .nav-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${COLORS.accentBlue};
          margin-bottom: 20px;
        }
      `}</style>

      {/* ── Background GIF ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/originals/ad/67/09/ad67090ff30d09ce9a4496b2a85a3e84.gif')" }}
      />

      {/* ── Dark overlay ── */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: COLORS.overlayDark }}
      />

      {/* ── Content ── */}
      <div className="home-wrap relative z-10 min-h-screen px-8 sm:px-12 lg:px-20 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left Column ── */}
          <div>
            {/* Top badge */}
            <div
              className="hero-tags inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{ background: COLORS.chipBg, border: `1px solid ${COLORS.borderWhite}`, backdropFilter: "blur(8px)" }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accentBlue, display: "inline-block", flexShrink: 0 }} />
              <span
                key={tagIndex}
                className="tag-cycle"
                style={{ fontSize: 11, fontWeight: 600, color: COLORS.textSubtle, letterSpacing: "0.05em" }}
              >
                {TAGS[tagIndex]}
              </span>
            </div>

            {/* Heading */}
            <h1 className="hero-heading font-extrabold leading-none tracking-tight mb-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <span
                className="block text-transparent text-6xl sm:text-7xl lg:text-8xl"
                style={{ WebkitTextStroke: "2px white", letterSpacing: "0.06em" }}
              >
                H!!!...
              </span>
              <span
                className="block text-white text-5xl sm:text-6xl lg:text-7xl"
                style={{ letterSpacing: "0.04em" }}
              >
                I'm <span style={{ color: COLORS.accentBlue }}>ADITYA</span>
              </span>
            </h1>

            {/* Accent line */}
            <div className="accent-line" />

            {/* Sub heading */}
            <p className="hero-sub text-sm sm:text-base mb-8 max-w-sm leading-relaxed" style={{ color: COLORS.textMuted }}>
              Bridging business processes with technology — delivering scalable ERP solutions across finance, inventory, and supply chain.
            </p>

            {/* CTA Button */}
            <div className="hero-btn">
              <Link to="/ChatbotUI" className="cta-btn">
                <ChatIcon style={{ fontSize: 16 }} />
                Chat with AdiBot
                <ArrowForwardIcon style={{ fontSize: 14 }} />
              </Link>
            </div>
          </div>

          {/* ── Right Column: Modules ── */}
          <div
            className={`flex flex-col items-start lg:items-end transition-all duration-700 ${
              showModules ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {showModules && (
              <div className="lg:text-right">
                <p className="nav-label">Navigate</p>

                {/* Subtle divider */}
                <div
                  className="mb-6 ml-auto"
                  style={{ width: 32, height: 1, background: COLORS.borderWhite }}
                />

                <ul className="space-y-5">
                  {MODULE_ROUTES.map((module, index) => (
                    <li
                      key={index}
                      className="module-item flex items-center lg:justify-end hover-cursor-pointer "
                      style={{ animationDelay: `${index * 80}ms` }}
                      onMouseEnter={() => setHoveredModule(index)}
                      onMouseLeave={() => setHoveredModule(null)}
                    >
                      <Link to={module.path} className="module-link">
                        <span className="module-num">{String(index + 1).padStart(2, "0")}</span>
                        {module.name}
                        <ArrowForwardIcon className="module-arrow" />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Footer note */}
                <p
                  className="mt-10 text-xs"
                  style={{ color: COLORS.textMuted, letterSpacing: "0.04em" }}
                >
                  © {new Date().getFullYear()} Aditya Vilas Pawar
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}