import css from "./Info.module.css";
import { ShieldCheck, Target, Sparkles, CheckCircle2, PhoneCall } from "lucide-react";
import aboutImg from "../../assets/photo/test.webp";

const PROCESS_STEPS = [
  {
    id: 1,
    icon: <PhoneCall size={32} />,
    title: "Заявка та оцінка",
    description:
      "Ви залишаєте заявку або телефонуєте. Ми уточнюємо деталі, площу та формуємо фіксовану вартість, яка не зміниться.",
  },
  {
    id: 2,
    icon: <Target size={32} />,
    title: "Приїзд команди",
    description:
      "Наші фахівці приїжджають у чітко домовлений час із усім необхідним професійним обладнанням та еко-хімією.",
  },
  {
    id: 3,
    icon: <Sparkles size={32} />,
    title: "Процес прибирання",
    description:
      "Кожен куточок вашої оселі очищується за строгими чек-лістами. Ми працюємо акуратно та дбаємо про ваші речі.",
  },
  {
    id: 4,
    icon: <CheckCircle2 size={32} />,
    title: "Прийом роботи",
    description:
      "Ви перевіряєте результат. Ми гарантуємо 100% якість — якщо щось не так, ми безкоштовно все виправимо на місці.",
  },
];

export default function About() {
  return (
    <section className={css.aboutSection} id='about'>
      <div className='container'>
        {/* Блок: Про компанію */}
        <div className={css.introGrid}>
          <div className={css.textContent}>
            <div className={css.badge}>
              <ShieldCheck size={20} />
              <span>Ветеранський бізнес</span>
            </div>
            <h2 className={css.title}>
              MobiPro Cleaning — <span>дисципліна чистоти</span>
            </h2>
            <div className={css.description}>
              <p>
                Ми — не просто ще одна клінінгова компанія. MobiPro Cleaning засновано на принципах, які працюють
                безвідмовно: чесність, відповідальність та увага до найменших деталей.
              </p>
              <p>
                Як ветеранський бізнес, ми знаємо ціну слову та часу. Наша команда працює як єдиний механізм,
                використовуючи лише професійну техніку та сертифіковані мийні засоби. Ви довіряєте нам свій дім чи офіс
                — ми повертаємо його вам в ідеальному стані.
              </p>
            </div>

            <ul className={css.featuresList}>
              <li>
                <CheckCircle2 size={20} className={css.checkIcon} /> Фіксовані ціни без прихованих платежів
              </li>
              <li>
                <CheckCircle2 size={20} className={css.checkIcon} /> Перевірені та навчені працівники
              </li>
              <li>
                <CheckCircle2 size={20} className={css.checkIcon} /> Гарантія збереження вашого майна
              </li>
            </ul>
          </div>

          <div className={css.imageWrapper}>
            <div className={css.imageBox}>
              <img src={aboutImg} alt='Команда MobiPro Cleaning' className={css.img} />
            </div>
            <div className={css.experienceBadge}>
              <span className={css.expNumber}>100%</span>
              <span className={css.expText}>
                Гарантія
                <br />
                якості
              </span>
            </div>
          </div>
        </div>

        {/* Блок: Процес роботи */}
        <div className={css.processWrapper}>
          <h3 className={css.processTitle}>Як проходить процес прибирання?</h3>
          <div className={css.processGrid}>
            {PROCESS_STEPS.map((step) => (
              <div key={step.id} className={css.processCard}>
                <div className={css.stepNumber}>{step.id}</div>
                <div className={css.iconWrapper}>{step.icon}</div>
                <h4 className={css.stepTitle}>{step.title}</h4>
                <p className={css.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
