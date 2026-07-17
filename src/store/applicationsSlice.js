import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/client";
import applicationsFallback from "../data/applications.json";

// Async action — загрузка приложений с API
export const fetchApplications = createAsyncThunk("applications/fetchApplications", async (_, thunkAPI) => {
    try {
        const response = await apiClient.get("/applications", { signal: thunkAPI.signal });
        return { items: response.data, source: "api" };
    } catch (err) {
        // The API has been unreliable (see wtfgames-site audit, Critical #1).
        // Fall back to a local snapshot of the applications collection so
        // the page still shows something useful instead of a bare error
        // message. If even this were to fail, thunkAPI.rejectWithValue
        // keeps the existing "failed" UI branch reachable as a last resort.
        console.warn("fetchApplications: API request failed, using local fallback data.", err);
        try {
            return { items: applicationsFallback, source: "fallback" };
        } catch (fallbackErr) {
            console.error("fetchApplications: local fallback data also failed to load.", fallbackErr);
            return thunkAPI.rejectWithValue({
                status: err.response?.status ?? null,
                message: err.message,
            });
        }
    }
});

const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        items: [],
        status: "idle", // idle | loading | succeeded | failed
        source: null, // "api" | "fallback" | null
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchApplications.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchApplications.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.items;
                state.source = action.payload.source;
            })
            .addCase(fetchApplications.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default applicationSlice.reducer;
