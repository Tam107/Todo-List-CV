import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../../services/authService';

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const data = await login(email, password);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const registerUser = createAsyncThunk('auth/register', async ({ username, email, password }, { rejectWithValue }) => {
    try {
        const data = await register(username, email, password);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        accessToken: localStorage.getItem('access_token') || null, // Match backend naming
        refreshToken: localStorage.getItem('refresh_token') || null, // Match backend naming
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.access_token; // Match backend naming
                state.refreshToken = action.payload.refresh_token; // Match backend naming
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.accessToken = action.payload.access_token; // Match backend naming
                state.refreshToken = action.payload.refresh_token; // Match backend naming
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;