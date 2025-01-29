import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import { Box } from "@mui/system";

import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";

const customStyles = () => `
/* SchedulingCalendarView Styles */

/* General Calendar container */

.rbc-calendar {
  background-color: #ffffff;
  font-family: "Poppins", sans-serif;
  /* border: 1px solid #ddd; */
  /* border-radius: 8px; */
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
  /* padding: 10px; */
  overflow: auto;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* Internet Explorer */
  border: none;
}

.rbc-calendar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

/* Day, Week, Month View Styling */
.rbc-header {
  background-color: #ffffff;
  padding: 8px !important;
  font-weight: 400 !important;
  color: #373d41;
  font-size: 12px;
  text-align: center;
  height: 100%;
}

.rbc-today {
  background-color: #e8f0fe !important;
  /* Light blue for today */
}

/* Event Styles */
.rbc-event {
  background-color: #f2f7ff !important;
  border: 1px solid #105fce !important;
  /* Optional: Removes any default border */
  color: black;
  min-height: fit-content;
  border-radius: 8px;
  padding: 0px !important;
  overflow: auto;
  font-size: 12px;
}

/* Event hover effect */
.rbc-event:hover {
  background-color: transparent;
  /* cursor: auto; */
}

/* Current Time Indicator */
.rbc-current-time-indicator {
  background-color: #dc3545 !important;
  /* Red line for current time */
}

.rbc-event-label {
  display: none !important;
}

.rbc-label {
  font-size: 12px;
  color: #7e8c8e;
}

.rbc-row-content {
}

.rbc-month-row {
  overflow: visible !important;
}

/* gap between time slot */
.rbc-timeslot-group {
  min-height: 45px !important;
}

/* Hide rbc-row-content by default */
.rbc-row-content {
  display: none;
}

/* Show rbc-row-content only in the month view */
.rbc-month-view .rbc-row-content {
  display: block;
}

.rbc-time-view .rbc-row {
  min-height: auto !important;
}

.rbc-overlay {
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow: auto;
  max-height: 500px;
  padding: 0px 10px 10px !important;
  border-radius: 10px;
}

.rbc-overlay::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

.rbc-overlay-header {
  font-size: large;
  font-weight: 550;
  position: sticky;
  top: 0px;
  background: #ffffff;
  z-index: 1;
  margin-top: 0px !important;
  padding: 10px !important;
  /* padding: 0px 10p */
}

.rbc-show-more {
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 4;
  font-weight: 500;
  font-size: 14px;
  height: auto;
  line-height: normal;
  color: #106dcc;
  padding-top: 8px;
}

.rbc-row-segment {
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 8px;
  padding-right: 5px;
}

/* Toolbar */
.rbc-toolbar {
  padding: 10px;
  margin-bottom: 0px;
  background-color:"#F5F6F8 !important"
}

/* Toolbar button  */
.rbc-btn-group button:hover {
  background-color: #f2f7ff;
}

/* event Label CSS */
.rbc-ellipsis,
.rbc-show-more,
.rbc-row-segment .rbc-event-content,
.rbc-event-label {
  display: block !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  padding-left: 5px !important;
  height: 30px;
  align-content: center;
}

/* Toolbar active button CSS */
.rbc-toolbar button:active,
.rbc-toolbar button.rbc-active {
  background-image: none;
  box-shadow: none;
  background-color: #e6e6e6;
  border-color: #adadad;
}

`;

type calenderEvents = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};

type CustomReactBigCalendarProps = {
  calenderEvents: calenderEvents[];
};

const CustomReactBigCalendar = (props: CustomReactBigCalendarProps) => {
  const { calenderEvents } = props;
  const locales = {
    "en-US": enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
  });

  return (
    <Box bgcolor={"pink"} height={"100%"}>
      <Calendar
        views={["month", "week", "day"]}
        events={calenderEvents}
        startAccessor="start"
        endAccessor="end"
        showMultiDayTimes={true}
        defaultDate={new Date()}
        localizer={localizer}
        step={15}
        timeslots={1}
        formats={{
          timeGutterFormat: "HH:mm",
        }}
        components={{
          event: ({ event }) => (
            <span
            // onClick={ApptDetails(event)}
            >
              {event.title}
            </span>
          ),
        }}
      />
      <style>{customStyles()}</style>
    </Box>
  );
};

export default CustomReactBigCalendar;
