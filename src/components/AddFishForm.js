import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {

  static propTypes = {
    addFish: PropTypes.func
  }

  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (e) => {
    e.preventDefault();
    const fish = {
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value
    };
    this.props.addFish(fish);
    e.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" type="text" placeholder="Name" ref={this.nameRef} />
        <input name="price" type="text" placeholder="Price" ref={this.priceRef} />
        <select name="status" ref={this.statusRef} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea name="desc" type="text" placeholder="Desc" ref={this.descRef} />
        <input name="image" type="text" placeholder="Image" ref={this.imageRef} />
        <button type="submit">+ Add Fish</button>
      </form>
    )
  }
}

export default AddFishForm;