import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";

import ProfitCalculator from "./components/ProfitCalculator";
import SellingPriceCalculator from "./components/SellingPriceCalculator";

export default function App() {
  const [tool, setTool] = useState(0);

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Box sx={{ textAlign: "center", pt: 3 }}>
        {/* <img src="/logo.png" width={160} /> */}
        <Typography variant="h4" fontWeight="bold">
          eCommerce Seller Tools
        </Typography>
        <Typography color="text.secondary">
          Pricing & Profit Calculators for Indian Marketplaces
        </Typography>
      </Box>

      {/* TOOL SWITCHER */}
      <Box sx={{  mt: 4 }}>
        <Tabs
          value={tool}
          onChange={(_, v) => setTool(v)}
          centered
        >
          <Tab label="Profit Calculator" />
          <Tab label="Selling Price Calculator" />
        </Tabs>
      </Box>

      {/* TOOL CONTENT */}
      <Box sx={{ flexGrow: 1, py: 4 }}>
        {tool === 0 && <ProfitCalculator />}
        {tool === 1 && <SellingPriceCalculator />}
      </Box>

      {/* FOOTER */}
      <Box py={3}>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
        >
          Free eCommerce Selling Price Calculator for Amazon, Meesho & Flipkart
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mt={1}
        >
          Created by{" "}
          <a
            href="https://www.kiyamoni.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kiya Moni Solutions
          </a>
        </Typography>
      </Box>
    </Container>
  );
}
