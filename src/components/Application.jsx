import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications } from "../store/applicatonsSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Games.css";
import ApplicationCard from "./ApplicationCard";

const Applications = () => {
    // ← было Games
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.applications);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchApplications());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return (
            <div id="games">
                <div className="container">
                    <p className="white-text">Загрузка...</p>
                </div>
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div id="games">
                <div className="container">
                    <p className="white-text">Ошибка: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div id="games">
            <div className="container">
                <h1 className="white-text">Our Applications</h1>
                {items.map((application) => (
                    <ApplicationCard key={application._id} application={application} /> // ← было GameCard + game
                ))}
            </div>
        </div>
    );
};

export default Applications;
