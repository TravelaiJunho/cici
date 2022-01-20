////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import Common from "./Common";
import Screen from "./type/Screen";
import {BOARD} from "./type/Board";
import {MEDIA_RESPONSE} from "./type/Media";
// API
import {detailForTalkTalk} from "../data/http/TabTalkTalk";
import {detailForFromDaniel} from "../data/http/TabFromDaniel";
import {detailForToDaniel} from "../data/http/TabToDaniel";
import {detailForTalk} from "../data/http/TabTalk";
import {detailForNotice} from "../data/http/TabNoticeForNotice";
import {detailForMemberShip} from "../data/http/TabNoticeForMemberShip";
import {detailMediaForNotice} from "../data/http/TabMediaForNotice";
import {detailMediaForMemberShip} from "../data/http/TabMediaForMemberShip";
import {detailNoticeEventForNotice, detailPartEventForNotice} from "../data/http/TabEventForNotice";
import {detailNoticeEventForMemberShip, detailPartEventForMemberShip} from "../data/http/TabEventForMemberShip";

////////////////////////////////////////

const showPostDetail = (navigation, type, item, myItem = null) => {
    navigation.navigate(Screen.SCREEN_ACTIVITY.POST_DETAIL2, {type: type, item: item, myItem: myItem});
}

const showNoticeDetail = (navigation, type, item, myItem = null) => {
    navigation.navigate(Screen.SCREEN_ACTIVITY.NOTICE_DETAIL, {type: type, item: item, myItem: myItem});
}

const showEventDetail = (navigation, type, item, myItem = null) => {
    navigation.navigate(Screen.SCREEN_ACTIVITY.EVENT_DETAIL, {type: type, item: item, myItem: myItem});
}

const showMediaDetail = (navigation, item, myItem = null) => {
    switch (item.media_type) {
        case MEDIA_RESPONSE.IMAGE_DEFAULT:
            return navigation.navigate(Screen.SCREEN_ACTIVITY.MEDIA_IMAGE, {item: item, myItem: myItem});
        case MEDIA_RESPONSE.IMAGE_WALLPAPER:
            return navigation.navigate(Screen.SCREEN_ACTIVITY.MEDIA_WALLPAPER, {item: item, myItem: myItem});
        case MEDIA_RESPONSE.VIDEO_FILE:
            return navigation.navigate(Screen.SCREEN_ACTIVITY.MEDIA_VIDEO, {item: item, myItem: myItem});
        case MEDIA_RESPONSE.VIDEO_YOUTUBE:
            return navigation.navigate(Screen.SCREEN_ACTIVITY.MEDIA_YOUTUBE, {item: item, myItem: myItem});
        case MEDIA_RESPONSE.AUDIO_FILE:
            return navigation.navigate(Screen.SCREEN_ACTIVITY.MEDIA_AUDIO, {item: item, myItem: myItem});
    }
}

const showDetail = (navigation, type, id, callback = null) => {
    if (Common.isEmpty(navigation) || Common.isEmpty(type) || Common.isEmpty(id)) {
        callback && callback(false);
        return;
    }
    switch (type) {
        ////////////////////
        // POST
        ////////////////////

        case BOARD.COMMUNITY_TALK_TALK:
            detailForTalkTalk(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showPostDetail(navigation, BOARD.COMMUNITY_TALK_TALK, data);
            });
            break;

        case BOARD.COMMUNITY_FROM_DANIEL:
            detailForFromDaniel(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showPostDetail(navigation, BOARD.COMMUNITY_FROM_DANIEL, data);
            });
            break;

        case BOARD.COMMUNITY_TO_DANIEL:
            detailForToDaniel(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showPostDetail(navigation, BOARD.COMMUNITY_TO_DANIEL, data);
            });
            break;

        case BOARD.MEMBERSHIP_TALK:
            detailForTalk(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showPostDetail(navigation, BOARD.MEMBERSHIP_TALK, data);
            });
            break;

        case BOARD.NOTICE_EVENT_NOTICE:
            detailNoticeEventForNotice(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showEventDetail(navigation, Screen.STACK_NOTICE.TAB_EVENT, data);
            });
            break;

        case BOARD.NOTICE_EVENT_PART:
            detailPartEventForNotice(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showPostDetail(navigation, BOARD.NOTICE_EVENT_PART, data);
            });
            break;

        case BOARD.MEMBERSHIP_EVENT_NOTICE:
            detailNoticeEventForMemberShip(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showEventDetail(navigation, Screen.STACK_MEMBERSHIP.TAB_EVENT, data);
            });
            break;

        case BOARD.MEMBERSHIP_EVENT_PART:
            detailPartEventForMemberShip(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showPostDetail(navigation, BOARD.MEMBERSHIP_EVENT_PART, data);
            });
            break;

        ////////////////////
        // NOTICE
        ////////////////////

        case BOARD.NOTICE_NOTICE:
            detailForNotice(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showNoticeDetail(navigation, Screen.STACK_NOTICE.TAB_NOTICE, data);
            });
            break;

        case BOARD.MEMBERSHIP_NOTICE:
            detailForMemberShip(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showNoticeDetail(navigation, Screen.STACK_MEMBERSHIP.TAB_NOTICE, data);
            });
            break


        ////////////////////
        // MEDIA
        ////////////////////

        case BOARD.NOTICE_MEDIA:
            detailMediaForNotice(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showMediaDetail(navigation, data);
            });
            break;

        case BOARD.MEMBERSHIP_MEDIA:
            detailMediaForMemberShip(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showMediaDetail(navigation, data);
            });
            break;
    }
}

