import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCartThunk, deleteItemThunk } from "../store/cart";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.item.quantity,
      updatedQuantity: this.props.item.quantity,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleChange(event) {
    this.setState({
      quantity: Number(event.target.value),
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.props.auth.id) {
      this.props.updateQuantity(
        this.props.item.id,
        this.state.quantity,
        this.props.auth.id
      );
    } else {
      let currentCart = JSON.parse(window.localStorage.getItem("cart")) || {};
      currentCart[this.props.item.id] = this.state.quantity;
      window.localStorage.setItem("cart", JSON.stringify(currentCart));
    }
    this.setState({ updatedQuantity: this.state.quantity });
  }
  handleDelete(event) {
    event.preventDefault();
    if (this.props.auth.id) {
      this.props.deleteItem(this.props.item.id, this.props.auth.id);
    } else {
      let currentCart = JSON.parse(window.localStorage.getItem("cart")) || {};
      delete currentCart[this.props.item.id];
      window.localStorage.setItem("cart", JSON.stringify(currentCart));
      this.props.rerenderParentCallback();
    }
  }
  render() {
    const item = this.props.item;
    const quantArray = new Array(item.product.stock);
    quantArray.fill(1);
    return (
      <div>
        <img src={item.product.imageUrl} width="200px" />
        <h5>{item.product.name}</h5>
        <h5>{item.product.price / 100}</h5>
        <h5>{item.product.description}</h5>
        <h5>{this.state.updatedQuantity}</h5>
        <select name="quantity" onChange={this.handleChange}>
          {quantArray.map((element, index) => (
            <option value={index + 1} key={index}>
              {index + 1}
            </option>
          ))}
        </select>
        <button type="submit" onClick={this.handleSubmit}>
          Update
        </button>
        <button type="button" onClick={this.handleDelete}>
          Remove
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateQuantity: (id, quantity, userId) =>
      dispatch(updateCartThunk(id, quantity, userId)),
    deleteItem: (id, userId) => dispatch(deleteItemThunk(id, userId)),
  };
};

export default connect(mapState, mapDispatch)(CartItem);
