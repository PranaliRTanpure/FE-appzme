import { Grid } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import CustomLabel from "../../../../common-components/custom-label/custom-label";
import CustomTextArea from "../../../../common-components/custom-text-area/custom-textarea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import { theme } from "../../../../utils/theme";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { messageRequiredErrorMsg } from "../../../../constants/error-messages";

interface FormValue {
  message: string;
}

function PatientMessageDrawer() {
  const intialValue = {
    message: "",
  };
  const composeMessageSchema = yup.object().shape({
    message: yup.string().required(messageRequiredErrorMsg),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: intialValue,
    resolver: yupResolver(composeMessageSchema),
  });

  const onSubmit = (value: FormValue) => {
    value;
  };

  return (
    <form style={{ height: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        height={"100%"}
        overflow={"auto"}
        container
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Grid>
          <CustomLabel label={"Message"} isRequired />
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <CustomTextArea
                placeholder={"Enter Your Message"}
                minRow={4}
                {...field}
                hasError={!!errors.message}
                errorMessage={errors.message?.message || ""}
              />
            )}
          />
        </Grid>
        <Grid height={"8%"} borderTop={`1px solid ${theme.palette.grey[300]}`}>
          <Grid container p={1} justifyContent={"flex-end"}>
            <Button variant="contained" type="submit">
              <Typography marginRight={"8px"}>Send</Typography>
              <SendOutlinedIcon fontSize="small" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default PatientMessageDrawer;
