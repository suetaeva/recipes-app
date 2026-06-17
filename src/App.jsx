import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import RecipePage from './pages/RecipePage'
import AddRecipe from './pages/AddRecipe'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/edit/:id" element={<AddRecipe />} />
      </Routes>
    </BrowserRouter>
  )
}
