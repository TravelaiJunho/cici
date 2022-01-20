////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
////////////////////
// Local
import {MEDIA_RESPONSE} from '../../../util/type/Media';
import {navRef} from "../../../navigation/RootNavigation";
import Screen from "../../../util/type/Screen";
// Component
import BaseComponent from '../../_base/BaseComponent';
import RefreshFlatList from '../../_common/refresh/RefreshFlatList';
import RefreshState from '../../_common/refresh/RefreshState';
import MediaTemplate from "./template/MediaTemplate";
// API
import {STATUS} from "../../../data/redux/_base/ActionType";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class MediaList extends BaseComponent {

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

    showMedia = (screen, item) => navRef.current.navigate(screen, {item: item});

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
    onSelectItem = item => {
        switch (item.media_type) {
            case MEDIA_RESPONSE.IMAGE_DEFAULT:
                return this.showMedia(Screen.SCREEN_ACTIVITY.MEDIA_IMAGE, item);
            case MEDIA_RESPONSE.IMAGE_WALLPAPER:
                return this.showMedia(Screen.SCREEN_ACTIVITY.MEDIA_WALLPAPER, item);
            case MEDIA_RESPONSE.VIDEO_FILE:
                return this.showMedia(Screen.SCREEN_ACTIVITY.MEDIA_VIDEO, item);
            case MEDIA_RESPONSE.VIDEO_YOUTUBE:
                return this.showMedia(Screen.SCREEN_ACTIVITY.MEDIA_YOUTUBE, item);
            case MEDIA_RESPONSE.AUDIO_FILE:
                return this.showMedia(Screen.SCREEN_ACTIVITY.MEDIA_AUDIO, item);
        }
    }

    ////////////////////
    // RENDER
    renderItem = ({item, index}) => {
        return <MediaTemplate key={index}
                              onSelectItem={this.onSelectItem}
                              type={item.type}
                              list={item.data}/>
    }

    render() {
        const {list} = this.props;
        return <RefreshFlatList ref={ref => this.listView = ref}
                                useOptimized={true}
                                style={{flex: 1}}
                                extraData={this.state}
                                data={list}
                                threshold={2}
                                windowSize={2}
                                scrollEventThrottle={16}
                                keyExtractor={(item, index) => index.toString()}
                                initialNumToRender={list ? list.length : 0}
                                renderItem={this.renderItem}
                                onHeaderRefresh={this.loadRefreshList}
                                onFooterRefresh={this.loadMoreList}/>
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

MediaList.defaultProps = {
    onLoadRefresh: _ => {
    },
    onLoadMore: _ => {
    }
};

MediaList.propTypes = {
    list: PropTypes.array.isRequired,
    onLoadRefresh: PropTypes.func,
    onLoadMore: PropTypes.func
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default MediaList;
