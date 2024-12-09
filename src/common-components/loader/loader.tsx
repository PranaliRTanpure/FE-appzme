import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { theme } from "../../utils/theme";
import { useReduxSelector } from "../../redux/store";

export const Loader = () => {
  const isLoading = useReduxSelector(
    (state) => state.getLoaderReducer.isLoading,
  );

  return (
    <Backdrop
      sx={{
        color: theme.palette.common.white,
        zIndex: (theme) => theme.zIndex.drawer + 200,
      }}
      open={!!isLoading}
    >
      <CircularProgress
        className={isLoading ? "loaderOn" : "loaderOff"}
        color="inherit"
      />
    </Backdrop>
  );
};

export default Loader;
