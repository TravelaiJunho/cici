////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import moment from "moment";
import _ from "lodash";
////////////////////
// Local
import FontStyle from "../../../util/style/Font.style";
import s from "../_style/EventNoticeList.style";
import localize from "../../../util/Localize";
import Layout from "../../../util/Layout";
import {colors} from "../../../util/Color";
import {EVENT_STATUS, EVENT_TYPE} from "../../../util/type/Event";
import Common from "../../../util/Common";
// Component
import BaseComponent from '../../_base/BaseComponent';
import BaseText from "../../_base/BaseText";
import BaseImage from "../../_base/BaseImage";
import RefreshFlatList from '../../_common/refresh/RefreshFlatList';
import RefreshState from '../../_common/refresh/RefreshState';
// API
import {STATUS} from "../../../data/redux/_base/ActionType";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class EventNoticeList extends BaseComponent {

    ////////////////////
    // FUNCTION
    getTag = (code, type) => {
        if(EVENT_TYPE.VOTE === type) {
            return "#" + localize.vote.title;
        }
        if(Common.isEmpty(code)) {
            return '';
        }
        const {tags} = this.props;
        if (!Common.checkListSize(tags)) return '';
        const t = _.find(tags, v => {
            return v.code === code;
        });
        return '#' + t.name;
    }

    formatTime = date => {
        return moment(date).format(localize.format.date_time);
    }

    formatPeriodTime = (start, end) => {
        return `${this.formatTime(start)} ~ ${this.formatTime(end)}`;
    }

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

    // Event
    onSelectBanner = _ => {
        const {onSelectBanner} = this.props;
        onSelectBanner && onSelectBanner();
    }

    onSelectItem = item => {
        const {onSelectItem} = this.props;
        onSelectItem && onSelectItem(item);
    }

    ////////////////////
    // RENDER
    renderEmpty = (isLoading, list) => {
        return !isLoading && !Common.checkListSize(list) && (
            <View style={s.layout_empty}>
                <BaseText style={FontStyle.CntGrayDkCN}>{localize.error.list.empty}</BaseText>
            </View>);
    }

    renderBanner = _ => {
        const {banner} = this.props;
        if (Common.isEmpty(banner)) return null;
        if (Common.isEmpty(banner.image)) return null;
        return (
            <TouchableOpacity onPress={this.onSelectBanner}>
                <BaseImage style={s.layout_banner}
                           resizeMode={'cover'}
                           source={{uri: banner.image}}/>
            </TouchableOpacity>);
    }

    // Item
    renderProgressTag = type => {
        switch (type) {
            case EVENT_STATUS.PROGRESS:
                return (
                    <View style={[s.layout_item_tag, {backgroundColor: colors.orange}]}>
                        <BaseText style={FontStyle.Cnt13WhiteCN}>{localize.event.status.progress}</BaseText>
                    </View>);

            case EVENT_STATUS.PLAN:
                return (
                    <View style={[s.layout_item_tag, {borderWidth: Layout.UISize(1), borderColor: colors.orange}]}>
                        <BaseText style={FontStyle.Cnt13OrangeCB}>{localize.event.status.plan}</BaseText>
                    </View>);

            case EVENT_STATUS.WINNER:
                return (
                    <View style={[s.layout_item_tag, {borderWidth: Layout.UISize(1), borderColor: colors.mint}]}>
                        <BaseText style={FontStyle.Cnt13MintCB}>{localize.event.status.winner}</BaseText>
                    </View>);

            case EVENT_STATUS.END:
                return (
                    <View style={[s.layout_item_tag, {borderWidth: Layout.UISize(1), borderColor: colors.gray}]}>
                        <BaseText style={FontStyle.Cnt13GrayCN}>{localize.event.status.end}</BaseText>
                    </View>);
        }
    }

    renderPeriod = (type, start, end) => {
        switch (type) {
            case EVENT_STATUS.PROGRESS:
                return <BaseText style={FontStyle.SubCntOrangeLN}>{this.formatPeriodTime(start, end)}</BaseText>;

            case EVENT_STATUS.PLAN:
                return <BaseText style={FontStyle.SubCntOrangeLN}>{this.formatPeriodTime(start, end)}</BaseText>;

            case EVENT_STATUS.WINNER:
                return <BaseText style={FontStyle.SubCntGrayLN}>{this.formatPeriodTime(start, end)}</BaseText>;

            case EVENT_STATUS.END:
                return <BaseText style={FontStyle.SubCntGrayLN}>{this.formatPeriodTime(start, end)}</BaseText>;
        }
    }

    renderItem = ({item, index}) => {
        const {type, status, start_time, end_time, static_hashtag, title, created_at} = item;

        return (
            <TouchableOpacity key={index}
                              style={s.layout_item}
                              onPress={_ => this.onSelectItem(item)}>
                {/* Top */}
                <View style={s.layout_item_top}>
                    {/* Progress */}
                    {this.renderProgressTag(status)}
                    {/* Period */}
                    {this.renderPeriod(status, start_time, end_time)}
                </View>
                {/* Hash Tag */}
                <BaseText style={[FontStyle.SubHashOrangeLT, {marginTop: Layout.UISize(8)}]}>{this.getTag(static_hashtag, type)}</BaseText>
                {/* Title */}
                <BaseText style={[FontStyle.HeadlineCntWhiteLH, {marginTop: Layout.UISize(5)}]}
                          numberOfLines={1}>{title}</BaseText>
                {/* Date */}
                <BaseText style={[FontStyle.SubCntGrayLN, {marginTop: Layout.UISize(10), marginBottom: Layout.UISize(5)}]}>{this.formatTime(created_at)}</BaseText>
            </TouchableOpacity>);
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
                                ListHeaderComponent={this.renderBanner}
                                onHeaderRefresh={this.loadRefreshList}
                                onFooterRefresh={this.loadMoreList}/>;
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

EventNoticeList.defaultProps = {
    isLoading: false,
    banner: null,
    tags: [],
    //
    onLoadRefresh: _ => {
    },
    onLoadMore: _ => {
    },
    onSelectBanner: _ => {
    },
    onSelectItem: item => {
    },
};

EventNoticeList.propTypes = {
    isLoading: PropTypes.bool,
    banner: PropTypes.any,
    tags: PropTypes.array,
    list: PropTypes.array.isRequired,
    //
    onLoadRefresh: PropTypes.func,
    onLoadMore: PropTypes.func,
    onSelectBanner: PropTypes.func,
    onSelectItem: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default EventNoticeList;
