////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {Map} from 'immutable';
import {MY_POST_LIST, STATUS} from '../_base/ActionType';

////////////////////////////////////////

const initialState = Map({
    // Status
    status: STATUS.INIT,
    // List
    page: 1,
    list: [],
    isRefresh: false,
});

const createTemplateData = data => {
    return {data: data};
};

const checkTemplateList = (list, data, isRefresh) => {
    return isRefresh
        ? new Array(createTemplateData(data))
        : list.concat(createTemplateData(data));
}

////////////////////////////////////////

export default function MyPost(state = initialState, action) {
    switch (action.type) {
        ////////////////////
        // List
        case MY_POST_LIST.RESET:
            return state.merge({list: []});

        case MY_POST_LIST.START:
            return state.update('status', status => STATUS.WAITING);

        case MY_POST_LIST.COMPLETE:
            return state.update('status', status => STATUS.COMPLETE);

        case MY_POST_LIST.SUCCESS:
            return state.merge({
                status: STATUS.SUCCESS,
                page: action.page,
                list: checkTemplateList(state.get('list'), action.list, action.isRefresh),
                isRefresh: action.isRefresh,
            });

        case MY_POST_LIST.FAILED: {
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
