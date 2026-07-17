import React from "react";
import "../styles/GameCard.css";

const GameCard = ({ game }) => {
    return (
        <div className="game-card">
            <div className="game-icon">
                <img src={game.Thumbnail} alt={game.Title} loading="lazy" decoding="async" />
            </div>
            <div className="game-content">
                <h2 className="game-title">{game.Title}</h2>
                <p className="game-description">{game.Description}</p>
                <div className="game-actions">
                    <div className="store-buttons">
                        {game.AppStoreUrl && (
                            <a href={game.AppStoreUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/images/App_Store_Badge_US-UK_RGB_blk_092917.svg"
                                    alt="Download on the App Store"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </a>
                        )}
                        {game.GooglePlayUrl && (
                            <a href={game.GooglePlayUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/images/GetItOnGooglePlay_Badge_Web_color_English.svg"
                                    alt="Get it on Google Play"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </a>
                        )}
                        {game.SteamUrl && (
                            <a href={game.SteamUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/images/steam-badge.png"
                                    alt="Available on Steam"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </a>
                        )}
                        {game.ItchIOUrl && (
                            <a href={game.ItchIOUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/images/itchio-badge.png"
                                    alt="Available on itch.io"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
