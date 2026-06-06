import css from "./ModalCalcResult.module.css";
import { Download } from "lucide-react";

const EXTRA_PRICES = {
  "windows-season": 200,
  "windows-repair": 400,
  "furniture-inside": 350,
  "dry-cleaning": 600,
  mold: 500,
  odor: 450,
  curtains: 250,
  facade: 800,
};

export default function ModalCalcResult({ isOpen, onClose, calcData }) {
  const {
    propertyType = "Квартира",
    propertySize = 0,
    pricePerMeter = 0,
    areaPrice = 0,
    serviceName = "Генеральне прибирання",
    roomsCount = 0,
    bathroomsCount = 0,
    extraRoomsPrice = 0,
    extraBathroomsPrice = 0,
    selectedExtras = [],
    totalPrice = 0,
  } = calcData || {};

  return (
    <div className={`${css.overlay} ${isOpen ? css.overlayActive : ""}`} onClick={onClose}>
      <div className={`${css.modal} ${isOpen ? css.modalActive : ""}`} onClick={(e) => e.stopPropagation()}>
        <button type='button' className={css.closeBtn} onClick={onClose} aria-label='Закрити'>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <path d='M18 6L6 18M6 6l12 12' />
          </svg>
        </button>

        <div className={css.logoContainer}>
          <img src='/MobiProCleaning.webp' alt='MobiProCleaningLogo' width='100' />
          <div className={css.logoRight}>
            <span>Мобільно-Професійний клінінг</span>
            <span className={css.logoTagline}>ветеранський бізнес</span>
          </div>
        </div>

        <h2 className={css.modalTitle}>Вартість прибирання</h2>

        <div className={css.receipt}>
          <div className={css.receiptRow}>
            <span className={css.label}>{serviceName}</span>
            <span className={css.dots}></span>
            <span className={css.value}>Включено</span>
          </div>

          <div className={css.receiptRow}>
            <span className={css.label}>
              Площа {propertyType} ({propertySize} м² × {pricePerMeter}₴)
            </span>
            <span className={css.dots}></span>
            <span className={css.value}>{areaPrice}₴</span>
          </div>

          {roomsCount > 0 && (
            <div className={css.receiptRow}>
              <span className={css.label}>Додаткові кімнати (+{roomsCount} шт.)</span>
              <span className={css.dots}></span>
              <span className={css.value}>{extraRoomsPrice}₴</span>
            </div>
          )}

          {bathroomsCount > 0 && (
            <div className={css.receiptRow}>
              <span className={css.label}>Додаткові санвузли (+{bathroomsCount} шт.)</span>
              <span className={css.dots}></span>
              <span className={css.value}>{extraBathroomsPrice}₴</span>
            </div>
          )}

          {selectedExtras.map((extra) => (
            <div key={extra.value} className={css.receiptRow}>
              <span className={css.label}>{extra.label}</span>
              <span className={css.dots}></span>
              <span className={css.value}>{EXTRA_PRICES[extra.value] || 0}₴</span>
            </div>
          ))}
        </div>

        <div className={css.footerRow}>
          <div className={css.totalWrapper}>
            <span className={css.totalLabel}>Вартість:</span>
            <span className={css.totalPrice}>від {totalPrice} ₴</span>
          </div>

          <div className={css.buttonGroup}>
            <button
              type='button'
              className={css.orderBtn}
              onClick={(e) => {
                e.preventDefault();

                onClose();

                setTimeout(() => {
                  const element = document.getElementById("hero");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }, 100);
              }}
            >
              Замовити
            </button>

            <button type='button' className={css.downloadBtn} aria-label='Завантажити чек'>
              <Download size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
