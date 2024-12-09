import { tableCellClasses } from "@mui/material/TableCell";
import { theme } from "../../utils/theme";

export const heading = {
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.secondary.light,
		color: "#667085",
		cursor: "pointer",
		padding: "8px",
		height: "40px",
		fontWeight: "bold",
	},
};

export const tableCellCss = {
	"& .MuiTableCell-sizeMedium": {
		padding: "12px 16px !important",
	},
};

export const tableCss = {
	borderRadius: "4px",
	border: `1px solid ${theme.palette.grey[300]}`,
	margin: "10px",
};

export const linkCss = {
	textOverflow: "ellipsis",
	width: "100%",
	overflow: "hidden",
	cursor: "pointer",
};

export const typographyCss = {
	color: "#212D30",
};

export const longTypographyCss = {
	color: theme.palette.grey[600],
	whiteSpace: "normal",
	wordBreak: "break-word",
};

export const linkCssWithDecoration = {
	textDecoration: "underline",
};

export const typographyCssForLink = {
	color: theme.palette.primary.main,
};

export const iconStyles = {
	color: "#364144",
	width: "20px",
	height: "20px",
};
