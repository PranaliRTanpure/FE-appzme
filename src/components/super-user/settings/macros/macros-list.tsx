// import React from 'react'
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import { Grid } from "@mui/system";

import CustomButton from "@/common-components/button-outlined/custom-button";

const MacrosList = () => {
  return (
    <Grid container width={"100%"} flexDirection={"column"} rowGap={3}>
      {/* Grid 1 */}
      <Grid container width={"100%"} justifyContent={"space-between"}>
        <Grid alignContent={"center"}>
          <Typography variant="bodyMedium" fontWeight={500}>
            Macros
          </Typography>
        </Grid>
        <Grid>
          <CustomButton text="Create Macro" onClick={() => {}} variant="contained" startIcon={<AddIcon />} />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default MacrosList;
