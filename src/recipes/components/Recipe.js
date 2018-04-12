import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import RecipeDetail from './RecipeDetail';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: null,
    };
  }

  /**
   * Get the data id from the react router automatic prop called 'match'.
   * This prop will hold in its params all the data to the url the user
   * is currently on. Then make the same call we do in Home component.
   */
  componentDidMount() {
    const { id } = this.props.match.params;

    fetch(`${API_URL}/v1/recipes/${id}`)
      .then(res => res.json())
      .then(recipe => {
        this.setState({ recipe });
      });
  }

  render() {
    const { recipe } = this.state;

    return (
      <div className="px4 max-width-4">
        <RecipeDetail recipe={recipe} />
      </div>
    );
  }
}

Recipe.propTypes = {
  match: PropTypes.object,
};

export default Recipe;
