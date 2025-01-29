import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import {
  Dialog,
  DialogActions,
  DialogContent,
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { Grid, alpha } from "@mui/system";

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
  const [inputValue, setInputValue] = useState<string>();

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

  const { data, isLoading } = useSelector((state: RootState) => state.profileReducer);

  useEffect(() => {
    dispatch(fetchProfileData(xTenantIdVal));
  }, [dispatch, xTenantIdVal]);

  const profileData = data as Provider;

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: `${theme.palette.primary.main}`,
        height: "40px",
      }}
    >
      <Toolbar variant="dense" sx={toolBarContainer}>
        <Grid container alignItems={"center"} width={"100%"}>
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
          <Grid flex={1} container justifyContent={"flex-end"}>
            <Grid columnGap={1.5} container>
              <Grid maxHeight={"100%"}>
                <InputBase
                  fullWidth
                  className="popper-area"
                  name={"search"}
                  type={"text"}
                  placeholder={"Search Patient"}
                  value={inputValue}
                  sx={{
                    maxHeight: "80%",
                    background: "#274059",
                    height: "40px",
                    ...inputStyles.textFieldRoot,
                    ...inputStyles.textFieldInput,
                  }}
                  onChange={handleInputChange}
                  autoComplete="false"
                  classes={{
                    root: `${inputStyles.textFieldRoot}`,
                    input: `${inputStyles.textFieldInput}`,
                    error: `${inputStyles.textFieldError}`,
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.palette.common.white, ml: "10px" }} />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid>
                <CustomButton
                  sx={{ height: "80%" }}
                  variant="contained"
                  text={"Add Patient"}
                  startIcon={<AddIcon />}
                  onClick={function (): void {
                    navigate(`/super-user/patient-registration`);
                  }}
                ></CustomButton>
              </Grid>

              <IconButton sx={{ height: "80%" }}>
                <MenuBookIcon
                  sx={{
                    color: theme.palette.common.white,
                    width: "18px",
                    height: "18px",
                  }}
                />
              </IconButton>
              <Grid container columnGap={1.5} height={"80%"}>
                <Grid container justifyContent={"center"} alignContent={"center"}>
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
                    <Dialog open={logoutDialogOpen} onClose={handleLogoutDialogClose}>
                      <DialogContent
                        style={{
                          width: "400px",
                          padding: "0 20px 20px 20px",
                        }}
                      >
                        <Grid container flexDirection={"column"}>
                          <Typography textAlign={"left"} variant="h5" fontWeight={550} mt={2}>
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
                          <CustomButton variant={"outlined"} text={"Cancel"} onClick={handleLogoutDialogClose} />
                        </Grid>
                        <Grid>
                          <CustomButton variant={"contained"} text={"Yes"} onClick={logoutHandler} />
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
                  <KeyboardArrowDownOutlinedIcon sx={{ height: "20px", width: "20px" }} />
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

const inputStyles = {
  textFieldRoot: {
    border: `1px solid ${alpha(theme.palette.grey[500], 0.3)}`,
    borderRadius: "12px",
  },
  textFieldInput: {
    color: theme.palette.common.white,
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "130%",
    letterSpacing: "0.12px",

    "&::placeholder": {
      fontSize: "10px",
      fontStyle: "inter sans-serif",
      fontWeight: "400",
    },
  },

  textFieldError: {
    border: `1px solid red`,
  },
};
