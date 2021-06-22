import axios from "axios";
import { fetchProducts } from "./products";

const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};

const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product,
  };
};

// const deleteProduct = (product) => {
//   return {
//     type: DELETE_PRODUCT,
//     product,
//     user
//   };
// };

export const fetchSingleProduct = (id, auth) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/api/products/${id}`, { 
            headers: {
                admin: auth
            }
        })
        dispatch(setSingleProduct(data))
    }
}

export const sendEditProduct = (product, user) => {
  return async (dispatch) => {
    await axios.put(`/api/products/${product.id}`, { product, user });
    dispatch(editProduct(product));
  };
};

export const sendDeleteProduct = (product, user) => {
    console.log(user)
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/products/${product.id}`, {
        headers: {
            admin: user.isAdmin
        }
    });
    dispatch(fetchProducts());
    
    //dispatch(deleteProduct(data))
  };
};

export default function singleProduct(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT: {
      return action.product;
    }
    case EDIT_PRODUCT: {
      return action.product;
    }
    case DELETE_PRODUCT: {
      return !action.product;
    }
    default:
      return state;
  }
}
