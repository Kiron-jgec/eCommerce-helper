import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { calculateMarketplaceSellingPrice } from "../utils/sellingPriceCalculator";

const Input = (props) => <TextField size="small" fullWidth {...props} />;
const Section = ({ title, children }) => (
  <Box mt={2}>
    <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
      {title}
    </Typography>
    <Box display="grid" gap={0.6}>
      {children}
    </Box>
  </Box>
);

export default function SellingPriceCalculator() {
  const [form, setForm] = useState({
    productCost: "",
    buyingGst: "",
    supplierShipping: "",
    packagingCost: "",
    labelPrintingCost: "",
    returnCost: "",
    rtoCost: "",
    profitType: "AMOUNT",
    profitValue: "",
    buyerShipping: "",
    marketplaceFeePercent: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const result = useMemo(() => calculateMarketplaceSellingPrice(form), [form]);
  return (
    <Grid container spacing={3}>
      {/* INPUTS */}
      <Grid item size={8} md={8}>
        <Card
          elevation={0}
          sx={{ border: 1, borderColor: "divider", borderRadius: 2 }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              Marketplace Selling Price Calculator
            </Typography>

            {/* BUYING */}
            <Typography mt={3} sx={{ fontWeight: 600 }}>
              Product & Buying Cost :{" "}
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item size={3}>
                <Input
                  label="Product Cost (₹)"
                  name="productCost"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={3}>
                <Input
                  label="Buying GST (%)"
                  name="buyingGst"
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
                  label="Label Printing Cost (₹)"
                  name="labelPrintingCost"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* RISK */}
            <Typography mt={3} sx={{ fontWeight: 600 }}>
              Return & RTO Cost (Avg) :{" "}
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={6}>
                <Input
                  label="Return Cost (₹)"
                  name="returnCost"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label="RTO Cost (₹)"
                  name="rtoCost"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Typography mt={3} sx={{ fontWeight: 600 }}>
              {" "}
              Marketplace Fee :
            </Typography>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={6}>
                <Input
                  label="Marketplace Fee (%)"
                  name="marketplaceFeePercent"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* PROFIT */}
            <Typography mt={3} sx={{ fontWeight: 600 }}>
              Profit :{" "}
            </Typography>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={6}>
                <ToggleButtonGroup
                  size="small"
                  exclusive
                  value={form.profitType}
                  onChange={(_, v) => v && setForm({ ...form, profitType: v })}
                  sx={{}}
                >
                  <ToggleButton value="AMOUNT">₹ Amount</ToggleButton>
                  <ToggleButton value="PERCENT">% Percent</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label={
                    form.profitType === "PERCENT" ? "Profit (%)" : "Profit (₹)"
                  }
                  name="profitValue"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* SHIPPING */}
            <Typography mt={3} sx={{ fontWeight: 600 }}>
              Optional Buyer Shipping :{" "}
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={6}>
                <Input
                  label="Buyer Shipping Charge (₹)"
                  name="buyerShipping"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* RESULT */}
      <Grid item size={4} md={8}>
        <Card
          elevation={0}
          sx={{
            border: 1,
            borderColor: "divider",
            position: { md: "sticky", xs: "static" },
            top: 20,
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Listing Price Breakdown :{" "}
            </Typography>

            {/* BUYING */}
            <Section title="Buying Cost">
              <Row label="Product Cost" value={result.productCost} />
              <Row label="Buying GST" value={result.buyingGst} />
              <Row label="Supplier Shipping" value={result.supplierShipping} />
              <Row label="Packaging Cost" value={result.packagingCost} />
              <Row
                label="Label Printing Cost"
                value={result.labelPrintingCost}
              />
              <Row
                strong
                label="Total Buying Cost"
                value={result.baseBuyingCost}
              />
            </Section>

            {/* RISK */}
            <Section title="Return / RTO (Avg)">
              <Row label="Return Cost" value={result.returnCost} />
              <Row label="RTO Cost" value={result.rtoCost} />
              <Row strong label="Total Risk Cost" value={result.riskCost} />
            </Section>

            {/* SELLING */}
            <Section title="Selling">
              <Row label="Desired Profit" value={result.profit} />
              <Row label="Buyer Shipping" value={result.buyerShipping} />
              <Row label="Marketplace Fee" value={result.marketplaceFee} />
            </Section>

            <Divider sx={{ my: 2.3 }} />

            {/* FINAL */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" color="primary.main">
                ₹{result.listingPrice}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Final price shown to buyers on marketplace
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

const Row = ({ label, value, strong }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography fontWeight={strong ? 600 : 400}>{label}</Typography>
    <Typography fontWeight={strong ? 600 : 400}>₹{value}</Typography>
  </Box>
);
