import { useState, useEffect } from 'react'
import { SAMPLE_RECIPES } from '../data/recipes'

const STORAGE_KEY = 'recipes-app-data'

export function useRecipes() {
  const [recipes, setRecipes] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : SAMPLE_RECIPES
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  function addRecipe(recipe) {
    const newRecipe = { ...recipe, id: Date.now().toString() }
    setRecipes(prev => [...prev, newRecipe])
    return newRecipe.id
  }

  function updateRecipe(id, updated) {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r))
  }

  function deleteRecipe(id) {
    setRecipes(prev => prev.filter(r => r.id !== id))
  }

  function getRecipesByCategory(category) {
    return recipes.filter(r => r.category === category)
  }

  function getRecipeById(id) {
    return recipes.find(r => r.id === id)
  }

  return { recipes, addRecipe, updateRecipe, deleteRecipe, getRecipesByCategory, getRecipeById }
}
