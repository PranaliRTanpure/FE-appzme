import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ButtonBase, Menu, MenuItem, Typography } from "@mui/material";
import { Grid, alpha } from "@mui/system";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import useMenu from "../../hooks/use-menu";
import { theme } from "../../utils/theme";

const TopMenu = () => {
  const menuItems = useMenu();

  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLButtonElement | HTMLElement>,
    itemTitle: string,
  ) => {
    setOpenMenu(itemTitle);
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
    setAnchorEl(null);
  };

  return (
    <Grid container columnGap={5}>
      {menuItems
        .filter((item) => !item.hide)
        .map((item, index) => (
          <div
            key={index}
            onMouseEnter={(e) => handleMouseEnter(e, item.title)}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <NavLink
              to={item.route}
              style={({ isActive }) => ({
                pointerEvents: item.disabled ? "none" : "auto",
                textDecoration: isActive ? "underline" : "none",
                textDecorationColor: theme.palette.common.white,
                fontWeight: isActive ? "bold" : "normal",
                letterSpacing: isActive ? ".5px" : "0px",
                textUnderlineOffset: "15px",
                textDecorationThickness: "1.5px",
                borderBottom: isActive ? "1px solid white" : "none",
                color: item.disabled
                  ? theme.palette.grey[500]
                  : isActive
                    ? theme.palette.common.white
                    : alpha(theme.palette.common.white, 0.7),
                display: "inline-block",
                background: isActive ? alpha("#093D71", 0.5) : "inherit",
                borderRadius: "6px 6px 0px 0px",
              })}
            >
              <ButtonBase>
                <Typography
                  variant="bodySmall"
                  color={theme.palette.common.white}
                  sx={{
                    padding: "4px",
                  }}
                >
                  {item.title}
                </Typography>
                <KeyboardArrowDownIcon
                  fontSize="small"
                  sx={{ color: "white" }}
                />
              </ButtonBase>
            </NavLink>
            <Menu
              id={item.title}
              anchorEl={openMenu === item.title ? anchorEl : null}
              open={openMenu === item.title}
              onClose={handleMouseLeave}
              MenuListProps={{
                onMouseLeave: handleMouseLeave,
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {item.menuList.map((menu) => (
                <MenuItem key={menu.name} onClick={() => setOpenMenu(null)}>
                  <Link
                    style={{
                      color: theme.palette.common.black,
                      textDecoration: "none",
                      cursor: "pointer",
                      width: "100%",
                    }}
                    to={menu.path}
                  >
                    <Typography variant="bodySmall">{menu.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </div>
        ))}
    </Grid>
  );
};

export default TopMenu;
