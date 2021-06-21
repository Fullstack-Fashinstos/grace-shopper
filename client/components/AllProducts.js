import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/products";

export class AllProducts extends React.Component {
  componentDidMount() {
    //thunk goes here
    this.props.fetchProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <div className="productList">
        {products.length > 0
          ? products.map((product) => {
              return (
                <div key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <div>{product.name}</div>
                  </Link>
                  <img src={product.imageUrl} width="300" height="300" />
                </div>
              );
            })
          : "No products in database."}
      </div>
    );
  }
}

const mapState = (state) => ({ products: state.products });

const mapDispatch = (dispatch, { history }) => ({
  fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);
