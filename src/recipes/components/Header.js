import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../img/react.png';

const HeaderLink = ({ children, ...props }) => (
  <NavLink
    exact
    className="p1 mx2 black rounded text-decoration-none"
    activeClassName="bg-white"
    {...props}
  >
    {children}
  </NavLink>
);

const Header = () => (
  <header className="flex align-middle justify-between px4 m3">
    <div>
      <Link className="text-decoration-none" href="/" to="/">
        <h1 className="h1 red inline-block mr2">
          <span className="red pr1" role="img" aria-label="my recipes">
            💗
          </span>
          My Recipes
        </h1>
      </Link>
      <span className="mr1">made with</span>
      <img
        className="mr1"
        style={{ width: '20px' }}
        src={Logo}
        alt="react logo"
      />
    </div>
    <nav>
      <HeaderLink to="/">Home</HeaderLink>
      <HeaderLink to="/favorites">Favorites</HeaderLink>
    </nav>
  </header>
);

HeaderLink.propTypes = { children: PropTypes.node };

export default Header;
