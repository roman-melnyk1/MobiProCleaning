import { useState, useEffect } from "react";
import CustomSelect from "./CustomSelect";
import { CheckCircle2 } from "lucide-react";
import ModalCalcResult from "../ModalCalcResult/ModalCalcResult";
import { client } from "../../sanity";
import css from "./Calc.module.css";

const INCLUDED_SERVICES = {
  regular: [
    "Сухе та вологе прибирання підлоги",
    "Знепилення всіх доступних поверхонь",
    "Миття дзеркал та скляних поверхонь",
    "Прибирання у ванній кімнаті та туалеті",
    "Акуратне складання речей",
    "Винесення сміття",
  ],
  general: [
    "Всі пункти підтримуючого прибирання",
    "Миття фасадів кухонних меблів",
    "Миття стінової плитки (кухня, ванна)",
    "Видалення складних плям та жиру",
    "Знепилення важкодоступних місць (карнизи, антресолі)",
    "Миття плінтусів, дверей та фурнітури",
  ],
  repair: [
    "Знепилення стін та стелі",
    "Видалення залишків фарби, скотчу та клею",
    "Глибоке миття підлоги (відмивання будівельного пилу)",
    "Миття радіаторів та труб",
    "Повне очищення сантехніки від нальоту",
  ],
};

