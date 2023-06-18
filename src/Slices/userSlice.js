import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiSignIn} from '../Apis/userAPI';

// create thunk
// asyn action

export const signin = createAsyncThunk(
    'user/signin',
    async (value) => {
        try {
            const data = await apiSignIn(value);
            localStorage.setItem("user", JSON.stringify(data.content));
            return data.content;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)

// reducer
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoadingUser: false,
    errorUser: null
}

const userSlice = createSlice ({
    name : 'user',
    initialState,
    reducers: {
        signout: (state, action) => {
            return {...state, user: null}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signin.pending, (state) => {
            return {...state, isLoadingUser: true, errorUser: null}
        });
        builder.addCase(signin.fulfilled, (state, action) => {
            return {...state, isLoadingUser: false, user: action.payload, errorUser: null}
        });
        builder.addCase(signin.rejected, (state, action) => {
            return {...state, isLoadingUser: false, errorUser: action.error.message}
        });
    }
})

export const {signout} = userSlice.actions;

export default userSlice.reducer;