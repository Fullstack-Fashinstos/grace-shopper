import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleProduct } from '../store/singleProduct'


class SingleProduct extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.fetchSingleProduct(this.props.match.params.productId)
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