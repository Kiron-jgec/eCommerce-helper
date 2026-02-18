import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>

      <Footer />
    </Box>
  );
}
