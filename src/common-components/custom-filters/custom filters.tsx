import { theme } from "@/utils/theme";
import { ButtonBase, Modal, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import React from "react";
import CustomButton from "../button-outlined/custom-button";

interface customFiltersProps {
  onOpen: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  onApply?: () => void;
}

const CustomFilters = (props: React.PropsWithChildren<customFiltersProps>) => {
  const defaultStyle = {
    position: "absolute",
    top: "40%",
    left: "60%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: "background.paper",
    borderRadius: "5px",
  };

  const mergedStyle = { ...defaultStyle, ...props.style };

  return (
    <Grid container width={"100%"}>
      <Modal
        open={props.onOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mergedStyle} component={Grid}>
          <Grid
            container
            justifyContent={"space-between"}
            pt={2}
            pb={1}
            pr={2}
            pl={2}
            borderBottom={"1px solid #E8EBEC"}
            width={"100%"}
          >
            <Typography
              id="modal-modal-title"
              variant="bodyMedium"
              fontWeight={600}
            >
              Filters
            </Typography>
            <ButtonBase onClick={() => {}}>
              <Typography
                variant="bodySmall"
                color="#106DCC"
                sx={{
                  padding: "4px",
                }}
              >
                Clear all
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid container width={"100%"} borderBottom={"1px solid #E8EBEC"}>
            {props.children}
          </Grid>
          <Grid
            container
            p={2}
            justifyContent={"flex-end"}
            alignContent={"center"}
            columnGap={1}
            width={"100%"}
          >
            <Grid>
              <CustomButton
                variant="outlined"
                onClick={() => (props.onClick ? props.onClick() : undefined)}
                text="Cancel"
                sx={{ bgcolor: theme.palette.common.white }}
              />
            </Grid>
            <Grid>
              <CustomButton
                variant="contained"
                onClick={() => (props.onApply ? props.onApply() : undefined)}
                text="Apply"
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
};
export default CustomFilters;
