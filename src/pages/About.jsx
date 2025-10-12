import React from 'react';

const About = () => {
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      {/* Left Column */}
      <div className="bg-indigo-500 flex justify-center items-center text-white font-bold">
        <img src='https://i.pinimg.com/1200x/bd/f0/ef/bdf0ef6f416e52d00d21ca488f9530e9.jpg' />
      </div>

      {/* Right Column (4 rows with different heights) */}
      <div className="flex flex-col h-full">

        {/* Row 1 - Small */}
        <div className="h-1/6 bg-yellow-300 flex items-center px-6 text-gray-900 font-semibold text-2xl">
          <p>ERP Implementation Specialist</p>
        </div>

        {/* Row 2 - Medium */}
        <div className="h-2/6 bg-green-400 flex items-center px-6 text-white font-medium text-lg leading-relaxed">
          <p>
            Passionate about streamlining business operations through ERPNext and Frappe Framework. 
            Skilled in workflow design, functional configuration, and automation scripting.
          </p>
        </div>

        {/* Row 3 - Larger */}
        <div className="h-1/3 bg-blue-500 flex items-center px-6 text-white text-lg">
          <p>
            Experienced in implementing ERP for trading and import-export companies, 
            handling modules like Sales, Purchase, Accounts, and Inventory.
          </p>
        </div>

        {/* Row 4 - Small Footer-like */}
        <div className="flex-1 bg-gray-800 flex items-center px-6 text-gray-100 text-sm tracking-wide">
          <p>Driven by curiosity, discipline, and a desire to build self-sustained intelligent systems.</p>
        </div>
      </div>

    </div>
  );
};

export default About;
