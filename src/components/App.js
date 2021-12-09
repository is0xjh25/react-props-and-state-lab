import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = event => {
    this.setState({
      filters: {
        ...this.state.filters,
        types: event.target.value
      }
    })
  }

  handleFindPetsClick = () => {
    let url= "";
    if (this.state.filters.type === "all") {
      url = "/api/pets";
    } else {
      url = `/api/pets?type=${this.state.filters.type}`;
    }
    return fetch(url)
    .then(res => res.json())
    .then(json => this.setState({pets: json}))
  }

  handleAdoptPet = (id) => {
    const index = this.state.pets.findIndex(x => x.id === id);
    const newPets = [...this.state.pets];
    newPets[index].isAdopted = true;
    this.setState({
      pets: newPets
      }      
    )
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleFindPetsClick}/>
            </div>
            <div className="twelve wide column" >
              <PetBrowser  pets={this.state.pet} onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
