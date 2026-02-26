import {
  Card,
  Typography,
  Stack,
  Chip,
  Box
} from "@mui/material";

const ReturnLossInsights = ({ results, values }) => {
  const riskLevel =
    values.returnRate > 20
      ? "error"
      : values.returnRate > 10
      ? "warning"
      : "success";

  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
        width: "100%",
      }}
    >
      <Typography variant="h6" mb={2.5}>
        Return Risk Insights
      </Typography>

      <Stack spacing={2}>

        <Box display="flex" gap={1} alignItems="center">
          <Typography>Current Return Rate :</Typography>
          <Chip
            label={`${values.returnRate}%`}
            color={riskLevel}
            size="small"
          />
        </Box>

        <Box display="flex" gap={1} alignItems="center">
          <Typography>Break Return Rate :</Typography>
          <Chip
            label={`${results.breakReturnRate.toFixed(1)}%`}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box display="flex" gap={1} alignItems="center">
          <Typography>Profit Status :</Typography>
          <Chip
            label={
              results.profitAfterReturns < 0
                ? "Currently Losing Due to Returns"
                : "Profitable After Returns"
            }
            color={
              results.profitAfterReturns < 0
                ? "error"
                : "success"
            }
            size="small"
          />
        </Box>

      </Stack>
    </Card>
  );
};

export default ReturnLossInsights;