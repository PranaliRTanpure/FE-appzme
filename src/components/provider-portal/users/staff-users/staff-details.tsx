import { Avatar, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Logo from "../../../../assets/image_svg/icons/default-image.svg";
import { AlertSeverity } from "../../../../common-components/snackbar-alert/snackbar-alert";
import Status from "../../../../common-components/status/status";
import { ErrorResponseEntity } from "../../../../models/response/error-response";
import { setSnackbarOn } from "../../../../redux/actions/snackbar-action";
import {
  Provider,
  ProviderControllerService,
  User,
  UserControllerService,
} from "../../../../sdk/requests";
import { GetTenantId } from "../../../../services/common/get-tenant-id";
import { toCamelCase } from "../../../../utils/toCamelCase";
import { Roles } from "../../../../constants/roles";

type StaffDetailsProps = {
  staffDetails: User;
  role: string;
  nurseDetails: Provider;
  nurseType: string;
};

const StaffDetails = (props: StaffDetailsProps) => {
  const { staffDetails, role, nurseDetails, nurseType } = props;

  const xTenantId = GetTenantId();
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  const getStaffProfile = async () => {
    let usersID = staffDetails?.uuid || nurseDetails?.uuid;
    if (!usersID) {
      return;
    }

    if (role === "Nurse" || role === "Provider") {
      return;
    }

    try {
      let response = UserControllerService.getUser({
        userId: usersID,
        xTenantId: xTenantId,
      });
      if (response) {
        let allData = (await response).data as User;
        setAvatar(allData.avatar || "");
      }
    } catch (error) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: (error as ErrorResponseEntity).body.message,
        })
      );
    }
  };

  const getProviderProfile = async () => {
    if (role !== "Nurse" && role !== "Provider") {
      return;
    }

    try {
      let response = ProviderControllerService.getProviderById({
        providerUuid: nurseDetails?.uuid as string,
        xTenantId:
          role === "Provider"
            ? xTenantId
            : role === "Nurse" && nurseType === "EXTERNAL"
              ? "apZme"
              : xTenantId,
      });
      if (response) {
        let allData = (await response).data as Provider;
        setAvatar(allData.avatar || "");
      }
    } catch (error) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: (error as ErrorResponseEntity).body.message,
        })
      );
    }
  };

  useEffect(() => {
    getProviderProfile();
    getStaffProfile();
  }, [staffDetails, nurseDetails]);

  return (
    <Grid width={"100%"}>
      {role !== "Nurse" && role !== "Provider" && (
        <Grid container>
          <Grid width={"80px"}>
            {avatar ? (
              <Avatar style={{ width: "80px", height: "80px" }} src={avatar} />
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box width={"fit-content"} component={"img"} src={Logo}></Box>
              </Box>
            )}
          </Grid>
          <Grid flex={1} rowGap={4} container flexDirection={"column"}>
            <Grid
              flex={1}
              p={"0px 20px"}
              container
              justifyContent={"space-between"}
            >
              {/* background: #515C5F; */}

              <Grid container flexDirection={"column"} rowGap={1}>
                <Typography variant="bodySmall" color="#515C5F">
                  Name
                </Typography>
                <Typography variant="bodyMedium">
                  {staffDetails.firstName + " " + staffDetails.lastName || "-"}
                </Typography>
              </Grid>

              <Grid container flexDirection={"column"} rowGap={1}>
                <Typography variant="bodySmall" color="#515C5F">
                  Role
                </Typography>
                <Typography variant="bodyMedium">
                  {toCamelCase(staffDetails.role || "") || "-"}
                </Typography>
              </Grid>
              <Grid container flexDirection={"column"} rowGap={1}>
                {/* <Typography variant="bodySmall" color="#515C5F">
								Status
							</Typography> */}
                <Status
                  status={staffDetails?.active ? "ACTIVE" : "INACTIVE"}
                  width="fit-content"
                />
              </Grid>
            </Grid>
            <Grid
              flex={1}
              p={"0px 20px"}
              container
              justifyContent={"space-between"}
            >
              {/* background: #515C5F; */}

              <Grid container flexDirection={"column"} rowGap={1}>
                <Typography variant="bodySmall" color="#515C5F">
                  Phone
                </Typography>
                <Typography variant="bodyMedium">
                  {staffDetails.phone || "-"}
                </Typography>
              </Grid>

              <Grid container flexDirection={"column"} rowGap={1}>
                <Typography variant="bodySmall" color="#515C5F">
                  Email
                </Typography>
                <Typography variant="bodyMedium">
                  {staffDetails.email || "-"}
                </Typography>
              </Grid>
              <Grid container flexDirection={"column"} rowGap={1}>
                <Typography variant="bodySmall" color="#515C5F">
                  Gender
                </Typography>
                <Typography variant="bodyMedium">
                  {toCamelCase(staffDetails.gender || "") || "-"}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              flex={1}
              p={"0px 20px"}
              container
              justifyContent={"space-between"}
            >
              {/* background: #515C5F; */}
              {staffDetails.role === Roles.SITE_ADMIN && (
                <Grid container flexDirection={"column"} rowGap={1}>
                  <Typography variant="bodySmall" color="#515C5F">
                    Location
                  </Typography>
                  <Typography variant="bodyMedium">
                    {toCamelCase(staffDetails.locationName || "") || "-"}
                  </Typography>
                </Grid>
              )}

              <Grid container flexDirection={"column"} rowGap={1}>
                <Typography variant="bodySmall" color="#515C5F">
                  Address
                </Typography>
                <Typography variant="bodyMedium">
                  {staffDetails.address?.line1
                    ? `${staffDetails?.address?.line1 || "-"},  ${staffDetails?.address?.line2 || "-"},
								 ${staffDetails?.address?.city || "-"}, ${staffDetails?.address?.state || "-"},
								  ${staffDetails?.address?.country || "-"}, ${staffDetails?.address?.zipcode || "-"}`
                    : "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      {(role === "Nurse" || role === "Provider") && (
        <Grid container>
          <Grid width={"80px"}>
            {nurseDetails?.avatar ? (
              <Avatar style={{ width: "80px", height: "80px" }} src={avatar} />
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box width={"fit-content"} component={"img"} src={Logo}></Box>
              </Box>
            )}
          </Grid>
          <Grid flex={1} rowGap={4} container flexDirection={"column"}>
            <Grid
              flex={1}
              p={"0px 20px"}
              container
              justifyContent={"space-between"}
            >
              {/* background: #515C5F; */}

              <Grid container flexDirection={"column"} rowGap={1}>
                <Typography variant="bodySmall" color="#515C5F">
                  Name
                </Typography>
                <Typography variant="bodyMedium">
                  {nurseDetails?.firstName + " " + nurseDetails?.lastName ||
                    "-"}
                </Typography>
              </Grid>

              <Grid container flexDirection={"column"} rowGap={1}>
                <Typography variant="bodySmall" color="#515C5F">
                  Role
                </Typography>
                <Typography variant="bodyMedium">
                  {toCamelCase(nurseDetails?.role || "") || "-"}
                </Typography>
              </Grid>
              <Grid container flexDirection={"column"} rowGap={1}>
                {/* <Typography variant="bodySmall" color="#515C5F">
								Status
							</Typography> */}
                <Status
                  status={nurseDetails?.active ? "ACTIVE" : "INACTIVE"}
                  width="fit-content"
                />
              </Grid>
            </Grid>
            <Grid
              flex={1}
              p={"0px 20px"}
              container
              justifyContent={"space-between"}
            >
              {/* background: #515C5F; */}

              <Grid container flexDirection={"column"} rowGap={1}>
                <Typography variant="bodySmall" color="#515C5F">
                  Phone
                </Typography>
                <Typography variant="bodyMedium">
                  {nurseDetails?.phone || "-"}
                </Typography>
              </Grid>

              <Grid container flexDirection={"column"} rowGap={1}>
                <Typography variant="bodySmall" color="#515C5F">
                  Email
                </Typography>
                <Typography variant="bodyMedium">
                  {nurseDetails?.email || "-"}
                </Typography>
              </Grid>
              <Grid container flexDirection={"column"} rowGap={1}>
                <Typography variant="bodySmall" color="#515C5F">
                  Gender
                </Typography>
                <Typography variant="bodyMedium">
                  {toCamelCase(nurseDetails?.gender || "") || "-"}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              flex={1}
              p={"0px 20px"}
              container
              justifyContent={"space-between"}
            >
              {/* background: #515C5F; */}

              <Grid container flexDirection={"column"} rowGap={1}>
                <Typography variant="bodySmall" color="#515C5F">
                  Address
                </Typography>
                <Typography variant="bodyMedium">
                  {nurseDetails.address?.line1
                    ? `${nurseDetails?.address?.line1 || "-"},  ${nurseDetails?.address?.line2 || "-"},
								 ${nurseDetails?.address?.city || "-"}, ${nurseDetails?.address?.state || "-"},
								  ${nurseDetails?.address?.country || "-"}, ${nurseDetails?.address?.zipcode || "-"}`
                    : "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default StaffDetails;
