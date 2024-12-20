import {
  CLOSE_DRAWER,
  DrawerActionTypes,
  OPEN_DRAWER,
} from "../actions/drawer.action";
import { DrawerState } from "../actions/types/drawer.types";

const initialState: DrawerState = {
  isOpen: false,
  content: {
    title: "",
    identifier: undefined,
  },
};

export const drawerReducer = (
  state = initialState,
  action: DrawerActionTypes,
): DrawerState => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        isOpen: true,
        content: action.payload,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        isOpen: false,
        content: initialState.content,
      };
    default:
      return state;
  }
};
