import { alpha } from "@mui/system";
import { theme } from "../../../utils/theme";

export const selectInputStyle = {
	".MuiOutlinedInput-notchedOutline": { border: 0 },
	border: `1px solid ${alpha(theme.palette.grey[500], 0.3)}`,
	height: "40px !important",
	width: "100%",
	// borderRadius: "40px",
	".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
		display: "flex",
		alignItems: "center",
	},
	"&.Mui-error": {
		border: `1px solid ${theme.palette.warning.dark}`,
		padding: "0px!important",
	},
	"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "rgba(228, 219, 233, 0.25)",
	},
};

export const someStyle = {
	".MuiOutlinedInput-notchedOutline": { border: 0 },
	border: `1px solid ${alpha(theme.palette.grey[500], 0.3)}`,
	height: "40px !important",
	width: "100%",
	// borderRadius: "8px",
	".Mui-readOnly": {
		borderRadius: "8px",
		border: `1px solid ${alpha(theme.palette.grey[500], 0.3)}`,
		padding: "10px !important",
	},
	".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
		display: "flex",
		alignItems: "center",
	},
};
