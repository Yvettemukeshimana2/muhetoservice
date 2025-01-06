 import  { useState } from "react";
 import { Link, useLocation, useNavigate } from "react-router-dom";
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
     { icon: Package, label: "Materials", path: "/materials" },
     { icon: Users, label: "Users", path: "/users" },
     { icon: MessageSquare, label: "Message", path: "/messages" },
     { icon: Settings, label: "Settings", path: "/settings" },
     { icon: BarChart, label: "Booked", path: "/bookedmaterial" },
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
       <div className="flex items-center bg-yellow-500 justify-center h-16 border-b relative">
         <h1 className="text-xl font-bold flex items-center">
           <img
             src="/api/placeholder/128/80"
             alt="Logo"
             className="w-32 h-20"
           />
           <p className="mt-6">Dashboard</p>
         </h1>
         <button
           onClick={toggleSidebar}
           className="absolute right-4 top-4 lg:hidden"
         >
           <X className="h-6 w-6" />
         </button>
       </div>

       <nav className="flex-1 overflow-y-auto py-4">
         <ul className="space-y-1 px-3">
           {menuItems.map((item) => {
             const Icon = item.icon;
             const isActive = location.pathname === item.path;

             return (
               <li key={item.path}>
                 <Link
                   to={item.path}
                   className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                     isActive
                       ? "bg-blue-50 text-yellow-600"
                       : "text-gray-600 hover:bg-gray-50 hover:text-yellow-600"
                   }`}
                   onClick={() => setIsOpen(false)}
                 >
                   <Icon className="h-5 w-5" />
                   <span className="font-medium">{item.label}</span>
                 </Link>
               </li>
             );
           })}
         </ul>
       </nav>

       <div className="border-t p-4">
         <div className="flex items-center space-x-3 px-3 py-2 mb-3">
           <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
             <Users className="h-5 w-5 text-yellow-600" />
           </div>
           <div>
             <p className="font-medium text-gray-900">Muheto Salto</p>
             <p className="text-md font-bold text-yellow-500">Admin</p>
           </div>
         </div>

         <button
           onClick={handleLogout}
           className="flex items-center space-x-3 px-4 py-2.5 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
         >
           <LogOut className="h-5 w-5" />
           <span className="font-medium">Logout</span>
         </button>
       </div>
     </>
   );

   return (
     <>
       {/* Mobile Menu Button */}
       <button
         onClick={toggleSidebar}
         className="fixed top-4 left-4 z-20 lg:hidden bg-yellow-500 p-2 rounded-md"
       >
         <Menu className="h-6 w-6 text-white" />
       </button>

       {/* Overlay */}
       {isOpen && (
         <div
           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
           onClick={() => setIsOpen(false)}
         />
       )}

       {/* Sidebar */}
       <div
         className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-yellow-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
           isOpen ? "translate-x-0" : "-translate-x-full"
         } flex flex-col shadow-lg`}
       >
         <SidebarContent />
       </div>
     </>
   );
 };

 export default Sidebar;