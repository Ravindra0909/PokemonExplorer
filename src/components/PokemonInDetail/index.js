import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import Header from '../Header';
import AboutSection from '../AboutSection';
import BaseStatsSection from '../BaseStatsSection';
import EvolutionSection from '../EvolutionSection';
import MovesSection from '../MovesSection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';


class PokemonInDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
      isLoading: true,
      error: null,
      activeTab: 'about',
      isFavorite: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchPokemonData(id);
    this.checkIfFavorite(id);
  }

  checkIfFavorite = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some(pokemon => pokemon.id === parseInt(id));
    this.setState({ isFavorite });
  };

  toggleFavorite = () => {
    const { pokemon, isFavorite } = this.state;
  
    if (!pokemon) {
      toast.error('Pokémon data not loaded yet!');
      return;
    }
  
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    if (isFavorite) {
      favorites = favorites.filter(fav => fav.id !== pokemon.id);
      toast.error(`${pokemon.name} removed from favorites!`);
    } else {
      favorites.push({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        type: pokemon.types[0].type.name
      });
      toast.success(`${pokemon.name} added to favorites!`);
    }
  
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.setState({ isFavorite: !isFavorite });
  };

  fetchPokemonData = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();

      const evolutionResponse = await fetch(data.species.url);
      const evolutionData = await evolutionResponse.json();
      const evolutionChainUrl = evolutionData.evolution_chain.url;
      const evolutionChainResponse = await fetch(evolutionChainUrl);
      const evolutionChainData = await evolutionChainResponse.json();

      this.setState({
        pokemon: {
          ...data,
          evolution: evolutionChainData.chain,
        },
        isLoading: false,
      });
    } catch (error) {
      this.setState({ error: 'Failed to load Pokémon details', isLoading: false });
    }
  };

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  renderContent = () => {
    const { activeTab, pokemon } = this.state;

    switch (activeTab) {
      case 'about':
        return (
          <AboutSection
            height={pokemon.height}
            weight={pokemon.weight}
            abilities={pokemon.abilities.map((a) => a.ability.name)}
            imageUrl={pokemon.sprites.front_default}
          />
        );
      case 'base':
        return <BaseStatsSection stats={pokemon.stats} />;
      case 'evolution':
        return <EvolutionSection evolutionData={pokemon.evolution} />;
      case 'moves':
        return <MovesSection moves={pokemon.moves} />;
      default:
        return null;
    }
  };

  render() {
    const { pokemon, isLoading, error, activeTab, isFavorite } = this.state;

    if (isLoading) {
      return( 
      <div className='l'><Loader/></div>
      );
    }

    if (error) {
      return <div className="pokemon-detail-error">{error}</div>;
    }

    return (
      <>
      {<Header/>}
      <ToastContainer />
        <div className="pokemon-detail-container">
          <div className="pokemon-detail-header">
            <h1 className="pokemon-detail-title">
              {pokemon.name}
              <button onClick={this.toggleFavorite} className="favorite-button" title="Toggle Favorite">
                {isFavorite ? <FaHeart color="red" size={20} /> : <FaRegHeart size={20} />}
              </button>
            </h1>
            <span className="pokemon-type-tag">{pokemon.types[0].type.name}</span>
          </div>

          <div className="pokemon-tab-menu">
            <button className={`pokemon-tab-button ${activeTab === 'about' ? 'active-tab' : ''}`} onClick={() => this.handleTabChange('about')}>ABOUT</button>
            <button className={`pokemon-tab-button ${activeTab === 'base' ? 'active-tab' : ''}`} onClick={() => this.handleTabChange('base')}>BASE STATS</button>
            <button className={`pokemon-tab-button ${activeTab === 'evolution' ? 'active-tab' : ''}`} onClick={() => this.handleTabChange('evolution')}>EVOLUTION</button>
            <button className={`pokemon-tab-button ${activeTab === 'moves' ? 'active-tab' : ''}`} onClick={() => this.handleTabChange('moves')}>MOVES</button>
          </div>

          <div className="pokemon-tab-content">
            {this.renderContent()}
          </div>
        </div>
        <div className="b">
          <Link to="/" className="back">Back to Pokémon Store</Link>
        </div>
      </>
    );
  }
}

export default PokemonInDetail;
