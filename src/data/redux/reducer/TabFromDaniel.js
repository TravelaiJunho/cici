////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {Map} from 'immutable';
import {COMMUNITY_TAB_FROM_DANIEL, COMMUNITY_TAB_FROM_DANIEL_LIST, STATUS} from '../_base/ActionType';

////////////////////////////////////////

const initialState = Map({
    // Focus
    isFocus: false,
    // Status
    status: STATUS.INIT,
    // List
    page: 1,
    list: [],
    isRefresh: false,
});

const checkList = (list, data, isRefresh) => {
    return isRefresh ? data : list.concat(data);
}

////////////////////////////////////////

export default function TabFromDaniel(state = initialState, action) {
    switch (action.type) {
        case COMMUNITY_TAB_FROM_DANIEL.CHANGE_FOCUS:
            return state.merge({isFocus: action.focus});

        ////////////////////
        // List
        case COMMUNITY_TAB_FROM_DANIEL_LIST.RESET:
            return state.merge({list: []});

        case COMMUNITY_TAB_FROM_DANIEL_LIST.START:
            return state.update('status', status => STATUS.WAITING);

        case COMMUNITY_TAB_FROM_DANIEL_LIST.COMPLETE:
            return state.update('status', status => STATUS.COMPLETE);

        case COMMUNITY_TAB_FROM_DANIEL_LIST.SUCCESS:
            return state.merge({
                status: STATUS.SUCCESS,
                page: action.page,
                list: checkList(state.get('list'), action.list, action.isRefresh),
                isRefresh: action.isRefresh,
            });

        case COMMUNITY_TAB_FROM_DANIEL_LIST.FAILED: {
            let d = {status: STATUS.FAIL}
            if (action.isRefresh) {
                d.page = action.page;
                d.list = action.list;
                d.isRefresh = action.isRefresh;
            }
            return state.merge(d);
        }

        default:
            return state;
    }
}

////////////////////////////////////////
