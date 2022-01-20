
import React from 'react';
import {TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import moment from "moment";
import _ from "lodash";

import FontStyle from "../../../util/style/Font.style";

import localize from "../../../util/Localize";
import Layout from "../../../util/Layout";
import {colors} from "../../../util/Color";
import Common from "../../../util/Common";

import s from "../_style/GoodsList.style";

// Component
import BaseComponent from "../../_base/BaseComponent";
import BaseText from "../../_base/BaseText";
import BaseImage from "../../_base/BaseImage";
import RefreshFlatList from '../../_common/refresh/RefreshFlatList';
import RefreshState from '../../_common/refresh/RefreshState';
import {STATUS} from "../../../data/redux/_base/ActionType";

////////////////////////////////////////
// CLASS
////////////////////////////////////////
class GoodsList extends BaseComponent {
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

    loadRefreshList = _ => {
        const {onLoadRefresh} = this.props;
        onLoadRefresh && onLoadRefresh();
    }

    loadMoreList = _ => {
        const {onLoadMore} = this.props;
        onLoadMore && onLoadMore();
    }

    onSelectItem = item => {
        const {onSelectItem} = this.props;
        onSelectItem && onSelectItem(item);
    }

    //////////////////////////////////////////////////////////
    // RENDER

    renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                key={index}
                style={s.layout_item}
                onPress={_ => this.onSelectItem(item)}
            >
                <BaseImage
                    style={s.image_layout}
                    resizeMode={'contain'}
                    source={{uri:item.image}}
                />
                <View style={s.goods_info_layout}>
                    <BaseText style={[ s.types, FontStyle.CntTitleOrangeLH]} >{item.category.name}</BaseText>
                    <BaseText style={[FontStyle.BtnOnWhite16]} >{item.title}</BaseText>
                </View>
            </TouchableOpacity>
        )
    }
    ////////////////////
    // RENDER
    renderEmpty = (isLoading, list) => {
        return !isLoading && !Common.checkListSize(list) && (
            <View style={s.layout_empty}>
                <BaseText style={FontStyle.CntGrayDkCN}>{localize.error.list.empty}</BaseText>
            </View>);
    }

    render() {
        const {isLoading, list, headerComponent} = this.props;
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
                                ListHeaderComponent={headerComponent}
                                onHeaderRefresh={this.loadRefreshList}
                                onFooterRefresh={this.loadMoreList}/>;
    }
}
////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////
GoodsList.defaultProps = {
    isLoading: false,
    //
    onLoadRefresh: _ => {
    },
    onLoadMore: _ => {
    },
    onSelectItem: item => {
    },
};

GoodsList.propTypes = {
    isLoading: PropTypes.bool,
    //
    onLoadRefresh: PropTypes.func,
    onLoadMore: PropTypes.func,
    onSelectItem: PropTypes.func,
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default GoodsList;
