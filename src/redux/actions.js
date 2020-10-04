import { batch } from "react-redux";
import { makeCateApi, makeSearchApi } from "../common/util";
import { CLOSE_MESSAGE_MODAL, GET_PRODUCT_BY_CATE, LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS, LOGOUT_SUCCESS, OPEN_MESSAGE_MODAL, SEARCH_PRODUCT } from "./types";
import {LOGIN_API} from "../common/constants"
export const loginStart = () => ({
    type: LOGIN_START
})

export const loginSuccess = (email,name) => ({
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
                   const name=json.name;
                   dispatch(loginSuccess(username,name));
                    localStorage.setItem('TOKEN', json.token)
                    localStorage.setItem('email',username)
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
        fetch(makeCateApi(cateSlug,page))
            .then(res => res.json())
            .then(json => {
                batch(() => {
                    dispatch({
                        type: GET_PRODUCT_BY_CATE,
                        cateSlug,
                        products: json.data
                    })
                    dispatch(closeMessageModal());
                })

            })
            .catch(err => {
                console.error(err);
            })
    }
}

export const searchProducts = (query, page)=>{
    return dispatch => {
        dispatch(openMessageModal(true));
        fetch(makeSearchApi(query, page))
            .then(res => res.json())
            .then(json => {
                batch(() => {
                    dispatch({
                        type: SEARCH_PRODUCT,
                        products: json.data
                    })
                    dispatch(closeMessageModal());
                })

            })
            .catch(err => {
                console.error(err);
            })
    } 
}
