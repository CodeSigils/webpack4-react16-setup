import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Favorites from './components/Favorites';

// BrowserRouter only returns one child. Use exact for home path
const App = () => {
  return (
    <BrowserRouter basename="/">
      <main>
        <Header />
        {/* Switch component can handle fallback routes, if previous routes don't much */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/favorites" component={Favorites} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
