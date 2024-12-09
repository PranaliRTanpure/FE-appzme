import { Grid } from "@mui/system";

// import { Grid } from "@mui/material";

const AuthLayout = (props: React.PropsWithChildren) => {
	return (
		<Grid container height={"100vh"}>
			<Grid
				container
				flex={1.1}
				justifyContent={"center"}
				alignItems={"center"}
				overflow={"auto"}
			>
				{props.children}
			</Grid>
		</Grid>
	);
};

export default AuthLayout;
