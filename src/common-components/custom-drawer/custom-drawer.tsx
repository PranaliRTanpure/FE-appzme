import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Drawer, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Grid } from "@mui/system";
import { theme } from "../../utils/theme";
import { gridHeader } from "./custom-drawer.widgets";
import React from "react";
import { customLabelStyles } from "../custom-label/widgets/custom-label-styles";

interface DrawerProps {
  anchor: "left" | "top" | "right" | "bottom";
  open: boolean;
  title: string;
  drawerWidth?: string;
  drawerPadding?: string;
  onClose?: () => void;
  headerStyle?: string;
  showCloseButton?: boolean;
  showMandatoryIndicator?: boolean;
  onArrowClose?: () => void;
}

const CustomDrawer = (props: React.PropsWithChildren<DrawerProps>) => {
  const {
    drawerWidth,
    drawerPadding,
    showCloseButton = true,
    showMandatoryIndicator = false,
  } = props;
  const belowLg = useMediaQuery(theme.breakpoints.down("lg")) && !drawerWidth;
  const below768 = useMediaQuery("(max-width:768px)");

  return (
    <Drawer anchor={props.anchor} open={props.open}>
      <Grid
        container
        flexDirection={"column"}
        height={"100%"}
        flexWrap={"nowrap"}
      >
        <Grid
          container
          alignItems="center"
          sx={gridHeader}
          mt={props.headerStyle}
        >
          <Grid
            container
            flexDirection={"row"}
            columnGap={1.5}
            alignItems={"center"}
          >
            <IconButton onClick={props.onArrowClose}>
              <ArrowBackIcon />
            </IconButton>
            <Typography fontSize={"20px"} fontWeight={550} variant="bodyMedium">
              {props.title}
            </Typography>
          </Grid>
          {showCloseButton && props.onClose && (
            <Grid>
              <IconButton onClick={props.onClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          )}
          {showMandatoryIndicator && (
            <Grid container columnGap={1}>
              <span style={customLabelStyles.required}>*</span>
              <Typography
                variant="bodySmall"
                sx={{ color: theme.palette.common.black }}
              >
                Indicates Mandatory Fields{" "}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid
          mt={2}
          mb={2}
          flex={1}
          sx={{
            width: drawerWidth ? drawerWidth : belowLg ? "50vw" : "40vw",
            paddingX: below768
              ? "15px"
              : drawerPadding
                ? drawerPadding
                : "20px",
          }}
        >
          {props.children}
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default CustomDrawer;
