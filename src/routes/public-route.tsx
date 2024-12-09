import { Navigate } from "react-router-dom";
import useAuthority from "../hooks/use-authority";
import { PortalStartingRoute } from "../constants/portals";

const PublicRoute = (props: React.PropsWithChildren) => {
	const { token } = useAuthority();
	const isLoggedIn = !!token;

	return !isLoggedIn ? (
		props.children
	) : (
		<Navigate to={PortalStartingRoute["provider"]} />
	);
};

export default PublicRoute;
