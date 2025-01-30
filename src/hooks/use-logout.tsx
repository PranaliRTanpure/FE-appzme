import { useNavigate } from "react-router-dom";

// import { setIsLoading } from "../redux/action/loader-action";
// import { resetProviderDetails } from "../redux/action/provider-details.action";
// import { resetPatientDetails } from "../redux/action/patient-details.action";
// import { resetTimerAlertData } from "../redux/action/timer-alert.actions";
// import { resetUserDetails } from "../redux/action/user-profile-action";
import cookieService from "../services/core/cookie-service";
import storageService from "../services/core/storage-service";

const useLogout = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { isPatient } = useAuthority();

  // useEffect(() => {
  //   dispatch(setIsLoading(isPending));
  // }, [isPending, dispatch]);

  const logout = async () => {
    const refreshToken = storageService.getRefreshToken();
    const loginRoute = "/auth/login";

    if (refreshToken) {
      navigate(loginRoute);

      // dispatch(setIsLoading(false));
    }

    // dispatch(resetProviderDetails());
    // dispatch(resetPatientDetails());
    // dispatch(resetTimerAlertData());
    // dispatch(resetUserDetails());
    cookieService.clearCookies();
    localStorage.clear();
    localStorage.removeItem("redirectURL");

    navigate(loginRoute);
  };

  return logout;
};

export default useLogout;
