import React from 'react'
import ReactDOM from 'react-dom'
/**
 * Each renderer gets a mounter function that takes 2 args:
 * A React Component and a DOM element.
 * The mounter function will recursively render the component
 * and inject it to the DOM
 */
 
// http://reactrecipes.herokuapp.com/v1/recipes

const MOUNT_ELEMENT = document.getElementById("app")

import App from './app/App';
ReactDOM.render(<App />, MOUNT_ELEMENT);
