// create a user data slice when the user is login save to data to the redux store
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface UserDataState {
  user: {
    id: string;
    email: string;
    name: string;
    username: string;
    apiToken: string;
  } | null;
}

// Define the initial state using that type
const initialState: UserDataState = {
  user: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserDataState["user"]>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userDataSlice.actions;