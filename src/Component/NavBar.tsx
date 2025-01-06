 import { useState } from "react";
 import { Bell, Search, Menu, X } from "lucide-react";

 const Navbar = () => {
   const [showMobileMenu, setShowMobileMenu] = useState(false);
   const [notifications] = useState([
     { id: 1, text: "New user registration", time: "2 min ago" },
     { id: 2, text: "New comment received", time: "1 hour ago" },
     { id: 3, text: "System update", time: "2 hours ago" },
   ]);

   return (
     <nav className="bg-white border-b h-16 flex items-center justify-between px-6">
       {/* Mobile Menu Button */}
       <button
         className="lg:hidden"
         onClick={() => setShowMobileMenu(!showMobileMenu)}
       >
         {showMobileMenu ? (
           <X className="h-6 w-6 text-gray-600" />
         ) : (
           <Menu className="h-6 w-6 text-gray-600" />
         )}
       </button>

       {/* Search Bar */}
       <div className="hidden md:flex items-center flex-1 max-w-lg">
         <div className="relative w-full">
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
           <input
             type="text"
             placeholder="Search..."
             className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
           />
         </div>
       </div>

       {/* Right Section */}
       <div className="flex items-center space-x-4">
         {/* Notifications */}
         <div className="relative">
           <button className="p-2 hover:bg-gray-100 rounded-full relative">
             <Bell className="h-5 w-5 text-gray-600" />
             <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
           </button>

           {/* Notifications Dropdown */}
           <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border hidden group-hover:block">
             <div className="p-4">
               <h3 className="text-sm font-semibold text-gray-900">
                 Notifications
               </h3>
               <div className="mt-2 space-y-3">
                 {notifications.map((notification) => (
                   <div
                     key={notification.id}
                     className="flex items-start space-x-3"
                   >
                     <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                       <Bell className="h-4 w-4 text-blue-600" />
                     </div>
                     <div>
                       <p className="text-sm text-gray-900">
                         {notification.text}
                       </p>
                       <p className="text-xs text-gray-500">
                         {notification.time}
                       </p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>

         {/* Profile Menu */}
         <div className="h-8 w-8 rounded-full bg-gray-200"></div>
       </div>
     </nav>
   );
 };
 export default Navbar;