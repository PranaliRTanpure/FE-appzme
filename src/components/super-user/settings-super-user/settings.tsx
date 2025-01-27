import CustomButton from "@/common-components/button-outlined/custom-button";
import { useDrawer } from "@/hooks/useDrawer";
import { Grid } from "@mui/system";
import AddStaffForm from "./add-staff-form";
import MainDrawer from "@/components/ui/MainDrawer";
import OatOrderForm from "../orders/OAT-orders/oat-order-form";
import ProviderForm from "./add-provider-form";

const ProviderUserSettings = () => {
  const {
    open: openDrawer,
    close: closeDrawer,
    content: contentDrawer,
  } = useDrawer();

  const handleDrawer = {
    addOatOrdersForm: (action: string) => {
      openDrawer({
        title: `${action} Form`,
        identifier: "drawer-oat-order-form",
      });
    },
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
      case "drawer-oat-order-form":
        return <OatOrderForm handleDrawerClose={closeDrawer} />;
      case "drawer-settings-add-provider-form":
        return <ProviderForm />;
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
      case "drawer-oat-order-form":
        return {
          drawerWidth: "1000px",
          anchor: "right" as "right",
          showSecondButton: false,
          showMandatoryIndicator: false,
        };

      case "drawer-settings-add-provider-form":
        return {
          drawerWidth: "1000px",
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
            text={"Has OAT Order"}
            onClick={() => {
              handleDrawer.addOatOrdersForm("OAT Order");
            }}
          />
        </Grid>
        <Grid>
          <CustomButton
            variant={"contained"}
            text={"Add"}
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
