import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, addProduct } from "../store/products";

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
    // this.setState({
    //     id: id,
    //     name: name,
    //     description: description,
    //     imageUrl: imageUrl,
    //     price: price,
    //     stock: stock,
    //   });
  }

  componentDidMount() {
    //thunk goes here
    this.props.fetchProducts();
  }

  render() {
    const { products } = this.props;
    const { id, description, imageUrl, name, price, stock } = products;
    const { isAdmin } = this.props.auth;
    return (
      <div className="productList">
        {isAdmin ? (
          <form onSubmit={this.handleSubmit}>
            <input
              className="product-form"
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Name"
              onChange={this.handleChange}
            />
            <input
              className="product-form"
              type="text"
              name="description"
              value={this.state.description}
              placeholder="Description"
              onChange={this.handleChange}
            />
            <input
              className="product-form"
              type="text"
              name="price"
              value={this.state.price}
              placeholder="Price"
              onChange={this.handleChange}
            />
            <input
              className="product-form"
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              placeholder="Image Url"
              onChange={this.handleChange}
            />
            <input
              className="product-form"
              type="text"
              name="stock"
              value={this.state.stock}
              placeholder="Stock"
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div />
        )}
        <div className="flex">
          {products.length > 0
            ? products.map((product, index) => {
                console.log(index);
                return (
                  <div className="flex-item" key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      <img src={product.imageUrl} width="250" height="250" />
                      <br />
                      <p>{product.name.toUpperCase()}</p>
                    </Link>
                  </div>
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
