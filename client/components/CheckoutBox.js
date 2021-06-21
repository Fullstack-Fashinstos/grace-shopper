import { connect } from "react-redux";
import { Link } from "react-router-dom";

import React, { Component } from "react";

export class CheckoutBox extends Component {
  render() {
    return (
      <div>
        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      </div>
    );
  }
}

export default CheckoutBox;
