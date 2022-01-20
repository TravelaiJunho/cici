////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {StyleSheet, View} from "react-native";
import {connect} from "react-redux";
////////////////////
// Local
import {navRef} from '../../navigation/RootNavigation';
import {CommunityTabNavigator} from '../../navigation/Navigator';
import BaseStyle from "../../util/style/Base.style";
import s from '../_style/Community.style';
import Screen from "../../util/type/Screen";
import {getGradeType, GRADE} from "../../util/type/User";
import Common from "../../util/Common";
// Component
import BaseScreen from "../_base/BaseScreen";
import SearchBar from "../../component/text/SearchBar";
import RecentRecordList from "../../component/record/RecentRecordList";
import BottomFilterForTalkTalk from "../../component/bottom_sheet/BottomFilterForTalkTalk";
import BottomFilterForToDaniel from "../../component/bottom_sheet/BottomFilterForToDaniel";
// API
import {setSearchTextForCommunity} from "../../data/redux/action/Community";
import {setFilterForTalkTalk} from "../../data/redux/action/TabTalkTalk";
import {setFilterForToDaniel} from "../../data/redux/action/TabToDaniel";
import {changeTopCommunityBadge} from "../../data/redux/action/Badge";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Community extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            isShowRecentRecord: false,
            // Top - Right Icon
            isShowTopRightPost: true,
            isShowTopRightFilter: true,
        }
    }

    ////////////////////
    // FUNCTION
    setSearchText = text => {
        this.setState({searchText: text}, _ => this.props.setSearchText(text));
    }

    setShowRecentRecord = isShow => {
        if (this.state.isShowRecentRecord !== isShow) {
            this.setState({isShowRecentRecord: isShow});
        }
    }

    // Top Right
    setShowTopRight = (showPost, showFilter) => {
        this.setState({
            isShowTopRightPost: showPost,
            isShowTopRightFilter: showFilter
        });
    }

    changeTabTalkTalk = _ => {
        this.setShowTopRight(true, true);
    }

    changeTabFromDaniel = _ => {
        const {profile} = this.props;
        this.setShowTopRight(!Common.isEmpty(profile) && getGradeType(profile.group.id) === GRADE.ARTIST, false);
    }

    changeTabToDaniel = _ => {
        const {profile} = this.props;
        this.setShowTopRight(!Common.isEmpty(profile) && getGradeType(profile.group.id) !== GRADE.ARTIST, true);
    }

    ////////////
    // Event
    onTabFocus = (name) => {
        this.props.updateBadge();
        switch (name) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return this.changeTabTalkTalk();
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return this.changeTabFromDaniel();
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return this.changeTabToDaniel();
        }
    }

    // Search
    onSelectRecentRecord = text => {
        this.search.onCancel(text);
    }

    // Filter
    onShowFilter = _ => {
        const {name} = navRef.current.getCurrentRoute();
        switch (name) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return this.filterForTalkTalk.open();
            // case Screen.STACK_COMMUNITY.FROM_DANIEL:
            //     return;
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return this.filterForToDaniel.open();
        }
    }

    onFilterByTalkTalk = (writers, tags) => this.props.sendFilterByTalkTalk(tags, writers);

    onFilterByToDaniel = (writers) => this.props.sendFilterByToDaniel(writers);

    // Post
    onPost = _ => {
        const {name} = navRef.current.getCurrentRoute();
        this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.POST, {type: name});
    };

    ////////////////////
    // RENDER
    renderHeader = (text, isFocus = false) => {
        const {isShowTopRightPost, isShowTopRightFilter} = this.state;
        return (
            <SearchBar ref={ref => this.search = ref}
                       text={text}
                       isFocus={isFocus}
                       onSearchText={this.setSearchText}
                       onEditing={this.setShowRecentRecord}
                       onShowFilter={this.onShowFilter}
                       onPost={this.onPost}
                       isShowTopRightPost={isShowTopRightPost}
                       isShowTopRightFilter={isShowTopRightFilter}/>);
    }

    renderRecentRecord = text =>
        <View style={[StyleSheet.absoluteFillObject, BaseStyle.container]}>
            <RecentRecordList addItem={text}
                              onSelectItem={this.onSelectRecentRecord}/>
        </View>

    renderTabNavigator = onScroll =>
        <CommunityTabNavigator onScroll={onScroll}
                               onTabFocus={this.onTabFocus}/>

    render() {
        const {searchText, isShowRecentRecord} = this.state;
        return (
            <View style={s.container}>
                {/* Todo - Scroll Interaction! */}
                {/*<ScrollableWithCollapsibleHeader*/}
                {/*    headerHeight={Layout.UISize(Layout.HEADER_HEIGHT)}*/}
                {/*    headerComponent={this.renderHeader}*/}
                {/*    listComponent={({style, onScroll, scrollEventThrottle}) =>*/}
                {/*        <Animated.View style={style}>*/}
                {/*            {this.renderTabNavigator(onScroll)}*/}
                {/*        </Animated.View>*/}
                {/*    }/>*/}

                {/* Top */}
                {this.renderHeader(searchText, isShowRecentRecord)}

                {/* Contents */}
                <View style={{flex: 1}}>
                    {/* Navigator */}
                    {this.renderTabNavigator()}
                    {/* Recent Record */}
                    {isShowRecentRecord && this.renderRecentRecord(searchText)}
                </View>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                {/* Filter */}
                <BottomFilterForTalkTalk ref={ref => this.filterForTalkTalk = ref}
                                         onChange={this.onFilterByTalkTalk}/>
                <BottomFilterForToDaniel ref={ref => this.filterForToDaniel = ref}
                                         onChange={this.onFilterByToDaniel}/>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // Common
        updateBadge: _ => {
            return dispatch(changeTopCommunityBadge());
        },
        setSearchText: text => {
            return dispatch(setSearchTextForCommunity(text));
        },
        // Talk Talk
        sendFilterByTalkTalk: (hashTag, publisher) => {
            return dispatch(setFilterForTalkTalk(hashTag, publisher));
        },
        // To Daniel
        sendFilterByToDaniel: (publisher) => {
            return dispatch(setFilterForToDaniel(publisher));
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Community);
