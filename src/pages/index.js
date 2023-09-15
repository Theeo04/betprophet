import React, { useState } from "react";
import Content from "@/components/Content";
import Nav from "@/components/Nav";
import PlacedBet from "@/components/PlacedBet";
import GrayBck from "@/components/GrayBck";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the isOpen state
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={isOpen ? "opacity-30 " : ""}>
        {isOpen && <GrayBck />}
        <Nav />
        <Content />
      </div>
      <PlacedBet isOpen={isOpen} toggleOpen={toggleOpen} />
      {/* <AskAi /> */}
    </div>
  );
}

export default App;
