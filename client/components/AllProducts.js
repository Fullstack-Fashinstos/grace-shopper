import React from "react"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchProducts, addProduct} from '../store/products'

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
        this.setState({
            id: id,
            name: name,
            description: description,
            imageUrl: imageUrl,
            price: price,
            stock: stock,
          });
     }


    componentDidMount() {
        //thunk goes here
        this.props.fetchProducts();
    }

    render() {
        const { products } = this.props;
        const { id, description, imageUrl, name, price, stock } =
        products;
        return (
            <div className="productList">
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
              <button type="submit">
                Submit
              </button>
              </form>
                {products.length > 0 ? products.map((product) => {
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
     createProduct: (product) => dispatch(addProduct(product, history)),
   });

export default connect(mapState, mapDispatch)(AllProducts);
