import React from "react";
import { connect } from "react-redux";
import {
  fetchSingleProduct,
  sendEditProduct,
  sendDeleteProduct,
} from "../store/singleProduct";
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
      quantity: 0,
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
    this.props.sendEditProduct(this.state, this.props.auth);
  }

  handleChange(event) {
    const name = event.target.name;
    const val = event.target.value;

    if (event.target.type === "select-one") {
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
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  }

  render() {
    const { id, description, imageUrl, name, price, stock } =
      this.props.singleProduct;
    const { isAdmin } = this.props.auth;
    return (
      //this.props.singleProduct ?
      <div key={id}>
        Hello
        <h3>{name}</h3>
        <img src={imageUrl} width="300" height="300" />
        {description ? <p>{description}</p> : ""}
        {price ? <p>{price / 100}</p> : ""}
        {stock ? <p>{stock}</p> : ""}
        <select type="select" onChange={this.handleChange}>
          {this.buildOptions()}
        </select>
        <button onClick={() => this.handleAdd(id, this.props.auth.id)}>
          Add To Cart
        </button>
        {isAdmin ? (
          <div>
            <h4>ADMIN</h4>
            <form id="new-message-form" onSubmit={this.handleSubmit}>
              <div className="input-group input-group-lg">
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="name"
                  value={this.state.name}
                  placeholder={name}
                />
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="description"
                  value={this.state.description}
                  placeholder={description}
                />
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="price"
                  value={this.state.price}
                  placeholder={price}
                />
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="imageUrl"
                  value={this.state.imageUrl}
                  placeholder={imageUrl}
                />
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="stock"
                  value={this.state.stock}
                  placeholder={stock}
                />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    Submit
                  </button>
                </span>
              </div>
            </form>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        ) : (
          <div />
        )}
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
