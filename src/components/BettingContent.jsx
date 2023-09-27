import React, { useEffect, useState } from "react";
// RiDeleteBin6Line
import { AiOutlineDelete } from "react-icons/ai";

function BettingContent() {
  const [betts, setBetts] = useState([]);
  const [uniqueBetts, setUniqueBetts] = useState([]);

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
      }
    });
    setUniqueBetts(uniqueMatches);
  }, [betts]);

  const handleDeleteMatch = (matchIndex) => {
    const updatedBetts = [...betts];
    updatedBetts.splice(matchIndex, 1);

    localStorage.setItem("yourBet", JSON.stringify(updatedBetts));

    setBetts(updatedBetts);
  };

  return (
    <div className="mt-[90px] bg-purple-600 ml-3">
      {uniqueBetts.map((bet, index) => (
        <div key={index} className="flex text-white bg-purple-600 mb-2">
          <div className="w-[245px]">
            <p className="text-[13px]">
              {bet.home} - {bet.away}
            </p>
          </div>
          <p className="ml-2 text-[13px]">
            {bet.oddChoosed}: {bet.oddMatch.toFixed(2)}
          </p>
          <AiOutlineDelete
            className="ml-3 hover:cursor-pointer text-white text-[20px]"
            onClick={() => handleDeleteMatch(index)}
          />
        </div>
      ))}
    </div>
  );
}

export default BettingContent;
