import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action — загрузка игр с API
export const fetchGames = createAsyncThunk("games/fetchGames", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://wtfgames-api-production.up.railway.app/api/games");
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

const gamesSlice = createSlice({
    name: "games",
    initialState: {
        items: [],
        status: "idle", // idle | loading | succeeded | failed
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
                state.items = action.payload;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default gamesSlice.reducer;
