import React, { useEffect, useState } from "react";
import BettingContent from "./BettingContent";
import { createClient } from "@supabase/supabase-js";

function PlacedBet({ isOpen, toggleOpen }) {
  const [betts, setBetts] = useState([]);
  const [totalBet, setTotalBet] = useState(1);
  const [uniqueBetts, setUniqueBetts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  // Your Supabase initialization code goes here
  const supabase = createClient(
    "https://bzdaeaklmnwmwakandpb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6ZGFlYWtsbW53bXdha2FuZHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4NzgwNzcsImV4cCI6MjAxMDQ1NDA3N30.VyxPEA9hVf0kuFrlsoyilSltgvEMqI-oIx6XaTKL5Pw"
  );

  // Function to update data on Supabase
  async function updateUniqueMatches() {
    try {
      // Define the table name and the updated data (uniqueMatches)
      const tableName = "PlacedBet"; // Replace with your table name

      // Use the upsert method to insert or update data with a combination of fields as a unique identifier
      const { data, error } = await supabase
        .from(tableName)
        .upsert(uniqueBetts);

      if (error) {
        console.error("Error updating data:", error.message);
      } else {
        console.log("Data updated successfully:", data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

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
        !uniqueMatches.some(
          (uniqueMatch) =>
            uniqueMatch.home === match.home &&
            uniqueMatch.away === match.away &&
            uniqueMatch.date === match.date
        )
      ) {
        uniqueMatches.push(match);
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

    // Update uniqueMatches on Supabase when uniqueBetts changes
    updateUniqueMatches();
  }, [uniqueBetts]);

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setInputValue(value);
      const numberValue = parseInt(value, 10);
      if (numberValue >= 1 && numberValue <= 100) {
        setIsInvalid(false);
      } else {
        setIsInvalid(true);
      }
    } else {
      setIsInvalid(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isInvalid) {
      alert("Invalid input. Please enter a number between 1 and 100.");
      setInputValue("invalid");
    }
  };

  return (
    <div>
      {!isOpen ? (
        // When it's closed
        <div
          onClick={toggleOpen}
          className="z-20 fixed bottom-0 right-0 h-[80px] w-[340px] bg-purple-600 mr-5 rounded-t-xl flex items-center justify-center cursor-pointer"
        >
          <p className="text-white bg-purple-600 font-[500] text-[12px]">
            Matches: {uniqueBetts.length} Total Odd: {totalBet.toFixed(2)}
          </p>
        </div>
      ) : (
        // When it's open, render the div with content
        <div className="z-50">
          <div className="fixed bottom-0 right-0 h-[520px] w-[340px] bg-purple-600 mr-5 rounded-t-xl flex flex-col ">
            <div
              className="flex items-center justify-center absolute top-0 bottom-0 right-0 h-[80px] w-[340px] bg-purple-600 rounded-t-xl border-b border-gray-300 cursor-pointer"
              onClick={toggleOpen}
            >
              <p className="text-white bg-purple-600 font-[500] text-[12px]">
                Matches: {uniqueBetts.length} Total Odd: {totalBet.toFixed(2)}
              </p>
            </div>
            <BettingContent totalBet={totalBet} />{" "}
            {/* Input The Amount Of Credit That User Play */}
            <div className="flex justify-center">
              <form onSubmit={handleSubmit} className="fixed bottom-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="   Credits"
                  className={`w-[160px] rounded-xl ${
                    isInvalid ? "border-2 text-red-600 border-red-600" : ""
                  }`}
                />
                <button
                  className="ml-3 text-white text-[20px] font-[400] animate-bounce"
                  type="submit"
                >
                  {" "}
                  Place Bet!
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacedBet;
