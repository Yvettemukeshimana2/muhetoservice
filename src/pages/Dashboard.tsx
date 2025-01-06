 import React from "react";
 import { Users, Package, MessageSquare, TrendingUp } from "lucide-react";

 // Define the prop types for StatCard
 interface StatCardProps {
   title: string;
   value: string; // Ensure value is explicitly typed as string
   icon: React.ElementType;
   trend: string;
 }

 // Define types for Card components
 interface CardProps {
   children: React.ReactNode;
   className?: string;
 }

 // Card Components
 const Card: React.FC<CardProps> = ({ children, className = "" }) => (
   <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
     {children}
   </div>
 );

 const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => (
   <div className={`p-6 ${className}`}>{children}</div>
 );

 const CardTitle: React.FC<CardProps> = ({ children, className = "" }) => (
   <h3 className={`font-semibold ${className}`}>{children}</h3>
 );

 const CardContent: React.FC<CardProps> = ({ children }) => (
   <div className="p-6 pt-0">{children}</div>
 );

 // StatCard Component
 const StatCard: React.FC<StatCardProps> = ({
   title,
   value,
   icon: Icon,
   trend,
 }) => (
   <Card>
     <CardHeader className="flex flex-row items-center justify-between pb-2">
       <CardTitle className="text-sm font-medium">{title}</CardTitle>
       <Icon size={16} className="text-gray-500" />
     </CardHeader>
     <CardContent>
       <div className="text-2xl font-bold">{value}</div>
       <p className="text-xs text-green-500 mt-1">{trend} from last month</p>
     </CardContent>
   </Card>
 );

 // DashboardPage Component
 const DashboardPage: React.FC = () => {
   const stats = [
     { title: "Total Users", value: "1,234", icon: Users, trend: "+12.5%" },
     { title: "Materials", value: "856", icon: Package, trend: "+5.2%" },
     { title: "Comments", value: "432", icon: MessageSquare, trend: "+8.1%" },
     { title: "Revenue", value: "$45,678", icon: TrendingUp, trend: "+15.3%" },
   ];

   return (
     <div className="space-y-6">
       <h1 className="text-2xl font-bold">Dashboard Overview</h1>

       <div className="grid grid-cols-1 md:grid-cols-2 bg-yellow-500 lg:grid-cols-4 gap-4">
         {stats.map((stat, index) => (
           <StatCard
             key={index}
             title={stat.title}
             value={stat.value}
             icon={stat.icon}
             trend={stat.trend}
           />
         ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card>
           <CardHeader>
             <CardTitle>Recent Activity</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
               {[1, 2, 3].map((_, i) => (
                 <div
                   key={i}
                   className="flex items-center bg-yellow-200 space-x-4"
                 >
                   <div className="h-10 w-10 rounded-full  flex items-center bg-yellow-400 justify-center">
                     <Users size={20} className="text-gray-600" />
                   </div>
                   <div>
                     <p className="text-sm font-medium">New user registered</p>
                     <p className="text-xs text-gray-500">2 hours ago</p>
                   </div>
                 </div>
               ))}
             </div>
           </CardContent>
         </Card>

         <Card>
           <CardHeader>
             <CardTitle>Material Stock Status</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
               {[1, 2, 3].map((_, i) => (
                 <div
                   key={i}
                   className="flex items-center bg-yellow-200 justify-between"
                 >
                   <div className="flex items-center space-x-4 ">
                     <Package
                       size={20}
                       className="text-gray-500 bg-yellow-400"
                     />
                     <div className="">
                       <p className="text-sm font-medium">Material {i + 1}</p>
                       <p className="text-xs text-gray-500">Category {i + 1}</p>
                     </div>
                   </div>
                   <div className="text-sm font-medium">
                     {Math.floor(Math.random() * 100)} in stock
                   </div>
                 </div>
               ))}
             </div>
           </CardContent>
         </Card>
       </div>
     </div>
   );
 };

 export default DashboardPage;
