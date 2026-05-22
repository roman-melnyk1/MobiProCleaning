import css from "./Hero.module.css";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { initialValues, validationSchema } from "./formConfig";
import ModalSimple from "../ModalSimple/ModalSimple";

import flatImg from "../../assets/photo/apartment.webp";
import houseImg from "../../assets/photo/house.webp";
import officeImg from "../../assets/photo/office.webp";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = (values, { resetForm }) => {
    console.log("Дані форми:", values);
    setShowModal(true);
    resetForm();
  };

  const propertyTypes = [
    {
      id: "Квартира",
      label: "Квартира",
      bgImage: flatImg,
      bgSize: "40%",
    },
    {
      id: "Будинок",
      label: "Будинок",
      bgImage: houseImg,
      bgSize: "40%",
    },
    {
      id: "Офіс або ТЦ",
      label: "Офіс або ТЦ",
      bgImage: officeImg,
      bgSize: "30%",
    },
  ];

  return (
    <section className={css.hero}>
      <div className='container'>
        <div className={css.innerHero}>
          <div className={css.content}>
            <h1 className={css.title}>
              Ваші оселі в<span> надійних руках</span>
            </h1>
            <p className={css.description}>
              Новий стандарт чистоти для тих, хто цінує свій час та комфорт. Професійний підхід до кожного куточка вашої
              оселі.
            </p>
          </div>

          <div className={css.formWrapper}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ errors, touched, values, setFieldValue }) => (
                <Form className={css.form}>
                  <div className={css.tabsContainer}>
                    {propertyTypes.map((item) => (
                      <button
                        key={item.id}
                        type='button'
                        className={`${css.tabBtn} ${values.propertyType === item.id ? css.activeTab : ""}`}
                        onClick={() => setFieldValue("propertyType", item.id)}
                        style={{ backgroundImage: `url(${item.bgImage})`, backgroundSize: item.bgSize }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className={css.formCard}>
                    <div className={css.row}>
                      <div className={css.fieldBox}>
                        <ErrorMessage name='firstName' component='div' className={css.errorText} />
                        <Field
                          name='firstName'
                          placeholder="Ім'я"
                          className={`${css.input} ${errors.firstName && touched.firstName ? css.errorInput : ""}`}
                        />
                      </div>
                      <div className={css.fieldBox}>
                        <ErrorMessage name='lastName' component='div' className={css.errorText} />
                        <Field
                          name='lastName'
                          placeholder='Прізвище'
                          className={`${css.input} ${errors.lastName && touched.lastName ? css.errorInput : ""}`}
                        />
                      </div>
                    </div>

                    <div className={css.fieldBox}>
                      <ErrorMessage name='phone' component='div' className={css.errorText} />
                      <Field name='phone' type='tel' placeholder='Номер телефону' className={css.input} />
                    </div>

                    <div className={css.fieldBox}>
                      <Field name='address' placeholder='Адреса прибирання (вулиця, будинок)' className={css.input} />
                      <ErrorMessage name='address' component='div' className={css.errorText} />
                    </div>

                    <button type='submit' className={css.submitBtn}>
                      Надіслати заявку
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ModalSimple
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCalculate={() => {
          setShowModal(false);
          const calcSection = document.getElementById("calc");
          if (calcSection) {
            calcSection.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.href = "#calc";
          }
        }}
      />
    </section>
  );
}
