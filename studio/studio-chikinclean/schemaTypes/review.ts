import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Відгуки клієнтів',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Ім’я та прізвище клієнта',
      type: 'string',
      description: 'Введіть ім’я так, як воно відображається в Google (наприклад, "Олександр В.")',
      validation: (Rule) => Rule.required().error('Ім’я клієнта є обов’язковим'),
    }),
    defineField({
      name: 'avatar',
      title: 'Аватарка клієнта',
      type: 'image',
      description:
        'Завантажте фото користувача. Якщо залишити порожнім, підтягнеться дефолтна іконка Google',
      options: {
        hotspot: true, // Дозволяє замовнику обрізати аватарку прямо в адмінці
      },
    }),
    defineField({
      name: 'rating',
      title: 'Кількість зірочок (Оцінка)',
      type: 'number',
      description: 'Оберіть оцінку від 1 до 5',
      options: {
        list: [
          {title: '5 Зірок ⭐⭐⭐⭐⭐', value: 5},
          {title: '4 Зірки ⭐⭐⭐⭐', value: 4},
          {title: '3 Зірки ⭐⭐⭐', value: 3},
          {title: '2 Зірки ⭐⭐', value: 2},
          {title: '1 Зірка ⭐', value: 1},
        ],
        layout: 'radio', // Зручні радіо-кнопки
      },
      initialValue: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Дата або час відгуку',
      type: 'string',
      description: 'Наприклад: "Тиждень тому", "3 дні тому", "Червень 2026" тощо',
      validation: (Rule) => Rule.required().error('Вкажіть час написання відгуку'),
    }),
    defineField({
      name: 'text',
      title: 'Текст відгуку',
      type: 'text',
      description: 'Скопіюйте сюди сам текст відгуку з Google Maps',
      validation: (Rule) =>
        Rule.required().min(10).error('Текст відгуку має бути не коротшим за 10 символів'),
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'date',
      media: 'avatar',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title,
        subtitle: subtitle ? `🕒 ${subtitle}` : 'Відгук',
        media: media,
      }
    },
  },
})
