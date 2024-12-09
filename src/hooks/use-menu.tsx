import GridViewIcon from "@mui/icons-material/GridView";
import { useLocation } from "react-router-dom";
import { PROVIDER_LOWER } from "../constants/constants";
import useAuthority from "./use-authority";

const useMenu = () => {
  const location = useLocation();
  const { isProvider } = useAuthority();

  const pathArr = location.pathname
    ?.trim()
    .split("/")
    .filter((path) => path?.length);
  const pathPrefix = (pathArr && pathArr[0]) || "";

  const providerSideMenu = [
    {
      title: "Patients",
      route: "/provider/patients",
      icon: <GridViewIcon />,
      hide: false,
      disabled: false,
    },
    {
      title: "Users",
      route: "/provider/users",
      icon: <GridViewIcon />,
      hide: isProvider,
      disabled: false,
    },
    {
      title: "Settings",
      route: "/provider/settings",
      icon: <GridViewIcon />,
      hide: false,
      disabled: false,
    },
  ];

  return pathPrefix === PROVIDER_LOWER ? providerSideMenu : [];
};

export default useMenu;
