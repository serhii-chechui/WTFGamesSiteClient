import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Navigation from "./navigation";

const renderNav = () =>
    render(
        <MemoryRouter initialEntries={["/"]}>
            <Navigation />
            <Routes>
                <Route path="*" element={<div>page</div>} />
            </Routes>
        </MemoryRouter>,
    );

describe("Navigation mobile toggle", () => {
    const getMenu = () => document.getElementById("navbarContent");

    test("starts collapsed", () => {
        renderNav();
        expect(screen.getByRole("button", { name: /toggle navigation/i })).toHaveAttribute("aria-expanded", "false");
        expect(getMenu()).not.toHaveClass("show");
    });

    test("toggler opens and closes the menu", async () => {
        const user = userEvent.setup();
        renderNav();
        const toggler = screen.getByRole("button", { name: /toggle navigation/i });

        await user.click(toggler);
        expect(toggler).toHaveAttribute("aria-expanded", "true");
        expect(toggler).toHaveAttribute("aria-controls", "navbarContent");
        expect(getMenu()).toHaveClass("collapse", "navbar-collapse", "show");

        await user.click(toggler);
        expect(toggler).toHaveAttribute("aria-expanded", "false");
        expect(getMenu()).not.toHaveClass("show");
    });

    test("clicking a nav link closes the menu", async () => {
        const user = userEvent.setup();
        renderNav();
        const toggler = screen.getByRole("button", { name: /toggle navigation/i });

        await user.click(toggler);
        await user.click(screen.getByRole("link", { name: "Games" }));
        expect(toggler).toHaveAttribute("aria-expanded", "false");
        expect(getMenu()).not.toHaveClass("show");
    });
});

describe("Navigation social links", () => {
    test("icon-only links have accessible names", () => {
        renderNav();
        expect(screen.getByRole("link", { name: "WTFGames on Instagram" })).toHaveAttribute("href", expect.stringContaining("instagram.com"));
        expect(screen.getByRole("link", { name: "WTFGames on LinkedIn" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "WTFGames on X" })).toBeInTheDocument();
    });
});
