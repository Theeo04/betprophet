import React, { useEffect, useState } from "react";
import BettingContent from "./BettingContent";

function PlacedBet() {
  const [isOpen, setIsOpen] = useState(false);
  const [betts, setBetts] = useState([]);
  const [totalBet, setTotalBet] = useState(1);
  const [uniqueBetts, setUniqueBetts] = useState([]);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Function to get bets from localStorage
    const getBetsFromLocalStorage = () => {
      const dataFromLocalStorage =
        JSON.parse(localStorage.getItem("yourBet")) || [];
      return dataFromLocalStorage;
    };

    // Initialize betts state from localStorage
    const initialBetts = getBetsFromLocalStorage();
    setBetts(initialBetts);

    // Listen for changes in localStorage
    const handleStorageChange = (e) => {
      if (e.key === "yourBet") {
        const updatedBetts = getBetsFromLocalStorage();
        setBetts(updatedBetts);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const uniqueMatches = [];
    betts.forEach((match) => {
      if (
        !uniqueMatches.some((uniqueMatch) => uniqueMatch.home === match.home)
      ) {
        uniqueMatches.push(match);
        // Here, you can delete the object from localStorage if needed
      }
    });
    setUniqueBetts(uniqueMatches);
  }, [betts]);

  useEffect(() => {
    const product = uniqueBetts.reduce(
      (accumulator, bet) => accumulator * bet.oddMatch.toFixed(2),
      1
    );

    setTotalBet(product);
  }, [uniqueBetts]);

  // Render the component with real-time data
  return (
    <div>
      {!isOpen ? (
        // When it's closed
        <div
          onClick={toggleDiv}
          className="fixed bottom-0 right-0 h-[80px] w-[340px] bg-purple-600 mr-5 rounded-t-xl flex items-center justify-center cursor-pointer"
        >
          <p className="text-white bg-purple-600 font-[500] text-[12px]">
            Matches: {uniqueBetts.length} Total Odd: {totalBet.toFixed(2)}
          </p>
        </div>
      ) : (
        // When it's open, render the div with content
        <div>
          <div className="fixed bottom-0 right-0 h-[520px] w-[340px] bg-purple-600 mr-5 rounded-t-xl flex flex-col">
            <div
              className="flex items-center justify-center absolute top-0 bottom-0 right-0 h-[80px] w-[340px] bg-purple-600 rounded-t-xl border-b border-gray-300 cursor-pointer"
              onClick={toggleDiv}
            >
              <p className="text-white bg-purple-600 font-[500] text-[12px]">
                Matches: {uniqueBetts.length} Total Odd: {totalBet.toFixed(2)}
              </p>
            </div>
            <BettingContent totalBet={totalBet} />{" "}
            {/* Pass totalBet as a prop */}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacedBet;
