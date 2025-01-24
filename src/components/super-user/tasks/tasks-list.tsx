import CustomButton from "@/common-components/button-outlined/custom-button";
import CustomAutoComplete from "@/common-components/custom-auto-complete/custom-auto-complete";
import CustomInput from "@/common-components/custom-input/custom-input";
import CustomLabel from "@/common-components/custom-label/custom-label";
import Paginator from "@/common-components/paginator/paginator";
import {
  heading,
  tableCellCss,
} from "@/common-components/table/common-table-widgets";
import { TableHeaders } from "@/common-components/table/table-models";
import { theme } from "@/utils/theme";
import AddIcon from "@mui/icons-material/Add";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  ButtonBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import { ChangeEvent, useState } from "react";

export const headers: TableHeaders[] = [
  { header: "Patient Name" },
  { header: "Task Title" },
  { header: "Assigned to" },
  { header: "Due Date" },
  { header: "Task Type" },
  { header: "Status" },
  { header: "Priority" },
  { header: "Action" },
];

const TasksList = () => {
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  //   const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [rows] = useState<Location[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages] = useState(0);
  const [totalElements] = useState<number>(0);
  const [, setSize] = useState(10);

  const handleRecordsPerPageChange = (recordsPerPage: number) => {
    setPage(0);
    setSize(recordsPerPage);
  };

  const handlePageChange = (
    event: ChangeEvent<unknown> | null,
    page: number,
  ) => {
    event;
    setPage(page);
  };

  return (
    <Grid width={"100%"} p={2}>
      <Grid width={"100%"}>
        <Typography variant="bodyLarge" fontWeight={600}>
          Tasks
        </Typography>
      </Grid>
      <Grid container justifyContent={"space-between"}>
        <Grid container mt={1} columnGap={2}>
          <Grid container flexDirection={"column"} width={"250px"}>
            <CustomLabel label="Assigned to" />
            <CustomAutoComplete
              options={[]}
              placeholder="Select Assigned To"
              onChange={function (selectedValue: string | ""): void {
                selectedValue;
              }}
            />
          </Grid>
          <Grid container flexDirection={"column"} width={"250px"}>
            <CustomLabel label="Task Type" />
            <CustomAutoComplete
              placeholder="Select Task Type"
              options={[]}
              onChange={function (selectedValue: string | ""): void {
                selectedValue;
              }}
            />
          </Grid>
        </Grid>
        <Grid container columnGap={1}>
          <Grid container alignItems={"flex-end"} mb={1}>
            {/* <CustomLabel label="Search Patient" /> */}
            <CustomInput
              placeholder="Patient"
              hasStartSearchIcon
              value={selectedPatient}
              onChange={(e) => {
                setSelectedPatient(e.target.value);
              }}
              name={"SelectedPatient"}
            />
          </Grid>
          <Grid container alignItems={"flex-end"} mb={1}>
            <ButtonBase
              sx={{
                color: theme.palette.common.black,
                border: `1px solid ${theme.palette.grey[500]}`,
                p: 0.7,
                borderRadius: "12px",
              }}
            >
              <FilterAltOutlinedIcon fontSize="medium" />
            </ButtonBase>
          </Grid>
          <Grid container alignItems={"flex-end"} mb={1}>
            <CustomButton
              text="Create Task"
              onClick={() => undefined}
              variant="contained"
              startIcon={<AddIcon />}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Table */}
      <Grid mt={2}>
        <TableContainer sx={{ maxHeight: "60vh", overflow: "auto" }}>
          <Table stickyHeader aria-label="sticky table" sx={tableCellCss}>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
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
                        header.header === "Actions" ? `flex-end` : "flex-start"
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
              {rows.length > 0 ? (
                rows?.map((_task: unknown, index: number) => (
                  <TableRow key={index}>
                    <TableCell sx={{ ...heading }} align="left">
                      <Grid container flexDirection={"column"}>
                        <Typography fontWeight={550} variant="bodySmall">
                          {"-"}
                        </Typography>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="bodySmall" fontWeight={550}>
                      No records found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container>
          <Paginator
            page={page}
            totalPages={totalPages}
            totalRecord={totalElements}
            onRecordsPerPageChange={handleRecordsPerPageChange}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TasksList;
