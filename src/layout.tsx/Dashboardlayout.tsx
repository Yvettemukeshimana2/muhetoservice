
 import { Outlet } from "react-router-dom";
 import Sidebar from "../Component/Sidebar";
 import Navbar from "../Component/Navbar";

 const Layout = () => {
   return (
     <div className="flex h-screen bg-gray-100">
       <Sidebar />
       <div className="flex-1 flex flex-col overflow-hidden">
         <Navbar />
         <main className="flex-1 overflow-y-auto p-6">
           <Outlet />
         </main>
       </div>
     </div>
   );
 };
 export default Layout;