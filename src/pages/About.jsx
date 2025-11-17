import React from 'react';

const About = () => {
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* Left Column */}
      <div className="bg-indigo-500 flex justify-center items-center text-white font-bold">
        <img 
          src="https://i.pinimg.com/1200x/bd/f0/ef/bdf0ef6f416e52d00d21ca488f9530e9.jpg" 
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Column */}
      <div className="flex flex-col h-full justify-center items-center">
        <p className="text-6xl font-extrabold">ABOUT ME</p>
      </div>
    </div>
  );
};

export default About;
