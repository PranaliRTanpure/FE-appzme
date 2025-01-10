import { Box, Grid, useMediaQuery } from "@mui/system";
import { TableHeaders } from "../../../../../common-components/table/table-models";
import Paginator from "../../../../../common-components/paginator/paginator";
import {
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
import deviceInventoryActivityLogList from "../../../../../mock-data/device-inventory-activeLog.json";
import Image from "../../../../../assets/image_svg/icons/activity-log-table.svg";

export const mockHeaders: TableHeaders[] = [
  { header: "Date" },
  { header: "User" },
  { header: "Event" },
  { header: "Appointment" },
];

const ActiveLog = () => {
  const belowHeight768 = useMediaQuery("(max-height:768px)");
  const belowHeight900 = useMediaQuery("(max-height:900px)");
  return (
    <Grid
      container
      width={"100%"}
      height={belowHeight768 ? "440px" : belowHeight900 ? "550px" : "100%"}
      sx={{ overflowY: "auto" }}
    >
      <Grid container width={"100%"}>
        {deviceInventoryActivityLogList.length > 0 ? (
          <TableContainer
            sx={{
              maxHeight: belowHeight768
                ? "50vh"
                : belowHeight900
                  ? "55vh"
                  : "70vh",
              overflowY: "auto",
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
                          header.header === "Date" ? "flex-start" : "center"
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
                {deviceInventoryActivityLogList.length > 0 ? (
                  deviceInventoryActivityLogList.map((list, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Typography
                            sx={typographyCss}
                            variant="bodySmall"
                            color="#21262B"
                            fontWeight={400}
                          >
                            {list?.date}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell sx={{ ...heading }} align="center">
                        <Grid container flexDirection={"column"}>
                          <Typography
                            sx={{ ...typographyCss }}
                            variant="bodySmall"
                            color="#21262B"
                            fontWeight={400}
                          >
                            {list?.user}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell sx={{ ...heading }} align="center">
                        <Grid container flexDirection={"column"}>
                          <Typography
                            sx={typographyCss}
                            variant="bodySmall"
                            color="#21262B"
                            fontWeight={400}
                          >
                            {list?.event}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid
                          container
                          flexDirection={"column"}
                          alignContent={"center"}
                        >
                          <Typography
                            sx={{ ...typographyCss }}
                            variant="bodySmall"
                            color="#21262B"
                            fontWeight={400}
                          >
                            {list?.appointment}
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
        ) : (
          <Grid
            container
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            rowGap={1}
            height={356}
          >
            <Box width={210} height={176} component={"img"} src={Image}></Box>
            <Typography variant="bodyMedium" fontWeight={500}>
              No Logs Available
            </Typography>
            <Typography
              variant="bodySmall"
              fontWeight={400}
              sx={{ color: "#9B9D9F" }}
            >
              Select a date range to view activity logs.
            </Typography>
          </Grid>
        )}
      </Grid>
      {/* Pagination */}
      {deviceInventoryActivityLogList.length > 0 && (
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
      )}
    </Grid>
  );
};
export default ActiveLog;
