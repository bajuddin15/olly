import { createSlice } from "@reduxjs/toolkit";

// Function to safely parse JSON
const safelyParseJSON = (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};

// Retrieve user from localStorage and safely parse it
const initialState = {
  user: safelyParseJSON(localStorage.getItem("user")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    clearUser: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
