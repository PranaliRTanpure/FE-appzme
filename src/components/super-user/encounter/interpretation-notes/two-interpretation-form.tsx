import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { Grid, useMediaQuery } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useFormContext } from "react-hook-form";
import CustomSelect from "@/common-components/custom-select/customSelect";
import {
  CheckboxData,
  CheckboxWithTextFields,
} from "./interpretation-checkbox";
import { useState } from "react";
import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomInput from "@/common-components/custom-input/custom-input";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import React from "react";
import CheckBox from "@/common-components/custom-checkbox/checkbox";

export const studyData = [
  {
    title: "Study 1",
    description: "AHI - 27.86, Time below 88% was - 35.03 minutes.",
  },
  {
    title: "Study 2",
    description: "AHI - 15.45, Time below 88% was - 12.50 minutes.",
  },
  {
    title: "Study 3",
    description: "AHI - 10.23, Time below 88% was - 5.20 minutes.",
  },
];

export const diagnosisData = [
  {
    name: "No Diagnosis due to insufficient data.",
    label: "No Diagnosis due to insufficient data.",
  },
  {
    name: "Obstructive Sleep Apnea (Mild)",
    label: "Obstructive Sleep Apnea (Mild)",
  },
  {
    name: "Obstructive Sleep Apnea (Moderate)",
    label: "Obstructive Sleep Apnea (Moderate)",
  },
  {
    name: "Obstructive Sleep Apnea (Severe)",
    label: "Obstructive Sleep Apnea (Severe)",
  },
  {
    name: "Central Sleep Apnea",
    label: "Central Sleep Apnea",
  },
  {
    name: "Periodic Limb Movement Disorder",
    label: "Periodic Limb Movement Disorder",
  },
  {
    name: "Nocturnal Hypoxemia",
    label: "Nocturnal Hypoxemia",
  },
  {
    name: "Insomnia",
    label: "Insomnia",
  },
  {
    name: "Narcolepsy",
    label: "Narcolepsy",
  },
  {
    name: "Restless Leg Syndrome",
    label: "Restless Leg Syndrome",
  },
  {
    name: "REM Sleep Behavior Disorder",
    label: "REM Sleep Behavior Disorder",
  },
  {
    name: "Normal Sleep Study",
    label: "Normal Sleep Study",
  },
];

