import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCartThunk, deleteItemThunk } from "../store/cart";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.item.quantity
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleChange(event) {
    this.setState({
      quantity: Number(event.target.value)
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateQuantity(this.props.item.id, this.state.quantity, this.props.auth.id);
    console.log(this.state.quantity)
  }
  handleDelete(event) {
    event.preventDefault();
    console.log(this.props.item.id)
    this.props.deleteItem(this.props.item.id, this.props.auth.id);
    console.log('handle delete invoked')
  }
  render() {
    const item = this.props.item;
    const quantArray = new Array(item.product.stock);
    quantArray.fill(1);
    return (
      <div>
        <img src={item.product.imageUrl} width="200px"/>
        <h5>{item.product.name}</h5>
        <h5>{item.product.price / 100}</h5>
        <h5>{item.product.description}</h5>
        <h5>{item.quantity}</h5>
        <select name="quantity" onChange={this.handleChange}>
          {
            quantArray.map((element, index) => <option value={index + 1} key={index}>{index + 1}</option>)
          }
        </select>
        <button type="submit" onClick={this.handleSubmit}>Update</button>
        <button type="button" onClick={this.handleDelete}>Remove</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateQuantity: (id, quantity, userId) => dispatch(updateCartThunk(id, quantity, userId)),
    deleteItem: (id, userId) => dispatch(deleteItemThunk(id, userId))
  };
};

export default connect(mapState, mapDispatch)(CartItem);



