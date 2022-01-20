////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../../_base/BaseAxios";
import API from '../../_base/API';
import Result from "../_base/Result";
import {MY_POST_LIST} from "../_base/ActionType";
import Common from "../../../util/Common";

////////////////////////////////////////
// List
export function getList(page = 1, isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) dispatch(Result.reset(MY_POST_LIST));
        dispatch(Result.start(MY_POST_LIST));
        get(API.MY_POST.LIST, {page: page}, (success, code, message, data) => {
            dispatch(Result.complete(MY_POST_LIST));
            if (success) {
                if (isRefresh && !Common.checkListSize(data.results)) {
                    dispatch(sendList(MY_POST_LIST.FAILED, page, [], isRefresh));
                } else {
                    dispatch(sendList(MY_POST_LIST.SUCCESS, page, data.results, isRefresh));
                }
            } else {
                dispatch(Result.fail(MY_POST_LIST));
            }
        });
    };
}

const sendList = (type, page, list, isRefresh) => {
    return {
        type,
        page,
        list,
        isRefresh,
    };
};
