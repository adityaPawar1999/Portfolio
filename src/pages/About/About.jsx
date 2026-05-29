// import React, { useState, useEffect, useRef } from "react";
// import SelfPic from "./img1.jpg";

// // ── Color Palette ──────────────────────────────────────────────
// const C = {
//   red:      "#FF2D55",
//   yellow:   "#FFE600",
//   cyan:     "#00FFFF",
//   white:    "#FFFFFF",
//   dark:     "#000000",
//   dimW55:   "rgba(255,255,255,0.55)",
//   dimW30:   "rgba(255,255,255,0.30)",
//   dimW12:   "rgba(255,255,255,0.12)",
//   dimW06:   "rgba(255,255,255,0.06)",
//   redGlow:  "rgba(255,45,85,0.55)",
//   cyanGlow: "rgba(0,255,255,0.2)",
// };

// const GIF_URL =
//   "https://i.pinimg.com/originals/ad/67/09/ad67090ff30d09ce9a4496b2a85a3e84.gif";

// const TAGS = [
//   "ERP Implementation",
//   "Functional & Technical Consulting",
//   "Accounting & Finance",
//   "Inventory & Warehouse",
//   "Manufacturing & Production",
//   "Automation & Client Scripting",
// ];

// // ─────────────────────────────────────────────────────────────

// export default function About() {
//   const [visible, setVisible]       = useState(false);
//   const [glitch, setGlitch]         = useState(false);
//   const [mousePos, setMousePos]     = useState({ x: 0, y: 0 });
//   const [hoveredTag, setHoveredTag] = useState(null);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const rootRef = useRef(null);

//   // Mount reveal
//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), 120);
//     return () => clearTimeout(t);
//   }, []);

//   // Glitch burst
//   useEffect(() => {
//     const fire = () => {
//       setGlitch(true);
//       setTimeout(() => setGlitch(false), 260);
//     };
//     const t = setInterval(fire, 5000 + Math.random() * 4000);
//     return () => clearInterval(t);
//   }, []);

//   // Mouse parallax
//   const handleMouseMove = (e) => {
//     if (!rootRef.current) return;
//     const { left, top, width, height } = rootRef.current.getBoundingClientRect();
//     setMousePos({
//       x: ((e.clientX - left) / width  - 0.5) * 14,
//       y: ((e.clientY - top)  / height - 0.5) * 8,
//     });
//   };

//   return (
//     <div
//       ref={rootRef}
//       onMouseMove={handleMouseMove}
//       style={{ position: "relative", minHeight: "100vh", width: "100%", overflow: "hidden", background: "#000", marginTop: 60 }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Permanent+Marker&family=Barlow+Condensed:wght@700;900&display=swap');

//         * { box-sizing: border-box; margin: 0; padding: 0; }

