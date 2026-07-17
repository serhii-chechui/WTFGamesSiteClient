import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import gamesFallback from "../data/games.json";

// Async action — загрузка игр с API
export const fetchGames = createAsyncThunk("games/fetchGames", async (_, thunkAPI) => {
    try {
        const response = await axios.get("https://wtfgames-api-production.up.railway.app/api/games");
        return { items: response.data, source: "api" };
    } catch (err) {
        // The API has been unreliable (see wtfgames-site audit, Critical #1).
        // Fall back to a local snapshot of the games collection so the page
        // still shows something useful instead of a bare error message.
        // If even this were to fail, thunkAPI.rejectWithValue keeps the
        // existing "failed" UI branch reachable as a last resort.
        console.warn("fetchGames: API request failed, using local fallback data.", err);
        try {
            return { items: gamesFallback, source: "fallback" };
        } catch (fallbackErr) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
});

const gamesSlice = createSlice({
    name: "games",
    initialState: {
        items: [],
        status: "idle", // idle | loading | succeeded | failed
        source: null, // "api" | "fallback" | null
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.items;
                state.source = action.payload.source;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default gamesSlice.reducer;
