import CustomClickableLink from "@/common-components/custom-clickable-link/custom-clickable-link";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import {
  Button,
  ButtonBase,
  MenuItem,
  Popper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Grid, useMediaQuery } from "@mui/system";
import React, { useEffect, useState } from "react";
import { heading } from "../../../../common-components/table/common-table-widgets";
import {
  AppointmentStatusEnum,
  StatusBgColorMapping,
} from "../../../../constants/appointments-status-const";
import { theme } from "../../../../utils/theme";
import ScheduleNewDeviceForm from "./schedule-new-device-form";

const DeviceScheduling = () => {
  //14 columns for dates
  const totalDaysToBeShownInCalendar = 14;
  const belowHeight768 = useMediaQuery("(max-height:768px)");
  const [showLegends, setShowLegends] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState("");
  const [headersArray, setHeadersArray] = useState(generateHeaders(new Date()));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isFormOpen, SetIsFormOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    setSelectedMonth(currentMonth.toString());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderStatusContainers = (row: any, header: string | number) => {
    const keys = Object.keys(row);

    return keys.map((keyVal) => {
      if (new Date(keyVal).toString() !== "Invalid Date") {
        const updatedDateString = new Date(keyVal).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        });
        if (header == updatedDateString) {
          return (
            <ButtonBase
              onClick={() => alert(`On click of status  ${row[keyVal]}`)}
              sx={{
                width: "100%",
                height: "100%",
                background:
                  StatusBgColorMapping[row[keyVal] as AppointmentStatusEnum],
              }}
            ></ButtonBase>
          );
        }
      }
    });
  };

  function generateHeaders(startDate: Date) {
    const headers = [
      {
        header: "deviceName",
        subHeader: "deviceName",
        width: "260px",
        minWidth: "100px",
        maxWidth: "260px",
      },
      {
        header: "pool",
        subHeader: "pool",

        width: "108px",
        minWidth: "108px",
        maxWidth: "108px",
      },
    ] as TableHeaders[];
    for (let i = 0; i < totalDaysToBeShownInCalendar; i++) {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + i);
      headers.push({
        header: newDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        }),
      });
    }
    return headers;
  }

  const handlePrevious7Days = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
    setHeadersArray(generateHeaders(newDate));
  };

  const handleNext7Days = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
    setHeadersArray(generateHeaders(newDate));
  };

  const handleMonthChange = (e: SelectChangeEvent<string>) => {
    const month = parseInt(e.target.value);
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    newDate.setDate(1);
    setSelectedMonth(e.target.value);
    setCurrentDate(newDate);
    setHeadersArray(generateHeaders(newDate));
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setShowLegends((prev) => !prev);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      {!isFormOpen && (
        <Grid flexDirection={"column"} width={"100%"} m={2} container>
          <Grid height={"55px"} container>
            <Grid container columnGap={2} width={"368px"} alignItems={"center"}>
              <Typography variant="bodyLarge">Device Calendar</Typography>
              <Grid width={"150px"}>
                <Select
                  placeholder="Month"
                  labelId="demo-select-small-label"
                  onChange={handleMonthChange}
                  value={selectedMonth}
                  id="demo-select-small"
                  sx={{
                    minWidth: "100px",
                    height: "50px",
                    padding: "0px",
                    ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        padding: "0px",
                      },
                    boxShadow: "rgba(228, 219, 233, 0.25)",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  {monthsOptions.map((opt) => (
                    <MenuItem value={opt.value}>
                      <Typography>{opt.label}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container columnGap={2} alignItems={"center"}>
              <Button
                onClick={handlePrevious7Days}
                startIcon={<ArrowBackIosIcon sx={{ width: "12px" }} />}
                variant="outlined"
                sx={{ height: "28px" }}
              >
                Previous 7 Days
              </Button>
              <Button
                onClick={handleNext7Days}
                endIcon={<ArrowForwardIosIcon sx={{ width: "12px" }} />}
                variant="outlined"
                sx={{ height: "28px" }}
              >
                Next 7 Days
              </Button>
            </Grid>
            <Grid
              container
              flex={1}
              justifyContent={"flex-end"}
              alignItems={"center"}
              columnGap={2}
            >
              <ButtonBase onClick={handleClick}>
                <Typography
                  fontWeight={500}
                  color="#106DCC"
                  variant="bodySmall"
                >
                  {"Show Legends"}
                </Typography>
                {showLegends && (
                  <KeyboardArrowDownOutlinedIcon color="secondary" />
                )}
                {!showLegends && (
                  <KeyboardArrowUpOutlinedIcon color="secondary" />
                )}
              </ButtonBase>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                sx={{ zIndex: 1000 }}
              >
                <Box
                  sx={{
                    border: "1px solid #E7E7E7",
                    p: 1,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                  }}
                >
                  <Grid columnGap={1} container width={"80vw"} rowGap={1}>
                    {[
                      AppointmentStatusEnum.BLOCKED_DATE,
                      AppointmentStatusEnum.CONFLICTED,
                      AppointmentStatusEnum.MULTIPLE_EVENTS,
                      AppointmentStatusEnum.DEVICE_OUT_PLANNED,
                      AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
                      AppointmentStatusEnum.STUDY_FIRST_NIGHT_COMPLETED,
                      AppointmentStatusEnum.RECEIVE_DEVICE_PLANNED,
                      AppointmentStatusEnum.RETURN_DEVICE_COMPLETED,
                      AppointmentStatusEnum.RECEIVE_DEVICE_PLANNED,
                      AppointmentStatusEnum.RETURN_DEVICE_COMPLETED,
                    ].map((statusDetails) => (
                      <Grid container alignItems={"center"} columnGap={1}>
                        <Grid
                          width={"15px"}
                          height={"15px"}
                          borderRadius={"7.5px"}
                          bgcolor={StatusBgColorMapping[statusDetails]}
                        ></Grid>
                        <Typography variant="bodySmall">
                          {statusDetails}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Popper>
              <Button variant="outlined">
                <FilterAltOutlinedIcon />
              </Button>
              <Button variant="outlined">Today</Button>
              <Button
                startIcon={<AddIcon />}
                onClick={() => SetIsFormOpen(true)}
                sx={{
                  p: "0px 10px",
                  bgcolor: theme.palette.secondary.main,
                  borderRadius: "12px",
                  color: theme.palette.common.white,
                }}
              >
                Add New Schedule
              </Button>
            </Grid>
          </Grid>
          <Grid width={"100%"}>
            <TableContainer
              sx={{
                border: "1px solid #E7E7E7",
                borderRadius: "12px",
                maxHeight: belowHeight768 ? "63vh" : "85vh",
                overflowY: "auto",
              }}
            >
              <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
                <TableHead>
                  <TableRow>
                    {headersArray.map((header, index) => (
                      <TableCell
                        sx={{
                          ...heading,
                          minWidth: header.minWidth
                            ? header.minWidth
                            : "inherit",
                          maxWidth: header.maxWidth
                            ? header.maxWidth
                            : "inherit",
                          width: header.width ? header.width : "inherit",
                          // width: "80px",
                          border: "1px solid #E7E7E7",
                        }}
                        key={index}
                      >
                        <Grid
                          container
                          pl={
                            header.header !== "pool" &&
                            header.header !== "deviceName"
                              ? "0px"
                              : "10px"
                          }
                          justifyContent={
                            header.header !== "pool" &&
                            header.header !== "deviceName"
                              ? "center"
                              : "flex-start"
                          }
                        >
                          <Typography variant="bodySmall">
                            {header.header === "pool"
                              ? "Pool"
                              : header.header === "deviceName"
                                ? "Device Name"
                                : header.header}
                          </Typography>
                        </Grid>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data.map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {data &&
                            headersArray.map((column) => {
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              const value = (row as any)[column.header];
                              if (column.header === "deviceName") {
                                return (
                                  <TableCell
                                    key={index}
                                    sx={{
                                      ...colBorderCss,
                                      padding: "8px",
                                      textAlign: "left",
                                    }}
                                  >
                                    <Grid ml={1.5}>
                                      <CustomClickableLink
                                        text={value}
                                        onClick={function (): void {}}
                                      />
                                    </Grid>
                                  </TableCell>
                                );
                              }
                              if (column.header === "pool") {
                                return (
                                  <TableCell
                                    key={index}
                                    sx={{
                                      ...colBorderCss,

                                      padding: "8px",
                                      textAlign: "left",
                                      paddingLeft: "16px",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        cursor: "pointer",
                                        marginLeft: "16px",
                                      }}
                                      variant="body2"
                                    >
                                      {value}
                                    </Typography>
                                  </TableCell>
                                );
                              }
                              return (
                                <TableCell
                                  sx={{
                                    ...colBorderCss,
                                    padding: "8px",
                                    textAlign: "center",
                                    // width: "80px",
                                    height: "40px",
                                  }}
                                >
                                  {renderStatusContainers(row, column.header)}
                                </TableCell>
                              );
                            })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}

      {isFormOpen && (
        <ScheduleNewDeviceForm onClose={() => SetIsFormOpen(false)} />
      )}
    </>
  );
};

export default DeviceScheduling;

interface TableHeaders {
  header: string | number;
  width?: string;
  subHeader?: string;
  minWidth?: string;
  maxWidth?: string;
}

const data = [
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },

  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-04T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-05T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-18T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-12T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-22T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-23T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.CONFLICTED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_PLANNED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.CONFLICTED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.MULTIPLE_EVENTS,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_PLANNED,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.CONFLICTED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },

  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-04T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-05T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-18T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-12T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-22T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-23T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.CONFLICTED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_PLANNED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.CONFLICTED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.MULTIPLE_EVENTS,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_PLANNED,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.CONFLICTED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },

  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-04T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-05T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-18T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-12T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-22T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-23T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.CONFLICTED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_PLANNED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.CONFLICTED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.BLOCKED_DATE,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.MULTIPLE_EVENTS,
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_PLANNED,
    "2023-12-02T12:37:09Z": AppointmentStatusEnum.DEVICE_OUT_COMPLETED,
    "2023-12-03T12:37:09Z": AppointmentStatusEnum.CONFLICTED,
    "2023-12-11T12:37:09Z": AppointmentStatusEnum.RETURN_DEVICE_PLANNED,
    pool: "STL",
  },
];

const colBorderCss = {
  borderRight: "1px solid #E7E7E7",
};
const tableCellCss = {
  "& .MuiTableCell-sizeMedium": {
    padding: "0px !important",
  },
};

const monthsOptions = [
  { label: "January", value: "0" },
  { label: "February", value: "1" },
  { label: "March", value: "2" },
  { label: "April", value: "3" },
  { label: "May", value: "4" },
  { label: "June", value: "5" },
  { label: "July", value: "6" },
  { label: "August", value: "7" },
  { label: "September", value: "8" },
  { label: "October", value: "9" },
  { label: "November", value: "10" },
  { label: "December", value: "11" },
];

export const Headers: TableHeaders[] = [
  { header: "deviceName", subHeader: "deviceName" },
  { header: "pool", subHeader: "pool" },
  { header: "28", width: "80px", maxWidth: "80px" },
];
