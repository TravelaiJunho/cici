////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import moment from "moment";
////////////////////
// Local
import BaseStyle from "../../../util/style/Base.style";
import FontStyle from "../../../util/style/Font.style";
import s from "../../_style/SuggestList.style";
import localize from "../../../util/Localize";
import Screen from "../../../util/type/Screen";
import Common from "../../../util/Common";
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import BaseText from "../../../component/_base/BaseText";
import BackHeader from "../../../component/header/BackHeader";
import RefreshState from "../../../component/_common/refresh/RefreshState";
import RefreshFlatList from "../../../component/_common/refresh/RefreshFlatList";
import EmptyView from "../../../component/list/EmptyView";
// API
import {STATUS} from "../../../data/redux/_base/ActionType";
import {getList} from '../../../data/redux/action/Suggest';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class SuggestList extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // Language
            language: props.language,
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.props, nextProps, ['language'])) this.setLanguage(nextProps.language);
        if (Common.shouldUpdate(this.props, nextProps, ['status'])) this.setStatusRefresh(nextProps.status);
        if (Common.shouldUpdate(this.props, nextProps, ['page', 'isRefresh', 'list'])) return true;
        if (Common.shouldUpdate(this.state, nextState, ['isLoading'])) return true;
        return false;
    }

    componentDidMount() {
        super.componentDidMount();
        this.init();
    }

    ////////////////////
    // FUNCTION
    init = _ => {
        this.loadRefreshList();
    }

    setShowLoading = isShow => {
        if (this.state.isLoading !== isShow) {
            this.setState({isLoading: isShow});
        }
    }

    setLanguage = lang => this.setState({language: lang}, this.init);

    formatTime = date => {
        return moment(date).format(localize.format.date_time);
    }

    getLastId = list => {
        if (!Common.checkListSize(list)) return '';
        const last = list[list.length - 1];
        if (Common.isEmpty(last.id)) return '';
        return last.id;
    }

    loadRefreshList = _ => {
        this.setShowLoading(true);
        this.props.refreshList();
    }

    loadMoreList = _ => {
        this.setShowLoading(true);
        this.props.loadMoreList(this.props.page + 1);
        // this.props.loadMoreList(this.getLastId(this.props.list));
    }

    setStatusRefresh = status => {
        this.setShowLoading(false);
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
    onSelectItem = item => {
        this.props.navigation.navigate(Screen.SCREEN_ACTIVITY.SUGGEST_DETAIL, {id: item.id});
    }

    ////////////////////
    // RENDER
    renderItem = ({item, index}) => {
        const {title, created_at} = item;
        return (
            <TouchableOpacity style={s.layout_item}
                              onPress={_ => this.onSelectItem(item)}>
                {/* Title */}
                <BaseText style={[FontStyle.HeadlineCntWhiteCH, s.layout_title]} numberOfLines={1}>{title}</BaseText>
                {/* Date */}
                <BaseText style={[FontStyle.SubCntGrayLN, s.layout_date]}>{this.formatTime(created_at)}</BaseText>
            </TouchableOpacity>);
    }

    render() {
        const {isLoading} = this.state;
        const {list} = this.props;
        return (
            <View style={BaseStyle.container}>
                {/*, {marginBottom: Layout.getBottomSpace()}*/}
                {/* Loading */}
                {/*<Loader isLoading={isLoading}/>*/}
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.suggest.history}
                            onBackPress={_ => this.props.navigation.pop()}/>
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
            </View>
        );
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        // Common
        language: state.common.get('language'),
        // Suggest
        status: state.suggest.get('status'),
        list: state.suggest.get('list'),
        page: state.suggest.get('page'),
        isRefresh: state.suggest.get('isRefresh'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshList: _ => {
            return dispatch(getList('', 1, true));
        },
        loadMoreList: page => {
            return dispatch(getList('', page));
        },
        // loadMoreList: lastId => {
        //     return dispatch(getList(lastId));
        // },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(SuggestList);