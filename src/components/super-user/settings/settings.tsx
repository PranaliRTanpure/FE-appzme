import { Grid, useMediaQuery } from "@mui/system";

import CustomButton from "@/common-components/button-outlined/custom-button";

import MainDrawer from "@/components/ui/MainDrawer";
import { useDrawer } from "@/hooks/useDrawer";

import ProviderForm from "./add-provider-form";
import AddStaffForm from "./add-staff-form";

//TODO: Delete this file later
const ProviderUserSettings = () => {
  const below1024 = useMediaQuery("(max-width:1024px)");
  const { open: openDrawer, close: closeDrawer, content: contentDrawer } = useDrawer();

  const handleDrawer = {
    addStaffForm: (action: string) => {
      openDrawer({
        title: `${action} Staff`,
        identifier: "drawer-settings-add-staff-form",
      });
    },
    addProviderForm: (action: string) => {
      openDrawer({
        title: `${action} Provider`,
        identifier: "drawer-settings-add-provider-form",
      });
    },
  };

  const DrawerContent = () => {
    switch (contentDrawer.identifier) {
      case "drawer-settings-add-staff-form":
        return <AddStaffForm handleDrawerClose={closeDrawer} />;
      case "drawer-settings-add-provider-form":
        return <ProviderForm handleDrawerClose={closeDrawer} />;
      default:
        return <div />;
    }
  };

  const getDrawerProps = () => {
    switch (contentDrawer.identifier) {
      case "drawer-settings-add-staff-form":
        return {
          drawerWidth: "1000px",
          anchor: "right" as "right",
          showSecondButton: false,
          showMandatoryIndicator: true,
        };
      case "drawer-settings-add-provider-form":
        return {
          drawerWidth: below1024 ? "1023px" : "1000px",
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
  return (
    <>
      <MainDrawer content={<DrawerContent />} {...getDrawerProps()} />
      <Grid
        container
        width={"100%"}
        height={"100%"}
        border={1}
        alignItems={"center"}
        justifyContent={"center"}
        columnGap={2}
      >
        <Grid>
          <CustomButton
            variant={"contained"}
            text={"Add Staff"}
            onClick={() => {
              handleDrawer.addStaffForm("Add");
            }}
          />
        </Grid>
        <Grid>
          <CustomButton
            variant={"contained"}
            text={"Add Provider"}
            onClick={() => {
              handleDrawer.addProviderForm("Add");
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default ProviderUserSettings;
