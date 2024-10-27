 // Routes.tsx

import { createBrowserRouter, useParams, useNavigate } from "react-router-dom";
import AppLayout from "../layout.tsx/Applayout";
import Home from "../pages/Home";
import Ourteam from "../pages/Ourteam";
import Whoweare from "../pages/Whoweare";
import AboutUs1 from "../pages/Aboutus1";
import VenuePage from "../pages/Venue";
import ServicesPage from "../pages/Venue"; // Correct path for ServicesPage component
import ServiceDetail from "../pages/ServiceDetail";

// Error Component
export const Error404 = () => <div>Page not found</div>;

// Service Detail Wrapper Component to handle navigation
const ServiceDetailWrapper = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const onBookService = () => {
    alert("Booking initiated!");
  };

  const onBackClick = () => {
    navigate("/services");
  };

  return (
    <ServiceDetail
      serviceId={parseInt(id || "0", 10)} // Pass serviceId as a number
      onBookService={onBookService}
      onBackClick={onBackClick}
    />
  );
};

// Route Configuration
const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error404 />,
    children: [
      { path: "", element: <Home /> },
      { path: "ourteam", element: <Ourteam /> },
      { path: "whoweare", element: <Whoweare /> },
      { path: "aboutus1", element: <AboutUs1 /> },
      { path: "venue", element: <VenuePage /> },
      { path: "services", element: <ServicesPage /> }, // List of all services
      {
        path: "services/:id",
        element: <ServiceDetailWrapper />, // Route for each service detail
      },
    ],
  },
]);

export default routes;
