import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";

const ADD_PRODUCT = "ADD_PRODUCT";

export const setProducts = (products) => {
  return { type: SET_PRODUCTS, products };
};

export const setNewProduct = (product) => {
  return { type: ADD_PRODUCT, product };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/products");
    dispatch(setProducts(data));
  };
};

export const addProduct = (product, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post("/api/products", product, {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    });

    dispatch(fetchProducts());
  };
};

const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;

    case ADD_PRODUCT:
      return [...state, action.products];

    default:
      return state;
  }
}
