import * as actionTypes from './actionTypes';
import Cookies from 'js-cookie'

export const registerSuccess = (response) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        token: response.jwt,
        user: response.user,
    }
}

export const registerFail = () => {
    return {
        type: actionTypes.REGISTER_FAIL,
    }
}

export const loadUser = (response) => {
    return {
        type: actionTypes.LOAD_USER,
        user: response,
        token: Cookies.get('token')
    }
}

export const loginSuccess = (response) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: response.jwt,
        user: response.user,
    }
}

export const loginFail = () => {
    return {
        type: actionTypes.LOGIN_FAIL,
    }
}

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
    }
}