//         /* ── Animations ── */
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(28px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeLeft {
//           from { opacity: 0; transform: translateX(-28px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes fadeRight {
//           from { opacity: 0; transform: translateX(28px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes neonFlicker {
//           0%,100% { opacity:1; }
//           91% { opacity:1; } 92% { opacity:0.2; } 93% { opacity:1; }
//           95% { opacity:0.5; } 96% { opacity:1; }
//         }
//         @keyframes scanMove {
//           from { transform: translateY(-100%); }
//           to   { transform: translateY(100vh); }
//         }
//         @keyframes blinkDot {
//           0%,100% { opacity:1; box-shadow: 0 0 6px #FF2D55; }
//           50%      { opacity:0.25; box-shadow: none; }
//         }
//         @keyframes rotateCW  { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
//         @keyframes rotateCCW { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
//         @keyframes glitchSlip {
//           0%   { clip-path: inset(0 0 100% 0); transform: translate(0); }
//           20%  { clip-path: inset(20% 0 50% 0); transform: translate(-5px, 2px); }
//           40%  { clip-path: inset(55% 0 15% 0); transform: translate(5px, -2px); }
//           60%  { clip-path: inset(8%  0 75% 0); transform: translate(-3px, 3px); }
//           80%  { clip-path: inset(75% 0 5%  0); transform: translate(3px, -1px); }
//           100% { clip-path: inset(0 0 0 0);    transform: translate(0); }
//         }
//         @keyframes marqueeTicker {
//           from { transform: translateX(0); }
//           to   { transform: translateX(-50%); }
//         }
//         @keyframes pulseStatus {
//           0%,100% { opacity:1; box-shadow: 0 0 0 0 rgba(0,255,136,0.5); }
//           50%      { opacity:0.6; box-shadow: 0 0 0 5px rgba(0,255,136,0); }
//         }
//         @keyframes photoReveal {
//           from { clip-path: inset(0 100% 0 0); }
//           to   { clip-path: inset(0 0% 0 0); }
//         }
//         @keyframes stripePulse {
//           0%,100% { box-shadow: 4px 0 18px ${C.redGlow}; }
//           50%      { box-shadow: 4px 0 36px rgba(255,45,85,0.95); }
//         }
//         @keyframes tagPop {
//           from { opacity:0; transform: scale(0.75) rotate(-3deg); }
//           to   { opacity:1; transform: scale(1)    rotate(0deg); }
//         }
//         @keyframes cardSlideUp {
//           from { opacity:0; transform: translateY(32px); }
//           to   { opacity:1; transform: translateY(0); }
//         }

//         /* ── BG ── */
//         .ab-bg {
//           position: absolute; inset: 0;
//           background-image: url('${GIF_URL}');
//           background-size: cover;
//           background-position: center;
//           filter: brightness(0.25) saturate(1.4) contrast(1.1);
//           transition: transform 0.12s ease-out;
//         }
//         .ab-overlay   { position:absolute; inset:0; background: rgba(0,0,0,0.6); }
//         .ab-scanlines {
//           position:absolute; inset:0;
//           background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px);
//           pointer-events:none; z-index:2;
//         }
//         .ab-vignette {
//           position:absolute; inset:0;
//           background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.75) 100%);
//           pointer-events:none; z-index:3;
//         }
//         .ab-scan-sweep {
//           position:absolute; left:0; right:0; height:3px;
//           background: rgba(255,255,255,0.04);
//           pointer-events:none; z-index:4;
//           animation: scanMove 7s linear infinite;
//         }

//         /* ── Stripes ── */
//         .ab-stripe-r {
//           position:absolute; top:-20px; left:-16px;
//           width:300px; height:7px; background:${C.red};
//           transform:rotate(-8deg); transform-origin:left center;
//           z-index:5;
//           animation: neonFlicker 5s infinite, stripePulse 2s ease-in-out infinite;
//         }
//         .ab-stripe-y {
//           position:absolute; top:-8px; left:-16px;
//           width:200px; height:2.5px; background:${C.yellow};
//           transform:rotate(-8deg); transform-origin:left center;
//           z-index:5; animation: neonFlicker 5s 0.5s infinite;
//         }

//         /* ── Decorative dials ── */
//         .ab-dial {
//           position:absolute; bottom:52px; right:32px;
//           width:52px; height:52px;
//           border:1px solid rgba(255,230,0,0.22);
//           border-top-color:${C.yellow};
//           border-radius:50%; z-index:5;
//           animation: rotateCW 9s linear infinite;
//         }
//         .ab-dial2 {
//           position:absolute; bottom:68px; right:68px;
//           width:22px; height:22px;
//           border:1px solid rgba(255,230,0,0.15);
//           border-right-color:${C.yellow};
//           border-radius:50%; z-index:5;
//           animation: rotateCCW 4.5s linear infinite;
//         }

//         /* ── Side labels ── */
//         .ab-side-label {
//           position:absolute; top:50%; left:18px;
//           font-family:'Space Mono',monospace;
//           font-size:9px; color:rgba(255,255,255,0.12);
//           letter-spacing:0.28em; text-transform:uppercase;
//           z-index:5; white-space:nowrap;
//           transform: translateY(-50%) rotate(-90deg);
//           transform-origin: center center;
//           pointer-events:none;
//         }
//         .ab-corner-tag {
//           position:absolute; bottom:50px; left:22px;
//           font-family:'Permanent Marker',cursive;
//           font-size:12px; color:rgba(0,255,255,0.28);
//           z-index:5; transform:rotate(-5deg);
//           pointer-events:none;
//         }

//         /* ── Ticker ── */
//         .ab-ticker {
//           position:absolute; bottom:0; left:0; right:0;
//           height:28px; background:${C.red};
//           overflow:hidden; z-index:6;
//           display:flex; align-items:center;
//         }
//         .ab-ticker-inner {
//           display:flex; white-space:nowrap;
//           animation: marqueeTicker 22s linear infinite;
//           font-family:'Space Mono',monospace;
//           font-size:10px; font-weight:700;
//           color:${C.white}; letter-spacing:0.16em; text-transform:uppercase;
//         }
//         .ab-ticker-sep { color:${C.yellow}; margin:0 18px; }

//         /* ── Content ── */
//         .ab-content {
//           position:relative; z-index:10;
//           max-width:1200px; margin:0 auto;
//           padding:48px 28px 56px 56px;
//         }
//         @media(max-width:768px){
//           .ab-content { padding:32px 20px 56px; }
//           .ab-grid { grid-template-columns:1fr !important; }
//           .ab-cards-grid { grid-template-columns:1fr !important; }
//         }

//         /* ── Section label ── */
//         .ab-section-label {
//           font-family:'Space Mono',monospace;
//           font-size:9px; font-weight:700;
//           letter-spacing:0.22em; text-transform:uppercase;
//           color:${C.red};
//           margin-bottom:14px;
//           animation: fadeUp 0.5s 0.1s both;
//         }

//         /* ── Main heading ── */
//         .ab-h1 {
//           font-family:'Bebas Neue',sans-serif;
//           font-size:clamp(44px,6vw,72px);
//           line-height:0.9;
//           color:${C.white};
//           letter-spacing:0.04em;
//           display:block;
//           animation: fadeUp 0.7s 0.2s both;
//         }
//         .ab-h1-outline {
//           font-family:'Bebas Neue',sans-serif;
//           font-size:clamp(40px,5.5vw,66px);
//           line-height:0.95;
//           color:transparent;
//           -webkit-text-stroke:2px ${C.white};
//           letter-spacing:0.04em;
//           display:block;
//           animation: fadeUp 0.7s 0.28s both;
//         }
//         .ab-h1-accent {
//           color:${C.yellow};
//           text-shadow:3px 3px 0 ${C.red}, -1px -1px 0 ${C.red};
//         }
//         .ab-glitch-wrap { position:relative; }
//         .ab-glitch-layer {
//           position:absolute; top:0; left:2px;
//           color:${C.cyan}; opacity:0.65;
//           mix-blend-mode:screen; pointer-events:none;
//           font-family:'Bebas Neue',sans-serif;
//           font-size:clamp(44px,6vw,72px);
//           line-height:0.9; letter-spacing:0.04em;
//         }
//         .glitch-on .ab-glitch-layer {
//           animation: glitchSlip 0.26s steps(1) forwards;
//         }

//         /* ── Marker subtitle ── */
//         .ab-marker-sub {
//           font-family:'Permanent Marker',cursive;
//           font-size:14px; color:${C.cyan};
//           margin:10px 0 14px; letter-spacing:0.04em;
//           animation: fadeUp 0.7s 0.34s both;
//         }

//         /* ── Divider ── */
//         .ab-divider {
//           display:flex; align-items:center; gap:8px;
//           margin:12px 0 18px;
//           animation: fadeUp 0.6s 0.38s both;
//         }
//         .ab-div-red  { height:2.5px; width:40px; background:${C.red}; flex-shrink:0; }
//         .ab-div-sq   { width:7px; height:7px; background:${C.yellow}; transform:rotate(45deg); flex-shrink:0; }
//         .ab-div-line { height:1px; flex:1; background:rgba(255,255,255,0.1); }

//         /* ── Description ── */
//         .ab-desc {
//           font-family:'Space Mono',monospace;
//           font-size:11.5px; color:rgba(255,255,255,0.52);
//           line-height:1.9; max-width:420px;
//           letter-spacing:0.02em;
//           margin-bottom:22px;
//           animation: fadeUp 0.6s 0.44s both;
//         }
//         .ab-desc-name {
//           color:${C.yellow}; font-weight:700;
//         }

//         /* ── Focus label ── */
//         .ab-focus-label {
//           font-family:'Space Mono',monospace;
//           font-size:9px; font-weight:700;
//           letter-spacing:0.2em; text-transform:uppercase;
//           color:rgba(255,255,255,0.35);
//           margin-bottom:12px;
//           animation: fadeUp 0.6s 0.5s both;
//         }

//         /* ── Tags ── */
//         .ab-tags { display:flex; flex-wrap:wrap; gap:8px; }
//         .ab-tag {
//           font-family:'Space Mono',monospace;
//           font-size:9px; font-weight:700;
//           letter-spacing:0.1em; text-transform:uppercase;
//           padding:6px 13px;
//           border:1.5px solid rgba(255,45,85,0.45);
//           color:rgba(255,255,255,0.5);
//           border-radius:2px;
//           background:rgba(255,45,85,0.06);
//           clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
//           cursor:default;
//           transition: all 0.2s ease;
//           animation: tagPop 0.5s cubic-bezier(0.34,1.4,0.64,1) both;
//         }
//         .ab-tag:hover, .ab-tag.hovered {
//           border-color:${C.red};
//           color:${C.yellow};
//           background:rgba(255,45,85,0.14);
//           box-shadow:0 0 12px ${C.redGlow};
//         }

//         /* ── Horizontal separator ── */
//         .ab-h-sep {
//           height:1px;
//           background:linear-gradient(90deg, ${C.red}, rgba(255,230,0,0.4), transparent);
//           margin:32px 0;
//           animation: fadeLeft 0.8s 0.6s both;
//         }

//         /* ── PHOTO ── */
//         .ab-photo-wrap {
//           position:relative;
//           animation: fadeRight 0.8s 0.15s both;
//         }
//         .ab-photo-frame {
//           position:relative;
//           display:inline-block;
//         }
//         .ab-photo-frame::before {
//           content:'';
//           position:absolute;
//           top:-8px; left:-8px; right:8px; bottom:8px;
//           border:2px solid ${C.red};
//           z-index:0;
//           animation: neonFlicker 6s 1s infinite;
//         }
//         .ab-photo-frame::after {
//           content:'';
//           position:absolute;
//           top:8px; left:8px; right:-8px; bottom:-8px;
//           border:2px solid ${C.yellow};
//           z-index:0;
//           opacity:0.5;
//         }
//         .ab-photo {
//           position:relative; z-index:1;
//           width:100%; max-width:280px; height:370px;
//           object-fit:cover;
//           filter: grayscale(25%) contrast(1.1);
//           display:block;
//           animation: photoReveal 0.9s cubic-bezier(0.77,0,0.18,1) 0.3s both;
//         }
//         .ab-photo-badge {
//           position:absolute;
//           bottom:-14px; right:-14px;
//           z-index:2;
//           background:${C.red};
//           color:${C.white};
//           font-family:'Bebas Neue',sans-serif;
//           font-size:13px;
//           letter-spacing:0.14em;
//           padding:7px 14px;
//           clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
//           box-shadow: 3px 3px 0 ${C.yellow};
//           white-space:nowrap;
//         }
//         .ab-photo-label {
//           position:absolute;
//           top:14px; left:-10px;
//           font-family:'Permanent Marker',cursive;
//           font-size:10px; color:${C.cyan};
//           transform:rotate(-90deg); transform-origin:left bottom;
//           z-index:2; letter-spacing:0.06em; white-space:nowrap;
//           opacity:0.65;
//         }

//         /* ── Info Cards ── */
//         .ab-cards-grid {
//           display:grid;
//           grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
//           gap:16px;
//         }
//         .ab-card {
//           border-radius:0;
//           padding:18px 20px;
//           background:rgba(255,255,255,0.03);
//           border:1px solid rgba(255,255,255,0.1);
//           border-top:2px solid ${C.red};
//           clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
//           transition: all 0.2s ease;
//           animation: cardSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
//           cursor:default;
//         }
//         .ab-card.hovered {
//           background:rgba(255,45,85,0.07);
//           border-color:rgba(255,45,85,0.6);
//           border-top-color:${C.red};
//           box-shadow:0 0 20px rgba(255,45,85,0.18);
//           transform:translateY(-4px);
//         }
//         .ab-card-title {
//           display:flex; align-items:center; gap:9px;
//           font-family:'Barlow Condensed',sans-serif;
//           font-size:15px; font-weight:700;
//           letter-spacing:0.1em; text-transform:uppercase;
//           color:${C.white};
//           margin-bottom:10px;
//         }
//         .ab-card-icon {
//           color:${C.red}; flex-shrink:0;
//           animation: neonFlicker 7s 2s infinite;
//         }
//         .ab-card-text {
//           font-family:'Space Mono',monospace;
//           font-size:11px; color:rgba(255,255,255,0.45);
//           line-height:1.75; letter-spacing:0.02em;
//         }
//         .ab-card-text strong {
//           color:rgba(255,255,255,0.7); font-weight:700;
//         }
//         .ab-card-link {
//           font-family:'Space Mono',monospace;
//           font-size:11px; color:${C.cyan};
//           text-decoration:none; word-break:break-all;
//           transition:color 0.2s, text-shadow 0.2s;
//         }
//         .ab-card-link:hover {
//           color:${C.yellow};
//           text-shadow:0 0 10px rgba(255,230,0,0.5);
//         }

//         /* ── Status ── */
//         .ab-status {
//           display:flex; align-items:center; gap:9px;
//           font-family:'Space Mono',monospace;
//           font-size:11px; color:rgba(255,255,255,0.45);
//         }
//         .ab-status-dot {
//           width:8px; height:8px;
//           background:#00FF88; border-radius:50%; flex-shrink:0;
//           animation: pulseStatus 1.8s infinite;
//         }
//       `}</style>

//       {/* ── Background Layers ── */}
//       <div
//         className="ab-bg"
//         style={{ transform: `translate(${mousePos.x * 0.35}px, ${mousePos.y * 0.35}px) scale(1.06)` }}
//       />
//       <div className="ab-overlay" />
//       <div className="ab-scanlines" />
//       <div className="ab-vignette" />
//       <div className="ab-scan-sweep" />

//       {/* ── Decorative ── */}
//       <div className="ab-stripe-r" />
//       <div className="ab-stripe-y" />
//       <div className="ab-dial" />
//       <div className="ab-dial2" />
//       <span className="ab-side-label">ERP · Techno-Functional · Consulting · Automation</span>
//       <span className="ab-corner-tag">ADITYA PAWAR © MMXXVI</span>

//       {/* ── Main Content ── */}
//       <div
//         className="ab-content"
//         style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
//       >
//         {/* ── TOP GRID ── */}
//         <div className="ab-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", marginBottom: 36 }}>

//           {/* Photo */}
//           <div className="ab-photo-wrap" style={{ display: "flex", justifyContent: "center" }}>
//             <div className="ab-photo-frame">
//               <span className="ab-photo-label">Aditya Vilas Pawar</span>
//               <img className="ab-photo" src={SelfPic} alt="Aditya Vilas Pawar" />
//               <span className="ab-photo-badge">ERP Consultant</span>
//             </div>
//           </div>

//           {/* Text */}
//           <div>
//             <p className="ab-section-label">// About Me</p>

//             <div className={`ab-glitch-wrap ${glitch ? "glitch-on" : ""}`}>
//               <span className="ab-h1">ERP Consultant &amp;</span>
//               <span className="ab-glitch-layer" aria-hidden="true">ERP Consultant &amp;</span>
//             </div>
//             <span className="ab-h1-outline">
//               Techno-<span className="ab-h1-accent">Functional</span>
//             </span>

//             <p className="ab-marker-sub">// expert in scalable enterprise solutions</p>

//             <div className="ab-divider">
//               <span className="ab-div-red" />
//               <span className="ab-div-sq" />
//               <span className="ab-div-line" />
//             </div>

//             <p className="ab-desc">
//               Hi! I'm{" "}
//               <span className="ab-desc-name">Aditya Vilas Pawar</span>
//               , an ERP techno-functional consultant experienced in designing and implementing practical, scalable ERP solutions across accounting, inventory, manufacturing, procurement, and supply chain.
//             </p>

//             <p className="ab-focus-label">★ Areas of Focus</p>

//             <div className="ab-tags">
//               {TAGS.map((tag, i) => (
//                 <span
//                   key={tag}
//                   className={`ab-tag ${hoveredTag === i ? "hovered" : ""}`}
//                   style={{ animationDelay: `${500 + i * 70}ms` }}
//                   onMouseEnter={() => setHoveredTag(i)}
//                   onMouseLeave={() => setHoveredTag(null)}
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── Separator ── */}
//         <div className="ab-h-sep" />

//         {/* ── Info Cards ── */}
//         <div className="ab-cards-grid">

//           {/* Location */}
//           <div
//             className={`ab-card ${hoveredCard === 0 ? "hovered" : ""}`}
//             style={{ animationDelay: "680ms" }}
//             onMouseEnter={() => setHoveredCard(0)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             <div className="ab-card-title">
//               <svg className="ab-card-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
//               </svg>
//               Location
//             </div>
//             <p className="ab-card-text"><strong>Current:</strong> Bangalore</p>
//             <p className="ab-card-text"><strong>Hometown:</strong> Pune</p>
//           </div>

//           {/* Contact */}
//           <div
//             className={`ab-card ${hoveredCard === 1 ? "hovered" : ""}`}
//             style={{ animationDelay: "760ms" }}
//             onMouseEnter={() => setHoveredCard(1)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             <div className="ab-card-title">
//               <svg className="ab-card-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//                 <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
//               </svg>
//               Contact
//             </div>
//             <a className="ab-card-link" href="mailto:adityapawar8909@gmail.com">
//               adityapawar8909@gmail.com
//             </a>
//           </div>

//           {/* Availability */}
//           <div
//             className={`ab-card ${hoveredCard === 2 ? "hovered" : ""}`}
//             style={{ animationDelay: "840ms" }}
//             onMouseEnter={() => setHoveredCard(2)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             <div className="ab-card-title">
//               <svg className="ab-card-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//                 <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
//               </svg>
//               Availability
//             </div>
//             <div className="ab-status">
//               <span className="ab-status-dot" />
//               Open for freelance &amp; ERP consulting
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* ── Bottom Ticker ── */}
//       <div className="ab-ticker">
//         <div className="ab-ticker-inner">
//           {[...Array(4)].map((_, i) => (
//             <React.Fragment key={i}>
//               <span>ERP Implementation</span><span className="ab-ticker-sep">✦</span>
//               <span>Techno-Functional</span><span className="ab-ticker-sep">✦</span>
//               <span>Accounting &amp; Finance</span><span className="ab-ticker-sep">✦</span>
//               <span>Inventory &amp; Warehouse</span><span className="ab-ticker-sep">✦</span>
//               <span>Manufacturing</span><span className="ab-ticker-sep">✦</span>
//               <span>Process Automation</span><span className="ab-ticker-sep">✦</span>
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import styled from "styled-components";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SelfPic from "./img1.jpg";

