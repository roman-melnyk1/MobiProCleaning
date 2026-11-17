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
  const [data, setData] = useState({ cleaning: [], additional: [], drycleaning: [] });
  const [isLoading, setIsLoading] = useState(true);

  // Стейт форми
  const [housing, setHousing] = useState(null);
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [cleaningType, setCleaningType] = useState(null);
  const [extrasAdditional, setExtrasAdditional] = useState([]); // обрані з дропдауну «Додаткові послуги»
  const [extrasDry, setExtrasDry] = useState([]); // обрані з дропдауну «Хімчистка»
  const extras = [...extrasAdditional, ...extrasDry];
  const [extraQuantities, setExtraQuantities] = useState({}); // м² або шт для кожної додаткової послуги
  const [variantQty, setVariantQty] = useState({}); // { [послуга]: { [_key варіанту]: кількість } }
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const query = `*[_type == "service"] | order(sortOrder asc, _createdAt asc){
      "id": serviceId.current,
      title,
      basePrice,
      basePriceHouse,
      isMainService,
      isPerMeter,
      isPerPiece,
      variants[]{_key, label, price},
      category
    }`;
    client.fetch(query).then((res) => {
      const toExtra = (s) => ({
        value: s.id,
        label: s.title, // назва в дропдауні
        receiptLabel: s.category === "drycleaning" ? `Хімчистка: ${s.title.toLowerCase()}` : s.title, // назва в чеку
        price: s.basePrice,
        isPerMeter: s.isPerMeter,
        isPerPiece: s.isPerPiece,
        variants: s.variants || [],
      });
      const extrasAll = res.filter((s) => !s.isMainService);

      setData({
        cleaning: res
          .filter((s) => s.isMainService)
          .map((s) => ({
            value: s.id,
            label: s.title,
            price: s.basePrice,
            priceHouse: s.basePriceHouse ?? s.basePrice,
          })),
        additional: extrasAll.filter((s) => s.category !== "drycleaning").map(toExtra),
        drycleaning: extrasAll.filter((s) => s.category === "drycleaning").map(toExtra),
      });
      setIsLoading(false);
    });
  }, []);

  // Розкладаємо кожну обрану додаткову послугу на рядки чеку: { label, details, totalPrice }
  const getExtraLines = (ex) => {
    if (ex.variants.length > 0) {
      const lines = ex.variants
        .map((v) => ({ v, qty: variantQty[ex.value]?.[v._key] || 0 }))
        .filter(({ qty }) => qty > 0)
        .map(({ v, qty }) => ({
          label: `${ex.receiptLabel} ${v.label}`,
          details: qty > 1 ? ` (${qty} шт × ${v.price} ₴)` : "",
          totalPrice: v.price * qty,
        }));
      const customArea = ex.isPerMeter ? extraQuantities[ex.value] || 0 : 0;
      if (customArea > 0) {
        lines.push({
          label: `${ex.receiptLabel} (інший розмір)`,
          details: ` (${customArea} м² × ${ex.price} ₴)`,
          totalPrice: Math.round(customArea * ex.price),
        });
      }
      return lines;
    }

    if (ex.isPerMeter || ex.isPerPiece) {
      const qty = extraQuantities[ex.value] || 1;
      const unit = ex.isPerMeter ? "м²" : "шт";
      let details = "";
      if (qty > 1) details = ` (${qty} ${unit} × ${ex.price} ₴)`;
      else if (ex.isPerMeter) details = ` (${ex.price} ₴/м²)`;
      return [{ label: ex.receiptLabel, details, totalPrice: ex.price * qty }];
    }

    return [{ label: ex.receiptLabel, details: "", totalPrice: ex.price }];
  };

  const extraLines = extras.flatMap(getExtraLines);

  const setVariant = (serviceId, variantKey, qty) =>
    setVariantQty((prev) => ({ ...prev, [serviceId]: { ...prev[serviceId], [variantKey]: qty } }));

  // Квартира — своя ставка за м², будинок та офіс — інша
  const ratePerMeter = cleaningType
    ? (housing?.value === "house" || housing?.value === "office" ? cleaningType.priceHouse : cleaningType.price) || 0
    : 0;

  const calculateTotal = () => {
    if (!area || !cleaningType) return 0;

    let total = parseInt(area) * ratePerMeter;
    if (rooms && rooms.value !== "1") total += (parseInt(rooms.value) - 1) * 300;
    if (bathrooms && bathrooms.value !== "1") total += (parseInt(bathrooms.value) - 1) * 400;

    extraLines.forEach((line) => {
      total += line.totalPrice;
    });

    return total;
  };

  const totalPrice = calculateTotal();

  const calcData = {
    propertyType: housing?.label || "Об'єкт",
    propertySize: area || 0,
    pricePerMeter: ratePerMeter,
    areaPrice: parseInt(area) * ratePerMeter,
    serviceName: cleaningType?.label || "Прибирання",
    roomsCount: rooms && rooms.value !== "1" ? parseInt(rooms.value) - 1 : 0,
    bathroomsCount: bathrooms && bathrooms.value !== "1" ? parseInt(bathrooms.value) - 1 : 0,
    extraRoomsPrice: rooms && rooms.value !== "1" ? (parseInt(rooms.value) - 1) * 300 : 0,
    extraBathroomsPrice: bathrooms && bathrooms.value !== "1" ? (parseInt(bathrooms.value) - 1) * 400 : 0,
    // Передаємо вже пораховані ціни та кількість для кожного додатку
    selectedExtras: extraLines,
    totalPrice: totalPrice,
  };

  // Поля під обраною послугою: варіанти (розміри вікон), площа (м²) або кількість (шт)
  const renderExtraInputs = (ex) => {
    if (ex.variants.length > 0) {
      return (
        <div key={ex.value} className={css.variantBox}>
          <span className={css.extraLabel}>«{ex.label}»: оберіть розмір і кількість</span>
          {ex.variants.map((v) => (
            <label key={v._key} className={css.variantRow}>
              <span className={css.variantName}>{v.label}</span>
              <span className={css.variantPrice}>{v.price} ₴</span>
              <input
                type='number'
                min='0'
                inputMode='numeric'
                placeholder='0'
                className={css.qtyInput}
                value={variantQty[ex.value]?.[v._key] || ""}
                onChange={(e) =>
                  setVariant(ex.value, v._key, Math.max(0, Number.parseInt(e.target.value) || 0))
                }
              />
            </label>
          ))}
          {ex.isPerMeter && (
            <label className={css.variantRow}>
              <span className={css.variantName}>Інший розмір, м²</span>
              <span className={css.variantPrice}>{ex.price} ₴/м²</span>
              <input
                type='number'
                min='0'
                step='0.1'
                inputMode='decimal'
                placeholder='0'
                className={css.qtyInput}
                value={extraQuantities[ex.value] || ""}
                onChange={(e) =>
                  setExtraQuantities({
                    ...extraQuantities,
                    [ex.value]: Math.max(0, Number.parseFloat(e.target.value) || 0),
                  })
                }
              />
            </label>
          )}
        </div>
      );
    }

    if (!ex.isPerMeter && !ex.isPerPiece) return null;

    return (
      <div key={ex.value} className={css.inputWrapper}>
        <label className={css.extraLabel}>
          {ex.isPerMeter ? `Введіть площу «${ex.label}» (м²):` : `Кількість «${ex.label}» (шт):`}
        </label>
        <input
          type='number'
          min='1'
          inputMode='numeric'
          className={css.input}
          value={extraQuantities[ex.value] || 1}
          onChange={(e) =>
            setExtraQuantities({
              ...extraQuantities,
              [ex.value]: Math.max(1, Number.parseInt(e.target.value) || 1),
            })
          }
        />
      </div>
    );
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
                  { value: "office", label: "Комерція / Офіс" },
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
                onChange={setExtrasAdditional}
              />
              {extrasAdditional.map(renderExtraInputs)}

              {data.drycleaning.length > 0 && (
                <CustomSelect
                  options={data.drycleaning}
                  placeholder='Хімчистка меблів'
                  isMulti={true}
                  onChange={setExtrasDry}
                />
              )}
              {extrasDry.map(renderExtraInputs)}

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
