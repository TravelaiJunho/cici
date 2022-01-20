////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {connect} from "react-redux";
////////////////////
// Local
import Screen from "../../util/type/Screen";
import BaseComponent from "../_base/BaseComponent";
import TabTopBar from "./_base/TabTopBar";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TabNoticeBar extends BaseComponent {

    // Badge
    getBadgeState = (name) => {
        switch (name) {
            case Screen.STACK_NOTICE.TAB_NOTICE:
                return this.props.badgeNotice;
            case Screen.STACK_NOTICE.TAB_SCHEDULE:
                return this.props.badgeSchedule;
            case Screen.STACK_NOTICE.TAB_EVENT:
                return this.props.badgeEvent;
            case Screen.STACK_NOTICE.TAB_MEDIA:
                return this.props.badgeMedia;
            case Screen.STACK_NOTICE.TAB_GOODS:
                return this.props.badgeGoods;
            default:
                return false;
        }
    }

    ////////////////////
    // RENDER
    render() {
        return <TabTopBar {...this.props}
                          getBadgeState={this.getBadgeState}/>;
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        badgeNotice: state.badge.get('tab_top_notice_notice'),
        badgeSchedule: state.badge.get('tab_top_notice_schedule'),
        badgeEvent: state.badge.get('tab_top_notice_event'),
        badgeMedia: state.badge.get('tab_top_notice_media'),
        badgeGoods: state.badge.get('tab_top_notice_goods'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(TabNoticeBar);
