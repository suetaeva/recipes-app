import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CATEGORIES } from '../data/recipes'
import { useRecipes } from '../hooks/useRecipes'
import { supabase } from '../supabase'

const EMPTY_INGREDIENT = { name: '', amount: '', unit: 'г' }
const UNITS = ['г', 'кг', 'мл', 'л', 'шт', 'ст.л.', 'ч.л.', 'стакан', 'щепотка', 'по вкусу']

export default function AddRecipe() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { addRecipe, updateRecipe } = useRecipes()
  const [loading, setLoading] = useState(!!id)

  const [form, setForm] = useState({
    title: '',
    category: 'main',
    servings: 4,
    ingredients: [{ ...EMPTY_INGREDIENT }],
    steps: [''],
    tips: '',
    link: '',
  })

  useEffect(() => {
    if (!id) return
    supabase.from('recipes').select('*').eq('id', id).single().then(({ data }) => {
      if (data) {
        setForm({
          title: data.title,
          category: data.category,
          servings: data.servings,
          ingredients: data.ingredients.map(i => ({ ...i, amount: String(i.amount) })),
          steps: data.steps,
          tips: data.tips || '',
          link: data.link || '',
        })
      }
      setLoading(false)
    })
  }, [id])

  function setField(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function updateIngredient(i, field, value) {
    const updated = form.ingredients.map((ing, idx) =>
      idx === i ? { ...ing, [field]: value } : ing
    )
    setField('ingredients', updated)
  }

  function addIngredient() {
    setField('ingredients', [...form.ingredients, { ...EMPTY_INGREDIENT }])
  }

  function removeIngredient(i) {
    setField('ingredients', form.ingredients.filter((_, idx) => idx !== i))
  }

  function updateStep(i, value) {
    const updated = form.steps.map((s, idx) => idx === i ? value : s)
    setField('steps', updated)
  }

  function addStep() {
    setField('steps', [...form.steps, ''])
  }

  function removeStep(i) {
    setField('steps', form.steps.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const cleaned = {
      ...form,
      servings: Number(form.servings),
      ingredients: form.ingredients
        .filter(ing => ing.name.trim())
        .map(ing => ({ ...ing, amount: Number(ing.amount) })),
      steps: form.steps.filter(s => s.trim()),
    }
    if (id) {
      await updateRecipe(id, cleaned)
      navigate(`/recipe/${id}`)
    } else {
      const newId = await addRecipe(cleaned)
      navigate(`/recipe/${newId}`)
    }
  }

  if (loading) {
    return (
      <div className="page">
        <p style={{ color: '#9CA3AF', textAlign: 'center', padding: '40px' }}>Загрузка...</p>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="page-header">
        <button className="btn-back" onClick={() => navigate(-1)}>← Назад</button>
        <h2>{id ? 'Изменить рецепт' : 'Новый рецепт'}</h2>
      </header>

      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название</label>
          <input
            required
            value={form.title}
            onChange={e => setField('title', e.target.value)}
            placeholder="Название рецепта"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Категория</label>
            <select value={form.category} onChange={e => setField('category', e.target.value)}>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group form-group-small">
            <label>Порции</label>
            <input
              type="number"
              min="1"
              value={form.servings}
              onChange={e => setField('servings', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Ингредиенты</label>
          {form.ingredients.map((ing, i) => (
            <div key={i} className="ingredient-row">
              <input
                placeholder="Название"
                value={ing.name}
                onChange={e => updateIngredient(i, 'name', e.target.value)}
                className="ing-name"
              />
              <input
                placeholder="Кол-во"
                type="number"
                min="0"
                step="any"
                value={ing.amount}
                onChange={e => updateIngredient(i, 'amount', e.target.value)}
                className="ing-amount"
              />
              <select
                value={ing.unit}
                onChange={e => updateIngredient(i, 'unit', e.target.value)}
                className="ing-unit"
              >
                {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
              {form.ingredients.length > 1 && (
                <button type="button" className="btn-remove" onClick={() => removeIngredient(i)}>×</button>
              )}
            </div>
          ))}
          <button type="button" className="btn-add-item" onClick={addIngredient}>+ Ингредиент</button>
        </div>

        <div className="form-group">
          <label>Шаги приготовления</label>
          {form.steps.map((step, i) => (
            <div key={i} className="step-row">
              <span className="step-num">{i + 1}</span>
              <textarea
                placeholder={`Шаг ${i + 1}`}
                value={step}
                onChange={e => updateStep(i, e.target.value)}
                rows={2}
              />
              {form.steps.length > 1 && (
                <button type="button" className="btn-remove" onClick={() => removeStep(i)}>×</button>
              )}
            </div>
          ))}
          <button type="button" className="btn-add-item" onClick={addStep}>+ Шаг</button>
        </div>

        <div className="form-group">
          <label>Лайфхаки (необязательно)</label>
          <textarea
            value={form.tips}
            onChange={e => setField('tips', e.target.value)}
            placeholder="Советы и хитрости..."
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Ссылка на рецепт (необязательно)</label>
          <input
            type="url"
            value={form.link}
            onChange={e => setField('link', e.target.value)}
            placeholder="https://..."
          />
        </div>

        <button type="submit" className="btn-primary btn-submit">
          {id ? 'Сохранить изменения' : 'Добавить рецепт'}
        </button>
      </form>
    </div>
  )
}
