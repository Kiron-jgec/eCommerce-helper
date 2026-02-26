import { useState, useMemo } from "react";
import { Container, Grid, Typography } from "@mui/material";
import ReturnLossForm from "../components/returnloss/ReturnLossForm";
import ReturnLossDashboard from "../components/returnloss/ReturnLossDashboard";
import ReturnLossInsights from "../components/returnloss/ReturnLossInsights";
import { calculateReturnLoss } from "../utils/returnLossEngine";

const ReturnLoss = () => {
  const [values, setValues] = useState({
    sellingPrice: 500,
    productCost: 200,
    shippingCost: 40,
    packagingCost: 20,
    commissionPercent: 15,
    pgPercent: 2,
    gstPercent: 18,
    returnRate: 12,
    reverseShippingCost: 60,
    monthlyOrders: 500,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: Number(value),
    });
  };

  const results = useMemo(() => {
    return calculateReturnLoss(values);
  }, [values]);
  return (
    <Container maxWidth="xl" sx={{ }}>
      <Typography variant="h6" fontWeight={600}>
        Return Loss Analyzer
      </Typography>
      <Typography variant="body2"  mb={3}>
        Analyze the financial impact of product returns on your profitability. Input your product and return data to see key metrics like total return loss, profit after returns, and the break-even return rate. Use these insights to optimize your return policies and minimize losses.
      </Typography>

      <Grid container spacing={2}>
        <Grid item size={8}>
          <ReturnLossForm values={values} handleChange={handleChange} />
        </Grid>

        <Grid item size={4}>
          <Grid container spacing={2}>
            <Grid item size={12}>
              <ReturnLossDashboard results={results} />
            </Grid>
            <Grid item size={12}>
              <ReturnLossInsights results={results} values={values} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReturnLoss;
