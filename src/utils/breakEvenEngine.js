export function calculateBreakEven(data) {
  const {
    sellingPrice,
    productCost,
    shippingCost,
    packagingCost,
    commissionPercent,
    pgPercent,
    gstPercent,
    returnRate,
    adCost,
    fixedCosts
  } = data;

  const commission = sellingPrice * (commissionPercent / 100);
  const pgFee = sellingPrice * (pgPercent / 100);
  const gstImpact = sellingPrice * (gstPercent / 100);
  const returnLoss = sellingPrice * (returnRate / 100);

  const variableCost =
    productCost +
    shippingCost +
    packagingCost +
    commission +
    pgFee +
    gstImpact +
    adCost +
    returnLoss;

  const contribution = sellingPrice - variableCost;

  const breakEvenUnits =
    contribution > 0 ? fixedCosts / contribution : 0;

  const breakEvenRevenue = breakEvenUnits * sellingPrice;

  const contributionMargin =
    sellingPrice > 0
      ? (contribution / sellingPrice) * 100
      : 0;

  const profitAfter100 =
    contribution * 100 - fixedCosts;

  return {
    contribution,
    breakEvenUnits,
    breakEvenRevenue,
    contributionMargin,
    profitAfter100
  };
}