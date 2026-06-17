export const CATEGORIES = [
  { id: 'breakfast', name: 'Завтраки', emoji: '🍳' },
  { id: 'soups', name: 'Супы', emoji: '🍲' },
  { id: 'main', name: 'Основные блюда', emoji: '🍽️' },
  { id: 'salads', name: 'Салаты', emoji: '🥗' },
  { id: 'baking', name: 'Выпечка', emoji: '🥐' },
  { id: 'desserts', name: 'Десерты', emoji: '🍰' },
  { id: 'drinks', name: 'Напитки', emoji: '🍹' },
  { id: 'other', name: 'Другое', emoji: '🍴' },
]

export const SAMPLE_RECIPES = [
  {
    id: '1',
    title: 'Классические блины',
    category: 'breakfast',
    servings: 4,
    ingredients: [
      { name: 'Мука', amount: 200, unit: 'г' },
      { name: 'Молоко', amount: 500, unit: 'мл' },
      { name: 'Яйца', amount: 2, unit: 'шт' },
      { name: 'Сахар', amount: 2, unit: 'ст.л.' },
      { name: 'Соль', amount: 0.5, unit: 'ч.л.' },
      { name: 'Растительное масло', amount: 3, unit: 'ст.л.' },
    ],
    steps: [
      'Смешать яйца с сахаром и солью.',
      'Добавить молоко и перемешать.',
      'Постепенно всыпать муку, перемешивая до однородности.',
      'Добавить масло и дать тесту постоять 15 минут.',
      'Жарить на разогретой сковороде по 1-2 минуты с каждой стороны.',
    ],
    tips: 'Первый блин можно использовать как пробный — оценить консистенцию теста. Если слишком густое — добавить немного молока.',
    link: '',
  },
]
