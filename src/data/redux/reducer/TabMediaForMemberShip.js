////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {Map} from 'immutable';
import {getTypeByNumber} from "../../../component/list/_type/MediaTemplateType";
import {MEMBERSHIP_TAB_MEDIA_LIST, STATUS} from '../_base/ActionType';

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
        type: isLast ? getTypeByNumber(2) : getTypeByNumber(1),
        data: data,
    };
};

const checkTemplateList = (list, data, isLast, isRefresh) => {
    return isRefresh
        ? new Array(createTemplateData(data, isLast))
        : list.concat(createTemplateData(data, isLast));
}

////////////////////////////////////////

export default function TabMediaForMemberShip(state = initialState, action) {
    switch (action.type) {
        ////////////////////
        // List
        case MEMBERSHIP_TAB_MEDIA_LIST.RESET:
            return state.merge({list: []});

        case MEMBERSHIP_TAB_MEDIA_LIST.START:
            return state.update('status', status => STATUS.WAITING);

        case MEMBERSHIP_TAB_MEDIA_LIST.COMPLETE:
            return state.update('status', status => STATUS.COMPLETE);

        case MEMBERSHIP_TAB_MEDIA_LIST.SUCCESS:
            return state.merge({
                status: STATUS.SUCCESS,
                page: action.page,
                list: checkTemplateList(state.get('list'), action.list, action.isLast, action.isRefresh),
                isRefresh: action.isRefresh,
            });

        case MEMBERSHIP_TAB_MEDIA_LIST.FAILED: {
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
