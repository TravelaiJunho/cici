////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {Platform} from "react-native";
import _ from 'lodash';
import * as RNLocalize from 'react-native-localize';
import urlParser from "js-video-url-parser";
import moment from "moment";
////////////////////
// Local
import RefManager from "./RefManager";
import {TRANSLATE_ENGLISH, TRANSLATE_KOREAN} from './Constants';
import {unzip} from "react-native-zip-archive";
import localize from "./Localize";

////////////////////////////////////////
// SEPARATOR
////////////////////////////////////////

const SEPARATOR_SPACE = ' ';
const SEPARATOR_COMMA = ',';
const SEPARATOR_NEWLINE = '\n';
const SEPARATOR_UNDERLINE = '_';
const SEPARATOR_DOT = '.';

////////////////////////////////////////
// COMMON
////////////////////////////////////////

// Debug
const debug = (msg, useJson = false, tag = 'TEST//') => {
    if (__DEV__) console.log(checkIOS() ? `i-${tag}` : `A-${tag}`, useJson ? JSON.stringify(msg) : msg);
};

// Check Empty
const isEmpty = obj => {
    return obj === null || obj === undefined || obj === '' || (typeof obj == 'object' && !Object.keys(obj).length);
};

// Check List Size
const checkListSize = list => {
    if (isEmpty(list)) {
        return false;
    }
    return list.length > 0;
};

// List Remove Duplicate
const removeDuplicateList = list => {
    return _.uniq(list)
    // return list.filter(function (value, index, self) {
    //     return self.indexOf(value) === index;
    // });
};

// Random Number
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * max) + min;
};

// Number Format
const symbols = [
    {value: 1, symbol: ''},
    {value: 1e3, symbol: 'k'},
    {value: 1e6, symbol: 'M'},
    {value: 1e9, symbol: 'G'},
    {value: 1e12, symbol: 'T'},
    {value: 1e15, symbol: 'P'},
    {value: 1e18, symbol: 'E'}
];

const numberFormatWithSymbol = (number = 0, digits = 0, isFloor = false) => {
    const numToCheck = Math.abs(number);
    for (let i = symbols.length - 1; i >= 0; i--) {
        if (numToCheck >= symbols[i].value) {
            let newNumber = number / symbols[i].value;
            const numbers = newNumber.toString().split('.')
            if (numbers.length > 1 && isFloor && digits > 0) {
                const floor = Math.pow(10, digits);
                newNumber = parseInt(newNumber * floor) / floor;
            }
            return `${newNumber}${symbols[i].symbol}`;
        }
    }
    return '0';
}

// Check Component Update
const shouldUpdate = (a, b, paths) => {
    for (let i = 0; i < paths.length; i++) {
        const equals = _.isEqual(_.get(a, paths[i]), _.get(b, paths[i]));
        if (!equals) return true;
    }
    return false;
}

// Alert
const showAlert = (message, callback = null) => {
    setTimeout(_ => {
        const a = RefManager.getRegisterRef(GLOBAL.ALERT);
        if (a) a.setVisible(true, message, callback);
    }, 100);
    // Alert.alert(null, message,
    //     [{text: localize.common.ok, onPress: _ => callback && callback()}],
    //     {cancelable: false});
}

// Screen Name
const getScreenRouteName = state => {
    if (isEmpty(state)) {
        return null;
    } else {
        const {routes, index} = state;
        return routes[index].name;
    }
}

////////////////////////////////////////
// DEVICE
////////////////////////////////////////

// Check OS
const checkAndroid = _ => {
    return Platform.OS === 'android'
}

const checkIOS = _ => {
    return Platform.OS === 'ios'
}

const checkWeb = _ => {
    return Platform.OS === 'web'
}

////////////////////////////////////////
// LANGUAGE
////////////////////////////////////////

const getDeviceLanguage = _ => {
    // [{"countryCode": "KR", "isRTL": false, "languageCode": "ko", "languageTag": "ko-KR"}]
    return RNLocalize.getLocales()[0].languageCode;
}

// const getDeviceLanguage = _ => {
//     return checkIOS()
//         ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
//         : NativeModules.I18nManager.localeIdentifier;
// }

