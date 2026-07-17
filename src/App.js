import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/navigation";
import Games from "./components/Games";
import Application from "./components/Application";
import MainPage from "./components/MainPage";
import Footer from "./components/footer";
import PrivacyPolicy from "./components/privacyPolicy";
import TermOFService from "./components/termsOfService";
import Contacts from "./components/Contacts";
import AboutUs from "./components/AboutUs";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
    return (
        <Router>
            <React.Fragment>
                <Navigation />
                <main>
                    <ErrorBoundary>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/games" element={<Games />} />
                            <Route path="/applications" element={<Application />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/terms" element={<TermOFService />} />
                            <Route path="/contact" element={<Contacts />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </ErrorBoundary>
                </main>
                <Footer />
            </React.Fragment>
        </Router>
    );
}

export default App;
