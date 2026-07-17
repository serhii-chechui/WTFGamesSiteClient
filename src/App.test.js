import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import apiClient from "./api/client";
import gamesReducer, { fetchGames } from "./store/gamesSlice";
import applicationsReducer from "./store/applicationsSlice";

// Both Redux thunks (gamesSlice / applicationsSlice) go through the shared
// src/api/client.js axios instance. Mock that module (rather than "axios"
// itself) so tests are deterministic and never depend on the live
// wtfgames-api-production.up.railway.app service. Mocking our own client
// also sidesteps having to fake out axios.create()'s return value.
jest.mock("./api/client", () => ({
    __esModule: true,
    default: { get: jest.fn() },
}));

// A fresh store per test avoids state leaking between tests (the real app
// store is a long-lived singleton, but here every test needs its own idle
// `games`/`applications` slice to reach a predictable state).
const createTestStore = () =>
    configureStore({
        reducer: {
            games: gamesReducer,
            applications: applicationsReducer,
        },
    });

// App.js renders its own <Router>, so tests must not wrap it in another
// router. Instead, navigate by pushing to `window.history` before rendering.
const renderAtRoute = (route, { store } = {}) => {
    window.history.pushState({}, "Test page", route);

    if (!store) {
        return render(<App />);
    }

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

    test("renders the hero heading on the home page and sets the document title", () => {
        renderAtRoute("/");

        expect(screen.getByRole("heading", { level: 1, name: /watch the frame/i })).toBeInTheDocument();
        expect(document.title).toBe("WTFGames");
    });

    test("renders the footer with privacy, terms and contact links", () => {
        renderAtRoute("/");

        expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy");
        expect(screen.getByRole("link", { name: /terms of service/i })).toHaveAttribute("href", "/terms");
        expect(screen.getByRole("link", { name: /^contact$/i })).toHaveAttribute("href", "/contact");
    });
});

describe("Routing", () => {
    test("renders the About Us page at /about and sets the document title", () => {
        renderAtRoute("/about");

        expect(screen.getByRole("heading", { level: 1, name: /about us/i })).toBeInTheDocument();
        expect(document.title).toBe("About Us — WTFGames");
    });

    test("renders a 404 page for an unknown route and sets the document title", () => {
        renderAtRoute("/this-route-does-not-exist");

        expect(screen.getByRole("heading", { name: /404/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute("href", "/");
        expect(document.title).toBe("404 — WTFGames");
    });
});

describe("/games route (Redux + API integration, axios mocked)", () => {
    test("shows a loading state and then renders games returned by the API", async () => {
        apiClient.get.mockResolvedValueOnce({
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

        renderAtRoute("/games", { store: createTestStore() });

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
        expect(document.title).toBe("Games — WTFGames");

        expect(await screen.findByRole("heading", { name: /test game/i })).toBeInTheDocument();
        expect(apiClient.get).toHaveBeenCalledWith("/games", expect.objectContaining({ signal: expect.anything() }));

        expect(screen.getByAltText("Download on the App Store")).toHaveAttribute(
            "src",
            "/images/App_Store_Badge_US-UK_RGB_blk_092917.svg",
        );
    });

    test("falls back to the local games snapshot when the API request fails", async () => {
        apiClient.get.mockRejectedValueOnce(new Error("Request failed with status code 404"));

        renderAtRoute("/games", { store: createTestStore() });

        // gamesSlice catches the API error and resolves with the local
        // src/data/games.json snapshot instead of rejecting, so the page
        // should render the fallback games rather than an error message.
        expect(await screen.findByRole("heading", { name: /spaceglider/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /virushunt/i })).toBeInTheDocument();
        expect(screen.queryByText(/couldn't load/i)).not.toBeInTheDocument();
    });
});

describe("/games error UI and retry (status forced directly, since both the API and the local fallback would have to fail to reach it)", () => {
    test("shows a friendly message with a Retry button, and Retry re-fetches the games", async () => {
        const store = createTestStore();

        // Reaching "failed" for real requires both the API and the local
        // fallback import to fail, which isn't practically mockable here
        // (see gamesSlice.js). Dispatch the rejected action directly to
        // exercise the error UI/Retry button contract in isolation.
        store.dispatch({
            type: fetchGames.rejected.type,
            payload: { status: 500, message: "Internal Server Error" },
        });

        renderAtRoute("/games", { store });

        expect(screen.getByText(/couldn't load our games right now/i)).toBeInTheDocument();
        // Technical details must not leak into the UI.
        expect(screen.queryByText(/internal server error/i)).not.toBeInTheDocument();

        apiClient.get.mockResolvedValueOnce({
            data: [
                {
                    _id: "2",
                    Title: "Retried Game",
                    Description: "Loaded after clicking Retry.",
                    Thumbnail: "/images/test-thumb.png",
                },
            ],
        });

        fireEvent.click(screen.getByRole("button", { name: /retry/i }));

        expect(await screen.findByRole("heading", { name: /retried game/i })).toBeInTheDocument();
        expect(apiClient.get).toHaveBeenCalledWith("/games", expect.objectContaining({ signal: expect.anything() }));
    });
});
