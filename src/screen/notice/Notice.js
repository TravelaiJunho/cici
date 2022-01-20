////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {StyleSheet, View} from "react-native";
import {connect} from "react-redux";
////////////////////
// Local
import {navRef} from "../../navigation/RootNavigation";
import {NoticeTabNavigator} from '../../navigation/Navigator';
import BaseStyle from "../../util/style/Base.style";
import s from '../_style/Notice.style';
import Screen from "../../util/type/Screen";
// Component
import BaseScreen from "../_base/BaseScreen";
import SearchBar from "../../component/text/SearchBar";
import RecentRecordList from "../../component/record/RecentRecordList";
import BottomFilterForEvent from "../../component/bottom_sheet/BottomFilterForEvent";
// API
import {changeTopNoticeBadge} from "../../data/redux/action/Badge";
import {setFilterEventForNotice, setSearchTextEventForNotice} from "../../data/redux/action/TabEventForNotice";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Notice extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            isShowRecentRecord: false,
            // Top
            isShowTop: false,
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
    setShowTop = isShow => {
        if (this.state.isShowTop !== isShow) {
            this.setState({isShowTop: isShow});
        }
    }

    ////////////
    // Event
    onTabFocus = (name) => {
        this.props.updateBadge();
        switch (name) {
            case Screen.STACK_NOTICE.TAB_EVENT_PART:
                this.setShowTop(true);
                break;

            default:
                this.setShowTop(false);
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
            case Screen.STACK_NOTICE.TAB_EVENT:
                return this.filterForEvent.open();
        }
    }

    onFilterByEvent = (writers, tags) => {
        this.props.sendFilterByEvent(tags, writers);
    }

    ////////////////////
    // RENDER
    renderHeader = (text, isFocus = false) =>
        <SearchBar ref={ref => this.search = ref}
                   text={text}
                   isFocus={isFocus}
                   onSearchText={this.setSearchText}
                   onEditing={this.setShowRecentRecord}
                   onShowFilter={this.onShowFilter}
                   isShowTopRightPost={false}/>

    renderRecentRecord = text =>
        <View style={[StyleSheet.absoluteFillObject, BaseStyle.container]}>
            <RecentRecordList addItem={text}
                              onSelectItem={this.onSelectRecentRecord}/>
        </View>

    renderTabNavigator = onScroll =>
        <NoticeTabNavigator onScroll={onScroll}
                            onTabFocus={this.onTabFocus}
                            useHeader={true}/>

    render() {
        const {tagList} = this.props;
        const {searchText, isShowRecentRecord, isShowTop} = this.state;
        return (
            <View style={s.container}>
                {/* Top */}
                {isShowTop && this.renderHeader(searchText, isShowRecentRecord)}

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
        tagList: state.tab_event_for_notice.get('tagList'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateBadge: _ => {
            return dispatch(changeTopNoticeBadge());
        },
        setSearchText: text => {
            return dispatch(setSearchTextEventForNotice(text));
        },
        // Event
        sendFilterByEvent: (hashTag, publisher) => {
            return dispatch(setFilterEventForNotice(hashTag, publisher));
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
