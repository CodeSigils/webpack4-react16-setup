import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Favorites from './components/Favorites';

// BrowserRouter only returns one child. Use exact for home path
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      favorites: [],
    };
  }

  // Use component life-cycle: https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d
  componentDidMount() {
    fetch(`${API_URL}/v1/recipes`)
      .then(res => res.json())
      .then(recipes => {
        this.setState({ recipes });
      });
  }

  toggleFavorite = id => {
    // Adds or removes a favorite id from the favorites list.
    this.setState(({ favorites, ...state }) => {
      if (favorites.includes(id)) {
        return { ...state, favorites: favorites.filter(f => f.id !== id) };
      }
      return { ...state, favorites: [...favorites, id] };
    });
  };

  render() {
    return (
      <BrowserRouter basename="/">
        <main>
          <Header />
          {/* Switch component can handle fallback routes, if previous routes don't much */}
          <Switch>
            <Redirect from="home" to="/" />
            <Route
              exact
              path="/"
              render={() => (
                <Home state={this.state} toggleFavorite={this.toggleFavorite} />
              )}
            />
            <Route
              path="/favorites"
              render={() => (
                <Favorites
                  state={this.state}
                  toggleFavorite={this.toggleFavorite}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
