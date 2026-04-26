import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SelfPic from "./img1.jpg";

// ── Color Variables ──────────────────────────────────────────
const COLORS = {
  primary:     "#1477d2",
  primaryHover:"#1260b0",
  textDark:    "#0f1a2b",
  textMid:     "#374151",
  textMuted:   "#6b7280",
  textWhite:   "#ffffff",
  bgPage:      "#ffffff",
  bgCard:      "#f9fbfd",
  borderCard:  "#e8edf3",
  accentGreen: "#22c55e",
};
// ─────────────────────────────────────────────────────────────

const tags = [
  "ERP Implementation",
  "Functional & Technical Consulting",
  "Accounting & Finance",
  "Inventory & Warehouse",
  "Manufacturing & Production",
  "Automation & Client Scripting",
];

export default function About() {
  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center bg-white px-6 md:px-14">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;900&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-dm       { font-family: 'DM Sans', sans-serif; }

        .available-dot {
          display: inline-block;
          width: 7px; height: 7px;
          background: ${COLORS.accentGreen};
          border-radius: 50%;
          flex-shrink: 0;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .tag-pill {
          font-size: 10px;
          font-weight: 500;
          padding: 3px 11px;
          border-radius: 999px;
          border: 1px solid ${COLORS.primary};
          color: ${COLORS.primary};
          transition: background 0.18s, color 0.18s;
          cursor: default;
          white-space: nowrap;
        }
        .tag-pill:hover {
          background: ${COLORS.primary};
          color: ${COLORS.textWhite};
        }
      `}</style>

      <div className="w-full max-w-6xl font-dm">

        {/* ── Top Grid: Photo + Content ── */}
        <div className="grid grid-cols-2 gap-12 items-center">

          {/* Left — Photo (same as original: full width, max-w-lg, h-[470px]) */}
          <div className="relative">
            {/* Decorative offset border */}
            <div
              className="absolute rounded-sm z-0"
              style={{
                top: 10, left: 10, right: -10, bottom: -10,
                opacity: 0.2,
              }}
            />
            <img
              src={SelfPic}
              alt="Aditya Vilas Pawar"
              className="relative z-10 shadow-2xl object-cover rounded-sm w-full max-w-lg h-[380px] mx-auto"
            />
          </div>

          {/* Right — Content */}
          <div>
            {/* Section label */}
            <p
              className="text-xs font-bold tracking-widest uppercase mb-1"
              style={{ color: COLORS.primary }}
            >
              About Me
            </p>

            {/* Heading */}
            <h1
              className="font-playfair font-black leading-tight mb-1"
              style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)", color: COLORS.textDark }}
            >
              ERP Consultant &{" "}
              <span style={{ color: COLORS.primary }}>Techno-Functional Expert</span>
            </h1>

            {/* Accent bar */}
            <div
              className="rounded-full my-3"
              style={{ width: 40, height: 3, background: COLORS.primary }}
            />

            {/* Bio */}
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: COLORS.textMuted, maxWidth: 480 }}
            >
              Hi! I'm{" "}
              <span className="font-bold" style={{ color: COLORS.primary }}>
                Aditya Vilas Pawar
              </span>
              , an ERP techno-functional consultant experienced in designing and
              implementing practical, scalable ERP solutions across accounting,
              inventory, manufacturing, procurement, and supply chain — bridging
              real business needs with effective technical execution.
            </p>

            {/* Focus label */}
            <p
              className="text-xs font-bold tracking-widest uppercase mb-2"
              style={{ color: COLORS.textDark }}
            >
              Areas of Focus
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          className="my-6"
          style={{ height: 1, background: COLORS.borderCard }}
        />

        {/* ── Info Cards ── */}
        <div className="grid grid-cols-3 gap-4">

          {/* Location */}
          <div
            className="rounded-xl p-4 transition-shadow duration-200 hover:shadow-md"
            style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.borderCard}` }}
          >
            <h3
              className="flex items-center gap-1.5 font-bold text-xs mb-2"
              style={{ color: COLORS.textDark }}
            >
              <PlaceIcon fontSize="small" style={{ color: COLORS.primary }} />
              Location
            </h3>
            <p className="text-xs" style={{ color: COLORS.textMuted }}>
              <span className="font-semibold" style={{ color: COLORS.textMid }}>Current:</span> Bangalore
            </p>
            <p className="text-xs mt-0.5" style={{ color: COLORS.textMuted }}>
              <span className="font-semibold" style={{ color: COLORS.textMid }}>Hometown:</span> Pune
            </p>
          </div>

          {/* Contact */}
          <div
            className="rounded-xl p-4 transition-shadow duration-200 hover:shadow-md"
            style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.borderCard}` }}
          >
            <h3
              className="flex items-center gap-1.5 font-bold text-xs mb-2"
              style={{ color: COLORS.textDark }}
            >
              <LocalPostOfficeIcon fontSize="small" style={{ color: COLORS.primary }} />
              Contact
            </h3>
            <a
              href="mailto:adityapawar8909@gmail.com"
              className="text-xs hover:underline break-all"
              style={{ color: COLORS.primary }}
            >
              adityapawar8909@gmail.com
            </a>
          </div>

          {/* Availability */}
          <div
            className="rounded-xl p-4 transition-shadow duration-200 hover:shadow-md"
            style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.borderCard}` }}
          >
            <h3
              className="flex items-center gap-1.5 font-bold text-xs mb-2"
              style={{ color: COLORS.textDark }}
            >
              <AssessmentIcon fontSize="small" style={{ color: COLORS.primary }} />
              Availability
            </h3>
            <p
              className="text-xs flex items-center gap-1.5"
              style={{ color: COLORS.textMuted }}
            >
              <span className="available-dot" />
              Open for freelance &amp; ERP consulting
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}