const getLocaleLanguage = _ => {
    let locale;
    try {
        switch (getDeviceLanguage()) {
            case TRANSLATE_KOREAN:
                locale = TRANSLATE_KOREAN;
                break;

            default:
                locale = TRANSLATE_ENGLISH;
        }
    } catch (e) {
        locale = TRANSLATE_ENGLISH;
    }
    return locale
}

// const getLocaleLanguage = _ => {
//     let locale;
//     try {
//         const device = createListByUnderLine(getDeviceLanguage());
//         if (checkListSize(device)) {
//             switch (device[0]) {
//                 case TRANSLATE_KOREAN:
//                     locale = TRANSLATE_KOREAN;
//                     break;
//
//                 default:
//                     locale = TRANSLATE_ENGLISH;
//             }
//         }
//     } catch (e) {
//         locale = TRANSLATE_ENGLISH;
//     }
//     return locale
// }

////////////////////////////////////////
// TEXT
////////////////////////////////////////

const createTextWithSpace = (list, isAddSpace = false) => {
    let text = '';
    if (checkListSize(list)) {
        text = list.join(SEPARATOR_SPACE);
        if (isAddSpace) {
            text += SEPARATOR_SPACE;
        }
    }
    return text;
};

const createTextWithComma = list => {
    return checkListSize(list) ? list.join(SEPARATOR_COMMA) : '';
};

const createListBySpace = text => {
    if (isEmpty(text)) return [];
    return text.split(SEPARATOR_SPACE);
}

const createListByComma = text => {
    if (isEmpty(text)) return [];
    return text.split(SEPARATOR_COMMA);
}

const createListByNewLine = text => {
    if (isEmpty(text)) return [];
    return text.split(SEPARATOR_NEWLINE);
}

const createListByUnderLine = text => {
    if (isEmpty(text)) return [];
    return text.split(SEPARATOR_UNDERLINE);
}

const toNumberFormat = (text, digit = 0) => {
    return text.toLocaleString(undefined, {
        minimumFractionDigits: digit,
        maximumFractionDigits: digit
    });
}

const pad = (num, size) => {
    return ('000' + num).slice(size * -1);
}

const secondToTime = second => {
    let time = parseFloat(second).toFixed(3);
    let hours = Math.floor(time / 60 / 60);
    let minutes = Math.floor(time / 60) % 60;
    let seconds = Math.floor(time - minutes * 60);
    // let milliseconds = time.slice(-3);
    if (hours > 0) {
        return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
    } else {
        return pad(minutes, 2) + ':' + pad(seconds, 2);
    }
}

////////////////////////////////////////
// VALIDATION
////////////////////////////////////////

const isEmail = text => {
    return /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/i.test(text);
}

const checkPassword = text => {
    // 알파벳, 숫자, 특수기호, 8자 이상
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i.test(text);
}

const checkSpace = text => {
    return text.search(/\s/) !== -1
}

