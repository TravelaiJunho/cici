////////////////////////////////////////

import {Map} from 'immutable';
import {COMMON} from '../_base/ActionType';
import {DOWNLOAD_OPTION} from "../../../util/Constants";

////////////////////////////////////////

const initialState = Map({
    language: 'ko',
    isShowLogin: true,
    reportReasonList: [],
    downloadOption: DOWNLOAD_OPTION.WIFI_ONLY,
});

export default function Common(state = initialState, action) {
    switch (action.type) {
        case COMMON.CHANGE_LANGUAGE:
            return state.merge({language: action.data});

        case COMMON.CHANGE_IS_LOGIN:
            return state.merge({isShowLogin: action.data});

        case COMMON.REPORT_REASON_LIST:
            return state.merge({reportReasonList: action.list});

        case COMMON.CHANGE_DOWNLOAD_OPTION:
            return state.merge({downloadOption: action.data});

        default:
            return state;
    }
}

////////////////////////////////////////
