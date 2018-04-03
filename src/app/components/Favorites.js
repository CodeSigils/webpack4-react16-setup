import React from 'react';
import RecipeList from './RecipeList';

// The recipes and favorites array are inside the state.
const Favorites = ({ state, toggleFavorite }) => (
  <div className="px4">
    <h2 className="h2">Favorites</h2>
    <RecipeList
      recipes={state.recipes.filter(r => state.favorites.includes(r.id))}
      favorites={state.favorites}
      onFavorited={toggleFavorite}
    />
  </div>
);

export default Favorites;
