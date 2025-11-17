import React from 'react';

const About = () => {
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 ">

      {/* Left Column */}
      <div className="bg-indigo-500 flex justify-center items-center text-white font-bold">
        <img src='https://i.pinimg.com/1200x/bd/f0/ef/bdf0ef6f416e52d00d21ca488f9530e9.jpg' />
      </div>

      {/* Right Column (4 rows with different heights) */}
      <div className="flex flex-col h-full">
        <P>ABOUT ME</P>
      </div>

    </div>
  );
};

export default About;