export default function Calculator() {
  const [data, setData] = useState({ cleaning: [], additional: [] });
  const [isLoading, setIsLoading] = useState(true);

  // Стейт форми
  const [housing, setHousing] = useState(null);
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [cleaningType, setCleaningType] = useState(null);
  const [extras, setExtras] = useState([]); // Тут тепер повні об'єкти з isPerMeter
  const [extraQuantities, setExtraQuantities] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const query = `*[_type == "service"]{
      "id": serviceId.current,
      title,
      basePrice,
      isMainService,
      isPerMeter
    }`;
    client.fetch(query).then((res) => {
      setData({
        cleaning: res.filter((s) => s.isMainService).map((s) => ({ value: s.id, label: s.title, price: s.basePrice })),
        // Зберігаємо isPerMeter для кожної додаткової послуги
        additional: res
          .filter((s) => !s.isMainService)
          .map((s) => ({
            value: s.id,
            label: s.title,
            price: s.basePrice,
            isPerMeter: s.isPerMeter,
          })),
      });
      setIsLoading(false);
    });
  }, []);

  const calculateTotal = () => {
    if (!area || !cleaningType) return 0;

    let total = parseInt(area) * (cleaningType.price || 0);
    if (rooms && rooms.value !== "1") total += (parseInt(rooms.value) - 1) * 300;
    if (bathrooms && bathrooms.value !== "1") total += (parseInt(bathrooms.value) - 1) * 400;

    extras.forEach((ex) => {
      // Якщо послуга має isPerMeter = true, беремо кількість, інакше 1
      const qty = ex.isPerMeter ? extraQuantities[ex.value] || 1 : 1;
      total += ex.price * qty;
    });

    return total;
  };

  const totalPrice = calculateTotal();

  const calcData = {
    propertyType: housing?.label || "Об'єкт",
    propertySize: area || 0,
    pricePerMeter: cleaningType?.price || 0,
    areaPrice: parseInt(area) * (cleaningType?.price || 0),
    serviceName: cleaningType?.label || "Прибирання",
    roomsCount: rooms && rooms.value !== "1" ? parseInt(rooms.value) - 1 : 0,
    bathroomsCount: bathrooms && bathrooms.value !== "1" ? parseInt(bathrooms.value) - 1 : 0,
    extraRoomsPrice: rooms && rooms.value !== "1" ? (parseInt(rooms.value) - 1) * 300 : 0,
    extraBathroomsPrice: bathrooms && bathrooms.value !== "1" ? (parseInt(bathrooms.value) - 1) * 400 : 0,
    // Передаємо вже пораховані ціни та кількість для кожного додатку
    selectedExtras: extras.map((ex) => ({
      label: ex.label,
      qty: ex.isPerMeter ? extraQuantities[ex.value] || 1 : 1,
      unitPrice: ex.price,
      isPerMeter: ex.isPerMeter, // <--- Додаємо цей прапорець
      totalPrice: ex.price * (ex.isPerMeter ? extraQuantities[ex.value] || 1 : 1),
    })),
    totalPrice: totalPrice,
  };

  if (isLoading) return <div className='container'>Завантаження...</div>;

  return (
    <section className={css.calculatorSection} id='calc'>
      <div className='container'>
        <h2 className={css.title}>Фіксований розрахунок</h2>

        <div className={css.splitLayout}>
          <div className={css.formCard}>
            <form
              className={css.form}
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
              <CustomSelect options={data.cleaning} placeholder='Тип прибирання' onChange={setCleaningType} />
              <CustomSelect
                options={[
                  { value: "flat", label: "Квартира" },
                  { value: "house", label: "Приватний будинок" },
                  { value: "office", label: "Омерція / Офіс" },
                ]}
                placeholder='Тип житла'
                onChange={setHousing}
              />

              <div className={css.inputWrapper}>
                <input
                  type='number'
                  min='1'
                  className={css.input}
                  placeholder='Площа (м²)'
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>

              <div className={css.rowGrid}>
                <CustomSelect
                  options={[
                    { value: "1", label: "1 кімната" },
                    { value: "2", label: "2 кімнати" },
                    { value: "3", label: "3 кімнати" },
                    { value: "4", label: "4+ кімнат" },
                  ]}
                  placeholder='Кімнати'
                  onChange={setRooms}
                />
                <CustomSelect
                  options={[
                    { value: "1", label: "1 санвузол" },
                    { value: "2", label: "2 санвузли" },
                    { value: "3", label: "3+ санвузлів" },
                  ]}
                  placeholder='Санвузли'
                  onChange={setBathrooms}
                />
              </div>

              <CustomSelect
                options={data.additional}
                placeholder='Додаткові послуги'
                isMulti={true}
                onChange={setExtras}
              />

              {/* Рендеримо інпут ТІЛЬКИ якщо isPerMeter === true */}
              {extras.map(
                (ex) =>
                  ex.isPerMeter && (
                    <div key={ex.value} className={css.inputWrapper}>
                      <label className={css.extraLabel}>Введіть площу «{ex.label}» (м²):</label>
                      <input
                        type='number'
                        min='1'
                        className={css.input}
                        value={extraQuantities[ex.value] || 1}
                        onChange={(e) =>
                          setExtraQuantities({ ...extraQuantities, [ex.value]: parseInt(e.target.value) || 1 })
                        }
                      />
                    </div>
                  ),
              )}

              <div className={css.priceBlock}>
                <span className={css.priceLabel}>Орієнтовна вартість:</span>
                <span className={css.priceValue}>{totalPrice > 0 ? `${totalPrice} ₴` : "_ _ _"}</span>
              </div>
              <button type='submit' className={css.submitBtn} disabled={!area || !cleaningType}>
                Замовити прибирання
              </button>
            </form>
          </div>

          <div className={css.infoCard}>
            {cleaningType && INCLUDED_SERVICES[cleaningType.value] ? (
              <>
                <h3 className={css.infoTitle}>
                  Що входить у тариф <span>«{cleaningType.label}»</span>:
                </h3>
                <ul className={css.servicesList}>
                  {INCLUDED_SERVICES[cleaningType.value].map((item, i) => (
                    <li key={i} className={css.servicesItem}>
                      <CheckCircle2 size={20} className={css.checkIcon} /> <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className={css.emptyState}>
                <p>Виберіть тип прибирання, щоб побачити перелік послуг.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalCalcResult isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} calcData={calcData} />
    </section>
  );
}
