
import React from "react";
import PlaceIcon from '@mui/icons-material/Place';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SelfPic from './img1.jpg'; // Same folder

export default function About() {
  return (
    <div className="w-full min-h-screen bg-white pt-20 px-2 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Column */}
        <div className="">
          <img
            src={SelfPic}
            alt="Profile"
            className="shadow-xl object-cover rounded-sm w-full max-w-lg h-[475px] mx-auto"
          />
        </div>
        
        {/* Right Column */}
        <div className="">
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 pt-2">
            Consultant in ERP Implementation & Techno-Functional Excellence
          </h1>
          <p className="mt-4 text-sm md:text-[12px] text-gray-700 leading-relaxed">
            Hi! Myself <span className="font-extrabold">Aditya Vilas Pawar</span>, an ERP techno-functional consultant experienced in designing and implementing practical and scalable ERP solutions. I work across accounting, inventory, manufacturing, procurement, sales, and supply chain, connecting
            real business needs with effective technical execution. My focus is on process optimisation, automation, and building secure ERP systems that improve efficiency and support long-term business growth. With a calm problem-solving approach, I aim to deliver smooth, structured, and value-driven implementations.<br />
            <span className="font-extrabold">📌 Areas of focus:</span><br />
            ERP Implementation, Functional & Technical Consulting<br />
            Accounting, Finance & Compliance Modules<br />
            Inventory, Stock & Warehouse Management<br />
            Manufacturing & Production Planning<br />
            Technical Customization, Automation & Client Scripting<br />
          </p>
          
          <h1 className="pt-6 text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[6rem] font-extrabold tracking-tight text-black leading-[0.95]">
            <span className="block">ABOUT</span>
            <span
              className="text-transparent block"
              style={{ WebkitTextStroke: '1px black', fontWeight: '900' }}
            >
              ME
            </span>
          </h1>
        </div>
      </div>
      
      {/* 3 Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Address Column */}
        <div className="">
          <h3 className="font-bold text-gray-800 text-sm mb-2"><PlaceIcon /> Address</h3>
          <p className="text-gray-600 text-[12px]">
            Bangalore (Current City)
          </p>
          <p className="text-gray-600 text-[12px]">
            Pune (Hometown)
          </p>
        </div>
        
        {/* Contact Column */}
        <div className="">
          <h3 className="font-bold text-gray-800 text-sm mb-2"><LocalPostOfficeIcon /> Contact</h3>
          <p 
            className="text-gray-600 text-[12px] cursor-pointer hover:text-blue-600" 
            onClick={() => window.location.href = "mailto:adityapawar8909@gmail.com"}
          >
            adityapawar8909@gmail.com
          </p>
        </div>
        
        {/* Availability Column */}
        <div className="">
          <h3 className="font-bold text-gray-800 text-sm mb-2"><AssessmentIcon /> Availability</h3>
          <p className="text-gray-600 text-[12px]">
            Open for Freelance Work & ERP Consulting Projects
          </p>
        </div>
      </div>
    </div>
  );
}
