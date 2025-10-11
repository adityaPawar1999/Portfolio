import React from 'react';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-8">
      <header className="bg-gray-800 text-white py-12 px-6 text-center mb-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-xl">Learn more about my background and skills</p>
      </header>
      
      <main>
        <section className="bg-white p-6 mb-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">My Background</h2>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
            nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, 
            nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
          </p>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
            nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
          </p>
        </section>
        
        <section className="bg-white p-6 mb-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Education</h2>
          <div className="mb-4">
            <h3 className="text-xl font-medium text-gray-800">University Name</h3>
            <p className="text-gray-600">Degree in Computer Science, 2018-2022</p>
            <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia.</p>
          </div>
        </section>
        
        <section className="bg-white p-6 mb-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Technical Skills</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>JavaScript/TypeScript</li>
                <li>React.js</li>
                <li>Node.js</li>
                <li>HTML/CSS</li>
                <li>Git</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Soft Skills</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Problem Solving</li>
                <li>Communication</li>
                <li>Teamwork</li>
                <li>Time Management</li>
                <li>Adaptability</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="text-center py-6 mt-8 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} My Portfolio</p>
      </footer>
    </div>
  );
};

export default About;