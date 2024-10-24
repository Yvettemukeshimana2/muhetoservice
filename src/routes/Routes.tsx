import { createBrowserRouter } from "react-router-dom";
 import AppLayout from "../layout.tsx/Applayout.tsx";
 import Home from "../pages/Home.tsx";
 import Ourteam from "../pages/Ourteam.tsx";
 import Whoweare from "../pages/Whoweare.tsx";
 import AboutUs1 from "../pages/Aboutus1.tsx";
 import VenuePage from "../pages/Venue.tsx";
 
 
export const Errror404 = () => {
  return <div>Page not found</div>;
};

const routes = createBrowserRouter([
  {
    errorElement: <Errror404 />,
  },
  {
    element: <AppLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "ourteam", element: <Ourteam /> },
      { path: "whoweare", element: <Whoweare /> },
      { path: "aboutus1", element: <AboutUs1 /> },
    ],
  },
  {
    path:"venue",element:<VenuePage/>
  }
]);
export default routes;
