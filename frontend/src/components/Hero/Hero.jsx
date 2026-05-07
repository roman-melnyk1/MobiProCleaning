import { Formik, Form, Field, ErrorMessage } from "formik";
import { initialValues, validationSchema } from "./formConfig";
import css from "./Hero.module.css";

export default function Hero() {
  const handleSubmit = (values, { resetForm }) => {
    console.log("Дані форми:", values);
    alert("Заявку прийнято! Ми зателефонуємо вам найближчим часом.");
    resetForm();
  };

  return (
    <section className={css.hero}>
      <div className='container'>
        <div className={css.innerHero}>
          <div className={css.content}>
            <h1 className={css.title}>
              Ваші оселі в<span>надійних руках</span>
            </h1>
            <p className={css.description}>
              Новий стандарт чистоти для тих, хто цінує свій час та комфорт. Професійний підхід до кожного куточка вашої
              оселі.
            </p>
          </div>

          <div className={css.formWrapper}>
            <div className={css.formCard}>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                  <Form className={css.form}>
                    <div className={css.row}>
                      <div className={css.fieldBox}>
                        <Field
                          name='firstName'
                          placeholder="Ім'я"
                          className={`${css.input} ${errors.firstName && touched.firstName ? css.errorInput : ""}`}
                        />
                        <ErrorMessage name='firstName' component='div' className={css.errorText} />
                      </div>
                      <div className={css.fieldBox}>
                        <Field
                          name='lastName'
                          placeholder='Прізвище'
                          className={`${css.input} ${errors.lastName && touched.lastName ? css.errorInput : ""}`}
                        />
                        <ErrorMessage name='lastName' component='div' className={css.errorText} />
                      </div>
                    </div>

                    <div className={css.fieldBox}>
                      <Field name='phone' type='tel' placeholder='Номер телефону' className={css.input} />
                      <ErrorMessage name='phone' component='div' className={css.errorText} />
                    </div>

                    <div className={css.fieldBox}>
                      <Field name='address' placeholder='Адреса прибирання (вулиця, будинок)' className={css.input} />
                      <ErrorMessage name='address' component='div' className={css.errorText} />
                    </div>

                    <button type='submit' className={css.submitBtn}>
                      Надіслати заявку
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
