import React, { Component } from "react";
import { connect } from "react-redux";
import { getCartThunk } from "../store/cart";

class Cart extends Component {
  componentDidMount() {
    console.log(this.props.userId.id);
    this.props.getCartThunk(this.props.userId.id);
  }
  render() {
    return <div>hi</div>;
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
