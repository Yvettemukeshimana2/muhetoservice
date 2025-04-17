 import { useState } from "react";
 import {
   LineChart,
   BarChart,
   PieChart,
   Pie,
   Bar,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
   Cell,
 } from "recharts";
 import { Clock, Users, DollarSign, Star, Hotel } from "lucide-react";

 interface StatCardProps {
   icon: React.ElementType;
   title: string;
   value: string;
   subtext: string;
   color: string;
 }

 const StatCard = ({
   icon: Icon,
   title,
   value,
   subtext,
   color,
 }: StatCardProps) => (
   <div className="bg-white rounded-lg p-4 shadow flex items-start">
     <div className={`p-2 rounded-full ${color} mr-4 flex-shrink-0`}>
       <Icon size={24} color="white" />
     </div>
     <div>
       <p className="text-gray-500 text-sm">{title}</p>
       <p className="text-2xl font-bold">{value}</p>
       <p className="text-xs text-gray-500">{subtext}</p>
     </div>
   </div>
 );

 const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

 const tabs = ["overview", "revenue", "occupancy", "satisfaction"];

 export default function MuheHospitalityDashboard() {
   const [selectedTab, setSelectedTab] = useState("overview");

   const monthlyRevenue = [
     { name: "Jan", revenue: 42000 },
     { name: "Feb", revenue: 48000 },
     { name: "Mar", revenue: 55000 },
     { name: "Apr", revenue: 62000 },
     { name: "May", revenue: 78000 },
     { name: "Jun", revenue: 85000 },
     { name: "Jul", revenue: 92000 },
     { name: "Aug", revenue: 88000 },
   ];

   const occupancyRate = [
     { name: "Jan", rate: 68 },
     { name: "Feb", rate: 72 },
     { name: "Mar", rate: 75 },
     { name: "Apr", rate: 80 },
     { name: "May", rate: 85 },
     { name: "Jun", rate: 92 },
     { name: "Jul", rate: 95 },
     { name: "Aug", rate: 90 },
   ];

   const serviceDistribution = [
     { name: "Accommodations", value: 55 },
     { name: "Food & Beverage", value: 25 },
     { name: "Events", value: 12 },
     { name: "Other Services", value: 8 },
   ];

   const customerSatisfaction = [
     { name: "Excellent", value: 62 },
     { name: "Good", value: 28 },
     { name: "Average", value: 7 },
     { name: "Poor", value: 3 },
   ];

   const renderTabButtons = () =>
     tabs.map((tab) => (
       <button
         key={tab}
         className={`px-4 py-2 rounded ${
           selectedTab === tab ? "bg-blue-500 text-white" : "text-gray-600"
         }`}
         onClick={() => setSelectedTab(tab)}
       >
         {tab.charAt(0).toUpperCase() + tab.slice(1)}
       </button>
     ));

   return (
     <div className="bg-gray-100 p-6 rounded-lg">
       <div className="flex justify-between items-center mb-6">
         <div>
           <h1 className="text-sm font-bold text-gray-800">
             Muhe Hospitality Service
           </h1>
           <p className="text-gray-500 text-xs">Dashboard Overview</p>
         </div>
         <div className="flex items-center">
           <Clock size={16} className="mr-2 text-gray-500" />
           <span className="text-sm text-gray-500">
             Last updated: Today, 9:45 AM
           </span>
         </div>
       </div>

       <div className="bg-white p-2 text-xs rounded-lg shadow flex mb-6">
         {renderTabButtons()}
       </div>

       {selectedTab === "overview" && (
         <>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
             <StatCard
               icon={DollarSign}
               title="Monthly Revenue"
               value="$88,450"
               subtext="+12% from last month"
               color="bg-green-500"
             />
             <StatCard
               icon={Hotel}
               title="Occupancy Rate"
               value="90%"
               subtext="+5% from last month"
               color="bg-blue-500"
             />
             <StatCard
               icon={Users}
               title="Total Guests"
               value="1,245"
               subtext="204 new guests this month"
               color="bg-purple-500"
             />
             <StatCard
               icon={Star}
               title="Average Rating"
               value="4.8/5"
               subtext="Based on 347 reviews"
               color="bg-yellow-500"
             />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
             <div className="bg-white p-4 rounded-lg shadow">
               <h2 className="text-xs font-semibold mb-4">Monthly Revenue</h2>
               <ResponsiveContainer width="100%" height={300}>
                 <LineChart data={monthlyRevenue}>
                   <CartesianGrid strokeDasharray="3 3" />
                   <XAxis dataKey="name" />
                   <YAxis />
                   <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                   <Legend />
                   <Line
                     type="monotone"
                     dataKey="revenue"
                     stroke="#0088FE"
                     activeDot={{ r: 8 }}
                   />
                 </LineChart>
               </ResponsiveContainer>
             </div>

             <div className="bg-white p-4 rounded-lg shadow">
               <h2 className="text-xs font-semibold mb-4">
                 Services Distribution
               </h2>
               <ResponsiveContainer width="100%" height={300}>
                 <PieChart>
                   <Pie
                     data={serviceDistribution}
                     cx="50%"
                     cy="50%"
                     outerRadius={100}
                     dataKey="value"
                     label={({ name, percent }) =>
                       `${name}: ${(percent * 100).toFixed(0)}%`
                     }
                   >
                     {serviceDistribution.map((_, index) => (
                       <Cell
                         key={`cell-${index}`}
                         fill={COLORS[index % COLORS.length]}
                       />
                     ))}
                   </Pie>
                   <Tooltip
                     formatter={(value) => [`${value}%`, "Percentage"]}
                   />
                 </PieChart>
               </ResponsiveContainer>
             </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white p-4 rounded-lg shadow">
               <h2 className="text-xs font-semibold mb-4">Occupancy Rate</h2>
               <ResponsiveContainer width="100%" height={300}>
                 <BarChart data={occupancyRate}>
                   <CartesianGrid strokeDasharray="3 3" />
                   <XAxis dataKey="name" />
                   <YAxis />
                   <Tooltip
                     formatter={(value) => [`${value}%`, "Occupancy Rate"]}
                   />
                   <Legend />
                   <Bar dataKey="rate" fill="#00C49F" />
                 </BarChart>
               </ResponsiveContainer>
             </div>

             <div className="bg-white p-4 rounded-lg shadow">
               <h2 className="text-xs font-semibold mb-4">
                 Customer Satisfaction
               </h2>
               <ResponsiveContainer width="100%" height={300}>
                 <PieChart>
                   <Pie
                     data={customerSatisfaction}
                     cx="50%"
                     cy="50%"
                     outerRadius={100}
                     dataKey="value"
                     label={({ name, percent }) =>
                       `${name}: ${(percent * 100).toFixed(0)}%`
                     }
                   >
                     {customerSatisfaction.map((_, index) => (
                       <Cell
                         key={`cell-${index}`}
                         fill={COLORS[index % COLORS.length]}
                       />
                     ))}
                   </Pie>
                   <Tooltip
                     formatter={(value) => [`${value}%`, "Percentage"]}
                   />
                 </PieChart>
               </ResponsiveContainer>
             </div>
           </div>
         </>
       )}

       {selectedTab === "revenue" && (
         <div className="bg-white p-4 rounded-lg shadow">
           <h2 className="text-xs font-semibold mb-4">Revenue Analysis</h2>
           <ResponsiveContainer width="100%" height={400}>
             <LineChart data={monthlyRevenue}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
               <Legend />
               <Line
                 type="monotone"
                 dataKey="revenue"
                 stroke="#0088FE"
                 activeDot={{ r: 8 }}
               />
             </LineChart>
           </ResponsiveContainer>
         </div>
       )}

       {selectedTab === "occupancy" && (
         <div className="bg-white p-4 rounded-lg shadow">
           <h2 className="text-xs font-semibold mb-4">
             Occupancy Rate Analysis
           </h2>
           <ResponsiveContainer width="100%" height={400}>
             <BarChart data={occupancyRate}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip
                 formatter={(value) => [`${value}%`, "Occupancy Rate"]}
               />
               <Legend />
               <Bar dataKey="rate" fill="#00C49F" />
             </BarChart>
           </ResponsiveContainer>
         </div>
       )}

       {selectedTab === "satisfaction" && (
         <div className="bg-white p-4 rounded-lg shadow">
           <h2 className="text-xs font-semibold mb-4">Customer Satisfaction</h2>
           <ResponsiveContainer width="100%" height={400}>
             <PieChart>
               <Pie
                 data={customerSatisfaction}
                 cx="50%"
                 cy="50%"
                 outerRadius={100}
                 dataKey="value"
                 label={({ name, percent }) =>
                   `${name}: ${(percent * 100).toFixed(0)}%`
                 }
               >
                 {customerSatisfaction.map((_, index) => (
                   <Cell
                     key={`cell-${index}`}
                     fill={COLORS[index % COLORS.length]}
                   />
                 ))}
               </Pie>
               <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
             </PieChart>
           </ResponsiveContainer>
         </div>
       )}
     </div>
   );
 }
