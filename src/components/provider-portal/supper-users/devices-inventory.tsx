import { Grid } from "@mui/system";
import { theme } from "../../../utils/theme";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paginator from "../../../common-components/paginator/paginator";
import {
  heading,
  tableCellCss,
  typographyCss,
} from "../../../common-components/table/common-table-widgets";
import CustomSelect from "../../../common-components/custom-select/customSelect";
import { useState } from "react";
import { TableHeaders } from "../../../common-components/table/table-models";
import deviceInventoryList from "../../../mock-data/device-inventory.json";
import Status from "../../../common-components/status/status";

export const mockHeaders: TableHeaders[] = [
  { header: "Device Name" },
  { header: "Serial Number" },
  { header: "Pool" },
  { header: "Status" },
];

const DevicesInventory = () => {
  const [selectedDevice] = useState("");

  return (
    <Grid
      height={"100%"}
      p={2}
      width={"100%"}
      maxWidth={"100%"}
      overflow={"auto"}
    >
      <Grid
        border={`1px solid ${theme.palette.grey[300]}`}
        boxShadow={`0px 0px 16px 0px #021D2614`}
        height={"100%"}
        borderRadius={"8px"}
        container
        flexDirection={"column"}
      >
        <Grid container p={2} justifyContent={"space-between"} rowGap={2}>
          <Grid container alignItems={"center"} columnGap={2} rowGap={2}>
            <Typography variant="bodyMedium" fontWeight={550} mr={2}>
              Inventory
            </Typography>
            <Grid container width={"200px"}>
              <CustomSelect
                placeholder={"Select a Device"}
                name={""}
                value={selectedDevice}
                enableDeselect
                items={[{ value: "active", label: "Active" }]}
                onChange={() => {}}
              />
            </Grid>
            <Grid></Grid>
          </Grid>

          <Grid container width={"200px"}>
            <Grid container columnGap={2} rowGap={2} alignItems={"flex-end"}>
              <Button
                variant="contained"
                onClick={() => {}}
                startIcon={
                  <AddIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                sx={{ background: "#106DCC" }}
              >
                <Typography variant="bodySmall">Add New Device</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid width={"100%"}>
          <TableContainer sx={{ maxHeight: "78vh", overflow: "auto" }}>
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
                        container
                        flexDirection={"column"}
                        alignContent={
                          header.header === "Actions"
                            ? "flex-end"
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
                {deviceInventoryList.length > 0 ? (
                  deviceInventoryList.map((list, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Grid
                            container
                            flexDirection={"column"}
                            sx={{ cursor: "pointer" }}
                          >
                            <Typography
                              fontWeight={500}
                              color="#106DCC"
                              variant="bodySmall"
                              onClick={() => {}}
                            >
                              {list?.deviceName}
                            </Typography>
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
                            {list?.serialNumber}
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
                            {list?.pool}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell sx={{ ...heading }} align="left">
                        <Grid container flexDirection={"column"}>
                          <Status status={`${list.status}`} width="74px" />
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
        <Grid container>
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
    </Grid>
  );
};

export default DevicesInventory;
