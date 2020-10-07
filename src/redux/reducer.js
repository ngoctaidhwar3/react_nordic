import {ADD_TO_CART, CLOSE_MESSAGE_MODAL, GET_PRODUCT_BY_CATE, GET_PRODUCT_DETAIL, GET_TOTAL_PRICE, LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS, LOGOUT_SUCCESS, OPEN_MESSAGE_MODAL, SEARCH_PRODUCT } from "./types";

const initialState = {
    email: localStorage.getItem('email'), // token
    startLogin: false,
    loginFail: false,
    name:undefined,
    messageModal: {
        open: false,
        loading: false,
        message: '',
        msgType: 'info'
    },
    product:undefined,
    products: undefined,
    searchKey:undefined,
    cart:[],
    totalPrice:0
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case LOGIN_START: {
            return {...state, startLogin: true}
        }
        case LOGIN_SUCCESS: {
            return {...state, email: action.email, startLogin: false,name:action.name}
        }
        case LOGIN_FAIL: {
            return {...state, loginFail: true,startLogin:false}
        }
        case LOGOUT_SUCCESS: {
            return {...state, email: undefined,loginFail:false}
        }
        case OPEN_MESSAGE_MODAL: {
            return {...state, messageModal: {...state.messageModal, open: true, loading: action.loading, message: action.message, msgType: action.msgType}}
        }
        case CLOSE_MESSAGE_MODAL: {
            return {...state, messageModal: {...state.messageModal, open: false}}
        }
        case GET_PRODUCT_BY_CATE: {
            return {...state, cateSlug: action.cateSlug, products: action.products}
        }
        case SEARCH_PRODUCT: {
            return {...state, products: action.products,searchKey:action.searchKey}
        }
        case GET_PRODUCT_DETAIL:{
            return{...state,product:action.product}
        }
        case ADD_TO_CART:{
            const {cart}=state;
            cart.push(action.cartItem);
            return{...state,cart:[...cart]}
        }
        case GET_TOTAL_PRICE:{
            return{...state,totalPrice:action.totalPrice}
        }
        default : return state;
    }
}

export default reducer;