import React, { useEffect, useState } from "react";

const OddNFL = ({ title, competition }) => {
  const apiKey = "75ce17a9cf119a89e5409978b746219e"; // Replace with your actual API key
  const baseUrl =
    "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=" +
    apiKey +
    "&regions=uk&markets=h2h,spreads&oddsFormat=american";

  const [first10Matches, setFirst10Matches] = useState([]);

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
          const price = match.bookmakers[0].markets[0].outcomes[2];
          let drawOdds; // Declare it here
          // Inside the .then((data) => { ... }) block
          console.log(
            "API response data for",
            competition,
            "competition:",
            data
          );

          // Find the odds for the home and away teams based on their names
          const homeTeamOdds = findTeamOdds(match, match.home_team);
          const awayTeamOdds = findTeamOdds(match, match.away_team);

          // Convert American odds to European odds
          const homeTeamEuropeanOdds = convertAmericanToEuropean(homeTeamOdds);
          const awayTeamEuropeanOdds = convertAmericanToEuropean(awayTeamOdds);

          return {
            homeTeam: match.home_team,
            awayTeam: match.away_team,
            homeTeamOdds: homeTeamEuropeanOdds,
            awayTeamOdds: awayTeamEuropeanOdds,
          };
        });
        setFirst10Matches(first10MatchesData);
        console.log(first10Matches);
      })
      .catch((error) => {
        console.error("Error fetching soccer odds:", error);
      });
  }, []);

  // Function to find team odds by name
  const findTeamOdds = (match, teamName) => {
    const outcome = match.bookmakers[0].markets[0].outcomes.find(
      (outcome) => outcome.name === teamName
    );
    return outcome ? outcome.price : null;
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
              <p className="pl-2 pr-2 lg:text-[20px] text-[12px] md:text-[16px]">
                -
              </p>
              <p className="lg:text-[20px] text-[12px] md:text-[16px]">
                {match.awayTeam}:
              </p>
            </div>
            <div className=" ">
              <div className="flex w-[0px] mt-1">
                <p className="pl-[65px] md:pl-[90px] lg:text-[18px] text-[12px] md:text-[16px] cursor-pointer">
                  {match.homeTeamOdds.toFixed(2)}
                </p>
                <p className="pl-[65px] pr-[65px] lg:text-[18px] text-[12px] md:text-[16px] cursor-pointer">
                  {typeof match.drawOdds !== "undefined"
                    ? match.drawOdds.toFixed(2)
                    : "-"}
                </p>

                <p className="lg:text-[18px] text-[12px] md:text-[16px] cursor-pointer">
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

export default OddNFL;
