import React from 'react';
import { mount } from 'enzyme';
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

  // 4. Use enzyme to test the function of event handlers
  test('Should call onClick when clicked', () => {
    const onClick = jest.fn();
    const component = mount(
      <RecipeListItem recipe={testRecipe} onClick={onClick} />,
    );
    // Simulate the click event:
    component.simulate('click');
    /**
     * The 'mock' function will save all the information related to the times
     * the onClick function was called and pass it inside the 'calls' attribute.
     * Then we test for one time click.
     */
    expect(onClick.mock.calls.length).toBe(1);
  });
  // 5. Test onFavorited
  test('Should call onFavorited when favorited', () => {
    const onFavorited = jest.fn();
    const component = mount(
      <RecipeListItem recipe={testRecipe} onFavorited={onFavorited} />,
    );
    // We must target the first span:
    component
      .find('span')
      .first()
      .simulate('click');
    expect(onFavorited.mock.calls.length).toBe(1);
  });
  // 6. Test handlers conflict
  test('Should not call onClick when onFavorited is called', () => {
    const onClick = jest.fn();
    const onFavorited = jest.fn();
    // Add both event functions
    const component = mount(
      <RecipeListItem
        recipe={testRecipe}
        onClick={onClick}
        onFavorited={onFavorited}
      />,
    );
    // We must target the first span:
    component
      .find('span')
      .first()
      .simulate('click');

    expect(onClick.mock.calls.length).toBe(0);
    expect(onFavorited.mock.calls.length).toBe(1);
  });
});
