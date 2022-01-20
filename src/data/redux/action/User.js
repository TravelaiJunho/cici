////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../../_base/BaseAxios";
import API from '../../_base/API';
import {USER} from "../_base/ActionType";

////////////////////////////////////////
// List
export function getProfile(isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) {
            dispatch(sendProfile(USER.CHANGE_PROFILE, null));
        } else {
            get(API.USER_PROFILE, null, (success, code, message, data) => {
                if (success) {
                    dispatch(sendProfile(USER.CHANGE_PROFILE, data));
                } else {
                    dispatch(sendProfile(USER.CHANGE_PROFILE, null));
                }
            });
        }
    };
}

const sendProfile = (type, data) => {
    return {
        type,
        data
    };
};