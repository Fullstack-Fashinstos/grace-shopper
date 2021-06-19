import axios from "axios";
import history from "../history";

const GET_CART = "GET_CART";

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

export const getCartThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${id}`);
      dispatch(getCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCartThunk = (productId, userId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/cart/${productId}/${userId}/${quantity}`);
      dispatch(getCartThunk(userId));
    } catch (error) {
      console.log(error);
    }
  }
}

export const updateCartThunk = (id, quantity, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/cart/${id}`, {quantity});
      dispatch(getCartThunk(userId));
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteItemThunk = (id, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/cart/${id}`);
      dispatch(getCartThunk(userId))
    } catch (error) {
      console.log(error);
    }
  }
}

export const transferCart = (userId) => async dispatch => {
  // Transers local cart to database on successful log in.
  const localCart = JSON.parse(window.localStorage.getItem('cart'));
  if (localCart) {
    const keys = Object.keys(localCart);
    for (let i = 0; i < keys.length; i++) {
      const { data } = await axios.post(`/api/cart/${keys[i]}/${userId}/${localCart[keys[i]]}`)
    }
    window.localStorage.removeItem('cart');
    dispatch(getCartThunk(userId));
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
