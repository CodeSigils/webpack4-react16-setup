import React from 'react';
import renderer from 'react-test-renderer';
import RecipeList from '../recipes/components/RecipeList';

const testRecipes = [
  {
    id: 1,
    name: 'Recipe 1',
    category: 'Category 1',
  },
  {
    id: 2,
    name: 'Recipe 2',
    category: 'Category 2',
  },
];

describe('<RecipeList/>', () => {
  test('Should no break when there are no recipes', () => {
    // Transform  the component into a JSON structure
    const component = renderer.create(<RecipeList />);
    const tree = component.toJSON();

    // Tell Jest to check if tree muches the snapshot
    expect(tree).toMatchSnapshot();
  });

  test('Should render corectly', () => {
    // Transform  the component into a JSON structure
    const component = renderer.create(<RecipeList recipes={testRecipes} />);
    const tree = component.toJSON();

    // Tell Jest to check if tree muches the snapshot
    expect(tree).toMatchSnapshot();
  });

  test('Should render favorited state corectly', () => {
    // Transform  the component into a JSON structure
    const component = renderer.create(<RecipeList favorites={[1]} />);
    const tree = component.toJSON();

    // Tell Jest to check if tree muches the snapshot
    expect(tree).toMatchSnapshot();
  });
});
