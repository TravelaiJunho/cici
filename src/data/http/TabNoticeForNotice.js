////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../_base/BaseAxios";
import API from '../_base/API';
//import type {OnServerListener} from "../_base/OnServerListener";
import localize from "../../util/Localize";

////////////////////////////////////////
// Category
const getCategoryList = (listener) => {
    // Get
    get(API.NOTICE_TAB_NOTICE.CATEGORY_LIST, null, listener);
}

////////////////////////////////////////
// Detail
const detailForNotice = (id, listener) => {
    // Get
    get(localize.formatString(API.NOTICE_TAB_NOTICE.DETAIL, id), null, listener);
}

////////////////////////////////////////
export {
    getCategoryList,
    detailForNotice,
}
