import { alpha, createTheme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import React from "react";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bodySmall: true;
    bodyMedium: true;
    bodyLarge: true;
    bodyExtraSmall: true;
  }
}
interface ExtendedTypographyOptions extends TypographyOptions {
  bodySmall: React.CSSProperties;
  bodyMedium: React.CSSProperties;
  bodyLarge: React.CSSProperties;
  bodyExtraSmall: React.CSSProperties;
}

// Typescript module augmentation
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    xs1: true;
    sm: true;
    sm1: true;
    md: true;
    md1: true;
    lg: true;
    lg1: true;
    xl: true;
    xl1: true;
    xl2: true;
    xl3: true;
    xxl: true;
  }
}

// declare module "@mui/material/styles" {
// 	interface Shadows extends Array<string> {
// 		customShadow: string;
// 	}
// }

const palette = {
  // background: #06223E;

  primary: {
    main: "#06223E",
    light: "#00506B", //hover shade
  },
  secondary: {
    main: "#2D7AE5",
    light: "#F2F7F9",
  },

  background: {
    default: "#F3F4F4",
  },
  common: { white: "#FFFFFF", black: "000000" },
};

export const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 360, //
      xs: 375, //
      xs1: 390, //
      sm: 744, //
      sm1: 834, //
      md: 1025, //
      md1: 1133, //
      lg: 1194, //
      lg1: 1280, // //
      xl: 1366, // //
      xl1: 1440, // //
      xl3: 1430,
      xl2: 1650,
      xxl: 1920, // //
    },
  },
  palette: {
    primary: {
      main: palette.primary.main,
      light: palette.primary.light,
    },
    secondary: {
      main: palette.secondary.main,
      light: palette.secondary.light,
    },
    background: {
      default: palette.background.default,
    },
  },
  typography: {
    h1: {
      fontFamily: "Montserrat Alternates, Roboto, Helvetica, Arial, sans-serif",
      fontWeight: 700,
      fontSize: "3rem",
    },
    h2: {
      fontFamily: "Montserrat Alternates, Roboto, Helvetica, Arial, sans-serif",
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h3: {
      fontFamily: "Montserrat Alternates, Roboto, Helvetica, Arial, sans-serif",
      fontWeight: 500,
      fontSize: "2rem",
    },
    bodyLarge: {
      fontSize: "18px",
      fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif",
    },
    bodyMedium: {
      fontSize: "16px",
      fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif",
    },
    bodySmall: {
      fontSize: "14px",
      fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif",
    },
    bodyExtraSmall: {
      fontSize: "12px",
      fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif",
    },
  } as ExtendedTypographyOptions,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 550,
          height: "40px",
          "&.MuiButton-containedPrimary": {
            borderRadius: "12px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: palette.primary.light,
            },
          },

          "&.MuiButton-outlined": {
            borderRadius: "12px",
            border: `1px solid${palette.secondary.main}`,
            boxShadow: "none",
            color: "#2D7AE5",
            "&:hover": {
              backgroundColor: alpha(palette.secondary.main, 0.3),
            },
          },
          "&:disabled": {
            cursor: "wait",
            pointerEvents: "auto",
            "&:hover": {
              backgroundColor: palette.primary.main,
            },
          },
        },
      },
    },
  },
});
