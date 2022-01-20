////////////////////////////////////////

import {Map} from 'immutable';
import {COMMUNITY} from '../_base/ActionType';

////////////////////////////////////////

const initialState = Map({
    communitySearchText: '',
});

export default function Community(state = initialState, action) {
    switch (action.type) {
        case COMMUNITY.CHANGE_SEARCH:
            return state.merge({communitySearchText: action.data});

        default:
            return state;
    }
}

////////////////////////////////////////
