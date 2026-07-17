import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import App from "./App";
import gamesReducer from "./store/gamesSlice";
import applicationsReducer from "./store/applicationsSlice";

// Network calls go through axios inside the Redux thunks (gamesSlice /
// applicationsSlice). Mock the module so tests are deterministic and never
// depend on the live wtfgames-api-production.up.railway.app service.
jest.mock("axios");

// App.js renders its own <Router>, so tests must not wrap it in another
// router. Instead, navigate by pushing to `window.history` before rendering.
const renderAtRoute = (route, { withStore = false } = {}) => {
    window.history.pushState({}, "Test page", route);

    if (!withStore) {
        return render(<App />);
    }

    // A fresh store per test avoids state leaking between tests (the real
    // app store is a long-lived singleton, but here every test needs its
    // own idle `games`/`applications` slice to reach a predictable state).
    const store = configureStore({
        reducer: {
            games: gamesReducer,
            applications: applicationsReducer,
        },
    });

    return render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
};

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Navigation and layout", () => {
    test("renders the WTFGames logo and main menu links", () => {
        renderAtRoute("/");

        expect(screen.getByAltText("WTFGames")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "/about");
        expect(screen.getByRole("link", { name: "Games" })).toHaveAttribute("href", "/games");
        expect(screen.getByRole("link", { name: "Applications" })).toHaveAttribute("href", "/applications");
    });

    test("renders the hero heading on the home page", () => {
        renderAtRoute("/");

        expect(screen.getByRole("heading", { level: 1, name: /watch the frame/i })).toBeInTheDocument();
    });

    test("renders the footer with privacy, terms and contact links", () => {
        renderAtRoute("/");

        expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy");
        expect(screen.getByRole("link", { name: /terms of service/i })).toHaveAttribute("href", "/terms");
        expect(screen.getByRole("link", { name: /^contact$/i })).toHaveAttribute("href", "/contact");
    });
});

describe("Routing", () => {
    test("renders the About Us page at /about", () => {
        renderAtRoute("/about");

        expect(screen.getByRole("heading", { level: 1, name: /about us/i })).toBeInTheDocument();
    });

    test("renders a 404 page for an unknown route", () => {
        renderAtRoute("/this-route-does-not-exist");

        expect(screen.getByRole("heading", { name: /404/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute("href", "/");
    });
});

describe("/games route (Redux + API integration, axios mocked)", () => {
    test("shows a loading state and then renders games returned by the API", async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                {
                    _id: "1",
                    Title: "Test Game",
                    Description: "A game used in tests.",
                    Thumbnail: "/images/test-thumb.png",
                    AppStoreUrl: "https://apps.apple.com/app/test-game",
                },
            ],
        });

        renderAtRoute("/games", { withStore: true });

        expect(screen.getByText(/загрузка/i)).toBeInTheDocument();

        expect(await screen.findByRole("heading", { name: /test game/i })).toBeInTheDocument();
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("/api/games"));

        expect(screen.getByAltText("Download on the App Store")).toHaveAttribute(
            "src",
            "/images/App_Store_Badge_US-UK_RGB_blk_092917.svg",
        );
    });

    test("falls back to the local games snapshot when the API request fails", async () => {
        axios.get.mockRejectedValueOnce(new Error("Request failed with status code 404"));

        renderAtRoute("/games", { withStore: true });

        // gamesSlice catches the API error and resolves with the local
        // src/data/games.json snapshot instead of rejecting, so the page
        // should render the fallback games rather than an error message.
        expect(await screen.findByRole("heading", { name: /spaceglider/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /virushunt/i })).toBeInTheDocument();
        expect(screen.queryByText(/ошибка/i)).not.toBeInTheDocument();
    });
});
