import { login } from '../../api/auth_api';
import axios from '../../api/axios';
import jwt_decode from "jwt-decode";

import * as actionTypes from './action-types';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userID, firstName, lastName, userType,userEmail) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: userID,
        firstName: firstName,
        lastName: lastName,
        userType: userType,
        userEmail: userEmail
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const updateError = (newError) => {
    localStorage.setItem('error', newError);  

    return {
        type: actionTypes.UPDATE_ERROR,
        error: newError,      
    }
}



export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('profilePic');
    delete axios.defaults.headers.common['Authorization'];

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, onLogin = () => { }) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        console.log(authData);
        login(authData).then(result => {
            console.log(result);
            if (result.data) {
                //decoding the jwt token
                const token = result.data.token;
                console.log(token);
                const decoded = jwt_decode(token);
                const expiresIn = decoded.expiresIn;
                const userID = decoded.userID;
                const firstName = decoded.firstName;
                const lastName = decoded.lastName;
                const userType = decoded.type;
                const userEmail = decoded.email;
                console.log(userType);

                const expirationDate = new Date(new Date().getTime() + expiresIn * 9000);

                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userID', userID);
                localStorage.setItem('firstName', firstName);
                localStorage.setItem('lastName', lastName);
                localStorage.setItem('userType', userType);

                dispatch(authSuccess(token, userID, firstName, lastName, userType,userEmail))

                onLogin();
                dispatch(checkAuthTimeout(expiresIn));
            }
            else {
                dispatch(authFail(result.message));
            }
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userID = localStorage.getItem('userID');
                const firstName = localStorage.getItem('firstName');
                const lastName = localStorage.getItem('lastName');
                const userType = localStorage.getItem('userType');
                dispatch(authSuccess(token, userID, firstName, lastName, userType));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};