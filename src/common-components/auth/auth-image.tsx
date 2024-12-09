import { Box, Grid } from "@mui/system";

const AuthImage = (props: { logo: string }) => {
  const { logo } = props;
  return (
    <Grid
      p={1}
      flexWrap={"nowrap"}
      width={"70%"}
      bgcolor="#EFF0F2"
      container
      flexDirection={"column"}
      borderRadius={5}
    >
      <Grid
        container
        justifyContent={"center"}
        mt={2}
        maxWidth={"100%"}
        height={"100%"}
      >
        <Box width={"fit-content"} component={"img"} src={logo}></Box>
      </Grid>
    </Grid>
  );
};

export default AuthImage;
