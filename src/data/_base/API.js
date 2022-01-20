////////////////////////////////////////
// API
////////////////////////////////////////

const AUTH_LOGIN = '/auth/login/';
const AUTH_LOGOUT = '/auth/logout/';
const AUTH_REGISTER = '/auth/register/';
const AUTH_TOKEN_REFRESH = '/auth/token/refresh/';
const AUTH_EMAIL_VERIFY = '/auth/verify/email/';
const AUTH_EMAIL_RESEND = '/auth/verify/email/resend/';

// Token
const TOKEN_RESET = '/user/init/';
const TOKEN_CONVERT_APNS_TO_FCM = '/utils/convertApnToFcmToken/';

// User
const USER_PASSWORD_RESET = '/user/resetPassword/';
const USER_PASSWORD_RESET_REQUEST = '/user/resetPassword/request/';
const USER_INFO = '/user/info/';
const USER_PROFILE = '/user/profile/';
const USER_PROFILE_UPDATE = '/user/profile/update/';
const USER_PROFILE_IMAGE_UPDATE = '/user/profile/update/image/';
const USER_LEVEL_UP_REQUEST = '/user/levelUpRequest/';
const USER_LEAVE = '/user/leave/';
// const USER_PASSWORD_ = '';

// Setting
const SETTING_ALARM_ALLOW = '/user/alarm/config/allow/';
const SETTING_ALARM_SET = '/user/alarm/config/allow/set/';
const SETTING_ALARM_CANCEL = '/user/alarm/config/allow/cancel/';

// New
const NEW_CONFIRM = '/new/';
const NEW_COMMUNITY = '/community/new/';
const NEW_NOTICE = '/notice/new/';
const NEW_MEMBERSHIP = '/membership/new/';
const NEW_ALARM = '/user/alarm/new/';

// Content
const CONTENT = '/content/'
const CONTENT_FAQ = '/content/faq/';
const CONTENT_FAQ_CATEGORIES = '/content/faq/categories/';

// Index
const INDEX = '/index/';
const INDEX_DANIEL = '/index/daniel/';
const INDEX_DANIEL_LIST = '/index/daniel/daniel/';
const INDEX_DANIEL_DISCOGRAPHY = '/index/daniel/discography/';
const INDEX_DISCORAPHY_DETAIL = '/index/daniel/discography/';
const INDEX_WE_ARE_DANITY = '/index/daniel/weAreDanity/';

// Community
const COMMUNITY_REPORT_REASON_LIST = '/community/listReportReasons/';
const COMMUNITY_TAB_TALK_TALK = {
    POST: '/community/talktalk/',
    LIST: '/community/talktalk/',
    LIKE: '/community/talktalk/{0}/toggleLike/',
    DELETE: '/community/talktalk/{0}/',
    MODIFY: '/community/talktalk/{0}/',
    DETAIL: '/community/talktalk/{0}/',
    DECLARE: '/community/talktalk/{0}/report/',
    COMMENT_POST: '/community/talktalk/{0}/comment/',
    COMMENT_LIST: '/community/talktalk/{0}/comment/',
    COMMENT_DELETE_ITEM: '/community/talktalk/{0}/comment/{1}/',
    COMMENT_MODIFY_ITEM: '/community/talktalk/{0}/comment/{1}/',
    COMMENT_DECLARE_ITEM: '/community/talktalk/{0}/comment/{1}/report/',
    COMMENT_COUNT: '/community/talktalk/{0}/countComment/',
}
const COMMUNITY_TAB_FROM_DANIEL = {
    POST: '/community/fromDaniel/',
    LIST: '/community/fromDaniel/',
    LIKE: '/community/fromDaniel/{0}/toggleLike/',
    DELETE: '/community/fromDaniel/{0}/',
    MODIFY: '/community/fromDaniel/{0}/',
    DETAIL: '/community/fromDaniel/{0}/',
    DECLARE: '/community/fromDaniel/{0}/report/',
    COMMENT_POST: '/community/fromDaniel/{0}/comment/',
    COMMENT_LIST: '/community/fromDaniel/{0}/comment/',
    COMMENT_DELETE_ITEM: '/community/fromDaniel/{0}/comment/{1}/',
    COMMENT_MODIFY_ITEM: '/community/fromDaniel/{0}/comment/{1}/',
    COMMENT_DECLARE_ITEM: '/community/fromDaniel/{0}/comment/{1}/report/',
    COMMENT_COUNT: '/community/fromDaniel/{0}/countComment/',
}

