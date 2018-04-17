import React from 'react';
import renderer from 'react-test-renderer';
import RecipeListItem from '../recipes/components/RecipeListItem';

const testRecipe = {
  id: 1,
  name: 'Test recipe',
  category: 'Test recipe category',
};

describe('<RecipeListItem/>', () => {
  // 1. test for recipe null
  test('Should not break if there is no recipe passed', () => {
    // Transform  the component into a JSON structure
    const component = renderer.create(<RecipeListItem />);
    const tree = component.toJSON();
    // Tell Jest to check if tree muches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // 2. test for recipe not null
  test('Should correctly render recipe', () => {
    const component = renderer.create(<RecipeListItem recipe={testRecipe} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  // 3. test for favorites bool state
  test('Should render favorite state', () => {
    const component = renderer.create(<RecipeListItem favorited={false} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
