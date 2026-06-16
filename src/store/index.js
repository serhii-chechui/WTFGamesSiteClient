import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";
import applicationReducer from "./applicatonsSlice";

export const store = configureStore({
    reducer: {
        games: gamesReducer,
        applications: applicationReducer,
    },
});
