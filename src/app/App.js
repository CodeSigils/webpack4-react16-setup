import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Favorites from './components/Favorites';

// BrowserRouter only returns one child. Use exact for home path
const App = () => {
  return (
    <BrowserRouter basename="/">
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/favorites" component={Favorites} />
      </main>
    </BrowserRouter>
  );
};

export default App;
