 import { useState } from "react";
 import {
   Shield,
   Mail,
   Lock,
   ChevronRight,
   Check,
   AlertCircle,
   X,
 } from "lucide-react";

 // Define types
 type NotificationType = "success" | "error";
 type NotificationState = {
   show: boolean;
   message: string;
   type: NotificationType;
 };

 function SettingsPage() {
   const [isEditingEmail, setIsEditingEmail] = useState(false);
   const [isEditingPassword, setIsEditingPassword] = useState(false);
   const [email, setEmail] = useState("user@example.com");
   const [newEmail, setNewEmail] = useState("");
   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [notification, setNotification] = useState<NotificationState>({
     show: false,
     message: "",
     type: "success",
   });

   const showNotification = (message: string, type: NotificationType): void => {
     setNotification({ show: true, message, type });
     setTimeout(
       () => setNotification({ show: false, message: "", type: "success" }),
       3000
     );
   };

   const handleEmailUpdate = (): void => {
     // Email validation
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
       showNotification("Please enter a valid email address.", "error");
       return;
     }

     // Here you would make an API call to update the email
     setEmail(newEmail);
     setNewEmail("");
     setIsEditingEmail(false);
     showNotification("Email updated successfully!", "success");
   };

   const handlePasswordUpdate = (): void => {
     // Password validation
     if (newPassword.length < 8) {
       showNotification("Password must be at least 8 characters.", "error");
       return;
     }

     if (newPassword !== confirmPassword) {
       showNotification("Passwords do not match.", "error");
       return;
     }

     // Here you would make an API call to update the password
     setCurrentPassword("");
     setNewPassword("");
     setConfirmPassword("");
     setIsEditingPassword(false);
     showNotification("Password updated successfully!", "success");
   };

   const cancelEmailEdit = (): void => {
     setNewEmail("");
     setIsEditingEmail(false);
   };

   const cancelPasswordEdit = (): void => {
     setCurrentPassword("");
     setNewPassword("");
     setConfirmPassword("");
     setIsEditingPassword(false);
   };

   return (
     <div className="max-w-md mx-auto bg-white rounded-xl mt-24 shadow-md overflow-hidden">
       {/* Header */}
       <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
         <div className="flex items-center">
           <Shield className="h-6 w-6 text-yellow-500" />
           <h1 className="ml-3 text-lg font-semibold text-gray-500">
            Account Settings
           </h1>
         </div>
       </div>

       {/* Notification */}
       {notification.show && (
         <div
           className={`mx-6 mt-4 p-3 rounded-md ${
             notification.type === "success"
               ? "bg-green-50 text-green-700"
               : "bg-red-50 text-red-700"
           } flex items-center justify-between`}
         >
           <div className="flex items-center">
             {notification.type === "success" ? (
               <Check className="h-5 w-5 mr-2" />
             ) : (
               <AlertCircle className="h-5 w-5 mr-2" />
             )}
             <p className="text-sm font-medium">{notification.message}</p>
           </div>
           <button
             onClick={() =>
               setNotification({ show: false, message: "", type: "success" })
             }
           >
             <X className="h-4 w-4" />
           </button>
         </div>
       )}

       {/* Settings Options */}
       <div className="px-6 py-4 space-y-4">
         {/* Email Setting */}
         <div className="border border-gray-200 rounded-lg overflow-hidden">
           {!isEditingEmail ? (
             <div className="p-4">
               <div className="flex items-center justify-between">
                 <div className="flex items-center">
                   <Mail className="h-5 w-5 text-gray-500" />
                   <div className="ml-3">
                     <p className="text-sm font-medium text-gray-700">
                       Email Address
                     </p>
                     <p className="text-sm text-gray-500">{email}</p>
                   </div>
                 </div>
                 <button
                   onClick={() => setIsEditingEmail(true)}
                   className="text-yellow-500 hover:text-yellow-500 flex items-center"
                 >
                   <span className="text-sm mr-1">Change</span>
                   <ChevronRight className="h-4 w-4" />
                 </button>
               </div>
             </div>
           ) : (
             <div className="p-4">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm font-medium text-gray-700">
                   Update Email
                 </h3>
                 <button
                   onClick={cancelEmailEdit}
                   className="text-gray-500 hover:text-gray-700"
                 >
                   <X className="h-4 w-4" />
                 </button>
               </div>
               <div className="space-y-4">
                 <div>
                   <label className="block text-xs font-medium text-gray-500 mb-1">
                     Current Email
                   </label>
                   <p className="text-sm text-gray-700">{email}</p>
                 </div>
                 <div>
                   <label
                     htmlFor="new-email"
                     className="block text-xs font-medium text-gray-500 mb-1"
                   >
                     New Email
                   </label>
                   <input
                     id="new-email"
                     type="email"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                     placeholder="Enter new email address"
                     value={newEmail}
                     onChange={(e) => setNewEmail(e.target.value)}
                   />
                 </div>
                 <div className="flex justify-end space-x-2">
                   <button
                     onClick={cancelEmailEdit}
                     className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                   >
                     Cancel
                   </button>
                   <button
                     onClick={handleEmailUpdate}
                     className="px-3 py-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-700"
                   >
                     Save
                   </button>
                 </div>
               </div>
             </div>
           )}
         </div>

         {/* Password Setting */}
         <div className="border border-gray-200 rounded-lg overflow-hidden">
           {!isEditingPassword ? (
             <div className="p-4">
               <div className="flex items-center justify-between">
                 <div className="flex items-center">
                   <Lock className="h-5 w-5 text-gray-500" />
                   <div className="ml-3">
                     <p className="text-sm font-medium text-gray-700">
                       Password
                     </p>
                     <p className="text-sm text-gray-500">••••••••</p>
                   </div>
                 </div>
                 <button
                   onClick={() => setIsEditingPassword(true)}
                   className="text-yellow-500 hover:text-yellow-500 flex items-center"
                 >
                   <span className="text-sm mr-1">Change</span>
                   <ChevronRight className="h-4 w-4" />
                 </button>
               </div>
             </div>
           ) : (
             <div className="p-4">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm font-medium text-gray-700">
                   Update Password
                 </h3>
                 <button
                   onClick={cancelPasswordEdit}
                   className="text-gray-500 hover:text-gray-700"
                 >
                   <X className="h-4 w-4" />
                 </button>
               </div>
               <div className="space-y-4">
                 <div>
                   <label
                     htmlFor="current-password"
                     className="block text-xs font-medium text-gray-500 mb-1"
                   >
                     Current Password
                   </label>
                   <input
                     id="current-password"
                     type="password"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                     placeholder="Enter current password"
                     value={currentPassword}
                     onChange={(e) => setCurrentPassword(e.target.value)}
                   />
                 </div>
                 <div>
                   <label
                     htmlFor="new-password"
                     className="block text-xs font-medium text-gray-500 mb-1"
                   >
                     New Password
                   </label>
                   <input
                     id="new-password"
                     type="password"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                     placeholder="Enter new password"
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                   />
                   <p className="text-xs text-gray-500 mt-1">
                     Must be at least 8 characters
                   </p>
                 </div>
                 <div>
                   <label
                     htmlFor="confirm-password"
                     className="block text-xs font-medium text-gray-500 mb-1"
                   >
                     Confirm New Password
                   </label>
                   <input
                     id="confirm-password"
                     type="password"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                     placeholder="Confirm new password"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                   />
                 </div>
                 <div className="flex justify-end space-x-2">
                   <button
                     onClick={cancelPasswordEdit}
                     className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                   >
                     Cancel
                   </button>
                   <button
                     onClick={handlePasswordUpdate}
                     disabled={
                       !currentPassword || !newPassword || !confirmPassword
                     }
                     className={`px-3 py-2 rounded-md text-sm ${
                       !currentPassword || !newPassword || !confirmPassword
                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                         : "bg-yellow-500 text-white hover:bg-yellow-700"
                     }`}
                   >
                     Save
                   </button>
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>
     </div>
   );
 }

 export default SettingsPage;