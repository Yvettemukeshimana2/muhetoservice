 import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 import Layout from "./layout.tsx/Dashboardlayout";
 import LoginPage from "./Component/Login";
 import DashboardPage from "./pages/Dashboard";
 import MaterialsPage from "./pages/MaterialPage";
 import UsersPage from "./pages/User";
 import CommentsPage from "./pages/Comment";
 import SettingsPage from "./pages/Setting";
 import AnalyticsPage from "./pages/AnalyticPage";

 interface ProtectedRouteProps {
   children: JSX.Element;
 }

 const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
   const isAuthenticated = localStorage.getItem("token") !== null;
   return isAuthenticated ? children : <Navigate to="/login" replace />;
 };

 const App: React.FC = () => {
   return (
     <BrowserRouter>
       <Routes>
         {/* Always show login first */}
         <Route path="/" element={<Navigate to="/login" replace />} />
         <Route path="/login" element={<LoginPage />} />

         {/* Protected Dashboard Routes */}
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

         {/* Catch-all redirect to login */}
         <Route path="*" element={<Navigate to="/login" replace />} />
       </Routes>
     </BrowserRouter>
   );
 };

 export default App;
