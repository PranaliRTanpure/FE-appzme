import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { theme } from "../../utils/theme";
import { errorStyle } from "../custom-input/widgets/custom-input-styles";
import { selectInputStyle } from "./widgets/customSelectStyles";

interface CustomSelectProps {
	placeholder: string;
	name: string;
	value: string;
	items: { value: string; label: string; disabled?: boolean }[];
	onChange: (e: SelectChangeEvent<string>) => void;
	hasError?: boolean;
	errorMessage?: string;
	isDisabled?: boolean;
	bgWhite?: boolean;
	enableDeselect?: boolean;
	menuProps?: {
		PaperProps?: {
			style?: {
				maxHeight?: number;
				width?: number;
			};
		};
	};
}

function CustomSelect(props: CustomSelectProps) {
	const { items, bgWhite, enableDeselect } = props;

	const handleValue = (e: SelectChangeEvent<string>) => {
		const selectedLabel = e.target.value;
		const selectedKey =
			props.items.find((item) => item.label === selectedLabel)?.value || "";
		e.target.value = selectedKey;

		props.onChange(e);
	};

	const getLabel = (value: string) => {
		return items.find((item) => item.value === value)?.label || "";
	};

	return (
		<>
			<Select
				disabled={props.isDisabled && props.isDisabled}
				MenuProps={props.menuProps}
				sx={{
					...selectInputStyle,
					backgroundColor: bgWhite === true ? "inherit" : "white",
				}}
				displayEmpty
				name={props?.name}
				value={getLabel(props.value)}
				onChange={handleValue}
				error={props.hasError}
				renderValue={(selected) => (
					<Typography
						variant="bodySmall"
						sx={{
							color: selected
								? theme.palette.grey[800]
								: theme.palette.grey[500],
						}}
					>
						{selected || props?.placeholder}
					</Typography>
				)}
			>
				{enableDeselect && (
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
				)}
				{props?.items &&
					props?.items.length !== 0 &&
					props?.items?.map((option) => (
						<MenuItem
							key={option.value}
							value={option.label}
							disabled={option.disabled}
						>
							<Typography variant="bodySmall">{option.label}</Typography>
						</MenuItem>
					))}
			</Select>
			<Typography sx={errorStyle} variant="caption">
				{props.hasError ? props.errorMessage : ""}
			</Typography>
		</>
	);
}

export default CustomSelect;
