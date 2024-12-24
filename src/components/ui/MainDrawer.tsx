import { PropsWithChildren, ReactNode, useRef } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Box,
  Drawer,
  Grid2 as Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useDrawer } from "../../hooks/useDrawer";
import { theme } from "../../utils/theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { customLabelStyles } from "@/common-components/custom-label/widgets/custom-label-styles";

interface MainDrawerProps {
  drawerWidth?: string;
  anchor?: "left" | "top" | "right" | "bottom";
  content?: ReactNode;
  showCloseButton?: boolean;
  showMandatoryIndicator?: boolean;
}

const MainDrawer = ({
  drawerWidth,
  anchor,
  content,
  showCloseButton = false,
  showMandatoryIndicator = false,
}: PropsWithChildren<MainDrawerProps>) => {
  const { isOpen, content: contentDrawer, close } = useDrawer();
  const belowLg = useMediaQuery(theme.breakpoints.down("lg"));
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <Drawer
      anchor={anchor}
      open={isOpen}
      PaperProps={{
        sx: {
          // width: belowLg ? "100%" : drawerWidth,
          width: drawerWidth ? drawerWidth : belowLg ? "50vw" : "40vw",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Grid
          container
          ref={headerRef}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
            padding: 2,
            paddingLeft: 3,
          }}
        >
          <Grid container columnGap={1.5}>
            <IconButton onClick={close}>
              <ArrowBackIcon />
            </IconButton>
            <Typography
              fontWeight={550}
              variant="bodyLarge"
              alignContent={"center"}
            >
              {contentDrawer.title}
            </Typography>
          </Grid>

          <Grid>
            {/* <IconButton onClick={close} size="small">
              <CloseOutlinedIcon />
            </IconButton> */}

            {showCloseButton && (
              <Grid>
                <IconButton onClick={close}>
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
        </Grid>
        <Grid
          container
          sx={{
            height: `calc(100vh - ${headerRef.current?.offsetHeight ?? 0}px)`,
            overflow: "hidden",
          }}
        >
          {content}
        </Grid>
      </Box>
    </Drawer>
  );
};

export default MainDrawer;
