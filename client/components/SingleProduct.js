import React from "react";
import { connect } from "react-redux";
import {
  fetchSingleProduct,
  sendEditProduct,
  sendDeleteProduct,
} from "../store/singleProduct";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { addToCartThunk } from "../store/cart";

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      imageUrl: "",
      description: "",
      price: "",
      stock: "",
      quantity: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.buildOptions = this.buildOptions.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleProduct(
      this.props.match.params.productId,
      this.props.auth.isAdmin
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleProduct !== this.props.singleProduct) {
      const { id, description, imageUrl, name, price, stock } =
        this.props.singleProduct;
      this.setState({
        id: id,
        description: description,
        imageUrl: imageUrl,
        name: name,
        price: price / 100,
        stock: stock,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const currentState = this.state;
    let splitPrice = this.state.price.split(".");
    let currentPrice = 0;
    if (splitPrice.length === 1) {
      currentPrice = Number(splitPrice[0]) * 100;
    } else {
      currentPrice = Number(splitPrice[0]) * 100 + Number(splitPrice[1]);
    }
    currentState.price = currentPrice;
    this.props.sendEditProduct(currentState, this.props.auth);
  }

  handleChange(event) {
    const name = event.target.name;
    const val = event.target.value;

    if (name === "select") {
      this.setState({
        quantity: Number(val),
      });
    }
    if (event.target.type === "text") {
      if (name === "name") {
        this.setState({
          name: val,
        });
      }
      if (name === "price") {
        this.setState({
          price: val,
        });
      }
      if (name === "description") {
        this.setState({
          description: val,
        });
      }
      if (name === "stock") {
        this.setState({
          stock: val,
        });
      }
      if (name === "imageUrl") {
        this.setState({
          imageUrl: val,
        });
      }
    }
  }

  handleAdd(productId, userId) {
    if (!userId) {
      let currentCart = JSON.parse(window.localStorage.getItem("cart")) || {};
      if (currentCart[productId]) {
        currentCart[productId] += Number(this.state.quantity);
      } else {
        currentCart[productId] = Number(this.state.quantity);
      }
      window.localStorage.setItem("cart", JSON.stringify(currentCart));
    } else {
      this.props.addToCart(productId, userId, Number(this.state.quantity));
    }
  }

  handleDelete() {
    this.props.deleteProduct(this.props.singleProduct, this.props.auth);
    this.props.history.push(`/products`);
  }

  buildOptions() {
    const options = [];
    for (let i = 1; i <= this.state.stock; ++i) {
      options.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    if (!options.length) {
      options.push(
        <MenuItem key={1} value={1}>
          1
        </MenuItem>
      );
    }
    return options;
  }

  render() {
    const { id, description, imageUrl, name, price, stock } =
      this.props.singleProduct;
    const priceStr =
      String(price).slice(0, String(price).length - 2) +
      "." +
      String(price).slice(String(price).length - 2);
    const { isAdmin } = this.props.auth;
    return (
      <div id="singleProduct" key={id}>
        <img src={imageUrl} className="product-image" />
        <div className="product-details">
          <h3>{name}</h3>
          {description ? <p>{description}</p> : ""}
          {price ? <p>${priceStr}</p> : ""}
          {stock ? <p>{`In Stock`}</p> : "Out of Stock"}
          <FormControl variant="outlined" className="dropdown">
            <InputLabel id="quantity-label">Quantity</InputLabel>
            <Select
              name="select"
              onChange={this.handleChange}
              labelId="quantity-label"
              label="Quantity"
              value={this.state.quantity}
            >
              {this.buildOptions()}
            </Select>
          </FormControl>
          <br /><br />
          <Button
            onClick={() => this.handleAdd(id, this.props.auth.id)}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddShoppingCartIcon />}
          >
            Add To Cart
          </Button>
          {isAdmin ? (
            <div>
              <hr></hr>
              <form
                id="new-message-form"
                onSubmit={this.handleSubmit}
                className="centered-form"
              >
                <h5>Update This Product</h5>
                <div>
                  <TextField
                    onChange={this.handleChange}
                    type="text"
                    name="name"
                    label="Name"
                    value={this.state.name}
                    placeholder={name}
                  />
                  <TextField
                    onChange={this.handleChange}
                    type="text"
                    name="description"
                    label="Description"
                    value={this.state.description}
                    placeholder={description}
                  />
                  <TextField
                    onChange={this.handleChange}
                    type="text"
                    name="price"
                    label="Price ($)"
                    value={this.state.price}
                    placeholder={String(price)}
                  />
                  <TextField
                    onChange={this.handleChange}
                    type="text"
                    name="imageUrl"
                    label="Image URL"
                    value={this.state.imageUrl}
                    placeholder={imageUrl}
                  />
                  <TextField
                    onChange={this.handleChange}
                    type="text"
                    name="stock"
                    label="Current Stock"
                    value={this.state.stock}
                    placeholder={String(stock)}
                  />
                  <span className="input-group-btn">
                    <Button
                      className="btn btn-default"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={this.handleDelete}
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </span>
                </div>
              </form>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id, auth) => {
      dispatch(fetchSingleProduct(id, auth));
    },
    sendEditProduct: (product, user) => {
      dispatch(sendEditProduct(product, user));
    },
    addToCart: (productId, userId, quantity) => {
      dispatch(addToCartThunk(productId, userId, quantity));
    },
    deleteProduct: (product, user) => {
      dispatch(sendDeleteProduct(product, user));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
