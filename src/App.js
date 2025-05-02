import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PokemonStore from './components/PokemonStore';
import PokemonInDetail from './components/PokemonInDetail';
import FavoritePokemons from './components/FavoritePokemons';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PokemonStore} />
        <Route path="/pokemon/:id" component={PokemonInDetail} />
        <Route exact path="/favorites" component={FavoritePokemons} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
