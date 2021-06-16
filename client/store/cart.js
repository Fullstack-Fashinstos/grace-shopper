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
  const idObj = {
    userId: id,
  };
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/cart", idObj);
      dispatch(getCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
