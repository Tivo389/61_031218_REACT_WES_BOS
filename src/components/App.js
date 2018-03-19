import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  addFish = (fish) => {
    // 01: Take a copy of the existing state we are updating.
    const fishes = { ...this.state.fishes };
    // 02: Add the new object to that state.
    fishes[`fish${Date.now()}`] = fish;
    // 03: Update the state.
    this.setState({
      fishes: fishes
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline='Fresh Seafood Market!' />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
}

export default App;