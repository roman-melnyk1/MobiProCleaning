import { useState } from "react";
import css from "./PricesPage.module.css";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import flatImg from "../../assets/photo/apartment.webp";
import houseImg from "../../assets/photo/house.webp";
import officeImg from "../../assets/photo/office.webp";

// Онови масив PROPERTY_TYPES, додавши туди images
const PROPERTY_TYPES = [
  { id: "flat", label: "Квартира", bgImage: flatImg, bgSize: "25%" },
  { id: "house", label: "Будинок", bgImage: houseImg, bgSize: "25%" },
  { id: "office", label: "Бізнес", bgImage: officeImg, bgSize: "25%" },
];

const SERVICES = [
  {
    id: "regular",
    title: "Підтримуюче прибирання",
    desc: "Базове прибирання для підтримки чистоти: вологе прибирання підлоги, знепилення поверхонь, миття дзеркал та санвузлів.",
    prices: { flat: "1500грн", house: "2200грн", office: "40грн/м²" },
  },
  {
    id: "general",
    title: "Генеральне прибирання",
    desc: "Повне очищення: миття кухонних фасадів, плитки, важкодоступних місць, плінтусів, дверей та видалення складних плям.",
    prices: { flat: "2350грн", house: "3800грн", office: "65грн/м²" },
  },
  {
    id: "repair",
    title: "Після ремонту",
    desc: "Професійне видалення будпилу: миття вікон, рам, радіаторів, видалення залишків фарби, клею та цементного нальоту.",
    prices: { flat: "4500грн", house: "6500грн", office: "90грн/м²" },
  },
];

const COMPARISON_FEATURES = [
  { name: "Вологе прибирання підлоги та плінтусів", reg: true, gen: true, rep: true },
  { name: "Знепилення відкритих поверхонь (до 1.8м)", reg: true, gen: true, rep: true },
  { name: "Миття дзеркал та скляних перегородок", reg: true, gen: true, rep: true },
  { name: "Знепилення стін та стелі на всю висоту", reg: false, gen: true, rep: true },
  { name: "Миття кухонних фасадів (видалення жиру)", reg: false, gen: true, rep: false },
  { name: "Видалення залишків затирки, фарби та клею", reg: false, false: true, rep: true },
  { name: "Очищення внутрішніх блоків кондиціонерів", reg: false, gen: true, rep: true },
  { name: "Глибоке миття сантехніки (видалення нальоту)", reg: true, gen: true, rep: true },
];

const ADDITIONAL_SERVICES = [
  { name: "Миття вікон (з двох сторін)", price: "від 300грн / м²", unit: "м²" },
  { name: "Хімчистка дивана (2-місний)", price: "від 600грн", unit: "шт" },
  { name: "Хімчистка матраца (двоспальний)", price: "від 700грн", unit: "шт" },
  { name: "Прибирання паркомісця", price: "від 350грн", unit: "місце" },
  { name: "Миття духовки / мікрохвильовки", price: "від 250грн", unit: "шт" },
  { name: "Миття холодильника (всередині)", price: "від 300грн", unit: "шт" },
  { name: "Миття витяжки від жиру", price: "від 200грн", unit: "шт" },
  { name: "Чистка плінтусів (глибока)", price: "від 15грн / м.п.", unit: "м.п." },
];

export default function PricesPage() {
  const [activeProperty, setActiveProperty] = useState("flat");

  return (
    <>
      <SEO
        title='Ціни на послуги прибирання | MobiProCleaning'
        description='Актуальний прайс-лист на генеральне прибирання, миття вікон та хімчистку меблів. Прозорі ціни без прихованих платежів.'
      />
      <main className={css.main}>
        <section className={css.pricesHeader}>
          <div className='container'>
            <h1 className={css.pageTitle}>Ціни та Послуги</h1>
            <p className={css.pageSubtitle}>Оберіть тип приміщення, щоб побачити актуальну вартість.</p>

            <div className={css.tabsContainer}>
              {PROPERTY_TYPES.map((item) => (
                <button
                  key={item.id}
                  type='button'
                  className={`${css.tabBtn} ${activeProperty === item.id ? css.activeTab : ""}`}
                  onClick={() => setActiveProperty(item.id)}
                  style={{
                    backgroundImage: `url(${item.bgImage})`,
                    backgroundSize: item.bgSize,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className={css.priceGrid}>
              {SERVICES.map((service, index) => (
                <div key={service.id} className={`${css.priceCard} ${index === 1 ? css.featured : ""}`}>
                  {index === 1 && <div className={css.badge}>Популярно</div>}
                  <h3>{service.title}</h3>
                  <p className={css.price}>{service.prices[activeProperty]}</p>
                  <p className={css.cardDesc}>{service.desc}</p>

                  {/* Тут переадресація на головну до форми */}
                  <Link to='/#' className={css.mainActionBtn}>
                    Замовити прибирання
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={css.additionalSection} id='additionalSection'>
          <div className='container'>
            <h2 className={css.sectionTitle}>Додаткові послуги</h2>
            <div className={css.additionalGrid}>
              {ADDITIONAL_SERVICES.map((service, i) => (
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

        {/* Таблиця порівняння */}
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
        </section>
      </main>
    </>
  );
}