// ── Styled Components ──────────────────────────────────────────

const AboutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.bgPage};
  padding: 24px 16px;
  margin-top: 60px;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const AboutContent = styled.div`
  width: 100%;
  max-width: 1280px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileImage = styled.img`
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  max-width: 280px;
  height: 380px;
  box-shadow: ${props => props.theme.shadowLg};
`;

const TextSection = styled.div``;

const SubLabel = styled.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.theme.primary};
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: clamp(1.6rem, 2.6vw, 2.4rem);
  font-weight: 900;
  line-height: 1.2;
  color: ${props => props.theme.textDark};
  margin-bottom: 8px;
`;

const HighlightSpan = styled.span`
  color: ${props => props.theme.primary};
`;

const Divider = styled.div`
  width: 40px;
  height: 3px;
  background-color: ${props => props.theme.primary};
  border-radius: 2px;
  margin: 12px 0 16px 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textMid};
  line-height: 1.6;
  margin-bottom: 16px;
  max-width: 400px;
`;

const FocusLabel = styled.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.theme.textDark};
  margin-bottom: 12px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 10px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  transition: all 0.2s ease;
  cursor: default;
  background-color: transparent;

  &:hover {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.textWhite};
  }
`;

const DividerLine = styled.div`
  height: 1px;
  background-color: ${props => props.theme.borderCard};
  margin: 24px 0;
