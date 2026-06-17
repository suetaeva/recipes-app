import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export function useRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecipes()
  }, [])

  async function fetchRecipes() {
    setLoading(true)
    const { data } = await supabase.from('recipes').select('*').order('created_at', { ascending: false })
    if (data) setRecipes(data)
    setLoading(false)
  }

  async function addRecipe(recipe) {
    const { data } = await supabase.from('recipes').insert([recipe]).select().single()
    if (data) setRecipes(prev => [data, ...prev])
    return data?.id
  }

  async function updateRecipe(id, updated) {
    const { data } = await supabase.from('recipes').update(updated).eq('id', id).select().single()
    if (data) setRecipes(prev => prev.map(r => r.id === id ? data : r))
  }

  async function deleteRecipe(id) {
    await supabase.from('recipes').delete().eq('id', id)
    setRecipes(prev => prev.filter(r => r.id !== id))
  }

  function getRecipesByCategory(category) {
    return recipes.filter(r => r.category === category)
  }

  function getRecipeById(id) {
    return recipes.find(r => r.id === id)
  }

  return { recipes, loading, addRecipe, updateRecipe, deleteRecipe, getRecipesByCategory, getRecipeById }
}
