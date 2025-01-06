 import React, { useState } from "react";
 import { Bell, Lock, User, Globe, X, Upload } from "lucide-react";

 // Card Components (unchanged)
 const Card = ({ children, className = "" }) => (
   <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
     {children}
   </div>
 );

 const CardHeader = ({ children, className = "" }) => (
   <div className={`p-6 ${className}`}>{children}</div>
 );

 const CardTitle = ({ children, className = "" }) => (
   <h3 className={`font-semibold ${className}`}>{children}</h3>
 );

 const CardContent = ({ children }) => (
   <div className="p-6 pt-0">{children}</div>
 );

 // Form Fields Components
 const FormField = ({ label, children }) => (
   <div className="mb-4">
     <label className="block text-sm font-medium text-gray-700 mb-1">
       {label}
     </label>
     {children}
   </div>
 );

 const TextInput = ({ type = "text", placeholder = "", defaultValue = "" }) => (
   <input
     type={type}
     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
     placeholder={placeholder}
     defaultValue={defaultValue}
   />
 );

 const Select = ({ options }) => (
   <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
     {options.map((option) => (
       <option key={option.value} value={option.value}>
         {option.label}
       </option>
     ))}
   </select>
 );

 const Toggle = ({ label }) => (
   <div className="flex items-center">
     <div className="relative inline-block w-10 mr-2 align-middle select-none">
       <input type="checkbox" className="sr-only" />
       <div className="w-10 h-6 bg-gray-200 rounded-full cursor-pointer transition-colors duration-200 ease-in"></div>
       <div className="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow transition-transform duration-200 ease-in"></div>
     </div>
     <span className="text-sm text-gray-700">{label}</span>
   </div>
 );

 // Dialog Component
 const Dialog = ({ isOpen, onClose, title, description }) => {
   if (!isOpen) return null;

   const renderFormFields = () => {
     switch (title) {
       case "Update Profile Information":
         return (
           <>
             <FormField label="Full Name">
               <TextInput
                 placeholder="Enter your full name"
                 defaultValue="John Doe"
               />
             </FormField>
             <FormField label="Email">
               <TextInput
                 type="email"
                 placeholder="Enter your email"
                 defaultValue="john@example.com"
               />
             </FormField>
             <FormField label="Phone">
               <TextInput type="tel" placeholder="Enter your phone number" />
             </FormField>
             <FormField label="Bio">
               <textarea
                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                 rows="3"
                 placeholder="Tell us about yourself"
               ></textarea>
             </FormField>
           </>
         );

       case "Change Profile Picture":
         return (
           <div className="space-y-4">
             <div className="flex items-center justify-center">
               <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                 <User size={48} className="text-gray-400" />
               </div>
             </div>
             <div className="flex justify-center">
               <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-md flex items-center gap-2">
                 <Upload size={20} />
                 Upload New Picture
                 <input type="file" className="hidden" accept="image/*" />
               </label>
             </div>
           </div>
         );

       case "Change Password":
         return (
           <>
             <FormField label="Current Password">
               <TextInput
                 type="password"
                 placeholder="Enter current password"
               />
             </FormField>
             <FormField label="New Password">
               <TextInput type="password" placeholder="Enter new password" />
             </FormField>
             <FormField label="Confirm New Password">
               <TextInput type="password" placeholder="Confirm new password" />
             </FormField>
           </>
         );

       case "Two-Factor Authentication":
         return (
           <div className="space-y-4">
             <Toggle label="Enable Two-Factor Authentication" />
             <div className="mt-4 p-4 bg-gray-50 rounded-md">
               <h4 className="font-medium mb-2">Authentication Methods</h4>
               <div className="space-y-2">
                 <Toggle label="SMS Authentication" />
                 <Toggle label="Authenticator App" />
                 <Toggle label="Security Key" />
               </div>
             </div>
           </div>
         );

       case "Email Notifications":
         return (
           <div className="space-y-3">
             <Toggle label="Security Alerts" />
             <Toggle label="New Login Notifications" />
             <Toggle label="Product Updates" />
             <Toggle label="Newsletter" />
             <Toggle label="Comment Notifications" />
             <FormField label="Notification Email">
               <TextInput type="email" placeholder="Enter notification email" />
             </FormField>
           </div>
         );

       case "Push Notifications":
         return (
           <div className="space-y-3">
             <Toggle label="Enable Push Notifications" />
             <Toggle label="Sound Alerts" />
             <Toggle label="Desktop Notifications" />
             <div className="mt-4">
               <FormField label="Quiet Hours">
                 <div className="grid grid-cols-2 gap-3">
                   <TextInput type="time" defaultValue="22:00" />
                   <TextInput type="time" defaultValue="07:00" />
                 </div>
               </FormField>
             </div>
           </div>
         );

       case "Language":
         return (
           <FormField label="Select Language">
             <Select
               options={[
                 { value: "en", label: "English" },
                 { value: "es", label: "Español" },
                 { value: "fr", label: "Français" },
                 { value: "de", label: "Deutsch" },
                 { value: "it", label: "Italiano" },
                 { value: "pt", label: "Português" },
               ]}
             />
           </FormField>
         );

       case "Time Zone":
         return (
           <>
             <FormField label="Select Time Zone">
               <Select
                 options={[
                   { value: "UTC-8", label: "Pacific Time (PT)" },
                   { value: "UTC-5", label: "Eastern Time (ET)" },
                   { value: "UTC+0", label: "Greenwich Mean Time (GMT)" },
                   { value: "UTC+1", label: "Central European Time (CET)" },
                   { value: "UTC+8", label: "China Standard Time (CST)" },
                 ]}
               />
             </FormField>
             <FormField label="Date Format">
               <Select
                 options={[
                   { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                   { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                   { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                 ]}
               />
             </FormField>
             <FormField label="Time Format">
               <Select
                 options={[
                   { value: "12", label: "12-hour" },
                   { value: "24", label: "24-hour" },
                 ]}
               />
             </FormField>
           </>
         );

       default:
         return null;
     }
   };

   return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
         <div className="flex justify-between items-center mb-4">
           <h2 className="text-xl font-semibold">{title}</h2>
           <button
             onClick={onClose}
             className="text-gray-500 hover:text-gray-700"
           >
             <X size={20} />
           </button>
         </div>
         <div className="mb-6">
           <p className="text-gray-600 mb-4">{description}</p>
           {renderFormFields()}
         </div>
         <div className="flex justify-end space-x-3">
           <button
             onClick={onClose}
             className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
           >
             Cancel
           </button>
           <button
             onClick={onClose}
             className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
           >
             Save Changes
           </button>
         </div>
       </div>
     </div>
   );
 };

 // SettingsSection Component (unchanged)
 const SettingsSection = ({
   title,
   icon: Icon,
   settings,
   onConfigureClick,
 }) => (
   <Card>
     <CardHeader className="flex flex-row items-center space-x-4">
       <Icon size={24} className="text-gray-500" />
       <CardTitle>{title}</CardTitle>
     </CardHeader>
     <CardContent>
       <div className="space-y-4">
         {settings.map((setting, index) => (
           <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
             <h3 className="font-medium">{setting.name}</h3>
             <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
             <button
               onClick={() =>
                 onConfigureClick(setting.name, setting.description)
               }
               className="mt-2 text-sm text-blue-600 hover:text-blue-800"
             >
               Configure
             </button>
           </div>
         ))}
       </div>
     </CardContent>
   </Card>
 );

 // Main SettingsPage Component (unchanged)
 const SettingsPage = () => {
   const [dialogOpen, setDialogOpen] = useState(false);
   const [selectedSetting, setSelectedSetting] = useState({
     title: "",
     description: "",
   });

   const handleConfigureClick = (title, description) => {
     setSelectedSetting({ title, description });
     setDialogOpen(true);
   };

   const settingsSections = [
     {
       title: "Profile Settings",
       icon: User,
       settings: [
         {
           name: "Update Profile Information",
           description: "Change your name, email, and other profile details",
         },
         {
           name: "Change Profile Picture",
           description: "Upload a new profile picture",
         },
       ],
     },
     {
       title: "Security Settings",
       icon: Lock,
       settings: [
         {
           name: "Change Password",
           description: "Update your password regularly for better security",
         },
         {
           name: "Two-Factor Authentication",
           description: "Add an extra layer of security to your account",
         },
       ],
     },
     {
       title: "Notification Settings",
       icon: Bell,
       settings: [
         {
           name: "Email Notifications",
           description: "Configure email notification preferences",
         },
         {
           name: "Push Notifications",
           description: "Manage push notification settings",
         },
       ],
     },
     {
       title: "System Settings",
       icon: Globe,
       settings: [
         { name: "Language", description: "Change your preferred language" },
         { name: "Time Zone", description: "Set your local time zone" },
       ],
     },
   ];

   return (
     <div className="space-y-6">
       <h1 className="text-2xl font-bold">Settings</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {settingsSections.map((section, index) => (
           <SettingsSection
             key={index}
             title={section.title}
             icon={section.icon}
             settings={section.settings}
             onConfigureClick={handleConfigureClick}
           />
         ))}
       </div>
       <Dialog
         isOpen={dialogOpen}
         onClose={() => setDialogOpen(false)}
         title={selectedSetting.title}
         description={selectedSetting.description}
       />
     </div>
   );
 };

 export default SettingsPage;