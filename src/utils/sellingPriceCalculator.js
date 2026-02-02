export function calculateMarketplaceSellingPrice(data) {
  const n = (v) => Number(v) || 0;

  const productCost = n(data.productCost);
  const buyingGst = n(data.buyingGst);
  const supplierShipping = n(data.supplierShipping);
  const packagingCost = n(data.packagingCost);
  const labelPrintingCost = n(data.labelPrintingCost)
  const returnCost = n(data.returnCost);
  const rtoCost = n(data.rtoCost);

  const buyerShipping = n(data.buyerShipping);
  const marketplaceFeePercent = n(data.marketplaceFeePercent);

  const baseBuyingCost =
    productCost + (productCost*buyingGst*0.01) + supplierShipping + packagingCost+labelPrintingCost

  const riskCost = returnCost + rtoCost;

  const profit =
    data.profitType === "PERCENT"
      ? (baseBuyingCost * n(data.profitValue)) / 100
      : n(data.profitValue);

  const totalBeforeFee =
    baseBuyingCost + riskCost + profit + buyerShipping;

  const listingPrice =
    marketplaceFeePercent >= 100
      ? 0
      : totalBeforeFee / (1 - marketplaceFeePercent / 100);

  const marketplaceFee =
    (listingPrice * marketplaceFeePercent) / 100;

  return {
    // buying
    productCost: productCost.toFixed(2),
    buyingGst: (productCost*buyingGst*0.01).toFixed(2),
    supplierShipping: supplierShipping.toFixed(2),
    packagingCost: packagingCost.toFixed(2),
    baseBuyingCost: baseBuyingCost.toFixed(2),
    labelPrintingCost:labelPrintingCost.toFixed(2),
    // risks
    returnCost: returnCost.toFixed(2),
    rtoCost: rtoCost.toFixed(2),
    riskCost: riskCost.toFixed(2),

    // selling
    profit: profit.toFixed(2),
    buyerShipping: buyerShipping.toFixed(2),
    marketplaceFee: marketplaceFee.toFixed(2),

    // final
    listingPrice: listingPrice.toFixed(2),
  };
}
