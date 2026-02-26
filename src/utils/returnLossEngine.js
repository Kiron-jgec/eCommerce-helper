export function calculateReturnLoss(data) {
  const {
    sellingPrice,
    productCost,
    shippingCost,
    packagingCost,
    commissionPercent,
    pgPercent,
    gstPercent,
    returnRate,
    reverseShippingCost,
    monthlyOrders
  } = data;

  const commission = sellingPrice * (commissionPercent / 100);
  const pgFee = sellingPrice * (pgPercent / 100);
  const gstImpact = sellingPrice * (gstPercent / 100);

  const costPerUnit =
    productCost +
    shippingCost +
    packagingCost +
    commission +
    pgFee +
    gstImpact;

  const returnUnits = monthlyOrders * (returnRate / 100);

  const returnLossPerUnit =
    costPerUnit + reverseShippingCost;

  const totalReturnLoss =
    returnUnits * returnLossPerUnit;

  const totalRevenue =
    monthlyOrders * sellingPrice;

  const totalCost =
    costPerUnit * monthlyOrders;

  const profitBeforeReturns =
    totalRevenue - totalCost;

  const profitAfterReturns =
    profitBeforeReturns - totalReturnLoss;

  // Break return rate (where profit becomes zero)
  const breakReturnRate =
    profitBeforeReturns > 0
      ? (profitBeforeReturns / (monthlyOrders * returnLossPerUnit)) * 100
      : 0;

  return {
    returnUnits,
    totalReturnLoss,
    profitAfterReturns,
    breakReturnRate
  };
}