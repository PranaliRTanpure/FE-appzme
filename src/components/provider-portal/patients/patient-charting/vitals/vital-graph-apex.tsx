import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import img from "../../../../../assets/image_svg/icons/text-snippet.svg";
import CustomDialog from "../../../../../common-components/custom-dialog/custom-dialog";
import { PatientVital } from "../../../../../sdk/requests";
import VitalNoteForm from "./vital-note-form";
import { format, parseISO } from "date-fns";

interface NoteType {
  dataset: string;
  index: number;
  yValue: number;
  text: string;
  imagePath: string;
  recordedDate: string;
}

const VitalGraphsWithImageAnnotations = (props: {
  vitals: PatientVital[];
  refetch: () => void;
}) => {
  const [systolicData, setSystolicData] = useState<number[]>([] as number[]);
  const [diastolicData, setDiastolicData] = useState<number[]>([] as number[]);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedVital, setSelectedVital] = useState<PatientVital>();
  const [openAddNoteDialog, setOpenAddNoteDialog] = useState(false);

  //Setting datapoints and notes
  useEffect(() => {
    if (props?.vitals?.length === 0) {
      return;
    }

    const systolicData =
      props.vitals?.map((vital) => {
        return vital.value1 as number;
      }) || ([] as number[]);
    setSystolicData(systolicData);

    const diastolicData =
      props.vitals?.map((vital) => {
        return vital.value2 as number;
      }) || ([] as number[]);
    setDiastolicData(diastolicData);

    const notes = [] as NoteType[];
    props?.vitals?.map((vital, index) => {
      if (vital.note) {
        notes.push({
          dataset: "systolic",
          index: index,
          yValue: vital.value1 as number,
          text: `${vital.note?.name}`,
          imagePath: img,
          recordedDate: vital.recordedDate || "",
        });
      }
    });
    setNotes(notes);
  }, [props.vitals]);

  //Threshhold for min max for BP
  const thresholds =
    props.vitals[0].vitalName === "Blood Pressure"
      ? {
          normal: { min: 100, max: 130 },
          warning: { min: 130, max: 150 },
          critical: { min: 150 },
        }
      : props.vitals[0].vitalName === "Heart Rate"
        ? {
            normal: { min: 60, max: 100 },
            warning: { min: 50, max: 60 },
            critical: { max: 50, min: 120 },
          }
        : props.vitals[0].vitalName === "Weight"
          ? {
              normal: { min: 50, max: 75 },
              warning: { min: 75, max: 90 },
              critical: { max: 50, min: 90 },
            }
          : props.vitals[0].vitalName === "Blood Glucose"
            ? {
                normal: { min: 70, max: 140 },
                warning: { min: 140, max: 199 },
                critical: { max: 70, upper: 200 },
              }
            : {
                normal: { min: 70, max: 140 },
                warning: { min: 140, max: 199 },
                critical: { max: 70, upper: 200 },
              };

  // Function to determine marker colors dynamically
  const getMarkerColor = (value: number) => {
    if (value < thresholds.normal.min) return "#F21B0D"; // Below normal
    if (value <= thresholds.normal.max) return "#02B966"; // Normal
    if (value <= thresholds.warning.max) return "#F2930D"; // Warning
    return "#FF0000"; // Critical
  };

  const systolicColors = systolicData.map(getMarkerColor);
  const diastolicColors = diastolicData.map(getMarkerColor);

  //To add image/svg in graph
  const pointAnnotations = notes.map((note) => ({
    x: new Date(note.recordedDate).getTime(),
    y: note.yValue,
    marker: { size: 0 },
    image: {
      path: img,
      width: 20,
      height: 20,
      offsetX: 20,
    },
  }));

  const formattedDate = (timestamp: number) => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      // hour: "numeric",
      // minute: "numeric",
      // hour12: true,
    }).format(timestamp);
    return formattedDate || "-";
  };

  const options = {
    chart: {
      events: {
        markerClick: (
          event: unknown,
          chartContext: unknown,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { seriesIndex, dataPointIndex }: any
        ) => {
          event;
          chartContext;
          seriesIndex;
          setSelectedVital(props.vitals[dataPointIndex]);
          setOpenAddNoteDialog(true);
        },
      },
      zoom: {
        enabled: false,
      },
      type: "line" as
        | "line"
        | "area"
        | "bar"
        | "pie"
        | "donut"
        | "radialBar"
        | "scatter"
        | "bubble"
        | "heatmap"
        | "candlestick"
        | "boxPlot"
        | "radar"
        | "polarArea"
        | "rangeBar"
        | "rangeArea"
        | "treemap",
      height: 350,
      toolbar: {
        show: false,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          customIcons: [],
        },
      },
    },
    annotations: {
      points: [...pointAnnotations],
    },

    xaxis: {
      tickPlacement: "on",
      tooltip: {
        enabled: false,
      },
      title: {
        text: "dd/mm",
      },

      tickInterval: 86400000,
      categories: props.vitals.map((vital) => vital.recordedDate),
      type: "datetime" as "numeric" | "datetime" | "category" | undefined,
      labels: {
        format: "dd/MM",

        // formatter: function (_value: any, timestamp: number) {
        //   return formattedDate(timestamp);
        // },
      },
    },
    yaxis: {
      min: 0,
      max:
        props.vitals[0].vitalName === "Blood Pressure"
          ? 240
          : props.vitals[0].vitalName === "Heart Rate"
            ? 200
            : props.vitals[0].vitalName === "Blood Glucose"
              ? 320
              : props.vitals[0].vitalName === "Weight"
                ? 320
                : 200,
      tickInterval: 20,
      tickAmount:
        props.vitals[0].vitalName === "Blood Pressure"
          ? 12
          : props.vitals[0].vitalName === "Heart Rate"
            ? 10
            : props.vitals[0].vitalName === "Blood Glucose"
              ? 16
              : props.vitals[0].vitalName === "Weight"
                ? 16
                : 10,
      title: { text: props.vitals[0].unit || "unit" },
    },
    stroke: {
      curve: "smooth" as
        | "smooth"
        | "straight"
        | "stepline"
        | "linestep"
        | "monotoneCubic"
        | ("smooth" | "straight" | "stepline" | "linestep" | "monotoneCubic")[],
      width: 2,
    },
    markers: {
      size: 7.5,
      colors: undefined,
      hover: { size: 8 },
      shape: ["square", "circle"] as unknown as
        | "circle"
        | "square"
        | "rect"
        | "line"
        | "cross"
        | "plus"
        | "star"
        | "sparkle"
        | "diamond"
        | "triangle"[],
    },
    colors: ["#E257FF"], // Line colors for Systolic and Diastolic
    tooltip: {
      shared: false,
      intersect: true,
      y: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (value: any, { seriesIndex, dataPointIndex }: any) => {
          const dataset = seriesIndex === 0 ? "systolic" : "diastolic";
          const note = notes.find(
            (item) => item.index === dataPointIndex && item.dataset === dataset
          );

          if (note) {
            return `${value} `;
          }
          return `${value}`;
        },
      },
      x: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (value: any, { seriesIndex, dataPointIndex }: any) => {
          const dataset = seriesIndex === 0 ? "systolic" : "diastolic";

          const note = notes.find(
            (item) => item.index === dataPointIndex && item.dataset === dataset
          );

          // const dataset2 = seriesIndex === 0 ? "systolic" : "diastolic";
          const note2 = notes.find(
            (item) => item.index === dataPointIndex && item.dataset !== dataset
          );
          if (note) {
            const maxLength = 50; // Limit the text length to avoid excessive overflow
            const truncatedText =
              note.text.length > maxLength
                ? note.text.substring(0, maxLength) + "..."
                : note.text;
            return `${format(parseISO(note.recordedDate), "dd MMM yyyy, hh:mm a")}.   Note : ${truncatedText}`;
          }

          if (note2) {
            const maxLength = 150; // Limit the text length to avoid excessive overflow
            const truncatedText =
              note2.text.length > maxLength
                ? note2.text.substring(0, maxLength) + "..."
                : note2.text;
            return `${format(parseISO(note2.recordedDate), "dd MMM yyyy, hh:mm a")},   Note : ${truncatedText}`;
          }

          return `${formattedDate(value)}`;
        },
      },
    },
    legend: {
      show: false,
    },
  };

  //To add one more dat in graph so that noe icon will not hide for last markers
  const lastDate = new Date(props.vitals[0].recordedDate);
  const nextDate = new Date(lastDate);
  nextDate.setDate(lastDate.getDate() + 1); // Add one day to the last date

  const mapDataOtherThanBP = () => {
    const dataArray = props.vitals.map((vitalVal, i) => ({
      x: vitalVal.recordedDate,
      y: vitalVal.value1,
      fillColor: systolicColors[i], // Dynamic marker color for Systolic
      markers: { shape: "square", size: 10 },
    }));

    dataArray.push({
      x: nextDate.toISOString().split("T")[0], // Add next day's date
      y: undefined as unknown as number,
      fillColor: "#ccc", // Default color for empty data
      markers: { shape: "square", size: 10 },
    });

    return dataArray;
  };

  const mapSystolicData = () => {
    const dataArray = props.vitals.map((vitalVal, i) => ({
      x: vitalVal.recordedDate,
      y: vitalVal.value1,
      fillColor: systolicColors[i], // Dynamic marker color for Systolic
      markers: { shape: "square", size: 10 },
    }));

    // Empty value
    dataArray.push({
      x: nextDate.toISOString().split("T")[0], // Add next day's date
      y: undefined as unknown as number,
      fillColor: "#ccc",
      markers: { shape: "square", size: 10 },
    });
    return dataArray;
  };

  const mapDistolicData = () => {
    const dataArray = props.vitals.map((vitalVal, i) => ({
      x: vitalVal.recordedDate,
      y: vitalVal.value2,
      fillColor: diastolicColors[i], // Dynamic marker color for Diastolic
    }));

    // Empty value
    dataArray.push({
      x: nextDate.toISOString().split("T")[0], // Add next day's date
      y: undefined,
      fillColor: "#ccc",
    });

    return dataArray;
  };
  const series =
    props.vitals[0].vitalName === "Blood Pressure"
      ? [
          {
            name: "Systolic",
            data: mapSystolicData(),
          },
          {
            name: "Diastolic",
            data: mapDistolicData(),
          },
        ]
      : [
          {
            name: props.vitals.length > 0 ? props.vitals[0].vitalName : "",
            data: mapDataOtherThanBP(),
          },
        ];

  const typedOptions: ApexOptions = options;

  return (
    <>
      <ReactApexChart
        options={typedOptions}
        series={series}
        type="line"
        height={350}
      />
      <CustomDialog
        title={
          selectedVital && !!selectedVital?.note
            ? "Edit Note"
            : !selectedVital?.note
              ? "Add Note"
              : "View Note"
        }
        width={"500px"}
        buttonName={[]}
        open={openAddNoteDialog}
        onClose={function (): void {
          setOpenAddNoteDialog(false);
        }}
      >
        <VitalNoteForm
          vitalNote={selectedVital || ({} as PatientVital)}
          vitalType={""}
          action={
            selectedVital && !!selectedVital?.note
              ? "Edit"
              : !selectedVital?.note
                ? "Add"
                : "View"
          }
          onClose={() => setOpenAddNoteDialog(false)}
          refetch={() => props.refetch()}
        />
      </CustomDialog>
    </>
  );
};

export default VitalGraphsWithImageAnnotations;
