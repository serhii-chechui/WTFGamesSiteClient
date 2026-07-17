import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../store/gamesSlice";
import "../styles/Games.css";
import "../styles/GameCard.css";
import ProductCard from "./ProductCard";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Games = () => {
    useDocumentTitle("Games — WTFGames");

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
                    <ProductCard key={game._id} product={game} />
                ))}
            </div>
        </div>
    );
};

export default Games;
