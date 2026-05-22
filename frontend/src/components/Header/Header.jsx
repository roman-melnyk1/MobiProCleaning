import { useState, useEffect } from "react";
import css from "./Header.module.css";
import photo from "../../assets/photo/MobiProCleaning.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${css.header} ${isScrolled ? css.scrolled : ""}`}>
      <div className='container'>
        <div className={css.innerHeader}>
          <div className={css.logoContainer}>
            <div className={css.logoLeft}>
              <a href='#'>
                <img src={photo} alt='MobiProCleaning' width='80' />
              </a>
            </div>
            <div className={css.separator}></div>
            <div className={css.logoRight}>
              <span className={css.logoText1}>Мобільно-Професійний клінінг</span>
              <span className={css.logoText2}>ветеранський бізнес</span>
            </div>
          </div>

          <nav className={`${css.nav} ${isOpen ? css.navActive : ""}`}>
            <div className={css.navLogoMobile}>
              <img src={photo} alt='MobiProCleaning' width='90' />
            </div>

            <ul className={css.navList}>
              <li>
                <a href='#about' onClick={() => setIsOpen(false)}>
                  Про нас
                </a>
              </li>
              <li>
                <a href='#prices' onClick={() => setIsOpen(false)}>
                  Ціни
                </a>
              </li>
              <li>
                <a href='#services' onClick={() => setIsOpen(false)}>
                  Послуги
                </a>
              </li>
              <li>
                <a href='#calc' onClick={() => setIsOpen(false)}>
                  Розрахунок
                </a>
              </li>
            </ul>

            <button type='button' className={css.contact}>
              Зв'яжіться з нами
            </button>
          </nav>

          <div className={css.contactWrapper}>
            <button type='button' className={css.contactDesktop}>
              Зв'яжіться з нами
            </button>
          </div>

          <button
            className={`${css.burger} ${isOpen ? css.burgerActive : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label='Навігація'
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
