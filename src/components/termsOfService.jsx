// src/pages/TermsOfService.jsx
import React from "react";
import "../styles/TermsOfService.css";
import { NavLink } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

const TermsOfService = () => {
    useDocumentTitle("Terms of Service — WTFGames");

    return (
        <div id="terms-of-service" className="container py-5">
            <h1>Terms of Service</h1>
            <p>
                <strong>Serhii Chechui (WTFGames)</strong>
                <br />
                <em>Effective Date: May 07, 2025</em>
            </p>

            <p>
                Welcome to WTFGames! By accessing or using any of our games, websites, or services (“Services”), you
                agree to be bound by these Terms of Service (“Terms”). Please read them carefully.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
                By using our Services, you confirm that you are at least 13 years old, or have permission from a parent
                or legal guardian if under the age of 13 (per COPPA). Users in the EU must be at least 16 years old or
                have consent from a parent or legal guardian under the GDPR.
            </p>

            <h2>2. Privacy</h2>
            <p>
                Your privacy is important to us. Please refer to our <NavLink to="/privacy">Privacy Policy</NavLink> for
                details on how we collect and use your personal data in compliance with the GDPR and COPPA.
            </p>

            <h2>3. User Accounts</h2>
            <p>
                If you create an account with us, you are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your account.
            </p>

            <h2>4. Acceptable Use</h2>
            <p>
                You agree not to misuse the Services. Prohibited behavior includes, but is not limited to: cheating,
                hacking, spreading malware, harassment, or violating any local laws.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
                All content, trademarks, and intellectual property in our Services belong to WTFGames or its licensors.
                You may not reproduce, distribute, or modify any part of the Services without written permission.
            </p>

            <h2>6. Termination</h2>
            <p>
                We may suspend or terminate your access to the Services at any time for violation of these Terms or
                other harmful behavior. You may also discontinue use of the Services at any time.
            </p>

            <h2>7. Disclaimer of Warranties</h2>
            <p>
                The Services are provided “as is.” We make no warranties, express or implied, about the Services,
                including but not limited to functionality or availability.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
                To the maximum extent permitted by law, WTFGames is not liable for any indirect, incidental, or
                consequential damages arising from the use or inability to use the Services.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
                We may update these Terms from time to time. Continued use of the Services after such updates
                constitutes acceptance of the revised Terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>These Terms are governed by the laws of Ukraine, without regard to conflict of laws principles.</p>

            <h2>11. Contact</h2>
            <p>
                If you have questions or concerns, contact us at{" "}
                <a href="mailto:serhii.chechui@gmail.com">
                    <strong>serhii.chechui@gmail.com</strong>
                </a>
                .
            </p>

            <p>© 2023–2026 WTFGames. All Rights Reserved.</p>
        </div>
    );
};

export default TermsOfService;
