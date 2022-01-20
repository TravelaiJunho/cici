////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {MEMBERSHIP} from "../_base/ActionType";

////////////////////////////////////////
// Search Text (MemberShip)
export function setSearchTextForMemberShip(text = '') {
    return async (dispatch) => {
        dispatch(sendSearchTextForMemberShip(text));
    }
}

const sendSearchTextForMemberShip = (data) => {
    return {
        type: MEMBERSHIP.CHANGE_SEARCH,
        data,
    };
};