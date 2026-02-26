import {
  Card,
  Typography,
  Chip,
  Box,
  Stack
} from "@mui/material";

const InsightRow = ({ label, value, color = "primary", subtitle }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Left Accent Bar */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: `${color}.main`
        }}
      />

      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        <Chip
          label={value}
          color={color}
          sx={{
            fontWeight: 600,
            px: 1,
            height: 28
          }}
        />

      
      </Stack>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
    </Box>
  );
};

const RoasInsightsSection = ({ results }) => {
  const roasColor =
    results.roas < 2
      ? "error"
      : results.roas < 3
      ? "warning"
      : "success";

  const profitColor =
    results.netProfit < 0 ? "error" : "success";

  const roasLabel =
    results.roas < 2
      ? "Low Return"
      : results.roas < 3
      ? "Average Performance"
      : "Strong Performance";

  return (
    <Card
      elevation={0}
      sx={{
        p: 2.7,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider"
      }}
    >
      <Typography variant="h6" mb={1}>
        Scaling Insights
      </Typography>

      <Stack spacing={2} direction="row" alignItems="center">

        <InsightRow
          label="Return on Ad Spend (ROAS)"
          value={`${results.roas.toFixed(2)}x`}
          color={roasColor}
          subtitle={roasLabel}
        />

        <InsightRow
          label="Advertising Cost of Sales (ACOS)"
          value={`${results.acos.toFixed(1)}%`}
          color="primary"
          subtitle="Lower is better"
        />

        <InsightRow
          label="Net Profit After Advertising Expenses"
          value={`₹ ${results.netProfit.toFixed(0)}`}
          color={profitColor}
          subtitle={
            results.netProfit < 0
              ? "Ads are currently unprofitable"
              : "Ads are profitable"
          }
        />

      </Stack>
    </Card>
  );
};

export default RoasInsightsSection;