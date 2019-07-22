import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const pokemonUrl = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
      allPokemon: [],
      searchString: '',
      filteredPokemon: []
    }
  }

  componentDidMount() {
    fetch(pokemonUrl)
    .then(response => response.json())
    .then(result => this.setState({
      allPokemon: result
    })
    )
  }

  handleSearchChange = (e, { value }) => {
    this.setState({
      searchString: value 
    })
    this.showFilteredPokemon()
  }

  showFilteredPokemon = () => {
    let filteredPokemon = this.state.allPokemon.filter(pokemon => {
      return pokemon.name.includes(this.state.searchString)
    })
    this.setState({
      filteredPokemon: filteredPokemon
    })
  }

  addPokemon = (newPokemon) => {
    console.log(newPokemon)
    this.setState({
      allPokemon: [...this.state.allPokemon, newPokemon]
    })
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce((e, { value }) => this.handleSearchChange(e, { value }), 500)} showNoResults={false} />
        <br />
        <PokemonCollection allPokemon={this.state.searchString ? this.state.filteredPokemon : this.state.allPokemon} />
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
      </div>
    )
  }
}

export default PokemonPage
