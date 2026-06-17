// src/pages/PrivacyPolicy.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/PirvacyPolicy.css";

const PrivacyPolicy = () => {
    return (
        <div id="privacy-policy" className="container py-5">
            <h1>Privacy Policy</h1>
            <p>
                <strong>Serhii Chechui (WTFGames)</strong>
                <br />
                <em>Last updated: May 07, 2025</em>
            </p>

            <p>
                Serhii Chechui (“DEVELOPER”) has adopted this Privacy Policy (“Policy”) to explain how DEVELOPER
                collects, stores, uses, and discloses information related to its products, services, and websites
                (“Services”).
            </p>

            <p>
                If you have any questions about this Policy, please contact us at:{" "}
                <a href="mailto:serhii.chechui@gmail.com">
                    <strong>serhii.chechui@gmail.com</strong>
                </a>
            </p>

            <p>
                We may modify this Privacy Policy from time to time. Your continued use of the Services indicates your
                acceptance of any updated terms.
            </p>

            <h2>1. Non-Personal Data</h2>
            <p>
                Non-personal data refers to information that does not directly identify you. This includes aggregated
                and de-identified information, device data, IP address (anonymized), and gameplay metrics.
            </p>
            <p>
                We use GameAnalytics to collect such data. More at{" "}
                <NavLink to="/privacy" target="_blank" rel="noopener noreferrer">
                    GameAnalytics Privacy Policy
                </NavLink>
                .
            </p>

            <h2>2. Personal Data</h2>
            <p>
                We may collect personally identifiable information (e.g., email address, username) only when you
                voluntarily submit it.
            </p>

            <h2>3. Ad Serving and Behavioral Tracking</h2>
            <p>
                We may use ad networks that collect anonymous data to serve relevant ads. You can opt out in device
                settings.
            </p>

            <h2>4. Location Data</h2>
            <p>Only general location (country, region) is used. No GPS-level data is collected.</p>

            <h2>5. Data Retention</h2>
            <p>Data is stored as long as needed, then deleted or anonymized, unless legally required otherwise.</p>

            <h2>6. Cookies and Tracking</h2>
            <p>Cookies or local storage may be used. You can disable them in browser settings.</p>

            <h2>7. Third-Party Disclosures</h2>
            <p>We may share data only in limited cases, like legal obligations or business transitions.</p>

            <h2>8. Data Security</h2>
            <p>We follow industry standards, but no method is 100% secure.</p>

            <h2>9. Children’s Privacy</h2>
            <p>If under 13, guardian consent is required. We do not knowingly collect data from children under 13.</p>

            <p>© 2023–2026 WTFGames. All Rights Reserved.</p>
        </div>
    );
};

export default PrivacyPolicy;
