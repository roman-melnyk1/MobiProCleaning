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
    defineField({
      name: 'category',
      title: 'Розділ на сторінці цін',
      type: 'string',
      description: 'У якому блоці показувати послугу: «Додаткові послуги» чи «Хімчистка».',
      options: {
        list: [
          {title: 'Додаткові послуги', value: 'additional'},
          {title: 'Хімчистка', value: 'drycleaning'},
        ],
        layout: 'radio',
      },
      initialValue: 'additional',
      hidden: ({document}) => document?.isMainService === true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Порядок відображення',
      type: 'number',
      description: 'Менше число — вище у списку (1, 2, 3...). Можна залишити порожнім.',
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
      description: 'Увімкніть, якщо для цієї послуги замовник має вписати площу в м²',
      initialValue: false,
    }),
    defineField({
      name: 'isPerPiece',
      title: 'Рахувати поштучно (шт)?',
      type: 'boolean',
      description:
        'Увімкніть, якщо замовник може вказати кількість: стільці, подушки, решітки тощо. Ціна множиться на кількість.',
      initialValue: false,
      hidden: ({document}) => document?.isMainService === true || document?.isPerMeter === true,
    }),
    defineField({
      name: 'variants',
      title: 'Варіанти / розміри',
      type: 'array',
      description:
        'Наприклад, розміри вікон. У калькуляторі клієнт обере кількість кожного варіанту. Якщо також увімкнено «площу», з’явиться поле «Інший розмір (м²)».',
      hidden: ({document}) => document?.isMainService === true,
      of: [
        {
          type: 'object',
          name: 'variant',
          fields: [
            defineField({
              name: 'label',
              title: 'Назва / розмір',
              type: 'string',
              description: 'Наприклад: 120×120 см (1,44 м²)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Ціна, грн',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: {title: 'label', price: 'price'},
            prepare: ({title, price}) => ({title, subtitle: price != null ? `${price} грн` : ''}),
          },
        },
      ],
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
      name: 'basePriceHouse',
      title: 'Ціна для калькулятора: будинок / офіс (Число за 1 м²)',
      type: 'number',
      description: 'Якщо порожньо — для будинку й офісу калькулятор візьме ціну з поля вище.',
      hidden: ({document}) => document?.isMainService !== true,
      validation: (Rule) => Rule.min(0),
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
  orderings: [
    {
      title: 'Порядок відображення',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      isMain: 'isMainService',
      category: 'category',
      price: 'singlePrice',
      media: 'image',
    },
    prepare({title, isMain, category, price, media}) {
      const section = isMain ? 'Головна' : category === 'drycleaning' ? 'Хімчистка' : 'Додаткова'
      return {title, subtitle: [section, price].filter(Boolean).join(' · '), media}
    },
  },
})
