import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
    return (
        <div id="about" className="container py-5">
            <h1>About Us</h1>
            <p className="lead">
                WTFGames is an indie game studio passionate about creating unique gaming experiences
                for players around the world.
            </p>

            <div className="mt-4">
                <h5>Who We Are</h5>
                <p>
                    We are a small but dedicated team of developers, artists, and designers
                    united by a love of games and a desire to push creative boundaries.
                </p>

                <h5>What We Make</h5>
                <p>
                    From mobile games to desktop applications, we build products that
                    entertain, challenge, and inspire.
                </p>

                <h5>Our Mission</h5>
                <p>
                    To craft experiences that make players say "WTF" — in the best possible way.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
