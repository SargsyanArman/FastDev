import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const usersCollection = collection(db, 'users');
    const snapshot = await getDocs(usersCollection);
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return users;
});

const users = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default users.reducer;
