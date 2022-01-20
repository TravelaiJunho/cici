////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {BackHandler, Linking, Platform} from "react-native";
import axios from "axios";
import qs from "qs";
import moment from "moment";
import timezone from "moment-timezone";
import DeviceInfo from 'react-native-device-info';
import RNRestart from "react-native-restart";
import NetInfo from "@react-native-community/netinfo";
import VersionCheck from "react-native-version-check";
////////////////////
// Local
import {navRef} from "../../navigation/RootNavigation";
import {API_BASE_URL} from '@util/Constants';
import {OnServerListener} from './OnServerListener';
import Info from "../../util/Info";
import Storage from "../../util/Storage";
import localize from "../../util/Localize";
import {createTokenData} from "../../util/type/Token";
import {ANDROID_PACKAGE, IOS_APP_ID} from "../../util/Constants";
import Screen from "../../util/type/Screen";
import Common from "../../util/Common";
// API
import {refreshTokenAsync} from "../http/Authentication";

////////////////////////////////////////
// SETTING
////////////////////////////////////////

const initAxios = _ => {
    axios.defaults.baseURL = API_BASE_URL;
    axios.defaults.timeout = 10 * 1000; // 3 sec
    axios.interceptors.response.use(response => {
        return response;
    }, async error => {
        const {config, response} = error;
        const request = config;
        if (!request.retry && response.status === 401 && !Common.isEmpty(response.data)) {
            if (response.data.code === "208") { // Expired Access Token
                request.retry = true;
                const d = await refreshTokenAsync();
                if (!Common.isEmpty(d) && d.success) {
                    const info = createTokenData(d.data.refresh, d.data.access);
                    const r = await Storage.setUserInfo(info);
                    if (r) Info.setUserInfo(info);
                    request.headers['Authorization'] = getAccessToken();
                    return axios(request);
                }
            }
        }
        return Promise.reject(error);
    });
}

////////////////////////////////////////
// FUNCTION
////////////////////////////////////////

// Network
let isShowNetworkAlert = false;

const checkNetwork = callback => {
    NetInfo.fetch().then(state => {
        if (state.isConnected) {
            callback();
        } else {
            if (!isShowNetworkAlert) {
                isShowNetworkAlert = true;
                Common.showAlert(localize.error.network, _ => isShowNetworkAlert = false);
            }
        }
    });
}

// const checkNetworkAsync = async _ => {
//     const state = await NetInfo.fetch();
//     if (state.isConnected) {
//         return true;
//     } else {
//         if (!isShowNetworkAlert) {
//             isShowNetworkAlert = true;
//             Common.showAlert(localize.error.network, _ => isShowNetworkAlert = false);
//         }
//         return false;
//     }
// }

// Token
const getAccessToken = _ => {
    const {token} = Info.getUserInfo();
    return Common.isEmpty(token) ? '' : 'Bearer ' + token.access;
}

const getPushToken = _ => {
    const token = Info.getPushToken();
    return Common.isEmpty(token) ? '' : token;
}

// Header
const getHeaders = (contentType = '', useProgress = false) => {
    let defaultHeaders = {
        'Accept-Language': Info.getLanguage(),
        'Accept-Timezone': timezone.tz.guess(),
        'Authorization': getAccessToken(),
        'App-Version': DeviceInfo.getVersion(),
        'Device-OS': Platform.OS,
        'Device-Type': DeviceInfo.getModel(),
        'FCM-Token': getPushToken(),
    }
    if (!Common.isEmpty(contentType)) defaultHeaders['Content-Type'] = contentType;
    let headers = {headers: defaultHeaders}
    if (useProgress) {
        headers.onUploadProgress = ({total, loaded}) => {
            // if (onUploadProgress) {
            //     onUploadProgress(total, loaded)
            // }
        }
    }
    return headers;
}

// Alert
const checkBack = state => {
    switch (Common.getScreenRouteName(state)) {
        // Media
        case Screen.SCREEN_ACTIVITY.MEDIA_IMAGE:
        case Screen.SCREEN_ACTIVITY.MEDIA_WALLPAPER:
        case Screen.SCREEN_ACTIVITY.MEDIA_VIDEO:
        case Screen.SCREEN_ACTIVITY.MEDIA_YOUTUBE:
        case Screen.SCREEN_ACTIVITY.MEDIA_AUDIO:
        // Detail
        // case Screen.SCREEN_ACTIVITY.POST_DETAIL:
        case Screen.SCREEN_ACTIVITY.POST_DETAIL2:
        case Screen.SCREEN_ACTIVITY.NOTICE_DETAIL:
        case Screen.SCREEN_ACTIVITY.INQUIRE_DETAIL:
        case Screen.SCREEN_ACTIVITY.SUGGEST_DETAIL:
        case Screen.SCREEN_ACTIVITY.BANNER_DETAIL:
        case Screen.SCREEN_ACTIVITY.EVENT_DETAIL:
            return true;
    }
    return false;
}

const checkSystem = async callback => {
    const {message, date} = await Storage.getSystemData();
    if (Common.isEmpty(date)) {
        callback();
        return;
    }
    if (moment(date).isBefore(new Date())) {
        callback();
    } else {
        // 시스템 점검
        Common.showAlert(message, _ => {
            BackHandler.exitApp();
        });
        callback(false);
    }
}

const setSystemData = async (message, data) => {
    if (!Common.isEmpty(data.retry_at)) await Storage.setSystemData(message, data.retry_at);
}

