////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../../_base/BaseAxios";
import API from '../../_base/API';
import Result from "../_base/Result";
import {MEMBERSHIP_TAB_MEDIA_LIST} from "../_base/ActionType";
import Common from "../../../util/Common";

////////////////////////////////////////
// List
export function getList(type = null, lastId = '', page = 1, isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) dispatch(Result.reset(MEMBERSHIP_TAB_MEDIA_LIST));
        dispatch(Result.start(MEMBERSHIP_TAB_MEDIA_LIST));
        get(API.MEMBERSHIP_TAB_MEDIA.LIST, {
            ordering: '',
            media_type: type,
            page: page,
            lastId: lastId,
        }, (success, code, message, data) => {
            dispatch(Result.complete(MEMBERSHIP_TAB_MEDIA_LIST));
            if (success) {
                if (isRefresh && !Common.checkListSize(data.results)) {
                    dispatch(sendList(MEMBERSHIP_TAB_MEDIA_LIST.FAILED, page, [], Common.isEmpty(data.next), isRefresh));
                } else {
                    dispatch(sendList(MEMBERSHIP_TAB_MEDIA_LIST.SUCCESS, page, data.results, Common.isEmpty(data.next), isRefresh));
                }
            } else {
                dispatch(Result.fail(MEMBERSHIP_TAB_MEDIA_LIST));
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
