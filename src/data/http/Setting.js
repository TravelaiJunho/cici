////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import API from '../_base/API';
import {get, post} from "../_base/BaseAxios";
//import type {OnServerListener} from "../_base/OnServerListener";

////////////////////////////////////////
// Alarm
const getAlarmAllow = (listener) => {
    // Get
    get(API.SETTING_ALARM_ALLOW, null, listener);
}

const setAlarm = (listener) => {
    // Post
    post(API.SETTING_ALARM_SET, null, listener);
}

const setAlarmCancel = (listener) => {
    // Post
    post(API.SETTING_ALARM_CANCEL, null, listener);
}

////////////////////////////////////////
export {
    getAlarmAllow, setAlarm, setAlarmCancel
}
