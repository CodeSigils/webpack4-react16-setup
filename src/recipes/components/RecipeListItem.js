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
      {favorited ? '💖' : '☑'}
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

RecipeListItem.defaultProps = {
  recipe: {},
};

export default RecipeListItem;
