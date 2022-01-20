import {Map} from "immutable";
import {TRANSLATE} from "../_base/ActionType";
import {MAX_TRANSLATE_COUNT} from "../../../util/Constants";
import Common from "../../../util/Common";


const initialState = Map({
    target: null,
    count: 0,
})

export default function TargetLanguage(state = initialState, action) {
    switch(action.type) {
        case TRANSLATE.TARGET:
            return state.merge({target:action.languageCode});
        case TRANSLATE.COUNT: {
            Common.debug ('count: ', action.translateCount)
            return state.merge({count:action.translateCount});
        }
        default:
            return state;
    }
}
