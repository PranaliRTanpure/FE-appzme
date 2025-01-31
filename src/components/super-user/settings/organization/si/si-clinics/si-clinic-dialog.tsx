import React, { useCallback, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";

import { yupResolver } from "@hookform/resolvers/yup";

import CustomAutoComplete from "@/common-components/custom-auto-complete/custom-auto-complete";
import CustomInput from "@/common-components/custom-input/custom-input";
import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomSelect from "@/common-components/custom-select/customSelect";

import DrawerBody from "@/components/ui/DrawerBody";
import { stateList } from "@/utils/StateList";
import { theme } from "@/utils/theme";

import { addSiClinicSchema } from "./si-clinic-dialog-schema";

interface SiClinicProps {
  handleDrawerClose: () => void;
  isEdit: boolean;
}

const SiClinicDialog = (props: SiClinicProps) => {
  const [height, setHeight] = useState(0);

  const initialValues = {
    locationId: "",
    locationName: "",
    taxId: "",
    taxType: "",
    status: "",
    contactNumber: "",
    noShowCharges: "",
    address: {
      line1: "",
      city: "",
      state: "",
      zipcode: "",
    },
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(addSiClinicSchema),
  });

  const onSubmit = (data: FieldValues) => {
    data;
    props.handleDrawerClose();
  };

  const footerRef = useCallback(
    (
      node: {
        getBoundingClientRect: () => {
          height: React.SetStateAction<number>;
        };
      } | null
    ) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
      }
    },
    []
  );
  return (
    <DrawerBody padding={3} offset={height}>
      <Grid width={"100%"} height={"100%"}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%", width: "100%" }}>
          <Grid container width={"100%"} height={"100%"} flexDirection={"column"}>
            {/* Form */}
            <Grid container width={"100%"} flexDirection={"column"} rowGap={2} pb={1.5}>
              <Grid container width={"100%"} justifyContent={"space-between"}>
                <Grid width={"49%"}>
                  <CustomLabel label="Location ID" isRequired />
                  <Controller
                    control={control}
                    name="locationId"
                    render={({ field }) => (
                      <CustomInput
                        value={field.value?.trim() || ""}
                        placeholder={"Enter Location ID"}
                        name={field.name}
                        hasError={!!errors.locationId}
                        errorMessage={errors.locationId?.message as string}
                        onChange={(e) =>
                          setValue("locationId", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid width={"49%"}>
                  <CustomLabel label="Location Name" />
                  <Controller
                    control={control}
                    name="locationName"
                    render={({ field }) => (
                      <CustomInput
                        value={field.value?.trim() || ""}
                        placeholder={"Enter Location Name"}
                        name={field.name}
                        onChange={(e) =>
                          setValue("locationName", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container width={"100%"} justifyContent={"space-between"}>
                <Grid width={"49%"}>
                  <CustomLabel label="Tax ID" />
                  <Controller
                    control={control}
                    name="taxId"
                    render={({ field }) => (
                      <CustomInput
                        value={field.value?.trim() || ""}
                        placeholder={"Enter Tax ID"}
                        name={field.name}
                        onChange={(e) =>
                          setValue("taxId", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid width={"49%"}>
                  <CustomLabel label="Tax Type" />
                  <Controller
                    control={control}
                    name="taxType"
                    render={({ field }) => (
                      <CustomInput
                        value={field.value?.trim() || ""}
                        placeholder={"Enter Tax Type"}
                        name={field.name}
                        onChange={(e) =>
                          setValue("taxType", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container width={"100%"}>
                <Grid width={"100%"}>
                  <CustomLabel label="Address" />
                  <Controller
                    control={control}
                    name="address.line1"
                    render={({ field }) => (
                      <CustomInput
                        value={field.value?.trim() || ""}
                        placeholder={"Enter Address"}
                        name={field.name}
                        onChange={(e) =>
                          setValue("address.line1", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container width={"100%"} justifyContent={"space-between"}>
                <Grid width={"32%"}>
                  <CustomLabel label="City" />
                  <Controller
                    control={control}
                    name="address.city"
                    render={({ field }) => (
                      <CustomSelect
                        value={field.value?.trim() || ""}
                        placeholder={"Select City"}
                        enableDeselect
                        items={[{ value: "active", label: "Active" }]}
                        onChange={function (e: SelectChangeEvent<string>): void {
                          setValue("address.city", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        name={field.name}
                      />
                    )}
                  ></Controller>
                </Grid>
                <Grid width={"32%"}>
                  <CustomLabel label="State" />
                  <Controller
                    control={control}
                    name="address.state"
                    render={({ field }) => (
                      <CustomAutoComplete
                        name={field.name}
                        placeholder={"Search the state"}
                        options={stateList}
                        maxHeightForOptionsList={300}
                        value={field.value || ""}
                        onChange={(selectedValue: string | "") => field.onChange(selectedValue)}
                      />
                    )}
                  />
                </Grid>
                <Grid width={"32%"}>
                  <CustomLabel label="Zip Code" />
                  <Controller
                    control={control}
                    name="address.zipcode"
                    render={({ field }) => (
                      <CustomInput
                        name={field.name}
                        value={field.value || ""}
                        placeholder={"Enter Zip Code"}
                        onChange={(e) =>
                          setValue("address.zipcode", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container width={"100%"} justifyContent={"space-between"}>
                <Grid width={"49%"}>
                  <CustomLabel label="Contact Number" />
                  <Controller
                    control={control}
                    name="contactNumber"
                    render={({ field }) => (
                      <CustomInput
                        value={field.value?.trim() || ""}
                        placeholder={"Enter Contact Number"}
                        name={field.name}
                        onChange={(e) =>
                          setValue("contactNumber", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid width={"49%"}>
                  <CustomLabel label="No Show Charges" />
                  <Controller
                    control={control}
                    name="noShowCharges"
                    render={({ field }) => (
                      <CustomInput
                        value={field.value?.trim() || ""}
                        placeholder={"Enter No Show Charges"}
                        name={field.name}
                        onChange={(e) =>
                          setValue("noShowCharges", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container width={"100%"}>
                <Grid width={"49%"}>
                  <CustomLabel label="Status" />
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <CustomSelect
                        value={field.value?.trim() || ""}
                        placeholder={"Select Status"}
                        enableDeselect
                        items={[
                          { value: "active", label: "Active" },
                          { value: "inactive", label: "Inactive" },
                        ]}
                        onChange={function (e: SelectChangeEvent<string>): void {
                          setValue("status", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        name={field.name}
                      />
                    )}
                  ></Controller>
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
              <Grid container justifyContent={"flex-end"}>
                <Grid container columnGap={1}>
                  <Button onClick={props.handleDrawerClose} variant="outlined" type="button">
                    <Typography variant="bodySmall">Cancel</Typography>
                  </Button>
                  <Button variant="contained" type="submit" disabled={!isValid}>
                    <Typography variant="bodySmall">{props.isEdit ? "Save Changes" : "Add"}</Typography>
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
export default SiClinicDialog;
