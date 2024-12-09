import { Tab, Tabs } from "@mui/material";
import { Grid } from "@mui/system";
import { useState } from "react";
import {
	CustomTabPanel,
	a11yProps,
} from "../../../common-components/custom-tab/custom-tab";
import StaffList from "./staff-users/staff-list";


const tabLabels = ["Providers", "Staff"];

const UsersTab = () => {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		event;
	};

	return (
		<Grid width={"100%"} height={"100%"} p={2}>
			<Grid
				// border={`1px solid ${theme.palette.grey[300]}`}
				// boxShadow={`0px 0px 16px 0px #021D2614`}
				height={"100%"}
				borderRadius={"8px"}
				container
				flexDirection={"column"}
			>
				<Grid>
					<Grid sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs value={value} onChange={handleChange}>
							{tabLabels?.map((item, index) => (
								<Tab
									sx={{ textTransform: "none", fontWeight: 550 }}
									key={index}
									label={item}
									{...a11yProps(0)}
								/>
							))}
						</Tabs>
					</Grid>
					<Grid flex={1}>
						{tabLabels.map((item, index) => (
							<CustomTabPanel key={index} value={value} index={index}>
								{item === "Providers" && <StaffList roleType={""} listType={"Providers"}/>}
								{item === "Staff" && <StaffList roleType={""} listType={"Staff"} />}
							</CustomTabPanel>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default UsersTab;
