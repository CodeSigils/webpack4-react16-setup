import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
/**
 * We can pass className to props with expressions like this:
 * `h3 p2 bg-white italic center ${props.className}` but there is the risk
 * of a null value in our html. The classNames library will check if a CSS
 * class is null and will not render it in html, so the above expression
 * can become: classNames('h3 p2 bg-white italic center', props.className)
 */

const RecipeDetail = ({ recipe, style, className }) => {
  /**
   * Handle 0 state of component.
   * If there is no default value React will return a null complain:
   * "cannot read property of null".
   */
  if (!recipe) {
    return (
      <span
        style={style}
        className={classNames('h4 p2 bg-white italic center', className)}
      >
        Select a recipe from the list
      </span>
    );
  }

  return (
    <div style={style} className={classNames('p2 bg-white', className)}>
      <h2 className="h2">{recipe.name}</h2>
      <img className="fit" alt={recipe.name} src={recipe.image} />
      <div>
        <span>{recipe.category}</span>
        <span>{recipe.calories} cal</span>
      </div>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map(ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h3>Steps</h3>
      <ol>{recipe.steps.map(step => <li key={step}>{step}</li>)}</ol>
    </div>
  );
};

RecipeDetail.propTypes = {
  recipe: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default RecipeDetail;
