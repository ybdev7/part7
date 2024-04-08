import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      state = action.payload;
      return state;
    },
    clearNotification(state, action) {
      console.log("clearing..", action.payload);
      //only clear the corresponding message, not a newer one
      if (state === action.payload) {
        state = "";
      }

      return state;
    },
  },
});

export const showNotification = (message, seconds = 5) => {
  return async (dispatch) => {
    console.log("here1");
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification(message));
    }, seconds * 1000);
  };
};
export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
