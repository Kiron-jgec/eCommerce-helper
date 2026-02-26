import {
  Card,
  List,
  ListItem,
  Typography,
  Chip,
  Box
} from "@mui/material";

const InsightsSection = ({ results }) => {
  const dailySales = 5;

  const daysToBreakEven =
    results.breakEvenUnits > 0
      ? results.breakEvenUnits / dailySales
      : 0;

  // Margin health logic
  const margin = results.contributionMargin;

  const getMarginColor = () => {
    if (margin < 15) return "error";
    if (margin < 30) return "warning";
    return "success";
  };

  const getMarginLabel = () => {
    if (margin < 15) return "Weak Margin";
    if (margin < 30) return "Moderate Margin";
    return "Healthy Margin";
  };

  return (
    <Card
      elevation={0}
      sx={{
        mt: 2,
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider"
      }}
    >
      <Typography variant="h6" mb={2}>
        Business Insights
      </Typography>

      <List disablePadding>

        {/* Break Even Units */}
        <ListItem sx={{ px: 0, py: 1 }}>
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography>
              You must sell
            </Typography>

            <Chip
              label={`${results.breakEvenUnits.toFixed(0)} Units`}
              color="primary"
              size="small"
            />

            <Typography>
              to break even.
            </Typography>
          </Box>
        </ListItem>

        {/* Days to Break Even */}
        <ListItem sx={{ px: 0, py: 1 }}>
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography>
              At
            </Typography>

            <Chip
              label={`${dailySales} Sales/Day`}
              variant="outlined"
              size="small"
            />

            <Typography>
              you will break even in
            </Typography>

            <Chip
              label={`${daysToBreakEven.toFixed(1)} Days`}
              color="secondary"
              size="small"
            />
          </Box>
        </ListItem>

        {/* Contribution Margin */}
        <ListItem sx={{ px: 0, py: 1 }}>
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography>
              Contribution margin is
            </Typography>

            <Chip
              label={`${margin.toFixed(1)}%`}
              color={getMarginColor()}
              size="small"
            />

            <Chip
              label={getMarginLabel()}
              variant="outlined"
              color={getMarginColor()}
              size="small"
            />
          </Box>
        </ListItem>

      </List>
    </Card>
  );
};

export default InsightsSection;