////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../../_base/BaseAxios";
import API from '../../_base/API';
import Result from "../_base/Result";
import {MEMBERSHIP_TAB_EVENT, MEMBERSHIP_TAB_EVENT_NOTICE_LIST, MEMBERSHIP_TAB_EVENT_PART_LIST} from "../_base/ActionType";
import Common from "../../../util/Common";

////////////////////////////////////////
// Focus
export function setFocusEventForMemberShip(focus = false) {
    return async (dispatch) => {
        dispatch(sendFocus(MEMBERSHIP_TAB_EVENT.CHANGE_FOCUS, focus));
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
export function setFilterEventForMemberShip(hashTag = [], publisher = []) {
    return async (dispatch) => {
        dispatch(sendFilter(MEMBERSHIP_TAB_EVENT.CHANGE_FILTER, hashTag, publisher));
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
// Tag
export function getTagListEventForMemberShip() {
    return async (dispatch) => {
        get(API.MEMBERSHIP_TAB_EVENT.TAG_LIST, null, (success, code, message, data) => {
            if (success) dispatch(sendTagList(MEMBERSHIP_TAB_EVENT.TAG_LIST, data));
        });
    };
}

const sendTagList = (type, list) => {
    return {
        type,
        list,
    };
};

////////////////////////////////////////
// Search
export function setSearchTextEventForMemberShip(text = '') {
    return async (dispatch) => {
        dispatch(sendSearchText(text));
    }
}

const sendSearchText = (data) => {
    return {
        type: MEMBERSHIP_TAB_EVENT.CHANGE_SEARCH,
        data,
    };
};

////////////////////////////////////////
// List
export function getNoticeList(lastId = '', page = 1, isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) dispatch(Result.reset(MEMBERSHIP_TAB_EVENT_NOTICE_LIST));
        dispatch(Result.start(MEMBERSHIP_TAB_EVENT_NOTICE_LIST));
        get(API.MEMBERSHIP_TAB_EVENT.NOTICE_LIST, {
            ordering: '',
            page: page,
            // lastId: lastId,
        }, (success, code, message, data) => {
            dispatch(Result.complete(MEMBERSHIP_TAB_EVENT_NOTICE_LIST));
            if (success) {
                if (isRefresh && !Common.checkListSize(data.results)) {
                    dispatch(sendNoticeList(MEMBERSHIP_TAB_EVENT_NOTICE_LIST.FAILED, page, [], Common.isEmpty(data.next), isRefresh));
                } else {
                    dispatch(sendNoticeList(MEMBERSHIP_TAB_EVENT_NOTICE_LIST.SUCCESS, page, data.results, Common.isEmpty(data.next), isRefresh));
                }
            } else {
                dispatch(Result.fail(MEMBERSHIP_TAB_EVENT_NOTICE_LIST));
            }
        });
    };
}

const sendNoticeList = (type, page, list, isLast, isRefresh) => {
    return {
        type,
        page,
        list,
        isLast,
        isRefresh,
    };
};

export function getPartList(search = '', hashtag = [], publisher = [], lastId = '', page = 1, isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) dispatch(Result.reset(MEMBERSHIP_TAB_EVENT_PART_LIST));
        dispatch(Result.start(MEMBERSHIP_TAB_EVENT_PART_LIST));
        get(API.MEMBERSHIP_TAB_EVENT.PART_LIST, {
            ordering: '',
            search: search,
            hashtag: Common.createTextWithComma(hashtag),
            publisher: Common.createTextWithComma(publisher),
            // page: page,
            lastId: lastId,
        }, (success, code, message, data) => {
            dispatch(Result.complete(MEMBERSHIP_TAB_EVENT_PART_LIST));
            if (success) {
                if (isRefresh && !Common.checkListSize(data.results)) {
                    dispatch(sendPartList(MEMBERSHIP_TAB_EVENT_PART_LIST.FAILED, page, [], Common.isEmpty(data.next), isRefresh));
                } else {
                    dispatch(sendPartList(MEMBERSHIP_TAB_EVENT_PART_LIST.SUCCESS, page, data.results, Common.isEmpty(data.next), isRefresh));
                }
            } else {
                dispatch(Result.fail(MEMBERSHIP_TAB_EVENT_PART_LIST));
            }
        });
    };
}

const sendPartList = (type, page, list, isLast, isRefresh) => {
    return {
        type,
        page,
        list,
        isLast,
        isRefresh,
    };
};