const showDetail_MyPost = (navigation, type, myItem, callback = null) => {
    if (Common.isEmpty(navigation) || Common.isEmpty(type) || Common.isEmpty(myItem)) {
        callback && callback(false);
        return;
    }
    let id = myItem.id;
    switch (type) {
        ////////////////////
        // POST
        ////////////////////

        case BOARD.COMMUNITY_TALK_TALK:
            detailForTalkTalk(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showPostDetail(navigation, BOARD.COMMUNITY_TALK_TALK, data, myItem);
            });
            break;

        case BOARD.COMMUNITY_FROM_DANIEL:
            detailForFromDaniel(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showPostDetail(navigation, BOARD.COMMUNITY_FROM_DANIEL, data, myItem);
            });
            break;

        case BOARD.COMMUNITY_TO_DANIEL:
            detailForToDaniel(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showPostDetail(navigation, BOARD.COMMUNITY_TO_DANIEL, data, myItem);
            });
            break;

        case BOARD.MEMBERSHIP_TALK:
            detailForTalk(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showPostDetail(navigation, BOARD.MEMBERSHIP_TALK, data, myItem);
            });
            break;

        case BOARD.NOTICE_EVENT_NOTICE:
            detailNoticeEventForNotice(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showEventDetail(navigation, Screen.STACK_NOTICE.TAB_EVENT, data);
            });
            break;

        case BOARD.NOTICE_EVENT_PART:
            detailPartEventForNotice(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showPostDetail(navigation, BOARD.NOTICE_EVENT_PART, data);
            });
            break;

        case BOARD.MEMBERSHIP_EVENT_NOTICE:
            detailNoticeEventForMemberShip(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showEventDetail(navigation, Screen.STACK_MEMBERSHIP.TAB_EVENT, data);
            });
            break;

        case BOARD.MEMBERSHIP_EVENT_PART:
            detailPartEventForMemberShip(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showPostDetail(navigation, BOARD.MEMBERSHIP_EVENT_PART, data);
            });
            break;

        ////////////////////
        // NOTICE
        ////////////////////

        case BOARD.NOTICE_NOTICE:
            detailForNotice(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showNoticeDetail(navigation, Screen.STACK_NOTICE.TAB_NOTICE, data);
            });
            break;

        case BOARD.MEMBERSHIP_NOTICE:
            detailForMemberShip(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showNoticeDetail(navigation, Screen.STACK_MEMBERSHIP.TAB_NOTICE, data);
            });
            break


        ////////////////////
        // MEDIA
        ////////////////////

        case BOARD.NOTICE_MEDIA:
            detailMediaForNotice(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showMediaDetail(navigation, data);
            });
            break;

        case BOARD.MEMBERSHIP_MEDIA:
            detailMediaForMemberShip(id, (success, code, message, data) => {
                callback && callback(success);
                if (success) showMediaDetail(navigation, data);
            });
            break;
    }
}

////////////////////////////////////////

export {
    showDetail, showDetail_MyPost
}
