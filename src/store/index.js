import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";
import applicationReducer from "./applicationsSlice";

export const store = configureStore({
    reducer: {
        games: gamesReducer,
        applications: applicationReducer,
    },
});
