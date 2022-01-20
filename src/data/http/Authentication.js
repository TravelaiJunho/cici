////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import API from '../_base/API';
import {get, post, postAsync} from "../_base/BaseAxios";
//import type {OnServerListener} from "../_base/OnServerListener";
import Info from "../../util/Info";

////////////////////////////////////////
// Login
const login = (email, password, listener) => {
    // Post
    post(API.AUTH_LOGIN, {
        email: email,
        password: password,
    }, listener);
}

////////////////////////////////////////
// Logout
const logout = (listener) => {
    // Get
    get(API.AUTH_LOGOUT, null, listener);
}

////////////////////////////////////////
// Join
const join = (email,
              name,
              nickname,
              // gender,
              // birth,
              // country,
              // nation,
              // phone,
              password,
              passwordConfirm,
              listener) => {
    // Post
    post(API.AUTH_REGISTER, {
        email: email,
        name: name,
        nickname: nickname,
        // gender: gender === 0 ? DATA_GENDER.WOMEN : DATA_GENDER.MEN,
        // birthday: moment(birth).format(DATE_FORMAT_DATE),
        // country: country,
        // mobile_number: nation + Common.SEPARATOR_SPACE + phone,
        password: password,
        password2: passwordConfirm
    }, listener);
}

////////////////////////////////////////
// Token
const refreshToken = (listener) => {
    // Post
    post(API.AUTH_TOKEN_REFRESH, {refresh: Info.getUserInfo().token.refresh}, listener);
}

const refreshTokenAsync = _ => {
    return postAsync(API.AUTH_TOKEN_REFRESH, {refresh: Info.getUserInfo().token.refresh});
}

////////////////////////////////////////
// Email
const sendEmail = (email, listener) => {
    // Post
    post(API.AUTH_EMAIL_RESEND, {email: email}, listener);
}

const verifyEmail = (email, code, listener) => {
    // Post
    post(API.AUTH_EMAIL_VERIFY, {
        email: email,
        code: code
    }, listener);
}

////////////////////////////////////////
export {
    login, logout, join,
    refreshToken,
    refreshTokenAsync,
    sendEmail, verifyEmail,
}
