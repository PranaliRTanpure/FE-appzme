import React, { useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";

import { yupResolver } from "@hookform/resolvers/yup";

import DrawerBody from "@/components/ui/DrawerBody";
import { theme } from "@/utils/theme";

import { addSiClinicSchema } from "./si-clinic-dialog-schema";

interface SiClinicProps {
  handleDrawerClose: () => void;
}

const SiClinicDialog = (props: SiClinicProps) => {
  const [height, setHeight] = useState(0);

  const initialValues = {
    locationId: "",
    locationName: "",
    taxId: "",
    taxType: "",
    status: "",
    contactNumber: "",
    noShowCharges: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: "",
    },
  };

  const {
    // control,
    // setValue,
    handleSubmit,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(addSiClinicSchema),
  });

  const onSubmit = (data: FieldValues) => {
    data;
    props.handleDrawerClose;
  };

  const footerRef = useCallback(
    (
      node: {
        getBoundingClientRect: () => {
          height: React.SetStateAction<number>;
        };
      } | null
    ) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
      }
    },
    []
  );
  return (
    <DrawerBody padding={3} offset={height}>
      <Grid width={"100%"} height={"100%"}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%", width: "100%" }}>
          <Grid container width={"100%"} height={"100%"} flexDirection={"column"}>
            {/* Form */}
            <Grid container width={"100%"} flexDirection={"column"} rowGap={2} pb={1.5}>
              hi form
            </Grid>
            {/* Button Grid */}
            <Box
              ref={footerRef}
              sx={{
                width: "100%",
                backgroundColor: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.divider}`,
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: "20px 24px",
              }}
            >
              <Grid container justifyContent={"flex-end"}>
                <Grid container columnGap={1}>
                  <Button onClick={props.handleDrawerClose} variant="outlined" type="button">
                    <Typography variant="bodySmall">Cancel</Typography>
                  </Button>
                  <Button variant="contained" type="submit">
                    <Typography variant="bodySmall">{"Add"}</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </form>
      </Grid>
    </DrawerBody>
  );
};
export default SiClinicDialog;
