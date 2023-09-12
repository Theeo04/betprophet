import React, { useState } from "react";

function PlacedBet() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {!isOpen ? (
        // When it's closed
        <div
          onClick={toggleDiv}
          className="fixed bottom-0 right-0 h-[80px] w-[340px] bg-purple-600 mr-5 rounded-t-xl flex items-center justify-center"
        >
          <p className="text-white bg-purple-600 font-[500] text-[12px]">
            Your content here
          </p>
        </div>
      ) : (
        // When it's open, render the div with content
        <div
          onClick={toggleDiv}
          className="fixed bottom-0 right-0 h-[500px] w-[340px] bg-purple-600 mr-5 rounded-t-xl"
        ></div>
        //only when you click on the top of the div to close => div with 2 others div and the function onClick only for the div place in the top
      )}
    </div>
  );
}

export default PlacedBet;
