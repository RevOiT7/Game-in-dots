import React from "react";

import { Link } from "react-router-dom";

import "./Header.scss";

export const Header = () => {
  return (
    <div className="header">
      <span>Game in dots</span>
      <nav>
        <Link to="/">
          <button>Game</button>
        </Link>
        <Link to="/leaders">
          <button>Leaders</button>
        </Link>
      </nav>
    </div>
  );
};
