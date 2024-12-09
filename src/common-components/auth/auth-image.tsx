import CopyrightIcon from "@mui/icons-material/Copyright";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Typography } from "@mui/material";
import Logo from "../../assets/image_svg/logo/logo.svg";

import { Box, Grid, useMediaQuery } from "@mui/system";
import { theme } from "../../utils/theme";

const AuthImage = (props: { logo: string }) => {
  const { logo } = props;
  const below800 = useMediaQuery("(max-width:800px)");

  return (
    <Grid
      p={2}
      flexWrap={"nowrap"}
      width={"50%"}
      bgcolor={theme.palette.secondary.main}
      container
      flexDirection={"column"}
    >
      <Grid container justifyContent={"center"} mt={2} maxWidth={"100%"}>
        <Box width={"fit-content"} component={"img"} src={Logo}></Box>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        alignContent={"center"}
        height={"70%"}
      >
        <Box width={"90%"} component={"img"} src={logo}></Box>
      </Grid>
      <Grid
        container
        justifyContent={"space-between"}
        // alignSelf={"flex-end"}
        flex={1}
        flexWrap={"nowrap"}
        padding={below800 ? "0px 10px" : "0px 50px"}
      >
        <Grid
          container
          columnGap={0.5}
          alignItems={"flex-end"}
          flexWrap={"nowrap"}
        >
          <CopyrightIcon fontSize="small" color={"primary"} />
          <Typography color={"primary"} variant="bodySmall">
            apZme 2024
          </Typography>
        </Grid>
        <Grid
          container
          flexWrap={"nowrap"}
          columnGap={1}
          alignItems={"flex-end"}
        >
          <MailOutlineIcon fontSize="small" color={"primary"} />
          <Typography variant="bodySmall" color="primary">
            support@apZme.com
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthImage;
