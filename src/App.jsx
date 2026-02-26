import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import ProfitPage from "./pages/ProfitPage";
import SellingPricePage from "./pages/SellingPricePage";
import PdfLabelUpdater from "./pages/PdfLabelUpdater"
import LowShippingGeneratorPage from "./pages/LowShippingGenerator";
import BreakEven from "./pages/BreakEven";
import AdRoas from "./pages/AdRoas";
import ReturnLoss from "./pages/ReturnLoss";
export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profit-calculator" element={<ProfitPage />} />
          <Route
            path="/selling-price-calculator"
            element={<SellingPricePage />}
          />
          <Route path="/pdf-label-updater" element={<PdfLabelUpdater />} />
          {/* <Route path="/low-shipping-generator" element={<LowShippingGeneratorPage />} /> */}
          <Route path="/break-even-calculator" element={<BreakEven />} />
          <Route path="/ad-roas-calculator" element={<AdRoas />} />
          <Route path="/return-loss-calculator" element={<ReturnLoss />} />


        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
