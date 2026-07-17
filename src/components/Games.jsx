import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../store/gamesSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Games.css";
import "../styles/GameCard.css";
import GameCard from "./GameCard";

const Games = () => {
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.games);

    useEffect(() => {
        // Only fetch if we haven't already
        if (status === "idle") {
            dispatch(fetchGames());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return (
            <div id="games">
                <div className="container">
                    <p className="white-text">Loading...</p>
                </div>
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div id="games">
                <div className="container">
                    <p className="white-text">Couldn't load our games right now. Please try again.</p>
                    <button type="button" className="play-button" onClick={() => dispatch(fetchGames())}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div id="games">
            <div className="container">
                <h1 className="white-text">Our Games</h1>
                {items.map((game) => (
                    <GameCard key={game._id} game={game} />
                ))}
            </div>
        </div>
    );
};

export default Games;
