import { useState, useEffect } from "react";
import css from "./Services.module.css";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Імпортуємо налаштований клієнт Sanity та утиліту для конвертації зображень
// Перевір, чи шлях "../../../client" або "../../client" відповідає твоїй структурі папок
import { client, urlFor } from "../../sanity";

export default function Services() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Додаємо фільтр && isMainService == true
    const query =
      '*[_type == "service" && isMainService == true]{_id, title, isMainService, priceFlat, singlePrice, image}';

    client
      .fetch(query)
      .then((data) => {
        setServices(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Помилка завантаження даних:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className={css.services} id='services'>
      <div className='container'>
        <h2 className={css.sectionTitle}>Що ми пропонуємо</h2>

        {isLoading ? (
          <div className={css.loading}>Завантаження послуг...</div>
        ) : (
          <div className={css.cardsGrid}>
            {services.map((service) => (
              <div key={service._id} className={css.card}>
                <div
                  className={css.imageWrapper}
                  style={{
                    // Якщо замовник завантажив фото в Sanity — рендеримо його через urlFor(),
                    // якщо ні — залишаємо просто напівпрозорий градієнт
                    backgroundImage: service.image
                      ? `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.8)), url(${urlFor(service.image).url()})`
                      : "linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.8))",
                  }}
                >
                  <h3 className={css.cardTitle}>{service.title}</h3>
                </div>

                <div className={css.cardBody}>
                  {/* Умова: якщо це головна послуга — пишемо "Від ...", якщо додаткова — виводимо як є */}
                  <p className={css.price}>{service.isMainService ? `${service.priceFlat}` : service.singlePrice}</p>
                  <Link to='/prices' className={css.detailsBtn}>
                    Детальніше
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

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
