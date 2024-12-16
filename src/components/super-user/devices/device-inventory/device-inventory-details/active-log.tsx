import { Grid } from "@mui/system";
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

export const mockHeaders: TableHeaders[] = [
  { header: "Date" },
  { header: "User" },
  { header: "Event" },
  { header: "Appointment" },
];

const ActiveLog = () => {
  return (
    <Grid container width={"100%"} height={"100%"}>
      <Grid container width={"100%"}>
        <TableContainer
          sx={{
            maxHeight: "70vh",
            overflowY: "scroll",
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
                    <Grid pr={4} container flexDirection={"column"}>
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
                    <TableCell sx={{ ...heading }} align="left">
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
                    <TableCell sx={{ ...heading }} align="left">
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
                      <Grid container flexDirection={"column"}>
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
      </Grid>
      <Grid
        p={1}
        width={"100%"}
        container
        sx={{ borderTop: "1px solid #E7E7E7" }}
      >
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

export default ActiveLog;
