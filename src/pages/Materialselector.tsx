 import React from "react";

 interface Material {
   type: string;
   price: number;
   image: string;
 }

 interface MaterialSelectorProps {
   materialType: string;
   materials: Material[];
   onMaterialSelect: (material: Material) => void;
 }

 const MaterialSelector: React.FC<MaterialSelectorProps> = ({
   materialType,
   materials,
   onMaterialSelect,
 }) => {
   return (
     <div>
       <h2>{materialType} Materials</h2>
       {materials.length > 0 ? (
         materials.map((material) => (
           <div key={material.type} onClick={() => onMaterialSelect(material)}>
             <img src={material.image} alt={material.type} />
             <h3>{material.type}</h3>
             <p>Price: {material.price}</p>
           </div>
         ))
       ) : (
         <p>No materials available for this venue type.</p>
       )}
     </div>
   );
 };

 export default MaterialSelector;