const checkSpecialChar = text => {
    return /[`~!@#$%^&*|\\\'\";:\/?^=^+_()<>]/.test(text);
}

const checkOnlyNumber = text => {
    return /[^0-9]/g.test(text);
}

const isEqualText = (text, values) => {
    return _.some(values, v => text === v);
}

const isContainsText = (text, values) => {
    return _.some(values, v => _.includes(text, v));
}

const FORMAT_DATE_UNDER_AGE = 'YYYYMMDD';

const checkUnder14Age = date => {
    const today = moment(new Date()).format(FORMAT_DATE_UNDER_AGE);
    const select = moment(date).format(FORMAT_DATE_UNDER_AGE);
    return parseInt(today) - parseInt(select) - 140000 < 0;
}

////////////////////////////////////////
// LINK
////////////////////////////////////////

const getYoutubeId = link => {
    try {
        let y = urlParser.parse(link);
        if (!isEmpty(y) &&
            !isEmpty(y.provider) && !isEmpty(y.id) &&
            y.provider === 'youtube') {
            return y.id;
        }
        return null;
    } catch (e) {
        return null;
    }
}

const getFileNameFromUrl = (url) => {
    if (url) {
        const tmp = url.split('/');
        return tmp.length ? tmp[tmp.length - 1] : '';
    }
    return '';
};

const setFormData = (formData, data, parentKey) => {
    if (!(formData instanceof FormData)) return;
    if (!(data instanceof Object)) return;

    Object.keys(data).forEach(key => {
        const val = data[key];
        if (parentKey) key = `${parentKey}[${key}]`;
        if (val instanceof Object && !Array.isArray(val)) {
            return setFormData(formData, val, key)
        }
        if (Array.isArray(val)) {
            val.forEach((v, idx) => {
                if (v instanceof Object) {
                    setFormData(formData, v, `${key}[${idx}]`);
                } else {
                    formData.append(`${key}[${idx}]`, v);
                }
            })
        } else {
            formData.append(key, val);
        }
    })
}

const formatBytes = (numBytes, decPlaces) => {
    /* Adjust the number of bytes informed for the most appropriate metric according
    to its value.

    Args:
        numBytes (number): The number of bytes (integer);
        decPlaces (Optional[number])): The number of decimal places (integer). If
            it is "undefined" the value "2" will be adopted.

    Returns:
        string: The number adjusted together with the most appropriate metric. */

    if (numBytes === 0) {
        return "0 Bytes";
    }

    // NOTE: 1 KB is equal to 1024 Bytes. By Questor
    // [Ref(s).: https://en.wikipedia.org/wiki/Kilobyte ]
    let oneKByte = 1024;

    // NOTE: Treats if the "decPlaces" is "undefined". If it is "undefined" the value
    // "2" will be adopted. By Questor
    if (decPlaces === undefined || decPlaces === "") {
        decPlaces = 2;
    }

    let byteMtrcs = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    // Byte Metrics

    // NOTE: Defines the factor for the number of bytes and the metric. By Questor
    let mtrcNumbFactor = Math.floor(Math.log(numBytes) / Math.log(oneKByte));
    // Metrics Number Factor

    return parseFloat((numBytes / Math.pow(oneKByte, mtrcNumbFactor)).
    toFixed(decPlaces)) + " " + byteMtrcs[mtrcNumbFactor];
}

////////////////////////////////////////
// zip
const unZipResource = (resourceFile, deleteSource = false) => {
    //const resourcePath = resourceFile.path()
}

////////////////////////////////////////
// check period
const PERIOD_STATE = {
    ERROR: -1,
    PREVIOUS : 0,
    WITHIN : 1,
    AFTER : 2,
}
const PERIOD_CHECK_UNIT = {
    Seconds: 0,
    Minutes: 1,
    Hours: 2,
    Days: 3,
    Months: 4,
    Years: 5,
}
const CheckDownloadTime = (dtime, stime, etime) => {
    try{
        let downloadTime = moment(dtime);
        let startTime = moment(stime);
        let endTime = moment(etime)
        let now = moment();
        let diffTime;
        diffTime = moment.duration(now.diff(downloadTime)).asMilliseconds();
        if(diffTime < 0) {
            return PERIOD_STATE.ERROR;
        }else{
            // check startTime
            diffTime = moment.duration(now.diff(startTime)).asMilliseconds();
            if(diffTime < 0) {
                return PERIOD_STATE.PREVIOUS;
            }else{
                if(isEmpty(etime)) {
                    return PERIOD_STATE.WITHIN;
                }else{
                    diffTime = moment.duration(now.diff(endTime)).asMilliseconds();
                    if(diffTime < 0) {
                        return PERIOD_STATE.WITHIN;
                    }else{
                        return PERIOD_STATE.AFTER;
                    }
                }

            }

        }
    }catch(e){
        debug(e)
    }
    return -1;
}

const CheckPeriod = (startDate, endDate, type= PERIOD_CHECK_UNIT.Seconds) => {
    try{
        let startTime = moment(startDate);
        let endTime = moment(endDate);
        let now = moment();
        let diffStartTime;
        let diffEndTime;
        switch(type) {
            case PERIOD_CHECK_UNIT.Seconds:
                diffStartTime = moment.duration(now.diff(startTime)).asMilliseconds();
                diffEndTime = moment.duration(now.diff(endTime)).asMilliseconds();
                break;
            case PERIOD_CHECK_UNIT.Minutes:
                diffStartTime = moment.duration(now.diff(startTime)).asMinutes();
                diffEndTime = moment.duration(now.diff(endTime)).asMinutes();
                break;
            case PERIOD_CHECK_UNIT.Hours:
                diffStartTime = moment.duration(now.diff(startTime)).asHours();
                diffEndTime = moment.duration(now.diff(endTime)).asHours();
                break;
            case PERIOD_CHECK_UNIT.Days:
                diffStartTime = moment.duration(now.diff(startTime)).asDays();
                diffEndTime = moment.duration(now.diff(endTime)).asDays();
                break;
            case PERIOD_CHECK_UNIT.Months:
                diffStartTime = moment.duration(now.diff(startTime)).asMonths();
                diffEndTime = moment.duration(now.diff(endTime)).asMonths();
                break;
            case PERIOD_CHECK_UNIT.Years:
                diffStartTime = moment.duration(now.diff(startTime)).asYears();
                diffEndTime = moment.duration(now.diff(endTime)).asYears();
                break;
        }
        if(diffStartTime < 0) {
            return PERIOD_STATE.PREVIOUS;
        }else{
            if(diffEndTime > 0) {
                return PERIOD_STATE.AFTER;
            }else{
                return PERIOD_STATE.WITHIN;
            }
        }
    }catch(e){
        debug(e)
    }
    return -1;
}

const makePeriod = (start, end) => {
    try{
        if(isEmpty(start) && isEmpty(end)) return "";

        let startTime = moment(start);
        let endTime = moment(end);

        if(isEmpty(start)) {
            return `~ ${endTime.format(localize.format.date_a_time)} `;
        }
        if(isEmpty(end)) {
            return `${startTime.format(localize.format.date_a_time)} ~`;
        }


        let samDay = Math.floor( moment.duration(endTime.diff(startTime)).asDays() );
        let samYear = Math.floor( moment.duration(endTime.diff(startTime)).asYears() );
        let period = `${startTime.format(localize.format.date_a_time)} - `;
        if(samYear!=0){
            period += endTime.format(localize.format.date_a_time);
        }else{
            if(samDay !=0) {
                period += endTime.format(localize.format.mont_a_time);
            }else {
                period += endTime.format(localize.format.a_hour);
            }
        }
        return period;
    }catch(e){
        console.warn(e)
    }
    return ''
}

// BLOCK CLICK
var pressBlockTime = new Date().getTime();
const CheckPressBlock = () => {
    let now = new Date().getTime();
    let check = now - pressBlockTime;

    //console.warn(now, check, pressBlockTime)


    if (check > 300) {
        pressBlockTime = now;

        return true;
    }
    return false;
}

////////////////////////////////////////
//
var post_data = null;
const setPostData = (data) => {
    post_data = data
}

const getPostData = () => {
    return post_data;
}

////////////////////////////////////////
export default {
    SEPARATOR_SPACE, SEPARATOR_COMMA, SEPARATOR_NEWLINE, SEPARATOR_DOT,
    //
    isEmpty, debug,
    checkListSize, removeDuplicateList,
    randomNumber, numberFormatWithSymbol,
    shouldUpdate,
    showAlert,
    getScreenRouteName,
    //
    checkAndroid, checkIOS, checkWeb,
    getLocaleLanguage,
    //
    createTextWithSpace, createTextWithComma,
    createListBySpace, createListByComma, createListByNewLine,
    toNumberFormat, secondToTime,
    //
    isEmail, checkPassword, checkSpace, checkSpecialChar, checkOnlyNumber,
    isEqualText, isContainsText, checkUnder14Age,
    //
    getYoutubeId,
    getFileNameFromUrl,
    //
    setFormData,
    // 용량 포맷
    formatBytes,
    // 기간 체크
    PERIOD_STATE, PERIOD_CHECK_UNIT, CheckPeriod, makePeriod, CheckDownloadTime,
    //
    CheckPressBlock,
    setPostData, getPostData
};
