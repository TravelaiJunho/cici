////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {StyleSheet, View} from "react-native";
import {connect} from "react-redux";
////////////////////
// Local
import {navRef} from '../../navigation/RootNavigation';
import {MemberShipTabNavigator} from '../../navigation/Navigator';
import BaseStyle from "../../util/style/Base.style";
import s from '../_style/MemberShip.style';
import Screen from "../../util/type/Screen";
// Component
import BaseScreen from "../_base/BaseScreen";
import SearchBar from "../../component/text/SearchBar";
import RecentRecordList from "../../component/record/RecentRecordList";
import BottomFilterForTalkTalk from "../../component/bottom_sheet/BottomFilterForTalkTalk";
import BottomFilterForEvent from "../../component/bottom_sheet/BottomFilterForEvent";
// API
import {changeTopMemberShipBadge} from "../../data/redux/action/Badge";
import {setSearchTextForMemberShip} from "../../data/redux/action/MemberShip";
import {setFilterForTalk} from "../../data/redux/action/TabTalk";
import {
    setFilterEventForMemberShip,
    setSearchTextEventForMemberShip
} from "../../data/redux/action/TabEventForMemberShip";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class MemberShip extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            searchTextForTalk: '',
            searchTextForEvent: '',
            isShowRecentRecord: false,
            // Top
            isShowTopForTalk: false,
            isShowTopForEvent: false,
        }
    }

    ////////////////////
    // FUNCTION
    setSearchTextForTalk = text => {
        this.setState({searchTextForTalk: text}, _ => this.props.setSearchTextForTalk(text));
    }

    setSearchTextForEvent = text => {
        this.setState({searchTextForEvent: text}, _ => this.props.setSearchTextForEvent(text));
    }

    setShowRecentRecord = isShow => {
        if (this.state.isShowRecentRecord !== isShow) {
            this.setState({isShowRecentRecord: isShow});
        }
    }

    // Top
    setShowTop = (isShowTalk = false, isShowEvent = false) => {
        this.setState({
            isShowTopForTalk: isShowTalk,
            isShowTopForEvent: isShowEvent,
        });
    }

    ////////////
    // Event
    onTabFocus = (name) => {
        this.props.updateBadge();
        switch (name) {
            case Screen.STACK_MEMBERSHIP.TAB_NOTICE:
                return this.setShowTop();
            case Screen.STACK_MEMBERSHIP.TAB_MEDIA:
                return this.setShowTop();
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return this.setShowTop(true);
            case Screen.STACK_MEMBERSHIP.TAB_EVENT_NOTICE:
                return this.setShowTop();
            case Screen.STACK_MEMBERSHIP.TAB_EVENT_PART:
                return this.setShowTop(false, true);
        }
    }

    onSelectRecentRecord = text => {
        const {isShowTopForTalk, isShowTopForEvent} = this.state;
        if (isShowTopForTalk) {
            this.searchForTalk.onCancel(text);
        } else if (isShowTopForEvent) {
            this.searchForEvent.onCancel(text);
        }
    }

    ////////////
    // Talk
    ////////////

    // Filter
    onShowFilterForTalk = _ => this.filterForTalk.open();

    onFilterByTalk = (writers, tags) => this.props.sendFilterForTalk(tags, writers);

    // Post
    onPostForTalk = _ => {
        const {name} = navRef.current.getCurrentRoute();
        this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.POST, {type: name});
    };

    ////////////
    // Event
    ////////////

    // Filter
    onShowFilterForEvent = _ => this.filterForEvent.open();

    onFilterByEvent = (writers, tags) => this.props.sendFilterForEvent(tags, writers);

    ////////////////////
    // RENDER
    renderHeaderForTalk = (isFocus = false) => {
        const {searchTextForTalk} = this.state;
        return <SearchBar ref={ref => this.searchForTalk = ref}
                          text={searchTextForTalk}
                          isFocus={isFocus}
                          onSearchText={this.setSearchTextForTalk}
                          onEditing={this.setShowRecentRecord}
                          onShowFilter={this.onShowFilterForTalk}
                          onPost={this.onPostForTalk}/>;
    }

    renderHeaderForEvent = (isFocus = false) => {
        const {searchTextForEvent} = this.state;
        return <SearchBar ref={ref => this.searchForEvent = ref}
                          text={searchTextForEvent}
                          isFocus={isFocus}
                          onSearchText={this.setSearchTextForEvent}
                          onEditing={this.setShowRecentRecord}
                          onShowFilter={this.onShowFilterForEvent}
                          isShowTopRightPost={false}/>;
    }

    renderHeader = (isFocus = false) => {
        const {isShowTopForTalk, isShowTopForEvent} = this.state;
        if (isShowTopForTalk) {
            return this.renderHeaderForTalk(isFocus);
        } else if (isShowTopForEvent) {
            return this.renderHeaderForEvent(isFocus);
        } else {
            return null;
        }
    }

    renderRecentRecord = _ => {
        const {isShowTopForTalk, isShowTopForEvent} = this.state;
        let text = '';
        if (isShowTopForTalk) {
            text = this.state.searchTextForTalk;
        } else if (isShowTopForEvent) {
            text = this.state.searchTextForEvent;
        }
        return (
            <View style={[StyleSheet.absoluteFillObject, BaseStyle.container]}>
                <RecentRecordList addItem={text}
                                  onSelectItem={this.onSelectRecentRecord}/>
            </View>);
    }

    renderTabNavigator = onScroll =>
        <MemberShipTabNavigator onScroll={onScroll}
                                onTabFocus={this.onTabFocus}
                                useHeader={true}/>

    render() {
        const {tagList} = this.props;
        const {isShowRecentRecord} = this.state;
        return (
            <View style={s.container}>
                {/* Top */}
                {this.renderHeader(isShowRecentRecord)}

                {/* Contents */}
                <View style={{flex: 1}}>
                    {/* Navigator */}
                    {this.renderTabNavigator()}
                    {/* Recent Record */}
                    {isShowRecentRecord && this.renderRecentRecord()}
                </View>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                {/* Filter */}
                <BottomFilterForTalkTalk ref={ref => this.filterForTalk = ref}
                                         onChange={this.onFilterByTalk}/>
                <BottomFilterForEvent ref={ref => this.filterForEvent = ref}
                                      tagList={tagList}
                                      onChange={this.onFilterByEvent}/>
            </View>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        language: state.common.get('language'),
        profile: state.user.get('profile'),
        // Tag
        tagList: state.tab_event_for_membership.get('tagList'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // Common
        updateBadge: _ => {
            return dispatch(changeTopMemberShipBadge());
        },
        // Talk
        setSearchTextForTalk: text => {
            return dispatch(setSearchTextForMemberShip(text));
        },
        sendFilterForTalk: (hashTag, publisher) => {
            return dispatch(setFilterForTalk(hashTag, publisher));
        },
        // Event
        setSearchTextForEvent: text => {
            return dispatch(setSearchTextEventForMemberShip(text));
        },
        sendFilterForEvent: (hashTag, publisher) => {
            return dispatch(setFilterEventForMemberShip(hashTag, publisher));
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(MemberShip);
