////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {ScrollView, View} from "react-native";
import {connect} from "react-redux";
////////////////////
// Local
import BaseStyle from "../../../util/style/Base.style";
import {BOARD} from "../../../util/type/Board";
import Common from "../../../util/Common"
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import Loader from "../../../component/loader/Loader";
import BackHeader from "../../../component/header/BackHeader";
import TalkTalkItem from "../../../component/item/TabTalkTalkItem";
import FromDanielItem from "../../../component/item/TabFromDanielItem";
import ToDanielItem from "../../../component/item/TabToDanielItem";
import TalkItem from "../../../component/item/TabTalkItem";
import TabMemberShipEventPartItem from "../../../component/item/TabMemberShipEventPartItem";
import TabNoticeEventPartItem from "../../../component/item/TabNoticeEventPartItem";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class PostDetail2 extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        const {item} = props.route.params;
        // State
        let title = this.getTitle();
        this.state = {
            isLoading: false,
            // Data
            title: title,
            item:  item
        }

        this.tempData = null;
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        super.componentDidMount();
        this.addBackHandler();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.removeBackHandler();
    }

    onFocus = () => {
        let postData = Common.getPostData();
        if(postData) {
            this.setState({
                item: postData
            })
            Common.setPostData(null)
        }
    }

    ////////////////////
    // FUNCTION
    setShowLoading = isShow => {
        if (this.state.isLoading !== isShow) {
            this.setState({isLoading: isShow});
        }
    }

    getTitle = _ => {
        switch (this.props.route.params.type) {
            ////////////////////
            // Community
            case BOARD.COMMUNITY_TALK_TALK:
                return 'Talk Talk';
            case BOARD.COMMUNITY_FROM_DANIEL:
                return 'From Daniel';
            case BOARD.COMMUNITY_TO_DANIEL:
                return 'To Daniel';
            ////////////////////
            // Notice
            case BOARD.NOTICE_EVENT_PART:
                return 'Event';
            ////////////////////
            // MemberShip
            case BOARD.MEMBERSHIP_TALK:
                return 'Talk';
            case BOARD.MEMBERSHIP_EVENT_PART:
                return 'Event';
        }
    }

    onRefresh = () => {
        this.props.navigation.pop()
    }

    ////////////////////
    // RENDER
    renderItem = _ => {
        const {type, myItem} = this.props.route.params;
        const {item} = this.state;
        switch (type) {
            ////////////////////
            // Community
            case BOARD.COMMUNITY_TALK_TALK:
                return <TalkTalkItem item={item} isDetail={true} myItem={myItem} onRefresh={this.onRefresh}/>;
            case BOARD.COMMUNITY_FROM_DANIEL:
                return <FromDanielItem item={item} isDetail={true}  myItem={myItem}  onRefresh={this.onRefresh}/>;
            case BOARD.COMMUNITY_TO_DANIEL:
                return <ToDanielItem item={item} isDetail={true}  myItem={myItem}   onRefresh={this.onRefresh}/>;
            ////////////////////
            // Notice
            case BOARD.NOTICE_EVENT_PART:
                return <TabNoticeEventPartItem item={item} isDetail={true}/>;
            ////////////////////
            // MemberShip
            case BOARD.MEMBERSHIP_TALK:
                return <TalkItem item={item} isDetail={true} myItem={myItem}  onRefresh={this.onRefresh}/>;
            case BOARD.MEMBERSHIP_EVENT_PART:
                return <TabMemberShipEventPartItem item={item} isDetail={true}/>;
        }
    }

    render() {
        const {isLoading, title} = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={title}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/* Contents */}
                <ScrollView style={{flex: 1}}>
                    {this.renderItem()}
                </ScrollView>
            </View>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        profile: state.user.get('profile'),
        reasonList: state.common.get('reportReasonList'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail2);
