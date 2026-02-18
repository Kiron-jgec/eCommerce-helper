import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import ProfitPage from "./pages/ProfitPage";
import SellingPricePage from "./pages/SellingPricePage";
import PdfLabelUpdater from "./pages/PdfLabelUpdater"
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

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
