////////////////////////////////////////

import {Map} from 'immutable';
import {BADGE} from '../_base/ActionType';

////////////////////////////////////////

const initialState = Map({
    // Bottom
    tab_bottom_home: false,
    tab_bottom_community: false,
    tab_bottom_notice: false,
    tab_bottom_membership: false,
    tab_bottom_more: false,
    // Community
    tab_top_community_talk_talk: false,
    tab_top_community_from_daniel: false,
    tab_top_community_to_daniel: false,
    // Notice
    tab_top_notice_notice: false,
    tab_top_notice_schedule: false,
    tab_top_notice_media: false,
    tab_top_notice_event: false,
    tab_top_notice_goods: false,
    // MemberShip
    tab_top_membership_notice: false,
    tab_top_membership_media: false,
    tab_top_membership_talk: false,
    tab_top_membership_event: false,
    // Alarm
    alarm: false,
});

export default function Badge(state = initialState, action) {
    switch (action.type) {
        case BADGE.CHANGE_BOTTOM:
            return state.merge({
                tab_bottom_home: action.data.tab_bottom_home,
                tab_bottom_community: action.data.tab_bottom_community,
                tab_bottom_notice: action.data.tab_bottom_notice,
                tab_bottom_membership: action.data.tab_bottom_membership,
                tab_bottom_more: action.data.tab_bottom_more,
            });

        case BADGE.CHANGE_TOP_COMMUNITY:
            return state.merge({
                tab_top_community_talk_talk: action.data.tab_top_community_talk_talk,
                tab_top_community_from_daniel: action.data.tab_top_community_from_daniel,
                tab_top_community_to_daniel: action.data.tab_top_community_to_daniel,
            });

        case BADGE.CHANGE_TOP_NOTICE:
            return state.merge({
                tab_top_notice_notice: action.data.tab_top_notice_notice,
                tab_top_notice_schedule: action.data.tab_top_notice_schedule,
                tab_top_notice_event: action.data.tab_top_notice_event,
                tab_top_notice_media: action.data.tab_top_notice_media,
                tab_top_notice_goods: action.data.tab_top_notice_goods,
            });

        case BADGE.CHANGE_TOP_MEMBERSHIP:
            return state.merge({
                tab_top_membership_notice: action.data.tab_top_membership_notice,
                tab_top_membership_media: action.data.tab_top_membership_media,
                tab_top_membership_talk: action.data.tab_top_membership_talk,
                tab_top_membership_event: action.data.tab_top_membership_event,
            });

        case BADGE.CHANGE_ALARM:
            return state.merge({
                alarm: action.data.alarm,
            });

        default:
            return state;
    }
}

////////////////////////////////////////
