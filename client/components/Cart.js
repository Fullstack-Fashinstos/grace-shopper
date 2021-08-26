import React, { Component } from "react";
import { connect } from "react-redux";
import { getCartThunk } from "../store/cart";
import axios from "axios";
import CartItem from "./CartItem";
import CheckoutBox from "./CheckoutBox";
import { getVisitorCart } from "../store/cart";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      visitorCart: [],
    };
    this.fetchTheData = this.fetchTheData.bind(this);
  }

  fetchTheData() {
    if (this.props.userId.id) {
      this.props.getCartThunk(this.props.userId.id);
    } else {
      this.props.fetchGuestCart();
      this.setState({ visitorCart: this.props.cart });
    }
  }
  componentDidMount() {
    this.fetchTheData();
  }

  componentDidUpdate(prev) {
    if (prev.userId !== this.props.userId) {
      this.fetchTheData();
    }
  }

  render() {
    let items;
    if (this.props.userId.id) {
      items = this.props.cart.order_products || [];
    } else {
      if (Array.isArray(this.props.cart)) {
        items = this.props.cart;
      } else {
        items = [];
      }
    }
    return (
      <div>
        {items.length !== 0 && (
          <CheckoutBox visitorCart={this.state.visitorCart} />
        )}

        {items.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          items.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })
        )}
      </div>
    );
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
    fetchGuestCart: () => dispatch(getVisitorCart()),
    getCartThunk: (id) => dispatch(getCartThunk(id)),
    getSingleItem: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
