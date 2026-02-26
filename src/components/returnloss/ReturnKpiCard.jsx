import { Card, Typography } from "@mui/material";

const ReturnKpiCard = ({ title, value, subtitle }) => {
  return (
    <Card
     elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
        height: "100%",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>

      <Typography variant="h5" fontWeight={700} mt={1}>
        {value}
      </Typography>

      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Card>
  );
};

export default ReturnKpiCard;