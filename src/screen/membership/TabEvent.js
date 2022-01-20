////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import _ from "lodash";
////////////////////
// Local
import BaseStyle from "../../util/style/Base.style";
import s from '../_style/TabNotice.style';
import Screen from "../../util/type/Screen";
import localize from "../../util/Localize";
import Common from "../../util/Common";
// Component
import BaseScreen from "../_base/BaseScreen";
import Loader from "../../component/loader/Loader";
import Chips from "../../component/chip/Chips";
import EventNoticeList from "../../component/list/event/EventNoticeList";
import EventPartList from "../../component/list/event/EventPartList";
// API
import {getNoticeList, getPartList} from "../../data/redux/action/TabEventForMemberShip";
import {bannerNoticeEventForMemberShip} from "../../data/http/TabEventForMemberShip";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TabEvent extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowLoader: false,
            // Language
            language: props.language,
            // Profile
            profile: props.profile,
            // Chip
            isShowNotice: true,
            // Search
            searchText: props.searchText,
            // Filter
            partHashTag: props.partHashTag,
            partPublisher: props.partPublisher,
            // Banner
            banner: null,
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.props, nextProps, ['language'])) this.setLanguage(nextProps.language);
        if (Common.shouldUpdate(this.props, nextProps, ['profile'])) this.setProfile(nextProps.profile);
        // Notice
        if (Common.shouldUpdate(this.props, nextProps, ['noticeStatus'])) this.setStatusNoticeRefresh(nextProps.noticeStatus);
        if (Common.shouldUpdate(this.props, nextProps, ['noticePage', 'noticeIsRefresh', 'noticeList'])) return true;
        if (Common.shouldUpdate(this.state, nextState, ['banner'])) return true;
        // Part
        if (Common.shouldUpdate(this.props, nextProps, ['searchText'])) this.setSearchText(nextProps.searchText);
        if (Common.shouldUpdate(this.props, nextProps, ['partHashTag', 'partPublisher'])) this.setFilter(nextProps.partHashTag, nextProps.partPublisher);
        if (Common.shouldUpdate(this.props, nextProps, ['partStatus'])) this.setStatusPartRefresh(nextProps.partStatus);
        if (Common.shouldUpdate(this.props, nextProps, ['partPage', 'partIsRefresh', 'partList'])) return true;
        if (Common.shouldUpdate(this.state, nextState, ['isLoading', 'isShowLoader', 'isShowNotice'])) return true;
        return false;
    }

    componentDidMount() {
        super.componentDidMount();
        this.sendBanner();
        this.init();
    }

    onFocus = _ => {
        this.changeFocus();
    }

    ////////////////////
    // FUNCTION
    init = _ => {
        this.setShowLoader(true);
        this.loadRefreshNoticeList();
        this.loadRefreshPartList();
    }

    setLoading = isLoad => {
        if (this.state.isLoading !== isLoad) {
            this.setState({isLoading: isLoad});
        }
    }

    setShowLoader = isShow => {
        if (this.state.isShowLoader !== isShow) {
            this.setState({isShowLoader: isShow});
        }
    }

    setLanguage = lang => this.setState({language: lang}, this.init);

    setProfile = profile => this.setState({profile: profile}, this.init);

    changeFocus = _ => {
        const {onTabFocus} = this.props.route.params;
        if (onTabFocus) {
            if (this.state.isShowNotice) {
                onTabFocus(Screen.STACK_MEMBERSHIP.TAB_EVENT_NOTICE);
            } else {
                onTabFocus(Screen.STACK_MEMBERSHIP.TAB_EVENT_PART);
            }
        }
    }

    changeCategory = isNotice => {
        if (this.state.isShowNotice !== isNotice) {
            this.setState({isShowNotice: isNotice}, this.changeFocus);
        }
    }

    getLastId = list => {
        if (!Common.checkListSize(list)) return '';
        const last = list[list.length - 1];
        if (Common.isEmpty(last.id)) return '';
        return last.id;
    }

    ////////////
    // Notice List
    loadRefreshNoticeList = _ => {
        this.setLoading(true);
        this.props.refreshNoticeList();
    }

    loadMoreNoticeList = _ => {
        this.setLoading(true);
        this.props.loadMoreNoticeList(this.props.noticePage + 1);
        // const {noticeList, noticePage} = this.props;
        // this.props.loadMoreNoticeList(this.getLastId(noticeList), noticePage + 1);
    }

    setStatusNoticeRefresh = status => {
        this.setShowLoader(false);
        this.setLoading(false);
        if (!Common.isEmpty(this.noticeList)) this.noticeList.setStatusFooter(status);
    };

    // Part List
    loadRefreshPartList = _ => {
        this.setLoading(true);
        const {searchText, partHashTag, partPublisher} = this.state;
        this.props.refreshPartList(searchText, partHashTag, partPublisher)
    }

    loadMorePartList = _ => {
        this.setLoading(true);
        const {searchText, partHashTag, partPublisher} = this.state;
        this.props.loadMorePartList(searchText, partHashTag, partPublisher, this.getLastId(this.props.partList));
    }

    setStatusPartRefresh = status => {
        this.setShowLoader(false);
        this.setLoading(false);
        if (!Common.isEmpty(this.partList)) this.partList.setStatusFooter(status);
    };

    setSearchText = text => this.setState({searchText: text}, this.loadRefreshPartList);

    setFilter = (hashTag, publisher) => {
        let s = {};
        if (!_.isEqual(this.state.partHashTag, hashTag)) s.partHashTag = hashTag;
        if (!_.isEqual(this.state.partPublisher, publisher)) s.partPublisher = publisher;
        this.setState(s, this.loadRefreshPartList);
    }

    // Event
    onSelectCategory = index => {
        switch (index) {
            case 0: // 공지
                this.changeCategory(true);
                break;

            case 1: // 참여
                this.changeCategory(false);
                break;
        }
    }

    onSelectBanner = _ => {
        const {banner} = this.state;
        if (!Common.isEmpty(banner)) {
            this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.BANNER_DETAIL, {
                type: Screen.STACK_MEMBERSHIP.TAB_EVENT,
                item: banner
            });
        }
    }

    onSelectNoticeItem = item => {
        this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.EVENT_DETAIL, {
            type: Screen.STACK_MEMBERSHIP.TAB_EVENT,
            item: item
        });
    }

    ////////////////////
    // API
    sendBanner = _ => {
        bannerNoticeEventForMemberShip((success, code, message, data) => {
            if (success) this.setState({banner: data});
        });
    }

    ////////////////////
    // RENDER
    render() {
        const {isLoading, isShowLoader, isShowNotice, banner} = this.state;
        const {tagList, noticeList, partList} = this.props;
        const category = [
            localize.event.category.notice,
            localize.event.category.part,
        ];
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isShowLoader}/>
                {/* Chip */}
                <View style={s.layout_chip}>
                    <Chips isVertical={false}
                           list={category}
                           onSelect={this.onSelectCategory}/>
                </View>
                {isShowNotice
                    ? <EventNoticeList ref={ref => this.noticeList = ref}
                                       isLoading={isLoading}
                                       banner={banner}
                                       tags={tagList}
                                       list={noticeList}
                                       onLoadRefresh={this.loadRefreshNoticeList}
                                       onLoadMore={this.loadMoreNoticeList}
                                       onSelectBanner={this.onSelectBanner}
                                       onSelectItem={this.onSelectNoticeItem}/>
                    : <EventPartList ref={ref => this.partList = ref}
                                     isLoading={isLoading}
                                     type={Screen.STACK_MEMBERSHIP.TAB_EVENT}
                                     list={partList}
                                     onLoadRefresh={this.loadRefreshPartList}
                                     onLoadMore={this.loadMorePartList}/>}
            </View>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        // Common
        language: state.common.get('language'),
        profile: state.user.get('profile'),
        // Focus
        isFocus: state.tab_event_for_membership.get('isFocus'),
        // Tag
        tagList: state.tab_event_for_membership.get('tagList'),
        // Notice
        noticeStatus: state.tab_event_for_membership.get('noticeStatus'),
        noticeList: state.tab_event_for_membership.get('noticeList'),
        noticePage: state.tab_event_for_membership.get('noticePage'),
        noticeIsRefresh: state.tab_event_for_membership.get('noticeIsRefresh'),
        // Part
        searchText: state.tab_event_for_membership.get('searchText'),
        partHashTag: state.tab_event_for_membership.get('partHashTag'),
        partPublisher: state.tab_event_for_membership.get('partPublisher'),
        partStatus: state.tab_event_for_membership.get('partStatus'),
        partList: state.tab_event_for_membership.get('partList'),
        partPage: state.tab_event_for_membership.get('partPage'),
        partIsRefresh: state.tab_event_for_membership.get('partIsRefresh'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshNoticeList: _ => {
            return dispatch(getNoticeList('', 1, true));
        },
        loadMoreNoticeList: page => {
            return dispatch(getNoticeList('', page));
        },
        // loadMoreNoticeList: (lastId, page) => {
        //     return dispatch(getNoticeList(lastId, page));
        // },
        refreshPartList: (search, hashtag, publisher) => {
            return dispatch(getPartList(search, hashtag, publisher, '', 1, true));
        },
        loadMorePartList: (search, hashtag, publisher, lastId) => {
            return dispatch(getPartList(search, hashtag, publisher, lastId));
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(TabEvent);
