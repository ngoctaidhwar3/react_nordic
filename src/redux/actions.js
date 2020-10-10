import { batch } from "react-redux";
import { makeCateApi, makeSearchApi, makeProductDetailApi } from "../common/util";
import { GET_TOTAL_PRICE, GET_PRODUCT_DETAIL, CLOSE_MESSAGE_MODAL, GET_PRODUCT_BY_CATE, LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS, LOGOUT_SUCCESS, OPEN_MESSAGE_MODAL, SEARCH_PRODUCT, ADD_TO_CART, NEW_CART, GET_DUPLICATE_PRODUCT, GET_FILTER_PRODUCTS, GET_INDEX_OF_PRODUCTS_CHANGE, GET_UPDATE_CART } from "./types";
import { LOGIN_API } from "../common/constants"
export const loginStart = () => ({
    type: LOGIN_START
})

export const loginSuccess = (email, name) => ({
    type: LOGIN_SUCCESS,
    email,
    name
})
export const loginFail = () => ({
    type: LOGIN_FAIL
})

export const login = (username, password) => {

    return dispatch => {

        dispatch(loginStart()) // show spinner
        fetch(LOGIN_API, {
            method: 'PUT',
            body: JSON.stringify({ username, password }),
            headers: {
                "content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(json => {
                // success
                // { token}
                if (json.token) {
                    const name = json.name;
                    dispatch(loginSuccess(username, name));
                    localStorage.setItem('TOKEN', json.token)
                    localStorage.setItem('email', username)
                }
                else {
                    dispatch(loginFail());
                }

                // hoac  dispatch(loginFail());
            })
            .catch(err => {
                console.error(err);
                dispatch(loginFail());
            })

        // fail
    }
}


export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
})

export const logOut = () => {
    return dispatch => {
        // call api backend
        setTimeout(() => {
            // success
            localStorage.removeItem("email");
            localStorage.removeItem('TOKEN');
            dispatch(logoutSuccess())
        }, 2000)
    }
}

export const openMessageModal = (loading, message, msgType) => ({
    type: OPEN_MESSAGE_MODAL,
    loading,
    message,
    msgType
})

export const closeMessageModal = () => ({
    type: CLOSE_MESSAGE_MODAL
})


export const getProductsByCate = (cateSlug, page) => {

    return dispatch => {
        dispatch(openMessageModal(true));
        fetch(makeCateApi(cateSlug, page))
            .then(res => res.json())
            .then(json => {
                batch(() => {
                    dispatch({
                        type: GET_PRODUCT_BY_CATE,
                        cateSlug,
                        products: json.data,
                        product: undefined
                    })
                    dispatch(closeMessageModal());
                })

            })
            .catch(err => {
                console.error(err);
            })
    }
}

export const searchProducts = (query, page) => {
    return dispatch => {
        dispatch(openMessageModal(true));
        fetch(makeSearchApi(query, page))
            .then(res => res.json())
            .then(json => {
                batch(() => {
                    dispatch({
                        type: SEARCH_PRODUCT,
                        products: json.data,
                        searchKey: query,
                        product: undefined
                    })
                    dispatch(closeMessageModal());
                })

            })
            .catch(err => {
                console.error(err);
            })
    }
}
export const getProductDetail = (id) => {
    return dispatch => {
        dispatch(openMessageModal(true));
        fetch(makeProductDetailApi(id))
            .then((res) => res.json())
            .then(json => {
                batch(() => {
                    dispatch({
                        type: GET_PRODUCT_DETAIL,
                        product: json
                    })
                    dispatch(closeMessageModal())
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addToCart = (cartItem,dulicateProductId,quantity) => {
    return {
        type: ADD_TO_CART,
        cartItem,
        dulicateProductId,
        quantity
    }
}
export const getTotalPrice = (totalPrice) => {
    return {
        type: GET_TOTAL_PRICE,
        totalPrice
    }
}
export const getIndexOfProductChange=(indexOfProductChange,quantityChange)=>{
    return{
        type:GET_INDEX_OF_PRODUCTS_CHANGE,
        indexOfProductChange,
        quantityChange
    }
}
export const getNewCart=(cart)=>{
    return{
        type:NEW_CART,
       cart
    }
}
export const getDuplicateProductId=(dulicateProductId,quantity)=>{
   return{
       type:GET_DUPLICATE_PRODUCT,
       dulicateProductId,
       quantity
   }
}
export const getFilterProducts=(products)=>{
    return{
        type:GET_FILTER_PRODUCTS,
        products
    }
}
export const getUpdateCart=(indexOfProductChange,quantityChange)=>{
    return{
        type:GET_UPDATE_CART,
        indexOfProductChange,
        quantityChange
    }
}