import {Map} from 'immutable';
import {NEW} from '../_base/ActionType';

const initialState = Map({
    confirm:null,
})

export default function New(state = initialState, action){
    switch(action.type){
        case NEW.CONFIRM:
            return state.merge({
                confirm: action.data
            });
        default:
            return state;
    }
}
