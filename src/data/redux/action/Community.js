////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {COMMUNITY} from "../_base/ActionType";

////////////////////////////////////////
// Search Text (Community)
export function setSearchTextForCommunity(text = '') {
    return async (dispatch) => {
        dispatch(sendSearchTextForCommunity(text));
    }
}

const sendSearchTextForCommunity = (data) => {
    return {
        type: COMMUNITY.CHANGE_SEARCH,
        data,
    };
};