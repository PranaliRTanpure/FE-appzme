import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { Dayjs } from "dayjs";

import CustomCheckBox, { CheckedArray } from "@/common-components/custom-checkbox/custom-checkbox";
import CustomInput from "@/common-components/custom-input/custom-input";
import CustomReactBigCalendar from "@/common-components/custom-react-big-calender/custom-react-big-calendar";

import { accordionCss } from "../encounter.styles";
import "./calender.css";
import { EncounterType, MillenniumAppointmentStatus } from "./chekbox_list";

const calenderEvents = [
  {
    id: 1,
    title: "Meeting",
    start: new Date("2024-12-25T10:00:00"),
    end: new Date("2024-12-25T11:30:00"),
  },
  {
    id: 2,
    title: "Birthday",
    start: new Date("2024-12-26T10:00:00"),
    end: new Date("2024-12-26T12:00:00"),
  },
  {
    id: 3,
    title: "Presentations",
    start: new Date("2024-12-26T16:00:00"),
    end: new Date("2024-12-26T17:00:00"),
  },
  {
    id: 4,
    title: "Presentation",
    start: new Date("2024-12-28T02:00:00"),
    end: new Date("2024-12-28T23:59:59"),
  },
  {
    id: 5,
    title: "EMR call",
    start: new Date("2024-12-26T07:00:00"),
    end: new Date("2024-12-26T08:00:00"),
  },
  {
    id: 6,
    title: "EHR call",
    start: new Date("2024-12-26T05:00:00"),
    end: new Date("2024-12-26T06:00:59"),
  },
  {
    id: 7,
    title: "AppZme call",
    start: new Date("2024-12-26T00:00:00"),
    end: new Date("2024-12-26T04:00:00"),
  },
  {
    id: 8,
    title: "StandUp call",
    start: new Date("2024-12-26T13:00:00"),
    end: new Date("2024-12-26T14:59:59"),
  },
  {
    id: 9,
    title: "StandUp call",
    start: new Date("2024-12-31T00:00:00"),
    end: new Date("2025-01-01T23:59:59"),
  },
];

const EncounterMillennium = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [expanded, setExpanded] = useState(false);
  const [updatedArray, setUpdatedArray] = useState<CheckedArray[]>(MillenniumAppointmentStatus);
  updatedArray;
  const [updatedArrayEncounter, setUpdatedArrayEncounter] = useState<CheckedArray[]>(EncounterType);
  updatedArrayEncounter;

  const handleCheckedStatus = (value: CheckedArray[]) => {
    setUpdatedArray(value);
  };

  const handleCheckedEncounter = (value: CheckedArray[]) => {
    setUpdatedArrayEncounter(value);
  };

  const handleSummaryClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("svg")) {
      setExpanded(!expanded);
    }
  };

  const handleMonthChange = (direction: "previous" | "next") => {
    setCurrentMonth((prev: Dayjs) => (direction === "previous" ? prev.subtract(1, "month") : prev.add(1, "month")));
  };

  return (
    <Grid container width={"100%"} height={"100%"}>
      {/* Accordion */}
      <Grid width={"20%"} sx={{ overflowY: "auto" }} borderRight={"1px solid #E7E7E7"}>
        <Accordion sx={accordionCss} expanded={expanded} onChange={() => {}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: "18px" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
            onClick={handleSummaryClick}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleMonthChange("previous");
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: "14px" }} />
              </IconButton>
              <Typography variant="bodySmall" component="span">
                {currentMonth.format("MMMM YYYY")}
              </Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleMonthChange("next");
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={currentMonth}
                onChange={(newValue) => {
                  if (newValue) {
                    setCurrentMonth(newValue);
                  }
                }}
                slots={{
                  calendarHeader: () => null,
                }}
                sx={{
                  width: "100%",
                  height: "230px",
                }}
              />
            </LocalizationProvider>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={accordionCss}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
            <Typography variant="bodySmall" component="span" fontWeight={"bold"}>
              Search by Provider
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container flexDirection={"column"}>
              <CustomInput
                placeholder={"Serach Provider"}
                name={""}
                value={""}
                onChange={() => {}}
                onDebounceCall={() => {}}
                onInputEmpty={() => {}}
                hasStartSearchIcon={true}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Olivia Rhye"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Jacob Jones"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Annette Black"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={accordionCss}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
            <Typography variant="bodySmall" component="span" fontWeight={"bold"}>
              Search by Clinic
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container flexDirection={"column"}>
              <CustomInput
                placeholder={"Serach Clinic"}
                name={""}
                value={""}
                onChange={() => {}}
                onDebounceCall={() => {}}
                onInputEmpty={() => {}}
                hasStartSearchIcon={true}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Premier Health Center"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Elite Sleep Specialists"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="TrustCare Medical Group"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={accordionCss}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
            <Typography variant="bodySmall" component="span" fontWeight={"bold"}>
              Encounter Type
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid>
              <CustomCheckBox
                sx={{ fontSize: "14px" }}
                options={EncounterType}
                onChange={handleCheckedEncounter}
                oriantation={"vertical"}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={accordionCss}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
            <Typography variant="bodySmall" component="span" fontWeight={"bold"}>
              Status
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid>
              <CustomCheckBox
                sx={{ fontSize: "14px" }}
                options={MillenniumAppointmentStatus}
                onChange={handleCheckedStatus}
                oriantation={"vertical"}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Calendar Section */}
      <Box flex={1} rowGap={2} sx={{ overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <Grid height={"100%"} sx={{ flex: 1 }}>
          <CustomReactBigCalendar calenderEvents={calenderEvents} />
        </Grid>
      </Box>
    </Grid>
  );
};
export default EncounterMillennium;
