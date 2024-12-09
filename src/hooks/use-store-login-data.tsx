import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AlertSeverity } from "../common-components/snackbar-alert/snackbar-alert";
import { Roles } from "../constants/roles";
import { LoginModel } from "../models/auth/login-model";
import { AccessTokenPayload } from "../models/auth/token-payload";
import { setSnackbarOn } from "../redux/actions/snackbar-action";
import storageService from "../services/core/storage-service";

const useStoreLoginData = () => {
  // const { isPatientDomain } = useAuthority();
  const dispatch = useDispatch();

  const getRoleFromAccessToken = (accessToken: string): string => {
    const decodedPayload: AccessTokenPayload = jwtDecode(accessToken);
    const role = decodedPayload?.realm_access?.roles.includes(
      "PROVIDER_GROUP_ADMIN",
    )
      ? Roles.PROVIDER_GROUP_ADMIN
      : decodedPayload?.realm_access?.roles.includes("PROVIDER")
        ? Roles.PROVIDER
        : decodedPayload?.realm_access?.roles.includes("FRONTDESK")
          ? Roles.FRONTDESK
          : decodedPayload?.realm_access?.roles.includes("BILLER")
            ? Roles.BILLER
            : decodedPayload?.realm_access?.roles.includes("NURSE")
              ? Roles.NURSE
              : decodedPayload?.realm_access?.roles.includes("SITE_ADMIN")
                ? Roles.SITE_ADMIN
                : Roles.PROVIDER;

    return role || "";
  };

  const storeLoginDataInStore = useCallback((loginResponse: LoginModel) => {
    const userRole = getRoleFromAccessToken(loginResponse.access_token);
    if (userRole === Roles.PATIENT) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.INFO,
          message: "Please visit to patient portal.",
        }),
      );
      return;
    }

    const date = new Date();
    date.setTime(date.getTime() + loginResponse.expires_in * 1000);
    const expires = date.toUTCString();
    const cookieStoreOption = { path: "/", expires: expires };
    storageService.setRoles(userRole, cookieStoreOption);
    storageService.setToken(loginResponse.access_token, cookieStoreOption);
    storageService.setRefreshToken(
      loginResponse.refresh_token,
      cookieStoreOption,
    );
    storageService.setExpiry(expires, cookieStoreOption);
  }, []);

  return storeLoginDataInStore;
};

export default useStoreLoginData;
