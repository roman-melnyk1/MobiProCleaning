import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Services from "../../components/Services/Services";
import Calc from "../../components/Calc/Calc";
import SEO from "../../components/SEO/SEO";

export default function Home() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        if (isFirstRender.current) {
          element.scrollIntoView({ behavior: "auto", block: "start" });
        } else {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else if (!isFirstRender.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    isFirstRender.current = false;
  }, [location]);
  return (
    <>
      <SEO
        title='Мобільний клінінг у вашому місті | MobiProCleaning'
        description='Професійний клінінг квартир, будинків та офісів. Еко-засоби, перевірений персонал, гарантія якості. Замовляйте розрахунок вартості онлайн!'
      />
      <main>
        <Hero></Hero>
        <About></About>
        <Services></Services>
        <Calc></Calc>
      </main>
    </>
  );
}
