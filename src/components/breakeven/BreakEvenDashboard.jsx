import { Grid } from "@mui/material";
import KpiCard from "./KpiCard";

const BreakEvenDashboard = ({ results }) => {
  return (
    <Grid container spacing={2}>
      <Grid item size={6}>
        <KpiCard
          title="Contribution Per Unit"
          value={`₹ ${results.contribution.toFixed(2)}`}
          subtitle={`${results.contributionMargin.toFixed(1)}% margin`}
        />
      </Grid>

      <Grid item size={6}>
        <KpiCard
          title="Break-Even Units"
          value={results.breakEvenUnits.toFixed(0)}
        />
      </Grid>

      <Grid item size={6}>
        <KpiCard
          title="Break-Even Revenue"
          value={`₹ ${results.breakEvenRevenue.toFixed(0)}`}
        />
      </Grid>

      <Grid item size={6}>
        <KpiCard
          title="Profit After 100 Sales"
          value={`₹ ${results.profitAfter100.toFixed(0)}`}
        />
      </Grid>
    </Grid>
  );
};

export default BreakEvenDashboard;