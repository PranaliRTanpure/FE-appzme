import { useLocation } from "react-router-dom";
import { ENV } from "../constants/config";
import { RolesPortalMap } from "../constants/constants";
import { ENVIRONMENTS } from "../constants/environments";
import { Portals } from "../constants/portals";
import storageService from "../services/core/storage-service";
import { Roles } from "../constants/roles";

type AuthorityInfo = {
  hasRouteAuthority: boolean;
  portal: string;
  role: string | null;
  token: string | null;
  isProvider: boolean;
  isProviderPortal: boolean;
  isEnvDevelopment: boolean;
  isEnvProduction: boolean;
  isEnvStage: boolean;
  isEnvQa: boolean;
  isSiteAdmin: boolean;
  isNurse: boolean;
  isFrontDesk: boolean;
  isBiller: boolean;
};

const useAuthority = () => {
  const role = storageService.getRoles();
  const token = storageService.getToken();
  const location = useLocation();

  const isProvider = role === Roles.PROVIDER;

  const isSiteAdmin = role === Roles.SITE_ADMIN;
  const isNurse = role === Roles.NURSE;
  const isFrontDesk = role === Roles.FRONTDESK;
  const isBiller = role === Roles.BILLER;

  const pathArr = location.pathname
    ?.trim()
    .split("/")
    .filter((path) => path.length);
  const pathPrefix = pathArr[0];

  const isProviderPortal = pathPrefix === Portals.provider;

  // Compute respective user portal based on role
  const portal = (role && RolesPortalMap[role.toString()]) || "";

  const isEnvDevelopment = ENV === ENVIRONMENTS.DEVELOPMENT;
  const isEnvProduction = ENV === ENVIRONMENTS.PRODUCTION;
  const isEnvStage = ENV === ENVIRONMENTS.STAGE;
  const isEnvQa = ENV === ENVIRONMENTS.QA;

  const authorityInfo: AuthorityInfo = {
    hasRouteAuthority: pathPrefix === portal,
    portal,
    role,
    token,
    isProviderPortal,
    isEnvDevelopment,
    isEnvProduction,
    isEnvStage,
    isEnvQa,
    isProvider,
    isSiteAdmin,
    isNurse,
    isFrontDesk,
    isBiller,
  };

  return authorityInfo;
};

export default useAuthority;
