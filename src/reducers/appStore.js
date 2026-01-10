import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionsSlice";
import requestReducer from './requestSlice'

const appStore = configureStore({
    reducer: {
        // Add your slices here as they are created

        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestReducer
    },
});

export default appStore;