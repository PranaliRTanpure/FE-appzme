// eslint-disable-next-line import/named
import { AlertColor } from "@mui/material/Alert";

export const SNACKBAR_ON = "SNACKBAR_ON";
export const SNACKBAR_OFF = "SNACKBAR_OFF";

export const setSnackbarOn = (payload: SnackbarPayload) => {
	return {
		type: SNACKBAR_ON,
		payload,
	};
};

export const setSnackbarOff = () => {
	return {
		type: SNACKBAR_OFF,
	};
};

export type SnackbarPayload = {
	severity: AlertColor;
	message: string;
	subMessage?: string;
	arrayOfBtns?: Array<ButtonDetails>;
	data?: string;
};

export type ButtonDetails = {
	title?: string;
	fontWeight?: number;
	color?: string;
	onClick?: () => void;
};
