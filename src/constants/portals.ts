import { StringMap } from "./constants";

export const Portals: StringMap = {
  provider: "provider",
  superUser: "super-user",
};

export const PortalStartingRoute: StringMap = {
  provider: `/${Portals.superUser}/patients`,
};
