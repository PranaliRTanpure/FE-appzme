import { Grid, useMediaQuery } from "@mui/system";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paginator from "../../../../common-components/paginator/paginator";
import Status from "../../../../common-components/status/status";
import {
  heading,
  tableCellCss,
  typographyCss,
} from "../../../../common-components/table/common-table-widgets";
import { TableHeaders } from "../../../../common-components/table/table-models";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../../utils/theme";
import CustomSelect from "../../../../common-components/custom-select/customSelect";
import CustomInput from "../../../../common-components/custom-input/custom-input";
import deviceInventoryList from "../../../../mock-data/device-inventory.json";
import AddDeviceInventory from "./add-device-inventory";

export const Headers: TableHeaders[] = [
  { header: "Device Name" },
  { header: "Serial Number" },
  { header: "Pool" },
  { header: "Status" },
];

const DevicesInventory = () => {
  const [selectedDevice] = useState("");
  const [isFormOpen, SetIsFormOpen] = useState<boolean>(false);
  const belowHeight768 = useMediaQuery("(max-height:768px)");
  const navigate = useNavigate();
  const statusBgColorMapping: Record<string, string> = {
    LOST: "#FFF2F3",
    READY: "#E1FCDE",
    IN_USE: "#E0EFFF",
    BROKEN: "#FFF2D2",
  };
  return (
    <>
      {!isFormOpen && (
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
              <Grid container alignItems={"center"} columnGap={1.5} rowGap={1}>
                <Typography variant="bodyLarge" fontWeight={"bold"}>
                  Inventory
                </Typography>

                <Grid>
                  <Status bgColor="#E7E7E7" status={"190"} width="50px" />
                </Grid>

                <Divider
                  sx={{
                    margin: "2px",
                    background: theme.palette.common.white,
                  }}
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />

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
              </Grid>

              <Grid container alignItems={"center"} columnGap={1.5} rowGap={1}>
                <Grid
                  container
                  border={"1px solid #C9CBCC"}
                  borderRadius={3}
                  width={35}
                  height={35}
                  alignContent={"center"}
                  justifyContent={"center"}
                >
                  <FilterListIcon sx={{ height: "19px", width: "19px" }} />
                </Grid>

                <Grid
                  container
                  border={"1px solid #C9CBCC"}
                  borderRadius={3}
                  width={35}
                  height={35}
                  alignContent={"center"}
                  justifyContent={"center"}
                >
                  <FilterAltOutlinedIcon
                    sx={{ height: "19px", width: "19px" }}
                  />
                </Grid>

                <Grid>
                  <CustomInput
                    placeholder={"Serach Patient"}
                    name={""}
                    value={""}
                    onChange={() => {}}
                    onDebounceCall={() => {}}
                    onInputEmpty={() => {}}
                    hasStartSearchIcon={true}
                  />
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    onClick={() => SetIsFormOpen(true)}
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
              <TableContainer
                sx={{
                  maxHeight: belowHeight768 ? "63vh" : "76vh",
                  overflowY: "scroll",
                }}
              >
                <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
                  <TableHead>
                    <TableRow>
                      {Headers.map((header, index) => (
                        <TableCell
                          sx={{
                            ...heading,
                            minWidth: header.minWidth
                              ? header.minWidth
                              : "inherit",
                            maxWidth: header.maxWidth
                              ? header.maxWidth
                              : "inherit",
                          }}
                          align="left"
                          key={index}
                        >
                          <Grid
                            pr={4}
                            container
                            flexDirection={"column"}
                            alignContent={
                              header.header === "Status"
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
                              <Grid container flexDirection={"column"}>
                                <Link
                                  underline="always"
                                  sx={{
                                    color: "#106DCC",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    navigate(
                                      `/super-user/devices/${list.serialNumber.replace("#", "")}`,
                                    );
                                  }}
                                >
                                  <Typography
                                    fontWeight={500}
                                    color="#106DCC"
                                    variant="bodySmall"
                                  >
                                    {list?.deviceName}
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
                            <Grid
                              container
                              flexDirection={"column"}
                              alignContent={"flex-end"}
                              pr={2}
                            >
                              <Status
                                status={`${list.status}`}
                                width="74px"
                                bgColor={
                                  statusBgColorMapping[list?.status] || "gray"
                                }
                              />
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
            <Grid container sx={{ borderTop: "1px solid #E7E7E7" }}>
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
      )}

      {isFormOpen && (
        <AddDeviceInventory onClose={() => SetIsFormOpen(false)} />
      )}
    </>
  );
};
export default DevicesInventory;
