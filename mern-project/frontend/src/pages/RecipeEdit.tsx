import React from 'react'
import RecipeForm from '../components/RecipeForm'
import EnumRecipeFormActions from '../types/EnumRecipeFormActions'
export default function RecipeEdit() {
  return (
    <div className='mx-auto w-40%'>
      <div className="text-center text-h1 text-brand font-bold mb-7">
        Edit a Recipe
      </div>
      <RecipeForm formAction={EnumRecipeFormActions.Update}/> 
    </div>
  )
}
