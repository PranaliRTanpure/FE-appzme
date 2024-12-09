import { Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";

const Android12Switch = styled(Switch)(({ theme }) => ({
	padding: 8,
	"& .MuiSwitch-track": {
		borderRadius: 22 / 2,
		backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
		opacity: 1,
		transition: theme.transitions.create(["background-color"], {
			duration: 500,
		}),
		"&.Mui-checked": {
			backgroundColor: "pink", // Color when true (checked)
		},
	},
	"& .Mui-checked + .MuiSwitch-track": {
		backgroundColor: theme.palette.success.main, // Track color when checked (true)
	},
	"& .MuiSwitch-thumb": {
		boxShadow: "none",
		width: 16,
		height: 16,
		margin: 2,
		backgroundColor: theme.palette.common.white, // Thumb color
		"&.Mui-checked": {
			backgroundColor: theme.palette.success.main, // Thumb color when true
		},
	},
}));

interface ToggleProps {
	status: boolean;
	handleStatusChange: (checked: boolean, uuid?: string) => void;
	locationName?: string;
	isDisable?: boolean;
}

const Toggle: React.FC<ToggleProps> = (props) => {
	const { status } = props;
	const [checked, setChecked] = useState(status);

	useEffect(() => {
		setChecked(status);
	}, [status]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event;
		handleClickOpenConfirmationDialog();
	};

	const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

	const handleClickOpenConfirmationDialog = () => {
		setOpenConfirmationDialog(true);
	};

	//cancel
	const handleClickCloseConfirmationDialog = () => {
		setOpenConfirmationDialog(false);
	};

	//confirm change
	const handleClickCloseAndConfirmChangeStatus = () => {
		setChecked((prev) => !prev);
		props.handleStatusChange(!checked);
		setOpenConfirmationDialog(false);
	};

	return (
		<>
			<Android12Switch
				onChange={handleChange}
				checked={props.status}
				disabled={props.isDisable}
			/>
			<Dialog
				open={openConfirmationDialog}
				onClose={handleClickCloseConfirmationDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					<Typography variant="body1">{"Confirm"}</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<Typography variant="caption">
							{props.locationName
								? `Do you really want to change the status of ${props.locationName}?`
								: "Do you really want to change the status ?"}
						</Typography>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickCloseConfirmationDialog}>
						<Typography variant="caption">{"Cancel"}</Typography>
					</Button>
					<Button onClick={handleClickCloseAndConfirmChangeStatus} autoFocus>
						<Typography variant="caption">{"Yes"}</Typography>
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Toggle;
