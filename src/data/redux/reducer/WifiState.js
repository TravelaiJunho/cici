import {Map} from "immutable";
import {WIFI_STATE} from "../_base/ActionType";


const initialState = Map({
    connect_type: null,
    isConnect: false,
})

export default function WifiState(state = initialState, action) {
    switch(action.type) {
        case WIFI_STATE.STATE:
            return state.merge({connect_type:action.connect_type, isConnect:action.isConnected});
        default:
            return state;
    }
}
