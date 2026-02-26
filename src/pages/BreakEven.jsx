import { useState, useMemo } from "react";
import { Container, Grid, Typography } from "@mui/material";
import BreakEvenForm from "../components/breakeven/BreakEvenForm";
import BreakEvenDashboard from "../components/breakeven/BreakEvenDashboard";
import SimulationSection from "../components/breakeven/SimulationSection";
import InsightsSection from "../components/breakeven/InsightsSection";
import { calculateBreakEven } from "../utils/breakEvenEngine";

const BreakEven = () => {
  const [values, setValues] = useState({
    sellingPrice: 350,
    productCost: 100,
    shippingCost: 20,
    packagingCost: 10,
    commissionPercent: 0,
    pgPercent: 2,
    gstPercent: 18,
    returnRate: 2,
    adCost: 12,
    fixedCosts: 25000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: Number(value),
    });
  };

  const results = useMemo(() => {
    return calculateBreakEven(values);
  }, [values]);

  return (
    <Container maxWidth="xl" sx={{ py: 0 }}>
                      <Typography variant="h6" fontWeight={600} >
        Break-Even Calculator
      </Typography>
       <Typography variant="body2"  mb={3}>
        Understand how many units you need to sell to cover your costs and start making a profit. Adjust the inputs to see how different scenarios impact your break-even point and profitability.
      </Typography>
      <Grid container spacing={2}>
        <Grid item size={6} xs={12} md={7}>
          <BreakEvenForm values={values} handleChange={handleChange} />
        </Grid>

        <Grid item size={6} xs={12} md={5}>
          <Grid container spacing={2}>
            <Grid item size={12} xs={12}>
              <BreakEvenDashboard results={results} />
            </Grid>
            <Grid item size={12} xs={12}>
              <SimulationSection values={values} setValues={setValues} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item size={12} xs={12} md={7}>
             <InsightsSection results={results} />
        </Grid>
      </Grid>

      
    </Container>
  );
};

export default BreakEven;
