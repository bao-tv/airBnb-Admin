import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiLocation} from '../Apis/roomAPI';

export const locations = createAsyncThunk(
    'location/get-all',
    async () => {
        try {
            const data = await apiLocation();
            return data.content;
        } catch (error) {
            throw error;
        }
    }
)

const initialState = {
    locationList: [],
    isLoading: false,
    error: null,
}

const locationSlice = createSlice ({
    name: 'locationList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(locations.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(locations.fulfilled, (state, action) => {
            return {...state, isLoading:false, locationList: action.payload, error: null}
        });
        builder.addCase(locations.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error}
        });
    }
})

export default locationSlice.reducer;