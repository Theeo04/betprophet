import Content from "@/components/Content";
import Nav from "@/components/Nav";
import SoccerOdds from "@/components/Odds/Odd";
import PlacedBet from "@/components/PlacedBet";
import React from "react";

function index() {
  return (
    <div>
      <Nav />
      <Content />
      <PlacedBet />
      {/* <AskAi /> */}
    </div>
  );
}

export default index;
