import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
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
import { useNavigate } from "react-router-dom";
import ProfileImage from "../../assets/image_svg/icons/account_circle.svg";
import Logo from "../../assets/image_svg/logo/logo.svg";
import useLogout from "../../hooks/use-logout";
import { theme } from "../../utils/theme";
import TopMenu from "./top-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { GetTenantId } from "../../services/common/get-tenant-id";
import { setIsLoading } from "../../redux/actions/loader-action";
import { Provider } from "../../sdk/requests";
import { fetchProfileData } from "../../redux/actions/profile-async-actions";

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
      position="static"
      sx={{ backgroundColor: `${theme.palette.primary.main}`, height: "40px" }}
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
            <Grid columnGap={1.5} container>
              <IconButton
                sx={{
                  padding: "0px",
                  color: theme.palette.common.white,
                }}
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                sx={{ padding: "0px", color: theme.palette.common.white }}
              >
                <NotificationsNoneIcon />
              </IconButton>
              <Divider
                sx={{
                  margin: "2px",
                  background: theme.palette.common.white,
                }}
                orientation="vertical"
                variant="middle"
                flexItem
              />
              <Grid container justifyContent={"center"} alignContent={"center"}>
                <Grid>
                  <Avatar
                    src={profileData?.avatar}
                    style={{
                      cursor: "pointer",
                      width: "24px",
                      height: "24px",
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
                        <Button
                          onClick={handleLogoutDialogClose}
                          sx={{
                            width: "78px",
                            border: "1px solid grey",
                            height: "37px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                          }}
                        >
                          <Typography
                            color={theme.palette.common.black}
                            textTransform={"none"}
                          >
                            Cancel
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid>
                        <Button
                          variant="contained"
                          onClick={logoutHandler}
                          sx={{
                            width: "78px",
                            borderRadius: "8px",

                            fontWeight: "bold",
                          }}
                        >
                          <Typography textTransform={"none"}>Yes</Typography>
                        </Button>
                      </Grid>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
