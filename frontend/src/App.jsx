import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Calc from "./components/Calc/Calc";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header></Header>
      <main>
        <Hero></Hero>
        <About></About>
        <Services></Services>
        <Calc></Calc>
        <Footer></Footer>
      </main>
    </>
  );
}

export default App;
