import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";
import useDocumentTitle from "../hooks/useDocumentTitle";

const NotFound = () => {
    useDocumentTitle("404 — WTFGames");

    return (
        <div id="not-found" className="container py-5">
            <h1>404 — Page Not Found</h1>
            <p className="lead">Sorry, the page you're looking for doesn't exist.</p>
            <p>
                <Link to="/">Back to Home</Link>
            </p>
        </div>
    );
};

export default NotFound;
