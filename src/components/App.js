import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.storeId}/fishes`, {  // Note that this 'ref' is unrelated to 'React refs', it's a 'Firebase refs'.
      context: this,
      state: "fishes"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    console.log('unmounted!');
  }

  addFish = (fish) => {
    const fishes = {...this.state.fishes};    // 01: Take a copy of the existing state we are updating.
    fishes[`fish${Date.now()}`] = fish;       // 02: Add the new object to that state.
    this.setState({                           // 03: Update the state.
      fishes: fishes
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    const order = {...this.state.order};    // 01: Take a copy of the existing state we are updating.
    order[key] = order[key] + 1 || 1;       // 02: Get the integer or assign-default of 1.
    this.setState({                         // 03: Update the state.
      order: order
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline='Fresh Seafood Market!' />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    )
  }
}

export default App;