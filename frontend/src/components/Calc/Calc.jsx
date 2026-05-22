import { useState } from "react";
import CustomSelect from "./CustomSelect";
import { CheckCircle2 } from "lucide-react";
import ModalCalcResult from "../ModalCalcResult/ModalCalcResult";
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
  "after-repair": [
    "Знепилення стін та стелі",
    "Видалення залишків фарби, скотчу та клею",
    "Глибоке миття підлоги (відмивання будівельного пилу)",
    "Миття радіаторів та труб",
    "Повне очищення сантехніки від нальоту",
  ],
};

const PRICE_CONFIG = {
  cleaningTypes: {
    regular: 40,
    general: 60,
    "after-repair": 85,
  },
  room: 300,
  bathroom: 400,
  additional: {
    "windows-season": 200,
    "windows-repair": 400,
    "furniture-inside": 350,
    "dry-cleaning": 600,
    mold: 500,
    odor: 450,
    curtains: 250,
    facade: 800,
  },
};

const housingOptions = [
  { value: "flat", label: "Квартира" },
  { value: "house", label: "Приватний будинок" },
  { value: "office", label: "Комерція / Офіс" },
];

const cleaningOptions = [
  { value: "regular", label: "Підтримуюче прибирання" },
  { value: "general", label: "Генеральне прибирання" },
  { value: "after-repair", label: "Прибирання після ремонту" },
];

const additionalOptions = [
  { value: "windows-season", label: "Миття вікон (Сезонне)" },
  { value: "windows-repair", label: "Миття вікон (Після ремонту)" },
  { value: "furniture-inside", label: "Миття меблів всередині" },
  { value: "dry-cleaning", label: "Хімчистка меблів та ковроліну" },
  { value: "mold", label: "Видалення цвілі (грибка)" },
  { value: "odor", label: "Видалення запаху" },
  { value: "curtains", label: "Прання штор та тюлів" },
  { value: "facade", label: "Миття фасаду та бруківки" },
];

export default function Calculator() {
  const [housing, setHousing] = useState(null);
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [cleaningType, setCleaningType] = useState(null);
  const [extras, setExtras] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotal = () => {
    if (!area || !cleaningType) return 0;

    let total = 0;
    const pricePerMeter = PRICE_CONFIG.cleaningTypes[cleaningType.value] || 0;
    total += parseInt(area) * pricePerMeter;

    if (rooms && rooms.value !== "1") {
      const roomCount = parseInt(rooms.value) || 4;
      total += (roomCount - 1) * PRICE_CONFIG.room;
    }

    if (bathrooms && bathrooms.value !== "1") {
      const bCount = parseInt(bathrooms.value) || 3;
      total += (bCount - 1) * PRICE_CONFIG.bathroom;
    }

    extras.forEach((item) => {
      total += PRICE_CONFIG.additional[item.value] || 0;
    });

    return total;
  };

  const totalPrice = calculateTotal();

  const getAreaPrice = () => {
    if (!area || !cleaningType) return 0;
    return parseInt(area) * (PRICE_CONFIG.cleaningTypes[cleaningType.value] || 0);
  };
  const getExtraRoomsPrice = () => {
    if (!rooms || rooms.value === "1") return 0;
    const roomCount = parseInt(rooms.value) || 4;
    return (roomCount - 1) * PRICE_CONFIG.room;
  };

  const getExtraBathroomsPrice = () => {
    if (!bathrooms || bathrooms.value === "1") return 0;
    const bCount = parseInt(bathrooms.value) || 3;
    return (bCount - 1) * PRICE_CONFIG.bathroom;
  };

  const calcData = {
    propertyType: housing?.label || "Об'єкт",
    propertySize: area || 0,
    pricePerMeter: cleaningType ? PRICE_CONFIG.cleaningTypes[cleaningType.value] || 0 : 0,
    areaPrice: getAreaPrice(),
    serviceName: cleaningType?.label || "Прибирання",
    roomsCount: rooms && rooms.value !== "1" ? parseInt(rooms.value) - 1 : 0,
    bathroomsCount: bathrooms && bathrooms.value !== "1" ? parseInt(bathrooms.value) - 1 : 0,
    extraRoomsPrice: getExtraRoomsPrice(),
    extraBathroomsPrice: getExtraBathroomsPrice(),
    selectedExtras: extras,
    totalPrice: totalPrice,
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!area || !cleaningType) return;
    setIsModalOpen(true);
  };

  const handleOrder = () => {
    setIsModalOpen(false);
    console.log("Order submitted");
  };

  return (
    <section className={css.calculatorSection} id='calc'>
      <div className='container'>
        <h2 className={css.title}>Фіксований розрахунок</h2>

        <div className={css.splitLayout}>
          <div className={css.formCard}>
            <form className={css.form} onSubmit={handleFormSubmit}>
              <CustomSelect options={cleaningOptions} placeholder='Тип прибирання' onChange={setCleaningType} />
              <CustomSelect options={housingOptions} placeholder='Тип житла' onChange={setHousing} />
              <div className={css.inputWrapper}>
                <input
                  type='number'
                  className={css.input}
                  placeholder='Площа (м²)'
                  min='1'
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
                  placeholder='Кількість кімнат'
                  onChange={setRooms}
                />
                <CustomSelect
                  options={[
                    { value: "1", label: "1 санвузол" },
                    { value: "2", label: "2 санвузли" },
                    { value: "3", label: "3+ санвузлів" },
                  ]}
                  placeholder='Кількість санвузлів'
                  onChange={setBathrooms}
                />
              </div>
              <CustomSelect
                options={additionalOptions}
                placeholder='Додаткові послуги'
                isMulti={true}
                onChange={setExtras}
              />
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
            {cleaningType ? (
              <>
                <h3 className={css.infoTitle}>
                  Що входить у тариф <span>«{cleaningType.label}»</span>:
                </h3>
                <ul className={css.servicesList}>
                  {INCLUDED_SERVICES[cleaningType.value].map((item, index) => (
                    <li key={index} className={css.servicesItem}>
                      <CheckCircle2 size={20} className={css.checkIcon} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className={css.emptyState}>
                <p>Виберіть тип прибирання, щоб побачити перелік послуг, які входять у вартість.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalCalcResult
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOrder={handleOrder}
        calcData={calcData}
      />
    </section>
  );
}
