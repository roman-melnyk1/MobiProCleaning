import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import PricesPage from "./pages/PricesPage/PricesPage";
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/prices' element={<PricesPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
