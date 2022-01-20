import {get, post} from "../../_base/BaseAxios";
import API from '../../_base/API';
import Result from "../_base/Result";
import Common from "../../../util/Common";
import {GOODS_LIST} from "../_base/ActionType";

////////////////////////////////////////
// VR Product List
export function getGoodsList(category, lastId="", page=1, isRefresh = false) {
    return async (dispatch) => {
        if (isRefresh) dispatch(Result.reset(GOODS_LIST));
        dispatch(Result.start(GOODS_LIST));

        let data = {category, lastId, page}
        if(category == -1) data = {lastId, page}

        get(API.GOODS.GOODS_LIST, data, (success, code, message, data) => {
            dispatch(Result.complete(GOODS_LIST));
            console.log("API.GOODS.GOODS_LIST : ", success, code, message, data)
            if (success) {
                if (isRefresh && !Common.checkListSize(data.results)) {
                    dispatch(sendList(GOODS_LIST.FAILED, page, [], isRefresh));
                } else {
                    dispatch(sendList(GOODS_LIST.SUCCESS, page, data.results, isRefresh));
                }
            } else {
                dispatch(Result.fail(GOODS_LIST));
            }
        });
    }
}

const sendList = (type, page, list, isRefresh) => {
    return {
        type,
        page,
        list,
        isRefresh,
    };
};
