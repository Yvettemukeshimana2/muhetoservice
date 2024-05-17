 import React, { useState } from "react";
 import "./App.css";
 import im from "./images/ic - Copy.png";
 import Aboutme from "./assets/Component/Aboutme";
 import Project from "./assets/Component/project";
 import Contact from "./assets/Component/contact";

 const App: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
   return (
     <div className=" bg-gray-100  absolute top-0 left-0 w-full ">
       <div className="fixed top-0 left-0 w-full bg-green-900 p-4 flex justify-between items-center">
         <p className="md:text-white text-white text-1xl md:text-4xl">paradox</p>
         <div
           className={`md:flex flex-c row mr-4 md:space-x-5 ${
             showMenu ? "" : "hidden"
           }`}
         >
           <a
             href="/"
             className="text-white hover:text-black hover:bg-green-900  py-2"
           >
             Home
           </a>
           <a
             href="/aboutme"
             className="text-white hover:text-black hover:bg-green-900 ml-1 py-2"
           >
             About me
           </a>
           <a
             href="/project"
             className="text-white hover:text-black hover:bg-green-900 px-1 py-2"
           >
             Project
           </a>
           <a
             href="/contact"
             className="text-white hover:text-black hover:bg-green-900 px-1 py-2"
           >
             Contact
           </a>
         </div>
         <div className="md:hidden">
           <button onClick={toggleMenu} className="text-white hover:text-black">
             <svg
               className="w-6 h-6"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 d="M4 6h16M4 12h16m-7 6h7"
               ></path>
             </svg>
           </button>
         </div>
       </div>
       {/* Content goes here */}
       <div className="bg-customGreen-950 text-left justify-between">
         <div className="flex flex-col md:flex-row">
           <div className="md:mt-24 mt-24">
             <div className={`text-white font-semibold text-2xl ml-12 mt-4 `}>
               Hello It’s me
             </div>
             <div className={`text-white font-bold text-6xl ml-14 mt-2 `}>
               PARADOX JADO
             </div>
             <div className={`text-white flex flex-row ml-12 mt-4 text-2xl`}>
               And I’m a
               <p className="text-indigo-500 ml-2"> mechanical engineer </p>
             </div>
             <div className={`text-white font-semibold text-lg ml-12 mt-4 `}>
               have a wide range of skills and expertise that can be applied
               across various industries and sectors.
               <br />
               Here are some of the tasks and responsibilities typically
               <br />
               associated with mechanical engineers:
             </div>
           </div>

           <div className="flex justify-center items-center mt-6 md:mt-24 ml-6 md:ml-16">
             <div className="w-60 h-60 rounded-full bg-indigo-400">
               <img className="h-30 w-40 mt-10 ml-9" src={im} alt="Paradox" />
             </div>
           </div>
         </div>
         <button className="rounded-full mb-10 mt-20 md:hover:bg-white hover:bg-white bg-indigo-500 w-40 ml-12">
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
