import React, { useEffect, useState } from "react";

const SoccerOdds = () => {
  const apiKey = "817759214431ddb95a3b30c43e5aedb6"; // Replace with your actual API key
  const baseUrl =
    "https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?apiKey=" +
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
        // Extract the first 10 matches and set them in the state
        const first10MatchesData = data.slice(0, 10).map((match) => {
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
    <div>
      <h1>Soccer Odds</h1>
      <ul>
        {first10Matches.map((match, index) => (
          <li key={index} className="mt-4">
            <p>Home Team: {match.homeTeam}</p>
            <p>European Odds for Home Team: {match.homeTeamOdds.toFixed(2)}</p>
            <p>Away Team: {match.awayTeam}</p>
            <p>European Odds for Away Team: {match.awayTeamOdds.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SoccerOdds;
