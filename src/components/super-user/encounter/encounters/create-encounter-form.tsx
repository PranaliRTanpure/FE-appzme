import CustomInput from "@/common-components/custom-input/custom-input";
import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomSelect from "@/common-components/custom-select/customSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import { Controller, FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { theme } from "@/utils/theme";
import { useRef } from "react";
import DrawerBody from "@/components/ui/DrawerBody";

export const createEncounterFormSchema = yup.object().shape({
  patient: yup.string().required("Patient Name is required"),
  encounterType: yup.string(),
});

interface CreateEncounterFormProps {
  onClose: () => void;
}

const CreateEncounterForm = (props: CreateEncounterFormProps) => {
  const footerRef = useRef<HTMLDivElement>();

  const initialValues = {
    patient: "",
    encounterType: "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(createEncounterFormSchema),
  });

  const onSubmit = (data: FieldValues) => {
    data;
    props.onClose();
  };
  return (
    <DrawerBody padding={3} offset={footerRef?.current?.offsetHeight}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: "100%", width: "100%" }}
      >
        <Grid
          container
          width={"100%"}
          flexDirection={"column"}
          rowGap={2}
          border={0}
        >
          {/* Form Grid */}
          <Grid container flexDirection={"column"} rowGap={2} pl={0} pr={0}>
            <Grid>
              <CustomLabel label="Patient" isRequired />
              <Controller
                control={control}
                name="patient"
                render={({ field }) => (
                  <CustomInput
                    placeholder={" Select Patient"}
                    hasStartSearchIcon={true}
                    hasError={!!errors.patient}
                    errorMessage={errors.patient?.message}
                    onChange={(event) => {
                      setValue("patient", event.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    name={field.name}
                    value={field.value?.trim() || ""}
                  />
                )}
              ></Controller>
            </Grid>
            <Grid>
              <CustomLabel label="Encounter Type" />
              <Controller
                control={control}
                name="encounterType"
                render={({ field }) => (
                  <CustomSelect
                    placeholder={"Select Encounter Type"}
                    enableDeselect
                    items={[{ value: "active", label: "Active" }]}
                    onChange={function (e: SelectChangeEvent<string>): void {
                      setValue("encounterType", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    name={field.name}
                    value={field.value?.trim() || ""}
                  />
                )}
              ></Controller>
            </Grid>
            {/* Error Grid */}
            <Grid
              container
              border={"1px solid #8D000C"}
              flexDirection={"column"}
              bgcolor={"#FFF7F7"}
              borderRadius={3}
              rowGap={1.5}
              p={1}
            >
              <Grid container alignContent={"center"} columnGap={1}>
                <CancelIcon sx={{ fontSize: "18px", color: "#B1000F" }} />
                <Typography
                  variant="bodySmall"
                  fontWeight={500}
                  color="#B1000F"
                >
                  Patient is not eligible for the Appointment Schedule
                </Typography>
              </Grid>
              <Grid
                container
                flexDirection={"column"}
                rowGap={1}
                pl={4}
                pr={4}
                border={0}
              >
                <Typography variant="bodySmall" fontWeight={500}>
                  Criteria Passed
                </Typography>
                <Grid
                  container
                  justifyContent={"space-between"}
                  border={0}
                  pr={10}
                >
                  <Grid container alignContent={"center"} columnGap={0.5}>
                    <DoneOutlinedIcon
                      sx={{ color: "#049B22", fontSize: "18px" }}
                    />
                    <Typography variant="bodySmall" fontWeight={400}>
                      Active Insurance
                    </Typography>
                  </Grid>
                  <Grid container alignContent={"center"} columnGap={0.5}>
                    <DoneOutlinedIcon
                      sx={{ color: "#049B22", fontSize: "18px" }}
                    />
                    <Typography variant="bodySmall" fontWeight={400}>
                      No Missing Docs
                    </Typography>
                  </Grid>
                  <Grid container alignContent={"center"} columnGap={0.5}>
                    <DoneOutlinedIcon
                      sx={{ color: "#049B22", fontSize: "18px" }}
                    />
                    <Typography variant="bodySmall" fontWeight={400}>
                      {" "}
                      VOB Completed
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container flexDirection={"column"} rowGap={1} pl={4} pr={4}>
                <Typography variant="bodySmall" fontWeight={500}>
                  Criteria Failed
                </Typography>
                <Grid
                  container
                  justifyContent={"space-between"}
                  border={0}
                  pr={10}
                >
                  <Grid container alignContent={"center"} columnGap={0.5}>
                    <ClearOutlinedIcon
                      sx={{ color: "#B1000F", fontSize: "18px" }}
                    />
                    <Typography variant="bodySmall" fontWeight={400}>
                      Auth Pending
                    </Typography>
                  </Grid>
                  <Grid container alignContent={"center"} columnGap={0.5}>
                    <ClearOutlinedIcon
                      sx={{ color: "#B1000F", fontSize: "18px" }}
                    />
                    <Typography variant="bodySmall" fontWeight={400}>
                      Invalid Insurance Plan
                    </Typography>
                  </Grid>
                  <Grid container alignContent={"center"} columnGap={0.5}>
                    <ClearOutlinedIcon
                      sx={{ color: "#B1000F", fontSize: "18px" }}
                    />
                    <Typography variant="bodySmall" fontWeight={400}>
                      {`HST Order < 5 days`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Button Grid */}
          <Box
            ref={footerRef}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.background.paper,
              borderTop: `1px solid ${theme.palette.divider}`,
              position: "absolute",
              bottom: 0,
              left: 0,
              padding: "20px 24px",
            }}
          >
            <Grid container p={0} justifyContent={"flex-end"} columnGap={1}>
              <Grid>
                <Button
                  variant="outlined"
                  onClick={props.onClose}
                  sx={{ mr: 1, borderColor: "#C9CBCC", color: "black" }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid>
                <Button
                  sx={{
                    p: "0px 10px",
                    bgcolor: theme.palette.secondary.main,
                    borderRadius: "12px",
                    color: theme.palette.common.white,
                  }}
                  type="submit"
                  onClick={() => {}}
                >
                  Add Encounter
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </form>
    </DrawerBody>
  );
};
export default CreateEncounterForm;
