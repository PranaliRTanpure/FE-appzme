import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ButtonBase, Menu, MenuItem, Typography } from "@mui/material";
import { Grid, alpha } from "@mui/system";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useMenu from "../../hooks/use-menu";
import { theme } from "../../utils/theme";

const TopMenu = () => {
  const menuItems = useMenu();

  const [openMenus, setOpenMenus] = React.useState<{
    [key: string]: HTMLElement | null;
  }>({});
  const navigate = useNavigate();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    itemTitle: string,
  ) => {
    setOpenMenus((prev) => ({
      ...prev,
      [itemTitle]: event.currentTarget,
    }));
  };

  const handleClose = (itemTitle: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [itemTitle]: null,
    }));
  };

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
                borderBottom: isActive ? "2px solid white" : "none",
                color: item.disabled
                  ? theme.palette.grey[500]
                  : isActive
                    ? theme.palette.common.white
                    : alpha(theme.palette.common.white, 0.7),
              };
            }}
          >
            <ButtonBase onClick={(e) => handleClick(e, item.title)}>
              <Typography
                variant="bodySmall"
                color={theme.palette.common.white}
              >
                {item.title}
              </Typography>
              <KeyboardArrowDownIcon fontSize="small" sx={{ color: "white" }} />
            </ButtonBase>
            {
              <Menu
                id={item.title}
                anchorEl={openMenus[item.title] || null}
                open={Boolean(openMenus[item.title])}
                onClose={() => handleClose(item.title)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {item.menuList.map((menu) => (
                  <MenuItem
                    key={menu.name}
                    onClick={() => {
                      navigate(menu.path);
                      handleClose(item.title);
                    }}
                  >
                    {menu.name}
                  </MenuItem>
                ))}
              </Menu>
            }
          </NavLink>
        ))}
    </Grid>
  );
};

export default TopMenu;
