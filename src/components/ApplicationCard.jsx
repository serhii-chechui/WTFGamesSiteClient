import React from "react";
import "../styles/GameCard.css";

const ApplicationCard = ({ application }) => {
    return (
        <div className="game-card">
            <div className="game-icon">
                <img src={application.Thumbnail} alt={application.Title} />
            </div>
            <div className="game-content">
                <h2 className="game-title">{application.Title}</h2>
                <p className="game-description">{application.Description}</p>
                <div className="game-actions">
                    <div className="store-buttons">
                        {application.AppStoreUrl && (
                            <a href={application.AppStoreUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src="../images/App_Store_Badge_US-UK_RGB_blk_092917.svg"
                                    alt="Download on the App Store"
                                />
                            </a>
                        )}
                        {application.GooglePlayUrl && (
                            <a href={application.GooglePlayUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src="../images/GetItOnGooglePlay_Badge_Web_color_English.svg"
                                    alt="Get it on Google Play"
                                />
                            </a>
                        )}
                        {application.SteamUrl && (
                            <a href={application.SteamUrl} target="_blank" rel="noopener noreferrer">
                                <img src="../images/steam-badge.png" alt="Available on Steam" />
                            </a>
                        )}
                        {application.ItchIOUrl && (
                            <a href={application.ItchIOUrl} target="_blank" rel="noopener noreferrer">
                                <img src="../images/itchio-badge.png" alt="Available on itch.io" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationCard;
