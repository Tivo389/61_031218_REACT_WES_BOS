import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = (e) => {
    e.preventDefault();  // Prevent form submit
    console.log(this);  // Get text from input
    // CONTINUE HERE  // Change the page to /store/input
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