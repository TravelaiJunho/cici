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

class TabCommunityBar extends BaseComponent {

    ////////////////////
    // Badge
    getBadgeState = (name) => {
        switch (name) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return this.props.badgeTalkTalk;
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return this.props.badgeFromDaniel;
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return this.props.badgeToDaniel;
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
        badgeTalkTalk: state.badge.get('tab_top_community_talk_talk'),
        badgeFromDaniel: state.badge.get('tab_top_community_from_daniel'),
        badgeToDaniel: state.badge.get('tab_top_community_to_daniel'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(TabCommunityBar);
