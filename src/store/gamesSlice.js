import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/client";
import gamesFallback from "../data/games.json";

// Async action — загрузка игр с API
export const fetchGames = createAsyncThunk("games/fetchGames", async (_, thunkAPI) => {
    try {
        const response = await apiClient.get("/games", { signal: thunkAPI.signal });
        // Tolerate both API response shapes during the backend migration
        // window: the new envelope { success, data } and the old bare
        // array. Anything else (including a malformed envelope with no
        // `data` array) is treated as an error and falls through to the
        // catch block below, where the local fallback data kicks in.
        const payload = response.data;
        const items = Array.isArray(payload) ? payload : payload?.data;
        if (!Array.isArray(items)) {
            throw new Error("Unexpected API response shape");
        }
        return { items, source: "api" };
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
            console.error("fetchGames: local fallback data also failed to load.", fallbackErr);
            return thunkAPI.rejectWithValue({
                status: err.response?.status ?? null,
                message: err.message,
            });
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
