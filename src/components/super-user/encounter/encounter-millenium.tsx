import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Calendar, globalizeLocalizer, Views } from "react-big-calendar";
import globalize from "globalize";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Grid } from "@mui/system";

const calenderEvents = [
  {
    id: 1,
    title: "Meeting",
    start: new Date("2024-12-25T10:00:00"),
    end: new Date("2024-12-25T11:30:00"),
    allDay: false,
  },
  {
    id: 2,
    title: "Birthday",
    start: new Date("2024-12-26T00:00:00"),
    end: new Date("2024-12-26T23:59:59"),
    allDay: true,
  },
  {
    id: 3,
    title: "Presentation",
    start: new Date("2024-12-26T00:00:00"),
    end: new Date("2024-12-26T23:59:59"),
    allDay: true,
  },
  {
    id: 4,
    title: "Presentation",
    start: new Date("2024-12-21T00:00:00"),
    end: new Date("2024-12-21T23:59:59"),
    allDay: true,
  },
  {
    id: 5,
    title: "EMR call",
    start: new Date("2024-12-26T00:00:00"),
    end: new Date("2024-12-26T23:59:59"),
    allDay: true,
  },
  {
    id: 6,
    title: "EHR call",
    start: new Date("2024-12-26T00:00:00"),
    end: new Date("2024-12-26T23:59:59"),
    allDay: true,
  },
  {
    id: 7,
    title: "AppZme call",
    start: new Date("2024-12-26T00:00:00"),
    end: new Date("2024-12-26T23:59:59"),
    allDay: true,
  },
  {
    id: 8,
    title: "StandUp call",
    start: new Date("2024-12-26T00:00:00"),
    end: new Date("2024-12-26T23:59:59"),
    allDay: true,
  },
];

// Globalize localizer for the calendar
const localizer = globalizeLocalizer(globalize);

const EncounterMillennium = () => {
  // const [view, setView] = useState<"month" | "week" | "day">(Views.MONTH);
  // const [currentMonth, setCurrentMonth] = React.useState<Dayjs>(dayjs());
  // const [expanded, setExpanded] = useState(false);

  // const handleSummaryClick = (event: React.MouseEvent<HTMLElement>) => {
  //   if ((event.target as HTMLElement).closest('svg')) {
  //     setExpanded(!expanded);
  //   }
  // };

  // const handleViewChange = (event: SelectChangeEvent<string>) => {
  //   setView(event.target.value as "month" | "week" | "day");
  // };

  // const handleMonthChange = (direction: 'previous' | 'next') => {
  //   setCurrentMonth((prev: Dayjs) =>
  //     direction === 'previous' ? prev.subtract(1, 'month') : prev.add(1, 'month')
  //   );
  // };

  const [view, setView] = useState<"month" | "week" | "day">(Views.MONTH);
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [expanded, setExpanded] = useState(false);

  const handleSummaryClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("svg")) {
      setExpanded(!expanded);
    }
  };

  const handleViewChange = (event: SelectChangeEvent<string>) => {
    setView(event.target.value as "month" | "week" | "day");
  };

  const handleMonthChange = (direction: "previous" | "next") => {
    // Prevent accordion toggle when clicking on arrows
    setCurrentMonth((prev: Dayjs) =>
      direction === "previous"
        ? prev.subtract(1, "month")
        : prev.add(1, "month"),
    );
  };

  return (
    <Grid container minHeight={"90vh"} border={"1px solid #E7E7E7"}>
      {/* Accordion */}
      <Grid
        width={"20%"}
        minHeight={"100%"}
        sx={{ overflowY: "auto" }}
        borderRight={"1px solid #E7E7E7"}
      >
        {/* <Accordion sx={{ bgcolor: '#F5F6F8', boxShadow: "none" }} expanded={expanded} onChange={() => {}} >
          <AccordionSummary
            sx={{ bgcolor: '#F5F6F8' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            onClick={handleSummaryClick}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <IconButton onClick={() => handleMonthChange('previous')}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography variant="bodySmall" component="span">
                {currentMonth.format('MMMM YYYY')}
              </Typography>
              <IconButton onClick={() => handleMonthChange('next')}>
                <ArrowForwardIosIcon />
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
                  width: '100%',
                  height: "230px",
                }}
              />
            </LocalizationProvider>
          </AccordionDetails>
        </Accordion> */}

        <Accordion
          sx={{ bgcolor: "#F5F6F8", boxShadow: "none" }}
          expanded={expanded}
          onChange={() => {}}
        >
          <AccordionSummary
            sx={{ bgcolor: "#F5F6F8" }}
            expandIcon={<ExpandMoreIcon />}
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
                <ArrowBackIosNewIcon />
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
                <ArrowForwardIosIcon />
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
        <Accordion sx={{ bgcolor: "#F5F6F8", boxShadow: "none" }}>
          <AccordionSummary
            sx={{ bgcolor: "#F5F6F8" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="bodySmall" component="span">
              Calendar
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ bgcolor: "#F5F6F8" }}>
          <AccordionSummary
            sx={{ bgcolor: "#F5F6F8" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="bodySmall" component="span">
              Calendar
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ bgcolor: "#F5F6F8" }}>
          <AccordionSummary
            sx={{ bgcolor: "#F5F6F8" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="bodySmall" component="span">
              Calendar
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ bgcolor: "#F5F6F8" }}>
          <AccordionSummary
            sx={{ bgcolor: "#F5F6F8" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="bodySmall" component="span">
              Calendar
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
        <Grid container justifyContent={"space-between"} mt={2} mr={2}>
          <Grid>heuh</Grid>
          <Grid>
            <FormControl fullWidth size="small">
              <Select
                value={view}
                onChange={handleViewChange}
                displayEmpty
                aria-label="View Selection"
              >
                <MenuItem value={Views.MONTH}>Month</MenuItem>
                <MenuItem value={Views.WEEK}>Week</MenuItem>
                <MenuItem value={Views.DAY}>Today</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid sx={{ flexGrow: 1 }} p={3} border={"1px solid #E7E7E7"}>
          <Calendar
            events={calenderEvents}
            step={60}
            showMultiDayTimes
            defaultDate={new Date()}
            defaultView={view}
            localizer={localizer}
            style={{ height: "70vh", maxWidth: "100%", margin: "0 auto" }}
            // formats={{
            //   timeGutterFormat: "HH:mm",
            // }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EncounterMillennium;
