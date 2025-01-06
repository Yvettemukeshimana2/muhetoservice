 import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 import Layout from "./layout.tsx/Dashboardlayout";
 import LoginPage from "./Component/Login";
 import DashboardPage from "./pages/Dashboard";
 import MaterialsPage from "./pages/MaterialPage";
 import UsersPage from "./pages/User";
 import CommentsPage from "./pages/Comment";
 import SettingsPage from "./pages/Setting";
 import AnalyticsPage from "./pages/AnalyticPage";

 // Define the type for ProtectedRoute props
 interface ProtectedRouteProps {
   children: JSX.Element; // Expecting a single JSX element as children
 }

 // Protected Route Component
 const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
   const isAuthenticated = localStorage.getItem("token") !== null; // Check if user is authenticated
   return isAuthenticated ? children : <Navigate to="/login" />; // Redirect if not authenticated
 };

 const App: React.FC = () => {
   return (
     <BrowserRouter>
       <Routes>
         <Route path="/login" element={<LoginPage />} />

         {/* Protected Routes */}
         <Route
           path="/"
           element={
             <ProtectedRoute>
               <Layout />
             </ProtectedRoute>
           }
         >
           <Route index element={<DashboardPage />} />
           <Route path="materials" element={<MaterialsPage />} />
           <Route path="users" element={<UsersPage />} />
           <Route path="messages" element={<CommentsPage />} />
           <Route path="settings" element={<SettingsPage />} />
           <Route path="bookedmaterial" element={<AnalyticsPage />} />
         </Route>

         {/* Catch-all route */}
         <Route path="*" element={<Navigate to="/" replace />} />
       </Routes>
     </BrowserRouter>
   );
 };

 export default App;
