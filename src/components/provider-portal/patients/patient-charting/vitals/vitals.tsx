import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button, ButtonBase, Typography } from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { format, parseISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import HeartRateIcon from "../../../../../assets/image_svg/icons/ecg_heart.svg";
import BloodGlucodeIcon from "../../../../../assets/image_svg/icons/glucose.svg";
import BloodPressureIcon from "../../../../../assets/image_svg/icons/water_drop.svg";
import WeightIcon from "../../../../../assets/image_svg/icons/weight.svg";
import CustomDialog from "../../../../../common-components/custom-dialog/custom-dialog";
import CustomSelect from "../../../../../common-components/custom-select/customSelect";
import useApiFeedback from "../../../../../hooks/useApiFeedback";
import { ContentObject } from "../../../../../models/response/response-content-entity";
import { setIsLoading } from "../../../../../redux/actions/loader-action";
import {
  PatientVital,
  PatientVitalControllerService,
} from "../../../../../sdk/requests";
import { GetTenantId } from "../../../../../services/common/get-tenant-id";
import { toCamelCase } from "../../../../../utils/toCamelCase";
import VitalGraphsWithImageAnnotations from "./vital-graph-apex";
import VitalNoteForm from "./vital-note-form";

type vitalType = {
  type: string;
  measurement: string;
  value: string;
  icon: string;
  date: string;
  time: string;
  selected: boolean;
};

interface VitalRecord {
  uuid: string;
  patient: {
    id: string;
    name: string;
  };
  vitalName: string;
  value1: number;
  value2: number;
  unit: string;
  recordedDate: string;
  note: string | null;
}

const VitalsDetails = () => {
  const below1030 = useMediaQuery("(max-width : 1030px)");
  const { patientId } = useParams();
  const [listVitals, setListVitals] = useState<PatientVital[]>(
    [] as PatientVital[],
  );
  const [vitalsForGraph, setVitalsForGraph] = useState<PatientVital[]>(
    [] as PatientVital[],
  );
  const below1025 = useMediaQuery("(max-width:1025px)");
  const [openAddNoteDialog, setOpenAddNoteDialog] = useState(false);
  const [selectedVitalName, setSelectedVitalName] = useState("Blood Pressure");
  const [hasMore, setHasMore] = useState(false);
  const [page] = useState(0);
  const [size, setSize] = useState(10);
  const [selectedVital, setSelectedVital] = useState<PatientVital>();
  const [selectedAction, setSelectedAction] = useState("Add");

  //To set the height of ist container same as grapgh container
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(600);

  useEffect(() => {
    if (!containerRef.current) return;

    const obs = new ResizeObserver((e) => {
      const { blockSize } = e[0].borderBoxSize[0];
      setContainerHeight(blockSize);
    });
    obs.observe(containerRef.current);

    return () => {
      containerRef.current && obs.unobserve(containerRef.current);
    };
  }, [containerRef.current]);

  useEffect(() => {
    if (vitalsForGraph.length <= 0) {
      setContainerHeight(600);
    }
  }, [vitalsForGraph]);

  useEffect(() => {
    setSize(10);
  }, [selectedVitalName]);

  const [selectedTimePeriodOptions, setSelectedTimePeriodOptions] = useState<
    "LAST_MONTH" | "LAST_WEEK" | "PAST_24_HOURS" | "DATE_RANGE" | undefined
  >("LAST_MONTH");

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [sendSelectedTimePeriodOptions, setSendSelectedTimePeriodOptions] =
    useState<[string, string] | null>(null);

  useEffect(() => {
    if (endDate && startDate && endDate < startDate) {
      setEndDate(null);
    }
  }, [endDate]);

  const handleTimeSelectOptions = () => {
    if (selectedTimePeriodOptions === "LAST_WEEK") {
      setSendSelectedTimePeriodOptions(null);
    } else if (selectedTimePeriodOptions === "LAST_MONTH") {
      setSendSelectedTimePeriodOptions(null);
    } else if (selectedTimePeriodOptions === "PAST_24_HOURS") {
      setSendSelectedTimePeriodOptions(null);
    } else {
      setSendSelectedTimePeriodOptions(null);
    }
  };

  useEffect(() => {
    handleTimeSelectOptions();
  }, [selectedTimePeriodOptions, startDate, endDate]);

  //List of vitals APi
  const { data, isLoading, isSuccess, isError, error, refetch } = useQuery({
    queryKey: ["list-of-vitals", size, patientId, selectedVitalName, page],
    queryFn: () =>
      PatientVitalControllerService.getPatientVitals1({
        patientUuid: patientId || "",
        xTenantId: GetTenantId(),
        vitalName: selectedVitalName,
        page,
        size,
        timeFilter: undefined,
      }),
    enabled: !!patientId,
  });

  //List of vitals in graph
  const {
    data: dataGraph,
    // isLoading: isLoadingGraph,
    isSuccess: isSuccessGraph,
    // isError: isErrorGraph,
    // error: errorGraph,
    refetch: refetchGraph,
  } = useQuery({
    queryKey: [
      "list-of-vitals-in-graph",
      patientId,
      selectedVitalName,
      selectedTimePeriodOptions,
      sendSelectedTimePeriodOptions,
    ],
    queryFn: () =>
      PatientVitalControllerService.getPatientVitals1({
        patientUuid: patientId || "",
        xTenantId: GetTenantId(),
        vitalName: selectedVitalName,
        startDate:
          selectedTimePeriodOptions != "DATE_RANGE"
            ? undefined
            : startDate
              ? startDate.toISOString()
              : undefined,
        endDate:
          selectedTimePeriodOptions != "DATE_RANGE"
            ? undefined
            : endDate
              ? endDate.toISOString()
              : undefined,
        timeFilter:
          selectedTimePeriodOptions == "DATE_RANGE"
            ? undefined
            : selectedTimePeriodOptions,
      }),
    enabled: !!patientId && selectedTimePeriodOptions !== "DATE_RANGE",
  });

  useEffect(() => {
    if (selectedTimePeriodOptions !== "DATE_RANGE") {
      setStartDate(null);
      setEndDate(null);
    }
  }, [selectedTimePeriodOptions]);

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || "Vitals fetched successfully!") as string,
  );

  useEffect(() => {
    if (
      endDate &&
      endDate?.getTime() > 0 &&
      startDate &&
      startDate.getTime() > 0 &&
      selectedTimePeriodOptions === "DATE_RANGE"
    ) {
      refetchGraph();
    } else if (
      endDate &&
      endDate.getTime() > 0 &&
      selectedTimePeriodOptions === "DATE_RANGE"
    ) {
      refetchGraph();
    }
  }, [endDate, startDate]);

  //List of latest vitals API for cards above the graph
  const {
    data: latestVitalsData,
    isLoading: latestVitalsIsLoading,
    isSuccess: latestVitalsisSuccess,
  } = useQuery({
    queryKey: ["list-of-latest-vitals", patientId],
    queryFn: () =>
      PatientVitalControllerService.getPatientLatestVitals({
        patientUuid: patientId || "",
        xTenantId: GetTenantId(),
      }),
    enabled: !!patientId,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsLoading(isLoading || latestVitalsIsLoading));
  }, [dispatch, isLoading, latestVitalsIsLoading]);

  useEffect(() => {
    if (isSuccess) {
      const response = (data as unknown as AxiosResponse).data as ContentObject<
        PatientVital[]
      >;
      setListVitals(response.content);
      if (response?.page?.totalElements) {
        const hasMore = !!(
          response.content.length < response?.page?.totalElements || 0
        );
        setHasMore(hasMore);
      }
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isSuccessGraph) {
      const response = (dataGraph as unknown as AxiosResponse)
        .data as ContentObject<PatientVital[]>;
      setVitalsForGraph(response.content);
    }
  }, [dataGraph, isSuccessGraph]);

  const [vitalDetails, setVitalDetails] = useState<vitalType[]>([]);

  const iconMappings = [
    { type: "Blood Pressure", icon: BloodPressureIcon },
    { type: "Weight", icon: WeightIcon },
    { type: "Heart Rate", icon: HeartRateIcon },
    { type: "Blood Glucose", icon: BloodGlucodeIcon },
  ];

  const getIcon = (vitalName: string) => {
    const match = iconMappings.find((item) => item.type === vitalName);
    return match ? match.icon : HeartRateIcon;
  };

  useEffect(() => {
    if (latestVitalsisSuccess && vitalDetails.length === 0) {
      const res = (latestVitalsData as unknown as AxiosResponse).data;

      const latestData = res?.map((vitals: VitalRecord) => {
        if (!vitals) {
          return;
        }
        return {
          type: vitals.vitalName,
          measurement: vitals.unit,
          value: vitals.value2
            ? `${vitals.value1} / ${vitals.value2}`
            : `${vitals.value1}`,
          icon: getIcon(vitals.vitalName),
          date: vitals.recordedDate,
          time: "",
          selected: vitals.vitalName === "Blood Pressure" ? true : false,
        };
      });
      setVitalDetails(latestData);
    }
  }, [latestVitalsisSuccess, latestVitalsData]);

  const handleSelectVital = (vital: vitalType) => {
    setSelectedVitalName(vital.type);

    const updatedVitals = vitalDetails.map((item) => ({
      ...item,
      selected: item?.type === vital.type,
    }));

    setVitalDetails(updatedVitals);
  };

  const handleAddNote = (item: PatientVital) => {
    setOpenAddNoteDialog(true);
    setSelectedVital(item);
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      setSize((prev) => prev + 10);
    }
  };

  useEffect(() => {
    if (selectedTimePeriodOptions !== "LAST_MONTH") {
      setSelectedTimePeriodOptions("LAST_MONTH");
    }
  }, [selectedVitalName]);

  return (
    <Grid container height={"100%"} flexWrap={"nowrap"}>
      {vitalDetails.length <= 0 && listVitals.length <= 0 && (
        <Grid p={2} container width={"100%"} justifyContent={"center"}>
          <Typography variant="bodySmall" textAlign={"center"}>
            No vitals data available.
          </Typography>
        </Grid>
      )}

      {(vitalDetails.length > 0 || listVitals.length > 0) && (
        <>
          <Grid width={below1025 ? "25%" : "18%"} m={1} p={1}>
            {listVitals.length > 0 && (
              <InfiniteScroll
                dataLength={listVitals.length}
                next={handleLoadMore}
                height={
                  vitalsForGraph.length <= 0
                    ? "600px"
                    : containerHeight
                      ? `${containerHeight}px`
                      : below1025
                        ? "57vh"
                        : "59vh"
                }
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                {listVitals.map((item: PatientVital, index) => (
                  <Grid
                    bgcolor={"#FAF3F1"}
                    width={"100%"}
                    p={1}
                    borderRadius={"8px"}
                    mb={2}
                    key={index}
                  >
                    <Grid flexDirection={"column"} container rowGap={0}>
                      <Grid container>
                        <Grid width={"70%"} container flexDirection={"column"}>
                          <Grid container columnGap={1} alignItems={"baseline"}>
                            <Typography fontWeight={600} fontSize={"1.2rem"}>
                              {item?.value1}
                            </Typography>
                            {item?.value2 && (
                              <Typography fontWeight={600} fontSize={"1.2rem"}>
                                / {item?.value2}
                              </Typography>
                            )}
                            <Typography fontWeight={400} fontSize={"0.875rem"}>
                              {item?.unit}
                            </Typography>
                          </Grid>
                          <Grid container columnGap={1} alignItems={"baseline"}>
                            <Typography
                              fontWeight={400}
                              fontSize={"0.75rem"}
                              color="#515C5F"
                            >
                              {item?.recordedDate
                                ? format(
                                    parseISO(item?.recordedDate),
                                    "MM/dd/yy, hh:mm a",
                                  )
                                : ""}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          width={"30%"}
                          container
                          p={1}
                          height={"fit-content"}
                          justifyContent={"flex-end"}
                        >
                          <Grid
                            bgcolor={"#EFF8FF"}
                            borderRadius={"16px"}
                            height={"fit-content"}
                            p={"5px"}
                          >
                            <Typography
                              color={"#004AB1"}
                              fontSize={"0.75rem"}
                              fontWeight={550}
                            >
                              {item?.integrationType
                                ? toCamelCase(item?.integrationType)
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        mt={2}
                        mb={1}
                        justifyContent={"space-between"}
                      >
                        {!item.note && (
                          <Button
                            variant="outlined"
                            sx={{ height: "1.7rem", background: "white" }}
                            fullWidth
                            onClick={() => {
                              handleAddNote(item);
                              setSelectedAction("Add");
                            }}
                            startIcon={
                              <AddIcon sx={{ width: "16px", height: "16px" }} />
                            }
                          >
                            <Typography fontSize={"12px"} fontWeight={550}>
                              Add Note
                            </Typography>
                          </Button>
                        )}
                        {item.note && (
                          <>
                            <Button
                              variant="outlined"
                              sx={{
                                height: "1.7rem",
                                background: "white",
                                width: "49%",
                                padding: "0px",
                              }}
                              // fullWidth
                              onClick={() => {
                                handleAddNote(item);
                                setSelectedAction("View");
                              }}
                              startIcon={
                                <VisibilityOutlinedIcon
                                  sx={{
                                    width: "16px",
                                    height: "16px",
                                  }}
                                />
                              }
                            >
                              <Typography fontSize={"12px"} fontWeight={550}>
                                View Note
                              </Typography>
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={
                                <EditOutlinedIcon
                                  sx={{
                                    width: "16px",
                                    height: "16px",
                                  }}
                                />
                              }
                              sx={{
                                height: "1.7rem",
                                background: "white",
                                width: "49%",
                                padding: "0px",
                              }}
                              // fullWidth
                              onClick={() => {
                                handleAddNote(item);
                                setSelectedAction("Edit");
                              }}
                            >
                              <Typography fontSize={"12px"} fontWeight={550}>
                                Edit Note
                              </Typography>
                            </Button>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </InfiniteScroll>
            )}
            {listVitals.length <= 0 && (
              <Grid>
                <Typography variant="bodySmall">
                  No records available
                </Typography>
              </Grid>
            )}
          </Grid>

          <Grid
            width={"85%"}
            height={"100%"}
            border={"0.89px solid #DEE4ED "}
            borderRadius={"8px"}
          >
            {vitalDetails.length > 0 && (
              <Grid
                container
                height={"100%"}
                flexDirection={"column"}
                ref={containerRef}
              >
                <Grid container justifyContent={"space-between"}>
                  <Grid
                    p={2}
                    container
                    columnGap={below1025 ? 1 : 2}
                    rowGap={2}
                  >
                    {vitalDetails.length > 0 ? (
                      vitalDetails?.map((item, index) => (
                        <ButtonBase
                          key={index}
                          onClick={() => handleSelectVital(item)}
                        >
                          <Grid
                            border={
                              item?.selected
                                ? "1px solid rgba(0, 136, 254, 0.3)"
                                : "1px solid #CDD7DA"
                            }
                            sx={{
                              borderRadius: "8px",
                              p: "8px 12px",
                              display: "flex",
                              rowGap: "16px",
                              flexDirection: "column",
                              minWidth: "180px",
                            }}
                            bgcolor={
                              item?.selected
                                ? "rgba(0, 136, 254, 0.1)"
                                : "inherit"
                            }
                          >
                            <Grid justifyContent={"space-between"} container>
                              <Grid
                                container
                                columnGap={1}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                color={item?.selected ? "#006D8F" : "inherit"}
                              >
                                <Typography
                                  variant="bodyMedium"
                                  fontWeight={550}
                                  textAlign={"start"}
                                >
                                  {item?.value}
                                </Typography>
                                <Typography variant="bodySmall">
                                  {item?.measurement}
                                </Typography>
                              </Grid>
                              <Grid>
                                {item?.selected ? (
                                  <img src={item?.icon} />
                                ) : (
                                  <img src={item?.icon} />
                                )}
                              </Grid>
                            </Grid>
                            <Grid container flexDirection={"column"} rowGap={1}>
                              <Typography
                                variant="bodyMedium"
                                fontWeight={550}
                                textAlign={"start"}
                              >
                                {item?.type}
                              </Typography>

                              <Typography
                                variant="bodySmall"
                                color="#7E8C8E"
                                textAlign={"start"}
                              >
                                {item?.date
                                  ? format(
                                      parseISO(item?.date),
                                      "MM/dd/yy, hh:mm a",
                                    )
                                  : ""}
                              </Typography>
                            </Grid>
                          </Grid>
                        </ButtonBase>
                      ))
                    ) : (
                      <Grid p={2}>
                        <Typography variant="bodyMedium">
                          No latest vitals details available
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>

                {
                  <>
                    <Grid
                      container
                      justifyContent={"flex-end"}
                      columnGap={2}
                      alignItems={"center"}
                      pr={2}
                      // height={"80px"}
                    >
                      <>
                        {selectedTimePeriodOptions === "DATE_RANGE" && (
                          <Grid
                            container
                            gap={2}
                            height={"60px"}
                            mb={1}
                            sx={{ width: below1030 ? "35%" : "25%" }}
                          >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DemoContainer
                                components={["DatePicker", "DatePicker"]}
                              >
                                <Grid display={"flex"} gap={1}>
                                  <Grid
                                    width={"50%"}
                                    height={"70%"}
                                    marginTop={"7px !important"}
                                    // border={2}
                                  >
                                    <DatePicker
                                      disableFuture={true}
                                      label="Start Date"
                                      value={startDate}
                                      maxDate={new Date(endDate || "  ")}
                                      onChange={(newValue) => {
                                        if (newValue) {
                                          setStartDate(newValue);
                                        } else {
                                          setStartDate(null);
                                        }
                                      }}
                                      sx={{
                                        "& .MuiInputBase-input": {
                                          fontSize: "0.7rem",
                                          padding: "11px 20px",
                                          fontFamily: "Figtree, sans-serif",
                                        },
                                        "& .MuiInputLabel-root": {
                                          fontSize: "0.9rem", // Adjust label font size (if needed)
                                          marginTop: "-7px !important",
                                        },
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    container
                                    flexDirection={"row"}
                                    sx={{ whiteSpace: "nowrap" }}
                                    width={"50%"}
                                    height={"70%"}
                                    marginTop={"7px !important"}
                                  >
                                    <DatePicker
                                      disableFuture={true}
                                      label="End Date"
                                      value={endDate}
                                      minDate={new Date(startDate || "")}
                                      onChange={(newValue) => {
                                        if (newValue) {
                                          setEndDate(newValue);
                                        } else {
                                          setEndDate(null);
                                        }
                                      }}
                                      sx={{
                                        "& .MuiInputBase-input": {
                                          fontSize: "0.7rem",
                                          padding: "11px 20px",
                                          fontFamily: "Figtree, sans-serif",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                          borderRadius: "10px",
                                        },
                                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                          {
                                            borderRadius: "5px",
                                          },
                                        "& .MuiInputLabel-root": {
                                          fontSize: "0.9rem", // Adjust label font size (if needed)
                                          marginTop: "-7px !important",
                                        },
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </DemoContainer>
                            </LocalizationProvider>
                          </Grid>
                        )}
                        <Grid width={below1030 ? "20%" : "15%"} mr={1}>
                          <CustomSelect
                            items={[
                              { value: "LAST_WEEK", label: "Last Week" },
                              { value: "LAST_MONTH", label: "Last Month" },
                              {
                                value: "PAST_24_HOURS",
                                label: "Last 24 Hours",
                              },
                              { value: "DATE_RANGE", label: "Date Range" },
                            ]}
                            name=""
                            placeholder={"Select options"}
                            onChange={(e) => {
                              setSelectedTimePeriodOptions(
                                e.target.value as
                                  | "LAST_MONTH"
                                  | "LAST_WEEK"
                                  | "PAST_24_HOURS",
                              );
                            }}
                            value={selectedTimePeriodOptions || ""}
                          />
                        </Grid>

                        {selectedVitalName === "Blood Pressure" && (
                          <>
                            <Grid
                              container
                              alignItems={"baseline"}
                              columnGap={1}
                            >
                              <Typography variant="bodyMedium">
                                {selectedVitalName !== "Blood Pressure"
                                  ? "Readings"
                                  : "Systolic"}
                              </Typography>
                              <Grid
                                width={"12px"}
                                height={"12px"}
                                bgcolor={"#E257FF"}
                              ></Grid>
                            </Grid>
                            <Grid
                              container
                              alignItems={"baseline"}
                              columnGap={1}
                            >
                              <Typography variant="bodyMedium">
                                Diastolic
                              </Typography>
                              <Grid
                                width={"12px"}
                                height={"12px"}
                                borderRadius={"6px"}
                                bgcolor={"#E257FF"}
                              ></Grid>
                            </Grid>
                          </>
                        )}
                      </>
                    </Grid>
                    {/* Graph */}
                    {vitalsForGraph.length > 0 ? (
                      <Grid>
                        <VitalGraphsWithImageAnnotations
                          vitals={vitalsForGraph}
                          refetch={() => {
                            refetchGraph();
                            refetch();
                          }}
                        />
                      </Grid>
                    ) : (
                      <Grid p={2}>
                        <Typography variant="bodySmall">{`No records found for ${selectedVitalName}`}</Typography>
                      </Grid>
                    )}
                    <Grid
                      container
                      justifyContent={"center"}
                      columnGap={2}
                      mt={below1025 ? 0 : "20px"}
                      mb={below1025 ? 0 : "20px"}
                    >
                      <Grid container alignItems={"baseline"} columnGap={1}>
                        <Typography variant="bodyMedium">
                          Normal Reading
                        </Typography>
                        <Grid
                          width={"12px"}
                          height={"12px"}
                          borderRadius={"6px"}
                          bgcolor={"#02B966"}
                        ></Grid>
                      </Grid>
                      <Grid container alignItems={"baseline"} columnGap={1}>
                        <Typography variant="bodyMedium">
                          Warning Reading
                        </Typography>
                        <Grid
                          width={"12px"}
                          height={"12px"}
                          borderRadius={"6px"}
                          bgcolor={"#F2930D"}
                        ></Grid>
                      </Grid>
                      <Grid container alignItems={"baseline"} columnGap={1}>
                        <Typography variant="bodyMedium">
                          Critical Reading
                        </Typography>
                        <Grid
                          width={"12px"}
                          height={"12px"}
                          borderRadius={"6px"}
                          bgcolor={"#F21B0D"}
                        ></Grid>
                      </Grid>
                    </Grid>
                  </>
                }
              </Grid>
            )}
            {vitalDetails.length <= 0 && (
              <Grid p={2}>
                <Typography variant="bodySmall">
                  No records available
                </Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}
      <CustomDialog
        title={
          selectedAction === "Add"
            ? "Add Note"
            : selectedAction === "Edit"
              ? "Edit Note"
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
          action={selectedAction}
          onClose={() => setOpenAddNoteDialog(false)}
          refetch={() => refetch()}
        />
      </CustomDialog>
    </Grid>
  );
};

export default VitalsDetails;
