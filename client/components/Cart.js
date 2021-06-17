import React, { Component } from "react";
import { connect } from "react-redux";
import { getCartThunk } from "../store/cart";
import CartItem from "./CartItem";

class Cart extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    console.log(this.props.userId.id);
    this.props.getCartThunk(this.props.userId.id);
  }
  onChange() {

  }
  render() {
    const items = this.props.cart.order_products || []
    console.log(items);
    return (
    <div>
      {items.map((item) => {
        return <CartItem item={item} key={item.id}/>
      })}
    </div>);
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    userId: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCartThunk: (id) => dispatch(getCartThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
