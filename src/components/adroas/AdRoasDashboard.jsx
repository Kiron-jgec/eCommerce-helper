import { Grid } from "@mui/material";
import RoasKpiCard from "./RoasKpiCard";

const AdRoasDashboard = ({ results }) => {
  return (
    <Grid container spacing={2}>
      <Grid item size={6}>
        <RoasKpiCard
          title="Return on Ad Spend (ROAS)"
          value={`${results.roas.toFixed(2)}x`}
        />
      </Grid>

      <Grid item size={6}>
        <RoasKpiCard
          title="Advertising Cost of Sales (ACOS)"
          value={`${results.acos.toFixed(1)}%`}
        />
      </Grid>

      <Grid item size={6}>
        <RoasKpiCard
          title="Total Advertising Cost of Sales (TACOS)"
          value={`${results.tacos.toFixed(1)}%`}
          
        />
      </Grid>

      <Grid item size={6}>
        <RoasKpiCard
          title="Customer Acquisition Cost (CAC)"
          value={`₹ ${results.cac.toFixed(0)}`}
        />
      </Grid>

      <Grid item size={12}>
        <RoasKpiCard
          title="Net Profit After Advertising Expenses"
          value={`₹ ${results.netProfit.toFixed(0)}`}
          color={results.netProfit < 0 ? "error" : "success"}
        />
      </Grid>
    </Grid>
  );
};

export default AdRoasDashboard;