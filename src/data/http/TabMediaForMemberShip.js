////////////////////////////////////////
// IMPORT
////////////////////////////////////////

//import type {OnServerListener} from "../_base/OnServerListener";
import {get} from "../_base/BaseAxios";
import localize from "../../util/Localize";
import API from "../_base/API";

////////////////////////////////////////
// Detail
const detailMediaForMemberShip = (id, listener) => {
    get(localize.formatString(API.MEMBERSHIP_TAB_MEDIA.MEDIA_DETAIL, id), null, listener);
}

////////////////////////////////////////
export {
    detailMediaForMemberShip,
}
