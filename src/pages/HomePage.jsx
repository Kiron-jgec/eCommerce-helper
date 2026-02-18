import {
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
  const navigate = useNavigate();

  function navigateNow(path){
    navigate(path)
  }
  return (
    <Container maxWidth="xl">
      {/* HERO SECTION */}
      <Box
        container
        spacing={6}
        alignItems="center"
        sx={{  pt: 6 }}
      >
        {/* Left Content */}
          <Typography
            variant="h2"
            fontWeight={700}
            sx={{
              background: "linear-gradient(90deg,#C0C0C0,#9E9E9E)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign:"center"
            }}
          >
            eCommerce Seller Tools
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            mt={0}
            sx={{ maxWidth: 500,textAlign:"center",mx:"auto" }}
          >
            Professional tools built for Amazon, Flipkart and Meesho sellers.
            Optimize pricing, increase profits, and streamline operations.
          </Typography>



      </Box>

      {/* FEATURES SECTION */}
      <Box mt={4} mb={8}>
        <Typography
          variant="h6"
          fontWeight={600}
          textAlign="left"
          gutterBottom
        >
          Powerful Tools for Marketplace Sellers
        </Typography>

        <Grid container spacing={4} mt={4}>
          <Grid item size={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                },
                 height:"100%",
                 border: 1,
                 borderColor: "divider",
                 backgroundColor: "background.paper",
                 cursor:"pointer"
              }}
              onClick={()=>navigateNow("/profit-calculator")}
            >
              <CalculateIcon
                sx={{ fontSize: 50, mb: 2, color: "primary.main" }}
              />
              <Typography variant="h6" fontWeight={600}>
                Profit Calculator
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Calculate accurate profit margins after commissions,
                shipping, and taxes.
              </Typography>
            </Paper>
          </Grid>


          <Grid item size={4}>
            <Paper
             onClick={()=>navigateNow("/selling-price-calculator")}
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                },
                 height:"100%",
                 border: 1,
                 borderColor: "divider",
                 backgroundColor: "background.paper",
                 cursor:"pointer"
              }}
            >
              <TrendingUpIcon
                sx={{ fontSize: 50, mb: 2, color: "primary.main" }}
              />
              <Typography variant="h6" fontWeight={600}>
                Selling Price Calculate
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Set competitive selling prices while maintaining healthy
                margins.
              </Typography>
            </Paper>
          </Grid>

          <Grid item size={4}>
            <Paper
              elevation={0}
              onClick={()=>navigateNow("/pdf-label-updater")}
              sx={{
                p: 4,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                },
                 height:"100%",
                 border: 1,
                 borderColor: "divider",
                 backgroundColor: "background.paper",
                 cursor:"pointer"
              }}
            >
              <PictureAsPdfIcon
                sx={{ fontSize: 50, mb: 2, color: "primary.main" }}
              />
              <Typography variant="h6" fontWeight={600}>
                Add Message for Buy's on Labels
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Automatically add thank-you notes to shipping labels in bulk.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

    </Container>
  );
}
