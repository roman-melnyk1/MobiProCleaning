import css from "./Footer.module.css";
import photo from "../../assets/photo/MobiProCleaning.png";

import facebookIcon from "../../assets/svg/facebook.svg";
import viberIcon from "../../assets/svg/viber.svg";
import telegramIcon from "../../assets/svg/telegram.svg";
import instagramIcon from "../../assets/svg/instagram.svg";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className='container'>
        {/* Верхня частина футера (4 колонки на ПК / 1 колонка на мобілці) */}
        <div className={css.topSection}>
          {/* 1. Логотип */}
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

          {/* 2. Меню */}
          <div className={css.menuCol}>
            <h4 className={css.title}>Меню</h4>
            <ul className={css.list}>
              <li>
                <a href='#'>Головна</a>
              </li>
              <li>
                <a href='#'>Про нас</a>
              </li>
              <li>
                <a href='#'>Послуги</a>
              </li>
              <li>
                <a href='#'>Ціни</a>
              </li>
              <li>
                <a href='#'>Розрахунок</a>
              </li>
            </ul>
          </div>

          {/* 3. Контакти */}
          <div className={css.contactCol}>
            <h4 className={css.title}>Контакти</h4>
            <ul className={css.list}>
              <li>
                <a href='tel:+380670000000'>+380670000000</a>
              </li>
              <li>
                <a href='mailto:chikinclean@gmail.com'>chikinclean@gmail.com</a>
              </li>
              <li className={css.address}>м. Львів, вул. Солонка 52А</li>
            </ul>
          </div>

          {/* 4. Соцмережі */}
          <div className={css.socialsCol}>
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
          </div>
        </div>

        {/* Нижня лінія з копірайтом */}
        <div className={css.bottomSection}>
          <p>© 2026 MobiCleanPro</p>
          <p className={css.devCredit}>Design & Dev by Roman Melnyk</p>
        </div>
      </div>
    </footer>
  );
}
