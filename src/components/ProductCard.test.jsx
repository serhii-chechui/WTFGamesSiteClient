import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
    test("renders a game-shaped product", () => {
        render(
            <ProductCard
                product={{
                    _id: "1",
                    Title: "SpaceGlider",
                    Description: "An interstellar runner game.",
                    Thumbnail: "/images/spaceglider-thumb.png",
                    AppStoreUrl: "https://apps.apple.com/app/space-glider",
                    GooglePlayUrl: "https://play.google.com/store/apps/details?id=com.wtfgames.spaceglider",
                }}
            />,
        );

        expect(screen.getByRole("heading", { name: "SpaceGlider" })).toBeInTheDocument();
        expect(screen.getByText("An interstellar runner game.")).toBeInTheDocument();
        expect(screen.getByAltText("SpaceGlider")).toHaveAttribute("src", "/images/spaceglider-thumb.png");
        expect(screen.getByAltText("Download on the App Store")).toBeInTheDocument();
        expect(screen.getByAltText("Get it on Google Play")).toBeInTheDocument();
        expect(screen.queryByAltText("Available on Steam")).not.toBeInTheDocument();
        expect(screen.queryByAltText("Available on itch.io")).not.toBeInTheDocument();
    });

    test("renders an application-shaped product using the same component", () => {
        render(
            <ProductCard
                product={{
                    _id: "2",
                    Title: "LumaScope",
                    Description: "A modern IES viewer.",
                    Thumbnail: "/images/lumascope-thumb.png",
                    AppStoreUrl: "https://apps.apple.com/app/lumascope",
                }}
            />,
        );

        expect(screen.getByRole("heading", { name: "LumaScope" })).toBeInTheDocument();
        expect(screen.getByText("A modern IES viewer.")).toBeInTheDocument();
        expect(screen.getByAltText("Download on the App Store")).toHaveAttribute(
            "src",
            "/images/App_Store_Badge_US-UK_RGB_blk_092917.svg",
        );
    });
});
