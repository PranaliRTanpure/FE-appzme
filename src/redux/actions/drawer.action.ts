import { Action } from "@reduxjs/toolkit";

import { DrawerContent } from "./types/drawer.types";

export const OPEN_DRAWER = "OPEN_DRAWER";
export const CLOSE_DRAWER = "CLOSE_DRAWER";

export interface OpenDrawerAction extends Action<typeof OPEN_DRAWER> {
  payload: DrawerContent;
}

export interface CloseDrawerAction extends Action<typeof CLOSE_DRAWER> {}

export const openDrawer = (content: DrawerContent): OpenDrawerAction => ({
  type: OPEN_DRAWER,
  payload: content,
});

export const closeDrawer = (): CloseDrawerAction => ({
  type: CLOSE_DRAWER,
});

export type DrawerActionTypes = OpenDrawerAction | CloseDrawerAction;
