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

// ── Theme palettes (light / dark only — no neon) ───────────────
const THEME = {
  dark: {
    text: 'rgba(255,255,255,0.65)',
    textStrong: '#ffffff',
    accent: '#818cf8',        // indigo-400
    accentSoft: 'rgba(129,140,248,0.12)',
    border: 'rgba(255,255,255,0.08)',
    solidBg: 'rgba(10,10,14,0.92)',
    drawerBg: 'rgba(10,10,14,0.98)',
    chipBg: 'rgba(255,255,255,0.06)',
  },
  light: {
    text: 'rgba(15,23,42,0.62)',
    textStrong: '#0f172a',
    accent: '#4f46e5',        // indigo-600
    accentSoft: 'rgba(79,70,229,0.10)',
    border: 'rgba(15,23,42,0.08)',
    solidBg: 'rgba(255,255,255,0.92)',
    drawerBg: 'rgba(255,255,255,0.98)',
    chipBg: 'rgba(15,23,42,0.05)',
  },
};

const SOCIAL_ICONS = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Chat: ForumIcon,
};

// Pages that always render a solid navbar background (rest of the
// site, e.g. home, stays fully transparent).
const SOLID_BG_PAGES = ['/about', '/account', '/chatbotui'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const scrolled = useScrollEffect(50);
  const { toggleTheme } = useTheme();
  const location = useLocation();

  const t = isDark ? THEME.dark : THEME.light;

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Close drawer on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
    toggleTheme?.();
  };

  const path = location.pathname.toLowerCase();
  const isHome = path === '/';
  const hasSolidBg = SOLID_BG_PAGES.includes(path) || path.startsWith('/blog');

  const isActive = (href) =>
    href === '/' ? path === '/' : path.startsWith(href.toLowerCase());

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .nb { font-family: 'Inter', sans-serif; }

        .logo-mark {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 19px;
          letter-spacing: -0.02em;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .logo-mark:hover { opacity: 0.8; }
        .logo-dot { color: ${t.accent}; }

        /* ── Nav underline ── */
        .nav-underline { position: relative; }
        .nav-underline::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 50%;
          width: 0; height: 2px;
          background: ${t.accent};
          border-radius: 999px;
          transition: width 0.25s ease, left 0.25s ease;
        }
        .nav-underline.is-active::after,
        .nav-underline:hover::after {
          width: calc(100% - 20px);
          left: 10px;
        }

        .social-btn { transition: transform 0.2s ease, color 0.2s ease, background 0.2s ease; }
        .social-btn:hover { transform: translateY(-1px); color: ${t.accent}; }

        .theme-toggle {
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
        }
        .theme-toggle:hover { border-color: ${t.accent}; }
        .theme-toggle:active { transform: scale(0.94); }

        .mob-link { transition: background 0.2s ease, color 0.2s ease, padding-left 0.2s ease; }
        .mob-link:hover { padding-left: 22px; }

        .drawer { transition: transform 0.32s cubic-bezier(0.4,0,0.2,1); }
        .drawer-open  { transform: translateX(0); }
        .drawer-close { transform: translateX(100%); }
        .drawer::-webkit-scrollbar { width: 3px; }
        .drawer::-webkit-scrollbar-thumb { background: ${t.accent}; border-radius: 999px; }
      `}</style>

      {/* ════════════════════════════════════════
          NAVBAR BAR
      ════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3"
        style={{
          background: hasSolidBg
            ? t.solidBg
            : (scrolled ? (isDark ? 'rgba(10,10,14,0.55)' : 'rgba(255,255,255,0.55)') : 'transparent'),
          backdropFilter: hasSolidBg || scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: hasSolidBg || scrolled ? 'blur(16px)' : 'none',
          borderBottom: hasSolidBg || scrolled ? `1px solid ${t.border}` : '1px solid transparent',
          boxShadow: hasSolidBg || scrolled ? '0 4px 24px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link to="/" className="logo-mark flex-shrink-0" style={{ color: t.textStrong }}>
            Aditya<span className="logo-dot">.</span>Dev
          </Link>

          {/* ── Desktop Menu ── */}
          <div className="hidden md:flex items-center gap-5">

            {/* Nav links */}
            <div className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`nav-underline px-3 py-1.5 transition-colors duration-200 ${isActive(link.href) ? 'is-active' : ''}`}
                  style={{
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: isActive(link.href) ? t.textStrong : t.text,
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-5 w-px flex-shrink-0" style={{ background: t.border }} />

            {/* Social icons */}
            <div className="flex items-center gap-1">
              {SOCIAL_LINKS.map((link) => {
                const Icon = SOCIAL_ICONS[link.name];
                const cls = 'social-btn flex items-center justify-center w-8 h-8 rounded-full';
                const sty = { textDecoration: 'none', color: t.text };
                return link.name === 'Chat' ? (
                  <Link key={link.name} to={link.href} className={cls} style={sty} title="Chat">
                    <Icon style={{ fontSize: 17 }} />
                  </Link>
                ) : (
                  <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={cls} style={sty} title={link.name}>
                    <Icon style={{ fontSize: 17 }} />
                  </a>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-5 w-px flex-shrink-0" style={{ background: t.border }} />

            {/* Theme toggle */}
            <button
              onClick={handleThemeToggle}
              className="theme-toggle flex items-center justify-center w-9 h-9 rounded-full"
              style={{
                background: t.chipBg,
                border: `1px solid ${t.border}`,
                color: t.textStrong,
                cursor: 'pointer',
              }}
              aria-label="Toggle theme"
              title={isDark ? 'Switch to light' : 'Switch to dark'}
            >
              {isDark ? <LightModeIcon style={{ fontSize: 16 }} /> : <DarkModeIcon style={{ fontSize: 16 }} />}
            </button>
          </div>

          {/* ── Mobile: theme + hamburger ── */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleThemeToggle}
              className="theme-toggle flex items-center justify-center w-9 h-9 rounded-full"
              style={{ background: t.chipBg, border: `1px solid ${t.border}`, color: t.textStrong, cursor: 'pointer' }}
              aria-label="Toggle theme"
            >
              {isDark ? <LightModeIcon style={{ fontSize: 16 }} /> : <DarkModeIcon style={{ fontSize: 16 }} />}
            </button>

            <button
              onClick={toggleMenu}
              className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
              style={{ background: t.chipBg, border: `1px solid ${t.border}`, color: t.textStrong, cursor: 'pointer' }}
              aria-label="Toggle menu"
            >
              {isOpen ? <CloseIcon style={{ fontSize: 19 }} /> : <MenuIcon style={{ fontSize: 19 }} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          MOBILE OVERLAY
      ════════════════════════════════════════ */}
      <div
        onClick={closeMenu}
        className="fixed inset-0 z-40 md:hidden bg-black/40 backdrop-blur-sm transition-all duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* ════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════ */}
      <div
        className={`drawer nb fixed top-0 right-0 h-full z-50 md:hidden overflow-y-auto ${isOpen ? 'drawer-open' : 'drawer-close'}`}
        style={{
          width: 'min(100%, 300px)',
          background: t.drawerBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: `1px solid ${t.border}`,
          boxShadow: '-8px 0 32px rgba(0,0,0,0.18)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${t.border}` }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 17, color: t.textStrong, letterSpacing: '-0.02em' }}>
            Menu
          </span>
          <button
            onClick={closeMenu}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200"
            style={{ background: t.chipBg, border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer' }}
          >
            <CloseIcon style={{ fontSize: 17 }} />
          </button>
        </div>

        {/* Nav links */}
        <div className="px-3 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={closeMenu}
              className="mob-link flex items-center px-4 py-3 rounded-xl"
              style={{
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: isActive(link.href) ? t.textStrong : t.text,
                background: isActive(link.href) ? t.accentSoft : 'transparent',
              }}
            >
              {link.name}
              {isActive(link.href) && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: t.accent }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Social */}
        <div className="px-5 py-4" style={{ borderTop: `1px solid ${t.border}` }}>
          <p className="text-xs font-bold uppercase mb-3" style={{ color: t.text, letterSpacing: '0.1em' }}>
            Connect
          </p>
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.name];
              const cls = 'social-btn flex items-center justify-center w-10 h-10 rounded-full';
              const sty = { background: t.chipBg, border: `1px solid ${t.border}`, textDecoration: 'none', color: t.text };
              return link.name === 'Chat' ? (
                <Link key={link.name} to={link.href} onClick={closeMenu} className={cls} style={sty}>
                  <Icon style={{ fontSize: 17 }} />
                </Link>
              ) : (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={cls} style={sty}>
                  <Icon style={{ fontSize: 17 }} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Appearance */}
        <div className="px-5 py-4" style={{ borderTop: `1px solid ${t.border}` }}>
          <p className="text-xs font-bold uppercase mb-3" style={{ color: t.text, letterSpacing: '0.1em' }}>
            Appearance
          </p>
          <button
            onClick={handleThemeToggle}
            className="theme-toggle w-full flex items-center justify-center gap-2 py-2.5 rounded-xl"
            style={{
              background: t.chipBg,
              border: `1px solid ${t.border}`,
              color: t.textStrong,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {isDark
              ? <><LightModeIcon style={{ fontSize: 16 }} /> Switch to Light</>
              : <><DarkModeIcon style={{ fontSize: 16 }} /> Switch to Dark</>
            }
          </button>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-2">
          <p className="text-xs text-center" style={{ color: t.text, opacity: 0.5, letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} Aditya Vilas Pawar
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
