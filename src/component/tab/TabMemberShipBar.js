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

class TabMemberShipBar extends BaseComponent {

    // Badge
    getBadgeState = (name) => {
        switch (name) {
            case Screen.STACK_MEMBERSHIP.TAB_NOTICE:
                return this.props.badgeNotice;
            case Screen.STACK_MEMBERSHIP.TAB_MEDIA:
                return this.props.badgeMedia;
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return this.props.badgeTalk;
            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return this.props.badgeEvent;
            default:
                return false;
        }
    }

    ////////////////////
    // RENDER
    render() {
        return <TabTopBar {...this.props}
                          getBadgeState={this.getBadgeState}/>
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        badgeNotice: state.badge.get('tab_top_membership_notice'),
        badgeMedia: state.badge.get('tab_top_membership_media'),
        badgeTalk: state.badge.get('tab_top_membership_talk'),
        badgeEvent: state.badge.get('tab_top_membership_event'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(TabMemberShipBar);
