export function calculateEcommercePricing(data) {
  const num = (v) => Number(v) || 0;

  const productCost = num(data.productCost);
  const buyingGst = num(data.buyingGst);
  const supplierShipping = num(data.supplierShipping);
  const packagingCost = num(data.packagingCost);
  const labelCost = num(data.labelCost);

  const sellingPrice = num(data.sellingPrice);
  const marketplaceFeePercent = num(data.marketplaceFeePercent);
  const buyerShipping = num(data.buyerShipping);
  const gstPercent = num(data.gstPercent);
  const tcsPercent = num(data.tcsPercent);

  // Buying side
  const buyingGstAmount = (productCost * buyingGst) / 100;
  const finalBuyingPrice =
    productCost + buyingGstAmount + supplierShipping + packagingCost + labelCost;
  
  // Selling side
  const marketplaceFee = (sellingPrice * marketplaceFeePercent) / 100;
  const gstOnFee = (marketplaceFee * gstPercent) / 100;
  const tcs = (sellingPrice * tcsPercent) / 100;

  const totalDeductions =
    marketplaceFee + gstOnFee + tcs + buyerShipping;

  const netSettlement = sellingPrice - totalDeductions;
  const sellingGstAmount = (sellingPrice * gstPercent) / 100;
  const payableGstAmount = sellingGstAmount - buyingGstAmount - gstOnFee;
  const profit = netSettlement - finalBuyingPrice- payableGstAmount;
  const profitMargin = (profit / sellingPrice) * 100;

  return {
    finalBuyingPrice: finalBuyingPrice.toFixed(2),
    buyingGstAmount: buyingGstAmount.toFixed(2),
    marketplaceFee: marketplaceFee.toFixed(2),
    gstOnFee: gstOnFee.toFixed(2),
    tcs: tcs.toFixed(2),
    totalDeductions: totalDeductions.toFixed(2),
    netSettlement: netSettlement.toFixed(2),
    sellingGstAmount: sellingGstAmount.toFixed(2),
    payableGstAmount: payableGstAmount.toFixed(2),
    profit: profit.toFixed(2),
    profitMargin: profitMargin.toFixed(2),
  };
}
