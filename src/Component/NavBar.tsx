 import { useEffect, useState } from "react";
 import MenuItem from "../reusable/MenuItem.tsx";
 import {
   FiHome,
   FiMenu,
   FiX,
   FiPhone,
   FiActivity,
   FiPackage,
   FiRadio,
   FiBookmark,
 } from "react-icons/fi";
 import Button from "../reusable/Button.tsx";
 import Logo from "../assets/Muhe-Logo-white.png";
 import Header from "./Header.tsx";

 const NavBar = () => {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 0);
     };

     window.addEventListener("scroll", handleScroll);
     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);

   const toggleMenu = () => {
     setIsMenuOpen(!isMenuOpen);
   };

   const handleMenuItemClick = () => {
     if (isMobile()) {
       toggleMenu();
     }
   };

   const isMobile = () => window.innerWidth <= 640;

   return (
     <>
       {isMenuOpen && (
         <div className="inset-0 bg-black bg-opacity-50 z-40"></div>
       )}
       <header
         className={`fixed top-0 left-0 z-50 bg-black w-full h-24 flex justify-center items-center transition-all duration-300 ${
           isScrolled
             ? "bg-black sm:bg-opacity-75 sm:backdrop-blur-2xl"
             : "bg-transparent"
         }`}
       >
         <div className="flex flex-col">
           <div className="pt-10 mt-8">
             <Header />
           </div>
           <div className="flex justify-between  bg-gradient-to-b from-yellow-800 to-yellow-500 rounded-t-sm items-center mb-28 w-full max-w-7xl ">
             <img
               src={Logo}
               alt="Logo"
               width="150px"
               className="flex justify-start mr-80 "
             />
             <button className="md:hidden text-white z-50" onClick={toggleMenu}>
               {!isMenuOpen && <FiMenu size={24} />}
             </button>
             <nav
               className={`fixed md:static flex  right-0 md:flex md:gap-8 md:bg-transparent bg-black bg-opacity-90 md:w-auto w-4/5 h-full md:h-auto flex-col md:flex-row items-center transition-transform transform ${
                 isMenuOpen ? "translate-x-0" : "translate-x-full"
               } md:translate-x-0 z-50 pr-3`}
             >
               <button
                 className="md:hidden text-white absolute top-4 right-4 z-50"
                 onClick={toggleMenu}
               >
                 <FiX size={24} />
               </button>
               <div className="flex flex-col sm:flex-row gap-6 w-full mt-8 md:mt-0">
                 <MenuItem
                   title="Home"
                   address="/"
                   Icon={FiHome}
                   onClick={handleMenuItemClick}
                 />
                 <MenuItem
                   title="About Us"
                   address="/aboutus1"
                   Icon={FiBookmark}
                   onClick={handleMenuItemClick}
                 />
                 <MenuItem
                   title="Contact"
                   address="/contact"
                   Icon={FiPhone}
                   onClick={handleMenuItemClick}
                 />
                 <MenuItem
                   title="Services"
                   address="/venue"
                   Icon={FiRadio}
                   onClick={handleMenuItemClick}
                 />
                 <MenuItem
                   title="Insipirations"
                   address="/venue"
                   Icon={FiActivity}
                   onClick={handleMenuItemClick}
                 />
                 <MenuItem
                   title="Publications"
                   address="/projects"
                   Icon={FiPackage}
                   onClick={handleMenuItemClick}
                 />
               </div>
               <div className="md:hidden mt-4 w-full">
                 <Button label="Contact Us" onClick={toggleMenu} />
               </div>
             </nav>
           </div>
         </div>
       </header>
     </>
   );
 };

 export default NavBar;
