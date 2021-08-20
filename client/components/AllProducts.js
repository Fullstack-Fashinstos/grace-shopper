import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { fetchProducts, addProduct } from "../store/products";
import ProductCard from "./ProductCard";

export class AllProducts extends React.Component {
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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProduct({ ...this.state });
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { products } = this.props;
    const { id, description, imageUrl, name, price, stock } = products;
    const { isAdmin } = this.props.auth;
    return (
      <div className="productList">
        {isAdmin ? (
          <div className="flex">
            <form onSubmit={this.handleSubmit} className="centered-form">
              <h5>Add a New Product</h5>
              <TextField
                className="product-form"
                type="text"
                name="name"
                value={this.state.name}
                label="Name"
                onChange={this.handleChange}
              />
              <TextField
                className="product-form"
                type="text"
                name="description"
                value={this.state.description}
                label="Description"
                onChange={this.handleChange}
              />
              <TextField
                className="product-form"
                type="text"
                name="price"
                value={this.state.price}
                label="Price"
                onChange={this.handleChange}
              />
              <TextField
                className="product-form"
                type="text"
                name="imageUrl"
                value={this.state.imageUrl}
                label="Image Url"
                onChange={this.handleChange}
              />
              <TextField
                className="product-form"
                type="text"
                name="stock"
                value={this.state.stock}
                label="Stock"
                onChange={this.handleChange}
              />
              <div>
                <Button type="submit" variant="contained" color="primary">Add Item</Button>
              </div>
            </form>
          </div>
        ) : (
          <div />
        )}
        <div className="flex">
          {products.length > 0
            ? products.map((product, index) => {
                return (
                  <ProductCard product={product} key={product.id} />
                );
              })
            : "No products in database."}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({ products: state.products, auth: state.auth });

const mapDispatch = (dispatch, { history }) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  createProduct: (product) => dispatch(addProduct(product, history)),
});

export default connect(mapState, mapDispatch)(AllProducts);
