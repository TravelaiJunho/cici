////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../_base/BaseAxios";
import API from '../_base/API';
//import type {OnServerListener} from "../_base/OnServerListener";

////////////////////////////////////////
// Schedule
const getScheduleList = (year, month, listener) => {
    // Get
    get(API.NOTICE_TAB_SCHEDULE.LIST, {
        yymm: `${year}-${month}`
        // year: year,
        // month: month
    }, listener);
}

////////////////////////////////////////
export {
    getScheduleList,
}
