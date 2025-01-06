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
   PhoneCall,
   Mail,
   Search,
   ChevronUp,
   ChevronDown,
   CheckCircle,
   Trash2,
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

 // Enhanced sample data with IDs
 const bookingsData: BookingData[] = [
   {
     id: "1",
     fullName: "John Smith",
     materialType: "Audio Equipment",
     email: "john.smith@email.com",
     phoneNumber: "(555) 123-4567",
     quantity: 2,
     pickupDateTime: "2024-03-15 10:00 AM",
     returnDateTime: "2024-03-17 5:00 PM",
     status: "Active",
   },
   {
     id: "2",
     fullName: "Sarah Johnson",
     materialType: "Projector",
     email: "sarah.j@email.com",
     phoneNumber: "(555) 234-5678",
     quantity: 1,
     pickupDateTime: "2024-03-16 2:00 PM",
     returnDateTime: "2024-03-18 2:00 PM",
     status: "Pending",
   },
   {
     id: "3",
     fullName: "Mike Williams",
     materialType: "Event Space",
     email: "mike.w@email.com",
     phoneNumber: "(555) 345-6789",
     quantity: 1,
     pickupDateTime: "2024-03-14 9:00 AM",
     returnDateTime: "2024-03-14 6:00 PM",
     status: "Completed",
   },
 ];

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
     { title: "Total Bookings", value: "156", icon: Package },
     { title: "Active Bookings", value: "23", icon: Users },
     { title: "Pending Returns", value: "12", icon: Clock },
     { title: "Today's Pickups", value: "8", icon: Calendar },
   ];

   const filteredAndSortedBookings = useMemo(() => {
     let result = [...bookings];

     // Apply search filter
     if (searchTerm) {
       result = result.filter(
         (booking) =>
           booking.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           booking.materialType
             .toLowerCase()
             .includes(searchTerm.toLowerCase()) ||
           booking.email.toLowerCase().includes(searchTerm.toLowerCase())
       );
     }

     // Apply status filter
     if (statusFilter !== "All") {
       result = result.filter((booking) => booking.status === statusFilter);
     }

     // Apply sorting
     if (sortConfig) {
       result.sort((a, b) => {
         if (a[sortConfig.key] < b[sortConfig.key]) {
           return sortConfig.direction === "asc" ? -1 : 1;
         }
         if (a[sortConfig.key] > b[sortConfig.key]) {
           return sortConfig.direction === "asc" ? 1 : -1;
         }
         return 0;
       });
     }

     return result;
   }, [bookings, searchTerm, statusFilter, sortConfig]);

   const handleSort = (key: keyof BookingData) => {
     setSortConfig((current) => ({
       key,
       direction:
         current?.key === key && current.direction === "asc" ? "desc" : "asc",
     }));
   };

   const handleApprove = (id: string) => {
     setBookings((current) =>
       current.map((booking) =>
         booking.id === id ? { ...booking, status: "Active" as const } : booking
       )
     );
   };

   const handleDelete = (id: string) => {
     setBookings((current) => current.filter((booking) => booking.id !== id));
   };

   return (
     <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
       <div className="flex justify-between items-center">
         <h1 className="text-3xl font-bold text-gray-900">
           Booked Materials
         </h1>
       </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         {stats.map((stat) => (
           <StatCard key={stat.title} {...stat} />
         ))}
       </div>

       <div className="grid gap-4 md:grid-cols-2">
         <div className="bg-white rounded-lg shadow-md p-6">
           <div className="flex flex-col space-y-4">
             <div className="flex items-center justify-between">
               <h3 className="text-lg font-semibold">Recent Bookings</h3>
               <div className="flex space-x-2">
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                   <input
                     type="text"
                     placeholder="Search bookings..."
                     className="pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                   />
                 </div>
                 <select
                   className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
             </div>

             <div className="space-y-4">
               <div className="grid grid-cols-2 gap-2 font-medium text-sm text-gray-600 pb-2 border-b">
                 <div
                   className="flex items-center cursor-pointer"
                   onClick={() => handleSort("fullName")}
                 >
                   Name
                   {sortConfig?.key === "fullName" &&
                     (sortConfig.direction === "asc" ? (
                       <ChevronUp className="h-4 w-4" />
                     ) : (
                       <ChevronDown className="h-4 w-4" />
                     ))}
                 </div>
                 <div
                   className="flex items-center cursor-pointer"
                   onClick={() => handleSort("materialType")}
                 >
                   Material
                   {sortConfig?.key === "materialType" &&
                     (sortConfig.direction === "asc" ? (
                       <ChevronUp className="h-4 w-4" />
                     ) : (
                       <ChevronDown className="h-4 w-4" />
                     ))}
                 </div>
               </div>

               {filteredAndSortedBookings.map((booking) => (
                 <div
                   key={booking.id}
                   className="border-b last:border-0 pb-4 last:pb-0"
                 >
                   <div className="flex justify-between items-start mb-2">
                     <div>
                       <h4 className="font-medium">{booking.fullName}</h4>
                       <p className="text-sm text-gray-600">
                         {booking.materialType}
                       </p>
                     </div>
                     <div className="flex items-center space-x-2">
                       <span
                         className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                           booking.status
                         )}`}
                       >
                         {booking.status}
                       </span>
                       {booking.status === "Pending" && (
                         <button
                           onClick={() => handleApprove(booking.id)}
                           className="p-1 text-green-600 hover:bg-green-50 rounded-full"
                         >
                           <CheckCircle className="h-4 w-4" />
                         </button>
                       )}
                       <button
                         onClick={() => handleDelete(booking.id)}
                         className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                       >
                         <Trash2 className="h-4 w-4" />
                       </button>
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                     <div className="flex items-center gap-1">
                       <Mail className="h-4 w-4" />
                       {booking.email}
                     </div>
                     <div className="flex items-center gap-1">
                       <PhoneCall className="h-4 w-4" />
                       {booking.phoneNumber}
                     </div>
                     <div className="flex items-center gap-1">
                       <Calendar className="h-4 w-4" />
                       Pickup: {booking.pickupDateTime}
                     </div>
                     <div className="flex items-center gap-1">
                       <Calendar className="h-4 w-4" />
                       Return: {booking.returnDateTime}
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>

         <div className="bg-white rounded-lg shadow-md p-6">
           <h3 className="text-lg font-semibold mb-4">Weekly Booking Trend</h3>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={trendData}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="name" />
                 <YAxis />
                 <Tooltip />
                 <Line
                   type="monotone"
                   dataKey="bookings"
                   stroke="#8884d8"
                   strokeWidth={2}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default AnalyticsDashboard;