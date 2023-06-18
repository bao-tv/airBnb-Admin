import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {apiLocation} from '../Apis/roomAPI';
import {apiBookingList} from '../Apis/bookingAPI';

export const bookings = createAsyncThunk(
    'booking',
    async () => {
        try {
            const data = await apiBookingList();
            return data.content;
        } catch (error) {
            throw error;
        }
    }
);

const initialState = {
    bookingList: [],
    isLoadingBooking: false,
    errorBooking: null,
};

const bookingSlice = createSlice({
    name: 'bookingList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(bookings.pending, (state) => {
            return {...state, isLoadingBooking: true, errorBooking: null}
        });
        builder.addCase(bookings.fulfilled, (state, action) => {
            return {...state, isLoadingBooking: false, errorBooking: null, bookingList: action.payload}
        });
        builder.addCase(bookings.rejected, (state, action) => {
            return {...state, isLoadingBooking: false, errorBooking: action.error}
        });
    }
});

export default bookingSlice.reducer;