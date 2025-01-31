import { useCallback, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Typography } from "@mui/material";
import { Grid } from "@mui/system";

import CustomButton from "@/common-components/button-outlined/custom-button";
import Switcher from "@/common-components/switcher/switcher";

import MainDrawer from "@/components/ui/MainDrawer";
import { useDrawer } from "@/hooks/useDrawer";
import { theme } from "@/utils/theme";

import ProviderForm from "../../add-provider-form";
import AddStaffForm from "../../add-staff-form";
import MSLProviderList from "./msl-provider-list";
import MSLStaffList from "./msl-staff-list";

const widthOfTitle = "180px";

export const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Grid container>
    <Typography width={widthOfTitle} color="#9B9D9F" variant="bodySmall">
      {label} &nbsp;&nbsp;:&nbsp;
    </Typography>
    <Typography variant="bodySmall">{value}</Typography>
  </Grid>
);

const MSLDetails = () => {
  const [selectedOpt, setSelectedOpt] = useState<"Providers" | "Staff">("Providers");
  const handleSwitcherChange = useCallback((option: "Providers" | "Staff") => {
    setSelectedOpt(option);
  }, []);

  const { open: openDrawer, close: closeDrawer, content: contentDrawer } = useDrawer();

  const handleDrawer = {
    settingsProviderForm: (action: string) => {
      // setIsEdit(action === "Edit");
      openDrawer({
        title: `${action} Provider`,
        identifier: "drawer-setting-msl-provider-form",
      });
    },
    settingsStaffForm: (action: string) => {
      openDrawer({
        title: `${action} Staff`,
        identifier: "drawer-settings-msl-staff-form",
      });
    },
  };

  const DrawerContent = () => {
    switch (contentDrawer.identifier) {
      case "drawer-setting-msl-provider-form":
        return <ProviderForm handleDrawerClose={closeDrawer} />;
      case "drawer-settings-msl-staff-form":
        return <AddStaffForm handleDrawerClose={closeDrawer} />;
      default:
        return <div />;
    }
  };

  const getDrawerProps = () => {
    switch (contentDrawer.identifier) {
      case "drawer-settings-msl-staff-form":
        return {
          drawerWidth: "950px",
          anchor: "right" as "right",
          showSecondButton: false,
          showMandatoryIndicator: true,
        };
      case "drawer-setting-msl-provider-form":
        return {
          // drawerWidth: below1024 ? "1023px" : "1000px",
          drawerWidth: "1020px",
          anchor: "right" as "right",
          showSecondButton: false,
          showMandatoryIndicator: true,
        };

      default:
        return {
          drawerWidth: "800px",
          anchor: "right" as "right",
          showSecondButton: false,
          showMandatoryIndicator: false,
        };
    }
  };

  const handleAddProvider = () => {
    handleDrawer.settingsProviderForm("Add");
  };

  const handleAddStaff = () => {
    handleDrawer.settingsStaffForm("Add");
  };
  return (
    <>
      <MainDrawer content={<DrawerContent />} {...getDrawerProps()} />

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
              Millennium Sleep Labs
            </Typography>
            <CustomButton
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              text="Edit Details"
              onClick={() => undefined}
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
        <Grid container width={"100%"} flexDirection={"column"} rowGap={1}>
          <Grid width={"100%"} container justifyContent={"space-between"}>
            <Switcher
              options={["Providers", "Staff"]}
              buttonWidth={"100px"}
              variant={"light"}
              onChange={function (option: string): void {
                handleSwitcherChange(option as "Providers" | "Staff");
              }}
            />
            <CustomButton
              sx={{ minWidth: "137px", mr: 1.5 }}
              onClick={selectedOpt === "Providers" ? handleAddProvider : handleAddStaff}
              text={selectedOpt === "Providers" ? "Add Provider" : "Add Staff"}
              variant="contained"
              startIcon={<AddIcon />}
            />
          </Grid>
          {selectedOpt === "Providers" && <MSLProviderList />}
          {selectedOpt === "Staff" && <MSLStaffList />}
        </Grid>
      </Grid>
    </>
  );
};
export default MSLDetails;
