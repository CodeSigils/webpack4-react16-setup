import React from "react";

const RecipeList = props => {
  return (
    <div style={props.style}>
      <h2 className="h1">Menu</h2>
      <ul className="list-reset">
        {props.recipes.map(recipe => (
          <li
            key={recipe.name}
            className="py2 border-bottom border-bottom-dashed pointer"
            onClick={() => props.onClick(recipe.id)}
          >
            <span>{recipe.name}</span>
            <span>{recipe.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
