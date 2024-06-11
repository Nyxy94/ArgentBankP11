import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfileData, changeUsername } from "./api";

// Thunk pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (token, { rejectWithValue, dispatch }) => {
        console.log("Token:", token); // Vérifiez que le token est défini et correct
        try {
            const data = await fetchUserProfileData(token);
            dispatch(infoUser(data));
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk pour changer le nom d'utilisateur
export const fetchChangeUsername = createAsyncThunk(
    "user/changeUsername",
    async ({ newUsername, token }, { rejectWithValue, dispatch }) => {
      try {
        const data = await changeUsername(newUsername, token);
        dispatch(fetchUserProfile(token)); // Mise à jour du profil utilisateur après le changement de nom
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userProfile: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        infoUser: (state, action) => {
            state.userProfile = action.payload;
        },
        infoUserName: (state, action) => {
            if (state.userProfile) {
                state.userProfile.userName = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userProfile = action.payload.body;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchChangeUsername.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchChangeUsername.fulfilled, (state, action) => {
                state.status = 'succeeded';
                
            })
            .addCase(fetchChangeUsername.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { infoUser, infoUserName } = userSlice.actions;

// Sélecteurs
export const selectUserProfile = (state) => state.user.userProfile;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
