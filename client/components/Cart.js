import React, { Component } from "react";
import { connect } from "react-redux";
import { getCartThunk } from "../store/cart";
import axios from "axios";
import CartItem from "./CartItem";
import CheckoutBox from "./CheckoutBox";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      visitorCart: [],
    };
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    this.visitorCartSetUp = this.visitorCartSetUp.bind(this);
    this.fetchTheData = this.fetchTheData.bind(this);
  }

  async visitorCartSetUp() {
    let visitorCartAlpha = [];
    const cart = JSON.parse(window.localStorage.getItem("cart")) || {};
    const keys = Object.keys(cart);
    for (let i = 0; i < keys.length; i++) {
      const { data } = await axios.get(`/api/products/${keys[i]}`);
      let itemObj = {};
      itemObj.product = data;
      itemObj.id = keys[i];
      itemObj.quantity = cart[keys[i]];
      visitorCartAlpha.push(itemObj);
    }
    this.setState({ visitorCart: visitorCartAlpha });
  }

  fetchTheData() {
    if (this.props.userId.id) {
      console.log("in first conditional");
      this.props.getCartThunk(this.props.userId.id);
    } else {
      this.visitorCartSetUp();
    }
  }
  async componentDidMount() {
    this.fetchTheData();
  }

  async componentDidUpdate(prev) {
    if (prev.userId !== this.props.userId) {
      this.fetchTheData();
    }
  }

  rerenderParentCallback() {
    this.visitorCartSetUp();
  }

  render() {
    let items;
    if (this.props.userId.id) {
      items = this.props.cart.order_products || [];
    } else {
      items = this.state.visitorCart;
    }
    return (
      <div>
        <CheckoutBox rerenderParentCallback={this.rerenderParentCallback} visitorCart={this.state.visitorCart} />
        {items.map((item) => {
          return (
            <CartItem
              rerenderParentCallback={this.rerenderParentCallback}
              item={item}
              key={item.id}
            />
          );
        })}
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
    getCartThunk: (id) => dispatch(getCartThunk(id)),
    getSingleItem: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
