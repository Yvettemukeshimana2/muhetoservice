 import { useState } from "react";
 import { Link, useLocation, useNavigate } from "react-router-dom";
 import img1 from "../assets/Muhe-Logo-white.png";
 import {
   Home,
   Package,
   Users,
   MessageSquare,
   Settings,
   LogOut,
   BarChart,
   Menu,
   X,
 } from "lucide-react";

 const Sidebar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();

   const menuItems = [
     { icon: Home, label: "Dashboard", path: "/" },
     { icon: Package, label: "Materials category", path: "/materials" },
     { icon: BarChart, label: "Booking", path: "/bookedmaterial" },
     { icon: MessageSquare, label: "Rental", path: "/messages" },
     { icon: Settings, label: "Settings", path: "/settings" },
   ];

   const handleLogout = () => {
     localStorage.removeItem("token");
     navigate("/login");
   };

   const toggleSidebar = () => {
     setIsOpen(!isOpen);
   };

   const SidebarContent = () => (
     <>
       <div className="flex bg-yellow-500 justify-start w-10 h-16 border-b relative">
         <div className="flex items-center">
           <img src={img1} alt="Logo" className="w-20 h-20" />
           <p className="mt-6 text-xs font-bold text-white">Dashboard</p>
         </div>
         {/* Close button for mobile */}
         <button
           onClick={toggleSidebar}
           className="absolute right-4 top-4 block lg:hidden"
         >
           <X className="h-6 w-6 text-white" />
         </button>
       </div>

       <nav className="flex-1 overflow-y-auto py-2 text-xs">
         <ul className="space-y-1 px-2">
           {menuItems.map(({ icon: Icon, label, path }) => {
             const isActive = location.pathname === path;
             return (
               <li key={path}>
                 <Link
                   to={path}
                   className={`flex items-center space-x-3 px-1 py-2 rounded-lg transition-colors ${
                     isActive
                       ? "bg-white text-yellow-600"
                       : "text-white hover:bg-yellow-600"
                   }`}
                   onClick={() => setIsOpen(false)} // close on mobile
                 >
                   <Icon className="w-4 h-4" />
                   <span className="font-medium">{label}</span>
                 </Link>
               </li>
             );
           })}
         </ul>
       </nav>

       <div className="border-t p-4">
         <div className="flex items-center space-x-3 px-3 py-2 mb-3">
           <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
             <Users className="h-4 w-4 text-yellow-600" />
           </div>
           <div>
             <p className="font-medium text-xs text-white">Muheto Salto</p>
             <p className="text-xs font-bold text-white">Admin</p>
           </div>
         </div>

         <button
           onClick={handleLogout}
           className="flex items-center space-x-3 w-full text-red-600 hover:bg-red-100 rounded-lg transition-colors p-2"
         >
           <LogOut className="h-4 w-4" />
           <span className="text-xs font-medium">Logout</span>
         </button>
       </div>
     </>
   );

   return (
     <>
       {/* Menu toggle for non-large screens only */}
       <button
         onClick={toggleSidebar}
         className="fixed top-4 left-4 z-50 bg-yellow-500 p-2 rounded-md text-white block lg:hidden"
       >
         <Menu className="h-6 w-6" />
       </button>

       {/* Overlay for mobile menu */}
       {isOpen && (
         <div
           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
           onClick={() => setIsOpen(false)}
         />
       )}

       {/* Sidebar */}
       <div
         className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-yellow-500 transform transition-transform duration-300 ease-in-out ${
           isOpen ? "translate-x-0" : "-translate-x-full"
         } lg:translate-x-0 flex flex-col shadow-lg`}
       >
         <SidebarContent />
       </div>
     </>
   );
 };

 export default Sidebar;
