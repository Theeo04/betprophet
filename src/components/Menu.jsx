import React, { useState, useEffect } from "react";
import { BiFootball } from "react-icons/bi";
import Odd from "./Odds/Odd";

const Menu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Football");

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

  // For the Rendering the Odds table:
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setIsMenuOpen(!isMenuOpen);
  };

  const renderComponentForMenuItem = () => {
    if (selectedMenuItem === "Football") {
      return <Odd title={"Football"} competition={"soccer_epl"} />;
    }
    // Add similar conditionals for other menu items here
    return null; // Render nothing by default
  };

  return (
    <div className="flex">
      {isMobile ? (
        <div
          className={`w-full bg-black text-white flex flex-col items-center z-10 ${
            isMenuOpen ? "block full-height-mobile" : "hidden"
          }`}
        >
          <button
            className="menu--element w-full"
            onClick={() => handleMenuItemClick("Football")}
          >
            Football
          </button>
          <button class="menu--element w-full">Basketball</button>
          <button class="menu--element w-full">Tennis</button>
          <button class="menu--element w-full">American Football</button>
          <button class="menu--element w-full">Box</button>
          <button class="menu--element w-full">Horse Racing</button>
          <button class="menu--element w-full">Slots</button>
          <button class="menu--element w-full">About Us</button>
          <button class="menu--element w-full">Contact Us</button>
        </div>
      ) : (
        <div
          className={`w-[330px] text-black border-r-2 border-b-2 border-gray-800 rounded-br-xl`}
        >
          <div className="menu--element">Football</div>
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
          ☰
        </button>
      )}
      {selectedMenuItem && (
        <div className={isMobile && isMenuOpen ? "hidden" : ""}>
          {renderComponentForMenuItem()}
        </div>
      )}
    </div>
  );
};

export default Menu;
