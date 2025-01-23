import CustomButton from "@/common-components/button-outlined/custom-button";
import { useDrawer } from "@/hooks/useDrawer";
import { Grid } from "@mui/system";
import AddStaffForm from "./add-staff-form";
import MainDrawer from "@/components/ui/MainDrawer";

const ProviderUserSettings = () => {
  const {
    open: openDrawer,
    close: closeDrawer,
    content: contentDrawer,
  } = useDrawer();

  const handleDrawer = {
    addStaffForm: (action: string) => {
      openDrawer({
        title: `${action} Staff`,
        identifier: "drawer-settings-add-staff-form",
      });
    },
  };

  const DrawerContent = () => {
    switch (contentDrawer.identifier) {
      case "drawer-settings-add-staff-form":
        return <AddStaffForm handleDrawerClose={closeDrawer} />;
      default:
        return <div />;
    }
  };
  return (
    <>
      <MainDrawer
        content={<DrawerContent />}
        drawerWidth={"1000px"}
        anchor="right"
        showSecondButton={false}
        showMandatoryIndicator={true}
      />
      <Grid
        container
        width={"100%"}
        height={"100%"}
        border={1}
        alignItems={"center"}
        justifyContent={"center"}
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
      </Grid>
    </>
  );
};
export default ProviderUserSettings;
