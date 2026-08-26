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
  Container,
  MenuItem,
} from "@mui/material";

import {
  calculateMarketplaceSellingPrice,
} from "../utils/sellingPriceCalculator";

const Input = (props) => (
  <TextField
    size="small"
    fullWidth
    {...props}
  />
);

const Section = ({ title, children }) => (
  <Box mt={2}>
    <Typography
      variant="subtitle2"
      color="text.secondary"
      mb={0.5}
    >
      {title}
    </Typography>

    <Box
      display="grid"
      gap={0.6}
    >
      {children}
    </Box>
  </Box>
);

export default function SellingPriceCalculator() {
  const [form, setForm] = useState({
    productCost: "",

    calculationType:
      "BUY_NO_GST_SELL_GST",

    gstPercent: 5,

    supplierShipping: 2,
    packagingCost: 10,
    labelPrintingCost: 1,

    returnCost: "",
    rtoCost: "",

    profitType: "AMOUNT",
    profitValue: "",

    buyerShipping: "",
    marketplaceFeePercent: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleCalculationTypeChange = (_, value) => {
    if (!value) return;

    setForm({
      ...form,
      calculationType: value,
    });
  };

  const handleProfitTypeChange = (_, value) => {
    if (!value) return;

    setForm({
      ...form,
      profitType: value,
    });
  };

  const result = useMemo(
    () =>
      calculateMarketplaceSellingPrice(form),
    [form]
  );

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 0 }}
    >
      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <Typography
        variant="h6"
        fontWeight={600}
      >
        Marketplace Selling Price Calculator
      </Typography>

      <Typography
        variant="body2"
        mb={3}
        color="text.secondary"
      >
        Calculate the marketplace selling price required
        to achieve your target net profit after product
        cost, GST, marketplace fees, TCS, shipping,
        packaging, labels and return/RTO costs.
      </Typography>

      <Grid container spacing={3}>

        {/* ================================================= */}
        {/* INPUT CARD */}
        {/* ================================================= */}

        <Grid
          item
          size={{ xs: 12, md: 8 }}
        >
          <Card
            elevation={0}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <CardContent>

              {/* ================================================= */}
              {/* GST CALCULATION TYPE */}
              {/* ================================================= */}

              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                GST Calculation Type
              </Typography>

              <Grid
                container
                spacing={2}
                mt={1}
              >
                <Grid
                  item
                  size={{ xs: 12 }}
                >
                  <ToggleButtonGroup
                    exclusive
                    value={
                      form.calculationType
                    }
                    onChange={
                      handleCalculationTypeChange
                    }
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,

                      "& .MuiToggleButton-root": {
                        flex: 1,
                        minWidth: 200,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: "6px !important",
                        textTransform: "none",
                      },
                    }}
                  >
                    <ToggleButton
                      value="BUY_GST_SELL_GST"
                    >
                      Buy with GST
                      <Box
                        component="span"
                        sx={{
                          mx: 0.5,
                        }}
                      >
                        →
                      </Box>
                      Sell with GST
                    </ToggleButton>

                    <ToggleButton
                      value="BUY_NO_GST_SELL_GST"
                    >
                      Buy without GST
                      <Box
                        component="span"
                        sx={{
                          mx: 0.5,
                        }}
                      >
                        →
                      </Box>
                      Sell with GST
                    </ToggleButton>

                    <ToggleButton
                      value="BUY_NO_GST_SELL_NO_GST"
                    >
                      Buy without GST
                      <Box
                        component="span"
                        sx={{
                          mx: 0.5,
                        }}
                      >
                        →
                      </Box>
                      Sell without GST
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>

              {/* ================================================= */}
              {/* PRODUCT & BUYING COST */}
              {/* ================================================= */}

              <Typography
                mt={3}
                sx={{
                  fontWeight: 600,
                }}
              >
                Product & Buying Cost
              </Typography>

              <Grid
                container
                spacing={2}
                mt={2}
              >

                {/* PRODUCT COST */}

                <Grid
                  item
                  size={{
                    xs: 12,
                    md: 3,
                  }}
                >
                  <Input
                    label="Product Cost (₹)"
                    name="productCost"
                    value={
                      form.productCost
                    }
                    onChange={
                      handleChange
                    }
                  />
                </Grid>

                {/* GST */}

                <Grid
                  item
                  size={{
                    xs: 12,
                    md: 3,
                  }}
                >
                  <Input
                    select
                    label="GST (%)"
                    name="gstPercent"
                    value={
                      form.gstPercent
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <MenuItem value={0}>
                      0%
                    </MenuItem>

                    <MenuItem value={5}>
                      5%
                    </MenuItem>

                    <MenuItem value={12}>
                      12%
                    </MenuItem>

                    <MenuItem value={18}>
                      18%
                    </MenuItem>

                    <MenuItem value={28}>
                      28%
                    </MenuItem>
                  </Input>
                </Grid>

                {/* SUPPLIER SHIPPING */}

                <Grid
                  item
                  size={{
                    xs: 12,
                    md: 3,
                  }}
                >
                  <Input
                    label="Supplier Shipping (₹)"
                    name="supplierShipping"
                    value={
                      form.supplierShipping
                    }
                    onChange={
                      handleChange
                    }
                  />
                </Grid>

                {/* PACKAGING */}

                <Grid
                  item
                  size={{
                    xs: 12,
                    md: 3,
                  }}
                >
                  <Input
                    label="Packaging Cost (₹)"
                    name="packagingCost"
                    value={
                      form.packagingCost
                    }
                    onChange={
                      handleChange
                    }
                  />
                </Grid>

                {/* LABEL */}

                <Grid
                  item
                  size={{
                    xs: 12,
                    md: 3,
                  }}
                >
                  <Input
                    label="Label Printing Cost (₹)"
                    name="labelPrintingCost"
                    value={
                      form.labelPrintingCost
                    }
                    onChange={
                      handleChange
                    }
                  />
                </Grid>

              </Grid>

              {/* ================================================= */}
              {/* RETURN / RTO */}
              {/* ================================================= */}

              <Typography
                mt={3}
                sx={{
                  fontWeight: 600,
                }}
              >
                Return & RTO Cost (Avg)
              </Typography>

              <Grid
                container
                spacing={2}
                mt={2}
              >

                <Grid
                  item
                  size={{
                    xs: 12,
                    md: 3,
                  }}
                >
                  <Input
                    label="Return Cost (₹)"
                    name="returnCost"
                    value={
                      form.returnCost
                    }
                    onChange={
                      handleChange
                    }
                  />
                </Grid>

                <Grid
                  item
                  size={{
                    xs: 12,
                    md: 3,
                  }}
                >
                  <Input
                    label="RTO Cost (₹)"
                    name="rtoCost"
                    value={
                      form.rtoCost
                    }
                    onChange={
                      handleChange
                    }
                  />
                </Grid>

              </Grid>

              {/* ================================================= */}
              {/* MARKETPLACE FEE */}
              {/* ================================================= */}

              <Typography
                mt={3}
                sx={{
                  fontWeight: 600,
                }}
              >
                Marketplace Fee
              </Typography>

              <Grid
                container
                spacing={2}
                mt={2}
              >
                <Grid
                  item
                  size={{
                    xs: 12,
                    md: 3,
                  }}
                >
                  <Input
                    label="Marketplace Fee (%)"
                    name="marketplaceFeePercent"
                    value={
                      form.marketplaceFeePercent
                    }
                    onChange={
                      handleChange
                    }
                  />
                </Grid>
              </Grid>

              {/* ================================================= */}
              {/* TARGET NET PROFIT */}
              {/* ================================================= */}

              <Typography
                mt={3}
                sx={{
                  fontWeight: 600,
                }}
              >
                Target Net Profit
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                This is the amount you want to keep
                after all deductions.
              </Typography>

              <Grid
                container
                spacing={2}
                mt={1}
              >

                {/* PROFIT TYPE */}

                <Grid
                  item
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <ToggleButtonGroup
                    size="small"
                    exclusive
                    value={
                      form.profitType
                    }
                    onChange={
                      handleProfitTypeChange
                    }
                  >
                    <ToggleButton
                      value="AMOUNT"
                    >
                      ₹ Amount
                    </ToggleButton>

                    <ToggleButton
                      value="PERCENT"
                    >
                      % Percent
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>

                {/* PROFIT VALUE */}

                <Grid
                  item
                  size={{
                    xs: 12,
                    md: 3,
                  }}
                >
                  <Input
                    label={
                      form.profitType ===
                      "PERCENT"
                        ? "Target Net Profit (%)"
                        : "Target Net Profit (₹)"
                    }
                    name="profitValue"
                    value={
                      form.profitValue
                    }
                    onChange={
                      handleChange
                    }
                  />
                </Grid>

              </Grid>

              {/* ================================================= */}
              {/* BUYER SHIPPING */}
              {/* ================================================= */}

              <Typography
                mt={3}
                sx={{
                  fontWeight: 600,
                }}
              >
                Optional Buyer Shipping
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                This amount is added to the final price
                paid by the buyer and does not reduce
                your target net profit.
              </Typography>

              <Grid
                container
                spacing={2}
                mt={1}
              >
                <Grid
                  item
                  size={{
                    xs: 12,
                    md: 3,
                  }}
                >
                  <Input
                    label="Buyer Shipping Charge (₹)"
                    name="buyerShipping"
                    value={
                      form.buyerShipping
                    }
                    onChange={
                      handleChange
                    }
                  />
                </Grid>
              </Grid>

            </CardContent>
          </Card>
        </Grid>

        {/* ================================================= */}
        {/* RESULT CARD */}
        {/* ================================================= */}

        <Grid
          item
          size={{ xs: 12, md: 4 }}
        >
          <Card
            elevation={0}
            sx={{
              border: 1,
              borderColor: "divider",
              position: {
                md: "sticky",
                xs: "static",
              },
              top: 20,
              borderRadius: 2,
            }}
          >
            <CardContent>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                }}
              >
                Listing Price Breakdown
              </Typography>

              {/* ================================================= */}
              {/* BUYING COST */}
              {/* ================================================= */}

              <Section title="Buying Cost">

                <Row
                  label="Product Cost"
                  value={
                    result.productCost
                  }
                />

                <Row
                  label="Buying GST"
                  value={
                    result.buyingGst
                  }
                />

                <Row
                  label="Supplier Shipping"
                  value={
                    result.supplierShipping
                  }
                />

                <Row
                  label="Packaging Cost"
                  value={
                    result.packagingCost
                  }
                />

                <Row
                  label="Label Printing Cost"
                  value={
                    result.labelPrintingCost
                  }
                />

                <Row
                  strong
                  label="Total Buying Cost"
                  value={
                    result.baseBuyingCost
                  }
                />

                {result.buyWithGst && (
                  <Row
                    label="Input GST Credit"
                    value={
                      result.inputTaxCredit
                    }
                    color="success"
                  />
                )}

              </Section>

              {/* ================================================= */}
              {/* RETURN / RTO */}
              {/* ================================================= */}

              <Section title="Return / RTO (Avg)">

                <Row
                  label="Return Cost"
                  value={
                    result.returnCost
                  }
                />

                <Row
                  label="RTO Cost"
                  value={
                    result.rtoCost
                  }
                />

                <Row
                  strong
                  label="Total Risk Cost"
                  value={
                    result.riskCost
                  }
                />

              </Section>

              {/* ================================================= */}
              {/* SELLING */}
              {/* ================================================= */}

              <Section title="Selling">

                <Row
                  label="Target Net Profit"
                  value={
                    result.profit
                  }
                  strong
                />

                <Row
                  label="Marketplace Fee"
                  value={
                    result.marketplaceFee
                  }
                />

                <Row
                  label="Selling GST"
                  value={
                    result.sellingGstAmount
                  }
                />

                <Row
                  label="Payable GST"
                  value={
                    result.payableGstAmount
                  }
                  color="error"
                />

                <Row
                  label="TCS Deduction"
                  value={
                    result.tcsDeductions
                  }
                  color="error"
                />

              </Section>

              <Divider
                sx={{
                  my: 2.3,
                }}
              />

              {/* ================================================= */}
              {/* FINAL CUSTOMER PRICE */}
              {/* ================================================= */}

              <Section title="Final Customer Price">

                <Row
                  label="Product Selling Price"
                  value={
                    result.productSellingPrice
                  }
                />

                <Row
                  label="Buyer Shipping Charge"
                  value={
                    result.buyerShipping
                  }
                />

        
              </Section>

              <Divider
                sx={{
                  my: 2,
                }}
              />
              <Box sx={{ textAlign: "center" }}>
                 <Typography
                  variant="h4"
                  color="text.primary"
                  sx={{fontWeight:800}}
                >
                { result.listingPrice}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  
                >
                  Final Price Paid by Buyer
                </Typography>
              </Box>

              {/* ================================================= */}
              {/* ACTUAL NET PROFIT */}
              {/* ================================================= */}
 <Divider
                sx={{
                  my: 2,
                }}
              />
              <Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Actual Net Profit
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                  color="success.main"
                >
                  ₹{result.actualNetProfit}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Profit remaining after all calculated
                  deductions.
                </Typography>

              </Box>

            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
}

const Row = ({
  label,
  value,
  strong = false,
  color = "",
}) => (
  <Box
    display="flex"
    justifyContent="space-between"
    gap={2}
  >
    <Typography
      fontWeight={
        strong ? 600 : 400
      }
    >
      {label}
    </Typography>

    <Typography
      fontWeight={
        strong ? 600 : 400
      }
      color={color}
      sx={{
        whiteSpace: "nowrap",
      }}
    >
      ₹{value}
    </Typography>
  </Box>
);