////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../../_base/BaseAxios";
import API from '../../_base/API';
import Result from "../_base/Result";
import {MEMBERSHIP_TAB_TALK, MEMBERSHIP_TAB_TALK_LIST} from "../_base/ActionType";
import Common from "../../../util/Common";

////////////////////////////////////////
// Focus
export function setFocusForTalk(focus = false) {
    return async (dispatch) => {
        dispatch(sendFocus(MEMBERSHIP_TAB_TALK.CHANGE_FOCUS, focus));
    };
}

const sendFocus = (type, focus) => {
    return {
        type,
        focus
    };
};

////////////////////////////////////////
// Filter
export function setFilterForTalk(hashTag = [], publisher = []) {
    return async (dispatch) => {
        dispatch(sendFilter(MEMBERSHIP_TAB_TALK.CHANGE_FILTER, hashTag, publisher));
    };
}

const sendFilter = (type, hashTag, publisher) => {
    return {
        type,
        hashTag,
        publisher
    };
};

////////////////////////////////////////
// List
export function getList(search = '', hashtag = [], publisher = [], lastId = '', page = 1, isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) dispatch(Result.reset(MEMBERSHIP_TAB_TALK_LIST));
        dispatch(Result.start(MEMBERSHIP_TAB_TALK_LIST));
        get(API.MEMBERSHIP_TAB_TALK.LIST, {
            ordering: '',
            search: search,
            hashtag: Common.createTextWithComma(hashtag),
            publisher: Common.createTextWithComma(publisher),
            // page: page,
            lastId: lastId,
        }, (success, code, message, data) => {
            dispatch(Result.complete(MEMBERSHIP_TAB_TALK_LIST));
            if (success) {
                if (isRefresh && !Common.checkListSize(data.results)) {
                    dispatch(sendList(MEMBERSHIP_TAB_TALK_LIST.FAILED, page, [], isRefresh));
                } else {
                    dispatch(sendList(MEMBERSHIP_TAB_TALK_LIST.SUCCESS, page, data.results, isRefresh));
                }
            } else {
                dispatch(Result.fail(MEMBERSHIP_TAB_TALK_LIST));
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
