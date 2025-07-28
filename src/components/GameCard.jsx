import React from "react";
import "../styles/GameCard.css";

const GameCard = () => {
    return (
        <div className="game-card">
            <div className="game-icon">
                <img src="../images/virushunt_app_icon.png" alt="VirusHunt" />
            </div>
            <div className="game-content">
                <h2 className="game-title">VirusHunt</h2>
                <p className="game-description">
                    Catch them all! Tap the falling cute viruses in this fun, fast-paced arcade game made especially for
                    kids. Easy to play, hard to put down!
                </p>
                <div className="game-actions">
                    {/* <button className="play-button">Play now</button> */}
                    <div className="store-buttons">
                        <a
                            href="https://apps.apple.com/ua/app/virus-hunt/id1456015343"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="../images/App_Store_Badge_US-UK_RGB_blk_092917.svg"
                                alt="Download on the App Store"
                            />
                        </a>
                        {/* <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                            <img src="/images/google-play-badge.png" alt="Get it on Google Play" />
                        </a> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
