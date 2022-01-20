////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
////////////////////
// Local
import BaseStyle from "../../util/style/Base.style";
import s from "../_style/TabFromDaniel.style";
import Screen from "../../util/type/Screen";
import Common from "../../util/Common";
// Component
import BaseScreen from "../_base/BaseScreen";
import RefreshFlatList from "../../component/_common/refresh/RefreshFlatList";
import RefreshState from "../../component/_common/refresh/RefreshState";
import FromDanielItem from "../../component/item/TabFromDanielItem";
import EmptyView from "../../component/list/EmptyView";
// API
import {STATUS} from "../../data/redux/_base/ActionType";
import {getList, setFocusForFromDaniel} from '../../data/redux/action/TabFromDaniel';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TabFromDaniel extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowLoader: false,
            // Language
            language: props.language,
            // Search
            searchText: props.searchText,
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.props, nextProps, ['language'])) this.setLanguage(nextProps.language);
        if (Common.shouldUpdate(this.props, nextProps, ['searchText'])) this.setSearchText(nextProps.searchText);
        if (Common.shouldUpdate(this.props, nextProps, ['status'])) this.setStatusRefresh(nextProps.status);
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
        onTabFocus && onTabFocus(Screen.STACK_COMMUNITY.TAB_FROM_DANIEL);
        // Cover To On
        if (this.props.isFocus) {
            this.loadRefreshList();
            this.props.sendFocus();
        }
    }

    ////////////////////
    // FUNCTION
    init = _ => {
        this.setShowLoader(true);
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

    setSearchText = text => this.setState({searchText: text}, this.loadRefreshList);

    getLastId = list => {
        if (!Common.checkListSize(list)) return '';
        const last = list[list.length - 1];
        if (Common.isEmpty(last.id)) return '';
        return last.id;
    }

    loadRefreshList = _ => {
        this.setLoading(true);
        const {searchText} = this.state;
        this.props.refreshList(searchText)
    }

    loadMoreList = _ => {
        this.setLoading(true);
        const {searchText} = this.state;
        this.props.loadMoreList(searchText, this.getLastId(this.props.list));
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

    ////////////////////
    // RENDER
    renderItem = ({item, index}) => <FromDanielItem key={index}
                                                    item={item}
                                                    onRefresh={this.loadRefreshList}/>;

    render() {
        // const {onScroll} = this.props.route.params;
        const {isLoading, isShowLoader} = this.state;
        const {list} = this.props;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                {/*<Loader isLoading={isShowLoader}/>*/}
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
        // Community
        searchText: state.community.get('communitySearchText'),
        // Focus
        isFocus: state.tab_from_daniel.get('isFocus'),
        // Tab From Daniel
        status: state.tab_from_daniel.get('status'),
        list: state.tab_from_daniel.get('list'),
        page: state.tab_from_daniel.get('page'),
        isRefresh: state.tab_from_daniel.get('isRefresh'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendFocus: _ => {
            return dispatch(setFocusForFromDaniel());
        },
        refreshList: (search) => {
            return dispatch(getList(search, '', 1, true));
        },
        loadMoreList: (search, lastId) => {
            return dispatch(getList(search, lastId));
        },

    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(TabFromDaniel);
