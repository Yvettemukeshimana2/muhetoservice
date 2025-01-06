 import React, { useState } from "react";
 import { User, Edit2, Trash2, PlusCircle } from "lucide-react";

 interface User {
   id: number;
   name: string;
   email: string;
   role: string;
   status: "Active" | "Inactive";
 }

 const UsersPage = () => {
   const [users, setUsers] = useState<User[]>([
     {
       id: 1,
       name: "John Doe",
       email: "john@example.com",
       role: "Admin",
       status: "Active",
     },
     {
       id: 2,
       name: "Jane Smith",
       email: "jane@example.com",
       role: "User",
       status: "Active",
     },
     {
       id: 3,
       name: "Bob Johnson",
       email: "bob@example.com",
       role: "User",
       status: "Inactive",
     },
   ]);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingUser, setEditingUser] = useState<User | null>(null);
   const [formData, setFormData] = useState<User>({
     id: 0,
     name: "",
     email: "",
     role: "",
     status: "Active",
   });

   const handleInputChange = (
     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     if (editingUser) {
       setUsers(
         users.map((user) =>
           user.id === editingUser.id ? { ...editingUser, ...formData } : user
         )
       );
     } else {
       setUsers([...users, { ...formData, id: users.length + 1 }]);
     }
     setEditingUser(null);
     setIsModalOpen(false);
     setFormData({ id: 0, name: "", email: "", role: "", status: "Active" });
   };

   const handleEdit = (user: User) => {
     setEditingUser(user);
     setFormData(user);
     setIsModalOpen(true);
   };

   const handleDelete = (id: number) => {
     setUsers(users.filter((user) => user.id !== id));
   };

   return (
     <div className="space-y-6">
       <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold">Users Management</h1>
         <button
           onClick={() => setIsModalOpen(true)}
           className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg"
         >
           <PlusCircle className="mr-2 h-5 w-5" />
           Add User
         </button>
       </div>

       {isModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
           <div className="bg-white p-6 rounded-lg w-full max-w-md">
             <h2 className="text-xl font-bold mb-4">
               {editingUser ? "Edit User" : "Add New User"}
             </h2>
             <form onSubmit={handleSubmit} className="space-y-4">
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
               <div>
                 <label className="block text-sm font-medium mb-1">Email</label>
                 <input
                   type="email"
                   name="email"
                   value={formData.email}
                   onChange={handleInputChange}
                   className="w-full p-2 border rounded-md"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1">Role</label>
                 <input
                   type="text"
                   name="role"
                   value={formData.role}
                   onChange={handleInputChange}
                   className="w-full p-2 border rounded-md"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1">
                   Status
                 </label>
                 <select
                   name="status"
                   value={formData.status}
                   onChange={handleInputChange}
                   className="w-full p-2 border rounded-md"
                 >
                   <option value="Active">Active</option>
                   <option value="Inactive">Inactive</option>
                 </select>
               </div>
               <div className="flex gap-2">
                 <button
                   type="submit"
                   className="flex-1 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
                 >
                   {editingUser ? "Update User" : "Add User"}
                 </button>
                 <button
                   type="button"
                   onClick={() => {
                     setIsModalOpen(false);
                     setEditingUser(null);
                     setFormData({
                       id: 0,
                       name: "",
                       email: "",
                       role: "",
                       status: "Active",
                     });
                   }}
                   className="flex-1 border-yellow-500 border-2 text-yellow-500 py-2 rounded-md hover:text-white hover:bg-yellow-600 ho"
                 >
                   Cancel
                 </button>
               </div>
             </form>
           </div>
         </div>
       )}

       <div className="border rounded-lg shadow-md p-4">
         <div className="border-b pb-2 mb-2">
           <h2 className="text-lg font-semibold">User List</h2>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full">
             <thead>
               <tr className="border-b">
                 <th className="px-6 py-3 text-left">User</th>
                 <th className="px-6 py-3 text-left">Email</th>
                 <th className="px-6 py-3 text-left">Role</th>
                 <th className="px-6 py-3 text-left">Status</th>
                 <th className="px-6 py-3 text-left">Actions</th>
               </tr>
             </thead>
             <tbody>
               {users.map((user) => (
                 <tr key={user.id} className="border-b">
                   <td className="px-6 py-4">
                     <div className="flex items-center space-x-3">
                       <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <User className="h-5 w-5 text-gray-600" />
                       </div>
                       <span>{user.name}</span>
                     </div>
                   </td>
                   <td className="px-6 py-4">{user.email}</td>
                   <td className="px-6 py-4">{user.role}</td>
                   <td className="px-6 py-4">
                     <span
                       className={`px-2 py-1 rounded-full text-xs ${
                         user.status === "Active"
                           ? "bg-green-100 text-green-800"
                           : "bg-red-100 text-red-800"
                       }`}
                     >
                       {user.status}
                     </span>
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex space-x-2">
                       <button
                         onClick={() => handleEdit(user)}
                         className="text-yellow-600 hover:text-yellow-800"
                       >
                         <Edit2 className="h-5 w-5" />
                       </button>
                       <button
                         onClick={() => handleDelete(user.id)}
                         className="text-red-600 hover:text-red-800"
                       >
                         <Trash2 className="h-5 w-5" />
                       </button>
                     </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     </div>
   );
 };

 export default UsersPage;