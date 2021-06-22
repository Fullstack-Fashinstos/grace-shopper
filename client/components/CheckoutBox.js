import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { checkoutCartThunk } from "../store/cart";


export class CheckoutBox extends Component {
  constructor(props) {
    super(props);
    this.handleCheckout = this.handleCheckout.bind(this);
  }
  handleCheckout() {
    if (this.props.userId) {
      this.props.checkoutCart(this.props.memberCart.order_products, this.props.userId);
    } else {
      this.props.checkoutCart(this.props.visitorCart.order_products, null);
      window.localStorage.setItem("cart", JSON.stringify({}))
      this.props.rerenderParentCallback();
    }
  }
  render() {
    return (
      <div>
        <Link to="/checkout">

          <button type="button" onClick={this.handleCheckout}>Checkout</button>
        </Link>
        <h5>{this.state.warning}</h5>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    memberCart: state.cart,
    userId: state.auth.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    checkoutCart: (products, userId) => dispatch(checkoutCartThunk(products, userId))
  }
}

export default connect(mapState, mapDispatch)(CheckoutBox);
