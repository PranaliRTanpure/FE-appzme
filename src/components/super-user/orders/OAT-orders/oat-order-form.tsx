import DrawerBody from "@/components/ui/DrawerBody";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/system";
import { useRef } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { oatOrderFormSchema } from "./oat-order-schema";
import { theme } from "@/utils/theme";
import { Button, SelectChangeEvent, Typography } from "@mui/material";
import CustomLabel from "@/common-components/custom-label/custom-label";
import CustomDatePicker from "@/common-components/date-picker-field/date-picker-field";
import CustomInput from "@/common-components/custom-input/custom-input";
import CustomSelect from "@/common-components/custom-select/customSelect";

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
              border={1}
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
                hi grid 2
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
