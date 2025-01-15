import "@fontsource/montserrat-alternates";
import "@fontsource/poppins";
import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Loader from "./common-components/loader/loader";
import SnackbarAlert from "./common-components/snackbar-alert/snackbar-alert";
import RefreshToken from "./components/refresh-token/refresh-token";
import { reduxStore } from "./redux/store";
import { router } from "./routes/routes";
import { theme } from "./utils/theme";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <ThemeProvider theme={theme}>
        <Provider store={reduxStore}>
          <QueryClientProvider client={queryClient}>
            <Loader />
            <SnackbarAlert />
            <RouterProvider router={router} />
            <RefreshToken />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </Box>
  );
}

export default App;
