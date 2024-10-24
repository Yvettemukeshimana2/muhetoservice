 import React from "react";
 import missionImg from "../assets/images/LOLA-Event-Productions-Wedding-Planning-Tent-RichHarvestFarm-034.jpg";
 import visionImg from "../assets/images/LOLA-Event-Productions-Wedding-Planning-Tent-RichHarvestFarm-034.jpg"; // Replace with actual image paths
 import historyImg from "../assets/images/LOLA-Event-Productions-Wedding-Planning-Tent-RichHarvestFarm-014.jpg";
 import achievementsImg from "../assets/images/LOLA-Event-Productions-Wedding-Planning-Tent-RichHarvestFarm-009.jpg";

 const AboutUs: React.FC = () => {
   return (
     <div className="p-2 ">
       <div className="grid grid-cols-1 md:grid-cols-3 bg-yellow-700 gap-6 -mt-8 z-99">
         {/* Our Mission Section */}
         <div className="relative">
           <img
             src={missionImg}
             alt="Our Mission"
             className="w-full h-80 object-cover rounded-lg  opacity-70"
           />
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black opacity-60">
             <h3 className="text-3xl text-yellow-700 font-bold mb-2">
               Our Mission
             </h3>
             <p className="text-lg px-4">
               Our mission is to deliver exceptional event planning and
               coordination services that prioritize our clients’ needs and
               visions. We strive for excellence in every detail, ensuring a
               seamless experience from start to finish.
             </p>
           </div>
         </div>

         {/* Our Culture Section */}
         <div className="relative">
           <img
             src={historyImg}
             alt="Our Culture"
             className="w-full h-80 object-cover rounded-lg opacity-60"
           />
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white  bg-black opacity-80">
             <h3 className="text-3xl font-bold mb-2 text-yellow-700">Our Culture</h3>
             <p className="text-lg px-4">
               Founded in [Year], we have grown from a small team of passionate
               planners to a leading event management company in the region. Our
               diverse portfolio includes weddings, corporate events, and
               community gatherings.
             </p>
           </div>
         </div>

         {/* Our Vision Section */}
         <div className="relative">
           <img
             src={visionImg}
             alt="Our Vision"
             className="w-full h-80 object-cover rounded-lg opacity-60"
           />
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white  bg-black opacity-80">
             <h3 className="text-3xl font-bold mb-2 text-yellow-700">Our Vision</h3>
             <p className="text-lg px-4">
               We envision a world where every event, big or small, is executed
               flawlessly, leaving lasting memories for our clients and their
               guests.
             </p>
           </div>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
         {/* Our History Section */}
         <div className="relative">
           <img
             src={historyImg}
             alt="Our History"
             className="w-full h-80 object-cover rounded-lg opacity-60"
           />
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
             <h3 className="text-3xl font-bold mb-2">Our History</h3>
             <p className="text-lg px-4">
               We have grown from a small team of passionate planners to a
               leading event management company in the region. Our diverse
               portfolio includes weddings, corporate events, and community
               gatherings.
             </p>
           </div>
         </div>

         {/* Our Achievements Section */}
         <div className="relative">
           <img
             src={achievementsImg}
             alt="Our Achievements"
             className="w-full h-80 object-cover rounded-lg opacity-60"
           />
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
             <h3 className="text-3xl font-bold mb-2">Our Achievements</h3>
             <p className="text-lg px-4">
               Over the years, we have successfully executed numerous
               high-profile events, earning recognition for our creativity and
               attention to detail. Our commitment to excellence has garnered us
               a loyal client base and numerous awards in the industry.
             </p>
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default AboutUs;
