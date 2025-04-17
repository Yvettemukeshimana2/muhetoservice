 import { useState } from "react";
 import { Bell, Search, Menu, X, User } from "lucide-react";

 // Define the notification type
 interface Notification {
   id: string | number;
   text: string;
   time: string;
   read: boolean;
 }

 // Define props interface with proper typing
 interface NavbarProps {
   notifications?: Notification[];
 }

 const Navbar = ({ notifications = [] }: NavbarProps) => {
   const [showMobileMenu, setShowMobileMenu] = useState(false);
   const [showNotifications, setShowNotifications] = useState(false);

   // Count unread notifications
   const unreadCount = notifications.filter((n) => !n.read).length;

   return (
     <nav className="bg-white border-b h-16 flex items-center justify-between px-6 shadow-sm sticky top-0 z-50">
       {/* Left Section - Logo & Mobile Menu */}
       <div className="flex items-center">
         {/* Mobile Menu Button */}
         <button
           className="md:hidden mr-4"
           onClick={() => setShowMobileMenu(!showMobileMenu)}
         >
           {showMobileMenu ? (
             <X className="h-6 w-6 text-gray-600" />
           ) : (
             <Menu className="h-6 w-6 text-gray-600" />
           )}
         </button>

         {/* Logo */}
         <div className="text-xl font-bold text-blue-600">AdminPanel</div>
       </div>

       {/* Search Bar */}
       <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
         <div className="relative w-full">
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
           <input
             type="text"
             placeholder="Search..."
             className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
           />
         </div>
       </div>

       {/* Right Section - Notifications & Profile */}
       <div className="flex items-center space-x-4">
         {/* Notifications */}
         <div className="relative">
           <button
             className="p-2 hover:bg-gray-100 rounded-full relative"
             onClick={() => setShowNotifications(!showNotifications)}
           >
             <Bell className="h-5 w-5 text-gray-600" />
             {unreadCount > 0 && (
               <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                 {unreadCount}
               </span>
             )}
           </button>

           {/* Notifications Dropdown */}
           {showNotifications && (
             <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-20">
               <div className="p-4">
                 <div className="flex items-center justify-between mb-2">
                   <h3 className="text-sm font-semibold text-gray-900">
                     Notifications
                   </h3>
                   {unreadCount > 0 && (
                     <button className="text-xs text-blue-600 hover:text-blue-800">
                       Mark all as read
                     </button>
                   )}
                 </div>

                 <div className="max-h-64 overflow-y-auto">
                   {notifications.length > 0 ? (
                     <div className="divide-y divide-gray-100">
                       {notifications.map((notification) => (
                         <div
                           key={notification.id}
                           className={`flex items-start p-3 ${
                             notification.read ? "" : "bg-blue-50"
                           }`}
                         >
                           <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                             <Bell className="h-4 w-4 text-blue-600" />
                           </div>
                           <div className="ml-3">
                             <p className="text-sm text-gray-900">
                               {notification.text}
                             </p>
                             <p className="text-xs text-gray-500 mt-1">
                               {notification.time}
                             </p>
                           </div>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <p className="text-sm text-gray-500 text-center py-6">
                       No notifications
                     </p>
                   )}
                 </div>
               </div>
             </div>
           )}
         </div>

         {/* User Profile */}
         <div className="flex items-center">
           <div className="hidden md:block mr-2">
             <p className="text-sm font-medium">John Doe</p>
             <p className="text-xs text-gray-500">Administrator</p>
           </div>
           <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
             <User className="h-4 w-4 text-gray-700" />
           </div>
         </div>
       </div>
     </nav>
   );
 };

 export default Navbar;