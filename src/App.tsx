 import React from "react";
 import "./App.css";
 import im from "./images/ic - Copy.png";
 import Aboutme from "./assets/Component/Aboutme";

 const App: React.FC = () => {
   return (
     <div className="min-h-screen w-full bg-gray-100 flex flex-col h-screen">
       <div className="text-1xl bg-green-900 h-auto flex items-center justify-between p-2">
         <p className="text-white text-4xl">paradox</p>
         <div className="flex space-x-5 mr-16 justify-between">
           <button className="text-white hover:text-black w-24 hover:bg-green-900">
             Home
           </button>
           <button className="text-white w-24 hover:text-black hover:bg-green-900">
             About me
           </button>
           <button className="text-white w-28 hover:text-black hover:bg-green-900">
             Project
           </button>
           <button className="text-white w-28 hover:text-black hover:bg-green-900">
             Contact
           </button>
         </div>
       </div>
       {/* Content goes here */}
       <div className="flex-1 bg-customGreen-950 h-auto justify-start w-auto text-left">
         <div className="flex flex-row">
           <div className="mt-8 ">
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
             <div className="flex justify-center items-center w-60 h-60  mt-10  rounded-full bg-customCyan-200">
               <img className="h-30 w-40" src={im} alt="Paradox" />
             </div>
           </div>
         </div>
         < button className="rounded-full mb-10 mt-20 bg-indigo-500 w-40 ml-12">
           <h6 className="text-center">Download a CV</h6>
         </button>
       </div>
       <Aboutme />
     </div>
   );
 };

 export default App;
