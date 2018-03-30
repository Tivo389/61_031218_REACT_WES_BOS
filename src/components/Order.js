import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {

  static propTypes = {
    deleteOrder: PropTypes.func,
    fishes: PropTypes.object,
    order: PropTypes.object
  };

  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';  // APP.js => 03261501-01: Added 'fish &&' with this. Now, even if the 'fish' data is unavailable it will continue running.
    const transitionOptions = {
     classNames:"order",
     key,
     timeout: {enter:500, exit:500} // The 'timeout' attribute here is not referring to the duration of the css 'transition' but 'the duration of the element until it is removed from the DOM.'
    };
    if(!fish) return null;  // 03261501-03: In order to prevent the line of code 'if the fish is unavailable' from flickering, we define a return statement here for 'if the fish doesn't exist'.
    if(!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>Sorry {fish ? fish.name : 'fish' } is no longer available.</li>  {/*03261501-02: However this means there is 'a duration until fish data is received' which will allow this line of code to 'flicker'.*/}
        </CSSTransition>
      )
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              {/*'key' is {count} in order to make sure it makes; in this case 2 elements. The 'current count' and the 'next count'.*/}
              <CSSTransition classNames="count" key={count} timeout={{enter:500, exit:500}}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.deleteOrder(key)}>✕</button>
          </span>
        </li>
      </CSSTransition>
    )}

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
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }

}

export default Order;