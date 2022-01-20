////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../../_base/BaseAxios";
import API from '../../_base/API';
import Result from "../_base/Result";
import {COMMUNITY_TAB_TO_DANIEL, COMMUNITY_TAB_TO_DANIEL_LIST} from "../_base/ActionType";
import Common from "../../../util/Common";

////////////////////////////////////////
// Focus
export function setFocusForToDaniel(focus = false) {
    return async (dispatch) => {
        dispatch(sendFocus(COMMUNITY_TAB_TO_DANIEL.CHANGE_FOCUS, focus));
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
export function setFilterForToDaniel(publisher = []) {
    return async (dispatch) => {
        dispatch(sendFilter(COMMUNITY_TAB_TO_DANIEL.CHANGE_FILTER, publisher));
    };
}

const sendFilter = (type, publisher) => {
    return {
        type,
        publisher
    };
};

////////////////////////////////////////
// List
export function getList(search = '',  publisher = [], lastId = '', page = 1, isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) dispatch(Result.reset(COMMUNITY_TAB_TO_DANIEL_LIST));
        dispatch(Result.start(COMMUNITY_TAB_TO_DANIEL_LIST));
        get(API.COMMUNITY_TAB_TO_DANIEL.LIST, {
            ordering: '',
            search: search,
            publisher: Common.createTextWithComma(publisher),
            // page: page,
            lastId: lastId,
        }, (success, code, message, data) => {
            dispatch(Result.complete(COMMUNITY_TAB_TO_DANIEL_LIST));
            if (success) {
                if (isRefresh && !Common.checkListSize(data.results)) {
                    dispatch(sendList(COMMUNITY_TAB_TO_DANIEL_LIST.FAILED, page, [], isRefresh));
                } else {
                    dispatch(sendList(COMMUNITY_TAB_TO_DANIEL_LIST.SUCCESS, page, data.results, isRefresh));
                }
            } else {
                dispatch(Result.fail(COMMUNITY_TAB_TO_DANIEL_LIST));
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
