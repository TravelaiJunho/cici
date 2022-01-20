////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {Map} from 'immutable';
import {USER} from '../_base/ActionType';

////////////////////////////////////////

const initialState = Map({
    profile: null,
});

////////////////////////////////////////

export default function User(state = initialState, action) {
    switch (action.type) {
        case USER.CHANGE_PROFILE:
            return state.merge({profile: action.data});

        default:
            return state;
    }
}

////////////////////////////////////////