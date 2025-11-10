import React, { useState, useEffect } from 'react';

export default function Home() {
  const [showModules, setShowModules] = useState(false);

  useEffect(() => {
    // Show modules after 2 seconds
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
      <div className="relative z-10 min-h-screen px-4 sm:px-6 py-8 sm:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 min-h-screen items-center">
          
          {/* Left Column: Main Heading */}
          <div className="flex items-center justify-center lg:justify-start">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extrabold tracking-widest text-white leading-none">
                <span 
                  className="text-transparent" 
                  style={{ WebkitTextStroke: '2px white' }}
                >
                  H!!!...
                </span>
                <br />
                <span>ADITYA</span>
              </h1>
              
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
              <div className="text-center lg:text-right text-white space-y-4 lg:pr-12">
                <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl lg:text-sm">
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


// export default function Home() {
//   const modules = [
//     { name: 'Accounts', path: '/app/accounting' },
//     { name: 'CRM', path: '/app/crm' },
//     { name: 'Sales', path: '/app/selling' },
//     { name: 'Buying', path: '/app/buying' },
//     { name: 'Stock', path: '/app/stock' },
//     { name: 'Manufacturing', path: '/app/manufacturing' }
//   ];

//   return (
//     <header className="relative h-screen w-full">
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
//       <div className="relative z-10 flex h-full items-center justify-between px-6">
//         {/* Left: Main Heading */}
//         <div className="max-w-3xl">
//           <h1 className="text-[10rem] font-extrabold tracking-widest text-white leading-none">
//             <span 
//               className="text-transparent" 
//               style={{ WebkitTextStroke: '2px white' }}
//             >
//               H!!!...
//             </span>
//             <br />
//             <span>ADITYA</span>
//           </h1>
          
//           {/* Button */}
//           <div className="mt-8 flex">
//             <a 
//               href="/app" 
//               className="inline-block px-8 py-3 text-base font-semibold transition-transform transform bg-white text-gray-900 shadow-lg hover:scale-105"
//             >
//               Get Started
//             </a>
//           </div>
//         </div>
        
//         {/* Right: Modules List */}
//         <div className="text-right text-white space-y-4 pr-12">
//           <ul className="space-y-2 text-sm">
//             {modules.map((module, index) => (
//               <li key={index}>
//                 <a
//                   href={module.path}
//                   className="inline-block hover:text-white hover:font-extrabold hover:text-[3rem] transition-all transform duration-400 no-underline"
//                 >
//                   {module.name}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// }

// import React from 'react';

// const Home = () => {
//   return (
//     <div className="w-full h-screen flex flex-col overflow-hidden">
      
//       {/* Row 1 */}
//       <div className="w-full h-1/2 bg-blue-400  text-white  font-bold">
//         <div className="">
//           <p className="  font-extrabold text-gray-800 text-[18em]"
//             >
//           ADITYA</p>
//         </div>
//       </div>

//       {/* Row 2 with two columns */}
//       <div className="w-full h-1/2 grid grid-cols-1 md:grid-cols-2 ">
//   <div className="relative bg-green-400 text-white px-6">
//     <div>
//       <h1 className="text-[9em] font-thin leading-none bg-white text-gray-700 text-center ">
//         RESUME
//       </h1>
//     </div>
//     <div className="text-center mt-3">
//       <p className="tracking-[1em] text-xl font-thin ml-1">
//         ERP IMPLEMENTATION
//       </p>
//     </div>
//     <div className="pt-8 ">
//       <p className="text-sm font-thin ml-1">
//         ERP professional with hands-on experience in functional and technical roles, 
//         specializing in implementation, customization, and scripting.
//       </p>
//     </div>

//   </div>


//         {/* Right Column */}
//         <div className="bg-yellow-400 flex justify-center items-center text-gray-800 text-3xl font-semibold">
//           <img
//             className='object-contain h-full w-full' 
//             src='https://i.pinimg.com/1200x/33/86/17/33861794c0f5696042ebe03ac75c4ca2.jpg' />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
