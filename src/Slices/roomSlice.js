import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiAllRoomList} from '../Apis/roomAPI';

// create thunk
// asyn action

export const allRoom = createAsyncThunk(
    'rooms',
    async () => {
        try {
            const data = await apiAllRoomList();
            return data.content;
        } catch (error) {
            throw error;
        }
    }
);

// reducer
const initialState = {
    rooms: [],
    isLoadingRoom: false,
    errorRoom: null
}

const roomSlice = createSlice ({
    name : 'roomList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(allRoom.pending, (state) => {
            return {...state, isLoadingRoom: true, errorRoom: null}
        });
        builder.addCase(allRoom.fulfilled, (state, action) => {
            return {...state, isLoadingRoom: false, errorRoom: null, rooms: action.payload}
        });
        builder.addCase(allRoom.rejected, (state, action) => {
            return {...state, isLoadingRoom: false, errorRoom: action.error}
        });
    }
})

export default roomSlice.reducer;