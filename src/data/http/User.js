////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {post, get, postMultipart} from "../_base/BaseAxios";
import API from '../_base/API';
//import type {OnServerListener} from "../_base/OnServerListener";
import Common from "../../util/Common";

////////////////////////////////////////
// Reset Password
const resetPassword = (email, code, password, passwordConfirm, listener) => {
    // Post
    post(API.USER_PASSWORD_RESET, {
        email: email,
        code: code,
        new_password: password,
        new_password2: passwordConfirm
    }, listener);
}

const resetPasswordAuthMail = (email, listener) => {
    // Post
    post(API.USER_PASSWORD_RESET_REQUEST, {email: email}, listener);
}

const userInfo = (listener) => {
    get(API.USER_INFO, null, listener);
}

const userProfile = (listener) => {
    get(API.USER_PROFILE, null, listener);
}

const userProfileUpdate = (nickname, mobile_number, listener) => {
    // Post
    let formData = new FormData();
    formData.append('nickname', nickname)
    // formData.append('mobile_number', mobile_number)

    post(API.USER_PROFILE_UPDATE, formData, listener);
}

const userProfileImageUpdate = (image, listener) => {
    let formData = new FormData();
    if (image) formData.append('image', image);
    // Dummy
    formData.append('a', 'a');

    postMultipart(API.USER_PROFILE_IMAGE_UPDATE, formData, listener);
}

const userLevelUpRequestForm = (listener) => {
    get(API.USER_LEVEL_UP_REQUEST, null, listener)
}

const userLevelUpRequest = (data, listener) => {
    //let formData = new FormData();
    //Common.setFormData(formData, data);
    post(API.USER_LEVEL_UP_REQUEST, data, listener)
}

const userLeave = (password, listener) => {
    let formData = new FormData();
    formData.append('password', password);
    post(API.USER_LEAVE, formData, listener);
}

////////////////////////////////////////
export {
    resetPassword, resetPasswordAuthMail,
    userInfo, userProfile, userProfileUpdate, userProfileImageUpdate,
    userLevelUpRequestForm, userLevelUpRequest,
    userLeave,
}
