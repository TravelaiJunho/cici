////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get, post} from "../_base/BaseAxios";
import API from '../_base/API';
//import type {OnServerListener} from "../_base/OnServerListener";
import localize from "../../util/Localize";

////////////////////////////////////////
// Alarm List
const getAlarmList = (lastId = '', page = 1, listener) => {
    // Get
    get(API.ALARM.LIST, {
        // page: page,
        lastId: lastId,
    }, listener);
}

////////////////////////////////////////
// Read
const setRead = (id, listener) => {
    // Post
    post(localize.formatString(API.ALARM.READ, id), null, listener);
}

const setReadAll = (listener) => {
    // Post
    post(API.ALARM.READ_ALL, null, listener);
}

////////////////////////////////////////
export {
    getAlarmList,
    setRead, setReadAll,
}
