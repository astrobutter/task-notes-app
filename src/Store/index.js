import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./storage.js";
import authReducer from "./slices/authSlice.js";
import notesReducer from "./slices/notesSlice.js";
import themeReducer from "./slices/themeSlice.js";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    theme: themeReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
