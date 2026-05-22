import css from "./ModalSimple.module.css";
import photo from "../../assets/photo/MobiProCleaning.png";

export default function ModalSimple({ isOpen, onClose, onCalculate, values }) {
  return (
    <div className={`${css.overlay} ${isOpen ? css.overlayActive : ""}`} onClick={onClose}>
      <div className={`${css.modal} ${isOpen ? css.modalActive : ""}`} onClick={(e) => e.stopPropagation()}>
        <button type='button' className={css.closeBtn} onClick={onClose} aria-label='Закрити'>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <path d='M18 6L6 18M6 6l12 12' />
          </svg>
        </button>

        <div className={css.logoContainer}>
          <div className={css.logoImgWrapper}>
            <img src={photo} alt='MobiPro Cleaning' className={css.logoImg} width='100' />
          </div>
          <div className={css.logoTextGroup}>
            <span className={css.logoMain}>Мобільно-Професійний клінінг</span>
            <span className={css.logoSub}>ветеранський бізнес</span>
          </div>
        </div>

        <div className={css.content}>
          <p className={css.thankYou}>
            Дякуємо {values?.firstName || ""}, ми отримали ваші контакти і скоро вам зателефонуємо!
          </p>

          <h3 className={css.offerTitle}>Бажаєте розрахувати попередню ціну за 30 секунд?</h3>

          <p className={css.offerText}>
            Оберіть необхідні послуги, а ми автоматично порахуємо орієнтовну вартість вашого прибирання
          </p>
        </div>

        <div className={css.actions}>
          <button type='button' className={css.waitBtn} onClick={onClose}>
            Дочекатися дзвінка
          </button>
          <button type='button' className={css.calcBtn} onClick={onCalculate}>
            Розрахувати вартість
          </button>
        </div>
      </div>
    </div>
  );
}
