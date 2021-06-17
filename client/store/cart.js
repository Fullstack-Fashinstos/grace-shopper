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

export default function (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
