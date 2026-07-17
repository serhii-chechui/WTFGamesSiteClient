import React from "react";
import "../styles/ErrorBoundary.css";
import "../styles/GameCard.css";

// Catches render/lifecycle errors thrown by whatever page is currently
// mounted inside <main> (see App.js) so a bug in one page shows a fallback
// instead of taking down the whole app (Navigation/Footer, rendered as
// siblings outside this boundary, stay mounted and functional).
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Technical details go to the console/error tracking, not the UI.
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div id="error-boundary" className="container py-5 text-center">
                    <h1>Something went wrong</h1>
                    <p className="lead">Sorry, something broke on our end. Please try reloading the page.</p>
                    <button type="button" className="play-button" onClick={this.handleReload}>
                        Reload
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
