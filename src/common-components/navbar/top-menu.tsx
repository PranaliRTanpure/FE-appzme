import { Typography } from "@mui/material";
import { Grid, alpha } from "@mui/system";
import { NavLink } from "react-router-dom";
import useMenu from "../../hooks/use-menu";
import { theme } from "../../utils/theme";

const TopMenu = () => {
  const menuItems = useMenu();

  return (
    <Grid container columnGap={5}>
      {menuItems
        .filter((item) => !item.hide)
        .map((item, index) => (
          <NavLink
            to={item.route}
            key={index}
            style={({ isActive }) => {
              return {
                pointerEvents: item.disabled ? "none" : "auto",
                textDecoration: isActive ? "underline" : "none",
                textDecorationColor: theme.palette.common.white,
                fontWeight: isActive ? "bold" : "normal",
                letterSpacing: isActive ? ".5px" : "0px",
                textUnderlineOffset: "8px",
                textDecorationThickness: "1.5px",
                color: item.disabled
                  ? theme.palette.grey[500]
                  : isActive
                    ? theme.palette.common.white
                    : alpha(theme.palette.common.white, 0.7),
              };
            }}
          >
            <Typography variant="bodySmall" color={theme.palette.common.white}>
              {item.title}
            </Typography>
          </NavLink>
        ))}
    </Grid>
  );
};

export default TopMenu;
