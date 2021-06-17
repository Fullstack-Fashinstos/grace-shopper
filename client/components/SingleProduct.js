import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleProduct } from '../store/singleProduct'


class SingleProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            imageUrl: '',
            descrpition: '',
            price: '',
            stock: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.fetchSingleProduct(this.props.match.params.productId)
        //const {description, imageUrl, name, price, stock} = this.props.singleProduct
        //console.log(description)
        // this.setState({
        //     name: name,
        //     imageUrl: imageUrl,
        //     description: description,
        //     price: price,
        //     stock: stock

        // })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state)
    }

    handleChange(event) {
        
        const type = event.target.name
        const val = event.target.value
        console.log(val)
        if(type === 'name') {
            this.setState({
                name: val
            })
        }
        if(type === 'price') {
            this.setState({
                price: val
            })
        }
        if(type === 'description') {
            this.setState({
                description: val
            })
        }
        if(type === 'stock') {
            this.setState({
                stock: val
            })
        }
        if(type === 'imageUrl') {
            this.setState({
                imageUrl: val
            })
        }
    }

    render() {
        const { id, description, imageUrl, name, price, stock} = this.props.singleProduct
        return (
            <div key={id}>Hello
                <h3>{name}</h3>
                <img src={imageUrl} />
                <p>{description}</p>
                <p>{price}</p>
                <p>{stock}</p>

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
        )
    }
}

const mapState = (state) => {
    return {
        singleProduct: state.singleProduct
    }
}

const mapDispatch = (disptach) => {
    return {
        fetchSingleProduct: (id) => {disptach(fetchSingleProduct(id))}
    }
}

export default connect(mapState, mapDispatch)(SingleProduct)