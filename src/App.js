import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Game } from './components/Game/Game';
import { Leaders } from './components/Leaders/Leaders';

function App() {
  return (
  <Router>
    <Header />
    <Route exact path="/" component={Game} />
    <Route exact path="/leaders" component={Leaders} />
  </Router>
  );
}

export default App;
