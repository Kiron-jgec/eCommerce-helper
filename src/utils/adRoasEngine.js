export function calculateAdMetrics(data) {
  const {
    adSpend,
    adRevenue,
    organicRevenue,
    ordersFromAds,
    sellingPrice,
    productCost,
    shippingCost,
    packagingCost,
    commissionPercent,
    pgPercent,
    gstPercent,
    returnRate
  } = data;

  const totalRevenue = adRevenue + organicRevenue;

  const commission = sellingPrice * (commissionPercent / 100);
  const pgFee = sellingPrice * (pgPercent / 100);
  const gstImpact = sellingPrice * (gstPercent / 100);
  const returnLoss = sellingPrice * (returnRate / 100);

  const variableCostPerUnit =
    productCost +
    shippingCost +
    packagingCost +
    commission +
    pgFee +
    gstImpact +
    returnLoss;

  const totalOrders =
    sellingPrice > 0 ? totalRevenue / sellingPrice : 0;

  const totalVariableCost = variableCostPerUnit * totalOrders;

  const netProfit =
    totalRevenue - totalVariableCost - adSpend;

  const roas =
    adSpend > 0 ? adRevenue / adSpend : 0;

  const acos =
    adRevenue > 0 ? (adSpend / adRevenue) * 100 : 0;

  const tacos =
    totalRevenue > 0 ? (adSpend / totalRevenue) * 100 : 0;

  const cac =
    ordersFromAds > 0 ? adSpend / ordersFromAds : 0;

  return {
    roas,
    acos,
    tacos,
    cac,
    netProfit,
    totalRevenue
  };
}