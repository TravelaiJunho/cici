////////////////////////////////////////

import {Map} from 'immutable';
import {MEMBERSHIP} from '../_base/ActionType';

////////////////////////////////////////

const initialState = Map({
    membershipSearchText: '',
});

export default function MemberShip(state = initialState, action) {
    switch (action.type) {
        case MEMBERSHIP.CHANGE_SEARCH:
            return state.merge({membershipSearchText: action.data});

        default:
            return state;
    }
}

////////////////////////////////////////
