import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MODULE_ROUTES } from '../../constants';
import ChatIcon from '@mui/icons-material/Chat';

export default function Home() {
  const [showModules, setShowModules] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModules(true), 1000);
    return () => clearTimeout(timer);
  }, []);

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
          
          {/* Left Column */}
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
                <span>I'm ADITYA</span>
              </h1>

              <p className="text-md text-gray-300 mt-2">
                ERP Implementation | Technical | Functional
              </p>

              {/* Button */}
              <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
                <Link
                  to="/ChatbotUI"
                  className="text-white inline-block px-6 sm:px-8 py-2 text-sm sm:text-base font-semibold transition-transform transform border border-white text-gray-900 shadow-lg hover:scale-105"
                >
                 <ChatIcon className="mr-2 text-white" /> Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Modules */}
          <div
            className={`flex items-center justify-center lg:justify-end transition-all duration-1000 ${
              showModules ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {showModules && (
              <div className="text-center lg:text-right text-white space-y-3 lg:space-y-4 lg:pr-12">
                <ul className="space-y-2 sm:space-y-3 lg:space-y-4 text-base sm:text-lg md:text-xl lg:text-sm">
                  {MODULE_ROUTES.map((module, index) => (
                    <li key={index}>
                      <Link
                        to={module.path}
                        className="transition-all duration-300 hover:text-[4rem] hover:font-bold"
                      >
                        {module.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}


// import React, { useState, useEffect } from 'react';

// export default function Home() {
//   const [showModules, setShowModules] = useState(false);

//   useEffect(() => {
//     // Show modules after 1 second
//     const timer = setTimeout(() => {
//       setShowModules(true);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const modules = [
//     { name: 'Accounts', path: '/Account' }
//   ];

//   return (
//     <header className="relative min-h-screen w-full">
//       {/* Background image */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: "url('https://i.pinimg.com/originals/ad/67/09/ad67090ff30d09ce9a4496b2a85a3e84.gif')"
//         }}
//       />
      
//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
//       {/* Content */}
//       <div className="relative z-10 min-h-screen px-4 sm:px-6 py-8 lg:py-0">
//         <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 min-h-screen justify-center lg:items-center">
          
//           {/* Left Column: Main Heading */}
//           <div className="flex items-center justify-center lg:justify-start mb-8 lg:mb-0">
//             <div className="text-center lg:text-left">
//               <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[6rem] font-extrabold tracking-widest text-white leading-none">
//                 <span 
//                   className="text-transparent" 
//                   style={{ WebkitTextStroke: '2px white' }}
//                 >
//                   H!!!...
//                 </span>
//                 <br />
//                 <span>I'm ADITYA</span>
//               </h1>
//               <p className="text-md text-gray-300 mt-2">ERP Implementation | Technical | Functional</p>
//               {/* Button */}
//               <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
//                 <a 
//                   href="/app" 
//                   className="inline-block px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold transition-transform transform bg-white text-gray-900 shadow-lg hover:scale-105"
//                 >
//                   Get Started
//                 </a>
//               </div>
//             </div>
//           </div>
          
//           {/* Right Column: Modules List */}
//           <div className={`flex items-center justify-center lg:justify-end transition-all duration-1000 ${showModules ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             {showModules && (
//               <div className="text-center lg:text-right text-white space-y-3 lg:space-y-4 lg:pr-12">
//                 <ul className="space-y-2 sm:space-y-3 lg:space-y-4 text-base sm:text-lg md:text-xl lg:text-sm">
//                   {modules.map((link) => (
//                     <li key={link.name}>
//                       <a
//                         href={link.path}
//                         className="hover:text-gray-300 transition-colors"
//                         target={link.path.startsWith('http') ? '_blank' : '_self'}
//                         rel={link.path.startsWith('http') ? 'noopener noreferrer' : undefined}
//                       >
//                         {link.name}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
