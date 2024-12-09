import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AlertSeverity } from "../../common-components/snackbar-alert/snackbar-alert";
import { BASE_API_URL } from "../../constants/config";
import { setSnackbarOn } from "../../redux/actions/snackbar-action";
import cookieService from "../../services/core/cookie-service";
import storageService from "../../services/core/storage-service";
import { GetTenantId } from "../../services/common/get-tenant-id";

const callRefreshToken = (refreshToken: string) => {
  return fetch(
    `${BASE_API_URL}/api/master/access-token?refreshToken=${refreshToken}`,
    {
      method: "POST",
      headers: {
        "X-TENANT-ID": GetTenantId(),
      },
    },
  ).then((res) => res.json());
};

const RefreshToken = () => {
  const { mutateAsync: refreshTokenMutate } = useMutation({
    mutationFn: callRefreshToken,
  });

  const dispatch = useDispatch();

  const clearCookiesAndLogout = () => {
    cookieService.clearCookies();
    localStorage.clear();
    const someDiv = window.parent.document.getElementById("iFrame");
    if (someDiv) {
      someDiv.style.display = "none";
    }
    window.parent.location.href = "/auth/login?tokenExpired=true";
  };

  const handleRefreshTokenError = (url: string) => {
    if (url.toString().includes("/api/master/access-token")) {
      /** Logout: Clear cookies and navigate to login */
      clearCookiesAndLogout();
      localStorage.removeItem("redirectURL");
    }
  };

  const { fetch: originalFetch } = window;

  window.fetch = async (...args) => {
    const [resource, config] = args;
    // request interceptor here

    let response = await originalFetch(resource as URL, config);

    /** Handle logout if refresh token api fails */
    if (response.status !== 200) {
      handleRefreshTokenError(resource as string);
    }

    // response interceptor here
    switch (response.status) {
      case 401: {
        const refreshToken = storageService.getRefreshToken();
        if (refreshToken) {
          const res = await refreshTokenMutate(refreshToken);
          if (res && res.code === "ENTITY") {
            const { access_token, refresh_token, expires_in } = res.data;
            const date = new Date();
            date.setTime(date.getTime() + expires_in * 1000);
            const expires = date.toUTCString();
            const cookieStoreOption = { path: "/", expires: expires };
            storageService.setToken(access_token, cookieStoreOption);
            storageService.setRefreshToken(refresh_token, cookieStoreOption);
            storageService.setExpiry(expires, cookieStoreOption);

            dispatch(
              setSnackbarOn({
                message: "Token refreshed!!!!",
                severity: AlertSeverity.SUCCESS,
              }),
            );

            config!.headers = {
              ...config!.headers,
              Authorization: `Bearer ${access_token}`,
            };

            // Recall the api
            response = await originalFetch(resource as URL, config);
            return response;
          }
        }

        /** Logout: Clear cookies and navigate to login */
        clearCookiesAndLogout();

        break;
      }
    }

    return response;
  };

  return <></>;
};

export default RefreshToken;
