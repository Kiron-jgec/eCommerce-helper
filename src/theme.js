import { createTheme } from "@mui/material/styles";

const baseTypography = {
  fontFamily: "Inter, Roboto, sans-serif",
  button: {
    textTransform: "none",
  },
};

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: "#C0C0C0", // Metallic Silver3
      },
      secondary: {
        main: "#1C1C1C",
      },

      background: {
        default: mode === "dark" ? "#1C1C1C" : "#F5F5F5",
        paper: mode === "dark" ? "#2B2B2B" : "#FFFFFF",
      },

      text: {
        primary: mode === "dark" ? "#ffffff" : "#1C1C1C",
        secondary: mode === "dark" ? "#ffffff" : "#555555",
      },

      //divider: mode === "dark" ? "#b4b4b460" : "#2B2B2B",
    },

    typography: baseTypography,

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });
