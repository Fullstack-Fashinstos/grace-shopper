import axios from 'axios'

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

const setSingleProduct = (product) => {
    return {
        type: SET_SINGLE_PRODUCT,
        product
    }
}

const editProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        product
    }
}

export const fetchSingleProduct = (id) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch(setSingleProduct(data))
    }
}

export const sendEditProduct = (product) => {
    console.log(product, 'arg')
    return async (dispatch) => {
        const { data } = await axios.put(`/api/products${product.id}`)
        console.log(data, 'in thunk')
        dispatch(editProduct(data))
    }
}

export default function singleProduct (state = {}, action) {
    switch(action.type) {
        case SET_SINGLE_PRODUCT: {
            return action.product
        }
        case EDIT_PRODUCT: {
            return action.product
        }
        default: return state
    }
}