 import React, { useState } from "react";
 import SelectedMaterialDetail from "./Materialdetail";
 import ImageSlider from "./Gallery";
 import VenueTypeSelector from "./Venueselector"; // Import the new component
 import MaterialSelector from "./Materialselector"; // Import the new component
 import Footer from "../Component/Footer";

 type MaterialType = "Glass" | "Chair" | "Table" | "Decoration";

 interface Material {
   type: string;
   price: number;
   image: string;
 }

 const materialOptions: Record<MaterialType, Material[]> = {
   Glass: [
     { type: "Wine Glass", price: 1000, image: "/images/wine-glass.jpg" },
     {
       type: "Champagne Glass",
       price: 1200,
       image: "/images/champagne-glass.jpg",
     },
     { type: "Water Glass", price: 800, image: "/images/water-glass.jpg" },
   ],
   Chair: [
     { type: "Wooden Chair", price: 1500, image: "/images/wooden-chair.jpg" },
     { type: "Plastic Chair", price: 500, image: "/images/plastic-chair.jpg" },
     {
       type: "Cushioned Chair",
       price: 2000,
       image: "/images/cushioned-chair.jpg",
     },
   ],
   Table: [
     { type: "Round Table", price: 3000, image: "/images/round-table.jpg" },
     { type: "Square Table", price: 2500, image: "/images/square-table.jpg" },
   ],
   Decoration: [
     {
       type: "Flower Arrangement",
       price: 5000,
       image: "/images/flower-arrangement.jpg",
     },
     { type: "Balloon Setup", price: 2000, image: "/images/balloon-setup.jpg" },
   ],
 };

 const VenuePage: React.FC = () => {
   const [selectedVenueType, setSelectedVenueType] = useState<string | null>(
     null
   );
   const [selectedMaterialDetail, setSelectedMaterialDetail] =
     useState<Material | null>(null);

   const handleVenueTypeSelect = (venueType: string) => {
     setSelectedVenueType(venueType);
   };

   const handleMaterialSelect = (material: Material) => {
     setSelectedMaterialDetail(material);
   };

   const availableMaterials =
     selectedVenueType && materialOptions[selectedVenueType as MaterialType]
       ? materialOptions[selectedVenueType as MaterialType]
       : [];

   return (
     <div className="">
       <div className="bg-yellow-700">
         <nav className="mb-4 flex justify-center  p-3">
           <input
             type="text"
             placeholder="Search for what you want..."
             className="border border-gray-300 rounded px-4 py-2"
           />
           <input
             type="date"
             className="border border-gray-300 rounded px-4 py-2 ml-2"
           />
           <input
             type="date"
             className="border border-gray-300 rounded px-4 py-2 ml-2"
           />
           <button className="bg-white  text-black hover:bg-yellow-500 border-2 border-yellow-500 rounded px-4 py-2 ml-2">
             Let's Go
           </button>
         </nav>
       </div>

       <div className="px-8 pb-10 ">
         <ImageSlider />

         <VenueTypeSelector onSelect={handleVenueTypeSelect} />

         {selectedVenueType && (
           <MaterialSelector
             materialType={selectedVenueType}
             materials={availableMaterials}
             onMaterialSelect={handleMaterialSelect}
           />
         )}

         <SelectedMaterialDetail material={selectedMaterialDetail} />
       </div>
       <Footer companyName="MHServices" year={2020} />
     </div>
   );
 };

 export default VenuePage;
