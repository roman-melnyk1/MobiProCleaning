import { useState } from "react";
import css from "./PricesPage.module.css";
import { Check, X, Building2, Home, Building } from "lucide-react";

const PROPERTY_TYPES = [
  { id: "flat", label: "Квартира", icon: <Building2 size={24} /> },
  { id: "house", label: "Будинок", icon: <Home size={24} /> },
  { id: "office", label: "Офіс / ТЦ", icon: <Building size={24} /> },
];

const PRICE_DATA = {
  flat: { regular: "від 1500₴", general: "від 2350₴", repair: "від 4500₴" },
  house: { regular: "від 2200₴", general: "від 3800₴", repair: "від 6500₴" },
  office: { regular: "від 40₴/м²", general: "від 65/м²", repair: "від 90₴/м²" },
};

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

export default function PricesPage() {
  const [activeProperty, setActiveProperty] = useState("flat");

  return (
    <>
      <main className={css.main}>
        <section className={css.pricesHeader}>
          <div className='container'>
            <h1 className={css.pageTitle}>Ціни та Послуги</h1>
            <p className={css.pageSubtitle}>
              Прозора вартість без прихованих платежів. Оберіть тип приміщення для розрахунку.
            </p>

            {/* Перемикачі типу приміщення */}
            <div className={css.propertyTabs}>
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type.id}
                  className={`${css.tabBtn} ${activeProperty === type.id ? css.activeTab : ""}`}
                  onClick={() => setActiveProperty(type.id)}
                >
                  {type.icon}
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            {/* Картки основних пакетів */}
            <div className={css.priceGrid}>
              <div className={css.priceCard}>
                <h3>Підтримуюче</h3>
                <p className={css.price}>{PRICE_DATA[activeProperty].regular}</p>
                <p className={css.cardDesc}>Для тих, хто підтримує регулярну чистоту в оселі.</p>
                <button className={css.cardBtn}>Замовити</button>
              </div>

              <div className={`${css.priceCard} ${css.featured}`}>
                <div className={css.badge}>Популярно</div>
                <h3>Генеральне</h3>
                <p className={css.price}>{PRICE_DATA[activeProperty].general}</p>
                <p className={css.cardDesc}>Повне очищення кожного сантиметра вашого простору.</p>
                <button className={css.cardBtn}>Замовити</button>
              </div>

              <div className={css.priceCard}>
                <h3>Після ремонту</h3>
                <p className={css.price}>{PRICE_DATA[activeProperty].repair}</p>
                <p className={css.cardDesc}>Спеціалізоване прибирання для видалення будпилу.</p>
                <button className={css.cardBtn}>Замовити</button>
              </div>
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
