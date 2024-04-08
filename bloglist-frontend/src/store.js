import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificatonReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export default store;
