import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import globalize from "globalize";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Grid } from "@mui/system";
import "./calender.css";
import moment from "moment";

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
    title: "Presentation",
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

const localizer = globalizeLocalizer(globalize);

const EncounterMillennium = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [expanded, setExpanded] = useState(false);

  const handleSummaryClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("svg")) {
      setExpanded(!expanded);
    }
  };

  const handleMonthChange = (direction: "previous" | "next") => {
    setCurrentMonth((prev: Dayjs) =>
      direction === "previous"
        ? prev.subtract(1, "month")
        : prev.add(1, "month"),
    );
  };

  return (
    <Grid container minHeight={"90vh"} bgcolor={"white"}>
      {/* Accordion */}
      <Grid
        width={"20%"}
        minHeight={"100%"}
        sx={{ overflowY: "auto" }}
        borderRight={"1px solid #E7E7E7"}
      >
        <Accordion
          sx={{ boxShadow: "none" }}
          expanded={expanded}
          onChange={() => {}}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: "18px" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
            onClick={handleSummaryClick}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
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
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="bodySmall" component="span">
              Search by Provider
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="bodySmall" component="span">
              Search by Clinic
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="bodySmall" component="span">
              Encounter Type
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="bodySmall" component="span">
              Status
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </Grid>

      {/* Calendar Section */}
      <Grid
        container
        flexDirection={"column"}
        maxHeight={"100%"}
        width={"80%"}
        rowGap={2}
      >
        <Grid sx={{ flexGrow: 1 }}>
          <Calendar
            events={calenderEvents}
            startAccessor="start"
            endAccessor="end"
            showMultiDayTimes={true}
            defaultDate={new Date()}
            localizer={localizer}
            formats={{
              timeGutterFormat: "HH:mm",
            }}
            components={{
              event: ({ event }) => (
                <span>
                  | {moment(event.start).format("HH:mm")} - {event.title}
                </span>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EncounterMillennium;