const COMMUNITY_TAB_TO_DANIEL = {
    POST: '/community/toDaniel/',
    LIST: '/community/toDaniel/',
    LIKE: '/community/toDaniel/{0}/toggleLike/',
    DELETE: '/community/toDaniel/{0}/',
    MODIFY: '/community/toDaniel/{0}/',
    DETAIL: '/community/toDaniel/{0}/',
    DECLARE: '/community/toDaniel/{0}/report/',
    COMMENT_POST: '/community/toDaniel/{0}/comment/',
    COMMENT_LIST: '/community/toDaniel/{0}/comment/',
    COMMENT_DELETE_ITEM: '/community/toDaniel/{0}/comment/{1}/',
    COMMENT_MODIFY_ITEM: '/community/toDaniel/{0}/comment/{1}/',
    COMMENT_DECLARE_ITEM: '/community/toDaniel/{0}/comment/{1}/report/',
    COMMENT_COUNT: '/community/toDaniel/{0}/countComment/',
}

// Notice
const NOTICE_TAB_NOTICE = {
    CATEGORY_LIST: '/notice/notice/categories/',
    LIST: '/notice/notice/',
    DETAIL: '/notice/notice/{0}/',
}

const NOTICE_TAB_SCHEDULE = {
    LIST: '/notice/schedule/'
}

const NOTICE_TAB_MEDIA = {
    LIST: '/notice/media/',
    MEDIA_DETAIL: '/notice/media/{0}/',
}

const NOTICE_TAB_EVENT = {
    TAG_LIST: '/notice/event/feed/staticHashtags/',
    NOTICE_BANNER: '/notice/event/mission/',
    NOTICE_LIST: '/notice/event/',
    NOTICE_DETAIL: '/notice/event/{0}/',
    PART_POST: '/notice/event/feed/',
    PART_LIST: '/notice/event/feed/',
    PART_LIKE: '/notice/event/feed/{0}/toggleLike/',
    PART_DETAIL: '/notice/event/feed/{0}/',
    PART_DELETE: '/notice/event/feed/{0}/',
    PART_MODIFY: '',
    PART_DECLARE: '/notice/event/feed/{0}/report/',
    PART_COMMENT_POST: '/notice/event/feed/{0}/comment/',
    PART_COMMENT_LIST: '/notice/event/feed/{0}/comment/',
    PART_COMMENT_DELETE_ITEM: '/notice/event/feed/{0}/comment/{1}/',
    PART_COMMENT_MODIFY_ITEM: '/notice/event/feed/{0}/comment/{1}/',
    PART_COMMENT_DECLARE_ITEM: '/notice/event/feed/{0}/comment/{1}/report/',
    PART_COMMENT_COUNT: '/notice/event/feed/{0}/countComment/',
}

// MemberShip
const MEMBERSHIP_TAB_NOTICE = {
    CATEGORY_LIST: '/membership/notice/categories/',
    LIST: '/membership/notice/',
    DETAIL: '/membership/notice/{0}/',
}

const MEMBERSHIP_TAB_MEDIA = {
    LIST: '/membership/media/',
    MEDIA_DETAIL: '/membership/media/{0}/',
}

const MEMBERSHIP_TAB_TALK = {
    POST: '/membership/talktalk/',
    LIST: '/membership/talktalk/',
    LIKE: '/membership/talktalk/{0}/toggleLike/',
    DELETE: '/membership/talktalk/{0}/',
    MODIFY: '/membership/talktalk/{0}/',
    DETAIL: '/membership/talktalk/{0}/',
    DECLARE: '/membership/talktalk/{0}/report/',
    COMMENT_POST: '/membership/talktalk/{0}/comment/',
    COMMENT_LIST: '/membership/talktalk/{0}/comment/',
    COMMENT_DELETE_ITEM: '/membership/talktalk/{0}/comment/{1}/',
    COMMENT_MODIFY_ITEM: '/membership/talktalk/{0}/comment/{1}/',
    COMMENT_DECLARE_ITEM: '/membership/talktalk/{0}/comment/{1}/report/',
    COMMENT_COUNT: '/membership/talktalk/{0}/countComment/',
}

