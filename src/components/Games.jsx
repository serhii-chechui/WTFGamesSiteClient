import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../store/gamesSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Games.css";
import GameCard from "./GameCard";

const Games = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.games);

    useEffect(() => {
        // Загружаем только если ещё не грузили
        if (status === "idle") {
            dispatch(fetchGames());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return (
            <div id="games">
                <div className="container">
                    <p className="white-text">Загрузка...</p>
                </div>
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div id="games">
                <div className="container">
                    <p className="white-text">Ошибка: {error}</p>
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
