import { Grid } from "@mui/system";
import Navbar from "../common-components/navbar/navbar";

const MainLayout = (props: React.PropsWithChildren) => {
	return (
		<>
			<Grid container height={"100vh"}>
				<Grid
					container
					flex={1}
					flexDirection={"column"}
					height={"100vh"}
					sx={{
						overflow: "auto",
						maxHeight: "100vh",
						transition: "all .2s",
					}}
					flexWrap={"nowrap"}
				>
					<Navbar />
					<Grid container flex={1} justifyContent={"center"}>
						{props.children}
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default MainLayout;
