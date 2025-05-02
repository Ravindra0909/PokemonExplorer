import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="pokemon-header">
    <h1 className="app-logo">
      Pokémon <span className="highlight">Explorer</span>
    </h1>
    <ul className="nav-items">
      <li><Link to="/" className="nav-link">Home</Link></li>
      <li><Link to="/favorites" className="nav-link">Favorites</Link></li>
    </ul>
  </nav>
)

export default Header
