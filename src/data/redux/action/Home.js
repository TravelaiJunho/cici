////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../../_base/BaseAxios";
import API from '../../_base/API';
import Result from "../_base/Result";
import {HOME_LIST} from "../_base/ActionType";
import Common from "../../../util/Common";

////////////////////////////////////////
// List
export function getList(page = 1, isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) dispatch(Result.reset(HOME_LIST));
        dispatch(Result.start(HOME_LIST));
        get(API.INDEX, {page: page}, (success, code, message, data) => {
            dispatch(Result.complete(HOME_LIST));
            if (success) {
                if (isRefresh && !Common.checkListSize(data.results)) {
                    dispatch(sendList(HOME_LIST.FAILED, page, [], Common.isEmpty(data.next), isRefresh));
                } else {
                    dispatch(sendList(HOME_LIST.SUCCESS, page, data.results, Common.isEmpty(data.next), isRefresh));
                }
            } else {
                dispatch(Result.fail(HOME_LIST));
            }
        });
    };
}

const sendList = (type, page, list, isLast, isRefresh) => {
    return {
        type,
        page,
        list,
        isLast,
        isRefresh,
    };
};
