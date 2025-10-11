import React from 'react';

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      
      {/* Row 1 */}
      <div className="w-full h-1/2 bg-blue-400  text-white  font-bold">
        <div className="">
          <p className="  font-extrabold text-gray-800"
             style={{fontSize: '19em'}}>
          ADITYA</p>
        </div>
      </div>

      {/* Row 2 with two columns */}
      <div className="w-full h-1/2 grid grid-cols-1 md:grid-cols-2">
        
        <div className=" bg-green-400 text-white text-9xl font-semibold">
          <p className='relative'>RESUME</p>
          <span className="absolute text-xl ml-2 font-semibold"
               style={{letterSpacing: '1.3em'}}
               >ERP Implementation</span>
        </div>

        {/* Right Column */}
        <div className="bg-yellow-400 flex justify-center items-center text-gray-800 text-3xl font-semibold">
          <img
            className='object-contain h-full w-full' 
            src='https://i.pinimg.com/736x/54/7b/32/547b322d00df2a1b7de68d615f3c8410.jpg' />
        </div>
      </div>
    </div>

    // <div className="  px-4  pb-8">
    //   <div className="relative ">
    //     <h1
    //       className="absolute left-0 bottom-90 font-extrabold"
    //       style={{fontSize: '20em', fontFamily: 'Arial, Helvetica, sans-serif', margin: 0}}
    //     >
    //       ADITYA
    //     </h1>
    //     <div className="absolute left-0 top-80 h-full">
    //       <div className="flex items-center mb-4 mt-32">
    //         <span className="text-3xl font-bold mr-4" 
    //           style={{fontSize: '10em'}}>
    //             RESUME
    //         </span>
    //         <img src="https://i.pinimg.com/736x/25/3b/48/253b4838bcbb1482eee92b1dca91df1d.jpg"
    //          alt="Resume" className="w-10 h-30 object-cover" />
    //       </div>
    //       <div className="absolute left-3 top-60 h-full">
    //         <span className="text-xl font-semibold"
    //           style={{letterSpacing: '1.3em'}}
    //           >ERP Implementation</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;