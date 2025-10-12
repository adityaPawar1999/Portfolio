import React from 'react';

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      
      {/* Row 1 */}
      <div className="w-full h-1/2 bg-blue-400  text-white  font-bold">
        <div className="">
          <p className="  font-extrabold text-gray-800 text-[18em]"
            >
          ADITYA</p>
        </div>
      </div>

      {/* Row 2 with two columns */}
      <div className="w-full h-1/2 grid grid-cols-1 md:grid-cols-2 ">
  <div className="relative bg-green-400 text-white px-6">
    <div>
      <h1 className="text-[9em] font-thin leading-none bg-white text-gray-700 text-center ">
        RESUME
      </h1>
    </div>
    <div className="text-center mt-3">
      <p className="tracking-[1em] text-xl font-thin ml-1">
        ERP IMPLEMENTATION
      </p>
    </div>
    <div className="pt-8 ">
      <p className="text-sm font-thin ml-1">
        ERP professional with hands-on experience in functional and technical roles, 
        specializing in implementation, customization, and scripting.
      </p>
    </div>

  </div>


        {/* Right Column */}
        <div className="bg-yellow-400 flex justify-center items-center text-gray-800 text-3xl font-semibold">
          <img
            className='object-contain h-full w-full' 
            src='https://i.pinimg.com/1200x/33/86/17/33861794c0f5696042ebe03ac75c4ca2.jpg' />
        </div>
      </div>
    </div>
  );
};

export default Home;