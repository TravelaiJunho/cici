import {NEW} from '../_base/ActionType'
import {get} from "../../_base/BaseAxios";
import API from "../../_base/API";

////////////////////////////////////////
// List
export function getNewConfirm(isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) {
            dispatch(sendNewConfirm(NEW.CONFIRM, null));
        } else {
            get(API.NEW_CONFIRM, null, (success, code, message, data) => {
                if (success) {
                    dispatch(sendNewConfirm(NEW.CONFIRM, data));
                } else {
                    dispatch(sendNewConfirm(NEW.CONFIRM, null));
                }
            });
        }
    };
}

const sendNewConfirm = (type, data) => {
    return {
        type,
        data
    };
};