import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { checkoutCartThunk } from "../store/cart";

export class CheckoutBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
    this.handleCheckout = this.handleCheckout.bind(this);
    this.verifyStock = this.verifyStock.bind(this);
  }
  verifyStock() {
    let cart = [];
    if (this.props.userId) {
      cart = this.props.memberCart.order_products;
    } else {
      cart = this.props.visitorCart;
    }
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].quantity > cart[i].product.stock) {
        return false;
      }
    }
    return true;
  }
  handleCheckout(event) {
    if (this.verifyStock()) {
      if (this.props.userId) {
        this.props.checkoutCart(
          this.props.memberCart.order_products,
          this.props.userId
        );
      } else {
        this.props.checkoutCart(this.props.visitorCart, null);
        window.localStorage.setItem("cart", JSON.stringify({}));
      }
    } else {
      event.preventDefault();
      this.setState({
        warning: "Insufficient stock remaining. Cannot complete transaction.",
      });
    }
  }
  render() {
    return (
      <div>
        <Link to="/checkout">
          <button type="button" onClick={this.handleCheckout}>
            Checkout
          </button>
        </Link>
        <h5>{this.state.warning}</h5>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    memberCart: state.cart,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    checkoutCart: (products, userId) =>
      dispatch(checkoutCartThunk(products, userId)),
  };
};

export default connect(mapState, mapDispatch)(CheckoutBox);
