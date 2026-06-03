import css from "./Services.module.css";
import { Link } from "react-router-dom";

import { ArrowUpRight } from "lucide-react";
import desktopHero from "../../assets/photo/test.webp";

const servicesData = [
  {
    id: 1,
    title: "Генеральне прибирання",
    price: "Від 2350грн",
    image: "/general-clean.webp",
    link: "#",
  },
  {
    id: 2,
    title: "Підтримуюче прибирання",
    price: "Від 1500грн",
    image: "/regular-clean.webp",
    link: "#",
  },
  {
    id: 3,
    title: "Прибирання після ремонту",
    price: "Від 4500грн",
    image: "/after-repair-clean.webp",
    link: "#",
  },
  {
    id: 4,
    title: "Хімчистка меблів та ковроліну",
    price: "Від 200грн",
    image: "/dry-cleaning.webp",
    link: "#",
  },
  {
    id: 5,
    title: "Прибирання офісів та комерції",
    price: "Від 40грн/м²",
    image: "/office-clean.webp",
    link: "#",
  },
  {
    id: 6,
    title: "Миття вікон та вітрин",
    price: "Від 120грн/шт",
    image: "/windows-clean.webp",
    link: "#",
  },
  {
    id: 7,
    title: "Миття фасадів та бруківки",
    price: "Від 60грн/м²",
    image: "/facade-clean.webp",
    link: "#",
  },
  {
    id: 8,
    title: "Спеціалізовані послуги",
    price: "Від 500грн",
    image: "/special-clean.webp",
    link: "#",
  },
];

export default function Services() {
  return (
    <section className={css.services} id='services'>
      <div className='container'>
        <h2 className={css.sectionTitle}>Що ми пропонуємо</h2>

        <div className={css.cardsGrid}>
          {servicesData.map((service) => (
            <div key={service.id} className={css.card}>
              <div
                className={css.imageWrapper}
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.8)), url(${desktopHero})`,
                }}
              >
                <h3 className={css.cardTitle}>{service.title}</h3>
              </div>

              <div className={css.cardBody}>
                <p className={css.price}>{service.price}</p>
                <Link to='/prices' className={css.detailsBtn}>
                  Детальніше
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={css.allServicesWrapper}>
          <Link to='/prices' className={css.allServicesBtn}>
            Подивитися всі додаткові послуги
            <ArrowUpRight className={css.arrowIcon} size={24} />
          </Link>
        </div>
      </div>
    </section>
  );
}
