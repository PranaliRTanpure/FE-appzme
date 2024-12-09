import {
  Avatar,
  Chip,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";
// import Logo from "../../../../assets/image_svg/icons/default-image.svg";
import TagIcon from "@mui/icons-material/Tag";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
// import { theme } from "../../../../utils/theme";
import PatientChartingTabs from "./patient-charting-tabs";
import { theme } from "../../../../utils/theme";
import TimerIcon from "../../../../assets/image_svg/icons/clockIcon.svg";
import PlayIcon from "../../../../assets/image_svg/icons/play_circle.svg";
import PauseIcon from "../../../../assets/image_svg/icons/stop_circle.svg";
import ResetIcon from "../../../../assets/image_svg/icons/replay.svg";
import HeartIcon from "../../../../assets/image_svg/icons/blood_pressure.svg";
import { useEffect, useState } from "react";
import PatientEmailDrawer from "./patient-email-drawer";
import CustomDrawer from "../../../../common-components/custom-drawer/custom-drawer";
import PatientMessageDrawer from "./patient-message-drawer";
import { useParams } from "react-router-dom";
import { Patient, PatientControllerService } from "../../../../sdk/requests";
import { GetTenantId } from "../../../../services/common/get-tenant-id";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../../../redux/actions/loader-action";
import useApiFeedback from "../../../../hooks/useApiFeedback";
import { format, parseISO } from "date-fns";

function PatientProfile() {
  const below1230 = useMediaQuery("(max-width: 1030px)");
  const below1370 = useMediaQuery("(max-width : 1370px)");
  const below1500 = useMediaQuery("(max-width : 1500px)");

  const [openEmailDrawer, setOpenEmailDrawer] = useState(false);
  const [openMessageDrawer, setOpenMessageDrawer] = useState(false);
  const [patientDetails, setPatientDetails] = useState<Patient>();
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () =>
      PatientControllerService.getPatientById({
        patientUuid: patientId || "",
        xTenantId: GetTenantId(),
      }),
    enabled: !!patientId,
  });

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || "Patient details fetched successfully") as string,
  );

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      const res = data.data as Patient;
      setPatientDetails(res);
    }
  }, [data, isSuccess]);

  // const Email = "pranali@thinkitive.com"
  // setEmail(Email)

  //Timer
  const [seconds, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinute((prevMinute) => {
              if (prevMinute === 59) {
                setHour((prevHour) => prevHour + 1);
                return 0;
              }
              return prevMinute + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handlePlayTimer = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResetTime = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinute(0);
    setHour(0);
  };

  const calculateAge = (birthDate: string) => {
    const birth = parseISO(birthDate);
    const age = new Date().getFullYear() - birth.getFullYear();
    const monthDiff = new Date().getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && new Date().getDate() < birth.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const formatTime = (value: number) => String(value).padStart(2, "0");

  return (
    <>
      <Grid
        width={"100%"}
        margin={"15px"}
        borderRadius={"5px"}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
      >
        {/* child-1 */}

        <Grid
          container
          flexWrap={"nowrap"}
          bgcolor={"#F6F8FB"}
          width={"100%"}
          height={below1230 ? "13%" : "15%"}
        >
          {/* Avatar */}
          <Grid
            container
            width={below1230 ? "5rem" : "6rem"}
            ml={"2px"}
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* {true ? ( */}
            <Avatar
              style={{
                width: below1230 ? "60px" : "80px",
                height: below1230 ? "60px" : "80px",
              }}
              src={patientDetails?.avatar}
            />
          </Grid>

          <Grid
            width={below1230 ? "25%" : "20%"}
            marginY={below1230 ? 1 : 2}
            container
            flexDirection={"row"}
            paddingLeft={"10px"}
          >
            <Grid
              display={"flex"}
              gap={2}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Typography
                fontWeight={"700"}
                color="#393939"
                fontSize={below1230 ? "13px" : "16px"}
                variant="bodyMedium"
              >
                {`${patientDetails?.firstName} ${patientDetails?.lastName}`}
              </Typography>

              <Chip
                variant="filled"
                size="medium"
                label={`Untrained`}
                sx={{
                  bgcolor: "#FFF2D2",
                  fontWeight: 700,
                  color: "#943C00",
                  fontSize: below1230 ? "10px" : "16px",
                }}
              ></Chip>
            </Grid>

            <Grid
              display={"flex"}
              mt={below1230 ? "0px" : "10px"}
              mb={3}
              columnGap={below1230 ? 1 : 2}
            >
              <Grid>
                <Typography
                  variant="bodySmall"
                  display={"flex"}
                  mb={1}
                  fontSize={below1230 ? "10px" : "14px"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                >
                  <span
                    style={{
                      // marginTop: "3px",
                      display: "flex",
                      marginRight: below1230 ? "5px" : "12px",
                      fontSize: below1230 ? "15px" : "20px",
                    }}
                  >
                    <TagIcon style={{ fontSize: "inherit" }} />
                  </span>
                  {patientDetails?.mrn}
                </Typography>
                <Typography
                  variant="bodySmall"
                  display={"flex"}
                  fontSize={below1230 ? "10px" : below1370 ? "12px" : "14px"}
                  alignItems={"center"}
                >
                  <span
                    style={{
                      marginRight: below1230 ? "5px" : "12px",
                      fontSize: below1230 ? "15px" : "20px",
                      // border: "2px solid",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CalendarTodayOutlinedIcon
                      style={{ fontSize: "inherit" }}
                    />
                  </span>{" "}
                  {patientDetails?.birthDate
                    ? `${format(parseISO(patientDetails.birthDate), "MM-dd-yyyy")} (${calculateAge(patientDetails.birthDate)} yrs)`
                    : "NA"}
                </Typography>
              </Grid>
              <Grid>
                <Tooltip title={patientDetails?.email} arrow={true}>
                  <Typography
                    mb={1}
                    variant="bodySmall"
                    display={"flex"}
                    sx={{ wordBreak: "break-word" }}
                    fontSize={below1230 ? "10px" : "14px"}
                    alignItems={"center"}
                  >
                    <span
                      style={{
                        marginRight: below1230 ? "5px" : "10px",
                        fontSize: below1230 ? "15px" : "20px",
                        // marginTop: "6px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <EmailOutlinedIcon style={{ fontSize: "inherit" }} />
                    </span>
                    <span
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {patientDetails?.email &&
                      patientDetails?.email?.length >
                        (below1500 ? 13 : below1230 ? 19 : below1370 ? 15 : 25)
                        ? `${patientDetails?.email.slice(0, below1500 ? 13 : below1230 ? 19 : below1370 ? 15 : 25)}...`
                        : patientDetails?.email}
                    </span>
                  </Typography>
                </Tooltip>
                <Typography
                  variant="bodySmall"
                  display={"flex"}
                  fontSize={below1230 ? "10px" : "14px"}
                  alignItems={"center"}
                >
                  <span
                    style={{
                      marginRight: below1230 ? "5px" : "10px",
                      fontSize: below1230 ? "15px" : "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <LocalPhoneOutlinedIcon style={{ fontSize: "inherit" }} />
                  </span>
                  {patientDetails?.mobileNumber}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            sx={{
              overflow: "auto",
              height: "100%",
              width: below1230 ? "20%" : "16%",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            <Grid
              container
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={2}
              gap={2}
            >
              <Grid
                border={"1px solid #CDD7DA"}
                sx={{
                  borderRadius: "10px",
                  width: below1230 ? "55px" : "80px",
                  cursor: "pointer",
                }}
              >
                <Typography
                  fontSize={below1230 ? "9px" : "14px"}
                  variant="bodySmall"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  onClick={() => setOpenEmailDrawer(true)}
                >
                  <span
                    style={{
                      // border: "2px solid",
                      marginRight: below1230 ? "6px" : "10px",
                      fontSize: below1230 ? "13px" : "20px",
                      marginTop: below1230 ? "2px" : "6px",
                    }}
                  >
                    <EmailOutlinedIcon style={{ fontSize: "inherit" }} />
                  </span>
                  Email
                </Typography>
              </Grid>
              <Grid
                border={"1px solid #CDD7DA"}
                sx={{
                  borderRadius: "10px",
                  width: below1230 ? "65px" : "98px",
                  cursor: "pointer",
                }}
              >
                <Typography
                  fontSize={below1230 ? "9px" : "14px"}
                  variant="bodySmall"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  onClick={() => setOpenMessageDrawer(true)}
                >
                  <span
                    style={{
                      marginRight: below1230 ? "6px" : "10px",
                      fontSize: below1230 ? "13px" : "20px",
                      marginTop: below1230 ? "2px" : "7px",
                    }}
                  >
                    <ChatOutlinedIcon style={{ fontSize: "inherit" }} />
                  </span>
                  Message
                </Typography>
              </Grid>
            </Grid>
            <Grid mt={2} display={"flex"} gap={1} alignItems={"center"} ml={3}>
              <FmdGoodOutlinedIcon fontSize="small" />
              <Typography
                variant="bodySmall"
                fontSize={below1230 ? "10px" : "14px"}
                lineHeight={"16px"}
                sx={{ wordSpacing: "5px" }}
              >
                {patientDetails?.address
                  ? [
                      patientDetails.address["line1"],
                      patientDetails.address["line2"],
                      patientDetails.address["city"],
                      patientDetails.address["state"],
                      patientDetails.address["country"],
                      patientDetails.address["zipcode"],
                    ]
                      .filter(Boolean)
                      .join(", ")
                  : ""}
              </Typography>
            </Grid>
          </Grid>

          <Grid height={"100%"} width={"11%"}>
            <Grid
              height={below1230 ? "80%" : "85%"}
              marginY={1}
              marginX={0.4}
              border={"1px solid #E8EBEC"}
              padding={"7px"}
              borderRadius={"10px"}
              bgcolor={"white"}
            >
              <Grid
                container
                gap={below1230 ? 0.5 : 1}
                flexDirection={"column"}
              >
                <Typography
                  variant="bodyMedium"
                  color="#515C5F"
                  fontSize={below1230 ? "9px" : "14px"}
                >
                  Primary Provider
                </Typography>
                <Typography
                  fontWeight={"700"}
                  color="#393939"
                  variant="bodyMedium"
                  fontSize={below1230 ? "9px" : "14px"}
                >
                  {Object.values(patientDetails?.providerId || "")}
                </Typography>
              </Grid>
              <Grid container flexDirection={"column"} gap={0.5} mt={1}>
                <Typography
                  variant="bodyMedium"
                  color="#515C5F"
                  fontSize={below1230 ? "9px" : "14px"}
                >
                  Assign Nurse
                </Typography>
                <Typography
                  fontWeight={"700"}
                  color="#393939"
                  variant="bodyMedium"
                  fontSize={below1230 ? "9px" : "14px"}
                >
                  {Object.values(patientDetails?.nurseId || "")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid height={"100%"} width={"15.5%"}>
            <Grid
              height={below1230 ? "80%" : "85%"}
              marginY={1}
              marginX={0.4}
              border={"1px solid #E8EBEC"}
              padding={"7px"}
              borderRadius={"10px"}
              bgcolor={"white"}
            >
              <Typography
                fontWeight={"700"}
                display={"flex"}
                justifyContent={"space-between"}
                color="#393939"
                fontSize={below1230 ? "10px" : "16px"}
                variant="bodyMedium"
                alignItems={"center"}
              >
                Monthly Data Compliance
                <span
                  style={{
                    width: below1230 ? "18px" : "25px",
                    height: below1230 ? "18px" : "25px",
                  }}
                >
                  <img
                    src={HeartIcon}
                    style={{
                      width: below1230 ? "18px" : "25px",
                      height: below1230 ? "18px" : "25px",
                      color: theme.palette.grey[500],
                      // border: "2px solid red"
                    }}
                  />
                </span>
              </Typography>
              <Grid mt={2} mb={below1230 ? 0.3 : 1}>
                <Typography
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  fontSize={below1230 ? "10px" : "14px"}
                >
                  <span>6</span>
                  <LinearProgress
                    sx={{
                      width: below1230 ? "70%" : "80%",
                      height: below1230 ? "4px" : "6px",
                      borderRadius: "10px",
                    }}
                    variant="determinate"
                    color="success"
                    value={40}
                  />
                  <span>16</span>
                </Typography>
              </Grid>
              <Typography color="#515C5F" fontSize={below1230 ? "8px" : "12px"}>
                06 Days of device data
              </Typography>
            </Grid>
          </Grid>
          <Grid height={"100%"} width={"15.5%"}>
            <Grid
              overflow={"hidden"}
              height={below1230 ? "80%" : "85%"}
              marginY={1}
              marginX={0.4}
              border={"1px solid #E8EBEC"}
              padding={"7px"}
              borderRadius={"10px"}
              bgcolor={"white"}
            >
              <Typography
                fontWeight={"700"}
                display={"flex"}
                justifyContent={"space-between"}
                color="#393939"
                fontSize={below1230 ? "10px" : "16px"}
                variant="bodyMedium"
                alignItems={"center"}
              >
                Billing Thresholds
                <span
                  style={{
                    width: below1230 ? "18px" : "25px",
                    height: below1230 ? "18px" : "25px",
                  }}
                >
                  <img
                    src={TimerIcon}
                    style={{
                      width: below1230 ? "18px" : "25px",
                      height: below1230 ? "18px" : "25px",
                      color: theme.palette.grey[500],
                      // border: "2px solid red"
                    }}
                  />
                </span>
              </Typography>
              <Grid mt={2} mb={1}>
                <Typography
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  fontSize={below1230 ? "10px" : "14px"}
                >
                  <span>03</span>
                  <LinearProgress
                    sx={{
                      width: below1230 ? "70%" : "80%",
                      height: below1230 ? "4px" : "6px",
                      borderRadius: "10px",
                    }}
                    variant="determinate"
                    color="success"
                    value={40}
                  />
                  <span>20</span>
                </Typography>
              </Grid>
              <Typography color="#515C5F" fontSize={below1230 ? "8px" : "12px"}>
                03 minutes reviewed in Feb
              </Typography>
            </Grid>
          </Grid>
          <Grid height={"100%"} ml={0} width={"15%"}>
            <Grid
              height={below1230 ? "80%" : "85%"}
              marginY={1}
              marginX={0.4}
              border={"1px solid #E8EBEC"}
              padding={"7px"}
              borderRadius={"10px"}
              bgcolor={"white"}
            >
              <Grid container flexDirection={"column"} gap={2}>
                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="bodyMedium"
                    fontWeight={"700"}
                    fontSize={below1230 ? "10px" : "16px"}
                    color="#393939"
                  >
                    Log Time
                  </Typography>
                  <Grid
                    pr={1}
                    mt={0.5}
                    display={"flex"}
                    gap={below1230 ? 0.5 : below1370 ? 1 : 2}
                  >
                    <Tooltip title="Start Timer" arrow>
                      <Typography
                        onClick={handlePlayTimer}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={PlayIcon}
                          style={{
                            cursor: "pointer",
                            width: below1230
                              ? "14px"
                              : below1370
                                ? "21px"
                                : "25px",
                            height: below1230
                              ? "14px"
                              : below1370
                                ? "21px"
                                : "25px",
                            color: theme.palette.grey[500],
                            // border: "2px solid red"
                          }}
                        />
                      </Typography>
                    </Tooltip>

                    <Tooltip title="Pause Timer" arrow>
                      <Typography
                        onClick={handlePause}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={PauseIcon}
                          style={{
                            width: below1230
                              ? "14px"
                              : below1370
                                ? "21px"
                                : "25px",
                            height: below1230
                              ? "14px"
                              : below1370
                                ? "21px"
                                : "25px",
                            color: theme.palette.grey[500],
                            // border: "2px solid red"
                          }}
                        />
                      </Typography>
                    </Tooltip>

                    <Tooltip title="Reset Timer" arrow>
                      <Typography
                        onClick={handleResetTime}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={ResetIcon}
                          style={{
                            width: below1230
                              ? "14px"
                              : below1370
                                ? "21px"
                                : "25px",
                            height: below1230
                              ? "14px"
                              : below1370
                                ? "21px"
                                : "25px",
                            color: theme.palette.grey[500],
                            // border: "2px solid red"
                          }}
                        />
                      </Typography>
                    </Tooltip>
                  </Grid>
                </Grid>

                <Grid
                  bgcolor={"#DCF7FF"}
                  padding={below1230 ? "6px" : "10px"}
                  borderRadius={"10px"}
                >
                  <Grid container justifyContent={"space-around"}>
                    <Typography
                      variant="bodyMedium"
                      fontWeight={"700"}
                      color="#006D8F"
                      fontSize={
                        below1230 ? "10px" : below1370 ? "18px" : "23px"
                      }
                    >
                      {formatTime(hour)}{" "}
                      <span
                        style={{
                          fontSize: below1230 ? "7px" : "12px",
                          fontWeight: "400",
                        }}
                      >
                        Hrs
                      </span>
                    </Typography>
                    <Typography
                      variant="bodyMedium"
                      fontWeight={"700"}
                      color="#006D8F"
                      fontSize={
                        below1230 ? "10px" : below1370 ? "18px" : "23px"
                      }
                    >
                      {formatTime(minute)}
                      <span
                        style={{
                          marginLeft: below1230 ? "3px" : "5px",
                          fontSize: below1230 ? "7px" : "12px",
                          fontWeight: "400",
                        }}
                      >
                        Mins
                      </span>
                    </Typography>

                    <Typography
                      variant="bodyMedium"
                      fontWeight={"700"}
                      color="#006D8F"
                      fontSize={
                        below1230 ? "10px" : below1370 ? "18px" : "23px"
                      }
                    >
                      {formatTime(seconds)}
                      <span
                        style={{
                          marginLeft: below1230 ? "3px" : "5px",
                          fontSize: below1230 ? "7px" : "12px",
                          fontWeight: "400",
                        }}
                      >
                        Secs
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <CustomDrawer
            anchor="right"
            open={openEmailDrawer}
            onClose={() => setOpenEmailDrawer(false)}
            title={"Compose Email"}
            drawerWidth="500px"
          >
            <PatientEmailDrawer />
          </CustomDrawer>
          <CustomDrawer
            anchor="right"
            open={openMessageDrawer}
            onClose={() => setOpenMessageDrawer(false)}
            title={"Message"}
            drawerWidth="500px"
          >
            <PatientMessageDrawer />
          </CustomDrawer>
        </Grid>

        {/* child-2 */}
        <Grid width={"100%"}>
          <PatientChartingTabs />
        </Grid>
      </Grid>
    </>
  );
}

export default PatientProfile;
