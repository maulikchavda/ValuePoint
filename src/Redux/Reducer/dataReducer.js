import {
  FETCH_DATA,
  ADD_CART,
  FILTER_CATEGORY,
  DETAIL_PAGE,
  REMOVE_CART,
  ALL_PRODUCTS,
  SEARCH_PRODUCT,
  REMOVE_ITEM,
  EMPTY_CART,
  SORT_ITEMS,
} from "../Actions/actions";

const initialState = {
  dataItems: [],
  categoryItems: [],
  category: "",
  sortitem: "",
  filterItem: [],
  detailItem: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        dataItems: action.payload,
        categoryItems: action.payload,
      };
    case FILTER_CATEGORY:
      return {
        ...state,
        categoryItems: action.payload.dataItems,
      };
    case ALL_PRODUCTS: {
      return {
        ...state,
        categoryItems: action.payload.dataItems,
      };
    }
    case SEARCH_PRODUCT: {
      return {
        ...state,
        categoryItems: action.payload.dataItems,
      };
    }
    case EMPTY_CART: {
      return {
        ...state,
        filterItem: [],
      };
    }
    case SORT_ITEMS: {
      return {
        ...state,
        categoryItems: action.payload.dataItems,
        sortitem: action.payload.sortitem,
      };
    }

    case ADD_CART:
      const items = action.payload.dataItems;
      const existItem = state.filterItem.find(
        (item) => item.product_id === items.product_id
      );
      if (existItem) {
        const filterItems = state.filterItem.map((item) =>
          item.product_id === existItem.product_id ? items : item
        );
        return {
          ...state,
          filterItem: filterItems,
        };
      } else {
        return {
          ...state,
          filterItem: [...state.filterItem, action.payload.dataItems],
        };
      }

    case REMOVE_ITEM:
      const itemtoremove = action.payload.dataItems;
      const existItems = state.filterItem.find(
        (item) => item.product_id === itemtoremove.product_id
      );
      if (existItems) {
        const filterItems = state.filterItem.map((item) =>
          item.product_id === existItems.product_id ? itemtoremove : item
        );
        return {
          ...state,
          filterItem: filterItems,
        };
      } else {
        return {
          ...state,
          filterItem: [...state.filterItem, action.payload.dataItems],
        };
      }

    case REMOVE_CART:
      return {
        ...state,
        filterItem: action.payload.dataItems,
      };
    case DETAIL_PAGE: {
      return {
        ...state,
        detailItem: action.payload.dataItems,
      };
    }

    default:
      return state;
  }
};

export default Reducer;
