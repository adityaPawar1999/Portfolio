import React from 'react';

export default function Home() {
  const modules = [
    { name: 'Accounts', path: '/app/accounting' },
    { name: 'CRM', path: '/app/crm' },
    { name: 'Sales', path: '/app/selling' },
    { name: 'Buying', path: '/app/buying' },
    { name: 'Stock', path: '/app/stock' },
    { name: 'Manufacturing', path: '/app/manufacturing' }
  ];

  return (
    <header className="relative h-screen w-full">
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
      <div className="relative z-10 flex h-full items-center justify-between px-6">
        {/* Left: Main Heading */}
        <div className="max-w-3xl">
          <h1 className="text-[10rem] font-extrabold tracking-widest text-white leading-none">
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
          <div className="mt-8 flex">
            <a 
              href="/app" 
              className="inline-block px-8 py-3 text-base font-semibold transition-transform transform bg-white text-gray-900 shadow-lg hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </div>
        
        {/* Right: Modules List */}
        <div className="text-right text-white space-y-4 pr-12">
          <ul className="space-y-2 text-sm">
            {modules.map((module, index) => (
              <li key={index}>
                <a
                  href={module.path}
                  className="inline-block hover:text-white hover:font-extrabold hover:text-[3rem] transition-all transform duration-400 no-underline"
                >
                  {module.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

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