const checkShowAlert = (code, message, data) => {
    switch (code) {
        case "999": // 시스템 점검
            setSystemData(message, data);
            Common.showAlert(message, _ => {
                BackHandler.exitApp();
            });
            break;

        case "980": // 강제 업데이트
            Common.showAlert(message, _ => {
                if (Common.checkIOS()) {
                    VersionCheck.getAppStoreUrl({appID: IOS_APP_ID})
                        .then(value => Linking.openURL(value))
                        .catch(reason => Common.debug(reason, true));
                } else {
                    VersionCheck.getPlayStoreUrl({packageName: ANDROID_PACKAGE})
                        .then(value => Linking.openURL(value))
                        .catch(reason => Common.debug(reason, true));
                }
            });
            break;

        case "206": // 회원 차단
            Common.showAlert(message, _ => {
                Storage.resetUserInfo();
                RNRestart.Restart();
            });
            break;

        case "306": // 없는 게시물
        case "314": // 삭제된 게시물
            Common.showAlert(message, _ => {
                if (!Common.isEmpty(navRef.current)) {
                    if (checkBack(navRef.current.getRootState()) && navRef.current.canGoBack()) {
                        navRef.current.goBack();
                    }
                }
            });
            break;
    }
}

// Data
const parseDataByListener = (status, data, listener) => {
    if (Common.isEmpty(data)) {
        listener(false);
    } else {
        listener(data.success, data.code, data.msg, data.data);
        checkShowAlert(data.code, data.msg, data.data);
    }
}

const createData = (success, code = 0, msg = '', data = null) => {
    return {
        success: success,
        code: code,
        msg: msg,
        data: data
    }
}

const parseData = (status, data) => {
    if (Common.isEmpty(data)) {
        return createData(false);
    } else {
        return createData(data.success, data.code, data.msg, data.data)
    }
}

const createQueryString = (data = {}) => {
    return qs.stringify(data, {
        addQueryPrefix: true,
        encodeValuesOnly: true,
    });
}

////////////////////////////////////////
// HTTP
////////////////////////////////////////

// Get
const get = (api, data, listener) => {
    checkNetwork(_ => {
        checkSystem((success = true) => {
            if (success) {
                axios.get(Common.isEmpty(data) ? api : api + createQueryString(data), getHeaders())
                    .then(value => parseDataByListener(value.status, value.data, listener))
                    .catch(reason => {
                        if (Common.isEmpty(reason.response)) {
                            listener(false);
                        } else {
                            parseDataByListener(reason.response.status, reason.response.data, listener)
                        }
                    });
            } else {
                listener(false);
            }
        });
    });
}

// Post
const post = (api, data, listener) => {
    checkNetwork(_ => {
        checkSystem((success = true) => {
            if (success) {
                axios.post(api, data, getHeaders())
                    .then(value => parseDataByListener(value.status, value.data, listener))
                    .catch(reason => {
                        if (Common.isEmpty(reason.response)) {
                            listener(false);
                        } else {
                            parseDataByListener(reason.response.status, reason.response.data, listener)
                        }
                    });
            } else {
                listener(false);
            }
        });
    });
}

const postAsync = async (api, data) => {
    const result = await axios.post(api, data, getHeaders());
    return parseData(result.status, result.data);
}

const postMultipart = (api, data, listener) => {
    checkNetwork(_ => {
        checkSystem((success = true) => {
            if (success) {
                axios.post(api, data, getHeaders("multipart/form-data"))
                    .then(value => parseDataByListener(value.status, value.data, listener))
                    .catch(reason => {
                        if (Common.isEmpty(reason.response)) {
                            listener(false);
                        } else {
                            parseDataByListener(reason.response.status, reason.response.data, listener)
                        }
                    });
            } else {
                listener(false);
            }
        });
    });
}

// Delete
const _delete = (api, data, listener) => {
    checkNetwork(_ => {
        checkSystem((success = true) => {
            if (success) {
                axios.delete(Common.isEmpty(data) ? api : api + createQueryString(data), getHeaders())
                    .then(value => parseDataByListener(value.status, value.data, listener))
                    .catch(reason => {
                        if (Common.isEmpty(reason.response)) {
                            listener(false);
                        } else {
                            parseDataByListener(reason.response.status, reason.response.data, listener)
                        }
                    });
            } else {
                listener(false);
            }
        });
    });
}

// Put
const put = (api, data, listener) => {
    checkNetwork(_ => {
        checkSystem((success = true) => {
            if (success) {
                axios.put(api, data, getHeaders())
                    .then(value => parseDataByListener(value.status, value.data, listener))
                    .catch(reason => {
                        if (Common.isEmpty(reason.response)) {
                            listener(false);
                        } else {
                            parseDataByListener(reason.response.status, reason.response.data, listener)
                        }
                    });
            } else {
                listener(false);
            }
        });
    });
}

const putMultipart = (api, data, listener) => {
    checkNetwork(_ => {
        checkSystem((success = true) => {
            if (success) {
                axios.put(api, data, getHeaders("multipart/form-data"))
                    .then(value => parseDataByListener(value.status, value.data, listener))
                    .catch(reason => {
                        if (Common.isEmpty(reason.response)) {
                            listener(false);
                        } else {
                            parseDataByListener(reason.response.status, reason.response.data, listener)
                        }
                    });
            } else {
                listener(false);
            }
        });
    });
}

////////////////////////////////////////
export {
    initAxios,
    // Method
    get,
    post, postAsync, postMultipart,
    _delete,
    put, putMultipart,
}
