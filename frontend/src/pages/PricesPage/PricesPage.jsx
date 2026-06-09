import { useState, useEffect } from "react";
import css from "./PricesPage.module.css";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import { client } from "../../sanity"; // Твій шлях до клієнта

import flatImg from "../../assets/photo/apartment.webp";
import houseImg from "../../assets/photo/house.webp";
import officeImg from "../../assets/photo/office.webp";

const PROPERTY_TYPES = [
  { id: "flat", label: "Квартира", bgImage: flatImg, bgSize: "25%" },
  { id: "house", label: "Будинок", bgImage: houseImg, bgSize: "25%" },
  { id: "office", label: "Бізнес", bgImage: officeImg, bgSize: "25%" },
];

const COMPARISON_FEATURES = [
  { name: "Вологе прибирання підлоги та плінтусів", reg: true, gen: true, rep: true },
  { name: "Знепилення відкритих поверхонь (до 1.8м)", reg: true, gen: true, rep: true },
  { name: "Миття дзеркал та скляних перегородок", reg: true, gen: true, rep: true },
  { name: "Знепилення стін та стелі на всю висоту", reg: false, gen: true, rep: true },
  { name: "Миття кухонних фасадів (видалення жиру)", reg: false, gen: true, rep: false },
  { name: "Видалення залишків затирки, фарби та клею", reg: false, gen: true, rep: true }, // *Виправив тут помилку (було false: true)
  { name: "Очищення внутрішніх блоків кондиціонерів", reg: false, gen: true, rep: true },
  { name: "Глибоке миття сантехніки (видалення нальоту)", reg: true, gen: true, rep: true },
];

export default function PricesPage() {
  const [activeProperty, setActiveProperty] = useState("flat");
  const [services, setServices] = useState({ main: [], additional: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Використовуємо коректний синтаксис перейменування: "нове_ім'я": старе_ім'я
    const query = `{
      "main": *[_type == "service" && isMainService == true]{
        "id": serviceId.current,
        title,
        "desc": description,
        "prices": { 
          "flat": priceFlat, 
          "house": priceHouse, 
          "office": priceOffice 
        }
      },
      "additional": *[_type == "service" && isMainService == false]{
        "name": title,
        "price": singlePrice
      }
    }`;

    client.fetch(query).then((data) => {
      setServices(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <SEO title='Ціни на послуги прибирання | MobiProCleaning' />
      <main className={css.main}>
        <section className={css.pricesHeader}>
          <div className='container'>
            <h1 className={css.pageTitle}>Ціни та Послуги</h1>

            <div className={css.tabsContainer}>
              {PROPERTY_TYPES.map((item) => (
                <button
                  key={item.id}
                  className={`${css.tabBtn} ${activeProperty === item.id ? css.activeTab : ""}`}
                  onClick={() => setActiveProperty(item.id)}
                  style={{ backgroundImage: `url(${item.bgImage})`, backgroundSize: item.bgSize }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {isLoading ? (
              <p>Завантаження...</p>
            ) : (
              <div className={css.priceGrid}>
                {services.main.map((service, index) => (
                  <div key={service.id} className={`${css.priceCard} ${index === 1 ? css.featured : ""}`}>
                    {index === 1 && <div className={css.badge}>Популярно</div>}
                    <h3>{service.title}</h3>
                    <p className={css.price}>{service.prices[activeProperty]}</p>
                    <p className={css.cardDesc}>{service.desc}</p>
                    <Link to='/#' className={css.mainActionBtn}>
                      Замовити прибирання
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <section className={css.additionalSection}>
          <div className='container'>
            <h2 className={css.sectionTitle}>Додаткові послуги</h2>
            <div className={css.additionalGrid}>
              {services.additional.map((service, i) => (
                <div key={i} className={css.additionalCard}>
                  <div className={css.addInfo}>
                    <span>{service.name}</span>
                    <span className={css.addPrice}>{service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={css.comparisonSection}>
          <div className='container'>
            <h2 className={css.sectionTitle}>Що входить у вартість?</h2>
            <div className={css.tableWrapper}>
              <table className={css.table}>
                <thead>
                  <tr>
                    <th>Послуга</th>
                    <th>Підтримуюче</th>
                    <th>Генеральне</th>
                    <th>Після ремонту</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((feature, idx) => (
                    <tr key={idx}>
                      <td className={css.featureName}>{feature.name}</td>
                      <td>{feature.reg ? <Check className={css.iconCheck} /> : <X className={css.iconX} />}</td>
                      <td>{feature.gen ? <Check className={css.iconCheck} /> : <X className={css.iconX} />}</td>
                      <td>{feature.rep ? <Check className={css.iconCheck} /> : <X className={css.iconX} />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>{" "}
      </main>
    </>
  );
}
