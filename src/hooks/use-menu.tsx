import { useLocation } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";

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
        { name: "Encounter", path: "/super-user/encounter" },
        {
          name: "Interpretation Note",
          path: "/super-user/encounter/interpretation-note",
        },
      ],
    },
    // {
    //   title: "Devices",
    //   route: "/super-user/devices",
    //   icon: <GridViewIcon />,
    //   hide: false,
    //   disabled: false,
    //   menuList: [
    //     { name: "Inventory", path: "/super-user/devices/inventory" },
    //     { name: "Availability", path: "/super-user/devices/scheduling" },
    //     {
    //       name: "Manufacturers",
    //       path: "/super-user/devices/manufacturers",
    //     },
    //   ],
    // },
    // {
    //   title: "Communications",
    //   route: "/super-user/communications",
    //   icon: <GridViewIcon />,
    //   hide: false,
    //   disabled: false,
    //   menuList: [
    //     { name: "Tasks", path: "/super-user/communications/tasks" },
    //     { name: "Fax", path: "/super-user/communications/fax" },
    //     {
    //       name: "Messages",
    //       path: "/super-user/communications/messages",
    //     },
    //   ],
    // },
    {
      title: "Settings",
      route: "/super-user/settings",
      icon: <GridViewIcon />,
      hide: false,
      disabled: false,
      // menuList: [
      //   { name: "Patients", path: "/super-user/patient-registration" },
      // ],
    },
  ];

  return pathPrefix === SUPER_USER ? superUserSideMenu : [];
};

export default useMenu;
