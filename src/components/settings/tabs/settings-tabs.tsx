import { Tab, Tabs } from "@mui/material";
import { Grid } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import CustomDrawer from "../../../common-components/custom-drawer/custom-drawer";
import {
  CustomTabPanel,
  a11yProps,
} from "../../../common-components/custom-tab/custom-tab";
import { setIsLoading } from "../../../redux/actions/loader-action";
import {
  ProviderGroup,
  ProviderGroupControllerService,
} from "../../../sdk/requests";
import LocationList from "../../provider-portal/locations/location-list";
import ConsentForm from "../../provider-portal/consent-forms/consent-forms-list";
import useAuthority from "../../../hooks/use-authority";

const tabLabels = [
  "Locations",
  "Medical Codes",
  "Consent Forms",
  "Care Plans",
  "Drug Library",
];

const SettingsTabs = () => {
  // const navigate = useNavigate();
  const { isProvider } = useAuthority();
  const [value, setValue] = useState(0);
  const location = useLocation();
  const [providerGroup, setProviderGroup] = useState<ProviderGroup>(
    {} as ProviderGroup,
  );
  const dispatch = useDispatch();
  const providerGroupDetails = (location.state?.providerGroup ||
    {}) as ProviderGroup;
  const [openAddPGDialog, setOpenAddPGDialog] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    event;
  };

  // const handleOnClickLink = async () => {
  // 	window.open(providerGroup.subdomain);
  // };

  const {
    data,
    //  isPending,
    isSuccess,
    isLoading,
    // refetch,
    //
    isRefetching,
    // error,
    // isError,
  } = useQuery({
    queryKey: ["pg-by-id", providerGroupDetails?.uuid],
    queryFn: () =>
      ProviderGroupControllerService.getProviderGroupById({
        providerGroupId: providerGroupDetails.uuid || "",
      }),
    enabled: !!providerGroupDetails?.uuid,
  });

  useEffect(() => {
    if (isSuccess) {
      setProviderGroup((data as unknown as AxiosResponse).data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    dispatch(setIsLoading(isLoading || isRefetching));
  }, [dispatch, isLoading, isRefetching]);

  return (
    <Grid
      height={"100%"}
      p={2}
      width={"100%"}
      maxWidth={"100%"}
      overflow={"auto"}
    >
      <Grid
        height={"100%"}
        borderRadius={"8px"}
        container
        flexDirection={"column"}
      >
        <Grid>
          <Grid sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              {tabLabels
                .filter((label) => !(isProvider && label === "Locations"))
                .map((item, index) => (
                  <Tab
                    sx={{ textTransform: "none", fontWeight: 550 }}
                    key={index}
                    label={item}
                    {...a11yProps(0)}
                  />
                ))}
            </Tabs>
          </Grid>
          <Grid flex={1}>
            {tabLabels
              .filter((label) => !(isProvider && label === "Locations"))
              .map((item, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                  {item === "Locations" && <LocationList />}
                  {item === "Consent Forms" && <ConsentForm />}
                </CustomTabPanel>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <CustomDrawer
        anchor={"right"}
        open={openAddPGDialog}
        title={` ${providerGroup?.name ? providerGroup?.name + ": Edit Details" : "Edit Details"}`}
        onClose={() => setOpenAddPGDialog(false)}
      >
        <>HEllo</>
      </CustomDrawer>
    </Grid>
  );
};

export default SettingsTabs;
