import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "@/store/features/messagesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      messages: messagesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
