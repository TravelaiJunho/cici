////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import moment from "moment";
////////////////////
// Local
import BaseStyle from "../../util/style/Base.style";
import FontStyle from "../../util/style/Font.style";
import s from '../_style/TabNotice.style';
import localize from "../../util/Localize";
import Screen from "../../util/type/Screen";
import Common from "../../util/Common";
// Component
import BaseScreen from "../_base/BaseScreen";
import BaseText from "../../component/_base/BaseText";
import Loader from "../../component/loader/Loader";
import Chips from "../../component/chip/Chips";
import RefreshFlatList from "../../component/_common/refresh/RefreshFlatList";
import RefreshState from "../../component/_common/refresh/RefreshState";
import EmptyView from "../../component/list/EmptyView";
// API
import {STATUS} from "../../data/redux/_base/ActionType";
import {getList} from "../../data/redux/action/TabNoticeForMemberShip";
import {getCategoryList} from "../../data/http/TabNoticeForMemberShip";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TabNotice extends BaseScreen {

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
            // Category
            categoryList: [],
            categoryId: -1,
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.props, nextProps, ['language'])) this.setLanguage(nextProps.language);
        if (Common.shouldUpdate(this.props, nextProps, ['profile'])) this.setProfile(nextProps.profile);
        if (Common.shouldUpdate(this.props, nextProps, ['status'])) this.setStatusRefresh(nextProps.status);
        if (Common.shouldUpdate(this.state, nextState, ['categoryId', 'categoryList'])) return true;
        if (Common.shouldUpdate(this.props, nextProps, ['page', 'isRefresh', 'list'])) return true;
        if (Common.shouldUpdate(this.state, nextState, ['isLoading', 'isShowLoader'])) return true;
        return false;
    }

    componentDidMount() {
        super.componentDidMount();
        this.init();
    }

    onFocus = _ => {
        const {onTabFocus} = this.props.route.params;
        onTabFocus && onTabFocus(Screen.STACK_MEMBERSHIP.TAB_NOTICE);
    }

    ////////////////////
    // FUNCTION
    init = _ => {
        this.setShowLoader(true);
        this.sendCategoryList();
        this.loadRefreshList();
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

    formatTime = date => {
        return moment(date).format(localize.format.date_time);
    }

    // Category
    createCategoryItem = (id, name) => {
        return {
            id: id,
            name: name
        }
    }

    setCategoryList = list => {
        let l = [this.createCategoryItem(-1, 'All')];
        this.setState({categoryList: l.concat(list)});
    }

    getCategoryTitleList = list => {
        let l = [];
        list.map(v => l.push(v.name));
        return l;
    }

    setCategoryId = id => {
        if (this.state.categoryId !== id) {
            this.setState({categoryId: id}, _ => this.loadRefreshList());
        }
    }

    // List
    getLastId = list => {
        if (!Common.checkListSize(list)) return '';
        const last = list[list.length - 1];
        if (Common.isEmpty(last.id)) return '';
        return last.id;
    }

    loadRefreshList = _ => {
        this.setLoading(true);
        this.props.refreshList(this.state.categoryId);
    }

    loadMoreList = _ => {
        this.setLoading(true);
        this.props.loadMoreList(this.state.categoryId, this.getLastId(this.props.list));
    }

    setStatusRefresh = status => {
        this.setShowLoader(false);
        this.setLoading(false);
        switch (status) {
            case STATUS.COMPLETE:
                this.listView.endRefreshing(RefreshState.CanLoadMore);
                break;

            case STATUS.FAIL:
                this.listView.endRefreshing(RefreshState.NoMoreData);
                break;
        }
    };

    // Event
    onSelectCategory = index => {
        const {categoryList} = this.state;
        this.setCategoryId(categoryList[index].id);
    }

    onDetail = item => {
        this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.NOTICE_DETAIL, {
            type: Screen.STACK_MEMBERSHIP.TAB_NOTICE,
            item: item
        });
    }

    ////////////
    // API
    sendCategoryList = _ => {
        getCategoryList((success, code, message, data) => {
            if (success) this.setCategoryList(data);
        });
    }

    ////////////////////
    // RENDER
    renderPropose = (item) => {
        const {is_propose_ended, propose_end_time} = item;
        let title = localize.event.status.progress;
        let endDate = this.formatTime(propose_end_time) + " " + localize.event.status.deadline;
        if(is_propose_ended) {
            title=localize.event.status.end;
        }
        return (
            <View style={s.layout_status2}>
                <View style={is_propose_ended ? s.layout_ended_status2 : s.layout_progress_status2}>
                    <BaseText style={is_propose_ended ? FontStyle.CaptionGrayCH : FontStyle.CaptionWhiteCH}>{title}</BaseText>
                </View>
                {/*<BaseText style={is_propose_ended ? FontStyle.SubCntGrayLN : FontStyle.SubCntOrangeLN}>{endDate}</BaseText>*/}
            </View>
        )
    }
    renderItem = ({item, index}) => {
        const {title, is_new, created_at, is_propose} = item;
        return (
            <TouchableOpacity key={index}
                              style={s.layout_item}
                              onPress={_ => this.onDetail(item)}>
                <View style={s.layout_item_top}>
                    {/* New */}
                    {is_new && <BaseText style={[FontStyle.CaptionWhiteCH, s.layout_item_new]}>NEW</BaseText>}
                    {/* Propose */}
                    {is_propose && this.renderPropose(item)}
                    {/* Title */}
                    <BaseText style={[FontStyle.Cnt13WhiteLN, s.layout_item_title]}
                              numberOfLines={1}>{title}</BaseText>
                </View>
                {/* Date */}
                <BaseText style={FontStyle.SubCntGrayLN}>{this.formatTime(created_at)}</BaseText>
            </TouchableOpacity>);
    }

    render() {
        const {isLoading, isShowLoader, categoryList} = this.state;
        const {list} = this.props;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isShowLoader}/>
                {/* Chip */}
                <View style={s.layout_chip}>
                    <Chips isVertical={false}
                           list={this.getCategoryTitleList(categoryList)}
                           onSelect={this.onSelectCategory}/>
                </View>
                <View style={{flex: 1}}>
                    {/* List */}
                    <RefreshFlatList ref={ref => this.listView = ref}
                                     extraData={this.state}
                                     data={list}
                                     threshold={2}
                                     scrollEventThrottle={16}
                                     keyExtractor={(item, index) => index.toString()}
                                     renderItem={this.renderItem}
                                     ItemSeparatorComponent={_ => <View style={s.layout_border}/>}
                                     onHeaderRefresh={this.loadRefreshList}
                                     onFooterRefresh={this.loadMoreList}/>
                    {/* Empty */}
                    {!isLoading && !Common.checkListSize(list) && <EmptyView/>}
                </View>
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
        // Tab Notice
        status: state.tab_notice_for_membership.get('status'),
        list: state.tab_notice_for_membership.get('list'),
        page: state.tab_notice_for_membership.get('page'),
        isRefresh: state.tab_notice_for_membership.get('isRefresh'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshList: categoryId => {
            return dispatch(getList(categoryId, '', 1, true));
        },
        loadMoreList: (categoryId, lastId) => {
            return dispatch(getList(categoryId, lastId));
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(TabNotice);
