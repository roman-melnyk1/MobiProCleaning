import { Link } from "react-router-dom"; // Імпортуємо Link
import css from "./Footer.module.css";

// import facebookIcon from "../../assets/svg/facebook.svg";
// import viberIcon from "../../assets/svg/viber.svg";
// import telegramIcon from "../../assets/svg/telegram.svg";
// import instagramIcon from "../../assets/svg/instagram.svg";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className='container'>
        <div className={css.topSection}>
          <div className={css.logoContainer}>
            <div className={css.logoLeft}>
              <Link to='/'>
                <img src='/MobiProCleaning.webp' alt='MobiProCleaning' width='100' />
              </Link>
            </div>
            <div className={css.separator}></div>
            <div className={css.logoRight}>
              <span className={css.logoText1}>мобільно-професійний клінінг</span>
              <span className={css.logoText2}>ветеранський бізнес</span>
            </div>
          </div>

          {/* 2. Меню (Тут застосовуємо Link) */}
          <div className={css.menuCol}>
            <h4 className={css.title}>Меню</h4>
            <ul className={css.list}>
              <li>
                <Link to='/'>Головна</Link>
              </li>
              <li>
                <Link to='/about'>Про нас</Link>
              </li>
              <li>
                <Link to='/#services'>Послуги</Link>
              </li>
              <li>
                <Link to='/prices'>Ціни</Link>
              </li>
              <li>
                <Link to='/#calc'>Розрахунок</Link>
              </li>
            </ul>
          </div>

          {/* 3. Контакти (Залишаємо <a> для tel та mailto) */}
          <div className={css.contactCol}>
            <h4 className={css.title}>Контакти</h4>
            <ul className={css.list}>
              <li>
                <a href='tel:+380975565852'>+38 097 556 5852</a>
              </li>
              <li>
                <a href='mailto:mpclviv@gmail.com'>mpclviv@gmail.com</a>
              </li>
              <li className={css.address}>м. Львів, вул. Трускавецька, 2б</li>
            </ul>
          </div>

          {/* 4. Соцмережі (Залишаємо <a> для зовнішніх посилань) */}
          {/* <div className={css.socialsCol}>
            <div className={css.socialsWrapper}>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noreferrer'
                className={css.socialLink}
                aria-label='Facebook'
              >
                <img src={facebookIcon} alt='Facebook' className={css.socialIcon} width='32' height='32' />
              </a>
              <a href='viber://chat?number=%2B380670000000' className={css.socialLink} aria-label='Viber'>
                <img src={viberIcon} alt='Viber' className={css.socialIcon} />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noreferrer'
                className={css.socialLink}
                aria-label='Instagram'
              >
                <img src={instagramIcon} alt='Instagram' className={css.socialIcon} />
              </a>
              <a
                href='https://t.me/your_username'
                target='_blank'
                rel='noreferrer'
                className={css.socialLink}
                aria-label='Telegram'
              >
                <img src={telegramIcon} alt='Telegram' className={css.socialIcon} />
              </a>
            </div>
          </div> */}
        </div>

        <div className={css.bottomSection}>
          <p>© 2026 MobiProCleaning</p>
          <p className={css.devCredit}>Design & Dev by Roman Melnyk</p>
        </div>
      </div>
    </footer>
  );
}
