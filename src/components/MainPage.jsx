import React from "react";
import "../styles/MainImage.css";
import useDocumentTitle from "../hooks/useDocumentTitle";

const MainPage = () => {
    useDocumentTitle("WTFGames");

    return (
        <div id="main-page">
            <div className="main-image__text">
                <h1>watch the frame</h1>
                <h2>Reality is changing</h2>
            </div>
        </div>
    );
};

export default MainPage;
