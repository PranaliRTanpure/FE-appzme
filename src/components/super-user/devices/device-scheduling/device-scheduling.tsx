import {
  Button,
  Link,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";
import { getDate, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import CustomSelect from "../../../../common-components/custom-select/customSelect";
import { heading } from "../../../../common-components/table/common-table-widgets";
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
    "2023-12-01T12:37:09Z": "RETURN",
    "2023-12-02T12:37:09Z": "IN_USE",
    "2023-12-03T12:37:09Z": "RECIVED",
    "2023-12-11T12:37:09Z": "RECIVED",
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-01T12:37:09Z": "RETURN",
    "2023-12-02T12:37:09Z": "IN_USE",
    "2023-12-03T10:37:09Z": "RECIVED",
    "2023-12-14T12:37:09Z": "RECIVED",
    pool: "STL",
  },
  {
    deviceName: "ET200-747",
    serialNumber: "#DE656D1350",
    "2023-12-05T12:37:09Z": "RETURN",
    "2023-12-02T12:37:09Z": "IN_USE",
    "2023-12-03T12:37:09Z": "RECIVED",
    "2023-12-14T12:37:09Z": "RECIVED",
    pool: "STL",
  },
];
const monthsOptions = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

const colBorderCss = {
  borderRight: "1px solid #E7E7E7",
};
const tableCellCss = {
  "& .MuiTableCell-sizeMedium": {
    padding: "0px !important",
  },
};

export const Headers: TableHeaders[] = [
  { header: "deviceName" },
  { header: "deviceName" },
  { header: "28", width: "80px", maxWidth: "80px" },
];

const DeviceScheduling = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const belowHeight768 = useMediaQuery("(max-height:768px)");

  const [headersArray, setHeadersArray] = useState(Headers);

  const updateHeaders = () => {
    const headers = [
      { header: "deviceName" },
      { header: "pool" },
    ] as TableHeaders[];
    let i = 1;
    for (i = 1; i <= 14; i++) {
      headers.push({ header: i, width: "80px", maxWidth: "80px" });
    }
    setHeadersArray(headers);
  };

  useEffect(() => {
    updateHeaders();
  }, [selectedMonth]);

  const statusBgColorMapping: Record<string, string> = {
    RETURN: "#FFF2F3",
    IN_USE: "#E0EFFF",
    RECIVED: "#FFF2D2",
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderStatusContainers = (row: any, header: string | number) => {
    const keys = Object.keys(row);

    return keys.map((keyVal) => {
      if (new Date(keyVal).toString() !== "Invalid Date") {
        if (+header === getDate(parseISO(keyVal))) {
          return (
            <Grid
              key={keyVal}
              width={"80px"}
              height={"40px"}
              bgcolor={statusBgColorMapping[row[keyVal]]}
            ></Grid>
          );
        }
      }
    });
  };

  return (
    <Grid flexDirection={"column"} width={"100%"} m={2} container>
      <Grid height={"38px"} container>
        <Grid container columnGap={2}>
          <Typography variant="bodyLarge">Device Calendar</Typography>
          <Grid>
            <CustomSelect
              placeholder={"Month"}
              name={"month"}
              value={selectedMonth}
              items={monthsOptions}
              onChange={function (e: SelectChangeEvent<string>): void {
                setSelectedMonth(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid container columnGap={2}>
          <Button variant="outlined" sx={{ height: "28px" }}>
            Previous 7 Days
          </Button>
          <Button variant="outlined" sx={{ height: "28px" }}>
            Next 7 Days
          </Button>
        </Grid>

        <Grid container columnGap={2}>
          <Button variant="outlined" sx={{ height: "28px" }}>
            Show Legends
          </Button>
        </Grid>
      </Grid>
      <Grid width={"100%"}>
        <TableContainer
          sx={{
            maxHeight: belowHeight768 ? "63vh" : "76vh",
            overflowY: "scroll",
          }}
        >
          <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
            <TableHead>
              <TableRow>
                {headersArray.map((header, index) => (
                  <TableCell
                    sx={{
                      ...heading,
                      minWidth: header.minWidth ? header.minWidth : "inherit",
                      maxWidth: header.maxWidth ? header.maxWidth : "inherit",
                      width: header.maxWidth ? header.maxWidth : "inherit",
                      border: "1px solid #E7E7E7",
                    }}
                    key={index}
                  >
                    <Grid
                      container
                      pl={
                        header.header !== "Pool" &&
                        header.header !== "Device Name"
                          ? "0px"
                          : "10px"
                      }
                      justifyContent={
                        header.header !== "Pool" &&
                        header.header !== "Device Name"
                          ? "center"
                          : "flex-start"
                      }
                    >
                      <Typography variant="bodySmall">
                        {header.header}
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {data &&
                        headersArray.map((column) => {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          const value = (row as any)[column.header];
                          if (column.header === "deviceName") {
                            return (
                              <TableCell
                                // key={column.id}
                                // className={classes.tableCell}
                                sx={{
                                  padding: "8px",
                                  textAlign: "center",
                                }}
                              >
                                <Link
                                // className={classes.fieldid}
                                // onClick={() => handleBillDrawer(row)}
                                >
                                  <Typography
                                    sx={{ cursor: "pointer" }}
                                    variant="body2"
                                    // className={classes.tableValue}
                                  >
                                    {value}
                                  </Typography>
                                </Link>
                              </TableCell>
                            );
                          }
                          if (column.header === "pool") {
                            return (
                              <TableCell
                                // key={column.id}
                                // className={classes.tableCell}
                                sx={{
                                  padding: "8px",
                                  textAlign: "center",
                                }}
                              >
                                <Typography
                                  sx={{ cursor: "pointer" }}
                                  variant="body2"
                                  // className={classes.tableValue}
                                >
                                  {value}
                                </Typography>
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell
                              // key={column.id}
                              // className={classes.tableCell}
                              sx={{
                                ...colBorderCss,
                                padding: "8px",
                                textAlign: "center",
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
  );
};

export default DeviceScheduling;
