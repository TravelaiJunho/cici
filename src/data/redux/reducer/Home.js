////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {Map} from 'immutable';
import {HOME_LIST, STATUS} from '../_base/ActionType';
import {getRandomType, TEMPLATE_TYPE} from "../../../component/list/_type/HomeTemplateType";

////////////////////////////////////////

const initialState = Map({
    // Status
    status: STATUS.INIT,
    // List
    page: 1,
    list: [],
    isRefresh: false,
});

const createTemplateData = (data, isLast = false) => {
    return {
        type: isLast ? TEMPLATE_TYPE.TYPE_R : getRandomType(),
        data: data,
    };
};

const checkTemplateList = (list, data, isLast, isRefresh) => {
    return isRefresh
        ? new Array(createTemplateData(data, isLast))
        : list.concat(createTemplateData(data, isLast));
}

////////////////////////////////////////

export default function Home(state = initialState, action) {
    switch (action.type) {
        ////////////////////
        // List
        case HOME_LIST.RESET:
            return state.merge({list: []});

        case HOME_LIST.START:
            return state.update('status', status => STATUS.WAITING);

        case HOME_LIST.COMPLETE:
            return state.update('status', status => STATUS.COMPLETE);

        case HOME_LIST.SUCCESS:
            return state.merge({
                status: STATUS.SUCCESS,
                page: action.page,
                list: checkTemplateList(state.get('list'), action.list, action.isLast, action.isRefresh),
                isRefresh: action.isRefresh,
            });

        case HOME_LIST.FAILED: {
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
