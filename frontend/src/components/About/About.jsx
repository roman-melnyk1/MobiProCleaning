import css from "./About.module.css";
import { Leaf, ShieldCheck, Box, BadgeCheck } from "lucide-react";

const aboutData = [
  {
    title: "Еко-підхід",
    text: "Гіпоалергенні засоби, безпечні для дітей та тварин.",
    icon: <Leaf size={24} />,
  },
  {
    title: "Безпека",
    text: "Тільки перевірений персонал та страхування майна.",
    icon: <ShieldCheck size={24} />,
  },
  {
    title: "Все включено",
    text: "Привозимо весь необхідний інвентар із собою.",
    icon: <Box size={24} />,
  },
  {
    title: "Гарантія",
    text: "Виправляємо будь-які зауваження безкоштовно.",
    icon: <BadgeCheck size={24} />,
  },
];

export default function About() {
  return (
    <section className={css.about}>
      <div className='container'>
        <div className={css.itemWrapper}>
          {aboutData.map((item, index) => (
            <div key={index} className={css.item}>
              <div className={css.row}>
                <div className={css.iconWrapper}>{item.icon}</div>
                <h3 className={css.title}>{item.title}</h3>
              </div>
              <div className={css.textWrapper}>
                <p className={css.text}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
