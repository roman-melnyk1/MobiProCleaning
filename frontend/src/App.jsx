import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MetaPixelTracker from "./components/MetaPixelTracker/MetaPixelTracker";

import Home from "./pages/Home/Home";
import PricesPage from "./pages/PricesPage/PricesPage";
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {
  return (
    <>
      <MetaPixelTracker />
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/prices' element={<PricesPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
