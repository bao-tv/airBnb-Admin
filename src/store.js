import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import locationSlice from "./Slices/locationSlice";
import bookingSlice from "./Slices/bookingSlice";
import roomSlice from "./Slices/roomSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        locationList: locationSlice,
        bookingList: bookingSlice,
        roomList: roomSlice,
    },
});

export default store;