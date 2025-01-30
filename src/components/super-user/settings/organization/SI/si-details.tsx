import { useCallback, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Typography } from "@mui/material";
import { Grid } from "@mui/system";

import CustomButton from "@/common-components/button-outlined/custom-button";
import Switcher from "@/common-components/switcher/switcher";

import { theme } from "@/utils/theme";

import { InfoRow } from "../msl/msl-details";
import MSLProviderList from "../msl/msl-provider-list";
import SiClinicsList from "./si-clinics/si-clinics-list";

const SIDetails = () => {
  const [selectedOpt, setSelectedOpt] = useState<"Clinic" | "Staff">("Staff");
  const handleSwitcherChange = useCallback((option: "Clinic" | "Staff") => {
    setSelectedOpt(option);
  }, []);
  return (
    <Grid height="100%" container flexDirection="column" width="100%" rowGap={1}>
      <Grid
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "12px",
          bgcolor: theme.palette.common.white,
          p: 2,
        }}
        width="100%"
      >
        <Grid container alignItems="center" justifyContent="space-between" width="100%">
          <Typography variant="bodyMedium" fontWeight={500}>
            Sleep Impression Labs
          </Typography>
          <CustomButton
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            text="Edit Details"
            onClick={() => undefined} // Placeholder for actual function
          />
        </Grid>

        <Grid container mt={1} spacing={2}>
          <Grid size={6} container flexDirection="column" rowGap={2}>
            <InfoRow label="Organization Name" value="Sleep Impression Labs" />
            <InfoRow label="Contact Information" value="877-933-9470" />
            <InfoRow label="Physical Address" value="2715 Ash Dr. San Jose, South Dakota 83475" />
          </Grid>
          <Grid size={6} container flexDirection="column" rowGap={2}>
            <InfoRow label="Billing Address" value="2715 Ash Dr. San Jose, South Dakota 83475" />
            <InfoRow label="Tax ID" value="1234567890" />
            <InfoRow label="Type" value="Type" />
          </Grid>
        </Grid>
      </Grid>
      <Grid container width={"100%"} flexDirection={"column"} rowGap={1}>
        <Grid container width={"100%"} justifyContent={"space-between"}>
          <Switcher
            options={["Staff", "Clinic"]}
            buttonWidth={"100px"}
            variant={"light"}
            onChange={function (option: string): void {
              handleSwitcherChange(option as "Clinic" | "Staff");
            }}
          />
          <CustomButton
            sx={{ width: "137px", mr: 1.5 }}
            text={selectedOpt === "Clinic" ? "Add Clinic" : "Add Staff"}
            onClick={() => undefined}
            variant="contained"
            startIcon={<AddIcon />}
          />
        </Grid>
        {selectedOpt === "Clinic" && <SiClinicsList />}
        {selectedOpt === "Staff" && <MSLProviderList />}
      </Grid>
    </Grid>
  );
};

export default SIDetails;
