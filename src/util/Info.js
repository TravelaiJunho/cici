////////////////////////////////////////
// USER
////////////////////////////////////////

let USER = {}
const setUserInfo = (info) => USER = info
const getUserInfo = _ => USER

////////////////////////////////////////
// LANGUAGE
////////////////////////////////////////

let PUSH = ''
const setPushToken = (push = '') => PUSH = push
const getPushToken = _ => PUSH

////////////////////////////////////////
// LANGUAGE
////////////////////////////////////////

let LANGUAGE = '';
const setLanguage = (lang = '') => LANGUAGE = lang
const getLanguage = _ => LANGUAGE

////////////////////////////////////////
export default {
    setUserInfo, getUserInfo,
    setLanguage, getLanguage,
    setPushToken, getPushToken,
};
