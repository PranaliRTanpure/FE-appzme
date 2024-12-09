// import {
//   CategoryScale,
//   Chart as ChartJS,
//   Legend,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Tooltip,
// } from "chart.js";
// import annotationPlugin from "chartjs-plugin-annotation";
// import { Line } from "react-chartjs-2";

// import { alpha } from "@mui/system";
// import { ChartOptions } from "chart.js";
// ChartJS.register(
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Tooltip,
//   Legend,
//   annotationPlugin,
// );

// const VitalGraphs = () => {
//   const notes = [
//     {
//       dataset: "systolic",
//       index: 0,
//       yValue: 125,
//       text: "High systolic reading on day 1",
//     },
//     {
//       dataset: "diastolic",
//       index: 1,
//       yValue: 85 + 5,
//       text: "Low diastolic reading on day 1",
//     },
//     // {
//     //   dataset: "diastolic",
//     //   index: 2,
//     //   yValue: 78,
//     //   text: "Low diastolic reading on day 3",
//     // },
//   ];
//   const systolicData = [
//     120, 130, 125, 140, 135, 145, 150, 140, 130, 125, 120, 130, 125, 140, 135,
//     145, 150, 140, 130, 125, 120, 130, 125, 140, 135, 145, 150, 140, 130, 125,
//     111,
//   ];
//   const diastolicData = [
//     80, 85, 78, 90, 88, 92, 95, 85, 82, 80, 80, 85, 78, 90, 88, 92, 95, 85, 82,
//     80, 80, 85, 78, 90, 88, 92, 95, 85, 82, 80, 75,
//   ];

//   const thresholds = {
//     normal: { min: 90, max: 130 },
//     warning: { min: 130, max: 150 },
//     critical: { min: 150 },
//   };

//   // Dynamically generate annotations from the notes array
//   const generateAnnotations = (notes: { index: number; yValue: number }[]) => {
//     const annotations: Record<
//       string,
//       {
//         type: string;
//         xValue: number;
//         yValue: number;
//         content: string[];
//         backgroundColor: string;
//         borderWidth: number;
//         font: { size: number };
//       }
//     > = {};
//     notes.forEach((note: { index: number; yValue: number }, i: number) => {
//       annotations[`note${i}`] = {
//         type: "label",
//         xValue: note.index, // X-axis value (labels are 1-based)
//         yValue: note.yValue, // Y-axis value
//         content: ["📝"], // Note icon (can replace with text)
//         backgroundColor: "rgba(255, 255, 255, 0)", // Transparent background
//         borderWidth: 0,
//         font: {
//           size: 14,
//         },
//         // label: {
//         //   content: ["📓"], // The emoji
//         //   font: {
//         //     size: 16,
//         //   },
//         // },
//         // tooltip: {
//         //   enabled: true,
//         //   title: note.text, // Tooltip title with the text of the note
//         // },
//       };
//     });
//     return annotations;
//   };

//   // Function to assign colors dynamically
//   const getPointColors = (
//     data: number[],
//     thresholds: {
//       normal: {
//         min: number;
//         max: number;
//       };
//       warning: {
//         min: number;
//         max: number;
//       };
//       critical: {
//         min: number;
//       };
//     },
//   ) => {
//     return data.map((value) => {
//       if (value < thresholds.normal.min) return "#F21B0D"; // Below normal
//       if (value <= thresholds.normal.max) return "#02B966"; // Normal
//       if (value <= thresholds.warning.max) return "#F2930D"; // Warning
//       return "red"; // Critical
//     });
//   };

//   // Assign colors to points
//   const systolicColors = getPointColors(systolicData, thresholds);
//   const diastolicColors = getPointColors(diastolicData, thresholds);

//   const data = {
//     labels: Array.from({ length: 31 }, (_, i) => `${i + 1}`),
//     // [
//     //   "1",
//     //   "2",
//     //   "3",
//     //   "4",
//     //   "5",
//     //   "6",
//     //   "7",
//     //   "8",
//     //   "9",
//     //   "10",
//     //   "11",
//     //   "12",
//     //   "13",
//     //   "14",
//     //   "15",
//     //   "16",
//     //   "17",
//     //   "18",
//     //   "19",
//     //   "20",
//     //   "21",
//     //   "22",
//     //   "23",
//     //   "24",
//     //   "25",
//     //   "26",
//     //   "27",
//     //   "28",
//     //   "29",
//     //   "30",
//     //   "31",
//     // ],
//     // X-axis labels
//     datasets: [
//       {
//         label: "systolic",
//         data: systolicData,
//         borderColor: "#3295D2",
//         // backgroundColor: "rgba(0, 136, 254, 0.2)", // Fill color for systolic
//         fill: "+1", // Fill to the dataset below (pink area)
//         pointBackgroundColor: systolicColors, // Assign colors for each point
//         pointBorderColor: systolicColors, // Ensure border matches
//         borderWidth: 1,
//         pointRadius: 4,
//       },
//       {
//         label: "diastolic",
//         data: diastolicData, // Y-axis data points
//         borderColor: "#E257FF",
//         // backgroundColor: "rgba(255, 99, 132, 0.2)", // Fill color for diastolic
//         fill: "start", // Fill to the bottom of the chart
//         pointBackgroundColor: diastolicColors, // Assign colors for each point
//         pointBorderColor: diastolicColors, // Ensure border matches
//         borderWidth: 1,
//         pointRadius: 4,
//       },
//     ],
//   };

//   // Define the type for the Chart.js options explicitly
//   const options: ChartOptions<"line"> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top", // Ensure this matches the allowed string literals
//         display: false,
//       },
//       tooltip: {
//         enabled: true,
//         callbacks: {
//           title: function (tooltipItems) {
//             const index = tooltipItems[0].dataIndex;
//             const datasetLabel = tooltipItems[0].dataset.label;
//             const note = notes.find(
//               (note) =>
//                 note.index === index &&
//                 note.dataset.toLowerCase() === datasetLabel?.toLowerCase(),
//             );
//             return note ? note.text : tooltipItems[0].label; // Show note text if available
//           },
//           label: function (tooltipItem) {
//             return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
//           },
//         },
//       },
//       annotation: {
//         annotations: {
//           ...generateAnnotations(notes),
//           blueRegion: {
//             type: "box",
//             yMin: 100, // Start of blue region
//             yMax: 160, // End of blue region
//             backgroundColor: "rgba(0, 136, 254, 0.2)", // Semi-transparent blue
//             borderWidth: 0, // No border
//           },
//           pinkRegion: {
//             type: "box",
//             yMin: 60, // Start of pink region
//             yMax: 100, // End of pink region
//             backgroundColor: alpha("#E257FF", 0.2), // Semi-transparent pink
//             borderWidth: 0, // No border
//           },
//           // background: rgba(251, 233, 255, 1);
//         },
//       },
//     },

//     scales: {
//       x: {
//         grid: {
//           display: false, // Hide vertical gridlines
//         },
//         // Adjust the categoryPercentage value to control the spacing between points
//         offset: true, // Makes sure the chart starts from the left edge
//         type: "category",
//       },
//       y: {
//         grid: {
//           display: false, // Hide horizontal gridlines
//         },
//         beginAtZero: true,
//         max: 180,
//       },
//     },
//   };

//   return (
//     <>
//       <Line data={data} options={options} />
//     </>
//   );
// };

// export default VitalGraphs;
