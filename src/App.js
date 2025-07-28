import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/navigation";
import Games from "./components/Games";
import MainPage from "./components/MainPage";
import Footer from "./components/footer";
import PrivacyPolicy from "./components/privacyPolicy";
import TermOFService from "./components/termsOfService";
import Contacts from "./components/Contacts";

function App() {
    return (
        <Router>
            <React.Fragment>
                <Navigation />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermOFService />} />
                    <Route path="/contact" element={<Contacts />} />
                </Routes>
                <Footer />
            </React.Fragment>
        </Router>
    );
}

export default App;
