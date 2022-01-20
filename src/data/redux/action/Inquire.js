////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../../_base/BaseAxios";
import API from '../../_base/API';
import Result from "../_base/Result";
import {INQUIRE_LIST} from "../_base/ActionType";
import Common from "../../../util/Common";

////////////////////////////////////////
// List
export function getList(lastId = '', page = 1, isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) dispatch(Result.reset(INQUIRE_LIST));
        dispatch(Result.start(INQUIRE_LIST));
        get(API.INQUIRE.LIST, {
            page: page,
            // lastId: lastId,
        }, (success, code, message, data) => {
            dispatch(Result.complete(INQUIRE_LIST));
            if (success) {
                if (isRefresh && !Common.checkListSize(data.results)) {
                    dispatch(sendList(INQUIRE_LIST.FAILED, page, [], isRefresh));
                } else {
                    dispatch(sendList(INQUIRE_LIST.SUCCESS, page, data.results, isRefresh));
                }
            } else {
                dispatch(Result.fail(INQUIRE_LIST));
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
