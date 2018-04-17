import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import RecipeDetail from '../recipes/components/RecipeDetail';
// import { classNames } from 'classnames';

describe('<RecipeDetail/>', () => {
  let testRecipe;

  beforeEach(() => {
    testRecipe = {
      id: 1,
      name: 'Test recipe',
      category: 'Test recipe category',
      ingredients: ['Ing 1', 'Ing 2'],
      steps: ['Step 1', 'Step 2'],
    };
  });

  // 1.
  test('Should render zero state', () => {
    const component = renderer.create(
      <BrowserRouter>
        <RecipeDetail />
      </BrowserRouter>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
  // 2.
  test('Should correctly render a recipe', () => {
    const component = renderer.create(
      <BrowserRouter>
        <RecipeDetail recipe={testRecipe} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
  // 3.
  test('Should correctly assign a className', () => {
    const component = renderer.create(
      <BrowserRouter>
        <RecipeDetail recipe={testRecipe} className="classname-test" />
      </BrowserRouter>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
  // 4.
  test('Should render a recipe without ingredients', () => {
    delete testRecipe.ingredients;
    const component = renderer.create(
      <BrowserRouter>
        <RecipeDetail recipe={testRecipe} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
  // 5.
  test('Should render a recipe without steps', () => {
    delete testRecipe.steps;
    const component = renderer.create(
      <BrowserRouter>
        <RecipeDetail recipe={testRecipe} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();

    // Tell Jest to check if tree muches the snapshot
    expect(tree).toMatchSnapshot();
  });
});
