import { alpha } from "@mui/system";
import { theme } from "../../../utils/theme";

export const errorStyle = {
	color: `red`,
	// paddingLeft: `50px`,
};

export const customInputStyles = {
	textFieldRoot: {
		border: `1px solid ${alpha(theme.palette.grey[500], 0.3)}`,
		padding: "6px, 8px, 6px, 8px",
		borderRadius: "4px",
	},
	textFieldInput: {
		color: "#333333",
		fontSize: "15px",
		fontStyle: "normal",
		fontWeight: "500",
		lineHeight: "130%",
		letterSpacing: "0.12px",

		"&::placeholder": {
			fontSize: "10px",
			fontStyle: "inter sans-serif",
			fontWeight: "400",
			padding: "2.5px",
		},
	},
	textFieldActive: {
		// border: `12px solid #333333`,
	},
	textFieldError: {
		border: `1px solid red`,
	},
};
