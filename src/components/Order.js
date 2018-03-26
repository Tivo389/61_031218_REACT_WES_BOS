import React from 'react';
import {formatPrice} from '../helpers';

class Order extends React.Component {

  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';  // APP.js => 03261501-01: Added 'fish &&' with this. Now, even if the 'fish' data is unavailable it will continue running.
    if(!fish) return null;  // 03261501-03: In order to prevent the line of code 'if the fish is unavailable' from flickering, we define a return statement here for 'if the fish doesn't exist'.
    if(!isAvailable) {
      return <li key={key}>Sorry {fish ? fish.name : 'fish' } is no longer available.</li>  // 03261501-02: However this means there is 'a duration until fish data is received' which will allow this line of code to 'flicker'.
    }
    return <li key={key}>{count} lbs {fish.name} {formatPrice(count * fish.price)}</li>
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((accumulator, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      return isAvailable ? accumulator+(count*fish.price) : accumulator;
    },0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>
        <div className="total">
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }

}

export default Order;