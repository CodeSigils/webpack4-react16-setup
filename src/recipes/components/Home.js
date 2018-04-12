import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
/**
 *
fetch('http://reactrecipes.herokuapp.com/v1/recipes')
  // When response arrives we transform it to a JSON object inside a promise.
  .then(res => res.json())
  // Open console and network tab in dev-tools and observe
  .then(json => console.log(json))
 *
 * Note: Use '.env' file with the DotENV library to define global variables.
 * It is a good idea for security to exclude this file from version control
 * (see .gitignore file)
 *
 *  fetch(`${API_URL}/v1/recipes`)
 *   .then(res => res.json())
 *   .then(json => console.log(json));
 */

class Home extends Component {
  constructor(props) {
    super(props);
    // Define initial state
    this.state = {
      currentRecipe: null,
    };
    // this.onRecipeClick = this.onRecipeClick.bind(this);
  }

  /**
   * Bind an event listener to the component. Most common scope error:
   * "Uncaught (in promise) TypeError: _this3.setState is not a function"
   * See bind.(this) in the constructor and install "babel-preset-stage-0"
   * to avoid this by using arrow functions in the class body.
   * Then use it in webpack with this exact order: ["react", "env", "stage-0"]
   */
  onRecipeClick = id => {
    fetch(`${API_URL}/v1/recipes/${id}`)
      .then(res => res.json())
      .then(recipe => {
        this.setState({ currentRecipe: recipe });
      });
  };

  render() {
    const { recipes, favorites } = this.props.state;
    const { currentRecipe } = this.state;

    return (
      <div>
        <main className="px4 flex">
          <div style={{ flex: 3 }}>
            <h2 className="h2">Recipes collection</h2>
            <RecipeList
              recipes={recipes}
              favorites={favorites}
              onClick={this.onRecipeClick}
              onFavorited={this.props.toggleFavorite}
            />
          </div>
          <RecipeDetail
            className="ml4"
            recipe={currentRecipe}
            style={{ flex: 5 }}
          />
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  state: PropTypes.object,
  toggleFavorite: PropTypes.func,
};

export default Home;
