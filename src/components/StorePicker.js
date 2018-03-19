import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = (e) => {
    e.preventDefault();  // Prevent form submit
    const storeName = this.myInput.value.value  // Get text from input
    this.props.history.push(`/store/${storeName}`);  // Change the path to /store/input
  }

  render() {
    return(
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" placeholder="Store Name" defaultValue={getFunName()} ref={this.myInput} required />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker