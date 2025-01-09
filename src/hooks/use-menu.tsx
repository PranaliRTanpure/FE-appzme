import GridViewIcon from "@mui/icons-material/GridView";
import { useLocation } from "react-router-dom";
import { SUPER_USER } from "../constants/constants";

const useMenu = () => {
  const location = useLocation();

  const pathArr = location.pathname
    ?.trim()
    .split("/")
    .filter((path) => path?.length);
  const pathPrefix = (pathArr && pathArr[0]) || "";

  const superUserSideMenu = [
    {
      title: "Encounter",
      route: "/super-user/encounter",
      icon: <GridViewIcon />,
      hide: false,
      disabled: false,
      menuList: [
        { name: "Encounter", path: "/super-user/encounter/encounters" },
        {
          name: "Interpretation Note",
          path: "/super-user/encounter/interpretation-note",
        },
      ],
    },
    {
      title: "Patients",
      route: "/super-user/patient-registration",
      icon: <GridViewIcon />,
      hide: false,
      disabled: false,
      menuList: [
        { name: "Patients", path: "/super-user/patient-registration" },
      ],
    },
    {
      title: "Devices",
      route: "/super-user/devices",
      icon: <GridViewIcon />,
      hide: false,
      disabled: false,
      menuList: [
        { name: "Inventory", path: "/super-user/devices/inventory" },
        { name: "Availability", path: "/super-user/devices/scheduling" },
        {
          name: "Manufacturers",
          path: "/super-user/devices/manufacturers",
        },
      ],
    },
  ];

  return pathPrefix === SUPER_USER ? superUserSideMenu : [];
};

export default useMenu;
