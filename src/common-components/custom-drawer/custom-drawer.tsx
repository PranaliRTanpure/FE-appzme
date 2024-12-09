import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Drawer, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Grid } from "@mui/system";
import { theme } from "../../utils/theme";
import { gridHeader } from "./custom-drawer.widgets";
import React from "react";

interface DrawerProps {
  anchor: "left" | "top" | "right" | "bottom";
  open: boolean;
  title: string;
  drawerWidth?: string;
  drawerPadding?: string;
  onClose: () => void;
  headerStyle?: string;
}

const CustomDrawer = (props: React.PropsWithChildren<DrawerProps>) => {
  const { drawerWidth, drawerPadding } = props;
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
          <Grid>
            <Typography fontSize={"20px"} fontWeight={550} variant="bodyMedium">
              {props.title}
            </Typography>
          </Grid>
          <Grid>
            <IconButton onClick={props.onClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          mt={2}
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
