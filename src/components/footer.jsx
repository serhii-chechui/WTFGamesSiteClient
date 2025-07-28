// components/Footer.jsx
import React from "react";

const Footer = () => {
    return (
        <footer id="footer" className="bg-dark text-light py-4 mt-auto">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div className="text-center text-md-start mb-2 mb-md-0">
                    <small>&copy; {new Date().getFullYear()} WTFGames. All rights reserved.</small>
                </div>
                <div className="d-flex gap-3">
                    <a href="/privacy" className="text-light text-decoration-none">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="text-light text-decoration-none">
                        Terms of Service
                    </a>
                    <a href="/contact" className="text-light text-decoration-none">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
