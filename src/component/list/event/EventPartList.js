////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {View} from "react-native";
import PropTypes from 'prop-types';
////////////////////
// Local
import FontStyle from "../../../util/style/Font.style";
import s from "../_style/EventPartList.style";
import localize from "../../../util/Localize";
import Screen from "../../../util/type/Screen";
import Common from "../../../util/Common";
// Component
import BaseComponent from '../../_base/BaseComponent';
import BaseText from "../../_base/BaseText";
import RefreshFlatList from '../../_common/refresh/RefreshFlatList';
import RefreshState from '../../_common/refresh/RefreshState';
import TabNoticeEventPartItem from "../../item/TabNoticeEventPartItem";
import TabMemberShipEventPartItem from "../../item/TabMemberShipEventPartItem";
// API
import {STATUS} from "../../../data/redux/_base/ActionType";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class EventPartList extends BaseComponent {

    ////////////////////
    // FUNCTION
    setStatusFooter = status => {
        switch (status) {
            case STATUS.COMPLETE:
                this.listView.endRefreshing(RefreshState.CanLoadMore);
                break;

            case STATUS.FAIL:
                this.listView.endRefreshing(RefreshState.NoMoreData);
                break;
        }
    };

    // Load Data
    loadRefreshList = _ => {
        const {onLoadRefresh} = this.props;
        onLoadRefresh && onLoadRefresh();
    }

    loadMoreList = _ => {
        const {onLoadMore} = this.props;
        onLoadMore && onLoadMore();
    }

    ////////////////////
    // RENDER
    renderEmpty = (isLoading, list) => {
        return !isLoading && !Common.checkListSize(list) && (
            <View style={s.layout_empty}>
                <BaseText style={FontStyle.CntGrayDkCN}>{localize.error.list.empty}</BaseText>
            </View>);
    }

    renderItem = ({item, index}) => {
        switch (this.props.type) {
            case Screen.STACK_NOTICE.TAB_EVENT:
                return <TabNoticeEventPartItem key={index}
                                               item={item}
                                               onRefresh={this.loadRefreshList}/>;

            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return <TabMemberShipEventPartItem key={index}
                                                   item={item}
                                                   onRefresh={this.loadRefreshList}/>;
        }
        return null;
    }

    render() {
        const {isLoading, list} = this.props;
        return <RefreshFlatList ref={ref => this.listView = ref}
                                style={{flex: 1}}
                                contentContainerStyle={{flexGrow: 1}}
                                extraData={this.state}
                                data={list}
                                threshold={2}
                                scrollEventThrottle={16}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderItem}
                                ItemSeparatorComponent={_ => <View style={s.layout_border}/>}
                                ListEmptyComponent={_ => this.renderEmpty(isLoading, list)}
                                onHeaderRefresh={this.loadRefreshList}
                                onFooterRefresh={this.loadMoreList}/>;
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

EventPartList.defaultProps = {
    isLoading: false,
    onLoadRefresh: _ => {
    },
    onLoadMore: _ => {
    },
};

EventPartList.propTypes = {
    isLoading: PropTypes.bool,
    type: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    onLoadRefresh: PropTypes.func,
    onLoadMore: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default EventPartList;
