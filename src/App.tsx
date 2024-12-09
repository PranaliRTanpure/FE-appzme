// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Box } from "@mui/system";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { theme } from "./utils/theme";
import SnackbarAlert from "./common-components/snackbar-alert/snackbar-alert";
import { Provider } from "react-redux";
import { reduxStore } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RefreshToken from "./components/refresh-token/refresh-token";
import Loader from "./common-components/loader/loader";

function App() {
  // const [count, setCount] = useState(0);
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
