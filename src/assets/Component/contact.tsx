 import React from "react";

 const Contact = () => {
   return (
     <div className="bg-customGreen-950 w-full bg-opacity-90 text-left overflow-hidden">
       <div className="flex flex-row justify-center">
         <h1 className="hidden">Contact Me</h1>
         <h1 className="text-4xl font-bold text-black mb-8">Contact</h1>{" "}
         <h1 className="text-indigo-800 text-4xl ml-3 font-bold">Me</h1>
       </div>
       <div className="max-w-5xl mx-auto flex flex-row justify-between py-10">
         {/* Form Section */}
         <div className="mr-10 w-full">
           <form>
             <div className="mb-4">
               <label
                 htmlFor="name"
                 className="block text-sm font-semibold mb-2"
               >
                 Your Name
               </label>
               <input
                 type="text"
                 id="name"
                 name="name"
                 className="w-full px-3 py-2 border rounded-lg"
                 placeholder="Enter your name"
               />
             </div>
             <div className="mb-4">
               <label
                 htmlFor="email"
                 className="block text-sm font-semibold mb-2"
               >
                 Your Email
               </label>
               <input
                 type="email"
                 id="email"
                 name="email"
                 className="w-full px-3 py-2 border rounded-lg"
                 placeholder="Enter your email"
               />
             </div>
             <div className="mb-4">
               <label
                 htmlFor="message"
                 className="block text-sm font-semibold mb-2"
               >
                 Your Message
               </label>
               <textarea
                 id="message"
                 name="message"
                 className="w-full px-3 py-2 border rounded-lg"
                 rows={5}
                 placeholder="Enter your message"
               />
             </div>
             <button
               type="submit"
               className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
             >
               Send Message
             </button>
           </form>
         </div>
         {/* Information Section */}
         <div className="ml-10 w-full">
           <div>
             <h1 className="text-white font-semibold text-4xl">
               Let's Talk To Us
             </h1>
             <p className="text-white text-sm">
               Have some big idea or brand to develop and need help? Then out
               we'd love to hear about your project and provide help
             </p>
           </div>
           <div className="mt-8">
             <h1 className="text-white font-semibold text-4xl">Email</h1>
             <p className="text-white text-sm">jado@gmail.com</p>
           </div>
           <div className="mt-8">
             <h1 className="text-white font-semibold text-4xl">Social Media</h1>
             <a
               href="https://github.com"
               className="text-purple-800 hover:text-white text-lg"
             >
               github
             </a>
             <br />
             <a
               href="https://youtube.com"
               className="text-purple-800 hover:text-white text-lg"
             >
               youtube
             </a>
             <br />
             <a
               href="https://linkedin.com"
               className="text-purple-800 hover:text-white text-lg"
             >
               linkedin
             </a>
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default Contact;
