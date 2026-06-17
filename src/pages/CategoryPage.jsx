import { useNavigate, useParams } from 'react-router-dom'
import { CATEGORIES } from '../data/recipes'
import { useRecipes } from '../hooks/useRecipes'

export default function CategoryPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { getRecipesByCategory } = useRecipes()

  const category = CATEGORIES.find(c => c.id === categoryId)
  const recipes = getRecipesByCategory(categoryId)

  return (
    <div className="page">
      <header className="page-header">
        <button className="btn-back" onClick={() => navigate('/')}>← Назад</button>
        <h2>{category?.emoji} {category?.name}</h2>
      </header>

      {recipes.length === 0 ? (
        <div className="empty-state">
          <p>Рецептов пока нет</p>
          <button className="btn-primary" onClick={() => navigate('/add')}>Добавить первый рецепт</button>
        </div>
      ) : (
        <div className="recipes-list">
          {recipes.map(recipe => (
            <div
              key={recipe.id}
              className="recipe-card"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <div className="recipe-card-title">{recipe.title}</div>
              <div className="recipe-card-meta">{recipe.servings} порц. · {recipe.ingredients.length} ингр.</div>
            </div>
          ))}
        </div>
      )}

      <button className="btn-fab" onClick={() => navigate('/add')}>+</button>
    </div>
  )
}
