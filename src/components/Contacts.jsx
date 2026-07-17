// src/components/Contacts.jsx
import React from "react";
import "../styles/Contacts.css";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Contacts = () => {
    useDocumentTitle("Contact — WTFGames");

    return (
        <div id="contacts" className="container py-5">
            <h1>Contact Us</h1>
            <p className="lead">
                We’d love to hear from you! Please feel free to reach out with any questions, suggestions, or feedback.
            </p>

            <div className="mt-4">
                <h5>Email</h5>
                <p>
                    <a href="mailto:serhii.chechui@gmail.com">serhii.chechui@gmail.com</a>
                </p>

                <h5>Business Inquiries</h5>
                <p>
                    For partnerships, licensing, or other business matters, please contact us at the same email with the
                    subject line: <strong>"Business Inquiry"</strong>.
                </p>

                <h5>Social</h5>
                <ul>
                    <li>
                        <a href="https://x.com/wtfgames14?s=21" target="_blank" rel="noopener noreferrer">
                            Twitter
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.instagram.com/wtfgames_community/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                    </li>
                    <li>
                        <a href="https://discord.gg/xR3p2GZN" target="_blank" rel="noopener noreferrer">
                            Discord
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Contacts;
