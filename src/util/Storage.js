////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment-timezone";
////////////////////
// Local
import {THRESHOLD_SEARCH_RECENT_RECORD, MAX_TRANSLATE_COUNT, LIMIT_TRANSLATE_DAY, DOWNLOAD_OPTION} from './Constants';
import Common from './Common';

////////////////////////////////////////
// KEY
////////////////////////////////////////

const KEY_CHECK_SYSTEM = '@CHECK_SYSTEM'; // 시스템 점검
const KEY_LANGUAGE = '@LANGUAGE'; // LANGUAGE
const KEY_USER_INFO = '@USER_INFO'; // Login User Info
const KEY_PUSH_TOKEN = '@PUSH_TOKEN'; // Push Token
const KEY_SEARCH_RECENT_RECORD = '@SEARCH_RECENT_RECORD'; // Recent Search Record
const KEY_TRANSLATE_LANGUAGE = '@TRANSLATE_LANGUAGE'; // Translate language code
const KEY_TRANSLATE_COUNT = '@TRANSLATE_COUNT';
const KEY_TRANSLATE_COUNT_DATE = '@TRANSLATE_COUNT_DATE';
////////////////////////////////////////

const reset = async key => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (e) {
        return false;
    }
};

////////////////////////////////////////
// Check System
const getSystemData = async _ => {
    try {
        const data = await AsyncStorage.getItem(KEY_CHECK_SYSTEM);
        return Common.isEmpty(data) ? {} : JSON.parse(data);
    } catch (e) {
        return {};
    }
};

const setSystemData = async (message, date) => {
    try {
        await AsyncStorage.setItem(KEY_CHECK_SYSTEM, JSON.stringify({
            message: message,
            date: date,
        }));
        return true;
    } catch (e) {
        return false;
    }
}

////////////////////////////////////////
// Language
const getLanguage = async _ => {
    try {
        return await AsyncStorage.getItem(KEY_LANGUAGE);
    } catch (e) {
        return '';
    }
};

const setLanguage = async lang => {
    try {
        await AsyncStorage.setItem(KEY_LANGUAGE, lang);
        return true;
    } catch (e) {
        return false;
    }
}

////////////////////////////////////////
// User Info
const getUserInfo = async _ => {
    try {
        const data = await AsyncStorage.getItem(KEY_USER_INFO);
        return Common.isEmpty(data) ? {} : JSON.parse(data);
    } catch (e) {
        return {};
    }
}

const setUserInfo = async (info) => {
    try {
        await AsyncStorage.setItem(KEY_USER_INFO, JSON.stringify(info));
        return true;
    } catch (e) {
        return false;
    }
}

const resetUserInfo = _ => {
    return reset(KEY_USER_INFO);
}

////////////////////////////////////////
// Push Token
const getPushToken = async _ => {
    try {
        return await AsyncStorage.getItem(KEY_PUSH_TOKEN);
    } catch (e) {
        return '';
    }
}

const setPushToken = async push => {
    try {
        await AsyncStorage.setItem(KEY_PUSH_TOKEN, push);
        return true;
    } catch (e) {
        return false;
    }
}

const resetPushToken = _ => {
    return reset(KEY_PUSH_TOKEN);
}

////////////////////////////////////////
// Recent Search Record
const getSearchRecord = async _ => {
    try {
        const data = await AsyncStorage.getItem(KEY_SEARCH_RECENT_RECORD);
        return Common.isEmpty(data) ? [] : JSON.parse(data);
    } catch (e) {
        return [];
    }
};

const setSearchRecordByList = async list => {
    try {
        await AsyncStorage.setItem(KEY_SEARCH_RECENT_RECORD, JSON.stringify(list));
        return true;
    } catch (e) {
        return false;
    }
};

const setSearchRecordByValue = async value => {
    try {
        const t = value.trim();
        if (Common.isEmpty(t)) return false;
        let list = await getSearchRecord();
        list.splice(0, 0, value); // Add
        list = Common.removeDuplicateList(list); // Duplicate
        if (list.length > THRESHOLD_SEARCH_RECENT_RECORD) {
            list = list.slice(0, THRESHOLD_SEARCH_RECENT_RECORD); // Slice
        }
        await setSearchRecordByList(list);
        return true;
    } catch (e) {
        return false;
    }
};

const setTranslateLanguageCode = async value => {
    try{
        //KEY_TRANSLATE_LANGUAGE
        await AsyncStorage.setItem(KEY_TRANSLATE_LANGUAGE, JSON.stringify(value));
        return true;
    }catch(e) {
        return false;
    }
}

const getTranslateLanguageCode = async _ => {
    try{
        //KEY_TRANSLATE_LANGUAGE
        const value = await AsyncStorage.getItem(KEY_TRANSLATE_LANGUAGE);
        return Common.isEmpty(value) ? null : JSON.parse(value);
    }catch(e) {
        return null;
    }
}

const setTranslateCount = async value => {
    try{
        //KEY_TRANSLATE_COUNT
        if(value >= MAX_TRANSLATE_COUNT) {
            let time = moment().format("YYYY-MM-DD");
            let ptime = await AsyncStorage.getItem(KEY_TRANSLATE_COUNT_DATE);
            if(Common.isEmpty(ptime)){
                value = 0;
                await AsyncStorage.setItem(KEY_TRANSLATE_COUNT_DATE, JSON.stringify(time));
            }else{
                time = moment(time);
                ptime = moment(JSON.parse(ptime));
                let diffday = time.diff(ptime, 'day');
                if(diffday >= LIMIT_TRANSLATE_DAY) {
                    value = 0;
                }
            }
        }
        await AsyncStorage.setItem(KEY_TRANSLATE_COUNT, JSON.stringify(value));
        return value;
    }catch(e) {
        console.warn(e)
    }
    return 0;
}

const getTranslateCount = async () =>{
    try{
        //KEY_TRANSLATE_COUNT
        const value = await AsyncStorage.getItem(KEY_TRANSLATE_COUNT);
        let time = moment().format("YYYY-MM-DD");
        let count = Common.isEmpty(value) ? 0 : JSON.parse(value)
        if(count == 0) {
            // update date
            await AsyncStorage.setItem(KEY_TRANSLATE_COUNT_DATE, JSON.stringify(time));
        }else{
            if(count >= MAX_TRANSLATE_COUNT) {
                // check time
                let ptime = await AsyncStorage.getItem(KEY_TRANSLATE_COUNT_DATE);
                if(Common.isEmpty(ptime)){
                    count = 0;
                    await AsyncStorage.setItem(KEY_TRANSLATE_COUNT_DATE, JSON.stringify(time));
                }else{
                    time = moment(time);
                    ptime = moment(JSON.parse(ptime));
                    let diffday = time.diff(ptime, 'day');
                    if(diffday >= LIMIT_TRANSLATE_DAY) {
                        count = 0;
                    }
                }
            }
        }

        return count;
    }catch(e) {
        console.warn(e);
    }
    return 0;
}

const resetTranslateCount = async _ => {
    await reset(KEY_TRANSLATE_COUNT_DATE);
    await reset(KEY_TRANSLATE_COUNT);
}

////////////////////////////////////////
export default {
    // reset,
    getSystemData, setSystemData,
    getLanguage, setLanguage,
    getUserInfo, setUserInfo, resetUserInfo,
    getPushToken, setPushToken, resetPushToken,
    getSearchRecord, setSearchRecordByValue, setSearchRecordByList,
    setTranslateLanguageCode, getTranslateLanguageCode,
    setTranslateCount, getTranslateCount, resetTranslateCount,
};
