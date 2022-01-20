////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../_base/BaseAxios";
import API from '../_base/API';
//import type {OnServerListener} from "../_base/OnServerListener";

////////////////////////////////////////

const newConfirm = (listener) => {
    get(API.NEW_CONFIRM, null, listener);
}
////////////////////////////////////////
export {
    newConfirm
}
