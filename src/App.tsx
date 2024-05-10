 import React from "react";
 import "./App.css";
 import im from "./images/ic - Copy.png";
 import Aboutme from "./assets/Component/Aboutme";

 const App: React.FC = () => {
   return (
     <div className=" bg-gray-100 over flex flex-col ">
       <div className="fixed top-0 left-0 w-full bg-green-900 p-4 flex justify-between items-center">
         <p className="text-white text-4xl">paradox</p>
         <div className="flex space-x-5">
           <button className="text-white hover:text-black hover:bg-green-900 px-4 py-2">
             Home
           </button>
           <button className="text-white hover:text-black hover:bg-green-900 px-4 py-2">
             About me
           </button>
           <button className="text-white hover:text-black hover:bg-green-900 px-4 py-2">
             Project
           </button>
           <button className="text-white hover:text-black hover:bg-green-900 px-4 py-2">
             Contact
           </button>
         </div>
       </div>

       {/* Content goes here */}
       <div className=" overflow-x-hidden w-screen h-screen bg-customGreen-950 text-left p-4 justify-between">
         <div className="flex flex-row">
           <div className="mt-8">
             <div className="text-white font-semibold text-2xl ml-12 mt-4">
               Hello It’s me
             </div>
             <div className="text-white font-bold text-6xl ml-14 mt-2">
               PARADOX JADO
             </div>
             <div className="text-white flex flex-row ml-12 mt-4 text-2xl">
               And I’m a
               <p className="text-indigo-500 ml-2"> mechanical engineer </p>
             </div>

             <div className="text-white font-semibold text-lg ml-12 mt-4  ">
               have a wide range of skills and expertise that can be applied
               across various industries and sectors.
               <br />
               Here are some of the tasks and responsibilities typically
               <br />
               associated with mechanical engineers:
             </div>
           </div>

           <div>
             <div className="flex justify-center items-center w-60 h-60 mt-10  rounded-full bg-customCyan-200">
               <img className="h-30 w-40" src={im} alt="Paradox" />
             </div>
           </div>
         </div>
         <button className="rounded-full mb-10 mt-20 bg-indigo-500 w-40 ml-12">
           <h6 className="text-center">Download a CV</h6>
         </button>
       </div>

       <Aboutme />
     </div>
   );
 };

 export default App;
