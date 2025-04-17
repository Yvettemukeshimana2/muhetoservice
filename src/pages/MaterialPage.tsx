 import React, { useState, useEffect } from "react";
 import { Edit, Trash2, Plus } from "lucide-react";

 interface Material {
   itemid: number;
   itemname: string;
   catid: number;
   itemPPU: number;
   itemquantity: number;
   Itemimage: string | null;
   itemdiscription: string | null;
   isActive: boolean;
   Category: {
     catname: string;
     cattype: string;
     catdescription: string;
   };
 }

 interface FormData {
   imageFile: File | null;
   type: string;
   name: string;
   price: string;
   quantity: string;
   quality: string;
 }

 const MaterialManagement = () => {
   const [materials, setMaterials] = useState<Material[]>([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingMaterial, setEditingMaterial] = useState<Material | null>(
     null
   );
   const [imagePreview, setImagePreview] = useState<string | null>(null);

   const [formData, setFormData] = useState<FormData>({
     imageFile: null,
     type: "",
     name: "",
     price: "",
     quantity: "",
     quality: "",
   });

   const itemsPerPage = 6;
   const token = import.meta.env.VITE_AUTH_TOKEN;
   const baseUrl = import.meta.env.VITE_HOST;

   useEffect(() => {
     const fetchMaterials = async () => {
       try {
         const response = await fetch(`${baseUrl}/item/all`, {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         });
         const result = await response.json();

         if (result?.data) {
           const items: Material[] = result.data.map((item: any) => ({
             itemid: item.itemid,
             itemname: item.itemname,
             catid: item.catid,
             itemPPU: item.itemPPU,
             itemquantity: item.itemquantity,
             Itemimage: item.Itemimage,
             itemdiscription: item.itemdiscription,
             isActive: item.isActive,
             Category: item.Category,
           }));
           setMaterials(items);
         } else {
           console.error("Invalid data structure:", result);
         }
       } catch (error) {
         console.error("Failed to fetch materials:", error);
       }
     };

     fetchMaterials();
   }, []);

   const handleInputChange = (
     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
     const { name, value } = e.target;
     setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0] ?? null;
     setFormData((prev) => ({ ...prev, imageFile: file }));

     if (file) {
       const reader = new FileReader();
       reader.onloadend = () => setImagePreview(reader.result as string);
       reader.readAsDataURL(file);
     } else {
       setImagePreview(null);
     }
   };

   const handleEdit = (material: Material) => {
     setEditingMaterial(material);
     setFormData({
       imageFile: null,
       type: material.Category.catname,
       name: material.itemname,
       price: material.itemPPU.toString(),
       quantity: material.itemquantity.toString(),
       quality: "Premium",
     });
     setImagePreview(material.Itemimage);
     setIsModalOpen(true);
   };

   const handleDelete = (id: number) => {
     setMaterials((prev) => prev.filter((item) => item.itemid !== id));
   };

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();

     const newMaterial: Material = {
       itemid: editingMaterial ? editingMaterial.itemid : Date.now(),
       itemname: formData.name,
       catid: 1,
       itemPPU: parseFloat(formData.price),
       itemquantity: parseInt(formData.quantity),
       Itemimage: imagePreview,
       itemdiscription: null,
       isActive: true,
       Category: {
         catname: formData.type,
         cattype: "",
         catdescription: "",
       },
     };

     if (editingMaterial) {
       setMaterials((prev) =>
         prev.map((item) =>
           item.itemid === editingMaterial.itemid ? newMaterial : item
         )
       );
     } else {
       setMaterials((prev) => [...prev, newMaterial]);
     }

     resetForm();
   };

   const resetForm = () => {
     setEditingMaterial(null);
     setFormData({
       imageFile: null,
       type: "",
       name: "",
       price: "",
       quantity: "",
       quality: "",
     });
     setImagePreview(null);
     setIsModalOpen(false);
   };

   const paginatedItems = materials.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   );
   const totalPages = Math.ceil(materials.length / itemsPerPage);

   return (
     <div className="p-8">
       <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold">Material Management</h1>
         <button
           className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
           onClick={() => setIsModalOpen(true)}
         >
           <Plus size={20} />
           Add Material
         </button>
       </div>

       {/* Material List */}
       <div className="space-y-4">
         {paginatedItems.map((material) => (
           <div
             key={material.itemid}
             className="bg-gray-100 p-4 rounded-md flex items-center gap-4"
           >
             <img
               src={material.Itemimage ?? "https://via.placeholder.com/80"}
               alt={material.itemname}
               className="w-20 h-20 object-cover rounded-md"
             />
             <div className="flex-1">
               <h3 className="font-semibold">{material.itemname}</h3>
               <p className="text-sm text-gray-600">
                 {material.Category.catname}
               </p>
               <p>Price: ${material.itemPPU}</p>
               <p>Quantity: {material.itemquantity}</p>
             </div>
             <div className="flex gap-2">
               <button
                 onClick={() => handleEdit(material)}
                 className="text-blue-600"
               >
                 <Edit size={18} />
               </button>
               <button
                 onClick={() => handleDelete(material.itemid)}
                 className="text-red-600"
               >
                 <Trash2 size={18} />
               </button>
             </div>
           </div>
         ))}
       </div>

       {/* Pagination */}
       <div className="flex justify-center gap-2 mt-6">
         {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
           <button
             key={num}
             onClick={() => setCurrentPage(num)}
             className={`px-3 py-1 rounded-md border ${
               num === currentPage ? "bg-yellow-500 text-white" : "bg-white"
             }`}
           >
             {num}
           </button>
         ))}
       </div>

       {/* Modal */}
       {isModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center overflow-y-auto items-center z-50">
           <div className="bg-white rounded-lg p-6 mt-16 w-full max-w-md shadow-lg relative max-h-[95vh] overflow-y-auto">
             <button
               className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
               onClick={resetForm}
             >
               ✕
             </button>
             <h2 className="text-xl font-bold mb-4">
               {editingMaterial ? "Edit Material" : "Add New Material"}
             </h2>
             <form onSubmit={handleSubmit} className="space-y-4">
               {/* Upload Image */}
               <div>
                 <label className="block text-sm font-medium mb-1">Image</label>
                 <input
                   type="file"
                   accept="image/*"
                   onChange={handleFileChange}
                   className="w-full p-2 border rounded"
                 />
                 {imagePreview && (
                   <img
                     src={imagePreview}
                     alt="Preview"
                     className="mt-2 h-32 w-full object-cover rounded"
                   />
                 )}
               </div>

               {/* Fields */}
               <input
                 type="text"
                 name="type"
                 placeholder="Type"
                 value={formData.type}
                 onChange={handleInputChange}
                 className="w-full p-2 border rounded"
               />
               <input
                 type="text"
                 name="name"
                 placeholder="Name"
                 value={formData.name}
                 onChange={handleInputChange}
                 className="w-full p-2 border rounded"
               />
               <input
                 type="number"
                 name="price"
                 placeholder="Price"
                 value={formData.price}
                 onChange={handleInputChange}
                 className="w-full p-2 border rounded"
               />
               <input
                 type="number"
                 name="quantity"
                 placeholder="Quantity"
                 value={formData.quantity}
                 onChange={handleInputChange}
                 className="w-full p-2 border rounded"
               />
               <select
                 name="quality"
                 value={formData.quality}
                 onChange={handleInputChange}
                 className="w-full p-2 border rounded"
               >
                 <option value="">Select Quality</option>
                 <option value="Premium">Premium</option>
                 <option value="Standard">Standard</option>
                 <option value="Economy">Economy</option>
               </select>

               <button
                 type="submit"
                 className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
               >
                 {editingMaterial ? "Update" : "Add"} Material
               </button>
             </form>
           </div>
         </div>
       )}
     </div>
   );
 };

 export default MaterialManagement;
