////////////////////////////////////////
// IMPORT
////////////////////////////////////////

//import type {OnServerListener} from "../_base/OnServerListener";
import {get} from "../_base/BaseAxios";
import localize from "../../util/Localize";
import API from "../_base/API";

////////////////////////////////////////
// Detail
const detailMediaForNotice = (id, listener) => {
    get(localize.formatString(API.NOTICE_TAB_MEDIA.MEDIA_DETAIL, id), null, listener);
}

////////////////////////////////////////
export {
    detailMediaForNotice,
}
