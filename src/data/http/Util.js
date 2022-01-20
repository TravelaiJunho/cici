////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../_base/BaseAxios";
import API from '../_base/API';
//import type {OnServerListener} from "../_base/OnServerListener";
import {PACKAGE} from "../../util/Constants";

////////////////////////////////////////

const resendPushToken = (listener) => {
    get(API.TOKEN_RESET, null, listener);
}

const convertApnsToFcm = (token, listener) => {
    let d = {
        package: PACKAGE,
        apnToken: token
    }
    if (__DEV__) d.sandbox = 1;
    get(API.TOKEN_CONVERT_APNS_TO_FCM, d, listener);
}

////////////////////////////////////////
export {
    resendPushToken, convertApnsToFcm
}
