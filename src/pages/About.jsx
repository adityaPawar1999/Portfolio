import React from "react";
import PlaceIcon from '@mui/icons-material/Place';
import BusinessIcon from '@mui/icons-material/Business';

export default function About() {
  return (
        {/* Left Column */}
        <div className="p-6 md:p-12">
          <img
            src="https://i.pinimg.com/1200x/f5/ff/ad/f5ffadb0e5eeac1b92de51dcb2cc13d1.jpg"
            alt="Profile"
            className="shadow-xl object-cover"
          />
          <p><BusinessIcon /> Banglore</p>
          <p><PlaceIcon /> Pune</p>
          <span></span>
          </div>

        {/* Right Column */}
        <div className="p-6">
          <h1 className="text-md md:text-2xl font-extrabold">
            Digital Transformation & ERP Consultant
          </h1>
          <br />

          <span className="text-sm">
            HII Myself <span className="font-extrabold">Aditya Vilas Pawar</span>{" "}
            currently working in Banglore and basically from Pune. I specialise
            in ERP implementation, system optimisation, and end-to-end business
            process automation across multiple functional domains. With hands-on
            experience in Accounting, Sales, CRM, and Inventory workflows, I
            focus on building solutions that reduce manual work and improve
            operational efficiency. My approach blends technical skills with
            functional understanding, ensuring every deployment is both stable
            and user-friendly. I enjoy solving real-world problems, analysing
            business requirements, and turning them into practical digital
            systems. Dedicated to continuous learning, I work with a mindset of
            clarity, precision, and long-term scalability. Every project I take
            is handled with professionalism, responsibility, and a commitment to
            excellence.
          </span>

          <p className="mt-2 flex gap-2 flex-wrap">
            <span className="bg-gray-100 px-2 py-1 text-[12px] hover:bg-gray-600 hover:text-white">
              #ERPNext
            </span>
            <span className="bg-gray-100 px-2 py-1 text-[12px] hover:bg-gray-600 hover:text-white">
              #Python
            </span>
            <span className="bg-gray-100 px-2 py-1 text-[12px] hover:bg-gray-600 hover:text-white">
              #Javascript
            </span>
          </p>

          <p className="text-6xl md:text-8xl font-extrabold pt-4">
            ABOUT <br /> ME
          </p>
        </div>
      </div>
    </div>
  );
}


