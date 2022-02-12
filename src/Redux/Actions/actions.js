import axios from "axios";

export const FETCH_DATA = "FETCH_DATA";
export const ADD_CART = "ADD_CART";
export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const DETAIL_PAGE = "DETAIL_PAGE";
export const REMOVE_CART = "REMOVE_CART";
export const ALL_PRODUCTS = "ALL_PRODUCTS";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const EMPTY_CART = "EMPTY_CART";
export const SORT_ITEMS = "SORT_ITEMS";

// Fetching Data from JSON

export const fetchData = (data) => {
  return {
    type: FETCH_DATA,
    payload: data,
  };
};
export const fetchApiData = () => {
  return (dispatch) => {
    axios.get("data.json").then((res) => {
      dispatch(fetchData(res.data.products));
    });
  };
};

// Making Cart Empty after checkout

export const emptyCart = () => (dispatch) => {
  dispatch({
    type: EMPTY_CART,
  });
};

// Filtering products by category

export const filterProducts = (products, category) => (dispatch) => {
  dispatch({
    type: FILTER_CATEGORY,
    payload: {
      dataItems: category
        ? products.filter((x) => x.product_category === category)
        : products,
    },
  });
};

// Sorting Items By Price

export const sortItems = (items, sortitem) => (dispatch) => {
  const products = items.slice();
  if (sortitem !== "") {
    products.sort((a, b) =>
      sortitem === "lowestprice"
        ? a.product_price > b.product_price
          ? 1
          : -1
        : a.product_price < b.product_price
        ? 1
        : -1
    );
  } else {
    products.sort((a, b) => (a.product_id > b.product_id ? 1 : -1));
  }
  dispatch({
    type: SORT_ITEMS,
    payload: {
      sortitem: sortitem,
      dataItems: products,
    },
  });
};

// If User wants to see All the products without filter

export const allProducts = (products) => (dispatch) => {
  dispatch({
    type: ALL_PRODUCTS,
    payload: {
      dataItems: products,
    },
  });
};

// Filtering Product by Search

export const searchProducts = (products, search) => (dispatch) => {
  const item = products.filter((x) =>
    x.product_name.toLowerCase().includes(search)
  );
  dispatch({
    type: SEARCH_PRODUCT,
    payload: {
      dataItems: search ? item : products,
    },
  });
};

// Adding and Incrementing Item to Cart and Handling Item quantity

export const addtoCart = (products, id) => (dispatch) => {
  const item = products.find((val) => val.product_id === id);
  item.qty += 1;
  dispatch({
    type: ADD_CART,
    payload: {
      dataItems: item,
    },
  });
};

// Decrementing Item from Cart and Handling Item quantity

export const removefromCart = (products, id) => (dispatch) => {
  const item = products.find((val) => val.product_id === id);
  item.qty -= 1;
  dispatch({
    type: REMOVE_ITEM,
    payload: {
      dataItems: item,
    },
  });
};

// Removing Specific Item from  Cart Page

export const removeCart = (products, id) => (dispatch) => {
  dispatch({
    type: REMOVE_CART,
    payload: {
      dataItems: id
        ? products.filter((val) => val.product_id !== id)
        : products,
    },
  });
};

// Detail Page

export const detailPage = (products, id) => (dispatch) => {
  dispatch({
    type: DETAIL_PAGE,
    payload: {
      dataItems: products.filter((val) => val.product_id === id),
    },
  });
};
