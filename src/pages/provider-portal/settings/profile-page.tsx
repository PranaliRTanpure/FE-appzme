import { Grid } from "@mui/system";
import ProfileProvider from "../../../components/settings/profile-provider/profile";
import ProfileStaff from "../../../components/settings/profile-staff/profile";
import useAuthority from "../../../hooks/use-authority";

const ProfilePage = () => {
	const { isProvider, isNurse } = useAuthority();

	return (
		<Grid p={2}>
			{isProvider || isNurse ? <ProfileProvider /> : <ProfileStaff />}
		</Grid>
	);
};

export default ProfilePage;
