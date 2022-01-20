import Result from "../_base/Result";
import {TRANSLATE} from "../_base/ActionType";
import Common from "../../../util/Common";
import Storage from "../../../util/Storage"

export  function initTargetLanguage() {
    // local 로 저장된 target language 를 세팅한다.
    return async (dispatch) => {
        let target = null;
        target = await Storage.getTranslateLanguageCode();
        dispatch(sendTargetLanguage(TRANSLATE.TARGET, target));
    };
}

export  function initTranslateCount() {
    return async (dispatch) => {
        let count = null;
        count = await Storage.getTranslateCount();
        dispatch(sendTranslateCount(TRANSLATE.COUNT, count));
    };
}

export function setTargetLanguage(languageCode="en") {
    // async setting
    return async (dispatch) => {
        await Storage.setTranslateLanguageCode(languageCode);
        dispatch(sendTargetLanguage(TRANSLATE.TARGET, languageCode));
    };
}

export function setTranslateCount(count=0) {
    // async setting
    return async (dispatch) => {
        count = await Storage.setTranslateCount(count);
        dispatch(sendTranslateCount(TRANSLATE.COUNT, count));
    };
}

const sendTargetLanguage = (type, languageCode) => {
    return {
        type, languageCode
    }
}

const sendTranslateCount = (type, translateCount) => {
    return {
        type, translateCount
    }
}
