import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action — загрузка игр с API
export const fetchApplications = createAsyncThunk("applications/fetchApplications", async (_, thunkAPI) => {
    try {
        const response = await axios.get("https://wtfgames-api-production.up.railway.app/api/applications");
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        items: [],
        status: "idle", // idle | loading | succeeded | failed
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
                state.items = action.payload;
            })
            .addCase(fetchApplications.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default applicationSlice.reducer;
