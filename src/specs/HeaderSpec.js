import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Header from '../recipes/components/Header';

/**
 * Think about the component in test as an input-output function.
 * Consider what props this component takes in its input, and what output
 * generates based on those props.
 * Then create a snapshot test for all possible combinations of those props.
 * In this case Header does not take any props. So we will test for proper
 * rendering.
 */
describe('<Header/>', () => {
  test('Should render correctly', () => {
    // Transform  the component into a JSON structure
    const component = renderer.create(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const tree = component.toJSON();

    // Tell Jest to check if tree muches the snapshot
    expect(tree).toMatchSnapshot();
  });
});
