import React, { Component } from "react";
import Header from "./components/Header";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      currentRecipe: null
    };
    // this.onRecipeClick = this.onRecipeClick.bind(this);
  }

  // Use component life-cycle: https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d
  componentDidMount() {
    fetch(`${API_URL}/v1/recipes`)
      .then(res => res.json())
      .then(recipes => {
        this.setState({ recipes });
      });
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
    const { recipes, currentRecipe } = this.state;

    return (
      <div>
        <Header />
        <main className="px4 flex">
          <RecipeList
            recipes={recipes}
            style={{ flex: 3 }}
            onClick={this.onRecipeClick}
          />
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

export default App;
