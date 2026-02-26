import { Card, Grid, TextField, Typography } from "@mui/material";

const BreakEvenForm = ({ values, handleChange }) => {
  const fields = [
    { name: "sellingPrice", label: "Selling Price" },
    { name: "productCost", label: "Product Cost" },
    { name: "shippingCost", label: "Shipping Cost" },
    { name: "packagingCost", label: "Packaging Cost" },
    { name: "commissionPercent", label: "Commission %" },
    { name: "pgPercent", label: "Payment Gateway %" },
    { name: "gstPercent", label: "GST %" },
    { name: "returnRate", label: "Return Rate %" },
    { name: "adCost", label: "Ad Cost Per Sale" },
    { name: "fixedCosts", label: "Total Fixed Cost (Monthly)" }
  ];

  return (
    <Card
     elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
        
      }}
    >
      <Typography variant="h6" mb={3}>
        Inputs
      </Typography>

      <Grid container spacing={3}>
        {fields.map((field) => (
          <Grid item size={6} key={field.name}>
            <TextField
              fullWidth
              type="number"
              label={field.label}
              name={field.name}
              value={values[field.name]}
              onChange={handleChange}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default BreakEvenForm;