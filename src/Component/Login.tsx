 import React from "react";
 import { useForm } from "react-hook-form";
 import { useNavigate } from "react-router-dom";
 import { FaLock, FaEnvelope, FaFacebookF, FaTwitter } from "react-icons/fa";

 type FormData = {
   email: string;
   password: string;
 };

 const AdminLogin: React.FC = () => {
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm<FormData>();
   const navigate = useNavigate();

   const onSubmit = (data: FormData) => {
     console.log(data);
     localStorage.setItem("token", "your-token");
     navigate("/");
   };


   return (
     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-indigo-200 font-sans">
       <div className="flex shadow-lg rounded-2xl overflow-hidden max-w-3xl w-full">
         {/* Left Side */}
         <div className="w-1/2 text-white flex flex-col justify-between">
           <div className="p-5">
             <h2 className="text-4xl font-bold tracking-wider text-black">
               Muhe Hospitality Service (MHS)
             </h2>
             <p className="mt-2 text-sm text-yellow-500">Admin Panel Login</p>
           </div>
           <img
             src="https://www.bridalguide.com/sites/default/files/blog-images/bridal-buzz/most-romantic-wedding-photos/serene-sunset-photo-dont-say-cheese-photography.jpg"
             alt="MHS"
             className="object-cover w-full h-52 mt-10"
           />
         </div>

         {/* Right Side */}
         <div className="w-1/2 bg-white p-10">
           <h2 className="text-3xl font-semibold mb-6 text-gray-800">
             ADMIN LOGIN
           </h2>

           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             {/* Email */}
             <div className="flex items-center border-b-2 border-gray-300 py-2">
               <FaEnvelope className="text-gray-400 mr-2" />
               <input
                 {...register("email", { required: "Email is required" })}
                 type="email"
                 placeholder="Email"
                 className="w-full outline-none"
                 autoComplete="email"
               />
             </div>
             {errors.email && (
               <p className="text-red-500 text-sm -mt-2">
                 {errors.email.message}
               </p>
             )}

             {/* Password */}
             <div className="flex items-center border-b-2 border-gray-300 py-2">
               <FaLock className="text-gray-400 mr-2" />
               <input
                 {...register("password", { required: "Password is required" })}
                 type="password"
                 placeholder="Password"
                 className="w-full outline-none"
                 autoComplete="current-password"
               />
             </div>
             {errors.password && (
               <p className="text-red-500 text-sm -mt-2">
                 {errors.password.message}
               </p>
             )}

             {/* Login Button */}
             <div className="mt-6">
               <button
                 type="submit"
                 className="bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded-full shadow-md transition-all"
               >
                 LOGIN
               </button>
             </div>
           </form>

           {/* Social Connect */}
           <p className="text-sm text-gray-400 mt-8">CONNECT WITH</p>
           <div className="flex space-x-4 mt-2">
             <a href="#" className="text-gray-500 hover:text-blue-600">
               <FaFacebookF />
             </a>
             <a href="#" className="text-gray-500 hover:text-sky-400">
               <FaTwitter />
             </a>
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default AdminLogin;
