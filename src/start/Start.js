import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.scss';

const App = () => (
  <div className="profile">
    <a
      href="https://reactjs.org/"
      title="react js logo"
      rel="noopener noreferrer"
      target="_blank"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png"
        alt="react"
      />
    </a>
    <h3>React CSS playground</h3>
    <ul>
      <li> Airbnb presets</li>
      <li> Prettier</li>
      <li> PostCSS</li>
      <li> SASS</li>
    </ul>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
