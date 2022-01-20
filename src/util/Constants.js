////////////////////////////////////////
// COMMON
////////////////////////////////////////

const PACKAGE = 'com.konnectent.kd';
const ANDROID_PACKAGE = 'com.konnectent.kd';
const IOS_APP_ID = '1555431197';

const INFO_EMAIL = 'fan@konnectent.com';

const THUMBNAIL_LEVEL = { // 0 ~ 4
    FEED: 3,
    GRID: 3,
    AUDIO: 3,
}

const FEED_CONTENTS_LINE = 4;

////////////////////////////////////////
// API
////////////////////////////////////////

const API = {
    url: 'https://api.konnectent.io/api/v1',
    youtube: 'AIzaSyDmLKX53EhNuTVldwKmoux9xYjx0bxVjYU'
}

const API_BASE_URL = API.url;
const YOUTUBE_KEY = API.youtube;


////////////////////////////////////////
// THRESHOLD
////////////////////////////////////////

const THRESHOLD_SEARCH_RECENT_RECORD = 20;

const ADD_IMAGE_MAX = 5;

////////////////////////////////////////
// TRANSLATE
////////////////////////////////////////

const TRANSLATE_ENGLISH = 'en';
const TRANSLATE_KOREAN = 'ko';

const KOREAN = "한국어";
const ENGLISH = "English";

const INJECTED_JS = `
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
    meta.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(meta);   
    setTimeout(function() { 
        window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
    }, 500);  
    true; // note: this is required, or you'll sometimes get silent failures`

///////////////////////////////////
// 자동 번
// 자동번역 제한 갯수
const MAX_TRANSLATE_COUNT = 30;
// 자동번역 제한 날짜
const LIMIT_TRANSLATE_DAY = 1;

///////////////////////////////////
// 다운로드 옵션
const DOWNLOAD_OPTION = {
    WIFI_ONLY: 0,
    ALL: 1,
}

///////////////////////////////////
// 개발 define
const THIRD_DEV = true;
////////////////////////////////////////
export {
    PACKAGE, ANDROID_PACKAGE, IOS_APP_ID,
    INFO_EMAIL, THUMBNAIL_LEVEL, FEED_CONTENTS_LINE,
    API_BASE_URL, YOUTUBE_KEY,
    THRESHOLD_SEARCH_RECENT_RECORD, ADD_IMAGE_MAX,
    TRANSLATE_ENGLISH, TRANSLATE_KOREAN,
    KOREAN, ENGLISH,
    INJECTED_JS,
    MAX_TRANSLATE_COUNT, LIMIT_TRANSLATE_DAY,
    DOWNLOAD_OPTION,
    // dev define
    THIRD_DEV
};
