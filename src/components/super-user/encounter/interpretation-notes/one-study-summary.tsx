import CustomSelect from "@/common-components/custom-select/customSelect";
import {
  heading,
  tableCellCss,
  typographyCss,
} from "@/common-components/table/common-table-widgets";
import { TableHeaders } from "@/common-components/table/table-models";
import {
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import { useState } from "react";

export const Headers: TableHeaders[] = [
  { header: "Parameters" },
  { header: "Night 1" },
  { header: "Night 2" },
];

export const parameterNames = [
  "Start Date",
  "TST (min)",
  "AHI (#)",
  "Total Sleep Time Below 88% (min)",
  "Average Heart Rate During Sleep (bpm)",
  "Highest Heart Rate During Sleep (bpm)",
];

export const data1 = [
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
  {
    startDate: "2024-11-15",
    TST: "321",
    AHI: "27.86",
    TimeSleep: "35.03",
    averageHeartRate: "81",
    highestHeartRate: "110",
  },
];

export const data = [
  { night1: "2024-11-15", night2: "2024-11-28" },
  { night1: 321, night2: 154 },
  { night1: 27.86, night2: 22.71 },
  { night1: 35.03, night2: 20.12 },
  { night1: 86, night2: 68 },
  { night1: 110, night2: 84 },
];

const OneStudySummary = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (e: SelectChangeEvent<string>): void => {
    const value = e.target.value;
    setSelectedValue(value);
  };
  return (
    <Grid
      container
      flexDirection={"column"}
      width={"100%"}
      height={"100%"}
      rowGap={1.5}
    >
      {/* Grid 1 */}
      <Grid container width={"100%"} columnGap={1} alignItems={"center"}>
        <Grid>
          <Typography variant="bodySmall">
            Primary Night for Interpretation :
          </Typography>
        </Grid>
        <Grid width={"12%"}>
          <CustomSelect
            enableDeselect
            placeholder={"Select Night"}
            name={"selectNight"}
            value={selectedValue}
            items={[
              { value: "NIGHT1", label: "Night 1" },
              { value: "NIGHT2", label: "Night 2" },
              { value: "OTHER", label: "Other" },
            ]}
            bgWhite={true}
            onChange={handleSelectChange}
          />
        </Grid>
        <Grid>
          <Typography variant="bodySmall">(2 night(s) recorded)</Typography>
        </Grid>
      </Grid>
      {/* Grid 2 */}
      <Grid container>
        <TableContainer
          sx={{
            maxHeight: "500px",
            maxWidth: "100%",
            overflow: "auto",
            display: "inline-block",
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ ...tableCellCss, width: "auto", border: "1px solid #E7E7E7" }}
          >
            <TableHead>
              <TableRow>
                {Headers.map((header, index) => (
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
              {parameterNames.map((name, index) => (
                <TableRow key={name}>
                  <TableCell sx={{ ...heading, width: "340px" }} align="left">
                    <Grid container flexDirection={"column"}>
                      <Grid container flexDirection={"column"}>
                        <Typography
                          fontWeight={500}
                          color="#21262B"
                          variant="bodySmall"
                        >
                          {name}
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
                        {data[index].night1}
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
                        {data[index].night2}
                      </Typography>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
export default OneStudySummary;
