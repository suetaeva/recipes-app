import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CATEGORIES } from '../data/recipes'
import { useRecipes } from '../hooks/useRecipes'

export default function RecipePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getRecipeById, deleteRecipe } = useRecipes()

  const recipe = getRecipeById(id)
  const [servings, setServings] = useState(recipe?.servings || 1)

  if (!recipe) {
    return (
      <div className="page">
        <p>Рецепт не найден</p>
        <button onClick={() => navigate('/')}>На главную</button>
      </div>
    )
  }

  const category = CATEGORIES.find(c => c.id === recipe.category)
  const ratio = servings / recipe.servings

  function formatAmount(amount) {
    const val = amount * ratio
    return val % 1 === 0 ? val : parseFloat(val.toFixed(1))
  }

  function handleDelete() {
    if (confirm(`Удалить рецепт "${recipe.title}"?`)) {
      deleteRecipe(id)
      navigate(-1)
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <button className="btn-back" onClick={() => navigate(-1)}>← Назад</button>
        <div className="header-actions">
          <button className="btn-edit" onClick={() => navigate(`/edit/${id}`)}>Изменить</button>
          <button className="btn-delete" onClick={handleDelete}>Удалить</button>
        </div>
      </header>

      <div className="recipe-detail">
        <div className="recipe-category-tag">{category?.emoji} {category?.name}</div>
        <h2 className="recipe-title">{recipe.title}</h2>

        <div className="servings-control">
          <span className="servings-label">Порции:</span>
          <button className="btn-servings" onClick={() => setServings(s => Math.max(1, s - 1))}>−</button>
          <span className="servings-value">{servings}</span>
          <button className="btn-servings" onClick={() => setServings(s => s + 1)}>+</button>
        </div>

        <section>
          <h3>Ингредиенты</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="ingredient-item">
                <span className="ingredient-name">{ing.name}</span>
                <span className="ingredient-amount">{formatAmount(ing.amount)} {ing.unit}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Приготовление</h3>
          <ol className="steps-list">
            {recipe.steps.map((step, i) => (
              <li key={i} className="step-item">{step}</li>
            ))}
          </ol>
        </section>

        {recipe.tips && (
          <section className="tips-section">
            <h3>Лайфхаки</h3>
            <p>{recipe.tips}</p>
          </section>
        )}

        {recipe.link && (
          <section>
            <h3>Источник</h3>
            <a href={recipe.link} target="_blank" rel="noreferrer" className="recipe-link">
              Открыть оригинал →
            </a>
          </section>
        )}
      </div>
    </div>
  )
}
