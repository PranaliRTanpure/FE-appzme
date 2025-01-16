import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useFormContext } from "react-hook-form";
import CustomSelect from "@/common-components/custom-select/customSelect";
import {
  CheckboxData,
  CheckboxWithTextFields,
} from "./interpretation-checkbox";

const TwoInterpretationForm = () => {
  const { control, setValue } = useFormContext();

  const data: CheckboxData[] = [
    { name: "gilad", label: "Gilad Gray" },
    { name: "antoine", label: "Antoine Llorca" },
    { name: "sanskruti", label: "Sanskruti Kujir" },
    { name: "Sujwal", label: "Sujwal" },
    { name: "prachi", label: "Prachi" },
    { name: "pranali", label: "Pranali" },
    { name: "tejas", label: "Tejas" },
    { name: "shiv", label: "Shiv" },
    { name: "gaurav", label: "Gaurav" },
  ];

  return (
    <Grid
      container
      width={"100%"}
      height={"100%"}
      maxHeight={"100%"}
      overflow={"auto"}
      flexDirection={"column"}
      bgcolor={"white"}
      p={2}
      rowGap={1.5}
      borderRadius={5}
    >
      {/* Impression Grid*/}
      <Grid
        container
        width={"100%"}
        flexDirection={"column"}
        borderBottom={"1px solid #E7E7E7"}
        rowGap={1}
        pb={1}
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
            onClick={() => {}}
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
          <CheckboxWithTextFields data={data} />
        </Grid>
      </Grid>
      {/* Diagnosis Grid */}
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
          onClick={() => {}}
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
    </Grid>
    // </Grid >
  );
};
export default TwoInterpretationForm;
