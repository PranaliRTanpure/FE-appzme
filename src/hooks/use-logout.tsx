import { useNavigate } from "react-router-dom";
import storageService from "../services/core/storage-service";
// import { setIsLoading } from "../redux/action/loader-action";
// import { resetProviderDetails } from "../redux/action/provider-details.action";
// import { resetPatientDetails } from "../redux/action/patient-details.action";
// import { resetTimerAlertData } from "../redux/action/timer-alert.actions";
// import { resetUserDetails } from "../redux/action/user-profile-action";
import { useUserControllerServiceLogout } from "../sdk/queries";
import cookieService from "../services/core/cookie-service";

const useLogout = () => {
  const { mutateAsync: logoutMutate, isPending } =
    useUserControllerServiceLogout();
  const navigate = useNavigate();
  isPending;
  // const dispatch = useDispatch();
  // const { isPatient } = useAuthority();

  // useEffect(() => {
  //   dispatch(setIsLoading(isPending));
  // }, [isPending, dispatch]);

  const logout = async () => {
    const refreshToken = storageService.getRefreshToken();
    if (refreshToken) {
      await logoutMutate({
        requestBody: {
          refreshToken,
        },
      });
      // dispatch(setIsLoading(false));
    }

    // dispatch(resetProviderDetails());
    // dispatch(resetPatientDetails());
    // dispatch(resetTimerAlertData());
    // dispatch(resetUserDetails());
    cookieService.clearCookies();
    localStorage.clear();
    localStorage.removeItem("redirectURL");

    const loginRoute = "/auth/login";

    navigate(loginRoute);
  };

  return logout;
};

export default useLogout;
