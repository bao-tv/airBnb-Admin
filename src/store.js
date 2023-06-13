import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import locationSlice from "./Slices/locationSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        locationList: locationSlice,
    },
});

export default store;