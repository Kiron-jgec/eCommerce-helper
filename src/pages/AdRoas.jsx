import { useState, useMemo } from "react";
import { Container, Grid, Typography } from "@mui/material";
import AdRoasForm from "../components/adroas/AdRoasForm";
import AdRoasDashboard from "../components/adroas/AdRoasDashboard";
import RoasInsightsSection from "../components/adroas/RoasInsightsSection";
import { calculateAdMetrics } from "../utils/adRoasEngine";

const AdRoas = () => {
  const [values, setValues] = useState({
    adSpend: 10000,
    adRevenue: 40000,
    organicRevenue: 20000,
    ordersFromAds: 100,
    sellingPrice: 500,
    productCost: 200,
    shippingCost: 40,
    packagingCost: 20,
    commissionPercent: 15,
    pgPercent: 2,
    gstPercent: 18,
    returnRate: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: Number(value),
    });
  };

  const results = useMemo(() => {
    return calculateAdMetrics(values);
  }, [values]);

  return (
    <Container maxWidth="xl" sx={{  }}>
      <Typography variant="h6" fontWeight={600}>
        Ad ROAS & CAC Analyzer
      </Typography>
        <Typography variant="body2"  mb={3}>
        Dive deep into your advertising performance with our ROAS & CAC Analyzer. Input your ad spend, revenue, and cost details to uncover insights on your return on ad spend, customer acquisition cost, and overall profitability. Use these insights to optimize your campaigns and maximize your advertising ROI.
  </Typography>
      <Grid container spacing={2}>
        <Grid item size={6}>
          <AdRoasForm values={values} handleChange={handleChange} />
        </Grid>

        <Grid item size={6}>
          <Grid container spacing={2}>
            <Grid item size={12}>
              <AdRoasDashboard results={results} />
            </Grid>
            <Grid item size={12}>
              <RoasInsightsSection results={results} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdRoas;
