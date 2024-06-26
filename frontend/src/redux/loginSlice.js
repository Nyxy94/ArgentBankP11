import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLogin } from "./api.js";

// Thunk pour la connexion de l'utilisateur
export const loginUserThunk = createAsyncThunk(
    "login/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await fetchLogin({ email, password });
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        userToken: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        loginUser: (state, action) => {
            state.userToken = action.payload.token;
        },
        logoutUser: (state) => {
            state.userToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userToken = action.payload.body.token;
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

// actions synchrones exportées qui sont appelées pour mettre à jour l'état de userToken
export const { loginUser, logoutUser } = loginSlice.actions;

// Sélecteurs
export const selectStatus = (state) => state.login.status;
export const selectError = (state) => state.login.error;

export default loginSlice.reducer;
