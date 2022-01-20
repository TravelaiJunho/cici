////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {Map} from 'immutable';
import {INQUIRE_LIST, STATUS} from '../_base/ActionType';

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

export default function Inquire(state = initialState, action) {
    switch (action.type) {
        ////////////////////
        // List
        case INQUIRE_LIST.RESET:
            return state.merge({list: []});

        case INQUIRE_LIST.START:
            return state.update('status', status => STATUS.WAITING);

        case INQUIRE_LIST.COMPLETE:
            return state.update('status', status => STATUS.COMPLETE);

        case INQUIRE_LIST.SUCCESS:
            return state.merge({
                status: STATUS.SUCCESS,
                page: action.page,
                list: checkList(state.get('list'), action.list, action.isRefresh),
                isRefresh: action.isRefresh,
            });

        case INQUIRE_LIST.FAILED: {
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
