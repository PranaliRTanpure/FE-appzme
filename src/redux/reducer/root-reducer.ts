import { combineReducers } from "@reduxjs/toolkit";
import snackbarReducer from "./snackbar-reducer";
import getLoaderReducer from "./loader-reducer";
import { profileReducer } from "./get-profile";
import { drawerReducer } from "./drawer.reducer";

const rootReducer = combineReducers({
  snackbarReducer,
  getLoaderReducer,
  profileReducer,
  drawer: drawerReducer,
});

export default rootReducer;
