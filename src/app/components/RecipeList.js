import React from "react";

const RecipeList = props => {
  return (
    <div style={props.style}>
      <h2>Recipes</h2>
      <ul>
        <li>
          <span>Creepy Hallowing cakes</span>
          <span>Dessert</span>
        </li>
        <li>
          <span>Blueberry Sour Cream Coffee Cakes</span>
          <span>Dessert</span>
        </li>
        <li>
          <span>Amazing Pork Tenderloin in the Slow Cooker</span>
          <span>Meat</span>
        </li>
      </ul>
    </div>
  );
};

export default RecipeList;
