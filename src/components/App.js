import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

  static propTypes = {
    match: PropTypes.object
  };

  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = JSON.parse(localStorage.getItem(params.storeId)) || {};
    this.ref = base.syncState(`${params.storeId}/fishes`, {  // Note that this 'ref' is unrelated to 'React refs', it's a 'Firebase refs'.
      context: this,
      state: "fishes"
    });
    // At this point the state of 'fishes' is not loaded yet since its transferring the data from Firebase.
    // Local storage is already trying to access the fish.state which results in an error. GOTO ==> Order.js => 03261501-01
    if(localStorageRef) {
      this.setState({
        order: localStorageRef
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {                       // C - CREATE
    const fishes = {...this.state.fishes};    // 01: Take a copy of the existing state we are updating.
    fishes[`fish${Date.now()}`] = fish;       // 02: Add the new object to that state.
    this.setState({                           // 03: Update the state.
      fishes: fishes
    });
  };

  updateFish = (key, updateFish) => {         // U - UPDATE
    const fishes = {...this.state.fishes};    // 01: Take a copy of the existing state we are updating.
    fishes[key] = updateFish;                 // 02: Update the state
    this.setState({                           // 03: Set the state
      fishes: fishes
    });
  };

  deleteFish = (key) => {                     // D - DELETE
    const fishes = {...this.state.fishes};
    fishes[key] = null; // If you want to update Firebase the value must be null.
    this.setState({
      fishes: fishes
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = (key) => {
    const order = {...this.state.order};    // 01: Take a copy of the existing state we are updating.
    order[key] = order[key] + 1 || 1;       // 02: Get the integer or assign-default of 1.
    this.setState({                         // 03: Update the state.
      order: order
    });
  };

  deleteOrder = (key) => {
    const order = {...this.state.order};
    // order[key] = null; // If you want to update Firebase the value must be null. Problem: the li will stay with this method.
    delete order[key]; // If you want to update Firebase the value must be null.
    this.setState({
      order: order
    })
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market!" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          deleteOrder={this.deleteOrder}
          fishes={this.state.fishes}
          order={this.state.order}
        />
        <Inventory
          deleteFish={this.deleteFish}
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

export default App;