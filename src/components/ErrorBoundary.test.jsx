import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

// A component that always throws during render, to exercise the boundary.
const Bomb = () => {
    throw new Error("Boom");
};

describe("ErrorBoundary", () => {
    let consoleErrorSpy;

    beforeEach(() => {
        // React logs caught render errors to console.error (in addition to
        // componentDidCatch). This is expected in these tests, so silence
        // it to keep the test run's output clean.
        consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test("renders its children when nothing throws", () => {
        render(
            <ErrorBoundary>
                <p>All good</p>
            </ErrorBoundary>,
        );

        expect(screen.getByText("All good")).toBeInTheDocument();
    });

    test("renders a fallback UI instead of a blank page when a child throws", () => {
        render(
            <ErrorBoundary>
                <Bomb />
            </ErrorBoundary>,
        );

        expect(screen.getByRole("heading", { name: /something went wrong/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /reload/i })).toBeInTheDocument();
        // The technical error must have been logged, not left silent.
        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    test("the Reload button reloads the page", () => {
        const reloadMock = jest.fn();
        const originalLocation = window.location;
        Object.defineProperty(window, "location", {
            configurable: true,
            value: { ...originalLocation, reload: reloadMock },
        });

        render(
            <ErrorBoundary>
                <Bomb />
            </ErrorBoundary>,
        );

        fireEvent.click(screen.getByRole("button", { name: /reload/i }));

        expect(reloadMock).toHaveBeenCalledTimes(1);

        Object.defineProperty(window, "location", {
            configurable: true,
            value: originalLocation,
        });
    });
});
