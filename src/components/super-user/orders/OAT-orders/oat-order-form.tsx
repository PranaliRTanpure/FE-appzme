import DrawerBody from "@/components/ui/DrawerBody";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/system";
import { useRef, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { oatOrderFormSchema } from "./oat-order-schema";
import { theme } from "@/utils/theme";
import { Button, SelectChangeEvent, Typography } from "@mui/material";
import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomDatePicker from "@/common-components/date-picker-field/date-picker-field";
import CustomInput from "@/common-components/custom-input/custom-input";
import CustomSelect from "@/common-components/custom-select/customSelect";
import CustomSingleCheckBox from "@/common-components/custom-checkbox/checkbox";
import CustomCheckBox, {
  CheckedArray,
} from "@/common-components/custom-checkbox/custom-checkbox";
import React from "react";

export const DiagnosisICD = [
  { key: "Obstructive Sleep Apnea (G47.33)", checked: false },
  { key: "Central Sleep Apnea (G47.37)", checked: false },
  { key: "Upper Airway Resistance Syndrome (G47.8)", checked: false },
  { key: "Primary Snoring (R06.83)", checked: false },
  { key: "Nocturnal Hypoxemia (G47.36)", checked: false },
];

interface OatOrderFormProps {
  handleDrawerClose: () => void;
}

const OatOrderForm = (props: OatOrderFormProps) => {
  const footerRef = useRef<HTMLDivElement>();

  const initialValues = {
    orderDate: "",
    orderingPhysician: "",
    npi: "",
    fax: "",
    dentistProvider: "",
    medicalNecessity: "",
  };

  const [otherReason, setOtherReason] = useState<number[]>([]);

  const handleSelectOther = (
    _e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setOtherReason((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleSelectionDiagnosisSymptom = (updatedArray: CheckedArray[]) => {
    updatedArray;
  };

  const {
    control,
    setValue,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(oatOrderFormSchema),
  });

  const onSubmit = (data: FieldValues) => {
    data;
    props.handleDrawerClose();
  };
  return (
    <DrawerBody padding={3} offset={footerRef?.current?.offsetHeight}>
      <Grid width={"100%"} height={"100%"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ height: "100%", width: "100%" }}
        >
          <Grid
            container
            width={"100%"}
            height={"100%"}
            flexDirection={"column"}
          >
            {/* Form */}
            <Grid
              container
              width={"100%"}
              flexDirection={"column"}
              rowGap={3}
              border={0}
            >
              {/* Grid 1 */}
              <Grid container width={"100%"} justifyContent={"space-between"}>
                <Grid width={"19%"}>
                  <CustomLabel label="Order Date" />
                  <Controller
                    control={control}
                    name="orderDate"
                    render={({ field }) => (
                      <CustomDatePicker
                        onDateChange={function (selectedDate: string): void {
                          selectedDate;
                        }}
                        value={field.value}
                        bgWhite={true}
                      />
                    )}
                  />
                </Grid>
                <Grid width={"19%"}>
                  <CustomLabel label="Ordering Physician" />
                  <Controller
                    control={control}
                    name="orderingPhysician"
                    render={({ field }) => (
                      <CustomInput
                        value={field.value?.trim() || ""}
                        placeholder={"Enter "}
                        name={field.name}
                        onChange={(e) =>
                          setValue("orderingPhysician", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid width={"19%"}>
                  <CustomLabel label="NPI" />
                  <Controller
                    control={control}
                    name="npi"
                    render={({ field }) => (
                      <CustomInput
                        value={field.value?.trim() || ""}
                        placeholder={"NPI "}
                        name={field.name}
                        onChange={(e) =>
                          setValue("npi", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid width={"19%"}>
                  <CustomLabel label="Dentist Provider" />
                  <Controller
                    control={control}
                    name="dentistProvider"
                    render={({ field }) => (
                      <CustomSelect
                        value={field.value?.trim() || ""}
                        placeholder={"Select Provider"}
                        enableDeselect
                        items={[{ value: "active", label: "Active" }]}
                        onChange={function (
                          e: SelectChangeEvent<string>,
                        ): void {
                          setValue("dentistProvider", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        name={field.name}
                      />
                    )}
                  ></Controller>
                </Grid>
                <Grid width={"19%"}>
                  <CustomLabel label="Fax" />
                  <Controller
                    control={control}
                    name="fax"
                    render={({ field }) => (
                      <CustomInput
                        value={field.value?.trim() || ""}
                        placeholder={"Enter Fax"}
                        name={field.name}
                        onChange={(e) =>
                          setValue("fax", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
              {/* Grid 2 */}
              <Grid container width={"100%"}>
                <Grid container>
                  {["Other :"].map((reason, index) => (
                    <CustomSingleCheckBox
                      checked={otherReason.includes(index)}
                      key={reason}
                      label={reason}
                      handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleSelectOther(e, index)
                      }
                    />
                  ))}
                </Grid>
                <Grid width={"40%"}>
                  <CustomInput placeholder={"Enter"} name={""} value={""} />
                </Grid>
              </Grid>
              {/* Diagnosis (ICD-10 Code) */}
              <Grid
                container
                width={"100%"}
                flexDirection={"column"}
                rowGap={1}
              >
                <Typography
                  variant="bodySmall"
                  fontWeight={600}
                >{`Diagnosis (ICD-10 Code)`}</Typography>
                <Grid container width={"100%"}>
                  <CustomCheckBox
                    sx={{ fontSize: "14px" }}
                    oriantation={"horizontal"}
                    size={4}
                    options={DiagnosisICD}
                    onChange={function (updatedArray: CheckedArray[]): void {
                      handleSelectionDiagnosisSymptom(updatedArray);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
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
              <Grid container justifyContent={"flex-end"}>
                <Grid container columnGap={1}>
                  <Button
                    onClick={props.handleDrawerClose}
                    variant="outlined"
                    type="button"
                  >
                    <Typography variant="bodySmall">Cancel</Typography>
                  </Button>
                  <Button variant="contained" type="submit">
                    <Typography variant="bodySmall">
                      {"Register and Place Order"}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </form>
      </Grid>
    </DrawerBody>
  );
};
export default OatOrderForm;
