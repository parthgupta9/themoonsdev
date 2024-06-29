import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  user: { username: string } | null;
}

const initialState: UserState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<{ username: string }>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;