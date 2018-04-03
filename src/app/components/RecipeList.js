import React from 'react';
import PropTypes from 'prop-types';

const RecipeList = props => {
  return (
    <div style={props.style}>
      <h2 className="h2">Menu</h2>
      <ul className="list-reset">
        {props.recipes.map(recipe => (
          <li
            key={recipe.name}
            className="py2 border-bottom border-bottom-dashed pointer"
            onClick={() => props.onClick(recipe.id)}
          >
            <span
              className="mr1"
              onClick={e => {
                e.stopPropagation();
                props.onFavorited(recipe.id);
              }}
              role="img"
              aria-label="favorite"
            >
              {props.favorites.includes(recipe.id) ? '<3' : '0'}
            </span>
            <span>{recipe.name}</span>
            <span>{recipe.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array,
  favorites: PropTypes.array,
  style: PropTypes.object,
};

export default RecipeList;
