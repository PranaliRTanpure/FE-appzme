import { Avatar, ButtonBase, Divider, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AdUnitsOutlinedIcon from "@mui/icons-material/AdUnitsOutlined";

interface PatientDetailsProps {
  handleClose: () => void;
  // patientDetails: any;
}

const PatientDetails = ({ handleClose }: PatientDetailsProps) => {
  // patientDetails
  return (
    <Grid container width={"100%"} flexDirection={"column"}>
      <Grid
        width={"100%"}
        container
        bgcolor={"#F4F4F4"}
        borderRadius={3}
        p={2}
        columnGap={5}
      >
        <Grid>
          <Avatar variant="circular" sx={{ width: "50px", height: "50px" }} />
        </Grid>
        <Grid container flexDirection={"column"} rowGap={1.2} border={0}>
          <Grid container columnGap={1}>
            <Typography
              variant="bodySmall"
              sx={{ "& span": { color: "#74797B" } }}
            >
              Alberta Flores <span>(9017)</span>
            </Typography>
            <Divider orientation="vertical" sx={{ width: "3px" }} />
            <Typography variant="bodySmall">14 July 1998</Typography>
            <Divider orientation="vertical" sx={{ width: "3px" }} />
            <Typography variant="bodySmall">26 yrs</Typography>
            <Divider orientation="vertical" sx={{ width: "3px" }} />
            <Typography variant="bodySmall">Female</Typography>
          </Grid>
          <Grid container columnGap={1}>
            <Grid container columnGap={0.5}>
              <EmailOutlinedIcon sx={{ fontSize: "18px", color: "#595F63" }} />
              <Typography variant="bodySmall" color="#74797B">
                (569)-888-2244
              </Typography>
            </Grid>
            <Grid container columnGap={0.5}>
              <AdUnitsOutlinedIcon
                sx={{ fontSize: "18px", color: "#595F63" }}
              />
              <Typography variant="bodySmall" color="#74797B">
                tim.jennings@example.com
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <ButtonBase sx={{ fontWeight: 600 }} onClick={handleClose}>
          <Typography variant="bodySmall" color="#106DCC" ml={1}>
            Change Patient
          </Typography>
        </ButtonBase>
      </Grid>
    </Grid>
  );
};
export default PatientDetails;
