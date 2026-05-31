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
// const COLORS = {
//   neonBlue:    '#1477d2',
//   neonGlow:    'rgba(20,119,210,0.45)',
//   neonCyan:    '#38bdf8',
//   borderGlass: 'rgba(255,255,255,0.12)',
//   borderDark:  'rgba(20,119,210,0.25)',
//   white:       '#ffffff',
//   dark:        '#0f172a',
// };

const COLORS = {
  neonRed:     '#FF2D55',
  neonGlow:    'rgba(255,45,85,0.45)',
  neonCyan:    '#00FFFF',
  activeYellow:'#FFE600',

  borderGlass: 'rgba(255,255,255,0.12)',
  borderDark:  'rgba(255,45,85,0.25)',

  white:       '#ffffff',
  dark:        '#0f172a',
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

  const scrolled          = useScrollEffect(50);
  const { toggleTheme }   = useTheme();
  const location          = useLocation();

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

  const navText   = isDarkBg ? 'text-white/75' : 'text-gray-700';
  const navHover  = isDarkBg ? 'hover:text-white' : 'hover:text-blue-600';
  const logoText  = isDarkBg ? 'text-white' : 'text-blue-600';
  const btnText   = isDarkBg ? 'text-white' : 'text-gray-800';

  return (
    <>
      {/* ── Global styles (neon effects that Tailwind can't do) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .nb { font-family: 'DM Sans', sans-serif; }

        .logo-neon:hover {
          text-shadow: 0 0 12px ${COLORS.neonGlow}, 0 0 28px ${COLORS.neonGlow};
        }

        .nav-underline { position: relative; }
        .nav-underline::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 50%;
          width: 0;
          height: 2px;
          background: ${COLORS.neonBlue};
          box-shadow: 0 0 8px ${COLORS.neonGlow}, 0 0 16px ${COLORS.neonGlow};
          border-radius: 2px;
          transition: width 0.3s ease, left 0.3s ease;
        }
        .nav-underline.is-active::after,
        .nav-underline:hover::after {
          width: calc(100% - 24px);
          left: 12px;
        }

        .social-btn:hover svg {
          filter: drop-shadow(0 0 5px ${COLORS.neonGlow});
        }

        .theme-btn:hover {
          box-shadow: 0 0 10px ${COLORS.neonGlow}, 0 0 22px ${COLORS.neonGlow};
        }

        .mob-link:hover {
          box-shadow: inset 3px 0 0 ${COLORS.neonBlue};
        }
        .mob-social:hover svg {
          filter: drop-shadow(0 0 5px ${COLORS.neonGlow});
        }

        .drawer { transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }
        .drawer-open  { transform: translateX(0); }
        .drawer-close { transform: translateX(100%); }

        .drawer::-webkit-scrollbar       { width: 3px; }
        .drawer::-webkit-scrollbar-thumb { background: ${COLORS.neonBlue}; border-radius: 2px; }
      `}</style>

      {/* ════════════════════════════════════════
          NAVBAR BAR
      ════════════════════════════════════════ */}
      <nav
        className="nb fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          background: isDarkBg
            ? 'rgba(10,15,30,0.78)'
            : scrolled ? 'rgba(255,255,255,0.93)' : 'transparent',
          borderBottom: (isDarkBg || scrolled)
            ? `1px solid ${isDarkBg ? COLORS.borderDark : 'rgba(229,231,235,0.9)'}`
            : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.10)' : 'none',
          padding: scrolled ? '6px 0' : '10px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link
            to="/"
            className={`logo-neon flex-shrink-0 font-bold text-lg transition-all duration-200 ${logoText}`}
            style={{ textDecoration: 'none', letterSpacing: '-0.3px' }}
          >
            Aditya<span style={{ color: COLORS.neonBlue }}>.</span>Dev
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
                    nav-underline px-3 py-1.5 text-sm font-medium rounded
                    transition-colors duration-200
                    ${isActive(link.href)
                      ? `is-active ${isDarkBg ? 'text-white' : 'text-blue-600'}`
                      : `${navText} ${navHover}`}
                  `}
                  style={{ textDecoration: 'none' }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-5 w-px flex-shrink-0"
              style={{ background: isDarkBg ? COLORS.borderGlass : 'rgba(209,213,219,0.9)' }} />

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
            <div className="h-5 w-px flex-shrink-0"
              style={{ background: isDarkBg ? COLORS.borderGlass : 'rgba(209,213,219,0.9)' }} />

            {/* Theme toggle — single button */}
            <button
              onClick={handleThemeToggle}
              className="theme-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: 'rgba(20,119,210,0.13)',
                border: `1px solid ${COLORS.borderDark}`,
                color: isDarkBg ? COLORS.white : COLORS.neonBlue,
                letterSpacing: '0.03em',
                cursor: 'pointer',
              }}
            >
              {isDark
                ? <><LightModeIcon style={{ fontSize: 13 }} />&nbsp;Light</>
                : <><DarkModeIcon  style={{ fontSize: 13 }} />&nbsp;Dark</>
              }
            </button>
          </div>

          {/* ── Mobile: theme icon + hamburger ── */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleThemeToggle}
              className="theme-btn flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
              style={{
                background: 'rgba(20,119,210,0.13)',
                border: `1px solid ${COLORS.borderDark}`,
                color: isDarkBg ? COLORS.white : COLORS.neonBlue,
                cursor: 'pointer',
              }}
            >
              {isDark
                ? <LightModeIcon style={{ fontSize: 16 }} />
                : <DarkModeIcon  style={{ fontSize: 16 }} />
              }
            </button>

            <button
              onClick={toggleMenu}
              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 ${btnText}`}
              style={{
                background: 'rgba(20,119,210,0.10)',
                border: `1px solid ${COLORS.borderDark}`,
                cursor: 'pointer',
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
          opacity:    isOpen ? 1 : 0,
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
          width: 'min(100%, 280px)',
          background: 'rgba(10,15,30,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: `1px solid ${COLORS.borderDark}`,
          boxShadow: `-4px 0 32px rgba(20,119,210,0.15)`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: `1px solid ${COLORS.borderDark}` }}
        >
          <span className="text-white font-bold text-sm uppercase" style={{ letterSpacing: '0.12em' }}>
            Menu
          </span>
          <button
            onClick={closeMenu}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-white/60 hover:text-white transition-colors duration-200"
            style={{ background: 'rgba(255,255,255,0.07)', cursor: 'pointer' }}
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
                mob-link flex items-center px-4 py-3 rounded-lg text-sm font-medium
                transition-all duration-200
                ${isActive(link.href)
                  ? 'text-white'
                  : 'text-white/55 hover:text-white hover:bg-white/5'
                }
              `}
              style={{
                textDecoration: 'none',
                background: isActive(link.href)
                  ? 'linear-gradient(90deg, rgba(20,119,210,0.28) 0%, rgba(20,119,210,0.06) 100%)'
                  : 'transparent',
                borderLeft: `3px solid ${isActive(link.href) ? COLORS.neonBlue : 'transparent'}`,
                boxShadow: isActive(link.href) ? 'inset 0 0 20px rgba(20,119,210,0.08)' : 'none',
              }}
            >
              {link.name}
              {isActive(link.href) && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: COLORS.neonBlue, boxShadow: `0 0 6px ${COLORS.neonBlue}` }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Social */}
        <div className="px-5 py-4" style={{ borderTop: `1px solid ${COLORS.borderDark}` }}>
          <p className="text-xs font-bold uppercase mb-3" style={{ color: COLORS.neonBlue, letterSpacing: '0.15em' }}>
            Connect
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.name];
              const cls  = 'mob-social flex items-center justify-center w-10 h-10 rounded-lg text-white/55 hover:text-white transition-all duration-200 hover:-translate-y-0.5';
              const sty  = { background: 'rgba(20,119,210,0.12)', border: `1px solid ${COLORS.borderDark}`, textDecoration: 'none' };

              return link.name === 'Chat'
                ? <Link key={link.name} to={link.href} onClick={closeMenu} className={cls} style={sty}><Icon style={{ fontSize: 18 }} /></Link>
                : <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={cls} style={sty}><Icon style={{ fontSize: 18 }} /></a>;
            })}
          </div>
        </div>

        {/* Appearance */}
        <div className="px-5 py-4" style={{ borderTop: `1px solid ${COLORS.borderDark}` }}>
          <p className="text-xs font-bold uppercase mb-3" style={{ color: COLORS.neonBlue, letterSpacing: '0.15em' }}>
            Appearance
          </p>
          <button
            onClick={handleThemeToggle}
            className="theme-btn w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(20,119,210,0.12)',
              border: `1px solid ${COLORS.borderDark}`,
              color: COLORS.white,
              cursor: 'pointer',
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
          <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Aditya Vilas Pawar
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
