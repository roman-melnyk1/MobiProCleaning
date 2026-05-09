import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";

function App() {
  return (
    <>
      <Header></Header>
      <main>
        <Hero></Hero>
        <About></About>
      </main>
    </>
  );
}

export default App;
