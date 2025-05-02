import React, { Component } from 'react'
import { TailSpin } from 'react-loader-spinner'
import ReactPaginate from 'react-paginate'


import PokemonCard from '../PokemonCard'
import SortOptions from '../SortOptions'
import Header from '../Header'
import './index.css'

class PokemonStore extends Component {
  state = {
    pokemons: [],
    isLoading: true,
    searchInput: '',
    filterType: 'All',
    types: [],
    currentPage: 0,
    itemsPerPage: 10,
    sortOrder : '',
    sortBy : '',
  }

  componentDidMount() {
    this.getPokemonData()
  }

  getPokemonData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      const data = await response.json()
      const detailedData = await Promise.all(
        data.results.map(async pokemon => {
          const res = await fetch(pokemon.url)
          return res.json()
        })
      )
      const typesSet = new Set()
      detailedData.forEach(p => p.types.forEach(t => typesSet.add(t.type.name)))
      this.setState({
        pokemons: detailedData,
        isLoading: false,
        types: ['All', ...Array.from(typesSet)],
      })
    } catch (error) {
      console.error('Error fetching Pokémon data:', error)
    }
  }

  onSearchChange = event => {
    this.setState({ searchInput: event.target.value, currentPage: 0 })
  }

  onFilterChange = event => {
    this.setState({ filterType: event.target.value, currentPage: 0 })
  }

  onItemsPerPageChange = event => {
    this.setState({ itemsPerPage: parseInt(event.target.value), currentPage: 0 })
  }

  handlePageClick = ({ selected }) => {
    this.setState({ currentPage: selected })
  }

  onSortOrderChange = event => {
    this.setState({ sortOrder: event.target.value, currentPage: 0 })
  }

  onSortChange = event => {
    this.setState({ sortBy: event.target.value, currentPage: 0 })
  }

  getFilteredPokemons = () => {
    const { pokemons, searchInput, filterType, sortOrder,sortBy } = this.state

      let filtered = pokemons.filter(pokemon => {
        const matchesName = pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
        const matchesType = filterType === 'All' || pokemon.types.some(t => t.type.name === filterType)
        return matchesName && matchesType
      })

      if (sortOrder === 'asc') {
        filtered.sort((a, b) => a.id - b.id)
      } else if (sortOrder === 'desc') {
        filtered.sort((a, b) => b.id - a.id)
      }else if (sortBy === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortBy === 'name-desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name))
      }

      return filtered
  }

  render() {
    const { isLoading, searchInput, filterType, types, currentPage, itemsPerPage } = this.state
    const filteredPokemons = this.getFilteredPokemons()

    const startIndex = currentPage * itemsPerPage
    const selectedPokemons = filteredPokemons.slice(startIndex, startIndex + itemsPerPage)
    const pageCount = Math.ceil(filteredPokemons.length / itemsPerPage)

    return (
      <>
      <Header/>
    <div className='bg-container'>
        <SortOptions
          onSortOrderChange={this.onSortOrderChange}
          onSortChange={this.onSortChange}
        />
      <div className="app-container">
        
        <div className="controls">
          <input
            type="search"
            placeholder="Search Pokémon"
            value={searchInput}
            onChange={this.onSearchChange}
            className="search-input"
          />

          <select value={filterType} onChange={this.onFilterChange} className="filter-dropdown">
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select value={itemsPerPage} onChange={this.onItemsPerPageChange} className="filter-dropdown">
            {[10, 20, 50].map(count => (
              <option key={count} value={count}>{count} / page</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="loader-container">
            <TailSpin height="50" width="50" color="#00BFFF" ariaLabel="loading" visible={true} />
          </div>
        ) : selectedPokemons.length === 0 ? (
          <p className="empty-message">No Pokémon found.</p>
        ) : (
          <>
            <div className="pokemon-list">
              {selectedPokemons.map(pokemon => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
            <ReactPaginate
              previousLabel={'← Previous'}
              nextLabel={'Next →'}
              pageCount={pageCount}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
            />
          </>
        )}
      </div>
    </div>
    </>
    )
  }
}

export default PokemonStore
