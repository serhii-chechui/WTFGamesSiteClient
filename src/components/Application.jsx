import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications } from "../store/applicationsSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Games.css";
import "../styles/GameCard.css";
import ProductCard from "./ProductCard";

const Applications = () => {
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.applications);

    useEffect(() => {
        // Only fetch if we haven't already
        if (status === "idle") {
            dispatch(fetchApplications());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return (
            <div id="games">
                <div className="container">
                    <p className="white-text">Loading...</p>
                </div>
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div id="games">
                <div className="container">
                    <p className="white-text">Couldn't load our applications right now. Please try again.</p>
                    <button type="button" className="play-button" onClick={() => dispatch(fetchApplications())}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div id="games">
            <div className="container">
                <h1 className="white-text">Our Applications</h1>
                {items.map((application) => (
                    <ProductCard key={application._id} product={application} />
                ))}
            </div>
        </div>
    );
};

export default Applications;
