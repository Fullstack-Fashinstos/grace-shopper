import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  updateCartThunk,
  deleteItemThunk,
  updateVisitorCart,
  deleteVisitorItem,
} from "../store/cart";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const styles = {
  button: {
    marginLeft: 5,
  },
  container: {
    display: "flex",
    width: "80%",
    minWidth: 500,
    marginBottom: 5,
  },
};

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
      this.props.updateVisitorCart(this.props.item.id, this.state.quantity);
    }
    this.setState({ updatedQuantity: this.state.quantity });
  }
  handleDelete(event) {
    event.preventDefault();
    if (this.props.auth.id) {
      this.props.deleteItem(this.props.item.id, this.props.auth.id);
    } else {
      this.props.deleteVisitorItem(this.props.item.id);
    }
  }
  render() {
    const item = this.props.item;
    const quantArray = new Array(item.product.stock);
    quantArray.fill(1);
    return (
      <div id="checkoutItemContainer">
        <Card style={{ ...styles.container }}>
          <img src={item.product.imageUrl} width="200px" />
          <CardContent>
            <h5>{item.product.name}</h5>
            <p>{item.product.description}</p>
            <p>${item.product.price / 100}</p>
            <p>Quantity : {this.state.updatedQuantity}</p>

            <FormControl variant="outlined" className="dropdown">
              <InputLabel id="quantity-label">Quantity</InputLabel>
              <Select
                name="select"
                onChange={this.handleChange}
                labelId="quantity-label"
                label="Quantity"
              >
                {quantArray.map((element, index) => (
                  <MenuItem value={index + 1} key={index}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
              size="small"
              style={{ ...styles.button }}
            >
              Update
            </Button>
            <Button
              onClick={this.handleDelete}
              variant="contained"
              color="primary"
              size="small"
              style={{ ...styles.button }}
            >
              Remove
            </Button>
          </CardContent>
        </Card>
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
    updateVisitorCart: (itemId, quantity) =>
      dispatch(updateVisitorCart(itemId, quantity)),
    updateQuantity: (id, quantity, userId) =>
      dispatch(updateCartThunk(id, quantity, userId)),
    deleteItem: (id, userId) => dispatch(deleteItemThunk(id, userId)),
    deleteVisitorItem: (itemId) => dispatch(deleteVisitorItem(itemId)),
  };
};

export default connect(mapState, mapDispatch)(CartItem);
