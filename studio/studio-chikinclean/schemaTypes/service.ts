import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Послуги клінінгу',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва послуги',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isMainService',
      title: 'Це головна послуга з калькулятора?',
      type: 'boolean',
      description: 'Увімкніть ТІЛЬКИ для підтримуючого, генерального прибирання та після ремонту.',
      initialValue: false,
    }),
    // ⬇️ УНІВЕРСАЛЬНЕ ПОЛЕ 1: ID генерується автоматично
    defineField({
      name: 'serviceId',
      title: 'Унікальний ідентифікатор',
      type: 'slug',
      description:
        'Просто натисніть кнопку "Generate" поруч. Система сама створить правильний код на основі назви.',
      options: {
        source: 'title', // Автоматично бере текст із поля "Назва послуги"
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'singlePrice',
      title: 'Ціна послуги (Загальна)',
      type: 'string',
      description: 'Текст для сайту. Наприклад: "від 600грн"',
      hidden: ({document}) => document?.isMainService === true,
    }),
    defineField({
      name: 'isPerMeter',
      title: 'Чи потрібно вказувати площу/кількість?',
      type: 'boolean',
      description: 'Увімкніть, якщо для цієї послуги замовник має вписати число (м², шт тощо)',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Опис послуги',
      type: 'text',
      hidden: ({document}) => document?.isMainService !== true,
    }),
    defineField({
      name: 'priceFlat',
      title: 'Ціна для Квартири (Текст)',
      type: 'string',
      hidden: ({document}) => document?.isMainService !== true,
    }),
    defineField({
      name: 'priceHouse',
      title: 'Ціна для Будинку (Текст)',
      type: 'string',
      hidden: ({document}) => document?.isMainService !== true,
    }),
    defineField({
      name: 'priceOffice',
      title: 'Ціна для Бізнесу / Офісу (Текст)',
      type: 'string',
      hidden: ({document}) => document?.isMainService !== true,
    }),
    // ⬇️ УНІВЕРСАЛЬНЕ ПОЛЕ 2: Математика потрібна всім
    defineField({
      name: 'basePrice',
      title: 'Ціна для калькулятора (Число)',
      type: 'number',
      description: 'Для головних: ціна за 1 м². Для додаткових: фіксована сума (наприклад: 600).',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Фото послуги',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
