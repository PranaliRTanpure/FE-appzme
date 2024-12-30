import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/system";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import globalize from "globalize";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
    title: "EhR call",
    start: new Date("2024-12-26T00:00:00"),
    end: new Date("2024-12-26T23:59:59"),
    allDay: true,
  },
];

const localizer = globalizeLocalizer(globalize);

const EncounterMillennium = () => {
  return (
    <Grid container minHeight={"88vh"} border={1}>
      {/* Accordion */}
      <Grid
        width={"20%"}
        minHeight={"100%"}
        border={"3px solid rgb(114, 68, 68)"}
        sx={{ overflowY: "auto" }}
      >
        <Accordion sx={{ bgcolor: "#F5F6F8" }}>
          <AccordionSummary
            sx={{ bgcolor: "#F5F6F8" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="bodySmall" component="span">
              Calender
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
              Search by Provider
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
              Search by Clinic
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
              Encounter Type
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
              Status
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Calender */}
      <Grid maxHeight={"100%"} width={"80%"} border={1}>
        <Calendar
          localizer={localizer}
          events={calenderEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
        />
      </Grid>
    </Grid>
  );
};

export default EncounterMillennium;
