////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../../_base/BaseAxios";
import API from '../../_base/API';
import Result from "../_base/Result";
import {COMMUNITY_TAB_TALK_TALK, COMMUNITY_TAB_TALK_TALK_LIST} from "../_base/ActionType";
import Common from "../../../util/Common";

////////////////////////////////////////
// Focus
export function setFocusForTalkTalk(focus = false) {
    return async (dispatch) => {
        dispatch(sendFocus(COMMUNITY_TAB_TALK_TALK.CHANGE_FOCUS, focus));
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
export function setFilterForTalkTalk(hashTag = [], publisher = []) {
    return async (dispatch) => {
        dispatch(sendFilter(COMMUNITY_TAB_TALK_TALK.CHANGE_FILTER, hashTag, publisher));
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
        if (isRefresh) dispatch(Result.reset(COMMUNITY_TAB_TALK_TALK_LIST));
        dispatch(Result.start(COMMUNITY_TAB_TALK_TALK_LIST));
        get(API.COMMUNITY_TAB_TALK_TALK.LIST, {
            ordering: '',
            search: search,
            hashtag: Common.createTextWithComma(hashtag),
            publisher: Common.createTextWithComma(publisher),
            // page: page,
            lastId: lastId,
        }, (success, code, message, data) => {
            dispatch(Result.complete(COMMUNITY_TAB_TALK_TALK_LIST));
            if (success) {
                if (isRefresh && !Common.checkListSize(data.results)) {
                    dispatch(sendList(COMMUNITY_TAB_TALK_TALK_LIST.FAILED, page, [], isRefresh));
                } else {
                    dispatch(sendList(COMMUNITY_TAB_TALK_TALK_LIST.SUCCESS, page, data.results, isRefresh));
                }
            } else {
                dispatch(Result.fail(COMMUNITY_TAB_TALK_TALK_LIST));
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
