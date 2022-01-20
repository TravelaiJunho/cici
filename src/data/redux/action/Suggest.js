////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../../_base/BaseAxios";
import API from '../../_base/API';
import Result from "../_base/Result";
import {SUGGEST_LIST} from "../_base/ActionType";
import Common from "../../../util/Common";

////////////////////////////////////////
// List
export function getList(lastId = '', page = 1, isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) dispatch(Result.reset(SUGGEST_LIST));
        dispatch(Result.start(SUGGEST_LIST));
        get(API.SUGGEST.LIST, {
            page: page,
            // lastId: lastId,
        }, (success, code, message, data) => {
            dispatch(Result.complete(SUGGEST_LIST));
            if (success) {
                if (isRefresh && !Common.checkListSize(data.results)) {
                    dispatch(sendList(SUGGEST_LIST.FAILED, page, [], isRefresh));
                } else {
                    dispatch(sendList(SUGGEST_LIST.SUCCESS, page, data.results, isRefresh));
                }
            } else {
                dispatch(Result.fail(SUGGEST_LIST));
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
