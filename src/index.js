import React from "react";
import ReactDOM from "react-dom";
import "./app/css/main";

/**
 * Each renderer gets a mounter function that takes 2 args:
 * A React Component and a DOM element.
 * The mounter function will recursively render the component
 * and inject it to the DOM
 */

const MOUNT_ELEMENT = document.getElementById("app");

import App from "./app/App";
ReactDOM.render(<App />, MOUNT_ELEMENT);
