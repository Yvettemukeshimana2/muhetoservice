 import React, { useState } from "react";
 import salto from "../assets/images/saltobackgroundless.png";
 import t1 from "../assets/images/profile2.jpg";
 import t2 from "../assets/images/profile4.jpg";
 import t3 from "../assets/images/profile.png"

 const OurTeam: React.FC = () => {
   const [isExpanded, setIsExpanded] = useState(false);

   const toggleReadMore = () => {
     setIsExpanded(!isExpanded);
   };

   return (
     <>
       {/* Banner Section */}
       <section className="banniere background-image" id="banniere">
         <div className="contenu text-center">
           <h2 className="  text-yellow-700 text-3xl font-semibold">
             Welcome to MHS
           </h2>
           <p className=" text-2xl font-bold">
             Your Premier Event Partner
           </p>
         </div>
       </section>

       {/* CEO Section */}
       <section>
         <div className="container-fluid">
           <div className="flex flex-col lg:flex-row">
             <div
               className="w-full lg:w-4/12 bg-transparent"
               style={{ padding: "-80px" }}
             >
               <img className="img-fluid mt-[-10vh]" src={salto} alt="" />
             </div>
             <div className="w-full lg:w-8/12">
               <h3 className="font-bold">Salton MUHETO</h3>
               <h5 className="font-bold">CEO & Founder</h5>
               <p className="text">
                 Salton MUHETO, the owner, and director of Muhe Hospitality
                 Services (MHS) is a prominent figure in Rwanda's hospitality
                 industry. With over six years of experience in prestigious
                 hotels and events, MUHETO has established himself as a
                 dedicated and visionary entrepreneur. Throughout his career,
                 MUHETO has gained extensive expertise in the hospitality
                 sector, refining his skills, and accumulating invaluable
                 experiences. Holding a bachelor’s degree in hospitality
                 management and currently pursuing a Master of Business
                 Administration (MBA) specializing in Project Management, he
                 aspires to become a professional event and wedding planner.
                 <span className={`dots ${isExpanded ? "hidden" : "inline"}`}>
                   ...
                 </span>
                 <span
                   className={`moreText ${isExpanded ? "inline" : "hidden"}`}
                 >
                   MUHETO's boundless imagination, exceptional multitasking
                   abilities, and positive outlook have made him a go-to person
                   in his region, contributing to the growth of Rwanda's
                   hospitality industry. He utilizes available resources to help
                   communities, particularly the youth, create career
                   opportunities by applying their knowledge and skills. His
                   goal is to position Rwanda as the most favorable hospitality
                   and event destination in Africa. Driven by the desire to make
                   a visible and meaningful contribution to his country, MUHETO
                   embraced entrepreneurship in events management. As a Rwandan,
                   he has always pondered ways to contribute to the development
                   and progress of his nation. Through the knowledge and skills,
                   he acquired, he chose to embark on the path of event
                   planning, aiming to leave a lasting impact. Prior to founding
                   MHS, MUHETO served as a part-time events and brand manager
                   for a leading company in Rwanda. He also held the position of
                   brand ambassador for Louis Vuitton Moet Hennessy. These
                   experiences allowed him to understand the rewarding nature of
                   creating joyous and beautifully planned celebrations that
                   bring people together. Establishing MHS fulfilled his dream,
                   as he enjoys utilizing his unique background and diverse
                   skill set to make each celebration uniquely memorable. Muheto
                   takes pride in his ability to throw unforgettable parties.
                   “When asked what makes him smile, MUHETO emphasizes the
                   freedom to work from his heart and witness the joy it brings
                   to others. His passion for creating exceptional experiences
                   shines through in his work, ensuring that each event
                   organized by MHS is filled with happiness and cherished
                   memories.”
                 </span>
               </p>
               <div className="border-2 border-yellow-700 hover:text-white hover:bg-yellow-700 rounded  w-32 mt-10 p-2">
                 <button className="font-bold" onClick={toggleReadMore}>
                   {isExpanded ? "Read Less" : "Read More..."}
                 </button>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Team Section */}
       <section className="temoignage" id="temoignage">
         <div className="title text-center" id="white_title">
           <h2 className="text-yellow-700 text-3xl font-bold">MHS TEAM</h2>
           <p className="fomt-semibold text-2xl">Meet Our Team</p>
         </div>

         <div className="container-fluid" id="team">
           <div className="flex flex-wrap">
             {/* Team Member Card */}
             {teamMembers.map((member) => (
               <div key={member.name} className="w-full md:w-1/5 p-4">
                 <div className="our-team bg-white shadow-lg rounded-lg">
                   <div className="picture">
                     <img
                       className="img-fluid rounded-t-lg"
                       src={member.image}
                       alt={member.name}
                     />
                   </div>
                   <div className="team-content p-4 text-center">
                     <h3 className="name">{member.name}</h3>
                     <h4 className="title">{member.title}</h4>
                   </div>
                   <ul className="social flex justify-center space-x-4 mb-4">
                     <li>
                       <a
                         href={member.email}
                         className="fa fa-envelope-o"
                         aria-hidden="true"
                       ></a>
                     </li>
                     <li>
                       <a
                         href={member.linkedin}
                         className="fa fa-linkedin"
                         aria-hidden="true"
                       ></a>
                     </li>
                     <li>
                       <a
                         href={member.phone}
                         className="fa fa-phone"
                         aria-hidden="true"
                       ></a>
                     </li>
                   </ul>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>
     </>
   );
 };

 // Example team members data (replace with actual data)
 const teamMembers = [
   {
     name: "Emmy",
     title: "Business Development Manager",
     image:  t3,
     email: "#",
     linkedin: "#",
     phone: "#",
   },
   {
     name: "Paul",
     title: "Project Manager",
     image:t1,
     email: "#",
     linkedin: "#",
     phone: "#",
   },
   {
     name: "Chef D. Malonga",
     title: "Event & Hospitality Consultant",
     image:  t2,
     email: "#",
     linkedin: "#",
     phone: "#",
   },
   {
     name: "Bobette",
     title: "Production Manager",
     image:  t3,
     email: "#",
     linkedin: "#",
     phone: "#",
   },
   {
     name: "Alain",
     title: "Sales & Marketing Manager",
     image: t1,
     email: "#",
     linkedin: "#",
     phone: "#",
   },
   
 ];

 export default OurTeam;
