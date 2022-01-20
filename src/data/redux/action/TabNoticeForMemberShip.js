////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../../_base/BaseAxios";
import API from '../../_base/API';
import Result from "../_base/Result";
import {MEMBERSHIP_TAB_NOTICE_LIST} from "../_base/ActionType";
import Common from "../../../util/Common";

////////////////////////////////////////
// List
export function getList(categoryId = -1, lastId = '', page = 1, isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) dispatch(Result.reset(MEMBERSHIP_TAB_NOTICE_LIST));
        dispatch(Result.start(MEMBERSHIP_TAB_NOTICE_LIST));
        get(API.MEMBERSHIP_TAB_NOTICE.LIST, {
            ordering: '',
            category: categoryId > -1 ? categoryId : null,
            // page: page,
            lastId: lastId,
        }, (success, code, message, data) => {
            dispatch(Result.complete(MEMBERSHIP_TAB_NOTICE_LIST));
            if (success) {
                if (isRefresh && !Common.checkListSize(data.results)) {
                    dispatch(sendList(MEMBERSHIP_TAB_NOTICE_LIST.FAILED, page, [], isRefresh));
                } else {
                    dispatch(sendList(MEMBERSHIP_TAB_NOTICE_LIST.SUCCESS, page, data.results, isRefresh));
                }
            } else {
                dispatch(Result.fail(MEMBERSHIP_TAB_NOTICE_LIST));
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