const MEMBERSHIP_TAB_EVENT = {
    TAG_LIST: '/membership/event/feed/staticHashtags/',
    NOTICE_BANNER: '/membership/event/mission/',
    NOTICE_LIST: '/membership/event/',
    NOTICE_DETAIL: '/membership/event/{0}/',
    PART_POST: '/membership/event/feed/',
    PART_LIST: '/membership/event/feed/',
    PART_LIKE: '/membership/event/feed/{0}/toggleLike/',
    PART_DETAIL: '/membership/event/feed/{0}/',
    PART_DELETE: '/membership/event/feed/{0}/',
    PART_MODIFY: '',
    PART_DECLARE: '/membership/event/feed/{0}/report/',
    PART_COMMENT_POST: '/membership/event/feed/{0}/comment/',
    PART_COMMENT_LIST: '/membership/event/feed/{0}/comment/',
    PART_COMMENT_DELETE_ITEM: '/membership/event/feed/{0}/comment/{1}/',
    PART_COMMENT_MODIFY_ITEM: '/membership/event/feed/{0}/comment/{1}/',
    PART_COMMENT_DECLARE_ITEM: '/membership/event/feed/{0}/comment/{1}/report/',
    PART_COMMENT_COUNT: '/membership/event/feed/{0}/countComment/',
}

// Alarm
const ALARM = {
    LIST: '/user/alarm/',
    READ: '/user/alarm/{0}/',
    READ_ALL: '/user/alarm/readAll/',
    COUNT: '/user/alarm/count/',
}

// Inquire
const INQUIRE = {
    POST: '/customer/qna/',
    LIST: '/customer/qna/',
    DETAIL: '/customer/qna/{0}/',
}

// Suggest
const SUGGEST = {
    POST: '/customer/suggest/',
    LIST: '/customer/suggest/',
    DETAIL: '/customer/suggest/{0}/',
}

// My Post
const MY_POST = {
    LIST: '/user/contents/',
}

const GOODS = {
    GOODS_LIST: '/goods/',
    GOODS_CATEGORY: '/goods/categories/',
    GOODS_DETAIL: '/goods/'
}

////////////////////////////////////////
export default {
    // Auth
    AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER,
    AUTH_TOKEN_REFRESH,
    AUTH_EMAIL_VERIFY, AUTH_EMAIL_RESEND,
    // Token
    TOKEN_RESET, TOKEN_CONVERT_APNS_TO_FCM,
    // User
    USER_PASSWORD_RESET, USER_PASSWORD_RESET_REQUEST, USER_INFO,
    USER_PROFILE, USER_PROFILE_UPDATE, USER_PROFILE_IMAGE_UPDATE,
    USER_LEVEL_UP_REQUEST,
    USER_LEAVE,
    // Setting
    SETTING_ALARM_ALLOW, SETTING_ALARM_SET, SETTING_ALARM_CANCEL,
    // NEW
    NEW_CONFIRM, NEW_COMMUNITY, NEW_NOTICE, NEW_MEMBERSHIP, NEW_ALARM,
    // Content
    CONTENT, CONTENT_FAQ, CONTENT_FAQ_CATEGORIES,
    // Index
    INDEX, INDEX_DANIEL, INDEX_DANIEL_LIST, INDEX_DANIEL_DISCOGRAPHY, INDEX_DISCORAPHY_DETAIL, INDEX_WE_ARE_DANITY,
    // Community
    COMMUNITY_REPORT_REASON_LIST,
    COMMUNITY_TAB_TALK_TALK, COMMUNITY_TAB_FROM_DANIEL, COMMUNITY_TAB_TO_DANIEL,
    // Notice
    NOTICE_TAB_NOTICE, NOTICE_TAB_SCHEDULE, NOTICE_TAB_MEDIA, NOTICE_TAB_EVENT,
    // MemberShip
    MEMBERSHIP_TAB_NOTICE, MEMBERSHIP_TAB_MEDIA, MEMBERSHIP_TAB_TALK, MEMBERSHIP_TAB_EVENT,
    // Alarm
    ALARM,
    // Service
    INQUIRE, SUGGEST,
    // My Post
    MY_POST,
    // GOODS
    GOODS,
}
