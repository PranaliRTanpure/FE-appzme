import CustomClickableLink from "@/common-components/custom-clickable-link/custom-clickable-link";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";
import Paginator from "../../../../../common-components/paginator/paginator";
import {
  heading,
  tableCellCss,
  typographyCss,
} from "../../../../../common-components/table/common-table-widgets";
import { TableHeaders } from "../../../../../common-components/table/table-models";
import deviceInventoryActivePatientScheduleList from "../../../../../mock-data/device-inventory-activePatientSchedule.json";

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
      // height={belowHeight768 ? "440px" : belowHeight900 ? "610px" : "100%"}
      height={"100%"}
      sx={{ overflowY: "auto" }}
      flexDirection={"column"}
    >
      <Grid container width={"100%"}>
        <TableContainer
          sx={{
            maxHeight: belowHeight768
              ? "55vh"
              : belowHeight900
                ? "65vh"
                : "80vh",
            overflowY: "auto",
            borderBottom: "1px solid #E7E7E7",
            boxShadow: "0px 4px 8px -2px #1018281A",
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
                      <CustomClickableLink
                        text={list?.patient}
                        onClick={function (): void {}}
                      />
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
      <Grid p={1} width={"100%"} container bgcolor={"#F5F6F8"}>
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
