import { combineReducers } from "@reduxjs/toolkit";

import { drawerReducer } from "./drawer.reducer";
import getLoaderReducer from "./loader-reducer";
import snackbarReducer from "./snackbar-reducer";

const rootReducer = combineReducers({
  snackbarReducer,
  getLoaderReducer,
  drawer: drawerReducer,
});

export default rootReducer;
