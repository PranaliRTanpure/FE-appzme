import DrawerBody from "@/components/ui/DrawerBody";
import { yupResolver } from "@hookform/resolvers/yup";
import { alpha, Box, Grid } from "@mui/system";

import CustomAutoComplete from "@/common-components/custom-auto-complete/custom-auto-complete";
import CustomSingleCheckBox from "@/common-components/custom-checkbox/checkbox";
import CustomCheckBox, {
  CheckedArray,
} from "@/common-components/custom-checkbox/custom-checkbox";
import CustomInput from "@/common-components/custom-input/custom-input";
import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomDatePicker from "@/common-components/date-picker-field/date-picker-field";
import { theme } from "@/utils/theme";
import { Button, Divider, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { HSTOrderFormSchema } from "./hst-order-form-schema";

export const customStyle = {
  height: "8rem",
  width: "8rem",
};

interface AddOrderingProviderFormProps {
  handleDrawerClose: () => void;
  isEdit: boolean;
}

const HSTOrderForm = (props: AddOrderingProviderFormProps) => {
  const { handleDrawerClose, isEdit } = props;

  const [height, setHeight] = useState(0);

  const footerRef = useCallback(
    (
      node: {
        getBoundingClientRect: () => {
          height: React.SetStateAction<number>;
        };
      } | null,
    ) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
      }
    },
    [],
  );
  const initialValues = {
    orderDate: "",
    referrer: "",
    PEType: "",
    DevicePool: "",
    marketer: "",
    billingPartner: "",
    teleMedFollowUp: false,
    reasonForTest: "",
    night1: "",
    night2: "",
    night3: "",
    previousTest: "",
    AHI: "",
    additionalConditions: "",
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(HSTOrderFormSchema),
  });

  const onSubmit = (data: FieldValues) => {
    data;
    props.handleDrawerClose;
  };

  const [selectedStudyType, setSelectedStudyType] = useState<number[]>([]);
  const handleSelectTypeOfStudy = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.checked) {
      setSelectedStudyType((prev: number[]) => [...prev, index]);
    } else {
      setSelectedStudyType((prev) => {
        const arr = prev.filter((no) => no !== index);
        return arr;
      });
    }
  };

  const [selectedReasonForStudy, setSelectedReasonForStudy] = useState<
    number[]
  >([]);

  const handleSelectReasonForTest = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setSelectedReasonForStudy([index]);
    e;
  };

  const handleSelectionSleepHistorySymptom = (updatedArray: CheckedArray[]) => {
    updatedArray;
  };

  const handleContraindicationsInLabRequired = (
    updatedArray: CheckedArray[],
  ) => {
    updatedArray;
  };

  return (
    <DrawerBody padding={3} offset={height}>
      <Grid container width={"100%"} height={"100%"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Main Grid */}
          <Grid width={"100%"}>
            {/* Grid One */}
            <Grid container width={"100%"} rowGap={2}>
              {/* Profile Image */}
              <Grid width={"100%"}>
                <CustomLabel
                  variant={"bodySmall"}
                  label={"Profile Information"}
                />
              </Grid>
              <Grid width={"100%"} container>
                <Grid flex={1} container flexDirection={"column"} rowGap={3}>
                  <Grid container justifyContent={"space-between"}>
                    <Grid width={"18%"}>
                      <CustomLabel isRequired label="Order Date" />
                      <Controller
                        control={control}
                        name="orderDate"
                        render={({ field }) => (
                          <CustomDatePicker
                            onDateChange={function (
                              selectedDate: string,
                            ): void {
                              selectedDate;
                            }}
                            value={field.value}
                            bgWhite={false}
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"14%"}>
                      <CustomLabel label="Referrer" />
                      <Controller
                        control={control}
                        name="referrer"
                        render={({ field }) => (
                          <CustomInput
                            value={field.value?.trim() || ""}
                            placeholder={"Enter "}
                            hasError={!!errors.referrer}
                            errorMessage={errors.referrer?.message as string}
                            name={field.name}
                            onChange={(e) =>
                              setValue("referrer", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"18%"}>
                      <CustomLabel isRequired label="PE Type" />
                      <Controller
                        control={control}
                        name="PEType"
                        render={({ field }) => (
                          <CustomAutoComplete
                            options={[]}
                            value={field.value}
                            placeholder="Select PE Type"
                            onChange={function (
                              selectedValue: string | "",
                            ): void {
                              selectedValue;
                            }}
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"24%"}>
                      <CustomLabel isRequired label="Device Pool" />
                      <Controller
                        control={control}
                        name="DevicePool"
                        render={({ field }) => (
                          <CustomAutoComplete
                            options={[]}
                            value={field.value}
                            placeholder="Select Deice Pool"
                            onChange={function (
                              selectedValue: string | "",
                            ): void {
                              selectedValue;
                            }}
                          />
                        )}
                      />
                    </Grid>{" "}
                    <Grid width={"24%"}>
                      <CustomLabel label="Marketer" />
                      <Controller
                        control={control}
                        name="marketer"
                        render={({ field }) => (
                          <CustomAutoComplete
                            options={[]}
                            value={field.value}
                            placeholder="Select Marketer"
                            onChange={function (
                              selectedValue: string | "",
                            ): void {
                              selectedValue;
                            }}
                          />
                        )}
                      />
                    </Grid>{" "}
                  </Grid>
                  <Grid container justifyContent={"space-between"}>
                    <Grid width={"25%"}>
                      <CustomLabel label="Billing Partner" isRequired />
                      <Controller
                        control={control}
                        name="billingPartner"
                        render={({ field }) => (
                          <CustomAutoComplete
                            options={[]}
                            value={field.value}
                            placeholder="Select Billing Partner"
                            onChange={function (
                              selectedValue: string | "",
                            ): void {
                              selectedValue;
                            }}
                          />
                        )}
                      />
                    </Grid>{" "}
                  </Grid>
                  <Grid container flexDirection={"column"} width={"100%"}>
                    <CustomLabel label="Study Details" isRequired />
                    <Grid
                      borderRadius={"12px"}
                      bgcolor={alpha(theme.palette.secondary.main, 0.1)}
                      p={2}
                      width={"100%"}
                      container
                      flexDirection={"column"}
                    >
                      <Grid container pb={1} width={"100%"}>
                        <Grid size={7} container>
                          <Typography
                            color="#595F63"
                            variant="bodySmall"
                            fontWeight={500}
                          >
                            Type Of Study
                          </Typography>
                        </Grid>
                        <Grid size={1}>
                          <Typography
                            color="#595F63"
                            variant="bodySmall"
                            fontWeight={500}
                          >
                            ICD 10
                          </Typography>
                        </Grid>
                        <Grid>
                          <Typography
                            color="#595F63"
                            variant="bodySmall"
                            fontWeight={500}
                          >
                            Suspected and Previous Diagnosis
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider orientation="horizontal" />
                      <Grid width={"100%"} container columnGap={1} p={"10px 0"}>
                        {[
                          {
                            typeOfStudy: "95806 HST Home Sleep Study",
                            ICD: "G47.33",
                            dignosis: "Obstructive Sleep Apnea",
                          },
                        ].map((item, index) => (
                          <Grid container width={"100%"}>
                            <Grid size={7}>
                              <CustomSingleCheckBox
                                checked={selectedStudyType.includes(index)}
                                label={item.typeOfStudy}
                                handleChange={function (
                                  e: React.ChangeEvent<HTMLInputElement>,
                                ): void {
                                  handleSelectTypeOfStudy(e, index);
                                }}
                              />
                            </Grid>
                            <Grid size={1} container>
                              {item.ICD}
                            </Grid>
                            <Grid size={4}>{item.dignosis}</Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Reason for test */}
                  <Grid container flexDirection={"column"} width={"100%"}>
                    <CustomLabel label="Reason For Test" />
                    <Grid container>
                      <Grid container>
                        {[
                          "Diagnostic",
                          "Oral Appliance Efficacy",
                          "CPAP Efficacy",
                          "Other",
                        ].map((reason, index) => (
                          <CustomSingleCheckBox
                            checked={selectedReasonForStudy.includes(index)}
                            key={reason}
                            label={reason}
                            handleChange={function (
                              e: React.ChangeEvent<HTMLInputElement>,
                            ): void {
                              handleSelectReasonForTest(e, index);
                            }}
                          />
                        ))}
                      </Grid>
                      {selectedReasonForStudy.includes(3) && (
                        <Grid flex={1}>
                          <CustomInput placeholder={""} name={""} value={""} />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>

                  {/* Oral Appliance Settings */}
                  <Grid container flexDirection={"column"}>
                    <CustomLabel label="Oral Appliance Settings" />
                    <Grid container justifyContent={"space-between"}>
                      <Grid width={"18%"}>
                        <CustomLabel isRequired label="Night 1" />
                        <Controller
                          control={control}
                          name="night1"
                          render={({ field }) => (
                            <CustomInput
                              name={field.name}
                              placeholder="Enter"
                              value={field.value || ""}
                              hasError={!!errors.night1}
                              errorMessage={errors.night1?.message}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => {
                                setValue("night1", e.target.value, {
                                  shouldValidate: true,
                                });
                              }}
                            />
                          )}
                        />
                      </Grid>{" "}
                      <Grid width={"14%"}>
                        <CustomLabel label="Night 2" />
                        <Controller
                          control={control}
                          name="night2"
                          render={({ field }) => (
                            <CustomInput
                              name={field.name}
                              placeholder="Enter"
                              value={field.value || ""}
                              hasError={!!errors.night2}
                              errorMessage={errors.night2?.message}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => {
                                setValue("night2", e.target.value, {
                                  shouldValidate: true,
                                });
                              }}
                            />
                          )}
                        />
                      </Grid>{" "}
                      <Grid width={"18%"}>
                        <CustomLabel isRequired label="Night 3" />
                        <Controller
                          control={control}
                          name="night3"
                          render={({ field }) => (
                            <CustomInput
                              name={field.name}
                              placeholder="Enter"
                              value={field.value || ""}
                              hasError={!!errors.night3}
                              errorMessage={errors.night3?.message}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => {
                                setValue("night3", e.target.value, {
                                  shouldValidate: true,
                                });
                              }}
                            />
                          )}
                        />
                      </Grid>{" "}
                      <Grid width={"24%"}>
                        <CustomLabel label="Previous Test" />
                        <Controller
                          control={control}
                          name={`previousTest`}
                          render={({ field }) => (
                            <CustomDatePicker
                              bgWhite={false}
                              {...field}
                              disableFuture
                              value={field.value}
                              onDateChange={function (
                                selectedDate: string,
                              ): void {
                                setValue(`previousTest`, selectedDate, {
                                  shouldValidate: true,
                                });
                              }}
                              hasError={!!errors.previousTest}
                              errorMessage={
                                (errors.previousTest?.message || "") as string
                              }
                            />
                          )}
                        />
                      </Grid>{" "}
                      <Grid width={"24%"}>
                        <CustomLabel isRequired label="AHI" />
                        <Controller
                          control={control}
                          name="AHI"
                          render={({ field }) => (
                            <CustomInput
                              placeholder={"Enter"}
                              name={field.name}
                              value={field.value || ""}
                              onChange={(e) =>
                                setValue("AHI", e.target.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                          )}
                        />
                      </Grid>{" "}
                    </Grid>
                  </Grid>
                  {/* Minimum Requirements For Study */}
                  <Grid container flexDirection={"column"}>
                    <CustomLabel
                      label="Minimum Requirements For Study"
                      variant="bodySmall"
                    />
                    <CustomLabel label="1. General Sleep History and Symptom" />
                    <Grid pb={3}>
                      <CustomCheckBox
                        oriantation={"horizontal"}
                        width={"33%"}
                        options={GeneralSleepHistorySymptomsArr}
                        onChange={function (
                          updatedArray: CheckedArray[],
                        ): void {
                          handleSelectionSleepHistorySymptom(updatedArray);
                        }}
                      />
                    </Grid>
                    <CustomLabel label="2. Contraindications, In-Lab Required" />
                    <Grid>
                      <CustomCheckBox
                        oriantation={"horizontal"}
                        width={"33%"}
                        options={GeneralSleepHistorySymptomsArr}
                        onChange={function (
                          updatedArray: CheckedArray[],
                        ): void {
                          handleContraindicationsInLabRequired(updatedArray);
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* Additional */}
                  <Grid pb={2}>
                    <CustomLabel label="Additional" />
                    <Grid width={"100%"}>
                      <Controller
                        control={control}
                        name="additionalConditions"
                        render={({ field }) => (
                          <CustomInput
                            placeholder={"Enter Additional Conditions"}
                            name={field.name}
                            value={field.value || ""}
                            onChange={(e) =>
                              setValue("additionalConditions", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
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
            <Grid
              container
              justifyContent={isEdit ? "space-between" : "flex-end"}
            >
              <Grid container columnGap={1}>
                <Button
                  onClick={handleDrawerClose}
                  variant="outlined"
                  type="button"
                >
                  <Typography variant="bodySmall">Cancel</Typography>
                </Button>
                <Button
                  onClick={handleDrawerClose}
                  variant="contained"
                  type="submit"
                  disabled={isValid}
                >
                  <Typography variant="bodySmall">
                    {isEdit ? "Save Changes" : "Create Ordering Provider"}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Grid>
    </DrawerBody>
  );
};

export default HSTOrderForm;

export const GeneralSleepHistorySymptomsArr = [
  { key: "Disruptive Snoring", checked: false },
  { key: "Daytime sleepiness", checked: false },
  { key: "Observed/Witnessed Apneas", checked: false },
  { key: "Choking or gasping", checked: false },
  { key: "Obesity (BMI>30)", checked: false },
  { key: "GERD (reflux)", checked: false },
  { key: "Heart disease / failure", checked: false },
  { key: "Morning headaches", checked: false },
  { key: "Bruxism (grinding teeth)", checked: false },
  { key: "Pulmonary disease (COPD, Asthma, etc)", checked: false },
];
