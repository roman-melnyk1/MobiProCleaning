import * as Yup from "yup";

export const initialValues = {
  botcheck: false,
  propertyType: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Занадто коротке ім’я").required("Обов'язково"),
  lastName: Yup.string().min(2, "Занадто коротке прізвище").required("Обов'язково"),
  phone: Yup.string()
    .matches(/^\+?3?8?(0\d{9})$/, "Формат: 0XXXXXXXXX")
    .required("Потрібен телефон"),
  address: Yup.string().min(10, "Вкажіть повну адресу (вулиця, будинок)"),
});
