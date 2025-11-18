import React from "react";
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-sm
        ${
          isAboutPage
            ? 'bg-gray-700/90 py-3'
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
              <span className={`font-bold ${isAboutPage ? 'text-white' : scrolled ? 'text-gray-800' : 'text-white'}`}>
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
                    isAboutPage
                      ? 'text-white hover:text-gray-300'
                      : scrolled
                      ? 'text-gray-800 hover:text-gray-600'
                      : 'text-white hover:text-gray-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${
                    isAboutPage
                      ? 'text-white hover:text-blue-300'
                      : scrolled
                      ? 'text-gray-800 hover:text-blue-600'
                      : 'text-white hover:text-blue-400'
                  }`}
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
              className={`${isAboutPage ? 'text-white' : scrolled ? 'text-gray-800' : 'text-white'}`}
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

            <div className="flex space-x-4 border-t pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-blue-600"
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


export default function About() {
  return (
    
      <div className="w-full md:h-screen grid grid-cols-1 md:grid-cols-2 bg-white/60 backdrop-blur-sm pt-9" >

        {/* Left Column */}
        <div className="p-6 md:p-12">
          <img
            src="https://i.pinimg.com/1200x/f5/ff/ad/f5ffadb0e5eeac1b92de51dcb2cc13d1.jpg"
            alt="Profile"
            className="shadow-xl object-cover"
          />
          <p>Current City : Banglore</p>
        </div>

        {/* Right Column */}
        <div className="p-6">
          <h1 className="text-md md:text-2xl font-extrabold">
            Digital Transformation & ERP Consultant
          </h1>
          <br />

          <span className="text-sm">
            HII Myself <span className="font-extrabold">Aditya Vilas Pawar</span>{" "}
            currently working in Banglore and basically from Pune. I specialise
            in ERP implementation, system optimisation, and end-to-end business
            process automation across multiple functional domains. With hands-on
            experience in Accounting, Sales, CRM, and Inventory workflows, I
            focus on building solutions that reduce manual work and improve
            operational efficiency. My approach blends technical skills with
            functional understanding, ensuring every deployment is both stable
            and user-friendly. I enjoy solving real-world problems, analysing
            business requirements, and turning them into practical digital
            systems. Dedicated to continuous learning, I work with a mindset of
            clarity, precision, and long-term scalability. Every project I take
            is handled with professionalism, responsibility, and a commitment to
            excellence.
          </span>

          <p className="mt-2 flex gap-2 flex-wrap">
            <span className="bg-gray-100 px-2 py-1 text-[12px] hover:bg-gray-600 hover:text-white">
              #ERPNext
            </span>
            <span className="bg-gray-100 px-2 py-1 text-[12px] hover:bg-gray-600 hover:text-white">
              #Python
            </span>
            <span className="bg-gray-100 px-2 py-1 text-[12px] hover:bg-gray-600 hover:text-white">
              #Javascript
            </span>
          </p>

          <p className="text-6xl md:text-8xl font-extrabold pt-4">
            ABOUT <br /> ME
          </p>
        </div>
      </div>
    </div>
  );
}

