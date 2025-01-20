import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import {
  Dialog,
  DialogActions,
  DialogContent,
  // Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../../assets/image_svg/icons/account_circle.svg";
import Logo from "../../assets/image_svg/logo/navbar_logo.svg";
import useLogout from "../../hooks/use-logout";
import { setIsLoading } from "../../redux/actions/loader-action";
import { fetchProfileData } from "../../redux/actions/profile-async-actions";
import { AppDispatch, RootState } from "../../redux/store";
import { Provider } from "../../sdk/requests";
import { GetTenantId } from "../../services/common/get-tenant-id";
import { theme } from "../../utils/theme";
import CustomButton from "../button-outlined/custom-button";
import TopMenu from "./top-menu";

export const toolBarContainer = {
  maxHeight: "40px",
};

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleProfileClick = () => {
    navigate("settings/profile");
  };
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const handleLogoutDialogOpen = () => {
    setMenuOpen(false);
    setLogoutDialogOpen(true);
  };
  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  const logoutHandler = useLogout();
  const dispatch = useDispatch<AppDispatch>();
  const xTenantIdVal = GetTenantId();

  const { data, isLoading } = useSelector(
    (state: RootState) => state.profileReducer,
  );

  useEffect(() => {
    dispatch(fetchProfileData(xTenantIdVal));
  }, [dispatch, xTenantIdVal]);

  const profileData = data as Provider;

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: `${theme.palette.primary.main}`,
        height: "40px",
      }}
    >
      <Toolbar variant="dense" sx={toolBarContainer}>
        <Grid container width={"100%"}>
          <Grid
            width={"fit-content"}
            container
            height={"100%"}
            alignContent={"center"}
            justifyContent={"center"}
            mb={"7px"}
          >
            <Box component={"img"} src={Logo} height={"25px"}></Box>
          </Grid>
          <Grid ml={10}>
            <TopMenu />
          </Grid>
          <Grid flex={1} container justifyContent={"flex-end"} mb={0.5}>
            <Grid columnGap={3.5} container>
              <Grid container columnGap={4}>
                <IconButton
                  sx={{
                    padding: "0px",
                    color: theme.palette.common.white,
                  }}
                >
                  <SearchIcon sx={{ height: "20px", width: "20px" }} />
                </IconButton>
                <IconButton
                  sx={{
                    padding: "0px",
                    color: theme.palette.common.white,
                  }}
                >
                  <HelpOutlineOutlinedIcon
                    sx={{ height: "20px", width: "20px" }}
                  />
                </IconButton>
                <IconButton
                  sx={{ padding: "0px", color: theme.palette.common.white }}
                >
                  <NotificationsNoneIcon
                    sx={{ height: "20px", width: "20px" }}
                  />
                </IconButton>
              </Grid>
              {/* <Divider
                sx={{
                  margin: "2px",
                  background: theme.palette.common.white,
                }}
                orientation="vertical"
                variant="middle"
                flexItem
              /> */}
              <Grid container columnGap={1.5}>
                <Grid
                  container
                  justifyContent={"center"}
                  alignContent={"center"}
                >
                  <Grid>
                    <Avatar
                      src={profileData?.avatar}
                      style={{
                        cursor: "pointer",
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={(event) => {
                        setAnchorEl(event.currentTarget);
                        setMenuOpen(true);
                      }}
                    />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={menuOpen}
                      onClose={() => setMenuOpen(false)}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleProfileClick}>
                        <img
                          src={profileData?.avatar || ProfileImage}
                          width={"20px"}
                          height={"20px"}
                          style={{ borderRadius: "20px" }}
                          alt="description"
                        />
                        <Typography ml={1}>Profile</Typography>
                      </MenuItem>

                      <MenuItem onClick={handleLogoutDialogOpen}>
                        <LogoutIcon style={{ width: "18px", height: "18px" }} />
                        <Typography ml={1}>Logout</Typography>
                      </MenuItem>
                    </Menu>
                    <Dialog
                      open={logoutDialogOpen}
                      onClose={handleLogoutDialogClose}
                    >
                      <DialogContent
                        style={{
                          width: "400px",
                          padding: "0 20px 20px 20px",
                        }}
                      >
                        <Grid container flexDirection={"column"}>
                          <Typography
                            textAlign={"left"}
                            variant="h5"
                            fontWeight={550}
                            mt={2}
                          >
                            Logging Out
                          </Typography>
                          <Typography variant="bodyMedium" mt={1}>
                            Are you sure you want to Log Out?
                          </Typography>
                        </Grid>
                      </DialogContent>
                      <DialogActions
                        sx={{
                          display: "flex",
                          padding: " 0  20px 20px 20px",
                        }}
                      >
                        <Grid>
                          <CustomButton
                            variant={"outlined"}
                            text={"Cancel"}
                            onClick={handleLogoutDialogClose}
                          />
                        </Grid>
                        <Grid>
                          <CustomButton
                            variant={"contained"}
                            text={"Yes"}
                            onClick={logoutHandler}
                          />
                        </Grid>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
                <Grid container alignItems={"center"} justifyContent={"center"}>
                  <Typography sx={{ fontSize: "14px" }}>John Doe</Typography>
                </Grid>
                <IconButton
                  sx={{
                    padding: "0px",
                    color: theme.palette.common.white,
                  }}
                >
                  <KeyboardArrowDownOutlinedIcon
                    sx={{ height: "20px", width: "20px" }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
