import Result from "../_base/Result";
import {WIFI_STATE} from "../_base/ActionType";
import Common from "../../../util/Common";


export function setWifiState(connect_type, isConnected) {
    // async setting
    return async (dispatch) => {
        dispatch(sendWifiState(WIFI_STATE.STATE, connect_type, isConnected));
    };
}

const sendWifiState = (type, connect_type, isConnected) => {
    return {
         type, connect_type, isConnected,
    }
}
