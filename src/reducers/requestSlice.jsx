import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests: (state, action) => {
            return action.payload
        },
        removeRequests: (state, action) => {
            return null
        }
    }
})


export const { addRequests, removeRequests } = requestsSlice.actions;

export default requestsSlice.reducer;