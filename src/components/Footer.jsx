import { Box, Container, Typography, Grid, Link, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        //bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        // borderTop: `1px solid ${theme.palette.divider}`,
        backdropFilter: "blur(8px)", // premium touch
        mt: 6,
        py: 3,
      })}
    >
      <Container maxWidth="xl">
        <Box textAlign="center">
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} eCom Seller Tools. All rights reserved.
            Created by{" "}
            <Link
              href="https://www.kiyamoni.com"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="hover"
            >
              Kiya Moni Solutions
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
