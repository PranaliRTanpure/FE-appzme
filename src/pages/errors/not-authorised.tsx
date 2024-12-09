import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { useNavigate } from "react-router-dom";
import cookieService from "../../services/core/cookie-service";

const NotAuthorized = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    cookieService.clearCookies();
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={5}
      height={"80vh"}
    >
      <Typography variant="h3">Not Authorized!!</Typography>
      <Grid container columnGap={2}>
        <Button size="large" variant="outlined" onClick={goToLogin}>
          Go to login page
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotAuthorized;
