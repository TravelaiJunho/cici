import {Map} from 'immutable';
import {STATUS,GOODS_LIST} from "../_base/ActionType";

const initialListState = Map({
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

function GoodsList(state=initialListState, action) {
    switch (action.type) {
        ////////////////////
        // List
        case GOODS_LIST.RESET:
            return state.merge({list: []});

        case GOODS_LIST.START:
            return state.update('status', status => STATUS.WAITING);

        case GOODS_LIST.COMPLETE:
            return state.update('status', status => STATUS.COMPLETE);

        case GOODS_LIST.SUCCESS:
            return state.merge({
                status: STATUS.SUCCESS,
                page: action.page,
                list: checkList(state.get('list'), action.list, action.isRefresh),
                isRefresh: action.isRefresh,
            });

        case GOODS_LIST.FAILED: {
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

export {GoodsList}
