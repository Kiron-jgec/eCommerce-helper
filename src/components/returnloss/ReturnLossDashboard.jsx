import { Grid } from "@mui/material";
import ReturnKpiCard from "./ReturnKpiCard";

const ReturnLossDashboard = ({ results }) => {
  return (
    <Grid container spacing={2}>
      <Grid item size={6}>
        <ReturnKpiCard
          title="Returned Units"
          value={results.returnUnits.toFixed(0)}
        />
      </Grid>

      <Grid item size={6}>
        <ReturnKpiCard
          title="Total Return Loss"
          value={`₹ ${results.totalReturnLoss.toFixed(0)}`}
        />
      </Grid>

      <Grid item size={6}>
        <ReturnKpiCard
          title="Profit After Returns"
          value={`₹ ${results.profitAfterReturns.toFixed(0)}`}
        />
      </Grid>

      <Grid item size={6}>
        <ReturnKpiCard
          title="Break Return Rate"
          value={`${results.breakReturnRate.toFixed(1)}%`}
          subtitle="Return rate at which profit becomes zero"
        />
      </Grid>
    </Grid>
  );
};

export default ReturnLossDashboard;