 import React, { useState } from "react";
 import { Edit, Trash2, Plus } from "lucide-react";

 interface Material {
   id: number;
   image: string;
   type: string;
   name: string;
   price: number;
   quantity: number;
   quality: string;
 }

 interface FormData {
   imageFile: File | null; // For image file uploads
   type: string;
   name: string;
   price: string;
   quantity: string;
   quality: string;
 }

 const MaterialManagement = () => {
   const [materials, setMaterials] = useState<Material[]>([
     {
       id: 1,
       image: "https://via.placeholder.com/200",
       type: "Wood",
       name: "Oak Planks",
       price: 299.99,
       quantity: 50,
       quality: "Premium",
     },
   ]);

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 6;
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingMaterial, setEditingMaterial] = useState<Material | null>(
     null
   );
   const [formData, setFormData] = useState<FormData>({
     imageFile: null,
     type: "",
     name: "",
     price: "",
     quantity: "",
     quality: "",
   });
   const [imagePreview, setImagePreview] = useState<string | null>(null);

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = materials.slice(indexOfFirstItem, indexOfLastItem);
   const totalPages = Math.ceil(materials.length / itemsPerPage);

   const handleInputChange = (
     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
     const { name, value } = e.target;

     setFormData({
       ...formData,
       [name]: value,
     });
   };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0] || null;
     setFormData({
       ...formData,
       imageFile: file,
     });

     if (file) {
       const reader = new FileReader();
       reader.onloadend = () => {
         setImagePreview(reader.result as string);
       };
       reader.readAsDataURL(file);
     } else {
       setImagePreview(null);
     }
   };

   const handleEdit = (material: Material) => {
     setEditingMaterial(material);
     setFormData({
       imageFile: null,
       type: material.type,
       name: material.name,
       price: material.price.toString(),
       quantity: material.quantity.toString(),
       quality: material.quality,
     });
     setImagePreview(material.image);
     setIsModalOpen(true);
   };

   const handleDelete = (id: number) => {
     setMaterials(materials.filter((material) => material.id !== id));
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     const newMaterial: Material = {
       id: editingMaterial ? editingMaterial.id : materials.length + 1,
       image: imagePreview || "", // Use image preview as the image source
       type: formData.type,
       name: formData.name,
       price: parseFloat(formData.price) || 0,
       quantity: parseInt(formData.quantity) || 0,
       quality: formData.quality,
     };

     if (editingMaterial) {
       setMaterials(
         materials.map((material) =>
           material.id === editingMaterial.id ? newMaterial : material
         )
       );
     } else {
       setMaterials([...materials, newMaterial]);
     }

     setFormData({
       imageFile: null,
       type: "",
       name: "",
       price: "",
       quantity: "",
       quality: "",
     });
     setImagePreview(null);
     setEditingMaterial(null);
     setIsModalOpen(false);
   };

   return (
     <div className="p-8">
       <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold">Materials Management</h1>
         <button
           onClick={() => setIsModalOpen(true)}
           className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
         >
           <Plus size={20} />
           Add Material
         </button>
       </div>

       {isModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
           <div className="bg-white p-6 mt-7 mb-7  rounded-lg w-full  overflow-y-scroll max-w-md">
             <h2 className="text-xl font-bold mb-4">
               {editingMaterial ? "Edit Material" : "Add New Material"}
             </h2>
             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <label className="block text-sm font-medium mb-1">
                   Upload Image
                 </label>
                 <input
                   type="file"
                   accept="image/*"
                   onChange={handleFileChange}
                   className="w-full p-2 border rounded-md"
                 />
                 {imagePreview && (
                   <img
                     src={imagePreview}
                     alt="Preview"
                     className="w-full h-32 object-cover mt-2"
                   />
                 )}
               </div>
               <div className="flex"> 
               <div>
                 <label className="block text-sm font-medium mb-1">Type</label>
                 <input
                   type="text"
                   name="type"
                   value={formData.type}
                   onChange={handleInputChange}
                   className="w-full p-2 border rounded-md"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1">Name</label>
                 <input
                   type="text"
                   name="name"
                   value={formData.name}
                   onChange={handleInputChange}
                   className="w-full p-2 border rounded-md"
                 />
               </div>
               </div>

               <div className="flex"> 
               <div>
                 <label className="block text-sm font-medium mb-1">Price</label>
                 <input
                   type="number"
                   name="price"
                   value={formData.price}
                   onChange={handleInputChange}
                   className="w-full p-2 border rounded-md"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1">
                   Quantity
                 </label>
                 <input
                   type="number"
                   name="quantity"
                   value={formData.quantity}
                   onChange={handleInputChange}
                   className="w-full p-2 border rounded-md"
                 />
               </div>
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1">
                   Quality
                 </label>
                 <select
                   name="quality"
                   value={formData.quality}
                   onChange={handleInputChange}
                   className="w-full p-2 border rounded-md"
                 >
                   <option value="">Select Quality</option>
                   <option value="Premium">Premium</option>
                   <option value="Standard">Standard</option>
                   <option value="Economy">Economy</option>
                 </select>
               </div>
               <div className="flex gap-2">
                 <button
                   type="submit"
                   className="flex-1 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
                 >
                   {editingMaterial ? "Update Material" : "Add Material"}
                 </button>
                 <button
                   type="button"
                   onClick={() => {
                     setIsModalOpen(false);
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
                   }}
                   className="flex-1   text-yellow-500 py-2 rounded-md  border-2 border-yellow-500"
                 >
                   Cancel
                 </button>
               </div>
             </form>
           </div>
         </div>
       )}

       {/* List of materials */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {currentItems.map((material) => (
           <div
             key={material.id}
             className="border rounded-lg overflow-hidden shadow-sm"
           >
             <img
               src={material.image}
               alt={material.name}
               className="w-full h-48 object-cover"
             />
             <div className="p-4">
               <h3 className="text-xl font-bold mb-2">{material.name}</h3>
               <div className="space-y-2">
                
                 <p>
                   <span className="font-medium">Type:</span> {material.type}
                 </p>
                 <p>
                   <span className="font-medium">Price:</span> ${material.price}
                 </p>
                 <p>
                   <span className="font-medium">Quantity:</span>{" "}
                   {material.quantity}
                 </p>
                 <p>
                   <span className="font-medium">Quality:</span>{" "}
                   {material.quality}
                 </p>
               </div>
               <div className="flex gap-2 mt-4">
                 <button
                   onClick={() => handleEdit(material)}
                   className=" bg-yellow-500 gap-3 font-bold text-white p-2 flex rounded-md hover:bg-yellow-600"
                 >
                   <Edit size={16} className="mt-1 " /> Edit
                 </button>
                 <button
                   onClick={() => handleDelete(material.id)}
                   className=" border-2 flex font-bold gap-1 border-yellow-500 text-yellow-500 p-2 rounded-md hover:bg-yellow-600 hover:text-white"
                 >
                   <Trash2 size={16} className="mt-1" /> Delete
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>

       {/* Pagination */}
       <div className="flex justify-center mt-6 space-x-2">
         {[...Array(totalPages)].map((_, index) => (
           <button
             key={index}
             onClick={() => setCurrentPage(index + 1)}
             className={`px-4 py-2 rounded-md ${
               currentPage === index + 1
                 ? "bg-blue-500 text-white"
                 : "bg-gray-200"
             }`}
           >
             {index + 1}
           </button>
         ))}
       </div>
     </div>
   );
 };

 export default MaterialManagement;
