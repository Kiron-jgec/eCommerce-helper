export function calculateMarketplaceSellingPrice(data) {
  const n = (value) => Number(value) || 0;

  const productCost = n(data.productCost);
  const gstPercent = n(data.gstPercent);

  const supplierShipping = n(data.supplierShipping);
  const packagingCost = n(data.packagingCost);
  const labelPrintingCost = n(data.labelPrintingCost);

  const returnCost = n(data.returnCost);
  const rtoCost = n(data.rtoCost);

  const buyerShipping = n(data.buyerShipping);
  const marketplaceFeePercent = n(data.marketplaceFeePercent);

  const profitValue = n(data.profitValue);

  /*
   * ======================================================
   * GST CALCULATION TYPE
   * ======================================================
   *
   * BUY_GST_SELL_GST
   * Buy with GST → Sell with GST
   *
   * BUY_NO_GST_SELL_GST
   * Buy without GST → Sell with GST
   *
   * BUY_NO_GST_SELL_NO_GST
   * Buy without GST → Sell without GST
   */

  const buyWithGst =
    data.calculationType === "BUY_GST_SELL_GST";

  const sellWithGst =
    data.calculationType !== "BUY_NO_GST_SELL_NO_GST";

  // ======================================================
  // BUYING GST
  // ======================================================

  const buyingGstAmount = buyWithGst
    ? (productCost * gstPercent) / 100
    : 0;

  /*
   * Product cost is treated as the pre-GST cost.
   *
   * If buying with GST, the GST paid to supplier becomes
   * Input Tax Credit and therefore is not treated as an
   * economic cost.
   */

  const baseBuyingCost =
    productCost +
    supplierShipping +
    packagingCost +
    labelPrintingCost;

  /*
   * GST paid to supplier and available as Input Tax Credit.
   */
  const inputTaxCredit = buyingGstAmount;

  // ======================================================
  // RETURN / RTO
  // ======================================================

  const riskCost =
    returnCost +
    rtoCost;

  // ======================================================
  // TARGET NET PROFIT
  // ======================================================

  /*
   * Profit entered by the user means:
   *
   * ACTUAL NET PROFIT
   *
   * after:
   * - Product cost
   * - Supplier shipping
   * - Packaging
   * - Label
   * - Return/RTO
   * - Marketplace fee
   * - TCS
   * - GST payable
   */

  const targetNetProfit =
    data.profitType === "PERCENT"
      ? (baseBuyingCost * profitValue) / 100
      : profitValue;

  // ======================================================
  // MARKETPLACE FEE
  // ======================================================

  const marketplaceFeeRate =
    marketplaceFeePercent / 100;

  /*
   * Existing calculator assumption:
   * TCS = 1%
   */
  const tcsRate = 0.01;

  // ======================================================
  // SELLING GST
  // ======================================================

  const sellingGstRate =
    sellWithGst
      ? gstPercent / 100
      : 0;

  // ======================================================
  // FIXED COSTS
  // ======================================================

  const fixedCosts =
    baseBuyingCost +
    riskCost;

  // ======================================================
  // VALIDATION
  // ======================================================

  if (marketplaceFeePercent >= 100) {
    return {
      productCost: productCost.toFixed(2),
      buyingGst: buyingGstAmount.toFixed(2),

      supplierShipping:
        supplierShipping.toFixed(2),

      packagingCost:
        packagingCost.toFixed(2),

      labelPrintingCost:
        labelPrintingCost.toFixed(2),

      baseBuyingCost:
        baseBuyingCost.toFixed(2),

      inputTaxCredit:
        inputTaxCredit.toFixed(2),

      returnCost:
        returnCost.toFixed(2),

      rtoCost:
        rtoCost.toFixed(2),

      riskCost:
        riskCost.toFixed(2),

      profit:
        targetNetProfit.toFixed(2),

      actualNetProfit: "0.00",

      buyerShipping:
        buyerShipping.toFixed(2),

      marketplacePriceBeforeGst:
        "0.00",

      marketplaceFee:
        "0.00",

      sellingGstAmount:
        "0.00",

      payableGstAmount:
        "0.00",

      tcsDeductions:
        "0.00",

      productSellingPrice:
        "0.00",

      listingPrice:
        "0.00",

      buyWithGst,
      sellWithGst,

      calculationError: true,
    };
  }

  /*
   * ======================================================
   * PRICE CALCULATION
   * ======================================================
   *
   * Let P = Product selling price BEFORE GST
   *
   * Net Profit =
   *
   * P
   * - Marketplace Fee
   * - TCS
   * - Product/Buying Costs
   * - Risk Costs
   * - Net GST Payable
   *
   * Net GST Payable =
   *
   * Selling GST - Input GST Credit
   *
   * Therefore:
   *
   * Target Profit =
   *
   * P
   * - P × marketplace fee
   * - P × TCS
   * - P × selling GST
   * + Input GST Credit
   * - Fixed Costs
   *
   * Solving for P:
   *
   * P ×
   * (1 - marketplace fee - TCS - selling GST)
   *
   * =
   *
   * Target Profit
   * + Fixed Costs
   * - Input GST Credit
   */

  const denominator =
    1 -
    marketplaceFeeRate -
    tcsRate -
    sellingGstRate;

  if (denominator <= 0) {
    return {
      productCost: productCost.toFixed(2),
      buyingGst: buyingGstAmount.toFixed(2),

      supplierShipping:
        supplierShipping.toFixed(2),

      packagingCost:
        packagingCost.toFixed(2),

      labelPrintingCost:
        labelPrintingCost.toFixed(2),

      baseBuyingCost:
        baseBuyingCost.toFixed(2),

      inputTaxCredit:
        inputTaxCredit.toFixed(2),

      returnCost:
        returnCost.toFixed(2),

      rtoCost:
        rtoCost.toFixed(2),

      riskCost:
        riskCost.toFixed(2),

      profit:
        targetNetProfit.toFixed(2),

      actualNetProfit: "0.00",

      buyerShipping:
        buyerShipping.toFixed(2),

      marketplacePriceBeforeGst:
        "0.00",

      marketplaceFee:
        "0.00",

      sellingGstAmount:
        "0.00",

      payableGstAmount:
        "0.00",

      tcsDeductions:
        "0.00",

      productSellingPrice:
        "0.00",

      listingPrice:
        "0.00",

      buyWithGst,
      sellWithGst,

      calculationError: true,
    };
  }

  // ======================================================
  // PRODUCT PRICE BEFORE GST
  // ======================================================

  const marketplacePriceBeforeGst =
    (
      targetNetProfit +
      fixedCosts -
      inputTaxCredit
    ) / denominator;

  // ======================================================
  // MARKETPLACE FEE
  // ======================================================

  const marketplaceFee =
    marketplacePriceBeforeGst *
    marketplaceFeeRate;

  // ======================================================
  // SELLING GST
  // ======================================================

  const sellingGstAmount =
    marketplacePriceBeforeGst *
    sellingGstRate;

  // ======================================================
  // NET / PAYABLE GST
  // ======================================================

  /*
   * Output GST minus Input GST Credit.
   *
   * This can technically become negative when input
   * credit is greater than output GST.
   *
   * A negative value represents excess input tax credit.
   */

  const netGstPayable =
    sellingGstAmount -
    inputTaxCredit;

  /*
   * For display, payable GST should not normally be shown
   * as negative.
   *
   * If input credit is higher than output GST, display
   * ₹0 payable GST.
   */

  const payableGstAmount =
    Math.max(0, netGstPayable);

  // ======================================================
  // TCS
  // ======================================================

  const tcsDeductions =
    marketplacePriceBeforeGst *
    tcsRate;

  // ======================================================
  // PRODUCT SELLING PRICE
  // ======================================================

  /*
   * This is the price of the product including selling GST.
   *
   * Buyer shipping is NOT included here.
   */

  const productSellingPrice =
    sellWithGst
      ? marketplacePriceBeforeGst +
        sellingGstAmount
      : marketplacePriceBeforeGst;

  // ======================================================
  // FINAL CUSTOMER PRICE
  // ======================================================

  /*
   * Buyer Shipping is an additional charge to the buyer.
   *
   * It is added AFTER calculating the required product
   * selling price.
   *
   * It does NOT reduce the target net profit.
   */

  const listingPrice =
    productSellingPrice +
    buyerShipping;

  // ======================================================
  // ACTUAL NET PROFIT
  // ======================================================

  /*
   * Use NET GST PAYABLE here instead of the displayed
   * payable GST so that Input GST Credit is correctly
   * accounted for.
   */

  const actualNetProfit =
    marketplacePriceBeforeGst -
    marketplaceFee -
    tcsDeductions -
    fixedCosts -
    netGstPayable;

  // ======================================================
  // RETURN
  // ======================================================

  return {
    // --------------------------------------------------
    // BUYING
    // --------------------------------------------------

    productCost:
      productCost.toFixed(2),

    buyingGst:
      buyingGstAmount.toFixed(2),

    supplierShipping:
      supplierShipping.toFixed(2),

    packagingCost:
      packagingCost.toFixed(2),

    labelPrintingCost:
      labelPrintingCost.toFixed(2),

    baseBuyingCost:
      baseBuyingCost.toFixed(2),

    inputTaxCredit:
      inputTaxCredit.toFixed(2),

    // --------------------------------------------------
    // RISK
    // --------------------------------------------------

    returnCost:
      returnCost.toFixed(2),

    rtoCost:
      rtoCost.toFixed(2),

    riskCost:
      riskCost.toFixed(2),

    // --------------------------------------------------
    // SELLING
    // --------------------------------------------------

    profit:
      targetNetProfit.toFixed(2),

    actualNetProfit:
      actualNetProfit.toFixed(2),

    buyerShipping:
      buyerShipping.toFixed(2),

    marketplacePriceBeforeGst:
      marketplacePriceBeforeGst.toFixed(2),

    marketplaceFee:
      marketplaceFee.toFixed(2),

    sellingGstAmount:
      sellingGstAmount.toFixed(2),

    payableGstAmount:
      payableGstAmount.toFixed(2),

    tcsDeductions:
      tcsDeductions.toFixed(2),

    productSellingPrice:
      productSellingPrice.toFixed(2),

    // --------------------------------------------------
    // FINAL
    // --------------------------------------------------

    listingPrice:
      listingPrice.toFixed(2),

    buyWithGst,
    sellWithGst,

    calculationError: false,
  };
}