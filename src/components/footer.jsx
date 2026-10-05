// components/Footer.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer id="footer" className="bg-dark text-light py-4 mt-auto">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div className="text-center text-md-start mb-2 mb-md-0">
                    <small>&copy; {new Date().getFullYear()} WTFGames. All rights reserved.</small>
                </div>
                <div className="d-flex flex-wrap justify-content-center justify-content-md-end column-gap-3 row-gap-1">
                    <NavLink to="/privacy" className="text-light text-decoration-none text-nowrap">
                        Privacy Policy
                    </NavLink>
                    <NavLink to="/terms" className="text-light text-decoration-none text-nowrap">
                        Terms of Service
                    </NavLink>
                    <NavLink to="/contact" className="text-light text-decoration-none text-nowrap">
                        Contact
                    </NavLink>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
