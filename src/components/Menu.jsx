import React, { useState, useEffect } from "react";

const Menu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check the screen size and update the state
  const checkScreenWidth = () => {
    setIsMobile(window.innerWidth < 1000); // Adjust the breakpoint as needed
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {isMobile ? (
        <div
          className={`w-full bg-black text-white flex flex-col items-center ${
            isMenuOpen ? "block full-height-mobile" : "hidden"
          }`}
        >
          <div className="menu--element w-full">Football</div>
          <div className="menu--element w-full">Basketball</div>
          <div className="menu--element w-full">Tennis</div>
          <div className="menu--element w-full">American Football</div>
          <div className="menu--element w-full">Box</div>
          <div className="menu--element w-full">Horse Racing</div>
          <div className="menu--element w-full">Slots</div>
          <div className="menu--element w-full">About Us</div>
          <div className="menu--element w-full">Contact Us</div>
        </div>
      ) : (
        <div
          className={`w-[330px] text-black border-r-2 border-b-2 border-gray-800 rounded-br-xl`}
        >
          <div className="menu--element ">Football</div>
          <div className="menu--element">Basketball</div>
          <div className="menu--element">Tennis</div>
          <div className="menu--element">American Football</div>
          <div className="menu--element">Box</div>
          <div className="menu--element">Horse Racing</div>
          <div className="menu--element">Slots</div>
          <div className="menu--element">About Us</div>
          <div className="menu--element">Contact Us</div>
        </div>
      )}
      {isMobile && (
        <button
          onClick={toggleMenu}
          className="fixed top-0 left-0 p-4 text-white mt-2"
        >
          ☰ {/* This can be your menu icon (e.g., a hamburger icon) */}
        </button>
      )}
    </div>
  );
};

export default Menu;
