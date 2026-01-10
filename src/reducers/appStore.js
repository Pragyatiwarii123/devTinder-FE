import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionsSlice";

const appStore = configureStore({
    reducer: {
        // Add your slices here as they are created

        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer
    },
});

export default appStore;