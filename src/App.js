import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PokemonStore from './components/PokemonStore';
import PokemonInDetail from './components/PokemonInDetail';
import FavoritePokemons from './components/FavoritePokemons';
import './App.css';
import { HashRouter } from 'react-router-dom';


const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={PokemonStore} />
        <Route path="/pokemon/:id" component={PokemonInDetail} />
        <Route exact path="/favorites" component={FavoritePokemons} />
      </Switch>
    </HashRouter>
  );
};

export default App;
