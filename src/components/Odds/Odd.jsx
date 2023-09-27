import React, { useEffect, useState } from "react";

const Odd = ({ title, competition }) => {
  const apiKey = "82d68d59aa3c60d604773dfc00eb28d7"; // Replace with your actual API key
  const baseUrl = `https://api.the-odds-api.com/v4/sports/${competition}/odds/?apiKey=${apiKey}&regions=uk&markets=h2h,spreads&oddsFormat=american`;

  const [first10Matches, setFirst10Matches] = useState([]);
  const [yourBet, setYourBet] = useState(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("yourBet");
      return storedData ? JSON.parse(storedData) : [];
    } else {
      return [];
    }
  });

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const first10MatchesData = data.slice(0, 10).map((match) => {
          let drawOdds; // Declare it here

          // Find the odds for the home and away teams based on their names
          const homeTeamOdds = findTeamOdds(match, match.home_team);
          const awayTeamOdds = findTeamOdds(match, match.away_team);

          // Check if the draw outcome exists
          if (match.bookmakers[0].markets[0].outcomes.length >= 3) {
            drawOdds = match.bookmakers[0].markets[0].outcomes[2].price;
          }

          // Convert American odds to European odds
          const homeTeamEuropeanOdds = convertAmericanToEuropean(homeTeamOdds);
          const awayTeamEuropeanOdds = convertAmericanToEuropean(awayTeamOdds);
          const drawEuropeanOdds = convertAmericanToEuropean(drawOdds);

          return {
            homeTeam: match.home_team,
            awayTeam: match.away_team,
            homeTeamOdds: homeTeamEuropeanOdds,
            awayTeamOdds: awayTeamEuropeanOdds,
            drawOdds: drawEuropeanOdds,
          };
        });
        setFirst10Matches(first10MatchesData);
        console.log(first10Matches);
      })
      .catch((error) => {
        console.error("Error fetching odds:", error);
      });
  }, [baseUrl]);

  const updateYourBet = (newBet) => {
    const updatedBetArray = [...yourBet, newBet];
    setYourBet(updatedBetArray);
    localStorage.setItem("yourBet", JSON.stringify(updatedBetArray));
  };

  // Function to find team odds by name
  const findTeamOdds = (match, teamName) => {
    const outcome = match.bookmakers[0].markets[0].outcomes.find(
      (outcome) => outcome.name === teamName
    );
    return outcome ? outcome.price : null;
  };

  const handleClick = (event, match, teamOdds) => {
    // Determine if the clicked odds belong to '1', 'X', or '2'
    let oddChoosed =
      match.homeTeamOdds === teamOdds
        ? "1"
        : match.drawOdds === teamOdds
        ? "X"
        : "2";

    // Create the updated 'yourBet' object
    const newYourBet = {
      home: match.homeTeam,
      away: match.awayTeam,
      oddMatch: teamOdds,
      oddChoosed: oddChoosed,
    };

    // Update the 'yourBet' object in state and localStorage
    updateYourBet(newYourBet);
  };

  // Function to convert American odds to European odds
  const convertAmericanToEuropean = (americanOdds) => {
    return americanOdds
      ? americanOdds >= 0
        ? americanOdds / 100 + 1
        : -100 / americanOdds + 1
      : null;
  };

  return (
    <div className="text-white w-[400px] lg:w-[840px] mb-10 rounded-br-xl rounded-bl-xl ml-7 md:ml-[70px]">
      <h1 className="ml-10 text-[38px] font-[600] mt-2">{title} Odds</h1>
      <div className="flex space-x-[80px] sm:ml-[367px] md:ml-[505px] lg:ml-[655px] ">
        <p className="text-[20px] ">1</p>
        <p className="text-[20px] ">X</p>
        <p className="text-[20px] ">2</p>
      </div>
      <div>
        {first10Matches.map((match, index) => (
          <div key={index} className="mt-6 flex w-full rounded-xl">
            <div className="flex w-[300px] md:w-[550px] h-[30px] lg:h-[42px] border border-purple-800 rounded-xl pt-1 hover:scale-105 transition-transform">
              <p className="ml-3 lg:text-[20px] text-[12px] md:text-[16px]">
                {match.homeTeam}
              </p>
              <p className="pl-2 pr-2 lg:text-[20px] text-[12px] md:text-[16px] ">
                -
              </p>
              <p className="lg:text-[20px] text-[12px] md:text-[16px]">
                {match.awayTeam}:
              </p>
            </div>
            <div className=" ">
              <div className="flex w-[0px] mt-1">
                <p
                  className="pl-[65px] md:pl-[90px] lg:text-[18px] text-[12px] md:text-[16px] cursor-pointer"
                  onClick={(event) =>
                    handleClick(event, match, match.homeTeamOdds)
                  }
                >
                  {match.homeTeamOdds.toFixed(2)}
                </p>
                <p
                  className="pl-[65px] pr-[65px] lg:text-[18px] text-[12px] md:text-[16px] cursor-pointer"
                  onClick={(event) =>
                    match.drawOdds
                      ? handleClick(event, match, match.drawOdds)
                      : null
                  }
                >
                  {match.drawOdds !== null ? match.drawOdds.toFixed(2) : "-"}
                </p>
                <p
                  className="lg:text-[18px] text-[12px] md:text-[16px] cursor-pointer"
                  onClick={(event) =>
                    handleClick(event, match, match.awayTeamOdds)
                  }
                >
                  {match.awayTeamOdds.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Odd;
