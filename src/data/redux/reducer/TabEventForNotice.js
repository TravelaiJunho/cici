////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {Map} from 'immutable';
import {NOTICE_TAB_EVENT, NOTICE_TAB_EVENT_NOTICE_LIST, NOTICE_TAB_EVENT_PART_LIST, STATUS} from "../_base/ActionType";

////////////////////////////////////////

const initialState = Map({
    // Focus
    isFocus: false,
    // Tag
    tagList: [],
    // Search
    searchText: '',
    // Notice
    noticeStatus: STATUS.INIT,
    noticePage: 1,
    noticeList: [],
    noticeIsRefresh: false,
    // Part
    partHashTag: [],
    partPublisher: [],
    partStatus: STATUS.INIT,
    partPage: 1,
    partList: [],
    partIsRefresh: false,
});

const checkList = (list, data, isRefresh) => {
    return isRefresh ? data : list.concat(data);
}

////////////////////////////////////////

export default function TabEventForNotice(state = initialState, action) {
    switch (action.type) {
        case NOTICE_TAB_EVENT.CHANGE_FOCUS:
            return state.merge({isFocus: action.focus});

        case NOTICE_TAB_EVENT.CHANGE_FILTER:
            return state.merge({
                partHashTag: action.hashTag,
                partPublisher: action.publisher,
            });

        case NOTICE_TAB_EVENT.TAG_LIST:
            return state.merge({tagList: action.list});

        case NOTICE_TAB_EVENT.CHANGE_SEARCH:
            return state.merge({searchText: action.data});

        ////////////////////
        // LIST
        ////////////////////

        // Notice
        case NOTICE_TAB_EVENT_NOTICE_LIST.RESET:
            return state.merge({noticeList: []});

        case NOTICE_TAB_EVENT_NOTICE_LIST.START:
            return state.update('noticeStatus', status => STATUS.WAITING);

        case NOTICE_TAB_EVENT_NOTICE_LIST.COMPLETE:
            return state.update('noticeStatus', status => STATUS.COMPLETE);

        case NOTICE_TAB_EVENT_NOTICE_LIST.SUCCESS:
            return state.merge({
                noticeStatus: STATUS.SUCCESS,
                noticePage: action.page,
                noticeList: checkList(state.get('noticeList'), action.list, action.isRefresh),
                noticeIsRefresh: action.isRefresh,
            });

        case NOTICE_TAB_EVENT_NOTICE_LIST.FAILED: {
            let d = {noticeStatus: STATUS.FAIL}
            if (action.isRefresh) {
                d.noticePage = action.page;
                d.noticeList = action.list;
                d.noticeIsRefresh = action.isRefresh;
            }
            return state.merge(d);
        }

        // Part
        case NOTICE_TAB_EVENT_PART_LIST.RESET:
            return state.merge({partList: []});

        case NOTICE_TAB_EVENT_PART_LIST.START:
            return state.update('partStatus', status => STATUS.WAITING);

        case NOTICE_TAB_EVENT_PART_LIST.COMPLETE:
            return state.update('partStatus', status => STATUS.COMPLETE);

        case NOTICE_TAB_EVENT_PART_LIST.SUCCESS:
            return state.merge({
                partStatus: STATUS.SUCCESS,
                partPage: action.page,
                partList: checkList(state.get('partList'), action.list, action.isRefresh),
                partIsRefresh: action.isRefresh,
            });

        case NOTICE_TAB_EVENT_PART_LIST.FAILED: {
            let d = {partStatus: STATUS.FAIL}
            if (action.isRefresh) {
                d.partPage = action.page;
                d.partList = action.list;
                d.partIsRefresh = action.isRefresh;
            }
            return state.merge(d);
        }

        default:
            return state;
    }
}

////////////////////////////////////////
