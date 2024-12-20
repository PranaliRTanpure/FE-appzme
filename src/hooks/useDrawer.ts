import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { Dispatch } from "@reduxjs/toolkit";

import {
  DrawerActionTypes,
  closeDrawer,
  openDrawer,
} from "../redux/actions/drawer.action";
import { DrawerContent } from "../redux/actions/types/drawer.types";
import { RootState } from "../redux/types/root-state";

export interface UseDrawerProps {
  onClose?: () => void;
}

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDrawer = (props?: UseDrawerProps) => {
  const dispatch = useDispatch<Dispatch<DrawerActionTypes>>();
  const { onClose } = props || {};

  const drawerState = useAppSelector((state) => state.drawer);

  const handleOpen = (content: DrawerContent) => {
    dispatch(openDrawer(content));
  };

  const handleClose = () => {
    dispatch(closeDrawer());
    onClose?.();
  };

  return {
    isOpen: drawerState.isOpen,
    content: drawerState.content,
    open: handleOpen,
    close: handleClose,
  } as const;
};
