/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerState } from "../actions/types/drawer.types";

export interface RootState {
  snackbarReducer: any; // Replace with proper type
  getLoaderReducer: any; // Replace with proper type
  profileReducer: any; // Replace with proper type
  drawer: DrawerState;
}
