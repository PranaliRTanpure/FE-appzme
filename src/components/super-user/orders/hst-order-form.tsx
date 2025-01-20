import DrawerBody from "@/components/ui/DrawerBody";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/system";

import CustomAutoComplete from "@/common-components/custom-auto-complete/custom-auto-complete";
import CustomInput from "@/common-components/custom-input/custom-input";
import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomDatePicker from "@/common-components/date-picker-field/date-picker-field";
import { theme } from "@/utils/theme";
import { Button, Typography } from "@mui/material";
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

  return (
    <DrawerBody padding={3} offset={height}>
      <Grid container width={"100%"} height={"100%"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ height: "100%", width: "100%" }}
        >
          {"aKFHSFSDFL"}
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
                <Grid flex={1} container flexDirection={"column"} rowGap={1}>
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
                    <Grid width={"48%"}>
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
