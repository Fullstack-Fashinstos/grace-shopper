import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct, sendEditProduct } from "../store/singleProduct";
import { addToCartThunk } from "../store/cart";

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      imageUrl: "",
      descrpition: "",
      price: "",
      stock: "",
      quantity: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.buildOptions = this.buildOptions.bind(this);
  }
  // const {description, imageUrl, name, price, stock} = this.props.singleProduct
  //     this.setState({
  //         description: description, imageUrl: imageUrl, name: name, price: price, stock: price
  //     })

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId);
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
        price: price,
        stock: stock,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.sendEditProduct(this.state);
  }

  handleChange(event) {
    //console.log(event.target.type)
    const name = event.target.name;
    const val = event.target.value;
    console.log('handle change', val)

    if (event.target.type === "select-one") {
      console.log('inside handlechange', val)
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
    //console.log(event.target)
    console.log(this.state.quantity)
    this.props.addToCart(productId, userId, Number(this.state.quantity))
    console.log("not yet implemented");
  }

  buildOptions() {
    const options = [];
    console.log(this.props.singleProduct.stock);
    for (let i = 0; i <= this.state.stock; ++i) {
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

    return (
      <div key={id}>
        Hello
        <h3>{name}</h3>
        <img src={imageUrl} width="300" height="300" />
        <p>{description}</p>
        <p>{price / 100}</p>
        <p>{stock}</p>
        <select type="select" onChange={this.handleChange}>
          {this.buildOptions()}
        </select>
        <button onClick={() => this.handleAdd(id, this.props.auth.id)}>Add To Cart</button>
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
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
    auth: state.auth
  };
};

const mapDispatch = (disptach) => {
  return {
    fetchSingleProduct: (id) => {
      disptach(fetchSingleProduct(id));
    },
    sendEditProduct: (product) => {
      disptach(sendEditProduct(product));
    },
    addToCart: (productId, userId, quantity) => {
      disptach(addToCartThunk(productId, userId, quantity))
    }
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
