// https://github.com/mrarronz/react-native-blog-examples/tree/master/Chapter4-PullRefresh/PullRefreshExample

import React, {Component} from 'react';
import {FlatList} from "react-native";
import PropTypes from 'prop-types';
import {OptimizedFlatList} from "../optimized";
import RefreshState from './RefreshState';
import RefreshFooter from './RefreshFooter';
import Common from '@util/Common';

const DELAY_TIME = 5 * 1000;

class RefreshFlatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHeaderRefreshing: false,
            isFooterRefreshing: false,
            footerState: RefreshState.Idle,
            isDelayByHeader: false,
        };
    }

    setDelayByHeader = (isDelay = false) => {
        if (this.state.isDelayByHeader !== isDelay) {
            this.setState({isDelayByHeader: isDelay});
        }
    }

    _renderFooter = () => {
        return (<RefreshFooter state={this.state.footerState}
                               onRetryLoading={() => this.beginFooterRefresh()}/>);
    };

    footerState() {
        return this.state.footerState;
    }

    beginHeaderRefresh() {
        if (this.shouldStartHeaderRefreshing() && !this.state.isDelayByHeader) {
            this.setDelayByHeader(true);
            setTimeout(this.setDelayByHeader, DELAY_TIME);
            this.startHeaderRefreshing();
        }
    }

    beginFooterRefresh() {
        if (this.shouldStartFooterRefreshing()) {
            this.startFooterRefreshing();
        }
    }

    startHeaderRefreshing() {
        this.setState({
                isHeaderRefreshing: true,
            }, _ => {
                this.props.onHeaderRefresh && this.props.onHeaderRefresh();
            },
        );
    }

    isHeaderRefresh = _ => {
        return this.state.isHeaderRefreshing;
    }

    startFooterRefreshing() {
        this.setState({
                footerState: RefreshState.Refreshing,
                isFooterRefreshing: true,
            }, _ => {
                this.props.onFooterRefresh && this.props.onFooterRefresh();
            },
        );
    }

    isFooterRefresh = _ => {
        return this.state.isFooterRefreshing;
    }

    shouldStartHeaderRefreshing() {
        return !(this.state.footerState === RefreshState.refreshing ||
            this.state.isHeaderRefreshing || this.state.isFooterRefreshing);
    }

    shouldStartFooterRefreshing() {
        return !(this.state.footerState === RefreshState.refreshing || this.state.footerState === RefreshState.NoMoreData ||
            this.props.data.length === 0 || this.state.isHeaderRefreshing || this.state.isFooterRefreshing);
    }

    endRefreshing(footerState) {
        let footerRefreshState = footerState;
        if (!Common.checkListSize(this.props.data)) {
           footerRefreshState = RefreshState.Idle;
        }
        //실패했을때 목록이 없는건지 단순 실패인지 판단이 없다.
        if(footerState == RefreshState.NoMoreData) {
            console.warn("NoMoreData!")
            setTimeout(()=>{
                footerRefreshState = RefreshState.Idle;
                this.setState({
                    footerState: footerRefreshState,
                    isHeaderRefreshing: false,
                    isFooterRefreshing: false,
                });
            }, 1500)
        }
        this.setState({
            footerState: footerRefreshState,
            isHeaderRefreshing: false,
            isFooterRefreshing: false,
        });
    }

    render() {
        if (this.props.useOptimized) {
            return (<OptimizedFlatList {...this.props}
                                       onRefresh={_ => this.beginHeaderRefresh()}
                                       refreshing={this.state.isHeaderRefreshing}
                                       onEndReached={_ => this.beginFooterRefresh()}
                                       onEndReachedThreshold={this.state.threshold}
                                       ListFooterComponent={this._renderFooter}/>);
        } else {
            return (<FlatList {...this.props}
                              onRefresh={_ => this.beginHeaderRefresh()}
                              refreshing={this.state.isHeaderRefreshing}
                              onEndReached={_ => this.beginFooterRefresh()}
                              onEndReachedThreshold={this.state.threshold}
                              ListFooterComponent={this._renderFooter}/>);
        }
    }
}

RefreshFlatList.defaultProps = {
    threshold: 0.5,
    useOptimized: false,
};

RefreshFlatList.propTypes = {
    onHeaderRefresh: PropTypes.func,
    onFooterRefresh: PropTypes.func,
    threshold: PropTypes.number,
    useOptimized: PropTypes.bool,
};

export default RefreshFlatList;
