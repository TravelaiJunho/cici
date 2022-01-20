////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {BADGE} from '../_base/ActionType';
import {get} from "../../_base/BaseAxios";
import API from "../../_base/API";

////////////////////////////////////////
// Bottom Tab
export function changeBottomBadge() {
    return async (dispatch) => {
        get(API.NEW_CONFIRM, null, (success, code, message, data) => {
            if (success) {
                dispatch(sendBottom({
                    tab_bottom_home: data.daniel,
                    tab_bottom_community: data.community,
                    tab_bottom_notice: data.notice,
                    tab_bottom_membership: data.membership,
                    // tab_bottom_more: false
                }));
            }
        });
    };
}

const sendBottom = (data) => {
    return {
        type: BADGE.CHANGE_BOTTOM,
        data,
    };
};

////////////////////////////////////////
// Top Tab - Community
export function changeTopCommunityBadge() {
    return async (dispatch) => {
        get(API.NEW_COMMUNITY, null, (success, code, message, data) => {
            if (success) {
                dispatch(sendTopCommunity({
                    tab_top_community_talk_talk: data.talkTalk,
                    tab_top_community_from_daniel: data.fromDaniel,
                    tab_top_community_to_daniel: data.toDaniel,
                }));
            }
        });
    }
}

const sendTopCommunity = (data) => {
    return {
        type: BADGE.CHANGE_TOP_COMMUNITY,
        data,
    };
};

////////////////////////////////////////
// Top Tab - Notice
export function changeTopNoticeBadge() {
    return async (dispatch) => {
        get(API.NEW_NOTICE, null, (success, code, message, data) => {
            if (success) {
                dispatch(sendTopNotice({
                    tab_top_notice_notice: data.notice,
                    tab_top_notice_schedule: data.schedule,
                    tab_top_notice_event: data.event,
                    tab_top_notice_media: data.media,
                    tab_top_notice_goods:data.goods,
                }));
            }
        });
    }
}

const sendTopNotice = (data) => {
    return {
        type: BADGE.CHANGE_TOP_NOTICE,
        data,
    };
};

////////////////////////////////////////
// Top Tab - MemberShip
export function changeTopMemberShipBadge() {
    return async (dispatch) => {
        get(API.NEW_MEMBERSHIP, null, (success, code, message, data) => {
            if (success) {
                dispatch(sendTopMemberShip({
                    tab_top_membership_notice: data.notice,
                    tab_top_membership_media: data.media,
                    tab_top_membership_talk: data.talkTalk,
                    tab_top_membership_event: data.event,
                }));
            }
        });
    }
}

const sendTopMemberShip = (data) => {
    return {
        type: BADGE.CHANGE_TOP_NOTICE,
        data,
    };
};

////////////////////////////////////////
// Alarm
export function changeAlarm() {
    return async (dispatch) => {
        get(API.NEW_ALARM, null, (success, code, message, data) => {
            if (success) dispatch(sendAlarm({alarm: data.alarm}));
        });
    }
}

const sendAlarm = (data) => {
    return {
        type: BADGE.CHANGE_ALARM,
        data,
    };
};

export function changeAlarmCount() {
    return async (dispatch) => {
        get(API.ALARM.COUNT, null, (success, code, message, data) => {
            // if (success) setBadgeCount(data.alarm_count);
        });
    }
}
