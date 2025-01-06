 import React from "react";
 import { Card, CardHeader, CardContent, Typography } from "@mui/material"; // Replace with your actual component library
 import { AiOutlineClose } from "react-icons/ai"; // Using react-icons for the close icon

 interface DialogProps {
   isOpen: boolean;
   title: string;
   description: string;
   onClose: () => void;
   renderFormFields: () => JSX.Element;
 }

 const Dialog: React.FC<DialogProps> = ({
   isOpen,
   title,
   description,
   onClose,
   renderFormFields,
 }) => {
   if (!isOpen) return null;

   return (
     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
       <Card className="w-96">
         <CardHeader>
           <div className="flex justify-between items-center">
             <Typography variant="h6">{title}</Typography>
             <button onClick={onClose}>
               <AiOutlineClose className="w-6 h-6 text-gray-600 hover:text-gray-900" />
             </button>
           </div>
           <Typography variant="body2" color="textSecondary">
             {description}
           </Typography>
         </CardHeader>
         <CardContent>{renderFormFields()}</CardContent>
       </Card>
     </div>
   );
 };

 export default Dialog;