const TwoInterpretationForm = () => {
  const { control, setValue } = useFormContext();
  const [checkboxStates, setCheckboxStates] = useState<{
    [key: string]: boolean;
  }>(
    diagnosisData.reduce(
      (acc, item) => {
        acc[item.label] = false;
        return acc;
      },
      {} as { [key: string]: boolean },
    ),
  );
  const [data, setData] = useState<CheckboxData[]>([
    { name: "gilad", label: "Gilad" },
    { name: "antoine", label: "Antoine" },
    { name: "sanskruti", label: "Sanskruti" },
    { name: "Sujwal", label: "Sujwal" },
    { name: "prachi", label: "Prachi" },
    { name: "pranali", label: "Pranali" },
    { name: "tejas", label: "Tejas" },
    { name: "shiv", label: "Shiv" },
    { name: "gaurav", label: "Gaurav" },
  ]);
  const [recommendationData, setRecommendationData] = useState<CheckboxData[]>([
    { name: "gilad", label: "Gilad" },
    { name: "antoine", label: "Antoine" },
    { name: "sanskruti", label: "Sanskruti" },
    { name: "Sujwal", label: "Sujwal" },
    { name: "prachi", label: "Prachi" },
    { name: "pranali", label: "Pranali" },
    { name: "tejas", label: "Tejas" },
    { name: "shiv", label: "Shiv" },
    { name: "gaurav", label: "Gaurav" },
  ]);
  const [diagnosisDataState, setDiagnosisDataState] = useState<CheckboxData[]>(
    [],
  );
  const belowHeight768 = useMediaQuery("(max-height:768px)");
  const belowHeight900 = useMediaQuery("(max-height:900px)");

  const addNewCheckbox = () => {
    const newCheckbox = {
      name: ``,
      label: ``,
    };
    setData([...data, newCheckbox]);
  };

  const addNewDiagnosisCheckbox = () => {
    const newCheckbox = {
      name: ``,
      label: ``,
    };
    setDiagnosisDataState([...diagnosisDataState, newCheckbox]);
  };

  const addNewRecommendationCheckbox = () => {
    const newCheckbox = {
      name: ``,
      label: ``,
    };
    setRecommendationData([...recommendationData, newCheckbox]);
  };

  const handleCheckboxChange = (label: string, isChecked: boolean) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [label]: isChecked,
    }));
  };

  return (
    <Grid
      container
      width={"100%"}
      height={belowHeight768 ? "36vh" : belowHeight900 ? "57vh" : "60vh"}
      maxHeight={"60vh"}
      flexDirection={"column"}
      bgcolor={"white"}
      p={2}
      flexWrap={"nowrap"}
      rowGap={2}
      borderRadius={5}
      sx={{ overflowX: "auto" }}
    >
      {/* Impression Grid*/}
      <Grid
        container
        width={"100%"}
        flexDirection={"column"}
        borderBottom={"1px solid #E7E7E7"}
        rowGap={1}
        pb={2}
      >
        <Grid
          container
          width={"100%"}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          <Grid alignContent={"center"}>
            <Typography variant="bodySmall" fontWeight={600}>
              Impressions:
            </Typography>
          </Grid>
          <Button
            variant="outlined"
            onClick={addNewCheckbox}
            sx={{ bgcolor: "#F1F8FF" }}
            startIcon={
              <AddIcon
                sx={{
                  color: "#106DCC",
                }}
              />
            }
          >
            <Typography variant="bodySmall">Add Impression</Typography>
          </Button>
        </Grid>
        <Grid container width={"100%"} alignContent={"center"} columnGap={1}>
          <Grid alignContent={"center"}>
            <Typography variant="bodySmall">
              Select degree of Sleep Apnea :
            </Typography>
          </Grid>
          <Grid width={"15%"}>
            <Controller
              control={control}
              name="degreeOfSleepApnea"
              render={({ field }) => (
                <CustomSelect
                  placeholder={"Select"}
                  name={field.name}
                  value={field.value}
                  items={[
                    { value: "Mild", label: "Mild" },
                    { value: "Moderate", label: "Moderate" },
                    { value: "OTHER", label: "Other" },
                  ]}
                  bgWhite={false}
                  onChange={function (e: SelectChangeEvent<string>): void {
                    setValue("degreeOfSleepApnea", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              )}
            />
          </Grid>
          <Grid alignContent={"center"}>
            <Typography variant="bodySmall">
              {`(Selected based on AHI: <5.0 no, 5.0-14.9 mild, 15-29.9 moderate, 30 severe)`}
            </Typography>
          </Grid>
        </Grid>
        <Grid container width={"100%"}>
          <CheckboxWithTextFields data={data} size={4} />
        </Grid>
      </Grid>
      {/* Diagnosis Grid */}
      <Grid
        container
        flexDirection={"column"}
        width={"100%"}
        borderBottom={"1px solid #E7E7E7"}
        pb={2}
        rowGap={2}
      >
        <Grid
          container
          width={"100%"}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          <Grid alignContent={"center"}>
            <Typography variant="bodySmall" fontWeight={600}>
              Diagnosis:
            </Typography>
          </Grid>
          <Button
            variant="outlined"
            onClick={addNewDiagnosisCheckbox}
            sx={{ bgcolor: "#F1F8FF" }}
            startIcon={
              <AddIcon
                sx={{
                  color: "#106DCC",
                }}
              />
            }
          >
            <Typography variant="bodySmall">Add Diagnosis</Typography>
          </Button>
        </Grid>
        <Grid container width={"100%"}>
          {diagnosisData.map((item, index) => (
            <Grid size={4}>
              <CheckBox
                key={index}
                label={item.label}
                checked={checkboxStates[item.label]}
                handleChange={(e) =>
                  handleCheckboxChange(item.label, e.target.checked)
                }
              />
            </Grid>
          ))}
          <Grid width={"99.58%"}>
            <CheckboxWithTextFields data={diagnosisDataState} size={4} />
          </Grid>
        </Grid>
      </Grid>
      {/* Recommendation: Grid*/}
      <Grid
        container
        width={"100%"}
        flexDirection={"column"}
        borderBottom={"1px solid #E7E7E7"}
        rowGap={1}
        pb={2}
      >
        <Grid
          container
          width={"100%"}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          <Grid alignContent={"center"}>
            <Typography variant="bodySmall" fontWeight={600}>
              Recommendation:
            </Typography>
          </Grid>
          <Button
            variant="outlined"
            onClick={addNewRecommendationCheckbox}
            sx={{ bgcolor: "#F1F8FF" }}
            startIcon={
              <AddIcon
                sx={{
                  color: "#106DCC",
                }}
              />
            }
          >
            <Typography variant="bodySmall">Add Recommendation</Typography>
          </Button>
        </Grid>
        <Grid container width={"100%"}>
          <CheckboxWithTextFields data={recommendationData} size={12} />
        </Grid>
      </Grid>
      {/*Technical Report Grid*/}
      <Grid
        container
        flexDirection={"column"}
        width={"100%"}
        borderBottom={"1px solid #E7E7E7"}
        pb={2}
        rowGap={3}
      >
        <Grid alignContent={"center"}>
          <Typography variant="bodySmall" fontWeight={600}>
            Technical Report:
          </Typography>
        </Grid>
        <Grid container flexDirection={"column"} rowGap={2}>
          <Grid alignContent={"center"}>
            <Typography variant="bodySmall" fontWeight={500}>
              Sleep Study Technique (Protocol):
            </Typography>
          </Grid>
          <Grid alignContent={"center"}>
            <Typography variant="bodySmall" fontWeight={400}>
              {`A multi-night portable sleep study was performed to diagnose or rule out obstructive sleep apnea (
          G47.33 (327.33 ICD-9]). The channels recorded were: peripheral arterial tone (PAT), oxygen saturation with
           pulse oximetry, thoracic movement, snoring, and body position were also monitored. The studies were manually 
           scored by a RPSGT using a 4% drop for desaturations.`}
            </Typography>
          </Grid>
          <Grid width={"100%"}>
            <CustomLabel label="Add Note" />
            <Controller
              control={control}
              name="sleepStudyNote"
              render={({ field }) => (
                <CustomInput
                  placeholder={"Enter a description"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e);
                  }}
                  name={field.name}
                  value={field.value}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container flexDirection={"column"} rowGap={2}>
          <Grid alignContent={"center"}>
            <Typography variant="bodySmall" fontWeight={500}>
              Respiratory
            </Typography>
          </Grid>
          <Grid container direction="column" rowGap={1}>
            {studyData.map((study, index) => (
              <Grid container columnGap={2} key={index}>
                <Typography variant="bodySmall" fontWeight={500}>
                  {study.title}:
                </Typography>
                <Grid>
                  <Typography>
                    <FiberManualRecordRoundedIcon
                      sx={{ fontSize: "5px", mb: "4px" }}
                    />{" "}
                    {study.description}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Typography variant="bodySmall" fontWeight={500}>
            {` During the night most representative of the patients sleep, the patient had a total number of 144 apneas and hypopneas with
            an AHI index of 27.86 per hour and RDI of 28.05 per hour. There were 3 central apneas. The central apnea index was oss
            The percent of time with CSR (Cheyne-Stokes) was 0.00 The oxygen desaturation index (ODI) is 29.02 per hour, which is close
            to the AHI and validates the measure of sympathetic activity. The REM AHI was 3.77 per hour and NREM AHI was 30.62 per hour,
            with 32 minutes of REM. The supine AHI was 35.17 per hour and nonsupine AHI was 3.37 per hour, with a supine during 75.39% of
            the night. The patient had an average oxygen saturation of 91%. The minimum oxygen level (nadir) was 78%. The cumulative time
            under 88% was 35.03 min.`}
          </Typography>
          <Grid width={"100%"}>
            <CustomLabel label="Add Note" />
            <Controller
              control={control}
              name="respiratoryNote"
              render={({ field }) => (
                <CustomInput
                  placeholder={"Enter a description"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e);
                  }}
                  name={field.name}
                  value={field.value}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container flexDirection={"column"} rowGap={2}>
          <Grid alignContent={"center"}>
            <Typography variant="bodySmall" fontWeight={500}>
              Cardiac:
            </Typography>
          </Grid>
          <Grid container direction="column" rowGap={1}>
            {studyData.map((study, index) => (
              <Grid container columnGap={2} key={index}>
                <Typography variant="bodySmall" fontWeight={500}>
                  {study.title}:
                </Typography>
                <Grid>
                  <Typography>
                    <FiberManualRecordRoundedIcon
                      sx={{ fontSize: "5px", mb: "4px" }}
                    />{" "}
                    {study.description}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid width={"100%"}>
            <CustomLabel label="Add Note" />
            <Controller
              control={control}
              name="cardiacNote"
              render={({ field }) => (
                <CustomInput
                  placeholder={"Enter a description"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e);
                  }}
                  name={field.name}
                  value={field.value}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default TwoInterpretationForm;
