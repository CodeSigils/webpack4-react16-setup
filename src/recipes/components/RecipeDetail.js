import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
/**
 * We can pass className to props with expressions like this:
 * `h3 p2 bg-white italic center ${props.className}` but there is the risk
 * of a null value in our html. The classNames library will check if a CSS
 * class is null and will not render it in html, so the above expression
 * can become: classNames('h3 p2 bg-white italic center', props.className)
 */

const Timer = () => {
  const tic = new Date().toLocaleTimeString();
  return <p>{tic}</p>;
};

const RecipeDetail = props => {
  /**
   * Handle 0 state of component.
   * If there is no default value React will return a null complain:
   * "cannot read property of null".
   */
  if (!props.recipe) {
    return (
      <span
        style={props.style}
        className={classNames('h4 p2 bg-white italic center', props.className)}
      >
        Select a recipe from the list and if you like it, <br /> add it to
        favorites by clicking the ☑ symbol !
        <hr className="border-none mx4 pt2" />
        <Timer tic={props.tic} />
      </span>
    );
  }

  return (
    <div
      style={props.style}
      className={classNames('p2 bg-white', props.className)}
    >
      <h2 className="h2">{props.recipe.name}</h2>
      <img className="fit" alt={props.recipe.name} src={props.recipe.image} />
      <div>
        <span>{props.recipe.category}</span>
        <span>{props.recipe.calories} cal</span>
      </div>
      <h3>Ingredients</h3>
      <ul>
        {props.recipe.ingredients.map(ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h3>Steps</h3>
      <ol>{props.recipe.steps.map(step => <li key={step}>{step}</li>)}</ol>
      <Link
        className="text-decoration-none"
        href={`/recipe/${props.recipe.id}`}
        to={`/recipe/${props.recipe.id}`}
      >
        <span className="p1 black btn rounded">Read more...</span>
      </Link>
    </div>
  );
};

RecipeDetail.propTypes = {
  tic: PropTypes.string,
  recipe: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default RecipeDetail;
