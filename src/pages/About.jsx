import React from "react";
import PlaceIcon from '@mui/icons-material/Place';
import BusinessIcon from '@mui/icons-material/Business';

export default function About() {
  return (
    <div className="w-full min-h-screen bg-white pt-28 px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left Column */}
        <div className="p-4">
          <img
            src="https://i.pinimg.com/1200x/f5/ff/ad/f5ffadb0e5eeac1b92de51dcb2cc13d1.jpg"
            alt="Profile"
            className="shadow-xl object-cover rounded-xl w-full max-w-sm h-auto mx-auto"
          />

          <div className="mt-4 space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <BusinessIcon className="text-gray-600" /> Bangalore (Current City)
            </p>

            <p className="flex items-center gap-2">
              <PlaceIcon className="text-gray-600" /> Pune (Hometown)
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="p-4">
          <h1 className="text-xl md:text-3xl font-extrabold text-gray-800">
            Digital Transformation & ERP Consultant
          </h1>

          <p className="mt-4 text-sm md:text-[15px] text-gray-700 leading-relaxed">
            HII Myself <span className="font-extrabold">Aditya Vilas Pawar</span>,
            currently working in Bangalore and basically from Pune. I specialise
            in ERP implementation, system optimisation, and end-to-end business
            process automation across multiple functional domains.
            <br /><br />
            With hands-on experience in Accounting, Sales, CRM, and Inventory workflows,
            I focus on building solutions that reduce manual work and improve operational
            efficiency. My approach blends technical skills with functional understanding,
            ensuring every deployment is both stable and user-friendly.
            <br /><br />
            Dedicated to continuous learning, I work with a mindset of clarity, precision,
            and long-term scalability. Every project I take is handled with professionalism,
            responsibility, and a commitment to excellence.
          </p>

          {/* Tags */}
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="bg-gray-100 px-2 py-1 text-[12px] rounded hover:bg-gray-700 hover:text-white">
              #ERPNext
            </span>
            <span className="bg-gray-100 px-2 py-1 text-[12px] rounded hover:bg-gray-700 hover:text-white">
              #Python
            </span>
            <span className="bg-gray-100 px-2 py-1 text-[12px] rounded hover:bg-gray-700 hover:text-white">
              #Javascript
            </span>
          </div>

          {/* Big Heading */}
          <p className="text-5xl md:text-7xl font-extrabold text-gray-900 pt-6">
            ABOUT <br /> ME
          </p>
        </div>

      </div>
    </div>
  );
}
