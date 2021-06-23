import axios from "axios";

const GET_HISTORY = "GET_HISTORY";

export const getHistory = (products) => {
  return { type: GET_HISTORY, products };
};

export const fetchOrderHistory = (id) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/viewOrder`, {
      userId: id,
    });
    dispatch(getHistory(data));
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_HISTORY:
      return action.products;
    default:
      return state;
  }
}
