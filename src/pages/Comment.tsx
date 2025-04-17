 import { useState } from "react";
 import {
   Calendar,
   Clock,
   User,
   Package,
   Phone,
   MapPin,
   CreditCard,
   FileText,
   AlertCircle,
 } from "lucide-react";

 // Define types for our data structures
 interface RenterInfo {
   id: string;
   name: string;
   email: string;
   phone: string;
   address: string;
   idVerified: boolean;
   paymentMethod: {
     type: string;
     lastFour: string;
     expiryDate: string;
   };
 }

 interface RentalItem {
   id: string;
   name: string;
   category: string;
   description: string;
   condition: string;
   dailyRate: number;
   replacementValue: number;
   imageUrl: string;
   owner: {
     name: string;
     id: string;
   };
 }

 interface RentalPeriod {
   startDate: string;
   endDate: string;
   totalDays: number;
 }

 interface RentalAgreement {
   id: string;
   renter: RenterInfo;
   item: RentalItem;
   period: RentalPeriod;
   status: "pending" | "active" | "completed" | "cancelled";
   totalCost: number;
   deposit: number;
   specialInstructions?: string;
   dateCreated: string;
 }

 interface RentalDetailsProps {
   rentalAgreement: RentalAgreement;
   onApprove?: () => void;
   onCancel?: () => void;
 }

 const RentalDetails = ({
   rentalAgreement,
   onApprove,
   onCancel,
 }: RentalDetailsProps) => {
   const [showFullDescription, setShowFullDescription] = useState(false);
   const {
     renter,
     item,
     period,
     status,
     totalCost,
     deposit,
     specialInstructions,
     dateCreated,
   } = rentalAgreement;

   // Format currency values
   const formatCurrency = (amount: number) => {
     return new Intl.NumberFormat("en-US", {
       style: "currency",
       currency: "USD",
     }).format(amount);
   };

   // Format dates
   const formatDate = (dateString: string) => {
     return new Date(dateString).toLocaleDateString("en-US", {
       year: "numeric",
       month: "long",
       day: "numeric",
     });
   };

   // Calculate remaining time for active rentals
   const calculateRemainingTime = () => {
     if (status !== "active") return null;

     const endDate = new Date(period.endDate);
     const now = new Date();
     const diffTime = endDate.getTime() - now.getTime();
     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

     return diffDays > 0 ? `${diffDays} days remaining` : "Due today";
   };

   const remainingTime = calculateRemainingTime();

   const getStatusBadgeClass = () => {
     switch (status) {
       case "pending":
         return "bg-yellow-100 text-yellow-800";
       case "active":
         return "bg-green-100 text-green-800";
       case "completed":
         return "bg-blue-100 text-blue-800";
       case "cancelled":
         return "bg-red-100 text-red-800";
       default:
         return "bg-gray-100 text-gray-800";
     }
   };

   return (
     <div className="bg-white rounded-lg shadow-md overflow-hidden">
       {/* Header with status */}
       <div className="bg-gray-50 px-6 py-4 border-b">
         <div className="flex justify-between items-center">
           <h2 className="text-xl font-semibold text-gray-800">
             Rental Agreement #{rentalAgreement.id}
           </h2>
           <span
             className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass()}`}
           >
             {status.charAt(0).toUpperCase() + status.slice(1)}
           </span>
         </div>
         <p className="text-sm text-gray-500 mt-1">
           Created on {formatDate(dateCreated)}
         </p>
       </div>

       <div className="p-6">
         <div className="grid md:grid-cols-2 gap-8">
           {/* Left column - Renter information */}
           <div>
             <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
               <User className="h-5 w-5 mr-2 text-gray-500" />
               Renter Information
             </h3>

             <div className="bg-gray-50 rounded-lg p-4">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h4 className="font-medium text-gray-900">{renter.name}</h4>
                   <p className="text-sm text-gray-600">{renter.email}</p>
                 </div>
                 {renter.idVerified && (
                   <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                     <AlertCircle className="h-3 w-3 mr-1" />
                     ID Verified
                   </span>
                 )}
               </div>

               <div className="space-y-3">
                 <div className="flex items-start">
                   <Phone className="h-4 w-4 text-gray-500 mt-1 mr-3" />
                   <div>
                     <p className="text-sm text-gray-600">Phone Number</p>
                     <p className="text-sm font-medium">{renter.phone}</p>
                   </div>
                 </div>

                 <div className="flex items-start">
                   <MapPin className="h-4 w-4 text-gray-500 mt-1 mr-3" />
                   <div>
                     <p className="text-sm text-gray-600">Address</p>
                     <p className="text-sm font-medium">{renter.address}</p>
                   </div>
                 </div>

                 <div className="flex items-start">
                   <CreditCard className="h-4 w-4 text-gray-500 mt-1 mr-3" />
                   <div>
                     <p className="text-sm text-gray-600">Payment Method</p>
                     <p className="text-sm font-medium">
                       {renter.paymentMethod.type} ending in{" "}
                       {renter.paymentMethod.lastFour}
                     </p>
                     <p className="text-xs text-gray-500">
                       Expires {renter.paymentMethod.expiryDate}
                     </p>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           {/* Right column - Item information */}
           <div>
             <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
               <Package className="h-5 w-5 mr-2 text-gray-500" />
               Item Details
             </h3>

             <div className="bg-gray-50 rounded-lg p-4">
               <div className="flex gap-4 mb-4">
                 <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0">
                   {item.imageUrl && (
                     <img
                       src={item.imageUrl}
                       alt={item.name}
                       className="w-full h-full object-cover rounded"
                     />
                   )}
                 </div>

                 <div>
                   <h4 className="font-medium text-gray-900">{item.name}</h4>
                   <p className="text-sm text-gray-600">{item.category}</p>
                   <p className="text-sm text-gray-600 mt-1">
                     Owner: {item.owner.name}
                   </p>
                 </div>
               </div>

               <div className="space-y-3">
                 <div>
                   <p className="text-sm text-gray-600">Description</p>
                   <p className="text-sm">
                     {showFullDescription
                       ? item.description
                       : `${item.description.substring(0, 100)}${
                           item.description.length > 100 ? "..." : ""
                         }`}
                   </p>
                   {item.description.length > 100 && (
                     <button
                       className="text-sm text-blue-600 mt-1 hover:underline"
                       onClick={() =>
                         setShowFullDescription(!showFullDescription)
                       }
                     >
                       {showFullDescription ? "Show less" : "Read more"}
                     </button>
                   )}
                 </div>

                 <div className="grid grid-cols-2 gap-3">
                   <div>
                     <p className="text-sm text-gray-600">Condition</p>
                     <p className="text-sm font-medium">{item.condition}</p>
                   </div>

                   <div>
                     <p className="text-sm text-gray-600">Daily Rate</p>
                     <p className="text-sm font-medium">
                       {formatCurrency(item.dailyRate)}
                     </p>
                   </div>

                   <div>
                     <p className="text-sm text-gray-600">Replacement Value</p>
                     <p className="text-sm font-medium">
                       {formatCurrency(item.replacementValue)}
                     </p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Rental period and costs */}
         <div className="mt-8 border-t pt-6">
           <div className="grid md:grid-cols-2 gap-8">
             <div>
               <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                 <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                 Rental Period
               </h3>

               <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                 <div className="flex justify-between">
                   <div>
                     <p className="text-sm text-gray-600">Start Date</p>
                     <p className="text-sm font-medium">
                       {formatDate(period.startDate)}
                     </p>
                   </div>
                   <div>
                     <p className="text-sm text-gray-600">End Date</p>
                     <p className="text-sm font-medium">
                       {formatDate(period.endDate)}
                     </p>
                   </div>
                 </div>

                 <div className="flex justify-between items-center border-t pt-4">
                   <p className="text-sm font-medium">Duration</p>
                   <div className="flex items-center">
                     <Clock className="h-4 w-4 mr-2 text-gray-500" />
                     <p className="text-sm font-medium">
                       {period.totalDays} days
                     </p>
                   </div>
                 </div>

                 {remainingTime && (
                   <div className="border-t pt-4">
                     <p className="text-sm font-medium text-green-700">
                       {remainingTime}
                     </p>
                   </div>
                 )}
               </div>
             </div>

             <div>
               <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                 <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                 Cost Breakdown
               </h3>

               <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                 <div className="flex justify-between">
                   <p className="text-sm">
                     Daily Rate × {period.totalDays} days
                   </p>
                   <p className="text-sm font-medium">
                     {formatCurrency(item.dailyRate * period.totalDays)}
                   </p>
                 </div>

                 <div className="flex justify-between">
                   <p className="text-sm">Security Deposit (refundable)</p>
                   <p className="text-sm font-medium">
                     {formatCurrency(deposit)}
                   </p>
                 </div>

                 <div className="flex justify-between border-t pt-4">
                   <p className="font-medium">Total Cost</p>
                   <p className="font-medium">{formatCurrency(totalCost)}</p>
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Special instructions */}
         {specialInstructions && (
           <div className="mt-8 border-t pt-6">
             <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
               <FileText className="h-5 w-5 mr-2 text-gray-500" />
               Special Instructions
             </h3>
             <div className="bg-gray-50 rounded-lg p-4">
               <p className="text-sm">{specialInstructions}</p>
             </div>
           </div>
         )}

         {/* Action buttons */}
         {status === "pending" && (
           <div className="mt-8 border-t pt-6 flex justify-end space-x-4">
             {onCancel && (
               <button
                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                 onClick={onCancel}
               >
                 Cancel Rental
               </button>
             )}
             {onApprove && (
               <button
                 className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                 onClick={onApprove}
               >
                 Approve Rental
               </button>
             )}
           </div>
         )}
       </div>
     </div>
   );
 };

 // Example rental agreement data for demonstration
 const exampleRentalAgreement: RentalAgreement = {
   id: "R12345",
   renter: {
     id: "U789",
     name: "Alice Johnson",
     email: "alice@example.com",
     phone: "(555) 123-4567",
     address: "123 Main St, Anytown, CA 94321",
     idVerified: true,
     paymentMethod: {
       type: "Visa",
       lastFour: "4242",
       expiryDate: "04/26",
     },
   },
   item: {
     id: "I456",
     name: "DSLR Camera Kit",
     category: "Photography Equipment",
     description:
       "Professional Canon EOS R5 with 24-70mm lens, extra battery, and carrying case. Perfect for portrait and landscape photography.",
     condition: "Excellent",
     dailyRate: 65.0,
     replacementValue: 3500.0,
     imageUrl: "/images/camera.jpg",
     owner: {
       name: "Bob Smith",
       id: "U456",
     },
   },
   period: {
     startDate: "2025-04-15",
     endDate: "2025-04-20",
     totalDays: 5,
   },
   status: "pending",
   totalCost: 325.0,
   deposit: 500.0,
   specialInstructions:
     "Please handle with care. The equipment needs to be returned with all batteries fully charged.",
   dateCreated: "2025-04-13",
 };

 // Example App component showing how to use the RentalDetails component
 const CommentsPage = () => {
   const handleApprove = () => {
     console.log("Rental approved!");
     // Add your approval logic here
   };

   const handleCancel = () => {
     console.log("Rental cancelled!");
     // Add your cancellation logic here
   };

   return (
     <div className="container mx-auto p-4">
       <h1 className="text-2xl font-bold mb-6">Rental Management</h1>
       <RentalDetails
         rentalAgreement={exampleRentalAgreement}
         onApprove={handleApprove}
         onCancel={handleCancel}
       />
     </div>
   );
 };

 export default CommentsPage;