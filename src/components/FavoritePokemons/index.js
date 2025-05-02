import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import './index.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Loader from '../Loader';

class FavoritePokemons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    this.setState({ favorites: storedFavorites });
  }

  handleRemove = (id) => {

    const updatedFavorites = this.state.favorites.filter(p => p.id !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    toast.info(`removed from favorites!`);

    this.setState({ favorites: updatedFavorites });
  };

  render() {
    const { favorites } = this.state;

    return (
        <>
        <ToastContainer />
      <div className="favorite-page">
        <h1 className="favorite-title">❤️ Your Favorite Pokémon</h1>
        {favorites.length === 0 ? (
          <p className="no-favorites-text">No favorites added yet.</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((pokemon) => (
              <div key={pokemon.id} className="favorite-card">
                <button
                  className="remove-btn"
                  onClick={() => this.handleRemove(pokemon.id)}
                  title="Remove from favorites"
                >
                  <FaHeart />
                </button>
                <Link to={`/pokemon/${pokemon.id}`} className="card-content">
                    <div>
                  <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                  <h2 className="pokemon-name">{pokemon.name}</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="back-link-container">
          <Link to="/" className="back-link">← Back to Pokémon Store</Link>
        </div>
      </div>
      </>
    );
  }
}

export default FavoritePokemons;
