import React from 'react';
import PropTypes from 'prop-types';

const RecipeListItem = ({ recipe, onClick, onFavorited, favorited }) => (
  <li
    className="py2 border-bottom border-bottom-dashed pointer"
    onClick={() => onClick(recipe.id)}
  >
    <span
      className="mr1 red"
      onClick={e => {
        e.stopPropagation();
        onFavorited(recipe.id);
      }}
      role="img"
      aria-label="favorite"
    >
      {favorited ? '💖' : '⏍'}
    </span>
    <span>{recipe.name}</span>
    <span>{recipe.category}</span>
  </li>
);

RecipeListItem.propTypes = {
  recipe: PropTypes.object,
  onClick: PropTypes.func,
  onFavorited: PropTypes.func,
  favorited: PropTypes.bool,
};

const RecipeList = ({ style, recipes, favorites, ...props }) => (
  <ul style={style} className="list-reset">
    {recipes.map(recipe => (
      <RecipeListItem
        key={recipe.name}
        recipe={recipe}
        favorited={favorites.includes(recipe.id)}
        {...props}
      />
    ))}
  </ul>
);

RecipeList.propTypes = {
  recipes: PropTypes.array,
  favorites: PropTypes.array,
  style: PropTypes.object,
};

export default RecipeList;
