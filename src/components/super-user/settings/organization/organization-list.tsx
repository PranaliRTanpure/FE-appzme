import { useCallback, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Typography } from "@mui/material";
import { Grid } from "@mui/system";

import CustomButton from "@/common-components/button-outlined/custom-button";
import Switcher from "@/common-components/switcher/switcher";

import { theme } from "@/utils/theme";

const widthOfTitle = "180px";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Grid container>
    <Typography width={widthOfTitle} color="#9B9D9F" variant="bodySmall">
      {label} &nbsp;&nbsp;:&nbsp;
    </Typography>
    <Typography variant="bodySmall">{value}</Typography>
  </Grid>
);

const OrganizationList = () => {
  const [selectedOrg, setSelectedOrg] = useState<"MSL" | "SI">("MSL");
  selectedOrg;
  const handleSwitcherChange = useCallback((option: string) => {
    setSelectedOrg(option as "MSL" | "SI");
  }, []);

  return (
    <Grid height="100%" container flexDirection="column" width="100%" rowGap={1}>
      <Switcher options={["MSL", "SI"]} variant="light" onChange={handleSwitcherChange} buttonWidth={"100px"} />

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
            Millennium Sleep Labs
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
            <InfoRow label="Organization Name" value="Millennium Sleep Labs" />
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
      <Grid border={1} container width={"100%"} flexDirection={"column"} rowGap={1}>
        <Switcher
          options={["Providers", "Staff"]}
          buttonWidth={"100px"}
          variant={"light"}
          onChange={function (option: string): void {
            option;
          }}
        />
        <Grid>asfh</Grid>
      </Grid>
    </Grid>
  );
};

export default OrganizationList;
