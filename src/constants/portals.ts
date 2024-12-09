import { StringMap } from "./constants";

export const Portals: StringMap = {
	provider: "provider",
};

export const PortalStartingRoute: StringMap = {
	provider: `/${Portals.provider}/patients`,
};
