import React, { useState, useEffect } from 'react';

export default function Home() {
  const [showModules, setShowModules] = useState(false);

  useEffect(() => {
    // Show modules after 1 second
    const timer = setTimeout(() => {
      setShowModules(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const modules = [
    { name: 'Accounts', path: '/app/accounting' },
    { name: 'CRM', path: '/app/crm' },
    { name: 'Sales', path: '/app/selling' },
    { name: 'Buying', path: '/app/buying' },
    { name: 'Stock', path: '/app/stock' },
    { name: 'Manufacturing', path: '/app/manufacturing' }
  ];

  return (
    <header className="relative min-h-screen w-full">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.pinimg.com/originals/ad/67/09/ad67090ff30d09ce9a4496b2a85a3e84.gif')"
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 sm:px-6 py-8 lg:py-0">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 min-h-screen justify-center lg:items-center">
          
          {/* Left Column: Main Heading */}
          <div className="flex items-center justify-center lg:justify-start mb-8 lg:mb-0">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[6rem] font-extrabold tracking-widest text-white leading-none">
                <span 
                  className="text-transparent" 
                  style={{ WebkitTextStroke: '2px white' }}
                >
                  H!!!...
                </span>
                <br />
                <span>I’m ADITYA</span>
              </h1>
              <p className="text-md text-gray-300 mt-2">ERP Implementation | Technical | Functional</p>
              {/* Button */}
              <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
                <a 
                  href="/app" 
                  className="inline-block px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold transition-transform transform bg-white text-gray-900 shadow-lg hover:scale-105"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Column: Modules List */}
          <div className={`flex items-center justify-center lg:justify-end transition-all duration-1000 ${showModules ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {showModules && (
              <div className="text-center lg:text-right text-white space-y-3 lg:space-y-4 lg:pr-12">
                <ul className="space-y-2 sm:space-y-3 lg:space-y-4 text-base sm:text-lg md:text-xl lg:text-sm">
                  {modules.map((module, index) => (
                    <li 
                      key={index}
                      className="animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <a
                        href={module.path}
                        className="inline-block hover:text-white hover:font-extrabold hover:text-2xl sm:hover:text-3xl lg:hover:text-[3rem] transition-all transform duration-400 no-underline"
                      >
                        {module.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </header>
  );
}

