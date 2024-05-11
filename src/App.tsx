 import React, { useState, useEffect } from "react";
 import "./App.css";
 import im from "./images/ic - Copy.png";
 import Aboutme from "./assets/Component/Aboutme";
 import Project from "./assets/Component/project";
 import Contact from "./assets/Component/contact";

 const App: React.FC = () => {
   const [colors, setColors] = useState("black");

   useEffect(() => {
     const colors = ["red", "blue", "green", "orange", "purple"]; // List of colors
     let currentIndex = 0;

     const intervalId = setInterval(() => {
       currentIndex = (currentIndex + 1) % colors.length;
       setColors(colors[currentIndex]);
     }, 1000); // Change color every 5 seconds

     return () => clearInterval(intervalId); // Cleanup function
   }, []); // Run only once on component mount

   return (
     <div className=" bg-gray-100  absolute top-0 left-0 w-full ">
       <div className="fixed top-0 left-0 w-full bg-green-900 p-4 flex justify-between items-center">
         <p className="text-white text-4xl">paradox</p>
         <div className="flex space-x-5">
           <a
             href="/"
             className="text-white hover:text-black hover:bg-green-900 px-4 py-2"
           >
             Home
           </a>
           <a
             href="/aboutme"
             className="text-white hover:text-black hover:bg-green-900 px-4 py-2"
           >
             About me
           </a>
           <a
             href="/project"
             className="text-white hover:text-black hover:bg-green-900 px-4 py-2"
           >
             Project
           </a>
           <a
             href="/contact"
             className="text-white hover:text-black hover:bg-green-900 px-4 py-2"
           >
             Contact 
           </a>
         </div>
       </div>

       {/* Content goes here */}
       <div className="  bg-customGreen-950 text-left  justify-between">
         <div className="flex flex-row">
           <div className="mt-24">
             <div
               className={`text-white font-semibold text-2xl ml-12 mt-4 ${colors}`}
             >
               Hello It’s me
             </div>
             <div
               className={`text-white font-bold text-6xl ml-14 mt-2 ${colors}`}
             >
               PARADOX JADO
             </div>
             <div
               className={`text-white flex flex-row ml-12 mt-4 text-2xl ${colors}`}
             >
               And I’m a
               <p className="text-indigo-500 ml-2"> mechanical engineer </p>
             </div>

             <div
               className={`text-white font-semibold text-lg ml-12 mt-4 ${colors}`}
             >
               have a wide range of skills and expertise that can be applied
               across various industries and sectors.
               <br />
               Here are some of the tasks and responsibilities typically
               <br />
               associated with mechanical engineers:
             </div>
           </div>

           <div>
             <div className="flex justify-center items-center w-60 h-60 mt-32 ml-16 rounded-full bg-indigo-400">
               <img className="h-30 w-40" src={im} alt="Paradox" />
             </div>
           </div>
         </div>
         <button className="rounded-full mb-10 mt-20 bg-indigo-500 w-40 ml-12">
           <h6 className="text-center">Download a CV</h6>
         </button>
       </div>

       <Aboutme />
       <Project />
       <Contact />
     </div>
   );
 };

 export default App;
