import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"

const appStore = configureStore({
    reducer: {
        // Add your slices here as they are created

        user: userReducer,
    },
});

export default appStore;