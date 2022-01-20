////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
////////////////////
// Local
import BaseComponent from '../../_base/BaseComponent';
import RefreshFlatList from '../../_common/refresh/RefreshFlatList';
import RefreshState from '../../_common/refresh/RefreshState';
import PostTemplate from "./template/PostTemplate";
// API
import {STATUS} from "../../../data/redux/_base/ActionType";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class PostList extends BaseComponent {

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

    // Event
    onSelectItem = item => {
        const {onSelectItem} = this.props;
        onSelectItem && onSelectItem(item);
    }

    ////////////////////
    // RENDER
    renderItem = ({item, index}) => {
        return <PostTemplate key={index}
                             onSelectItem={this.onSelectItem}
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

PostList.defaultProps = {
    onLoadRefresh: _ => {
    },
    onLoadMore: _ => {
    },
    onSelectItem: item => {
    },
};

PostList.propTypes = {
    list: PropTypes.array.isRequired,
    onLoadRefresh: PropTypes.func,
    onLoadMore: PropTypes.func,
    onSelectItem: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default PostList;
