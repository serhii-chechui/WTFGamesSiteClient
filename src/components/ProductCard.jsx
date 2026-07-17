import React from "react";
import "../styles/GameCard.css";

// Shared card for both games and applications - the two collections have an
// identical shape (Title, Description, Thumbnail, store URLs), so a single
// `product` prop works for either without duplicating markup.
const ProductCard = ({ product }) => {
    return (
        <div className="game-card">
            <div className="game-icon">
                <img src={product.Thumbnail} alt={product.Title} loading="lazy" decoding="async" />
            </div>
            <div className="game-content">
                <h2 className="game-title">{product.Title}</h2>
                <p className="game-description">{product.Description}</p>
                <div className="game-actions">
                    <div className="store-buttons">
                        {product.AppStoreUrl && (
                            <a href={product.AppStoreUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/images/App_Store_Badge_US-UK_RGB_blk_092917.svg"
                                    alt="Download on the App Store"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </a>
                        )}
                        {product.GooglePlayUrl && (
                            <a href={product.GooglePlayUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/images/GetItOnGooglePlay_Badge_Web_color_English.svg"
                                    alt="Get it on Google Play"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </a>
                        )}
                        {product.SteamUrl && (
                            <a href={product.SteamUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/images/steam-badge.png"
                                    alt="Available on Steam"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </a>
                        )}
                        {product.ItchIOUrl && (
                            <a href={product.ItchIOUrl} target="_blank" rel="noopener noreferrer">
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

export default ProductCard;
