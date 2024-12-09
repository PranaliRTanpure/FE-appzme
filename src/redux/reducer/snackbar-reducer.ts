// import { AlertColor } from "@mui/material/Alert";
import { ActionType } from "../action-type";
import {
	SNACKBAR_ON,
	SNACKBAR_OFF,
	SnackbarPayload,
	ButtonDetails,
} from "../actions/snackbar-action";

type AlertColor = "success" | "info" | "warning" | "error";

type SnackbarState = {
	isSnackbarOpen: boolean;
	severity?: AlertColor;
	message?: string;
	arrayOfBtns?: Array<ButtonDetails>;
	subMessage?: string;
};

const initialState: SnackbarState = {
	isSnackbarOpen: false,
	message: "",
	arrayOfBtns: [],
	subMessage: "",
};

const snackbarReducer = (
	state = initialState,
	action: ActionType<SnackbarPayload>
): SnackbarState => {
	switch (action.type) {
		case SNACKBAR_ON:
			return {
				...state,
				isSnackbarOpen: true,
				severity: action.payload.severity,
				message: action.payload.message,
				arrayOfBtns: action.payload.arrayOfBtns,
				subMessage: action.payload.subMessage,
			};
		case SNACKBAR_OFF:
			return { ...state, isSnackbarOpen: false, arrayOfBtns: [] };
		default:
			return state;
	}
};

export default snackbarReducer;
