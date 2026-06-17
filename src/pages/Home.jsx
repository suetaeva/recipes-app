import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../data/recipes'
import { useRecipes } from '../hooks/useRecipes'

export default function Home() {
  const navigate = useNavigate()
  const { getRecipesByCategory, loading } = useRecipes()

  return (
    <div className="page">
      <header className="app-header">
        <h1>Мои рецепты</h1>
        <button className="btn-add" onClick={() => navigate('/add')}>+ Добавить</button>
      </header>

      {loading && <p style={{color:'#9CA3AF', textAlign:'center', padding:'20px'}}>Загрузка...</p>}

      <div className="categories-grid">
        {CATEGORIES.map(cat => {
          const count = getRecipesByCategory(cat.id).length
          return (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => navigate(`/category/${cat.id}`)}
            >
              <span className="category-emoji">{cat.emoji}</span>
              <span className="category-name">{cat.name}</span>
              <span className="category-count">{count} {count === 1 ? 'рецепт' : count >= 2 && count <= 4 ? 'рецепта' : 'рецептов'}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
