import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/root-reducer";
import { useSelector } from "react-redux";

const reduxStore = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof reduxStore.dispatch;
export const useReduxSelector = useSelector<RootState>;

export { reduxStore };
