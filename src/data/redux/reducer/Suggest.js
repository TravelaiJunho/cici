////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {Map} from 'immutable';
import {SUGGEST_LIST, STATUS} from '../_base/ActionType';

////////////////////////////////////////

const initialState = Map({
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

export default function Suggest(state = initialState, action) {
    switch (action.type) {
        ////////////////////
        // List
        case SUGGEST_LIST.RESET:
            return state.merge({list: []});

        case SUGGEST_LIST.START:
            return state.update('status', status => STATUS.WAITING);

        case SUGGEST_LIST.COMPLETE:
            return state.update('status', status => STATUS.COMPLETE);

        case SUGGEST_LIST.SUCCESS:
            return state.merge({
                status: STATUS.SUCCESS,
                page: action.page,
                list: checkList(state.get('list'), action.list, action.isRefresh),
                isRefresh: action.isRefresh,
            });

        case SUGGEST_LIST.FAILED: {
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
