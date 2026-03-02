import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const isAboutPage = location.pathname === "/about";
  const isAccountPage = location.pathname === "/Account";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <GitHubIcon />, href: 'https://github.com/adityaPawar1999' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/aditya-pawar-857247216' },
    { name: 'Instagram', icon: <InstagramIcon />, href: '#' },
  ];

  // Hover color per platform — light variant for dark bg, vivid for light bg
  const getHoverColor = (name, lightBg = false) => {
    if (name === 'GitHub')    return lightBg ? 'hover:text-gray-500'  : 'hover:text-gray-400';
    if (name === 'LinkedIn')  return lightBg ? 'hover:text-blue-600'  : 'hover:text-blue-400';
    if (name === 'Instagram') return lightBg ? 'hover:text-pink-500'  : 'hover:text-pink-400';
    return '';
  };

  const isDarkBg = isAboutPage || isAccountPage || !scrolled;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-sm
        ${
          isAboutPage || isAccountPage
            ? 'bg-black py-3'
            : scrolled
            ? 'bg-white/90 shadow-md py-2'
            : 'bg-transparent py-4'
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="text-xl font-bold">
            <Link to="/" className="flex items-center">
              <span className={`font-bold ${isDarkBg ? 'text-white' : 'text-gray-800'}`}>
                Portfolio
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-semibold transition-colors ${
                    isDarkBg
                      ? 'text-white hover:text-gray-300'
                      : 'text-gray-800 hover:text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-800 transition-colors duration-200 ${getHoverColor(link.name, true)}`}
                  {/* className={`transition-colors duration-200 ${
                    isDarkBg ? 'text-white' : 'text-gray-800'
                  } ${getHoverColor(link.name, !isDarkBg)}`} */}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={isDarkBg ? 'text-white' : 'text-gray-800'}
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col py-2 space-y-4 bg-white rounded-lg shadow-lg px-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-800 hover:text-blue-600 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Social Icons */}
            <div className="flex space-x-4 border-t pt-2">
              {socialLinks.map((link) => (
                
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-800 transition-colors duration-200 ${getHoverColor(link.name, true)}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
