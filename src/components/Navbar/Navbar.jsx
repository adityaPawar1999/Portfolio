




import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import ForumIcon from '@mui/icons-material/Forum'; 
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useScrollEffect } from '../../hooks/useScrollEffect';
import { useTheme } from '../../themes/ThemeContext';
import { NAV_LINKS, SOCIAL_LINKS } from '../../constants';

// ── Color Variables ──────────────────────────────────────────
const COLORS = {
  neonRed:      '#FF2D55',
  neonGlow:     'rgba(255,45,85,0.45)',
  neonCyan:     '#00FFFF',
  activeYellow: '#FFE600',
  borderGlass:  'rgba(255,255,255,0.12)',
  borderDark:   'rgba(255,45,85,0.25)',
  redBg:        'rgba(255,45,85,0.10)',
  white:        '#ffffff',
  dark:         '#0f172a',
};
// ─────────────────────────────────────────────────────────────

const SOCIAL_ICONS = {
  GitHub:    GitHubIcon,
  LinkedIn:  LinkedInIcon,
  Instagram: InstagramIcon,
  Chat:      ForumIcon,
};

const DARK_PAGES = ['/about', '/account', '/chatbotui'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const scrolled        = useScrollEffect(50);
  const { toggleTheme } = useTheme();
  const location        = useLocation();

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Close drawer on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu  = () => setIsOpen(false);

  const handleThemeToggle = () => {
    setIsDark(prev => !prev);
    toggleTheme?.();
  };

  const isDarkBg =
    DARK_PAGES.includes(location.pathname.toLowerCase()) ||
    location.pathname.toLowerCase().startsWith('/blog') ||
    !scrolled;

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.toLowerCase().startsWith(path.toLowerCase());

  const navText  = 'text-white/70';
  const navHover = 'hover:text-white';
  const btnText  = 'text-white';

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Barlow+Condensed:wght@700;900&display=swap');

        .nb { font-family: 'Space Mono', monospace; }

        /* ── Logo ── */
        .logo-street {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 0.1em;
          text-decoration: none;
          color: ${COLORS.white};
          transition: text-shadow 0.2s;
        }
        .logo-street:hover {
          text-shadow: 0 0 12px ${COLORS.neonGlow}, 0 0 28px ${COLORS.neonGlow};
        }
        .logo-dot {
          color: ${COLORS.neonRed};
          text-shadow: 0 0 8px ${COLORS.neonGlow};
          animation: nbFlicker 6s infinite;
        }

        /* ── Nav underline ── */
        .nav-underline { position: relative; }
        .nav-underline::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 50%;
          width: 0; height: 2px;
          background: ${COLORS.neonRed};
          box-shadow: 0 0 8px ${COLORS.neonGlow}, 0 0 16px ${COLORS.neonGlow};
          border-radius: 0;
          transition: width 0.3s ease, left 0.3s ease;
        }
        .nav-underline.is-active::after,
        .nav-underline:hover::after {
          width: calc(100% - 24px);
          left: 12px;
        }

        /* ── Social ── */
        .social-btn:hover svg {
          filter: drop-shadow(0 0 5px ${COLORS.neonGlow});
          color: ${COLORS.neonRed};
        }

        /* ── Theme btn ── */
        .theme-btn:hover {
          box-shadow: 0 0 10px ${COLORS.neonGlow}, 0 0 22px ${COLORS.neonGlow};
          border-color: ${COLORS.neonRed} !important;
        }

        /* ── Mobile link ── */
        .mob-link:hover {
          box-shadow: inset 3px 0 0 ${COLORS.neonRed};
        }
        .mob-social:hover svg {
          filter: drop-shadow(0 0 5px ${COLORS.neonGlow});
          color: ${COLORS.neonRed};
        }

        /* ── Drawer ── */
        .drawer { transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }
        .drawer-open  { transform: translateX(0); }
        .drawer-close { transform: translateX(100%); }
        .drawer::-webkit-scrollbar       { width: 3px; }
        .drawer::-webkit-scrollbar-thumb { background: ${COLORS.neonRed}; border-radius: 0; }

        /* ── Flicker ── */
        @keyframes nbFlicker {
          0%,100% { opacity:1; }
          91%  { opacity:1; } 92%  { opacity:0.2; } 93%  { opacity:1; }
          95%  { opacity:0.5; } 96% { opacity:1; }
        }

        /* ── Ticker ── */
        @keyframes marqueeTicker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .nb-ticker-inner {
          display: flex; white-space: nowrap;
          animation: marqueeTicker 22s linear infinite;
          font-family: 'Space Mono', monospace;
          font-size: 9px; font-weight: 700;
          color: ${COLORS.white}; letter-spacing: 0.16em;
          text-transform: uppercase; opacity: 0.9;
        }
        .nb-ticker-sep { color: ${COLORS.activeYellow}; margin: 0 14px; }
      `}</style>

      {/* ════════════════════════════════════════
          NAVBAR BAR
      ════════════════════════════════════════ */}
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link to="/" className="logo-street flex-shrink-0">
            Aditya<span className="logo-dot">.</span>Dev
          </Link>

          {/* ── Desktop Menu ── */}
          <div className="hidden md:flex items-center gap-5">

            {/* Nav links */}
            <div className="flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`
                    nav-underline px-3 py-1.5 transition-colors duration-200
                    ${isActive(link.href)
                      ? 'is-active'
                      : `${navText} ${navHover}`}
                  `}
                  style={{
                    textDecoration: 'none',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isActive(link.href) ? COLORS.activeYellow : undefined,
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-5 w-px flex-shrink-0" style={{ background: COLORS.borderDark }} />

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = SOCIAL_ICONS[link.name];
                const cls  = `social-btn flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 ${navText} ${navHover}`;
                const sty  = { textDecoration: 'none' };
                return link.name === 'Chat'
                  ? <Link key={link.name} to={link.href} className={cls} style={sty} title="Chat"><Icon style={{ fontSize: 18 }} /></Link>
                  : <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={cls} style={sty} title={link.name}><Icon style={{ fontSize: 18 }} /></a>;
              })}
            </div>

            {/* Divider */}
            <div className="h-5 w-px flex-shrink-0" style={{ background: COLORS.borderDark }} />

            {/* Theme toggle */}
            <button
              onClick={handleThemeToggle}
              className="theme-btn flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all duration-200"
              style={{
                background: COLORS.redBg,
                border: `1px solid ${COLORS.borderDark}`,
                color: COLORS.white,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                borderRadius: 0,
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
              }}
            >
              {isDark
                ? <><LightModeIcon style={{ fontSize: 13 }} />&nbsp;Light</>
                : <><DarkModeIcon  style={{ fontSize: 13 }} />&nbsp;Dark</>
              }
            </button>
          </div>

          {/* ── Mobile: theme + hamburger ── */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleThemeToggle}
              className="theme-btn flex items-center justify-center w-8 h-8 transition-all duration-200"
              style={{
                background: COLORS.redBg,
                border: `1px solid ${COLORS.borderDark}`,
                color: COLORS.white,
                cursor: 'pointer',
                borderRadius: 0,
              }}
            >
              {isDark
                ? <LightModeIcon style={{ fontSize: 16 }} />
                : <DarkModeIcon  style={{ fontSize: 16 }} />
              }
            </button>

            <button
              onClick={toggleMenu}
              className={`flex items-center justify-center w-9 h-9 transition-all duration-200 ${btnText}`}
              style={{
                background: COLORS.redBg,
                border: `1px solid ${COLORS.borderDark}`,
                cursor: 'pointer',
                borderRadius: 0,
              }}
              aria-label="Toggle menu"
            >
              {isOpen
                ? <CloseIcon style={{ fontSize: 20 }} />
                : <MenuIcon  style={{ fontSize: 20 }} />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          MOBILE OVERLAY
      ════════════════════════════════════════ */}
      <div
        onClick={closeMenu}
        className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm transition-all duration-300"
        style={{
          opacity:       isOpen ? 1 : 0,
          visibility:    isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* ════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════ */}
      <div
        className={`drawer nb fixed top-0 right-0 h-full z-50 md:hidden overflow-y-auto ${isOpen ? 'drawer-open' : 'drawer-close'}`}
        style={{
          width: 'min(100%, 280px)',
          background: 'rgba(0,0,0,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: `1px solid ${COLORS.borderDark}`,
          boxShadow: `-4px 0 32px rgba(255,45,85,0.15)`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: `1px solid ${COLORS.borderDark}` }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 20,
              color: COLORS.white,
              letterSpacing: '0.18em',
            }}
          >
            Menu
          </span>
          <button
            onClick={closeMenu}
            className="flex items-center justify-center w-8 h-8 text-white/60 hover:text-white transition-colors duration-200"
            style={{
              background: COLORS.redBg,
              border: `1px solid ${COLORS.borderDark}`,
              cursor: 'pointer',
              borderRadius: 0,
            }}
          >
            <CloseIcon style={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Nav links */}
        <div className="px-3 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={closeMenu}
              className={`
                mob-link flex items-center px-4 py-3 text-sm font-medium
                transition-all duration-200
                ${isActive(link.href) ? '' : 'text-white/55 hover:text-white hover:bg-white/5'}
              `}
              style={{
                textDecoration: 'none',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderRadius: 0,
                color: isActive(link.href) ? COLORS.activeYellow : undefined,
                background: isActive(link.href)
                  ? `linear-gradient(90deg, rgba(255,45,85,0.22) 0%, rgba(255,45,85,0.04) 100%)`
                  : 'transparent',
                borderLeft: `3px solid ${isActive(link.href) ? COLORS.neonRed : 'transparent'}`,
                boxShadow: isActive(link.href) ? 'inset 0 0 20px rgba(255,45,85,0.08)' : 'none',
              }}
            >
              {link.name}
              {isActive(link.href) && (
                <span
                  className="ml-auto w-1.5 h-1.5 flex-shrink-0"
                  style={{
                    background: COLORS.neonRed,
                    boxShadow: `0 0 6px ${COLORS.neonRed}`,
                    transform: 'rotate(45deg)',
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Social */}
        <div className="px-5 py-4" style={{ borderTop: `1px solid ${COLORS.borderDark}` }}>
          <p
            className="text-xs font-bold uppercase mb-3"
            style={{ color: COLORS.neonRed, letterSpacing: '0.15em', fontFamily: "'Space Mono', monospace" }}
          >
            Connect
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.name];
              const cls  = 'mob-social flex items-center justify-center w-10 h-10 text-white/55 hover:text-white transition-all duration-200 hover:-translate-y-0.5';
              const sty  = {
                background: COLORS.redBg,
                border: `1px solid ${COLORS.borderDark}`,
                textDecoration: 'none',
                borderRadius: 0,
              };
              return link.name === 'Chat'
                ? <Link key={link.name} to={link.href} onClick={closeMenu} className={cls} style={sty}><Icon style={{ fontSize: 18 }} /></Link>
                : <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={cls} style={sty}><Icon style={{ fontSize: 18 }} /></a>;
            })}
          </div>
        </div>

        {/* Appearance */}
        <div className="px-5 py-4" style={{ borderTop: `1px solid ${COLORS.borderDark}` }}>
          <p
            className="text-xs font-bold uppercase mb-3"
            style={{ color: COLORS.neonRed, letterSpacing: '0.15em', fontFamily: "'Space Mono', monospace" }}
          >
            Appearance
          </p>
          <button
            onClick={handleThemeToggle}
            className="theme-btn w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-all duration-200"
            style={{
              background: COLORS.redBg,
              border: `1px solid ${COLORS.borderDark}`,
              color: COLORS.white,
              cursor: 'pointer',
              borderRadius: 0,
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            }}
          >
            {isDark
              ? <><LightModeIcon style={{ fontSize: 15 }} /> Switch to Light</>
              : <><DarkModeIcon  style={{ fontSize: 15 }} /> Switch to Dark</>
            }
          </button>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-2">
          <p
            className="text-xs text-center"
            style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'Space Mono', monospace", letterSpacing: '0.1em' }}
          >
            © {new Date().getFullYear()} Aditya Vilas Pawar
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
