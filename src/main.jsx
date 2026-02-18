import React, { useMemo, useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import App from "./App";
import { getTheme } from "./theme";

export const ColorModeContext = createContext();

function Root() {
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || "dark"
  );

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
