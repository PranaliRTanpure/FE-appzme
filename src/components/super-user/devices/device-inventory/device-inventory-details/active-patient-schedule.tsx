import { Grid, useMediaQuery } from "@mui/system";
import { TableHeaders } from "../../../../../common-components/table/table-models";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  heading,
  tableCellCss,
  typographyCss,
} from "../../../../../common-components/table/common-table-widgets";
import deviceInventoryActivePatientScheduleList from "../../../../../mock-data/device-inventory-activePatientSchedule.json";
import Paginator from "../../../../../common-components/paginator/paginator";

export const mockHeaders: TableHeaders[] = [
  { header: "Patient" },
  { header: "Device Out Date" },
  { header: "Ship Tracking" },
  { header: "Return Device Date" },
  { header: "Return Tracking" },
  { header: "Received Date" },
  { header: "Study" },
];

const ActivePatientSchedule = () => {
  const belowHeight768 = useMediaQuery("(max-height:768px)");
  const belowHeight900 = useMediaQuery("(max-height:900px)");
  return (
    <Grid
      container
      width={"100%"}
      height={belowHeight768 ? "500px" : belowHeight900 ? "680px" : "100%"}
      sx={{ overflowY: "scroll" }}
    >
      <Grid container width={"100%"}>
        <TableContainer
          sx={{
            maxHeight: belowHeight768
              ? "50vh"
              : belowHeight900
                ? "67vh"
                : "70vh",
            overflowY: "scroll",
            borderBottom: "1px solid #E7E7E7",
          }}
        >
          <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
            <TableHead>
              <TableRow>
                {mockHeaders.map((header, index) => (
                  <TableCell
                    sx={{
                      ...heading,
                      minWidth: header.minWidth ? header.minWidth : "inherit",
                      maxWidth: header.maxWidth ? header.maxWidth : "inherit",
                    }}
                    align="left"
                    key={index}
                  >
                    <Grid
                      pr={4}
                      container
                      flexDirection={"column"}
                      alignContent={
                        header.header === "Status" ? "flex-end" : "flex-start"
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
              {deviceInventoryActivePatientScheduleList.length > 0 ? (
                deviceInventoryActivePatientScheduleList.map((list, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Grid container flexDirection={"column"}>
                          <Link
                            underline="always"
                            sx={{
                              color: "#106DCC",
                              cursor: "pointer",
                            }}
                            // onClick={() => {
                            //     navigate(
                            //         `/super-user/devices/${list.serialNumber.replace("#", "")}`,
                            //     );
                            // }}
                          >
                            <Typography
                              fontWeight={500}
                              color="#106DCC"
                              variant="bodySmall"
                            >
                              {list?.patient}
                            </Typography>
                          </Link>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography
                          sx={typographyCss}
                          variant="bodySmall"
                          color="#21262B"
                          fontWeight={400}
                        >
                          {list?.deviceOutOfDate}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography
                          sx={{ ...typographyCss, textDecoration: "underline" }}
                          variant="bodySmall"
                          color="#21262B"
                          fontWeight={400}
                        >
                          {list?.shipTracking}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography
                          sx={typographyCss}
                          variant="bodySmall"
                          color="#21262B"
                          fontWeight={400}
                        >
                          {list?.returnDeviceDate}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography
                          sx={{ ...typographyCss, textDecoration: "underline" }}
                          variant="bodySmall"
                          color="#21262B"
                          fontWeight={400}
                        >
                          {list?.returnTracking}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography
                          sx={typographyCss}
                          variant="bodySmall"
                          color="#21262B"
                          fontWeight={400}
                        >
                          {list?.recivedDate}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography
                          sx={typographyCss}
                          variant="bodySmall"
                          color="#21262B"
                          fontWeight={400}
                        >
                          {list?.study}
                        </Typography>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography variant="bodySmall" fontWeight={550}>
                      No records found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid p={1} width={"100%"} container>
        <Paginator
          page={0}
          totalPages={5}
          totalRecord={5}
          onPageChange={() => {}}
          onRecordsPerPageChange={() => {}}
          defaultSize={10}
        />
      </Grid>
    </Grid>
  );
};
export default ActivePatientSchedule;
