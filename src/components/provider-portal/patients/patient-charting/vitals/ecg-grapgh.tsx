// import ReactApexChart from "react-apexcharts";

// const ECGChartWithAnnotations = () => {
//   // Example ECG readings
//   const ecgData = [72, 76, 80, 85, 88, 92, 95, 89, 84, 81, 78, 77, 73, 70];

//   const thresholds = {
//     normal: { min: 60, max: 100 },
//     warning: { min: 100, max: 120 },
//     critical: { min: 120 },
//   };

//   // Function to determine marker colors dynamically
//   const getMarkerColor = (value: number) => {
//     if (value < thresholds.normal.min) return "#F21B0D"; // Below normal
//     if (value <= thresholds.normal.max) return "#02B966"; // Normal
//     if (value <= thresholds.warning.max) return "#F2930D"; // Warning
//     return "#FF0000"; // Critical
//   };

//   const ecgColors = ecgData.map(getMarkerColor);

//   const notes = [
//     {
//       index: 1,
//       yValue: 76,
//       text: "Elevated ECG reading",
//       imagePath:""
//     },
//     {
//       index: 5,
//       yValue: 92,
//       text: "High ECG reading",
//       imagePath:""
//     },
//   ];

//   const pointAnnotations = notes.map((note) => ({
//     x: note.index + 1,
//     y: note.yValue,
//     marker: { size: 0 },
//     image: {
//       path: note.imagePath,
//       width: 20,
//       height: 20,
//     },
//   }));

//   // Ensure 30 days on x-axis
//   const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

//   // Pad the data with nulls to align with the x-axis
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const padDataToDays = (data: any[], totalDays: number) => {
//     const padded = Array.from({ length: totalDays }, (_, i) => data[i] ?? null);
//     return padded;
//   };

//   const ecgPadded = padDataToDays(ecgData, daysInMonth.length);

//   const options = {
//     chart: { type: "line", height: 350, id: "areachart-2" },
//     annotations: { points: [...pointAnnotations] },
//     xaxis: {
//       categories: daysInMonth, // Always show 30 days
//       title: { text: "Days" },
//     },
//     yaxis: { min: 50, max: 150, title: { text: "ECG Readings" } },
//     stroke: { curve: "smooth" },
//     markers: {
//       size: 6,
//       hover: { size: 8 },
//     },
//     colors: ["#3295D2"], // Line color for ECG
//     tooltip: {
//       shared: true,
//       intersect: false,
//       y: {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         formatter: (value: any, { dataPointIndex }: any) => {
//           const note = notes.find((item) => item.index === dataPointIndex);
//           return note ? `${value} (${note.text})` : `${value}`;
//         },
//       },
//       x: {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         formatter: (value: any, { dataPointIndex }: any) => {
//           const note = notes.find((item) => item.index === dataPointIndex);
//           return note ? `Day ${value} (${note.text})` : `Day ${value}`;
//         },
//       },
//     },
//   };

//   const series = [
//     {
//       name: "ECG",
//       data: ecgPadded.map((y, i) => ({
//         x: i + 1,
//         y,
//         fillColor: ecgColors[i] || null,
//       })),
//     },
//   ];

//   return (
//     <ReactApexChart
//       options={options}
//       series={series}
//       type="line"
//       height={350}
//     />
//   );
// };

// export default ECGChartWithAnnotations;
