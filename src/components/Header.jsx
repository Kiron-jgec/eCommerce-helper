import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext } from "../main";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Header() {
  const location = useLocation();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Profit Calculator", path: "/profit-calculator" },
    { label: "Selling Price Calculator", path: "/selling-price-calculator" },
    { label: "Add Message for Buy's on Labels", path: "/pdf-label-updater" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={(theme) => ({
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: "blur(8px)", // premium touch
      })}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* LOGO */}
          <Box component={Link} to="/" sx={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: "primary.main" }}
            >
              SellerTools
            </Typography>
          </Box>

          {/* NAVIGATION */}
          <Box>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  mx: 1,
                  color:
                    location.pathname === item.path
                      ? "text.primary"
                      : "text.primary",
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  opacity: location.pathname === item.path ? 1 : 0.9,
                }}
              >
                {item.label}
              </Button>
            ))}
            <IconButton onClick={toggleColorMode} color="primary">
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
