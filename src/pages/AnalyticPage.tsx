 import React, { useState, useMemo } from "react";
 import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
 } from "recharts";
 import {
   Calendar,
   Package,
   Users,
   Clock,
   Search,
   CheckCircle,
   Trash2,
   ArrowLeft,
 } from "lucide-react";

 interface BookingData {
   id: string;
   fullName: string;
   materialType: string;
   email: string;
   phoneNumber: string;
   quantity: number;
   pickupDateTime: string;
   returnDateTime: string;
   status: "Pending" | "Active" | "Completed" | "Overdue";
 }

 interface StatCardProps {
   title: string;
   value: string;
   icon: React.ElementType;
 }

 const bookingsData: BookingData[] = [];

 const trendData = [
   { name: "Mon", bookings: 4 },
   { name: "Tue", bookings: 3 },
   { name: "Wed", bookings: 5 },
   { name: "Thu", bookings: 2 },
   { name: "Fri", bookings: 6 },
   { name: "Sat", bookings: 8 },
   { name: "Sun", bookings: 4 },
 ];

 const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => (
   <div className="bg-white rounded-lg shadow-md p-6">
     <div className="flex justify-between items-center mb-2">
       <h3 className="text-sm font-medium text-gray-600">{title}</h3>
       <Icon className="h-4 w-4 text-gray-500" />
     </div>
     <div className="text-2xl font-bold">{value}</div>
   </div>
 );

 const getStatusColor = (status: BookingData["status"]) => {
   switch (status) {
     case "Pending":
       return "bg-yellow-100 text-yellow-800";
     case "Active":
       return "bg-green-100 text-green-800";
     case "Completed":
       return "bg-blue-100 text-blue-800";
     case "Overdue":
       return "bg-red-100 text-red-800";
     default:
       return "bg-gray-100 text-gray-800";
   }
 };

 const AnalyticsDashboard: React.FC = () => {
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<
     BookingData["status"] | "All"
   >("All");
   const [sortConfig, setSortConfig] = useState<{
     key: keyof BookingData;
     direction: "asc" | "desc";
   } | null>(null);
   const [bookings, setBookings] = useState<BookingData[]>(bookingsData);

   const stats = [
     {
       title: "Total Bookings",
       value: bookings.length.toString(),
       icon: Package,
     },
     {
       title: "Active Bookings",
       value: bookings.filter((b) => b.status === "Active").length.toString(),
       icon: Users,
     },
     {
       title: "Pending Approvals",
       value: bookings.filter((b) => b.status === "Pending").length.toString(),
       icon: Clock,
     },
     {
       title: "Today's Pickups",
       value: bookings
         .filter((b) =>
           b.pickupDateTime.includes(new Date().toISOString().split("T")[0])
         )
         .length.toString(),
       icon: Calendar,
     },
   ];

   const filteredAndSortedBookings = useMemo(() => {
     let result = [...bookings];
     if (searchTerm) {
       result = result.filter((b) =>
         [b.fullName, b.materialType, b.email].some((field) =>
           field.toLowerCase().includes(searchTerm.toLowerCase())
         )
       );
     }
     if (statusFilter !== "All") {
       result = result.filter((b) => b.status === statusFilter);
     }
     if (sortConfig) {
       result.sort((a, b) => {
         const aValue = a[sortConfig.key];
         const bValue = b[sortConfig.key];
         return aValue < bValue
           ? sortConfig.direction === "asc"
             ? -1
             : 1
           : aValue > bValue
           ? sortConfig.direction === "asc"
             ? 1
             : -1
           : 0;
       });
     }
     return result;
   }, [bookings, searchTerm, statusFilter, sortConfig]);

   const handleSort = (key: keyof BookingData) => {
     setSortConfig((prev) => ({
       key,
       direction:
         prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
     }));
   };

   const handleApprove = (id: string) => {
     setBookings((prev) =>
       prev.map((b) => (b.id === id ? { ...b, status: "Active" } : b))
     );
   };

   const handleDelete = (id: string) => {
     setBookings((prev) => prev.filter((b) => b.id !== id));
   };

   return (
     <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
       <div className="flex items-center gap-4">
         <button
           onClick={() => console.log("Back")}
           className="p-2 rounded-full hover:bg-gray-200"
         >
           <ArrowLeft className="h-5 w-5" />
         </button>
         <h1 className="text-3xl font-bold text-gray-900">
           Resource Analytics
         </h1>
       </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         {stats.map((stat) => (
           <StatCard key={stat.title} {...stat} />
         ))}
       </div>

       <div className="bg-white rounded-lg shadow-md p-6">
         <div className="flex flex-col gap-4">
           <div className="flex flex-col md:flex-row justify-between gap-4">
             <div className="relative w-full md:max-w-xs">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
               <input
                 type="text"
                 placeholder="Search bookings..."
                 className="pl-9 pr-4 py-2 border rounded-md w-full"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
             <select
               className="border rounded-md px-3 py-2"
               value={statusFilter}
               onChange={(e) =>
                 setStatusFilter(
                   e.target.value as BookingData["status"] | "All"
                 )
               }
             >
               <option value="All">All Status</option>
               <option value="Pending">Pending</option>
               <option value="Active">Active</option>
               <option value="Completed">Completed</option>
               <option value="Overdue">Overdue</option>
             </select>
           </div>

           <div className="overflow-x-auto">
             <table className="min-w-full text-sm text-left">
               <thead className="text-gray-600 font-medium border-b">
                 <tr>
                   {[
                     "fullName",
                     "materialType",
                     "email",
                     "pickupDateTime",
                     "returnDateTime",
                     "status",
                   ].map((col) => (
                     <th
                       key={col}
                       className="py-2 px-4 cursor-pointer hover:text-blue-600"
                       onClick={() => handleSort(col as keyof BookingData)}
                     >
                       {col
                         .replace(/([A-Z])/g, " $1")
                         .replace(/^./, (s) => s.toUpperCase())}
                     </th>
                   ))}
                   <th className="py-2 px-4">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {filteredAndSortedBookings.map((booking) => (
                   <tr key={booking.id} className="border-t hover:bg-gray-50">
                     <td className="py-2 px-4">{booking.fullName}</td>
                     <td className="py-2 px-4">{booking.materialType}</td>
                     <td className="py-2 px-4">{booking.email}</td>
                     <td className="py-2 px-4">{booking.pickupDateTime}</td>
                     <td className="py-2 px-4">{booking.returnDateTime}</td>
                     <td className="py-2 px-4">
                       <span
                         className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(
                           booking.status
                         )}`}
                       >
                         {booking.status}
                       </span>
                     </td>
                     <td className="py-2 px-4 space-x-2">
                       {booking.status === "Pending" && (
                         <button
                           onClick={() => handleApprove(booking.id)}
                           className="text-green-600 hover:underline"
                         >
                           <CheckCircle className="inline h-4 w-4 mr-1" />{" "}
                           Approve
                         </button>
                       )}
                       <button
                         onClick={() => handleDelete(booking.id)}
                         className="text-red-600 hover:underline"
                       >
                         <Trash2 className="inline h-4 w-4 mr-1" /> Delete
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>

       <div className="bg-white rounded-lg shadow-md p-6">
         <h3 className="text-lg font-semibold mb-4">Weekly Booking Trend</h3>
         <ResponsiveContainer width="100%" height={300}>
           <LineChart data={trendData}>
             <CartesianGrid strokeDasharray="3 3" />
             <XAxis dataKey="name" />
             <YAxis />
             <Tooltip />
             <Line
               type="monotone"
               dataKey="bookings"
               stroke="#4F46E5"
               strokeWidth={2}
             />
           </LineChart>
         </ResponsiveContainer>
       </div>
     </div>
   );
 };

 export default AnalyticsDashboard;
