import { combineReducers } from "@reduxjs/toolkit";
import snackbarReducer from "./snackbar-reducer";
import getLoaderReducer from "./loader-reducer";
import { profileReducer } from "./get-profile";

const rootReducer = combineReducers({
  snackbarReducer,
  getLoaderReducer,
  profileReducer,
});

export default rootReducer;
