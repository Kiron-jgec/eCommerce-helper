import { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import { calculateEcommercePricing } from "../utils/calculations";

const Input = (props) => (
  <TextField size="small" fullWidth variant="outlined" {...props} />
);

export default function ProfitCalculator() {
  const [form, setForm] = useState({
    productCost: "",
    supplierShipping: "",
    packagingCost: "",
    labelCost: "",
    sellingPrice: "",
    marketplaceFeePercent: "",
    buyerShipping: 60,
    gstPercent: 18,
    tcsPercent: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  AUTO CALCULATION
  const result = useMemo(() => {
    return calculateEcommercePricing(form);
  }, [form]);

  const profit = Number(result?.profit || 0);

  return (
    <Grid container spacing={3} sx={{}}>
      {/* LEFT – INPUTS */}
      <Grid item size={8}>
        <Card
          elevation={0}
          sx={{ border: 1, borderColor: "divider", borderRadius: 2 }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              eCommerce Profit Calculator
            </Typography>

            {/* BUYING */}
            <Typography variant="subtitle1" mt={3} sx={{ fontWeight: 600 }}>
              Buying Cost (Per Piece) :
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid item size={3}>
                <Input
                  label="Product Cost (₹)"
                  name="productCost"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={3}>
                <Input
                  label="Supplier Shipping (₹)"
                  name="supplierShipping"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={3}>
                <Input
                  label="Packaging Cost (₹)"
                  name="packagingCost"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={3}>
                <Input
                  label="Label Printing (₹)"
                  name="labelCost"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* SELLING */}
            <Typography variant="subtitle1" sx={{ mt: 3, fontWeight: 600 }}>
              Selling & Platform Charges
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid item size={2.4}>
                <Input
                  label="Selling Price (₹)"
                  name="sellingPrice"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={2.4}>
                <Input
                  label="Marketplace Fee (%)"
                  name="marketplaceFeePercent"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={2.4}>
                <Input
                  label="Buyer Shipping (₹)"
                  name="buyerShipping"
                  value={form.buyerShipping}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={2.4}>
                <Input
                  label="GST on Fees (%)"
                  name="gstPercent"
                  value={form.gstPercent}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={2.4}>
                <Input
                  label="TCS (%)"
                  name="tcsPercent"
                  value={form.tcsPercent}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Typography
              variant="caption"
              color="text.secondary"
              mt={2}
              display="block"
            >
              Results update automatically as you type
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* RIGHT – LIVE RESULT */}
      <Grid item size={4}>
        <Card
          sx={{
            position: "sticky",
            top: 20,
            border: 1,
            // borderLeft: "6px solid",
            borderRadius: 2,
            borderColor: profit >= 0 ? "success.main" : "error.main",
          }}
          elevation={0}
        >
          <CardContent>
            <Typography variant="h6">💰 Live Result</Typography>

            <Box mt={2} display="grid" gap={1.2}>
              <Row label="Final Buying Price" value={result.finalBuyingPrice} />
              <Row label="Marketplace Fee" value={result.marketplaceFee} />
              <Row label="GST on Fee" value={result.gstOnFee} />
              <Row label="TCS" value={result.tcs} />
              <Row label="Net Bank Settlement" value={result.netSettlement} />
            </Box>

            <Divider sx={{ my: 2.2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                color={profit >= 0 ? "success.main" : "error.main"}
              >
                Profit: ₹{result.profit}
              </Typography>

              <Chip
                label={`Margin: ${result.profitMargin}%`}
                color={profit >= 0 ? "success" : "error"}
                sx={{ mt: 1 }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

const Row = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography color="text.secondary">{label}</Typography>
    <Typography fontWeight="bold">₹{value}</Typography>
  </Box>
);
