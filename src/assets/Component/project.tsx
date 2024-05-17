 import React from "react";

 const Project: React.FC = () => {
   return (
     <div className="container bg-customGreen-950 h-full bg-opacity-85 ring-offset-custom-green-800 text-left p-5 z-20 overflow-hidden">
       <div className="flex flex-col">
         <div className="flex flex-row justify-center">
           <h1 className="text-4xl font-bold text-white mb-8">PROJECT</h1>{" "}
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           <div className="bg-black mb-4 h-80 rounded-md">
             <p className="text-white text-1xl mt-3 sm:text-center">
               Hi there! I'm a passionate mechanical engineering student with a
               keen interest in problem-solving and innovation. I'm currently
               pursuing my degree in Mechanical Engineering at [Your University
               Name]. I have participated in various training programs and
               workshops to enhance my skills and knowledge in the field.
             </p>
           </div>
           <div className="bg-black mb-4 h-80 rounded-md">
             <p className="text-white text-1xl mt-3 sm:text-center">
               Throughout my academic journey, I have worked on numerous
               projects that have provided me with practical experience and
               insights into the application of engineering principles. Some of
               my projects include [mention a few significant projects you've
               worked on].
             </p>
           </div>
           <div className="bg-black mb-4 h-80 rounded-md">
             <p className="text-white text-1xl mt-3 sm:text-center">
               I am passionate about leveraging my skills and knowledge to
               contribute positively to the field of mechanical engineering and
               tackle real-world challenges. I am always eager to learn and
               explore new technologies and methodologies to further enhance my
               capabilities.
             </p>
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default Project;
