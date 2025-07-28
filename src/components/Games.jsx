import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Games.css";
import GameCard from "./GameCard";

const Games = () => {
    return (
        <div id="games">
            <div className="container">
                <h1 className="white-text">Our Games</h1>
                <GameCard />
            </div>
        </div>
    );
};

export default Games;
