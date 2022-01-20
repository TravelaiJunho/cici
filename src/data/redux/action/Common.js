////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {COMMON, TRANSLATE} from '../_base/ActionType';
import localize from '../../../util/Localize';
import {DOWNLOAD_OPTION, TRANSLATE_ENGLISH} from '../../../util/Constants';
import Storage from '../../../util/Storage';
import Info from "../../../util/Info";
import {get} from "../../_base/BaseAxios";
import API from "../../_base/API";
import Common from "../../../util/Common";

////////////////////////////////////////
// Change Language
export function changeLanguage(lang = TRANSLATE_ENGLISH) {
    return async (dispatch) => {
        localize.setLanguage(lang);
        Info.setLanguage(lang);
        Storage.setLanguage(lang).then(r => {
        })
        dispatch(sendChangeLanguage(lang));
    }
}

const sendChangeLanguage = (data) => {
    return {
        type: COMMON.CHANGE_LANGUAGE,
        data,
    };
};

////////////////////////////////////////
// Check Show Login
export function isShowLogin(isShow = true) {
    return async (dispatch) => {
        dispatch(sendIsShowLogin(isShow));
    }
}

const sendIsShowLogin = (data) => {
    return {
        type: COMMON.CHANGE_IS_LOGIN,
        data,
    };
};

////////////////////////////////////////
// Report Reason List
export function getReportReasonList() {
    return async (dispatch) => {
        get(API.COMMUNITY_REPORT_REASON_LIST, null, (success, code, message, data) => {
            if (success) dispatch(sendReportReasonList(COMMON.REPORT_REASON_LIST, data));
        });
    }
}

const sendReportReasonList = (type, list) => {
    return {
        type,
        list,
    };
};

////////////////////////////////////////
// Download Option
export  function initDownloadOption() {
    // local 로 저장된 target language 를 세팅한다.
    return async (dispatch) => {
        let target = null;
        target = await Storage.getDownloadOption();
        dispatch(sendChangeDownloadOption(target));
    };
}

export function changeDownloadOption(option = DOWNLOAD_OPTION.WIFI_ONLY) {
    return async (dispatch) => {
        await Storage.setDownloadOption(option)
        dispatch(sendChangeDownloadOption(option));
    }
}

const sendChangeDownloadOption = (data) => {
    return {
        type: COMMON.CHANGE_DOWNLOAD_OPTION,
        data,
    };
};
