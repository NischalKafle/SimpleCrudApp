import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/?limit=10');
    return response.data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
});

export const userSlice = createSlice({
    name: "users",
    initialState: { value: fetchUsers },
    reducers: {
      addUser: (state, action) => {
        state.value.push(action.payload);
      },
  
      deleteUser: (state, action) => {
        state.value = state.value.filter((user) => user.id !== action.payload.id);
      },
  
      updateUsername: (state, action) => {
        state.value = state.value.map((user) => {
          if (user.id === action.payload.id) {
            return { ...user, username: action.payload.username };
          }
          return user;
        });
      },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
          state.value = action.payload;
        });
      },
  });
  
  export const { addUser, deleteUser, updateUsername } = userSlice.actions;
  export default userSlice.reducer;

 