`;

const InfoCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  border-radius: 12px;
  padding: 16px;
  background-color: ${props => props.theme.bgCard};
  border: 1px solid ${props => props.theme.borderCard};
  box-shadow: ${props => props.theme.shadowSm};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadowLg};
  }
`;

const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.textDark};
  margin-bottom: 8px;

  svg {
    color: ${props => props.theme.primary};
    font-size: 18px;
  }
`;

const CardText = styled.p`
  font-size: 12px;
  color: ${props => props.theme.textMid};
  line-height: 1.6;
`;

const CardLink = styled.a`
  font-size: 12px;
  color: ${props => props.theme.primary};
  text-decoration: none;
  word-break: break-all;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.primaryHover};
  }
`;

const StatusBadge = styled.p`
  font-size: 12px;
  color: ${props => props.theme.textMid};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  background-color: ${props => props.theme.accentGreen};
  border-radius: 50%;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

// ── Component ──────────────────────────────────────────────────

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
    <AboutContainer>
      <AboutContent>
        {/* Top Grid */}
        <GridSection>
          {/* Photo */}
          <PhotoContainer>
            <ProfileImage
              src={SelfPic}
              alt="Aditya Vilas Pawar"
            />
          </PhotoContainer>

          {/* Content */}
          <TextSection>
            <SubLabel>About Me</SubLabel>

            <Title>
              ERP Consultant &{" "}
              <HighlightSpan>Techno-Functional Expert</HighlightSpan>
            </Title>

            <Divider />

            <Description>
              Hi! I'm{" "}
              <HighlightSpan style={{ fontWeight: 600 }}>
                Aditya Vilas Pawar
              </HighlightSpan>, an ERP techno-functional consultant experienced in designing and implementing practical, scalable ERP solutions across accounting, inventory, manufacturing, procurement, and supply chain.
            </Description>

            <FocusLabel>Areas of Focus</FocusLabel>

            <TagsContainer>
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagsContainer>
          </TextSection>
        </GridSection>

        {/* Divider */}
        <DividerLine />

        {/* Info Cards */}
        <InfoCardsGrid>
          {/* Location */}
          <InfoCard>
            <CardTitle>
              <PlaceIcon />
              Location
            </CardTitle>
            <CardText>
              <strong>Current:</strong> Bangalore
            </CardText>
            <CardText>
              <strong>Hometown:</strong> Pune
            </CardText>
          </InfoCard>

          {/* Contact */}
          <InfoCard>
            <CardTitle>
              <LocalPostOfficeIcon />
              Contact
            </CardTitle>
            <CardLink href="mailto:adityapawar8909@gmail.com">
              adityapawar8909@gmail.com
            </CardLink>
          </InfoCard>

          {/* Availability */}
          <InfoCard>
            <CardTitle>
              <AssessmentIcon />
              Availability
            </CardTitle>
            <StatusBadge>
              <StatusDot />
              Open for freelance & ERP consulting
            </StatusBadge>
          </InfoCard>
        </InfoCardsGrid>
      </AboutContent>
    </AboutContainer>
  );
}
