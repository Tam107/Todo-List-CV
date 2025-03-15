import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});

/*Questions for Reflection:

    Why do you think createAsyncThunk is useful for handling asynchronous actions like loginUser?
    How might you expand authSlice to include user details (e.g., username, email) after a successful login?*/