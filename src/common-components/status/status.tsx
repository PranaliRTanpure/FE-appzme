import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";
import { StatusColorMap } from "../../constants/status";
import { theme } from "../../utils/theme";
import { toCamelCase } from "../../utils/toCamelCase";
import { active } from "./status.widgets";

interface StatusProps {
	status: string;
	width?: string;
	removeStatusBgColor?: boolean;
}

const Status: React.FC<StatusProps> = (props) => {
	const { status, width, removeStatusBgColor } = props;
	const color = status ? StatusColorMap[status] : theme.palette.primary.light;
	let backgroundColor = "";
	if (!removeStatusBgColor) {
		try {
			backgroundColor = alpha(color, 0.2);
		} catch {
			backgroundColor = alpha(theme.palette.primary.light, 0.3);
		}
	}
	const statusTitle = toCamelCase(status || "Undefined");

	return (
		<Box
			sx={{
				...active,
				...(removeStatusBgColor
					? {}
					: { backgroundColor, width: width ? width : "12rem" }),
				textAlign: "center",
			}}
		>
			<Typography
				sx={{
					fontWeight: "700",
					fontSize: "0.875rem",
					color: color || "inherit",
				}}
			>
				{statusTitle}
			</Typography>
		</Box>
	);
};

export default Status;
