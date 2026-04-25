import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useScrollEffect } from '../../hooks/useScrollEffect';
import { getHoverColor } from '../../utils';
import { NAV_LINKS, SOCIAL_LINKS } from '../../constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrollEffect(50);

  const location = useLocation();
  const isAboutPage = location.pathname === "/about";
  const isAccountPage = location.pathname === "/Account";
  const isBlogPage = location.pathname.startsWith("/blog");

  const toggleMenu = () => setIsOpen(!isOpen);

  const socialIcons = {
    GitHub: GitHubIcon,
    LinkedIn: LinkedInIcon,
    Instagram: InstagramIcon,
  };

  const isDarkBg = isAboutPage || isAccountPage || isBlogPage || !scrolled;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-sm
        ${
          isAboutPage || isAccountPage || isBlogPage
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
                Aditya.Dev
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {NAV_LINKS.map((link) => (
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
              {SOCIAL_LINKS.map((link) => {
                const IconComponent = socialIcons[link.name];
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-colors duration-200 ${
                      isDarkBg ? 'text-white' : 'text-gray-800'
                    } ${getHoverColor(link.name, !isDarkBg)}`}
                  >
                    <IconComponent />
                  </a>
                );
              })}
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
            {NAV_LINKS.map((link) => (
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
              {SOCIAL_LINKS.map((link) => {
                const IconComponent = socialIcons[link.name];
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-800 transition-colors duration-200 ${getHoverColor(link.name, true)}`}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
