import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ backgroundColor: "#1E2033" }}>
            <div className="container">
                {/* Logo */}
                <a className="navbar-brand" href="/">
                    <img
                        src="/wtfgames_logo.svg" // Replace with your logo image
                        alt="WTFGames"
                        className="d-inline-block align-top"
                        style={{ width: "288px", height: "40px" }}
                    />
                </a>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Menu and Social Icons */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    {/* Push menu and socials to the right */}
                    <div className="d-flex ms-auto align-items-center">
                        {/* Main Menu */}
                        <ul className="navbar-nav me-3 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/about">
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/games">
                                    Games
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/applications">
                                    Applications
                                </a>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="/careers">
                                    Careers
                                </a>
                            </li> */}
                        </ul>

                        {/* Social Media Icons */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="https://www.linkedin.com/groups/8502086/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
