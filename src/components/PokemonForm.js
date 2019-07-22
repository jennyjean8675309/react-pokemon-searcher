import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleOnChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    let addedPokemon = {
        "name": `${this.state.name}`,  
        "stats": [
          { 0: null },
          { 1: null },
          { 2: null },
          { 3: null },
          { 4: null },
          {
            "value": `${this.state.hp}`,
            "name": "hp"
          }
        ],
        "sprites": {
          "front": `${this.state.frontUrl}`,
          "back": `${this.state.backUrl}`
        }
      }

    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, 
      body: JSON.stringify(addedPokemon)
    })
    .then(response => response.json())
    .then(newPokemon => this.props.addPokemon(newPokemon))
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={this.handleOnChange} />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={this.handleOnChange} />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={this.handleOnChange} />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={this.handleOnChange} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
