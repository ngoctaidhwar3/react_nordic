import {
  ADD_TO_CART,
  CLOSE_MESSAGE_MODAL,
  GET_PRODUCT_BY_CATE,
  GET_PRODUCT_DETAIL,
  GET_TOTAL_PRICE,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  OPEN_MESSAGE_MODAL,
  SEARCH_PRODUCT,
  NEW_CART,
  GET_DUPLICATE_PRODUCT,
  GET_FILTER_PRODUCTS,
  GET_INDEX_OF_PRODUCTS_CHANGE,
  GET_UPDATE_CART,
} from "./types";

const initialState = {
  email: localStorage.getItem("email"), // token
  startLogin: false,
  loginFail: false,
  name: undefined,
  messageModal: {
    open: false,
    loading: false,
    message: "",
    msgType: "info",
  },
  product: undefined,
  products: undefined,
  searchKey: undefined,
  cart: [],
  dulicateProductId: -1,
  totalPrice: undefined,
  quantity: undefined,
  indexOfProductChange: undefined,
  quantityChange: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START: {
      return { ...state, startLogin: true };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        email: action.email,
        startLogin: false,
        name: action.name,
      };
    }
    case LOGIN_FAIL: {
      return { ...state, loginFail: true, startLogin: false };
    }
    case LOGOUT_SUCCESS: {
      return { ...state, email: undefined, loginFail: false };
    }
    case OPEN_MESSAGE_MODAL: {
      return {
        ...state,
        messageModal: {
          ...state.messageModal,
          open: true,
          loading: action.loading,
          message: action.message,
          msgType: action.msgType,
        },
      };
    }
    case CLOSE_MESSAGE_MODAL: {
      return { ...state, messageModal: { ...state.messageModal, open: false } };
    }
    case GET_PRODUCT_BY_CATE: {
      return { ...state, cateSlug: action.cateSlug, products: action.products };
    }
    case SEARCH_PRODUCT: {
      return {
        ...state,
        products: action.products,
        searchKey: action.searchKey,
      };
    }
    case GET_FILTER_PRODUCTS: {
      return { ...state, products: action.products };
    }
    case GET_PRODUCT_DETAIL: {
      return { ...state, product: action.product };
    }
    case GET_DUPLICATE_PRODUCT: {
      return {
        ...state,
        dulicateProductId: action.dulicateProductId,
        quantity: action.quantity,
      };
    }
    case ADD_TO_CART: {
      const { cart, dulicateProductId, quantity } = state;
      if (dulicateProductId > -1) {
        cart[dulicateProductId].quantity += quantity;
      } else {
        cart.push(action.cartItem);
      }

      return {
        ...state,
        cart: [...cart],
        dulicateProductId: action.dulicateProductId,
        quantity: action.quantity,
      };
    }
    case GET_TOTAL_PRICE: {
      return { ...state, totalPrice: action.totalPrice };
    }
    case GET_INDEX_OF_PRODUCTS_CHANGE: {
      return {
        ...state,
        indexOfProductChange: action.indexOfProductChange,
        quantityChange: action.quantityChange,
      };
    }
    case NEW_CART: {
      return {
        ...state,
       cart:action.cart
      };
    }
    case GET_UPDATE_CART: {
        const { cart, indexOfProductChange, quantityChange } = state;
        if (indexOfProductChange > -1)
          cart[indexOfProductChange].quantity = quantityChange;
        return {
          ...state,
          indexOfProductChange: action.indexOfProductChange,
          quantityChange: action.quantityChange,
        };
      }
    default:
      return state;
  }
};

export default reducer;
