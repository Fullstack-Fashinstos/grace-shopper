import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { checkoutCartThunk } from "../store/cart";
import axios from 'axios';


export class CheckoutBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: ''
    }
    this.handleCheckout = this.handleCheckout.bind(this);
    // this.verifyStock = this.verifyStock.bind(this);
  }
  // async verifyStock() {
  //   let cartProducts = [];
  //   if (this.props.userId) {
  //     cartProducts = this.props.memberCart.order_products;
  //   } else {
  //     cartProducts = this.props.visitorCart.order_products;
  //   }
  //   for (let i = 0; i < cartProducts.length; i++) {
  //     console.log('cart products', cartProducts[i]);
  //     let { data : currentItem } = await axios.get(`/api/products/${cartProducts[i].product.id}`);
  //     console.log('check stock')
  //     console.log(currentItem.stock)
  //     console.log(cartProducts[i].quantity)
  //     if (currentItem.stock < cartProducts[i].quantity) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
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
