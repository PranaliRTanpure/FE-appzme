import { Avatar, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import HeightOutlinedIcon from "@mui/icons-material/HeightOutlined";
import MonitorWeightOutlinedIcon from "@mui/icons-material/MonitorWeightOutlined";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";

const InterpretationNote = () => {
  return (
    <Grid container width={"100%"} p={2}>
      <Grid container width={"100%"} bgcolor={"#E1E6F3"} borderRadius={5} p={2}>
        {/* Block 1 */}
        <Grid container width={"50%"} columnSpacing={3} border={0}>
          <Grid container alignContent={"center"}>
            <Avatar variant="circular" sx={{ width: "76px", height: "76px" }} />
          </Grid>
          <Grid container flexDirection={"column"} rowGap={1.5}>
            <Grid>
              <Typography variant="bodyMedium" fontWeight={600}>
                Martinez Sheila(F){" "}
                <span style={{ fontSize: "12px", fontWeight: "400" }}>
                  msl-SM-192
                </span>
              </Typography>
              <br />
              <Typography variant="bodySmall">
                martine.sh@example.com
              </Typography>
            </Grid>
            <Grid container flexDirection={"column"} rowSpacing={1}>
              <Grid
                container
                justifyContent={"space-between"}
                columnSpacing={6}
              >
                <Grid container columnSpacing={1}>
                  <CakeOutlinedIcon
                    sx={{ fontSize: "18px", color: "#595F63" }}
                  />
                  <Typography
                    color="#595F63"
                    alignContent={"flex-end"}
                    fontSize={11}
                  >
                    1992/01/20 (32 Yrs)
                  </Typography>
                </Grid>
                <Grid container columnSpacing={1}>
                  <DarkModeOutlinedIcon
                    sx={{ fontSize: "18px", color: "#595F63" }}
                  />
                  <Typography
                    color="#595F63"
                    alignContent={"flex-end"}
                    fontSize={11}
                  >
                    2024-11-12
                  </Typography>
                </Grid>
                <Grid container columnSpacing={1}>
                  <SignalCellularAltOutlinedIcon
                    sx={{ fontSize: "18px", color: "#595F63" }}
                  />
                  <Typography
                    color="#595F63"
                    alignContent={"flex-end"}
                    fontSize={11}
                  >
                    Scoring Complete
                  </Typography>
                </Grid>
              </Grid>
              <Grid container columnSpacing={17}>
                <Grid container columnSpacing={1}>
                  <FmdGoodOutlinedIcon
                    sx={{ fontSize: "18px", color: "#595F63" }}
                  />
                  <Typography
                    color="#595F63"
                    alignContent={"flex-end"}
                    fontSize={11}
                  >
                    KS
                  </Typography>
                </Grid>
                <Grid container columnSpacing={1}>
                  <InsertInvitationOutlinedIcon
                    sx={{ fontSize: "18px", color: "#595F63" }}
                  />
                  <Typography
                    color="#595F63"
                    alignContent={"flex-end"}
                    fontSize={11}
                  >
                    HST-Ship
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Block 2 */}
        <Grid container width={"50%"} columnGap={3} border={0}>
          <Grid
            container
            flexDirection={"column"}
            bgcolor={"white"}
            borderRadius={3}
            p={2}
            rowSpacing={2}
            width={"15%"}
          >
            <Grid container columnGap={2}>
              <HeightOutlinedIcon sx={{ fontSize: "14px" }} />
              <Typography fontSize={10}>64 in</Typography>
            </Grid>
            <Grid container columnGap={2}>
              <MonitorWeightOutlinedIcon sx={{ fontSize: "14px" }} />
              <Typography fontSize={10}>127.868 lb</Typography>
            </Grid>
            <Grid container columnGap={2}>
              <ScaleOutlinedIcon sx={{ fontSize: "14px" }} />
              <Typography fontSize={10}>21.5</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            bgcolor={"white"}
            p={2}
            columnSpacing={2}
            borderRadius={3}
            width={"48%"}
          >
            <Grid container flexDirection={"column"} rowSpacing={2}>
              <Grid>
                <Typography fontSize={10} color="#515C5F">
                  Referrer:
                </Typography>
                <Typography fontSize={10}>Mary Stevens MD</Typography>
              </Grid>
              <Grid>
                <Typography fontSize={10} color="#515C5F">
                  Dental Provider:
                </Typography>
                <Typography fontSize={10}>N/A</Typography>
              </Grid>
            </Grid>
            <Grid container flexDirection={"column"} rowSpacing={2}>
              <Grid>
                <Typography fontSize={10} color="#515C5F">
                  Interpreting Physicians:
                </Typography>
                <Typography fontSize={10}>Dr. Stevens</Typography>
              </Grid>
              <Grid>
                <Typography fontSize={10} color="#515C5F">
                  Sleep Advisor/Org:
                </Typography>
                <Typography fontSize={10}>Millennium</Typography>
              </Grid>
            </Grid>
            <Grid container flexDirection={"column"} rowSpacing={2}>
              <Grid>
                <Typography fontSize={10} color="#515C5F">
                  Billing Partner:
                </Typography>
                <Typography fontSize={10}>Millennium</Typography>
              </Grid>
              <Grid>
                <Typography fontSize={10} color="#515C5F">
                  Primary Insurance:
                </Typography>
                <Typography fontSize={10}>Medicare</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            flexDirection={"column"}
            bgcolor={"white"}
            borderRadius={3}
            p={2}
            rowSpacing={2}
            width={"31.5%"}
            maxWidth={"31.5%"}
          >
            <Grid>
              <Typography fontSize={10} color="#515C5F">
                General Notes:
              </Typography>
            </Grid>
            <Grid>
              <Typography sx={{ wordBreak: "break-all" }} fontSize={10}>
                dsgydsgsfegergrewysghrhsuhsauhsahoidsuhvie
                ouwhfiewuifuoewuogjlojewljgwljelwjlojgeowajogiewpoa
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default InterpretationNote;
